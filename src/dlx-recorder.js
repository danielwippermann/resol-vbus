/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var crypto = require('crypto');
var fs = require('fs');
var path = require('path');


var _ = require('lodash');
var moment = require('moment');
var Q = require('q');
var request = require('request');


var HeaderSet = require('./header-set');
var VBusRecordingConverter = require('./vbus-recording-converter');

var Recorder = require('./recorder');



var optionKeys = [
    'urlPrefix',
    'username',
    'password',
    'cacheDirectory',
];



var DLxRecorder = Recorder.extend({

    urlPrefix: null,

    username: 'admin',

    password: 'admin',

    cacheDirectory: '.',

    constructor: function(options) {
        Recorder.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    synchronizeRecordings: function(options) {
        var _this = this;

        options = _.defaults({}, options, {
        });

        if (!_.has(options, 'minDate')) {
            options.minDate = new Date(2008, 0);
        }
        if (!_.has(options, 'maxDate')) {
            options.maxDate = new Date(2036, 0);
        }

        var minFilename = moment(options.minDate).subtract('days', 1).format('[/log/]YYYYMMDD');
        var maxFilename = moment(options.maxDate).add('days', 1).format('[/log/]YYYYMMDD');

        return this.getRecordingFilenames().then(function(filenames) {
            return _.reduce(filenames, function(memo, filename) {
                var filenamePrefix = filename.slice(0, minFilename.length);

                if ((filenamePrefix >= minFilename) && (filenamePrefix <= maxFilename)) {
                    memo.push(filename);
                }

                return memo;
            }, []);
        }).then(function(filenames) {
            var promise = Q.fcall(function() {
                return [];
            });

            _.forEach(filenames, function(filename) {
                promise = promise.then(function(results) {
                    return _this.syncRecording(filename).then(function(result) {
                        results.push(result);
                        return results;
                    });
                });
            });

            return promise;
        }).then(function(results) {
            return results;
        });
    },

    getRecordingFilenames: function() {
        var deferred = Q.defer();
        var promise = deferred.promise;

        var done = function(err, result) {
            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

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
            done(null, filenames);
        };

        var onError = function(err) {
            done(err);
        };

        var stream = this.download('/log/');
        stream.on('response', onResponse);
        stream.on('data', onData);
        stream.on('end', onEnd);
        stream.on('error', onError);

        return promise;
    },

    getRecordingInfo: function(filename) {
        var deferred = Q.defer();
        var promise = deferred.promise;

        var done = function(err, result) {
            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        var info = {};

        var onResponse = function(res) {
            info.size = res.headers ['content-length'] | 0;
            info.etag = res.headers.etag;
        };

        var onEnd = function() {
            done(null, info);
        };

        var onError = function(err) {
            done(err);
        };

        var stream = this.download(filename, {
            method: 'HEAD'
        });
        stream.on('response', onResponse);
        stream.on('end', onEnd);
        stream.on('error', onError);

        return promise;
    },

    syncRecording: function(filename) {
        var _this = this;

        console.log(filename);

        var deferred = Q.defer();
        var promise = deferred.promise;

        var done = function(err, result) {
            if (deferred) {
                console.log('    Done!');

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        var hash = this.getRecordingFilenameHash(filename);

        var syncFilenamePrefix = path.join(this.cacheDirectory, hash);

        var jsonSyncFilename = syncFilenamePrefix + '.json';
        var binSyncFilename = syncFilenamePrefix + '.bin';

        var storeInfo = function(info) {
            console.log('    Storing info...');
            fs.writeFile(jsonSyncFilename, JSON.stringify(info), function(err) {
                if (err) {
                    done(err);
                } else {
                    done(null, info);
                }
            });
        };

        var analyze = function(info) {
            console.log('    Analyze...');

            var stream = fs.createReadStream(binSyncFilename);

            var converter = new VBusRecordingConverter();

            stream.pipe(converter);

            var uniqueHeaders = new HeaderSet();

            var headerSetCount = 0;
            var minTimestamp = null, maxTimestamp = null;

            converter.on('headerSet', function(headerSet) {
                headerSetCount++;

                var timestamp = headerSet.timestamp.getTime();
                if ((minTimestamp === null) || (minTimestamp > timestamp)) {
                    minTimestamp = timestamp;
                }
                if ((maxTimestamp === null) || (maxTimestamp < timestamp)) {
                    maxTimestamp = timestamp;
                }

                uniqueHeaders.addHeaders(headerSet.getSortedHeaders());
            });

            converter.on('finish', function() {
                info.headerSetCount = headerSetCount;

                info.minTimestamp = minTimestamp;
                info.maxTimestamp = maxTimestamp;

                info.uniqueHeaders = _.map(uniqueHeaders.getSortedHeaders(), function(header) {
                    return header.getId();
                });

                info.uniqueHeadersId = uniqueHeaders.getId();
                info.uniqueHeadersIdHash = uniqueHeaders.getIdHash();

                storeInfo(info);
            });
        };

        var sync = function(info, remoteInfo) {
            if (remoteInfo.size > info.size) {
                console.log('    Syncing...');

                var stream = _this.download(filename, {
                    headers: {
                        'range': 'bytes=' + info.size + '-',
                    }
                });

                var file = fs.createWriteStream(binSyncFilename, {
                    flags: 'a'
                });

                stream.pipe(file);

                file.on('finish', function() {
                    var info = {
                        urlPrefix: _this.urlPrefix,
                        filename: filename,
                        filenameHash: hash,
                        size: remoteInfo.size,
                    };

                    analyze(info);
                });
            } else if (info.headerSetCount === undefined) {
                analyze(info);
            } else {
                done(null, info);
            }
        };

        var onBinSyncFileStat = function(info, stats) {
            if (stats === undefined) {
                stats = {
                    size: 0,
                };
            }

            info.size = stats.size;

            _this.getRecordingInfo(filename).then(function(remoteInfo) {
                return sync(info, remoteInfo);
            }, function(err) {
                done(err);
            });
        };

        var onJsonSyncFileRead = function(info) {
            if (info !== undefined) {
                info = JSON.parse(info);
            } else {
                info = {
                    urlPrefix: _this.urlPrefix,
                    filename: filename,
                    filenameHash: hash,
                    size: 0,
                };
            }

            fs.stat(binSyncFilename, function(err, stats) {
                if (err && (err.code !== 'ENOENT')) {
                    done(err);
                } else {
                    onBinSyncFileStat(info, stats);
                }
            });
        };

        fs.readFile(jsonSyncFilename, {
            encoding: 'utf8'
        }, function(err, info) {
            if (err && (err.code !== 'ENOENT')) {
                done(err);
            } else {
                onJsonSyncFileRead(info);
            }
        });


        return promise;
    },

    download: function(urlString, options) {
        var req = request(this.urlPrefix + urlString, options).auth(this.username, this.password, false);
        return req;
    },

    getRecordingFilenameHash: function(filename) {
        var url = this.urlPrefix + filename;

        var shasum = crypto.createHash('sha1');

        shasum.update(new Buffer(url, 'utf8'));

        return shasum.digest('hex');
    },

});



module.exports = DLxRecorder;
