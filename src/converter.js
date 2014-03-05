/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var util = require('util');


var EventEmitter = require('events').EventEmitter;
var Duplex = require('stream').Duplex;


var _ = require('lodash');


var Header = require('./header');
var HeaderSet = require('./header-set');

var extend = require('./extend');



var optionKeys = [
    'objectMode',
];



var Converter = extend(Duplex, /** @lends Converter# */ {

    /**
     * Specifies whether the underlying stream operates in object mode.
     * @type {boolean}
     */
    objectMode: false,

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
        options = _.defaults({}, options);

        Duplex.call(this, {
            objectMode: options.objectMode,
        });

        _.extend(this, _.pick(options, optionKeys));
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
     * be converted.
     */
    finish: function() {
        this.push(null);
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
