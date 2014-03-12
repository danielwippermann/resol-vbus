/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var crypto = require('crypto');
var fs = require('fs');
var path = require('path');


var _ = require('lodash');
var moment = require('moment');
var Q = require('q');
var request = require('request');


var HeaderSet = require('./header-set');
var utils = require('./utils');
var VBusRecordingConverter = require('./vbus-recording-converter');

var Recorder = require('./recorder');



var optionKeys = [
    'path',
];



var FileSystemRecorder = Recorder.extend({

    path: '.',

    constructor: function(options) {
        Recorder.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    _getOptions: function() {
        var options = Recorder.prototype._getOptions.call(this);
        return _.extend(options, _.pick(this, optionKeys));
    },

    _getAbsoluteFilename: function(filename) {
        var result;
        if (filename !== undefined) {
            result = path.resolve(this.path, this.getHash(this.id), filename);
        } else {
            result = path.resolve(this.path, this.getHash(this.id));
        }
        return result;
    },

    _getCurrentSyncStateFilename: function(options) {
        return this._getAbsoluteFilename('SyncState.json');
    },

    _getCurrentSyncState: function(options) {
        var filename = this._getCurrentSyncStateFilename(options);

        return Q.fcall(function() {
            return Q.npost(fs, 'readFile', [ filename ]);
        }).fail(function(err) {
            if (err.code === 'ENOENT') {
                return '{}';
            } else {
                throw err;
            }
        }).then(function(data) {
            return JSON.parse(data);
        });
    },

    _setCurrentSyncState: function(syncState, options) {
        var filename = this._getCurrentSyncStateFilename(options);

        return Q.fcall(function() {
            return JSON.stringify(syncState, null, '    ');
        }).then(function(data) {
            return Q.npost(fs, 'writeFile', [ filename, data ]);
        });
    },

    _getOwnSyncState: function(syncState, options) {
        var dstSyncState = this._getSyncState(syncState, 'destination', 'FileSystemRecorder');

        var syncVersion = dstSyncState.version || 0;
        if (syncVersion === 0) {
            syncVersion = 1;
            dstSyncState.infoListByInterval = {};
        }
        dstSyncState.version = syncVersion;

        if (!dstSyncState.infoListByInterval [options.interval]) {
            dstSyncState.infoListByInterval [options.interval] = [];
        }

        var infoList = dstSyncState.infoListByInterval [options.interval];

        return infoList;
    },

    _playback: function(headerSetConsolidator, options) {
        var _this = this;

        var converter = new VBusRecordingConverter();

        converter.on('headerSet', function(headerSet) {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        var requestedRanges = [{
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
        }];

        return Q.fcall(function() {
            return _this._getCurrentSyncState(options);
        }).then(function(syncState) {
            var infoList = _this._getOwnSyncState(syncState, options);

            return _.reduce(infoList, function(memo, info) {
                var commonRanges = Recorder.performRangeSetOperation(requestedRanges, info.ranges, options.interval, 'intersection');

                if (commonRanges.length > 0) {
                    memo.push(info.filename);
                }

                return memo;
            }, []);
        }).then(function(filenames) {
            var promise = Q();

            _.forEach(filenames, function(filename) {
                promise = promise.then(function() {
                    return _this._readToStream(filename, converter);
                });
            });

            return promise;
        }).then(function() {
            converter.end();
        });
    },

    _startRecordingInternal: function(options) {
        var _this = this;

        options = _.defaults({}, options, this._getOptions(), {
            interval: this.interval,
            syncState: [],
        });

        var syncState = options.syncState;

        var lastTimestamp = null;

        var currentInfo = null;

        var outFile = null;

        var outConverter = null;

        var onHeaderSet = function(headerSet) {
            var timestamp = headerSet.timestamp;

            if (lastTimestamp && (timestamp < lastTimestamp)) {
                // headersets are assumed to be played back in a chronological order,
                // so discard any headersets that are not...
                console.log('SKIPPING unlinear header sets');
                return;
            }
            lastTimestamp = timestamp;

            var timestampText = moment.utc(timestamp).format('YYYYMMDDHHmmssSSS');

            var datecode = timestampText.substring(0, 8);

            var thisRanges = [{
                minTimestamp: timestamp,
                maxTimestamp: timestamp,
            }];

            // can we use the current range (and file)?
            var combinedRange, useCurrentInfo = false, previousInfo = currentInfo;
            if (currentInfo && (currentInfo.datecode === datecode)) {
                combinedRange = Recorder.performRangeSetOperation(currentInfo.ranges, thisRanges, options.interval, 'union');

                useCurrentInfo = ((combinedRange.length === 1) && (combinedRange [0].maxTimestamp.getTime() === timestamp.getTime()));
            }

            if (!useCurrentInfo) {
                // find other range, prefer existing ranges before starting a new one
                for (var i = 0; i < syncState.length; i++) {
                    var info = syncState [i];

                    if (info && (info.datecode === datecode)) {
                        combinedRange = Recorder.performRangeSetOperation(info.ranges, thisRanges, options.interval, 'union');

                        useCurrentInfo = ((combinedRange.length === 1) && (combinedRange [0].maxTimestamp.getTime() === timestamp.getTime()));

                        if (useCurrentInfo) {
                            currentInfo = info;

                            // console.log('Reusing existing info ', info);

                            break;
                        }
                    }
                }
            }

            if (useCurrentInfo) {
                currentInfo.ranges = combinedRange;
            } else {
                var filename = options.interval + '_' + timestampText + '.vbus';

                currentInfo = {
                    ranges: thisRanges,
                    filename: filename,
                    datecode: datecode,
                };

                syncState.push(currentInfo);

                // console.log('Starting new info ', currentInfo);
            }

            if (currentInfo !== previousInfo) {
                if (outConverter) {
                    outConverter.end();
                }

                var path = _this._getAbsoluteFilename(currentInfo.filename);

                // console.log('Starting new file ' + path);

                outFile = fs.createWriteStream(path, {
                    flags: 'a'
                });

                outConverter = new VBusRecordingConverter();

                outConverter.pipe(outFile);
            }

            // console.log(timestamp.toString());

            outConverter.convertHeaderSet(headerSet);
        };

        var finish = function() {
            return utils.promise(function(resolve) {
                if (outConverter) {
                    outConverter.end(function() {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        };

        var recording = {
            onHeaderSet: onHeaderSet,
            finish: finish,
        };

        return recording;
    },

    _startRecording: function(headerSetConsolidator, recordingJob) {
        return Q.fcall(function() {
            var options = {
                interval: recordingJob.interval,
            };

            var recording = this._startRecordingInternal(options);

            headerSetConsolidator.on('headerSet', recording.onHeaderSet);

            return recording;
        });
    },

    _endRecording: function(headerSetConsolidator, recordingJob, recording) {
        return Q.fcall(function() {
            return recording.finish();
        }).finally(function() {
            return headerSetConsolidator.removeListener('headerSet', recording.onHeaderSet);
        });
    },

    _recordSyncJob: function(recorder, syncJob) {
        var _this = this;

        var syncState = _this._getOwnSyncState(syncJob, syncJob);

        var recording = this._startRecordingInternal({
            interval: syncJob.interval,
            syncState: syncState,
        });

        var inConverter = new VBusRecordingConverter({
            objectMode: true,
        });

        inConverter.on('headerSet', recording.onHeaderSet);

        return Q.fcall(function() {
            return recorder._playbackSyncJob(inConverter, syncJob);
        }).then(function(playedBackRanges) {
            return Q.fcall(function() {
                return utils.promise(function(resolve) {
                    inConverter.end(function() {
                        resolve();
                    });
                });
            }).then(function() {
                return recording.finish();
            }).then(function() {
                return _this._setCurrentSyncState(syncJob.syncState, syncJob);
            }).then(function() {
                return playedBackRanges;
            }).finally(function() {
                inConverter.removeListener('headerSet', recording.onHeaderSet);
            });
        });
    },

    // _playbackSyncJob: function(stream, syncJob) {
    //     var _this = this;

    //     return Q.fcall(function() {
    //         return _this._getCurrentSyncState(syncJob);
    //     }).then(function(syncState) {
    //         var infoList = _this._getOwnSyncState(syncState, syncJob);

    //         return _.reduce(infoList, function(memo, info) {
    //             var commonRanges = Recorder.performRangeSetOperation(requestedRanges, info.ranges, syncJob.interval, 'intersection');

    //             if (commonRanges.length > 0) {
    //                 memo.push(info.filename);
    //             }

    //             return memo;
    //         }, []);
    //     }).then(function(filenames) {
    //         var promise = Q();

    //         _.forEach(filenames, function(filename) {
    //             promise = promise.then(function() {
    //                 return _this._readToStream(filename, converter);
    //             });
    //         });

    //         return promise;
    //     }).then(function() {
    //         converter.end();
    //     });
    // },

    getHash: function(filename) {
        var url = this.urlPrefix + filename;

        var shasum = crypto.createHash('sha1');

        shasum.update(new Buffer(url, 'utf8'));

        return shasum.digest('hex');
    },

    _readToStream: function(filename, stream) {
        return utils.promise(function(resolve, reject) {
            var onEnd = function() {
                resolve();
            };

            var onError = function(err) {
                reject(err);
            };

            var absoluteFilename = this._getAbsoluteFilename(filename);

            var readStream = fs.createReadStream(absoluteFilename);
            readStream.pipe(stream, { end: false });
            readStream.on('end', onEnd);
            readStream.on('error', onError);
        }, this);
    },

});



module.exports = FileSystemRecorder;
