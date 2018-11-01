/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const crypto = require('crypto');
const fs = require('fs');
const path = require('path');


const moment = require('moment');


const _ = require('./lodash');
const Q = require('./q');
const { promiseFinally } = require('./utils');
const VBusRecordingConverter = require('./vbus-recording-converter');

const Recorder = require('./recorder');



const optionKeys = [
    'path',
];



const FileSystemRecorder = Recorder.extend({

    path: '.',

    constructor: function(options) {
        Recorder.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    _getOptions: function() {
        const options = Recorder.prototype._getOptions.call(this);
        return _.extend(options, _.pick(this, optionKeys));
    },

    _getAbsoluteFilename: function(filename) {
        let result;
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
        const filename = this._getCurrentSyncStateFilename(options);

        return new Promise((resolve, reject) => {
            fs.readFile(filename, (err, contents) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        resolve('{}');
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(contents);
                }
            });
        }).then(function(data) {
            return JSON.parse(data);
        });
    },

    _setCurrentSyncState: function(syncState, options) {
        const filename = this._getCurrentSyncStateFilename(options);

        return Q.fcall(function() {
            return JSON.stringify(syncState, null, '    ');
        }).then(function(data) {
            return new Promise((resolve, reject) => {
                fs.writeFile(filename, data, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
    },

    _getOwnSyncState: function(syncState, options) {
        const dstSyncState = this._getSyncState(syncState, 'destination', 'FileSystemRecorder');

        let syncVersion = dstSyncState.version || 0;
        if (syncVersion === 0) {
            syncVersion = 1;
            dstSyncState.infoListByInterval = {};
        }
        dstSyncState.version = syncVersion;

        if (!dstSyncState.infoListByInterval [options.interval]) {
            dstSyncState.infoListByInterval [options.interval] = [];
        }

        const infoList = dstSyncState.infoListByInterval [options.interval];

        return infoList;
    },

    _playback: function(headerSetConsolidator, options) {
        const _this = this;

        const converter = new VBusRecordingConverter();

        converter.on('headerSet', function(headerSet) {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        const requestedRanges = [{
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
        }];

        return Q.fcall(function() {
            return _this._getCurrentSyncState(options);
        }).then(function(syncState) {
            const infoList = _this._getOwnSyncState(syncState, options);

            return _.reduce(infoList, function(memo, info) {
                const commonRanges = Recorder.performRangeSetOperation(requestedRanges, info.ranges, options.interval, 'intersection');

                if (commonRanges.length > 0) {
                    memo.push(info.filename);
                }

                return memo;
            }, []);
        }).then(function(filenames) {
            let promise = Q();

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
        const _this = this;

        options = _.defaults({}, options, this._getOptions(), {
            interval: this.interval,
            syncState: {},
        });

        const syncState = this._getOwnSyncState(options.syncState, options);

        let lastTimestamp = null;

        let currentInfo = null;

        let outFile = null;

        let outConverter = null;

        const debugLog = function() {
            // console.log.apply(console, arguments);
        };

        const onHeaderSet = function(headerSet) {
            const timestamp = headerSet.timestamp;

            if (lastTimestamp && (timestamp < lastTimestamp)) {
                // headersets are assumed to be played back in a chronological order,
                // so discard any headersets that are not...
                global.console.log('SKIPPING unlinear header sets');
                return;
            }
            lastTimestamp = timestamp;

            const timestampText = moment.utc(timestamp).format('YYYYMMDDHHmmssSSS');

            const datecode = timestampText.substring(0, 8);

            const thisRanges = [{
                minTimestamp: timestamp,
                maxTimestamp: timestamp,
            }];

            // can we use the current range (and file)?
            const previousInfo = currentInfo;
            let combinedRange, useCurrentInfo = false;
            if (currentInfo && (currentInfo.datecode === datecode)) {
                combinedRange = Recorder.performRangeSetOperation(currentInfo.ranges, thisRanges, options.interval, 'union');

                useCurrentInfo = ((combinedRange.length === 1) && (combinedRange [0].maxTimestamp.getTime() === timestamp.getTime()));
            }

            if (!useCurrentInfo) {
                // find other range, prefer existing ranges before starting a new one
                for (let i = 0; i < syncState.length; i++) {
                    const info = syncState [i];

                    if (info && (info.datecode === datecode)) {
                        combinedRange = Recorder.performRangeSetOperation(info.ranges, thisRanges, options.interval, 'union');

                        useCurrentInfo = ((combinedRange.length === 1) && (combinedRange [0].maxTimestamp.getTime() === timestamp.getTime()));

                        if (useCurrentInfo) {
                            currentInfo = info;

                            debugLog('Reusing existing info ', info);

                            break;
                        }
                    }
                }
            }

            if (useCurrentInfo) {
                currentInfo.ranges = combinedRange;
            } else {
                const filename = options.interval + '_' + timestampText + '.vbus';

                currentInfo = {
                    ranges: thisRanges,
                    filename: filename,
                    datecode: datecode,
                };

                syncState.push(currentInfo);

                debugLog('Starting new info ', currentInfo);
            }

            if (currentInfo !== previousInfo) {
                if (outConverter) {
                    outConverter.finish();
                }

                const path = _this._getAbsoluteFilename(currentInfo.filename);

                debugLog('Starting new file ' + path);

                outFile = fs.createWriteStream(path, {
                    flags: 'a'
                });

                outConverter = new VBusRecordingConverter();

                outConverter.pipe(outFile);
            }

            debugLog(timestamp.toString());

            outConverter.convertHeaderSet(headerSet);
        };

        const finish = function() {
            return Q.fcall(function() {
                if (outConverter) {
                    return outConverter.finish();
                }
            });
        };

        const recording = {
            onHeaderSet: onHeaderSet,
            finish: finish,
        };

        return recording;
    },

    _startRecording: function(headerSetConsolidator, recordingJob) {
        const _this = this;

        return Q.fcall(function() {
            return _this._makeDirectories();
        }).then(function() {
            return _this._getCurrentSyncState(recordingJob);
        }).then(function(syncState) {
            const options = {
                interval: recordingJob.interval,
                syncState: syncState,
            };

            const recording = _this._startRecordingInternal(options);

            const flush = function() {
                return _this._setCurrentSyncState(syncState, recordingJob);
            };

            let flushTimer = null;
            headerSetConsolidator.on('headerSet', function(headerSet) {
                if (flushTimer) {
                    clearTimeout(flushTimer);
                    flushTimer = null;
                }
                flushTimer = setTimeout(flush, 5000);

                return recording.onHeaderSet(headerSet);
            });

            const origFinish = recording.finish;

            recording.finish = function() {
                return Q.fcall(function() {
                    if (flushTimer) {
                        clearTimeout(flushTimer);
                        flushTimer = null;
                    }
                    return flush();
                }).then(function() {
                    return origFinish.call(recording);
                });
            };

            return recording;
        });
    },

    _endRecording: function(headerSetConsolidator, recordingJob, recording) {
        const promise = Q.fcall(function() {
            return recording.finish();
        });
        
        return promiseFinally(promise, () => {
            return headerSetConsolidator.removeListener('headerSet', recording.onHeaderSet);
        });
    },

    _recordSyncJob: function(recorder, syncJob) {
        const _this = this;

        /*var syncState =*/ _this._getOwnSyncState(syncJob, syncJob);

        const recording = this._startRecordingInternal({
            interval: syncJob.interval,
            syncState: syncJob.syncState,
        });

        const inConverter = new VBusRecordingConverter({
            objectMode: true,
        });

        inConverter.on('headerSet', recording.onHeaderSet);

        function cleanup() {
            inConverter.removeListener('headerSet', recording.onHeaderSet);
        }

        return Q.fcall(function() {
            return _this._makeDirectories();
        }).then(function() {
            return recorder._playbackSyncJob(inConverter, syncJob);
        }).then(function(playedBackRanges) {
            return new Promise((resolve) => {
                inConverter.end(function() {
                    resolve();
                });
            }).then(function() {
                return recording.finish();
            }).then(function() {
                return _this._setCurrentSyncState(syncJob.syncState, syncJob);
            }).then(function() {
                return playedBackRanges;
            }).then(function(result) {
                cleanup();
                return Promise.resolve(result);
            }, err => {
                cleanup();
                return Promise.reject(err);
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
        const url = this.urlPrefix + filename;

        const shasum = crypto.createHash('sha1');

        shasum.update(new Buffer(url, 'utf8'));

        return shasum.digest('hex');
    },

    _readToStream: function(filename, stream) {
        return new Promise((resolve, reject) => {
            const onEnd = function() {
                resolve();
            };

            const onError = function(err) {
                reject(err);
            };

            const absoluteFilename = this._getAbsoluteFilename(filename);

            const readStream = fs.createReadStream(absoluteFilename);
            readStream.pipe(stream, { end: false });
            readStream.on('end', onEnd);
            readStream.on('error', onError);
        });
    },

    _makeDirectory: function(directory) {
        return new Promise((resolve, reject) => {
            fs.exists(directory, function(exists) {
                if (exists) {
                    resolve();
                } else {
                    fs.mkdir(directory, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    },

    _makeDirectories: function() {
        const _this = this;

        return Q.fcall(function() {
            return _this._makeDirectory(_this.path);
        }).then(function() {
            const directory = _this._getAbsoluteFilename();

            return _this._makeDirectory(directory);
        });
    },

});



module.exports = FileSystemRecorder;
