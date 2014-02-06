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
        return path.resolve(this.path, this.getHash(this.id), filename);
    },

    _getCurrentSyncStateFilename: function(options) {
        return this._getAbsoluteFilename(this.getHash(options.id) + '_SyncState.json');
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

    _recordSyncJob: function(recorder, syncJob) {
        var _this = this;

        var syncState = this._getSyncState(syncJob, 'destination', 'FileSystemRecorder');

        var syncVersion = syncState.version || 0;
        if (syncVersion === 0) {
            syncVersion = 1;
            syncState.infoListByInterval = {};
        }
        syncState.version = syncVersion;

        if (!syncState.infoListByInterval [syncJob.interval]) {
            syncState.infoListByInterval [syncJob.interval] = [];
        }

        var infoList = syncState.infoListByInterval [syncJob.interval];

        var lastTimestamp = null;

        var currentInfo = null;

        var outFile = null;

        var outConverter = null;

        var inConverter = new VBusRecordingConverter();

        inConverter.on('headerSet', function(headerSet) {
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
                combinedRange = Recorder.performRangeSetOperation(currentInfo.ranges, thisRanges, syncJob.interval, 'union');

                useCurrentInfo = ((combinedRange.length === 1) && (combinedRange [0].maxTimestamp.getTime() === timestamp.getTime()));
            }

            if (!useCurrentInfo) {
                // find other range, prefer existing ranges before starting a new one
                for (var i = 0; i < infoList.length; i++) {
                    var info = infoList [i];

                    if (info && (info.datecode === datecode)) {
                        combinedRange = Recorder.performRangeSetOperation(info.ranges, thisRanges, syncJob.interval, 'union');

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
                var filename = _this.getHash(syncJob.id) + '_' + syncJob.interval + '_' + timestampText + '.vbus';

                currentInfo = {
                    ranges: thisRanges,
                    filename: filename,
                    datecode: datecode,
                };

                infoList.push(currentInfo);

                console.log('Starting new info ', currentInfo);
            }

            if (currentInfo !== previousInfo) {
                if (outConverter) {
                    outConverter.end();
                }

                var path = _this._getAbsoluteFilename(currentInfo.filename);

                console.log('Starting new file ' + path);

                outFile = fs.createWriteStream(path, {
                    flags: 'a'
                });

                outConverter = new VBusRecordingConverter();

                outConverter.pipe(outFile);
            }

            // console.log(timestamp.toString());

            outConverter.convertHeaderSet(headerSet);
        });

        return Q.fcall(function() {
            return recorder._playbackSyncJob(inConverter, syncJob);
        }).then(function(playedBackRanges) {
            return utils.promise(function(resolve) {
                var done = function() {
                    resolve(playedBackRanges);
                };

                inConverter.end(function() {
                    if (outConverter) {
                        outConverter.end(function() {
                            done();
                        });
                    } else {
                        done();
                    }
                });
            });
        }).then(function(playedBackRanges) {
            console.log(playedBackRanges);

            return _this._setCurrentSyncState(syncJob.syncState, syncJob);
        });
    },

    getHash: function(filename) {
        var url = this.urlPrefix + filename;

        var shasum = crypto.createHash('sha1');

        shasum.update(new Buffer(url, 'utf8'));

        return shasum.digest('hex');
    },

});



module.exports = FileSystemRecorder;
