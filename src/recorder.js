/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const EventEmitter = require('events').EventEmitter;


const extend = require('./extend');
const Header = require('./header');
const HeaderSet = require('./header-set');
const HeaderSetConsolidator = require('./header-set-consolidator');
const _ = require('./lodash');
const { generateGUID } = require('./utils');



const optionKeys = [
    'id',
    'minTimestamp',
    'maxTimestamp',
    'interval',
    'timeToLive',
];



const Recorder = extend(EventEmitter, /** @lends Recorder# */ {

    /**
     * Identifier for this recorder instance. It may be used to reference
     * recorders, for example in sync data storage.
     * @type {string}
     */
    id: null,

    /**
     * Minimum timestamp to use as a default during playback and
     * synchronization.
     * @type {Date}
     * @default '2001-01-01T00:00:00.000Z'
     */
    minTimestamp: null,

    /**
     * Maximum timestamp to use as a default during playback and
     * synchronization.
     * @type {Date}
     * @default '2038-01-01T00:00:00.000Z'
     */
    maxTimestamp: null,

    /**
     * Interval to be used as a default during playback and
     * synchronization.
     * @type {number}
     * @default 0
     */
    interval: 0,

    /**
     * Creates a new Recorder instance and optionally initializes
     * its members with the given values.
     *
     * @constructs
     * @param {object} options Initialization values for this instance's members
     * @param {string} options.id {@link Recorder#id}
     * @param {Date} options.minTimestamp {@link Recorder#minTimestamp}
     * @param {Date} options.maxTimestamp {@link Recorder#maxTimestamp}
     * @param {number} options.interval {@link Recorder#interval}
     *
     * @classdesc
     * A Recorder provides access to HeaderSet stores (e.g. dataloggers) by
     * allowing to either playback the HeaderSets in the store, record
     * HeaderSets to the store or synchronize two Recorders.
     *
     * The playback and record operation both use the VBusRecordingConverter
     * to serialize the HeaderSets to and from Node.js streams.
     *
     * The synchronization operation builds on top of this two operations
     * and is able to find unsynced HeaderSets in the source Recorder.
     * Thoses unsynced HeaderSets are then played back from the source Recorder
     * and recorded in the destination Recorder.
     *
     * The storage mechanism and format of the Recorder sub-classes is
     * implementation-specific to this class.
     */
    constructor(options) {
        EventEmitter.call(this);

        _.extend(this, _.pick(options, optionKeys));

        if (!this.id) {
            this.id = generateGUID();
        }
        if (!this.minTimestamp) {
            this.minTimestamp = new Date(Date.UTC(2001, 0));
        }
        if (!this.maxTimestamp) {
            this.maxTimestamp = new Date(Date.UTC(2038, 0));
        }
    },

    _getOptions() {
        return _.extend({}, _.pick(this, optionKeys));
    },

    /**
     * Plays back a given range of HeaderSets. The stream must be in object mode.
     *
     * @param {Writable} stream A writable stream
     * @param {object} options Options to select and filter HeaderSets
     * @param {Date} [options.minTimestamp] {@link Recorder#minTimestamp}
     * @param {Date} [options.maxTimestamp] {@link Recorder#maxTimestamp}
     * @param {number} [options.interval] {@link Recorder#interval}
     * @param {boolean} [options.end=true] Whether the stream should be `end()`ed when the playback is complete
     */
    async playback(stream, options) {
        const _this = this;

        options = _.defaults({}, options, this._getOptions(), {
            end: true
        });

        if (!stream.objectMode) {
            throw new Error('Stream must be in object mode');
        }

        const headerSetConsolidator = new HeaderSetConsolidator({
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
            interval: options.interval,
        });

        let playedBackRanges = [];

        headerSetConsolidator.on('headerSet', (headerSet) => {
            const timestamp = headerSet.timestamp;

            const headerSetRange = {
                minTimestamp: timestamp,
                maxTimestamp: timestamp,
            };

            playedBackRanges = Recorder.performRangeSetOperation(playedBackRanges, [ headerSetRange ], options.interval, 'union');

            stream.write(headerSet);
        });

        await _this._playback(headerSetConsolidator, options);

        if (options.end) {
            await new Promise((resolve) => {
                stream.end(() => {
                    resolve();
                });
            });
        }

        return playedBackRanges;
    },

    _playback(headerSetConsolidator, options) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Records a given range of HeaderSet instances. The stream must be in object mode.
     *
     * @param {Readable} stream A readable stream in object mode.
     * @param {object} options Options to select and filter HeaderSet instances.
     * @param {Date} [options.minTimestamp] See {@link Recorder#minTimestamp}
     * @param {Date} [options.maxTimestamp] See {@link Recorder#maxTimestamp}
     * @param {number} [options.interval] See {@link Recorder#interval}
     * @return {Promise} A Promise that resolves to the recorded ranges.
     */
    async record(stream, options) {
        const _this = this;

        options = _.defaults({}, options, this._getOptions(), {
        });

        if (!stream.objectMode) {
            throw new Error('Stream must be in object mode');
        }

        const headerSetConsolidator = new HeaderSetConsolidator({
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
            interval: options.interval,
            timeToLive: options.timeToLive,
        });

        let recordedRanges = [];

        headerSetConsolidator.on('headerSet', (headerSet) => {
            const timestamp = headerSet.timestamp;

            const headerSetRange = {
                minTimestamp: timestamp,
                maxTimestamp: timestamp,
            };

            recordedRanges = Recorder.performRangeSetOperation(recordedRanges, [ headerSetRange ], options.interval, 'union');
        });

        const recordingJob = _.defaults({}, options, {
            recordedRanges,
        });

        const recording = await _this._startRecording(headerSetConsolidator, recordingJob);

        try {
            await new Promise((resolve, reject) => {
                let onData = undefined, onEnd = undefined, onError = undefined;

                const cleanup = function() {
                    stream.removeListener('data', onData);
                    stream.removeListener('end', onEnd);
                    stream.removeListener('error', onError);
                };

                onData = function(obj) {
                    if (obj instanceof Header) {
                        headerSetConsolidator.addHeader(obj);
                    } else if (obj instanceof HeaderSet) {
                        headerSetConsolidator.processHeaderSet(obj);
                    } else {
                        throw new Error('Unsupported object received by Recorder');
                    }
                };

                onEnd = function() {
                    cleanup();

                    resolve();
                };

                onError = function(err) {
                    cleanup();

                    reject(err);
                };

                stream.on('data', onData);
                stream.on('end', onEnd);
                stream.on('error', onError);
                stream.resume();
            });
        } finally {
            await _this._endRecording(headerSetConsolidator, recordingJob, recording);
        }

        return recordedRanges;
    },

    _startRecording(headerSetConsolidator, recordingJob) {
        throw new Error('Must be implemented by sub-class');
    },

    _endRecording(headerSetConsolidator, recordingJob, recording) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Synchronize this Recorder's HeaderSets to another Recorder.
     *
     * @param {Recorder} recorder Destination Recorder
     * @param {object} options Options to select and filter HeaderSets
     * @param {Date} [options.minTimestamp] {@link Recorder#minTimestamp}
     * @param {Date} [options.maxTimestamp] {@link Recorder#maxTimestamp}
     * @param {number} [options.interval] {@link Recorder#interval}
     * @returns {Promise} Promise resolving with a list of ranges that were synchronized.
     */
    async synchronizeTo(recorder, options) {
        const _this = this;

        options = _.extend({}, this._getOptions(), options);

        let oldSyncState = await recorder._getCurrentSyncState(options);

        oldSyncState = _.cloneDeep(oldSyncState);

        if (!oldSyncState.sourceSyncState) {
            oldSyncState.sourceSyncState = {};
        }
        if (!oldSyncState.destinationSyncState) {
            oldSyncState.destinationSyncState = {};
        }

        const syncJob = await _this._getSyncJob(oldSyncState, options);

        return recorder._recordSyncJob(_this, syncJob);
    },

    _getCurrentSyncState(options) {
        throw new Error('Must be implemented by sub-class');
    },

    _getSyncJob(oldSyncState, options) {
        const syncJob = _.extend({}, options, {
            syncId: generateGUID(),
            syncState: oldSyncState,
            syncStateDiffs: [],
        });

        const syncState = this._getSyncState(syncJob, 'source', 'Recorder');

        // migrate
        let syncVersion = syncState.version || 0;
        if (syncVersion === 0) {
            syncVersion = 1;
            syncState.rangesByInterval = {};
        }
        syncState.version = syncVersion;

        if (!syncState.rangesByInterval [options.interval]) {
            syncState.rangesByInterval [options.interval] = [];
        }

        // find diffs
        let syncStateDiffs = syncJob.syncStateDiffs;
        syncStateDiffs.push({
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
        });

        _.forEach(syncState.rangesByInterval, (ranges, rangesKey) => {
            const interval = rangesKey | 0;
            if ((options.interval % interval) === 0) {
                ranges = _.map(ranges, (range) => {
                    return {
                        minTimestamp: Recorder.alignTimestampToInterval(range.minTimestamp, interval),
                        maxTimestamp: Recorder.alignTimestampToInterval(range.maxTimestamp, interval) + interval,
                    };
                });

                syncStateDiffs = Recorder.performRangeSetOperation(syncStateDiffs, ranges, interval, 'difference');
            }
        });

        syncJob.syncStateDiffs = syncStateDiffs;

        return Promise.resolve(syncJob);
    },

    /**
     * Starts a playback of the provided recorder, recording its data and returning a
     * Promise that resolves to the recorded ranges.
     *
     * @param {Recorder} recorder The recorder to use for playback
     * @param {RecorderSyncJob} syncJob The synchronization job to perform.
     * @returns {Promise} Promise resolving with a list of ranges that were synchronized.
     */
    _recordSyncJob(recorder, syncJob) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Plays back the requested synchronization job, piping the resulting data into the
     * provided stream. Returns a Promise that resolves to the played back ranges.
     *
     * @param {Stream} stream The stream (in object mode) to pipe data into
     * @param {RecorderSyncJob} syncJob The synchronization job to perform.
     * @returns {Promise} Promise resolving with a list of ranges that were synchronized.
     */
    _playbackSyncJob(stream, syncJob) {
        throw new Error('Must be implemented by sub-class');
    },

    _getSyncState(syncJobOrState, which, type) {
        let syncState;
        if (_.has(syncJobOrState, 'syncState') && _.has(syncJobOrState, 'syncId')) {
            syncState = syncJobOrState.syncState;
        } else {
            syncState = syncJobOrState;
        }

        const syncStateKey = which + 'SyncState';

        if (!_.has(syncState, syncStateKey)) {
            syncState [syncStateKey] = {};
        }

        const syncStateRoot = syncState [syncStateKey];

        if (!_.has(syncStateRoot, type)) {
            syncStateRoot [type] = {};
        }

        return syncStateRoot [type];
    },

    _markSourceSyncRanges(ranges, syncJob) {
        const syncState = this._getSyncState(syncJob, 'source', 'Recorder');

        let handledRanges = syncState.rangesByInterval [syncJob.interval];

        handledRanges = Recorder.performRangeSetOperation(handledRanges, ranges, syncJob.interval, 'union');

        syncState.rangesByInterval [syncJob.interval] = handledRanges;
    },

}, /** @lends Recorder. */ {

    alignTimestampToInterval(timestamp, interval) {
        if (typeof timestamp.getTime === 'function') {
            timestamp = timestamp.getTime();
        } else if (typeof timestamp === 'string') {
            timestamp = new Date(timestamp).getTime();
        } else if (typeof timestamp !== 'number') {
            throw new Error('Invalid timestamp "' + timestamp + '" (type "' + typeof timestamp + '"');
        }

        if (_.isNumber(interval) && (interval > 0)) {
            return Math.floor(timestamp / interval) * interval;
        } else {
            return timestamp;
        }
    },

    /**
     * Performs operations on two sets of timestamp ranges.
     *
     * Timestamp ranges are objects with two properties: `minTimestamp` and `maxTimestamp`.
     *
     * The operations correspond to the operations in mathematic's set theory.
     * Currently supported are union, difference and intersection.
     *
     * See [http://en.wikipedia.org/wiki/Set_theory]() for details.
     *
     * @param {Array} rangesA Set A containing timestamp ranges
     * @param {Array} rangesB Set B containing timestamp ranges
     * @param {number} interval Interval to allow between adjacent timestamp ranges
     * @param {string} operation Operation to perform, can be `'union'`, `'difference'` or `'intersection'`
     * @returns {Array} Set containing timestamp ranges after the operation
     */
    performRangeSetOperation(rangesA, rangesB, interval, operation) {
        let newInfos = [];

        const calcBaseTimestamp = function(timestamp) {
            if (interval > 0) {
                return Math.floor(timestamp / interval) * interval;
            } else {
                return timestamp;
            }
        };

        const rangeToInfo = function(range) {
            let minTimestamp = range.minTimestamp;
            if (typeof minTimestamp.getTime === 'function') {
                minTimestamp = minTimestamp.getTime();
            } else if (typeof minTimestamp === 'string') {
                minTimestamp = new Date(minTimestamp).getTime();
            } else if (typeof minTimestamp !== 'number') {
                throw new Error('Invalid minTimestamp "' + minTimestamp + '" (type "' + typeof minTimestamp + '"');
            }

            let maxTimestamp = range.maxTimestamp;
            if (typeof maxTimestamp.getTime === 'function') {
                maxTimestamp = maxTimestamp.getTime();
            } else if (typeof maxTimestamp === 'string') {
                maxTimestamp = new Date(maxTimestamp).getTime();
            } else if (typeof maxTimestamp !== 'number') {
                throw new Error('Invalid maxTimestamp "' + maxTimestamp + '" (type "' + typeof maxTimestamp + '"');
            }

            const minBaseTimestamp = calcBaseTimestamp(minTimestamp);
            const maxBaseTimestamp = calcBaseTimestamp(maxTimestamp + interval);

            return {
                minTimestamp,
                maxTimestamp,
                minBaseTimestamp,
                maxBaseTimestamp,
                valid: true,
            };
        };

        const infoToRange = function(info) {
            let range;
            if (info && info.valid) {
                range = {
                    minTimestamp: new Date(info.minTimestamp),
                    maxTimestamp: new Date(info.maxTimestamp),
                };
            }
            return range;
        };

        const processInfo = function(refInfo, operation) {
            if (!refInfo || !refInfo.valid || (refInfo.minTimestamp > refInfo.maxTimestamp)) {
                return;
            }

            let nextInfo;
            for (let i = 0; i <= newInfos.length; i++) {
                const newInfo = newInfos [i];

                for (let j = i + 1; j < newInfos.length; j++) {
                    if (newInfos [j].valid) {
                        nextInfo = newInfos [j];
                        break;
                    }
                }

                let insert = false, deleteThis = false;
                if (newInfo && !newInfo.valid) {
                    // skip
                } else if (operation === 'union') {
                    if (i === newInfos.length) {
                        // append
                        insert = true;
                    } else if (refInfo.minBaseTimestamp > newInfo.maxBaseTimestamp) {
                        // skip
                    } else if (refInfo.maxBaseTimestamp < newInfo.minBaseTimestamp) {
                        // insert
                        insert = true;
                    } else if (nextInfo && (refInfo.maxBaseTimestamp >= nextInfo.minBaseTimestamp)) {
                        // union into next info
                        if (refInfo.minTimestamp > newInfo.minTimestamp) {
                            refInfo.minTimestamp = newInfo.minTimestamp;
                        }
                        if (refInfo.minBaseTimestamp > newInfo.minBaseTimestamp) {
                            refInfo.minBaseTimestamp = newInfo.minBaseTimestamp;
                        }
                        newInfo.valid = false;
                    } else {
                        // union into this info
                        if (newInfo.minTimestamp > refInfo.minTimestamp) {
                            newInfo.minTimestamp = refInfo.minTimestamp;
                        }
                        if (newInfo.maxTimestamp < refInfo.maxTimestamp) {
                            newInfo.maxTimestamp = refInfo.maxTimestamp;
                        }
                        if (newInfo.minBaseTimestamp > refInfo.minBaseTimestamp) {
                            newInfo.minBaseTimestamp = refInfo.minBaseTimestamp;
                        }
                        if (newInfo.maxBaseTimestamp < refInfo.maxBaseTimestamp) {
                            newInfo.maxBaseTimestamp = refInfo.maxBaseTimestamp;
                        }
                        break;
                    }
                } else if (operation === 'difference') {
                    if (i === newInfos.length) {
                        // skip
                    } else if (refInfo.minBaseTimestamp > newInfo.maxBaseTimestamp) {
                        // skip
                    } else if (refInfo.maxBaseTimestamp < newInfo.minBaseTimestamp) {
                        // skip
                    } else if (refInfo.minBaseTimestamp <= newInfo.minBaseTimestamp) {
                        if (refInfo.maxBaseTimestamp >= newInfo.maxBaseTimestamp) {
                            deleteThis = true;
                        } else {
                            if (newInfo.minTimestamp < refInfo.maxTimestamp + 1) {
                                newInfo.minTimestamp = refInfo.maxTimestamp + 1;
                            }
                            newInfo.minBaseTimestamp = refInfo.maxBaseTimestamp + 1;
                        }
                    } else if (refInfo.maxBaseTimestamp >= newInfo.maxBaseTimestamp) {
                        if (newInfo.maxTimestamp > refInfo.minTimestamp - 1) {
                            newInfo.maxTimestamp = refInfo.minTimestamp - 1;
                        }
                        newInfo.maxBaseTimestamp = refInfo.minBaseTimestamp - 1;
                    } else {
                        // split
                        const splitInfo = {
                            minTimestamp: newInfo.minTimestamp,
                            maxTimestamp: refInfo.minTimestamp - 1,
                            minBaseTimestamp: newInfo.minBaseTimestamp,
                            maxBaseTimestamp: refInfo.minBaseTimestamp - 1,
                            valid: true,
                        };
                        newInfos.splice(i, 0, splitInfo);

                        newInfo.minTimestamp = refInfo.maxBaseTimestamp + 1;
                        newInfo.minBaseTimestamp = refInfo.maxBaseTimestamp + 1;
                        break;
                    }

                } else {
                    throw new Error('Unknown set operation "' + operation + '"');
                }

                if (insert) {
                    newInfos.splice(i, 0, _.clone(refInfo));
                    break;
                } else if (deleteThis) {
                    newInfo.valid = false;
                }
            }
        };

        const processInfos = function(infos, operation) {
            _.forEach(_.clone(infos), (info, index) => {
                processInfo(info, operation);
            });
        };

        const infosA = _.map(rangesA, rangeToInfo);

        const infosB = _.map(rangesB, rangeToInfo);

        if (operation === 'intersection') {
            processInfos(infosA, 'union');
            processInfos(infosB, 'difference');

            const infosAMinusB = newInfos;
            newInfos = [];

            processInfos(infosB, 'union');
            processInfos(infosA, 'difference');

            const infosBMinusA = newInfos;
            newInfos = [];

            processInfos(infosA, 'union');
            processInfos(infosB, 'union');

            processInfos(infosAMinusB, 'difference');
            processInfos(infosBMinusA, 'difference');
        } else {
            _.forEach(infosA, (info) => {
                processInfo(info, 'union');
            });

            _.forEach(infosB, (info) => {
                processInfo(info, operation);
            });
        }

        const newRanges = [];
        _.forEach(newInfos, (newInfo) => {
            const newRange = infoToRange(newInfo);
            if (newRange) {
                newRanges.push(newRange);
            }
        });

        return newRanges;
    },

});



module.exports = Recorder;
