/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const util = require('util');


const Duplex = require('stream').Duplex;


const Q = require('q');


const Header = require('./header');
const HeaderSet = require('./header-set');
const _ = require('./lodash');
const utils = require('./utils');

const extend = require('./extend');



const optionKeys = [
    'objectMode',
];



/**
 * @typedef RawData
 * @type {object}
 * @property {Number} channel VBus Channel number
 * @property {Date} startTimestamp Timestamp of the start of reception of this data
 * @property {Date} endTimestamp Timestamp of the end of reception of this data
 * @property {Buffer} buffer The VBus raw data buffer
 */



const Converter = extend(Duplex, /** @lends Converter# */ {

    /**
     * Specifies whether the underlying stream operates in object mode.
     * @type {boolean}
     */
    objectMode: false,

    finishedPromise: null,

    /**
     * Creates a new Converter instance and optionally initializes its members with the given values.
     *
     * @constructs
     * @augments Duplex
     * @param {object} options Initialization values
     * @param {boolean} options.objectMode See {@link Converter#objectMode}
     *
     * @classdesc
     * Converter instances are streams that convert VBus models (Packet, Datagram and Telegram instances) and / or
     * Headerset instances to another representation. Optionally some Converter sub-classes support parsing that
     * representation back to the model instances. Converter sub-classes include VBusRecordingConverter (for
     * parsing and generating according to the VBus Recording File Format) and TextConverter that creates
     * character-separated text representations.
     */
    constructor: function(options) {
        const _this = this;

        options = _.defaults({}, options);

        Duplex.call(this, {
            objectMode: options.objectMode,
        });

        _.extend(this, _.pick(options, optionKeys));

        this.finishedPromise = utils.promise(function(resolve) {
            // we have to add a data event handler to enable getting end event
            const onData = function() {};

            _this.on('data', onData);

            _this.once('end', function() {
                _this.removeListener('data', onData);

                resolve();
            });
        });
    },

    /**
     * This method resets the converter. It should be used e.g. if the converter output switches between files (allows
     * some Converter sub-classes to correctly write a header).
     */
    reset: function() {
        // nop
    },

    /**
     * This method signals that no additional VBus Header or HeaderSet models will
     * be converted. It returns a promise that resolves when all data has been
     * consumed.
     *
     * @return {Promise} A Promise that resolves when all data has been consumed.
     */
    finish: function() {
        const _this = this;

        return Q.fcall(function() {
            _this.push(null);

            return _this.finishedPromise;
        });
    },

    /**
     * This method queues a VBus raw data chunk from conversion.
     * Not all Converter sub-classes support this method.
     *
     * @param {RawData} rawData The VBus raw data chunk to queue for conversion.
     */
    convertRawData: function(rawData) {
        if (this.objectMode) {
            this.push(rawData);
        } else {
            throw new Error('Must be implemented by sub-class');
        }
    },

    /**
     * This method queues a VBus Header model (Packet, Datagram or Telegram) for conversion.
     * Not all Converter sub-classes support this method.
     *
     * @param {Header} header The Header to queue for conversion.
     */
    convertHeader: function(header) {
        if (this.objectMode) {
            this.push(header);
        } else {
            throw new Error('Must be implemented by sub-class');
        }
    },

    /**
     * This method queues a VBus HeaderSet instance for conversion.
     * Not all Converter sub-classes support this method.
     *
     * @param {HeaderSet} headerSet The HeaderSet to queue for conversion.
     */
    convertHeaderSet: function(headerSet) {
        if (this.objectMode) {
            this.push(headerSet);
        } else {
            throw new Error('Must be implemented by sub-class');
        }
    },

    _read: function() {
        if (this.objectMode) {
            // nop
        } else {
            throw new Error('Must be implemented by sub-class');
        }
    },

    _write: function(chunk, encoding, callback) {
        if (this.objectMode) {
            if (chunk instanceof HeaderSet) {
                this.emit('headerSet', chunk);
            } else if (chunk instanceof Header) {
                this.emit('header', chunk);
            } else {
                throw new Error('Unsupported object found: ' + util.inspect(chunk));
            }

            callback();
        } else {
            throw new Error('Must be implemented by sub-class');
        }
    },

});



module.exports = Converter;
