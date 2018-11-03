/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const path = require('path');


const moment = require('moment');


const {
    Recorder,
    VBusRecordingConverter,
} = require('./resol-vbus');


const _ = require('./lodash');



const TestRecorder = Recorder.extend({

    id: 'Test',

    fixturesPath: path.join(__dirname, '../fixtures/test-recorder'),

    syncState: null,

    availableRanges: null,

    playedBackRanges: null,

    recordedRanges: null,

    constructor() {
        Recorder.apply(this, arguments);
        this.syncState = {};
    },

    async _playback(headerSetConsolidator, options) {
        const _this = this;

        const converter = new VBusRecordingConverter();

        converter.on('headerSet', (headerSet) => {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        const minFilename = moment.utc(options.minTimestamp).format('YYYYMMDD');
        const maxFilename = moment.utc(options.maxTimestamp).format('YYYYMMDD');

        const filenames = await new Promise((resolve, reject) => {
            fs.readdir(_this.fixturesPath, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });

        const matchingFilenames = filenames.reduce((memo, filename) => {
            const filenamePrefix = filename.slice(0, minFilename.length);

            if ((filenamePrefix >= minFilename) && (filenamePrefix <= maxFilename)) {
                memo.push(filename);
            }

            return memo;
        }, []);

        for (let filename of matchingFilenames) {
            await new Promise((resolve, reject) => {
                const fullFilename = path.join(_this.fixturesPath, filename);

                const stream = fs.createReadStream(fullFilename);

                stream.pipe(converter, { end: false });

                stream.on('end', () => {
                    resolve();
                });

                stream.on('error', (err) => {
                    reject(err);
                });
            });
        }

        converter.end();
    },

    _getCurrentSyncState(options) {
        return this.syncState;
    },

    _setCurrentSyncState(syncState, options) {
        this.syncState = syncState;
    },

    async _playbackSyncJob(stream, syncJob) {
        const _this = this;

        if (!stream.objectMode) {
            throw new Error('Stream must be in object mode');
        }

        /* const syncState = */ this._getSyncState(syncJob, 'source', 'TestRecorder');

        const availableRanges = await new Promise((resolve, reject) => {
            fs.readdir(_this.fixturesPath, (err, filenames) => {
                if (err) {
                    reject(err);
                } else {
                    let ranges = _.reduce(filenames, (memo, filename) => {
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

        _this.availableRanges = availableRanges;

        const ranges = Recorder.performRangeSetOperation(availableRanges, syncJob.syncStateDiffs, syncJob.interval, 'intersection');

        let playedBackRanges = [];

        for (let range of ranges) {
            const options = _.extend({}, syncJob, {
                minTimestamp: range.minTimestamp,
                maxTimestamp: range.maxTimestamp,
                end: false,
            });

            const innerRanges = await _this.playback(stream, options);

            playedBackRanges = Recorder.performRangeSetOperation(playedBackRanges, innerRanges, syncJob.interval, 'union');
        }

        let handledRanges = playedBackRanges;

        if (availableRanges.length > 0) {
            const notAvailableRanges = [{
                minTimestamp: new Date(Date.UTC(2001, 0)),
                maxTimestamp: availableRanges [0].minTimestamp,
            }];

            handledRanges = Recorder.performRangeSetOperation(handledRanges, notAvailableRanges, syncJob.interval, 'union');
        }

        _this._markSourceSyncRanges(handledRanges, syncJob);

        _this.playedBackRanges = playedBackRanges;

        return playedBackRanges;
    },

    async _recordSyncJob(recorder, syncJob) {
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

        inConverter.on('headerSet', (headerSet) => {
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

        const playedBackRanges = await recorder._playbackSyncJob(inConverter, syncJob);

        await new Promise((resolve) => {
            inConverter.end(() => {
                resolve();
            });
        });

        await _this._setCurrentSyncState(syncJob.syncState, syncJob);

        return playedBackRanges;
    },

    resetCounters() {

    },

});



module.exports = TestRecorder;
