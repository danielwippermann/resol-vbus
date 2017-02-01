/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;


var _ = require('lodash');
var Q = require('q');


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
     * If the `Customizer` has an `optimizer` set, the `configuration` parameter
     * is passed to the optimizer's `completeConfiguration` method. Otherwise it must be an
     * array of `ConfigurationValue` objects.
     *
     * If `options.optimize` is "truthy" the list of `ConfigurationValue` objects is passed
     * into the optimizer's `optimizeLoadConfiguration` method to determine the minimal
     * set of values to transfer. If `options.optimize` is "falsy" all of the
     * `ConfigurationValue` objects will be loaded.
     *
     * @param {array} configuration The set of values to transfer.
     * @param {object} options
     * @returns {Promise} A Promise that resolves to the set of values transfered.
     */
    loadConfiguration: function(configuration, options) {
        var _this = this;

        options = _.defaults({}, options, {
            optimize: true,
        });

        return Q.fcall(function() {
            return _this._completeConfiguration(configuration);
        }).then(function(configuration) {
            return _this._loadConfiguration(configuration, options);
        });
    },

    _loadConfiguration: function(configuration, options) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Save a set of configuration values to a device.
     *
     * If the `Customizer` has an `optimizer` set, the `newConfiguration` parameter
     * is passed to the optimizer's `completeConfiguration` method. Otherwise it must be an
     * array of `ConfigurationValue` objects.
     *
     * If a `oldConfiguration` parameter is given, the same procedure as for the
     * `newConfiguration` is applied to it as well.
     *
     * If `options.optimize` is "truthy" the list of `ConfigurationValue` objects is passed
     * into the optimizer's `optimizeLoadConfiguration` method to determine the minimal
     * set of values to transfer. If `options.optimize` is "falsy" all of the
     * `ConfigurationValue` objects will be loaded.
     *
     * @param {array} newConfiguration The set of values to transfer.
     * @param {array} oldConfiguration The set of values to assume to be stored in the device.
     * @param {object} options
     * @returns {Promise} A Promise that resolves to the set of values transfered.
     */
    saveConfiguration: function(newConfiguration, oldConfiguration, options) {
        var _this = this;

        options = _.defaults({}, options, {
            optimize: true,
        });

        return Q.fcall(function() {
            return _this._completeConfiguration(newConfiguration);
        }).then(function(newConfiguration) {
            return Q.fcall(function() {
                if (oldConfiguration) {
                    return _this._completeConfiguration(oldConfiguration);
                } else {
                    return null;
                }
            }).then(function(oldConfiguration) {
                return _this._saveConfiguration(newConfiguration, oldConfiguration, options);
            });
        });
    },

    _saveConfiguration: function(newConfiguration, oldConfiguration, options) {
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
        if (this.optimizer) {
            return this.optimizer.completeConfiguration(config);
        } else {
            return Q(config);
        }
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
