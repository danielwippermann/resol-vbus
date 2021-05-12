/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const moment = require('moment');
const request = require('request');


const _ = require('./lodash');
const VBusRecordingConverter = require('./vbus-recording-converter');

const Recorder = require('./recorder');



const optionKeys = [
    'urlPrefix',
    'username',
    'password',
];



class DLxRecorder extends Recorder {

    /**
     * Creates a new DLxRecorder instance.
     * @constructs
     * @augments Recorder
     *
     * @classdesc
     * DLxRecorder is a recorder that can play back data recorded by a Datalogger.
     */
    constructor(options) {
        super(options);

        _.extend(this, _.pick(options, optionKeys));
    }

    _getOptions() {
        const options = Recorder.prototype._getOptions.call(this);
        return _.extend(options, _.pick(this, optionKeys));
    }

    async _playback(headerSetConsolidator, options) {
        const _this = this;

        const converter = new VBusRecordingConverter();

        converter.on('headerSet', (headerSet) => {
            headerSetConsolidator.processHeaderSet(headerSet);
        });

        if (options.apiAccess) {
            await _this._playbackApi(converter, options);
        } else {
            await _this._playbackRaw(converter, options);
        }

        converter.end();
    }

    async _playbackRaw(converter, options) {
        const _this = this;

        const minFilename = moment.utc(options.minTimestamp).format('[/log/]YYYYMMDD');
        const maxFilename = moment.utc(options.maxTimestamp).format('[/log/]YYYYMMDD');

        const filenames = await _this.getRecordingFilenames(options);

        const matchingFilenames = filenames.reduce((memo, filename) => {
            const filenamePrefix = filename.slice(0, minFilename.length);

            if ((filenamePrefix >= minFilename) && (filenamePrefix <= maxFilename)) {
                memo.push(filename);
            }

            return memo;
        }, []);

        for (const filename of matchingFilenames) {
            const urlString = options.urlPrefix + filename;

            const urlOptions = {
                auth: {
                    username: options.username,
                    password: options.password,
                },
            };

            await _this.downloadToStream(urlString, urlOptions, converter);
        }
    }

    async _playbackApi(converter, options) {
        const urlString = options.urlPrefix + '/dlx/download/download';

        const urlOptions = {
            qs: {
                sessionAuthUsername: options.username,
                sessionAuthPassword: options.password,
                source: 'log',
                inputType: 'packets',
                outputType: 'vbus',
                sieveInterval: Math.round(options.interval / 1000) || 1,
                startDate: moment(options.minTimestamp).format('MM/DD/YYYY'),
                endDate: moment(options.maxTimestamp).format('MM/DD/YYYY'),
                dataLanguage: 'en',
            },
            auth: {
                username: options.username,
                password: options.password,
            },
        };

        return this.downloadToStream(urlString, urlOptions, converter);
    }

    async _playbackSyncJob(stream, syncJob) {
        const _this = this;

        if (!stream.objectMode) {
            throw new Error('Stream must be in object mode');
        }

        /* var syncState = */ this._getSyncState(syncJob, 'source', 'DLxRecorder');

        const availableRanges = await _this.getLazyRecordingRanges();

        const ranges = Recorder.performRangeSetOperation(availableRanges, syncJob.syncStateDiffs, syncJob.interval, 'intersection');

        let playedBackRanges = [];

        for (const range of ranges) {
            const options = _.extend({}, syncJob, {
                minTimestamp: range.minTimestamp,
                maxTimestamp: range.maxTimestamp,
                end: false,
            });

            const newRanges = await _this.playback(stream, options);

            playedBackRanges = Recorder.performRangeSetOperation(playedBackRanges, newRanges, syncJob.interval, 'union');
        }

        let handledRanges = playedBackRanges;

        if (handledRanges.length > 0) {
            let maxTimestamp;
            if (syncJob.markGapsAsUnsynced) {
                maxTimestamp = handledRanges [0].minTimestamp;
            } else {
                maxTimestamp = handledRanges [handledRanges.length - 1].minTimestamp;
            }

            const notAvailableRanges = [{
                minTimestamp: new Date(Date.UTC(2001, 0)),
                maxTimestamp,
            }];

            handledRanges = Recorder.performRangeSetOperation(handledRanges, notAvailableRanges, syncJob.interval, 'union');
        }

        _this._markSourceSyncRanges(handledRanges, syncJob);

        return playedBackRanges;
    }

    async getLazyRecordingRanges() {
        const _this = this;

        const filenames = await _this.getRecordingFilenames();

        let ranges = _.map(filenames, (filename) => {
            const minTimestamp = moment.utc(filename.slice(5, 13), 'YYYYMMDD');
            const maxTimestamp = moment.utc(minTimestamp).add({ hours: 24 });
            return {
                minTimestamp: minTimestamp.toDate(),
                maxTimestamp: maxTimestamp.toDate(),
            };
        });

        ranges = Recorder.performRangeSetOperation(ranges, [], 86400000, 'union');

        return ranges;
    }

    getRecordingFilenames() {
        return new Promise((resolve, reject) => {
            let rxBuffer = null;

            const filenames = [];

            const onResponse = function(res) {
            };

            const onData = function(chunk) {
                let buffer;
                if (rxBuffer) {
                    buffer = Buffer.concat([ rxBuffer, chunk ]);
                } else {
                    buffer = chunk;
                }

                let string = buffer.toString('utf8');

                const re = /<a href="([0-9]{8}_[a-z]+.vbus)">/g;

                let md, index;
                while ((md = re.exec(string)) !== null) {
                    filenames.push('/log/' + md [1]);
                    index = re.lastIndex;
                }

                string = string.slice(index);

                rxBuffer = Buffer.from(string, 'utf8');
            };

            const onEnd = function() {
                resolve(filenames.sort());
            };

            const onError = function(err) {
                reject(err);
            };

            const urlOptions = {
                auth: {
                    username: this.username,
                    password: this.password,
                },
            };

            const stream = this._request(this.urlPrefix + '/log/', urlOptions);
            stream.on('response', onResponse);
            stream.on('data', onData);
            stream.on('end', onEnd);
            stream.on('error', onError);
        });
    }

    getRecordingInfo(filename) {
        return new Promise((resolve, reject) => {
            const info = {};

            const onResponse = function(res) {
                info.size = res.headers ['content-length'] | 0;
                info.etag = res.headers.etag;
            };

            const onEnd = function() {
                resolve(info);
            };

            const onError = function(err) {
                reject(err);
            };

            const urlOptions = {
                method: 'HEAD',
                auth: {
                    username: this.username,
                    password: this.password,
                },
            };

            const stream = this._request(this.urlPrefix + filename, urlOptions);
            stream.resume();
            stream.on('response', onResponse);
            stream.on('end', onEnd);
            stream.on('error', onError);
        });
    }

    downloadToStream(urlString, urlOptions, stream) {
        return new Promise((resolve, reject) => {
            const onEnd = function() {
                resolve();
            };

            const onError = function(err) {
                reject(err);
            };

            const req = this._request(urlString, urlOptions);
            req.pipe(stream, { end: false });
            req.on('end', onEnd);
            req.on('error', onError);
        });
    }

    _request() {
        return request.apply(undefined, arguments);
    }

}


Object.assign(DLxRecorder.prototype, /** @lends DLxRecorder.prototype */ {

    /**
     * The root URL to access the DLx.
     * @type {string}
     */
    urlPrefix: null,

    /**
     * The username to login to the web interface.
     * @type {string}
     */
    username: 'admin',

    /**
     * The password to login to the web interface.
     * @type {string}
     */
    password: 'admin',

});



module.exports = DLxRecorder;
