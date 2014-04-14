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
    },

    /**
     * Load a set of configuration values from a device.
     *
     * @param {array} configuration The set of values to transfer.
     * @param {object} options
     * @returns {Promise} A Promise that resolves to the set of values transfered.
     */
    loadConfiguration: function(configuration, options) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Save a set of configuration values to a device.
     *
     * @param {array} newConfiguration The set of values to transfer.
     * @param {array} oldConfiguration The set of values to assume to be stored in the device.
     * @param {object} options
     * @returns {Promise} A Promise that resolves to the set of values transfered.
     */
    saveConfiguration: function(newConfiguration, oldConfiguration, options) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Converts the configuration provided into an array of {@see ConfigurationValue} objects.
     * The provided configuration can be either an array of partially initialized ConfigurationValue
     * objects or an object mapping value IDs as keys to values.
     * If no configuration is given a complete configuration set is returned.
     *
     * @param {undefined|null|array|object} config Configuration to complete.
     * @returns {Promise} A Promise that resolves to the completed array of values.
     */
    _completeConfiguration: function(config) {
        return this.optimizer.completeConfiguration(config);
    },

    /**
     * Gets the optimized array of values based on what values are already loaded.
     *
     * @param {array} config The array of values that has already been loaded.
     * @returns {Promise} A Promise that resolves to the array of values to load next.
     */
    _optimizeLoadConfiguration: function(config) {
        return this.optimizer.optimizeLoadConfiguration(config);
    },

    /**
     * Gets the optimzed array of values to save to the controller.
     *
     * @param {array} newConfig The array of values to transfer.
     * @param {array} oldConfig The array of values that are assumed to be currently stored in the device.
     * @returns {Promise} A Promise that resolves to the array of values to save.
     */
    _optimizeSaveConfiguration: function(newConfig, oldConfig) {
        return this.optimizer.optimizeSaveConfiguration(newConfig, oldConfig);
    },

});



module.exports = Customizer;
