/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var extend = require('./extend');
var utils = require('./utils');



/**
 * @typedef ConfigurationValue
 * @type {object}
 * @property {String} valueId Value ID
 * @property {number} valueIndex Value Index
 * @property {number} value Value
 * @property {number} priority Priority (higher numbers mean higher priority)
 * @property {boolean} pending Indicates that this value has to be tranceived.
 * @property {boolean} transceived Indicates that this value has been tranceived.
 */


/**
 * @typedef Configuration
 * @type {ConfigurationValue[]}
 */



var ConfigurationOptimizer = extend(null, /** @lends ConfigurationOptimizer# */ {

    /**
     * Converts the configuration provided into an array of {@see ConfigurationValue} objects.
     * The provided configuration can be either an array of partially initialized ConfigurationValue
     * objects or an object mapping value IDs as keys to values.
     * If no configuration is given a complete configuration set is returned.
     *
     * @param {undefined|null|array|object} config Configuration to complete.
     * @returns {Promise} A Promise that resolves to the completed array of values.
     */
    completeConfiguration: function(config) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Gets the optimized array of values based on what values are already loaded.
     *
     * @param {array} config The array of values that has already been loaded.
     * @returns {Promise} A Promise that resolves to the array of values to load next.
     */
    optimizeLoadConfiguration: function(config) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Gets the optimzed array of values to save to the controller.
     *
     * @param {array} newConfig The array of values to transfer.
     * @param {array} oldConfig The array of values that are assumed to be currently stored in the device.
     * @returns {Promise} A Promise that resolves to the array of values to save.
     */
    optimizeSaveConfiguration: function(newConfig, oldConfig) {
        throw new Error('Must be implemented by sub-class');
    },

});



module.exports = ConfigurationOptimizer;
