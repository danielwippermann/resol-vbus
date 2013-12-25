/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;
var Duplex = require('stream').Duplex;


var _ = require('lodash');


var extend = require('./extend');



var optionKeys = [
];



var Converter = extend(Duplex, {

    constructor: function(options) {
        Duplex.call(this);

        _.extend(this, _.pick(options, optionKeys));
    },

    reset: function() {
        // nop
    },

    convertHeader: function(header) {
        throw new Error('Must be implemented by sub-class');
    },

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
