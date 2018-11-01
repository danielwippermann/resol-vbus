/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const path = require('path');


const moment = require('moment');


const _ = require('./lodash');
const Q = require('./q');
const vbus = require('./resol-vbus');



const Recorder = vbus.Recorder;
const VBusRecordingConverter = vbus.VBusRecordingConverter;



const TestRecorder = Recorder.extend({

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
        const _this = this;

        const converter = new VBusRecordingConverter();

        converter.on('headerSet', function(headerSet) {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        const minFilename = moment.utc(options.minTimestamp).format('YYYYMMDD');
        const maxFilename = moment.utc(options.maxTimestamp).format('YYYYMMDD');

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
                const filenamePrefix = filename.slice(0, minFilename.length);

                if ((filenamePrefix >= minFilename) && (filenamePrefix <= maxFilename)) {
                    memo.push(filename);
                }

                return memo;
            }, []);
        }).then(function(filenames) {
            let promise = Q();

            _.forEach(filenames, function(filename) {
                promise = promise.then(function() {
                    return vbus.utils.promise(function(resolve, reject) {
                        const fullFilename = path.join(_this.fixturesPath, filename);

                        const stream = fs.createReadStream(fullFilename);

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

    _setCurrentSyncState: function(syncState, options) {
        this.syncState = syncState;
    },

    _playbackSyncJob: function(stream, syncJob) {
        const _this = this;

        if (!stream.objectMode) {
            throw new Error('Stream must be in object mode');
        }

        /* var syncState = */ this._getSyncState(syncJob, 'source', 'TestRecorder');

        return Q.fcall(function() {
            return vbus.utils.promise(function(resolve, reject) {
                fs.readdir(_this.fixturesPath, function(err, filenames) {
                    if (err) {
                        reject(err);
                    } else {
                        let ranges = _.reduce(filenames, function(memo, filename) {
                            if (/^[0-9]{8}/.test(filename)) {
                                const minTimestamp = moment.utc(filename.slice(0, 8), 'YYYYMMDD');
                                const maxTimestamp = moment.utc(minTimestamp).add({ hours: 24 });
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

            const ranges = Recorder.performRangeSetOperation(availableRanges, syncJob.syncStateDiffs, syncJob.interval, 'intersection');

            let playedBackRanges = [];

            let promise = Q();

            _.forEach(ranges, function(range) {
                const options = _.extend({}, syncJob, {
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
                let handledRanges = playedBackRanges;

                if (availableRanges.length > 0) {
                    const notAvailableRanges = [{
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
        const _this = this;

        const syncState = this._getSyncState(syncJob, 'destination', 'TestRecorder');

        let syncVersion = syncState.version || 0;
        if (syncVersion === 0) {
            syncVersion = 1;
            syncState.infoListByInterval = {};
        }
        syncState.version = syncVersion;

        if (!syncState.infoListByInterval [syncJob.interval]) {
            syncState.infoListByInterval [syncJob.interval] = [];
        }

        // const infoList = syncState.infoListByInterval [syncJob.interval];

        let recordedRanges = [];

        let lastTimestamp = null;

        const inConverter = new VBusRecordingConverter({
            objectMode: true,
        });

        inConverter.on('headerSet', function(headerSet) {
            const timestamp = headerSet.timestamp;

            if (lastTimestamp && (timestamp < lastTimestamp)) {
                // headersets are assumed to be played back in a chronological order,
                // so discard any headersets that are not...
                global.console.log('SKIPPING unlinear header sets');
                return;
            }
            lastTimestamp = timestamp;

            const thisRanges = [{
                minTimestamp: timestamp,
                maxTimestamp: timestamp,
            }];

            recordedRanges = Recorder.performRangeSetOperation(recordedRanges, thisRanges, syncJob.interval, 'union');
        });

        return Q.fcall(function() {
            return recorder._playbackSyncJob(inConverter, syncJob);
        }).then(function(playedBackRanges) {
            return vbus.utils.promise(function(resolve) {
                inConverter.end(function() {
                    resolve();
                });
            }).then(function() {
                return _this._setCurrentSyncState(syncJob.syncState, syncJob);
            }).then(function() {
                return playedBackRanges;
            });
        });
    },

    resetCounters: function() {

    },

});



module.exports = TestRecorder;
