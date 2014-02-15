/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;


var _ = require('lodash');
var Q = require('q');


var ConfigurationOptimizer = require('./configuration-optimizer');
var utils = require('./utils');

var extend = require('./extend');



var optionKeys = [
    'id',
    'deviceAddress',
    'optimizer',
];



var Customizer = extend(EventEmitter, /** @lends Customizer# */ {

    /**
     * An identifier for this customizer.
     * @type {string}
     */
    id: null,

    /**
     * The VBus address of the device to customize.
     * @type {number}
     */
    deviceAddress: 0,

    /**
     * A configuration optimizer.
     * @type {ConfigurationOptimizer}
     */
    optimizer: null,

    /**
     * Creates a new Customizer instance and optionally initializes its members
     * with the given values.
     *
     * @constructs
     * @param {object} [options] Initialization values for this instance's members
     * @param {string} [options.id] {@link Customizer#id}
     * @param {string} [options.deviceAddress] {@link Customizer#deviceAddress}
     * @param {string} [options.optimizer] {@link Customizer#optimizer}
     *
     * @classdesc
     * A Customizer provides functionality to transfer a set of configuration
     * values from or to a device.
     */
    constructor: function(options) {
        EventEmitter.call(this);

        _.extend(this, _.pick(options, optionKeys));

        if (!this.optimizer) {
            this.optimizer = new ConfigurationOptimizer(this.deviceAddress);
        }
    },

    /**
     * Load a set of configuration values from a device.
     */
    loadConfiguration: function() {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Save a set of configuration values to a device.
     */
    saveConfiguration: function(configuration) {
        throw new Error('Must be implemented by sub-class');
    },

    _getInitialConfiguration: function(oldConfig) {
        return this.optimizer.getInitialConfiguration(oldConfig);
    },

    _optimizeConfiguration: function(oldConfig) {
        return this.optimizer.optimizeConfiguration(oldConfig);
    },

});



module.exports = Customizer;
