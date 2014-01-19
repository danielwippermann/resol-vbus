/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;


var _ = require('lodash');
var Q = require('q');


var extend = require('./extend');
var HeaderSetConsolidator = require('./header-set-consolidator');
var utils = require('./utils');
var VBusRecordingConverter = require('./vbus-recording-converter');



var optionKeys = [
    'id',
    'minTimestamp',
    'maxTimestamp',
    'interval',
];



var Recorder = extend(EventEmitter, /** @lends Recorder# */ {

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
    constructor: function(options) {
        EventEmitter.call(this);

        _.extend(this, _.pick(options, optionKeys));

        if (!this.id) {
            this.id = utils.generateGUID();
        }
        if (!this.minTimestamp) {
            this.minTimestamp = new Date(Date.UTC(2001, 0));
        }
        if (!this.maxTimestamp) {
            this.maxTimestamp = new Date(Date.UTC(2038, 0));
        }
    },

    _getOptions: function() {
        return _.extend({}, _.pick(this, optionKeys));
    },

    /**
     * Plays back a given range of HeaderSets. The HeaderSets are serialized to
     * the stream using the VBusRecordingConverter.
     *
     * @param {Writable} stream A writable stream
     * @param {object} options Options to select and filter HeaderSets
     * @param {Date} [options.minTimestamp] {@link Recorder#minTimestamp}
     * @param {Date} [options.maxTimestamp] {@link Recorder#maxTimestamp}
     * @param {number} [options.interval] {@link Recorder#interval}
     * @param {boolean} [options.end=true] Whether the stream should be `end()`ed when the playback is complete
     */
    playback: function(stream, options) {
        var _this = this;

        options = _.defaults({}, options, this._getOptions(), {
            end: true
        });

        var converter = new VBusRecordingConverter();

        converter.pipe(stream);

        var headerSetConsolidator = new HeaderSetConsolidator({
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
            interval: options.interval,
        });

        var playedBackRanges = [];

        headerSetConsolidator.on('headerSet', function(headerSet) {
            var timestamp = headerSet.timestamp;

            var headerSetRange = {
                minTimestamp: timestamp,
                maxTimestamp: timestamp,
            };

            playedBackRanges = Recorder.performRangeSetOperation(playedBackRanges, [ headerSetRange ], options.interval, 'union');

            converter.convertHeaderSet(headerSet);
        });

        return Q.try(function() {
            return _this._playback(headerSetConsolidator, options);
        }).then(function() {
            if (options.end) {
                return utils.promise(function(resolve) {
                    stream.end(function() {
                        resolve();
                    });
                });
            }
        }).then(function() {
            return playedBackRanges;
        });
    },

    _playback: function(headerSetConsolidator, options) {
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
    synchronizeTo: function(recorder, options) {
        var _this = this;

        options = _.extend({}, this._getOptions(), options);

        return Q.try(function() {
            return recorder._getCurrentSyncState(options);
        }).then(function(oldSyncState) {
            oldSyncState = _.cloneDeep(oldSyncState);
            
            if (!oldSyncState.sourceSyncState) {
                oldSyncState.sourceSyncState = {};
            }
            if (!oldSyncState.destinationSyncState) {
                oldSyncState.destinationSyncState = {};
            }

            return _this._getSyncJob(oldSyncState, options);
        }).then(function(syncJob) {
            return recorder._recordSyncJob(_this, syncJob);
        });
    },

    _getCurrentSyncState: function(options) {
        throw new Error('Must be implemented by sub-class');
    },

    _getSyncJob: function(oldSyncState, options) {
        var syncJob = _.extend({}, options, {
            syncId: utils.generateGUID(),
            syncState: oldSyncState,
            syncStateDiffs: [],
        });

        if (!syncJob.syncState.sourceSyncState.Recorder) {
            syncJob.syncState.sourceSyncState.Recorder = {};
        }

        var syncState = syncJob.syncState.sourceSyncState.Recorder;

        // migrate
        var syncVersion = syncState.version || 0;
        if (syncVersion === 0) {
            syncVersion = 1;
            syncState.rangesByInterval = {};
        }
        syncState.version = syncVersion;

        if (!syncState.rangesByInterval [options.interval]) {
            syncState.rangesByInterval [options.interval] = [];
        }

        // find diffs
        var syncStateDiffs = syncJob.syncStateDiffs;
        syncStateDiffs.push({ 
            minTimestamp: options.minTimestamp,
            maxTimestamp: options.maxTimestamp,
        });

        _.forEach(syncState.rangesByInterval, function(ranges, rangesKey) {
            var interval = rangesKey | 0;
            if ((options.interval % interval) === 0) {
                syncStateDiffs = Recorder.performRangeSetOperation(syncStateDiffs, ranges, interval, 'difference');
            }
        });

        syncJob.syncStateDiffs = syncStateDiffs;

        return Q(syncJob);
    },

    _recordSyncJob: function(recorder, syncJob) {
        throw new Error('Must be implemented by sub-class');
    },

    _playbackSyncJob: function(stream, syncJob) {
        throw new Error('Must be implemented by sub-class');
    },

    _markSourceSyncRanges: function(ranges, syncJob) {
        var syncState = syncJob.syncState.sourceSyncState.Recorder;

        var handledRanges = syncState.rangesByInterval [syncJob.interval];

        handledRanges = Recorder.performRangeSetOperation(handledRanges, ranges, syncJob.interval, 'union');

        syncState.rangesByInterval [syncJob.interval] = handledRanges;
    },

}, /** @lends Recorder. */ {

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
    performRangeSetOperation: function(rangesA, rangesB, interval, operation) {
        var newInfos = [];

        var calcBaseTimestamp = function(timestamp) {
            if (interval > 0) {
                return Math.floor(timestamp / interval) * interval;
            } else {
                return timestamp;
            }
        };

        var rangeToInfo = function(range) {
            var minTimestamp = range.minTimestamp;
            if (typeof minTimestamp.getTime === 'function') {
                minTimestamp = minTimestamp.getTime();
            } else if (typeof minTimestamp === 'string') {
                minTimestamp = new Date(minTimestamp).getTime();
            } else if (typeof minTimestamp !== 'number') {
                throw new Error('Invalid minTimestamp "' + minTimestamp + '" (type "' + typeof minTimestamp + '"');
            }

            var maxTimestamp = range.maxTimestamp;
            if (typeof maxTimestamp.getTime === 'function') {
                maxTimestamp = maxTimestamp.getTime();
            } else if (typeof maxTimestamp === 'string') {
                maxTimestamp = new Date(maxTimestamp).getTime();
            } else if (typeof maxTimestamp !== 'number') {
                throw new Error('Invalid maxTimestamp "' + maxTimestamp + '" (type "' + typeof maxTimestamp + '"');
            }

            var minBaseTimestamp = calcBaseTimestamp(minTimestamp);
            var maxBaseTimestamp = calcBaseTimestamp(maxTimestamp + interval);

            return {
                minTimestamp: minTimestamp,
                maxTimestamp: maxTimestamp,
                minBaseTimestamp: minBaseTimestamp,
                maxBaseTimestamp: maxBaseTimestamp,
                valid: true,
            };
        };

        var infoToRange = function(info) {
            var range;
            if (info && info.valid) {
                range = {
                    minTimestamp: new Date(info.minTimestamp),
                    maxTimestamp: new Date(info.maxTimestamp),
                };
            }
            return range;
        };

        var processInfo = function(refInfo, operation) {
            if (!refInfo || !refInfo.valid || (refInfo.minTimestamp > refInfo.maxTimestamp)) {
                return;
            }

            for (var i = 0; i <= newInfos.length; i++) {
                var newInfo = newInfos [i];

                var nextInfo;
                for (var j = i + 1; j < newInfos.length; j++) {
                    if (newInfos [j].valid) {
                        nextInfo = newInfos [j];
                        break;
                    }
                }

                var insert = false, deleteThis = false;
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
                        var splitInfo = {
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

        var processInfos = function(infos, operation) {
            _.forEach(_.clone(infos), function(info, index) {
                processInfo(info, operation);
            });
        };

        var infosA = _.map(rangesA, rangeToInfo);

        var infosB = _.map(rangesB, rangeToInfo);

        if (operation === 'intersection') {
            processInfos(infosA, 'union');
            processInfos(infosB, 'difference');

            var infosAMinusB = newInfos;
            newInfos = [];

            processInfos(infosB, 'union');
            processInfos(infosA, 'difference');

            var infosBMinusA = newInfos;
            newInfos = [];

            processInfos(infosA, 'union');
            processInfos(infosB, 'union');

            processInfos(infosAMinusB, 'difference');
            processInfos(infosBMinusA, 'difference');
        } else {
            _.forEach(infosA, function(info) {
                processInfo(info, 'union');
            });

            _.forEach(infosB, function(info) {
                processInfo(info, operation);
            });
        }

        var newRanges = [];
        _.forEach(newInfos, function(newInfo) {
            var newRange = infoToRange(newInfo);
            if (newRange) {
                newRanges.push(newRange);
            }
        });

        return newRanges;
    },

});



module.exports = Recorder;
