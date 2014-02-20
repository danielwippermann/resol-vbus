/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;
var Duplex = require('stream').Duplex;


var _ = require('lodash');


var extend = require('./extend');



var optionKeys = [
];



var Converter = extend(Duplex, /** @lends Converter# */ {

    /**
     * Creates a new Converter instance.
     *
     * @constructs
     * @augments Duplex
     *
     * @classdesc
     * Converter instances are streams that convert VBus models (Packet, Datagram and Telegram instances) and / or
     * Headerset instances to another representation. Optionally some Converter sub-classes support parsing that
     * representation back to the model instances. Converter sub-classes include VBusRecordingConverter (for
     * parsing and generating according to the VBus Recording File Format) and TextConverter that creates
     * character-separated text representations.
     */
    constructor: function(options) {
        Duplex.call(this);

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
     * This method queues a VBus Header model (Packet, Datagram or Telegram) for conversion.
     * Not all Converter sub-classes support this method.
     *
     * @param {Header} header The Header to queue for conversion.
     */
    convertHeader: function(header) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * This method queues a VBus HeaderSet instance for conversion.
     * Not all Converter sub-classes support this method.
     *
     * @param {HeaderSet} headerSet The HeaderSet to queue for conversion.
     */
    convertHeaderSet: function(headerSet) {
        throw new Error('Must be implemented by sub-class');
    },

    _read: function() {
        throw new Error('Must be implemented by sub-class');
    },

    _write: function() {
        throw new Error('Must be implemented by sub-class');
    },

});



module.exports = Converter;
