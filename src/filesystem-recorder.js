/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const crypto = require('crypto');
const fs = require('fs');
const path = require('path');


const moment = require('moment');


const _ = require('./lodash');
const VBusRecordingConverter = require('./vbus-recording-converter');

const Recorder = require('./recorder');



const optionKeys = [
    'path',
];



class FileSystemRecorder extends Recorder {

    constructor(options) {
        super(options);

        _.extend(this, _.pick(options, optionKeys));
    }

    _getOptions() {
        const options = Recorder.prototype._getOptions.call(this);
        return _.extend(options, _.pick(this, optionKeys));
    }

    _getAbsoluteFilename(filename) {
        let result;
        if (filename !== undefined) {
            result = path.resolve(this.path, this.getHash(this.id), filename);
        } else {
            result = path.resolve(this.path, this.getHash(this.id));
        }
        return result;
    }

    _getCurrentSyncStateFilename(options) {
        return this._getAbsoluteFilename('SyncState.json');
    }

    async _getCurrentSyncState(options) {
        const filename = this._getCurrentSyncStateFilename(options);

        const data = await new Promise((resolve, reject) => {
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
        });

        return JSON.parse(data);
    }

    async _setCurrentSyncState(syncState, options) {
        const filename = this._getCurrentSyncStateFilename(options);

        const data = JSON.stringify(syncState, null, '    ');

        await new Promise((resolve, reject) => {
            fs.writeFile(filename, data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    _getOwnSyncState(syncState, options) {
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
    }

    async _playback(headerSetConsolidator, options) {
        const _this = this;

        const converter = new VBusRecordingConverter();

        converter.on('headerSet', (headerSet) => {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        const requestedRanges = [{
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
        }];

        const syncState = await _this._getCurrentSyncState(options);

        const infoList = _this._getOwnSyncState(syncState, options);

        const filenames = _.reduce(infoList, (memo, info) => {
            const commonRanges = Recorder.performRangeSetOperation(requestedRanges, info.ranges, options.interval, 'intersection');

            if (commonRanges.length > 0) {
                memo.push(info.filename);
            }

            return memo;
        }, []);

        for (const filename of filenames) {
            await _this._readToStream(filename, converter);
        }

        converter.end();
    }

    _startRecordingInternal(options) {
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
                    filename,
                    datecode,
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

        const finish = async function() {
            let result;
            if (outConverter) {
                result = await outConverter.finish();
            }
            return result;
        };

        const recording = {
            onHeaderSet,
            finish,
        };

        return recording;
    }

    async _startRecording(headerSetConsolidator, recordingJob) {
        const _this = this;

        await _this._makeDirectories();

        const syncState = await _this._getCurrentSyncState(recordingJob);

        const options = {
            interval: recordingJob.interval,
            syncState,
        };

        const recording = _this._startRecordingInternal(options);

        const flush = function() {
            return _this._setCurrentSyncState(syncState, recordingJob);
        };

        let flushTimer = null;
        headerSetConsolidator.on('headerSet', (headerSet) => {
            if (flushTimer) {
                clearTimeout(flushTimer);
                flushTimer = null;
            }
            flushTimer = setTimeout(flush, 5000);

            return recording.onHeaderSet(headerSet);
        });

        const origFinish = recording.finish;

        recording.finish = async function() {
            if (flushTimer) {
                clearTimeout(flushTimer);
                flushTimer = null;
            }
            await flush();

            return origFinish.call(recording);
        };

        return recording;
    }

    async _endRecording(headerSetConsolidator, recordingJob, recording) {
        try {
            await recording.finish();
        } finally {
            headerSetConsolidator.removeListener('headerSet', recording.onHeaderSet);
        }
    }

    async _recordSyncJob(recorder, syncJob) {
        const _this = this;

        /* const syncState = */ _this._getOwnSyncState(syncJob, syncJob);

        const recording = this._startRecordingInternal({
            interval: syncJob.interval,
            syncState: syncJob.syncState,
        });

        const inConverter = new VBusRecordingConverter({
            objectMode: true,
        });

        inConverter.on('headerSet', recording.onHeaderSet);

        await _this._makeDirectories();

        const playedBackRanges = await recorder._playbackSyncJob(inConverter, syncJob);

        try {
            await new Promise((resolve) => {
                inConverter.end(() => {
                    resolve();
                });
            });

            await recording.finish();

            await _this._setCurrentSyncState(syncJob.syncState, syncJob);

            return playedBackRanges;
        } finally {
            inConverter.removeListener('headerSet', recording.onHeaderSet);
        }
    }

    // _playbackSyncJob: function(stream, syncJob) {
    //     var _this = this;

    //     return promisify(function() {
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

    getHash(filename) {
        const url = this.urlPrefix + filename;

        const shasum = crypto.createHash('sha1');

        shasum.update(Buffer.from(url, 'utf8'));

        return shasum.digest('hex');
    }

    _readToStream(filename, stream) {
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
    }

    _makeDirectory(directory) {
        return new Promise((resolve, reject) => {
            fs.access(directory, (err) => {
                if (err) {
                    fs.mkdir(directory, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    async _makeDirectories() {
        const _this = this;

        await _this._makeDirectory(_this.path);

        const directory = _this._getAbsoluteFilename();

        await _this._makeDirectory(directory);
    }

}


Object.assign(FileSystemRecorder.prototype, {

    path: '.',

});



module.exports = FileSystemRecorder;
