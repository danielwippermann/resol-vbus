/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var moment = require('moment');
var Q = require('q');
var request = require('request');


var _ = require('./lodash');
var utils = require('./utils');
var VBusRecordingConverter = require('./vbus-recording-converter');

var Recorder = require('./recorder');



var optionKeys = [
    'urlPrefix',
    'username',
    'password',
];



var DLxRecorder = Recorder.extend( /** @lends DLxRecorder# */ {

    /**
     * The root URL to access the DLx.
     * @type {string}
     */
    urlPrefix: null,

    /**
     * The username to login to the web interface.
     * @type {string}
     */
    username: 'admin',

    /**
     * The password to login to the web interface.
     * @type {string}
     */
    password: 'admin',

    /**
     * Creates a new DLxRecorder instance.
     * @constructs
     * @augments Recorder
     *
     * @classdesc
     * DLxRecorder is a recorder that can play back data recorded by a Datalogger.
     */
    constructor: function(options) {
        Recorder.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    _getOptions: function() {
        var options = Recorder.prototype._getOptions.call(this);
        return _.extend(options, _.pick(this, optionKeys));
    },

    _playback: function(headerSetConsolidator, options) {
        var _this = this;

        var converter = new VBusRecordingConverter();

        converter.on('headerSet', function(headerSet) {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        return Q.fcall(function() {
            if (options.apiAccess) {
                return _this._playbackApi(converter, options);
            } else {
                return _this._playbackRaw(converter, options);
            }
        }).then(function() {
            converter.end();
        });
    },

    _playbackRaw: function(converter, options) {
        var _this = this;

        var minFilename = moment.utc(options.minTimestamp).format('[/log/]YYYYMMDD');
        var maxFilename = moment.utc(options.maxTimestamp).format('[/log/]YYYYMMDD');

        return Q.fcall(function() {
            return _this.getRecordingFilenames(options);
        }).then(function(filenames) {
            return _.reduce(filenames, function(memo, filename) {
                var filenamePrefix = filename.slice(0, minFilename.length);

                if ((filenamePrefix >= minFilename) && (filenamePrefix <= maxFilename)) {
                    memo.push(filename);
                }

                return memo;
            }, []);
        }).then(function(filenames) {
            var promise = Q();

            _.forEach(filenames, function(filename) {
                promise = promise.then(function() {
                    var urlString = options.urlPrefix + filename;

                    var urlOptions = {
                        auth: {
                            username: options.username,
                            password: options.password,
                        },
                    };

                    return _this.downloadToStream(urlString, urlOptions, converter);
                });
            });

            return promise;
        });
    },

    _playbackApi: function(converter, options) {
        var urlString = options.urlPrefix + '/dlx/download/download';

        var urlOptions = {
            qs: {
                sessionAuthUsername: options.username,
                sessionAuthPassword: options.password,
                source: 'log',
                inputType: 'packets',
                outputType: 'vbus',
                sieveInterval: Math.round(options.interval / 1000) || 1,
                startDate: moment(options.minTimestamp).format('MM/DD/YYYY'),
                endDate: moment(options.maxTimestamp).format('MM/DD/YYYY'),
                dataLanguage: 'en',
            },
            auth: {
                username: options.username,
                password: options.password,
            },
        };

        return Q.fcall(function() {
            return this.downloadToStream(urlString, urlOptions, converter);
        });
    },

    _playbackSyncJob: function(stream, syncJob) {
        var _this = this;

        if (!stream.objectMode) {
            throw new Error('Stream must be in object mode');
        }

        /*var syncState =*/ this._getSyncState(syncJob, 'source', 'DLxRecorder');

        return Q.fcall(function() {
            return _this.getLazyRecordingRanges();
        }).then(function(availableRanges) {
            var ranges = Recorder.performRangeSetOperation(availableRanges, syncJob.syncStateDiffs, syncJob.interval, 'intersection');

            var playedBackRanges = [];

            var promise = Q();

            _.forEach(ranges, function(range) {
                var options = _.extend({}, syncJob, {
                    minTimestamp: range.minTimestamp,
                    maxTimestamp: range.maxTimestamp,
                    end: false,
                });

                promise = promise.then(function() {
                    return _this.playback(stream, options);
                }).then(function(ranges) {
                    playedBackRanges = Recorder.performRangeSetOperation(playedBackRanges, ranges, syncJob.interval, 'union');
                });
            });

            promise = promise.then(function() {
                var handledRanges = playedBackRanges;

                if (handledRanges.length > 0) {
                    var maxTimestamp;
                    if (syncJob.markGapsAsUnsynced) {
                        maxTimestamp = handledRanges [0].minTimestamp;
                    } else {
                        maxTimestamp = handledRanges [handledRanges.length - 1].minTimestamp;
                    }

                    var notAvailableRanges = [{
                        minTimestamp: new Date(Date.UTC(2001, 0)),
                        maxTimestamp: maxTimestamp,
                    }];

                    handledRanges = Recorder.performRangeSetOperation(handledRanges, notAvailableRanges, syncJob.interval, 'union');
                }

                _this._markSourceSyncRanges(handledRanges, syncJob);

                return playedBackRanges;
            });

            return promise;
        });
    },

    getLazyRecordingRanges: function() {
        var _this = this;

        return Q.fcall(function() {
            return _this.getRecordingFilenames();
        }).then(function(filenames) {
            var ranges = _.map(filenames, function(filename) {
                var minTimestamp = moment.utc(filename.slice(5, 13), 'YYYYMMDD');
                var maxTimestamp = moment.utc(minTimestamp).add({ hours: 24 });
                return {
                    minTimestamp: minTimestamp.toDate(),
                    maxTimestamp: maxTimestamp.toDate(),
                };
            });

            ranges = Recorder.performRangeSetOperation(ranges, [], 86400000, 'union');

            return ranges;
        });
    },

    getRecordingFilenames: function() {
        return utils.promise(function(resolve, reject) {
            var rxBuffer = null;

            var filenames = [];

            var onResponse = function(res) {
            };

            var onData = function(chunk) {
                var buffer;
                if (rxBuffer) {
                    buffer = Buffer.concat([ rxBuffer, chunk ]);
                } else {
                    buffer = chunk;
                }

                var string = buffer.toString('utf8');

                var re = /<a href="([0-9]{8}_[a-z]+.vbus)">/g;

                var md, index;
                while ((md = re.exec(string)) !== null) {
                    filenames.push('/log/' + md [1]);
                    index = re.lastIndex;
                }

                string = string.slice(index);

                rxBuffer = new Buffer(string, 'utf8');
            };

            var onEnd = function() {
                resolve(filenames.sort());
            };

            var onError = function(err) {
                reject(err);
            };

            var urlOptions = {
                auth: {
                    username: this.username,
                    password: this.password,
                },
            };

            var stream = this._request(this.urlPrefix + '/log/', urlOptions);
            stream.on('response', onResponse);
            stream.on('data', onData);
            stream.on('end', onEnd);
            stream.on('error', onError);
        }, this);
    },

    getRecordingInfo: function(filename) {
        return utils.promise(function(resolve, reject) {
            var info = {};

            var onResponse = function(res) {
                info.size = res.headers ['content-length'] | 0;
                info.etag = res.headers.etag;
            };

            var onEnd = function() {
                resolve(info);
            };

            var onError = function(err) {
                reject(err);
            };

            var urlOptions = {
                method: 'HEAD',
                auth: {
                    username: this.username,
                    password: this.password,
                },
            };

            var stream = this._request(this.urlPrefix + filename, urlOptions);
            stream.resume();
            stream.on('response', onResponse);
            stream.on('end', onEnd);
            stream.on('error', onError);
        }, this);
    },

    downloadToStream: function(urlString, urlOptions, stream) {
        return utils.promise(function(resolve, reject) {
            var onEnd = function() {
                resolve();
            };

            var onError = function(err) {
                reject(err);
            };

            var req = this._request(urlString, urlOptions);
            req.pipe(stream, { end: false });
            req.on('end', onEnd);
            req.on('error', onError);
        }, this);
    },

    _request: function() {
        return request.apply(undefined, arguments);
    },

});



module.exports = DLxRecorder;
