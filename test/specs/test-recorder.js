/*! resol-menuparser | Copyright (c) 2013-2014, RESOL GmbH. All rights reserverd. */
'use strict';



var fs = require('fs');
var path = require('path');


var _ = require('lodash');
var moment = require('moment');
var Q = require('q');


var vbus = require('./resol-vbus');



var Recorder = vbus.Recorder;
var VBusRecordingConverter = vbus.VBusRecordingConverter;



var TestRecorder = Recorder.extend({

    id: 'Test',

    fixturesPath: path.join(__dirname, '../fixtures/test-recorder'),

    syncState: null,

    availableRanges: null,

    playedBackRanges: null,

    recordedRanges: null,

    constructor: function() {
        Recorder.apply(this, arguments);
        this.syncState = {};
    },

    _playback: function(headerSetConsolidator, options) {
        var _this = this;

        var converter = new VBusRecordingConverter();

        converter.on('headerSet', function(headerSet) {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        var minFilename = moment.utc(options.minTimestamp).format('YYYYMMDD');
        var maxFilename = moment.utc(options.maxTimestamp).format('YYYYMMDD');

        return Q.fcall(function() {
            return vbus.utils.promise(function(resolve, reject) {
                fs.readdir(_this.fixturesPath, function(err, files) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(files);
                    }
                });
            });
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
                    return vbus.utils.promise(function(resolve, reject) {
                        var fullFilename = path.join(_this.fixturesPath, filename);

                        var stream = fs.createReadStream(fullFilename);

                        stream.pipe(converter, { end: false });

                        stream.on('end', function() {
                            resolve();
                        });

                        stream.on('error', function(err) {
                            reject(err);
                        });
                    });
                });
            });

            return promise;
        }).then(function() {
            converter.end();
        });
    },

    _getCurrentSyncState: function(options) {
        return this.syncState;
    },

    _playbackSyncJob: function(stream, syncJob) {
        var _this = this;

        var syncState = this._getSyncState(syncJob, 'source', 'TestRecorder');

        return Q.fcall(function() {
            return vbus.utils.promise(function(resolve, reject) {
                fs.readdir(_this.fixturesPath, function(err, filenames) {
                    if (err) {
                        reject(err);
                    } else {
                        var ranges = _.reduce(filenames, function(memo, filename) {
                            if (/^[0-9]{8}/.test(filename)) {
                                var minTimestamp = moment.utc(filename.slice(0, 8), 'YYYYMMDD');
                                var maxTimestamp = moment.utc(minTimestamp).add({ hours: 24 });
                                memo.push({
                                    minTimestamp: minTimestamp.toDate(),
                                    maxTimestamp: maxTimestamp.toDate(),
                                });
                            }
                            return memo;
                        }, []);

                        ranges = Recorder.performRangeSetOperation(ranges, [], 86400000, 'union');

                        resolve(ranges);
                    }
                });
            });
        }).then(function(availableRanges) {
            _this.availableRanges = availableRanges;

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

                if (availableRanges.length > 0) {
                    var notAvailableRanges = [{
                        minTimestamp: new Date(Date.UTC(2001, 0)),
                        maxTimestamp: availableRanges [0].minTimestamp,
                    }];

                    handledRanges = Recorder.performRangeSetOperation(handledRanges, notAvailableRanges, syncJob.interval, 'union');
                }

                _this._markSourceSyncRanges(handledRanges, syncJob);

                return playedBackRanges;
            });

            promise = promise.then(function(playedBackRanges) {
                _this.playedBackRanges = playedBackRanges;

                return playedBackRanges;
            });

            return promise;
        });
    },

    _recordSyncJob: function(recorder, syncJob) {

    },

    resetCounters: function() {

    },

});



module.exports = TestRecorder;
