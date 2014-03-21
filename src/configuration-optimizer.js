/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var extend = require('./extend');
var utils = require('./utils');



var ConfigurationOptimizer = extend(null, /** @lends ConfigurationOptimizer# */ {

    deviceAddress: 0,

    /**
     * Creates a new ConfigurationOptimizer for the given VBus device address.
     *
     * @constructs
     * @param {number} deviceAddress VBus device address of the device to configure.
     *
     * @classdesc
     * The ConfigurationOptimizer can be used to find the optimal set of
     * configuration values for a given VBus device.
     */
    constructor: function(deviceAddress) {
        this.deviceAddress = deviceAddress;
    },

    getInitialConfiguration: function(oldConfig) {
        throw new Error('NYI');
    },

    optimizeConfiguration: function(oldConfig) {
        throw new Error('NYI');
    },

});



module.exports = ConfigurationOptimizer;
