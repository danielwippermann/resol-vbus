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
     * @returns {Promise} A Promise that resolves to the set of values transfered.
     */
    loadConfiguration: function() {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Save a set of configuration values to a device.
     *
     * @param {array} configuration The set values to transfer.
     * @returns {Promise} A Promise that resolves to the set of values transfered.
     */
    saveConfiguration: function(configuration) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Gets the set of values for the first round of transfer.
     *
     * @returns {Promise} A Promise that resolves to the set of values to load.
     */
    _getInitialLoadConfiguration: function() {
        return this.optimizer.getInitialLoadConfiguration();
    },

    /**
     * Gets the set of values for the second and all successive rounds of transfer.
     *
     * @param {array} oldConfig The set of values that has already been looaded.
     * @returns {Promise} A Promise that resolves to the set of values to load.
     */
    _optimizeLoadConfiguration: function(oldConfig) {
        return this.optimizer.optimizeLoadConfiguration(oldConfig);
    },

    /**
     * Gets the set of values to save to the controller.
     *
     * @param {array} newConfig The set of values to transfer.
     * @param {array} oldConfig The optional set of values that should be currently saved in the device.
     * @returns {Promise} A Promise that resolves to the set of values to save.
     */
    _getSaveConfiguration: function(newConfig, oldConfig) {
        return this.optimizer.getSaveConfiguration(newConfig, oldConfig);
    },

});



module.exports = Customizer;
