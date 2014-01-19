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

    id: null,

    minTimestamp: null,

    maxTimestamp: null,

    interval: 0,

    /**
     * Creates a new Recorder instance.
     *
     * @constructs

     * @classdesc
     * A Recorder is a storage for HeaderSet object.
     * 
     * The storage format and retrieval is implementation specific.
     * 
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

        var syncState = syncJob.syncState.sourceSyncState;

        // migrate
        var syncVersion = syncState.recorderVersion || 0;
        if (syncVersion === 0) {
            syncVersion = 1;
            syncState.rangesByInterval = {};
        }
        syncState.recorderVersion = syncVersion;

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

}, /** @lends Recorder. */ {

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
                            if (newInfo.minTimestamp < refInfo.maxTimestamp) {
                                newInfo.minTimestamp = refInfo.maxTimestamp;
                            }
                            newInfo.minBaseTimestamp = refInfo.maxBaseTimestamp;
                        }
                    } else if (refInfo.maxBaseTimestamp >= newInfo.maxBaseTimestamp) {
                        if (newInfo.maxTimestamp > refInfo.minTimestamp) {
                            newInfo.maxTimestamp = refInfo.minTimestamp;
                        }
                        newInfo.maxBaseTimestamp = refInfo.minBaseTimestamp;
                    } else {
                        // split
                        var splitInfo = {
                            minTimestamp: newInfo.minTimestamp,
                            maxTimestamp: refInfo.minTimestamp,
                            minBaseTimestamp: newInfo.minBaseTimestamp,
                            maxBaseTimestamp: refInfo.minBaseTimestamp,
                            valid: true,
                        };
                        newInfos.splice(i, 0, splitInfo);

                        newInfo.minTimestamp = refInfo.maxBaseTimestamp;
                        newInfo.minBaseTimestamp = refInfo.maxBaseTimestamp;
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
            if (newInfo.valid) {
                newRanges.push({
                    minTimestamp: new Date(newInfo.minTimestamp),
                    maxTimestamp: new Date(newInfo.maxTimestamp),
                });
            }
        });

        return newRanges;
    },

});



module.exports = Recorder;
