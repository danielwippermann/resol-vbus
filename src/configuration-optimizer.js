/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var extend = require('./extend');
var utils = require('./utils');



var ConfigurationOptimizer = extend(null, /** @lends ConfigurationOptimizer# */ {

    getInitialLoadConfiguration: function() {
        throw new Error('Must be implemented by sub-class');
    },

    optimizeLoadConfiguration: function(oldConfig) {
        throw new Error('Must be implemented by sub-class');
    },

    getSaveConfiguration: function(newConfig, oldConfig) {
        throw new Error('Must be implemented by sub-class');
    },

}, {

    /**
     * Get the configuration optimizer for the given device (identified by its address).
     *
     * @param {number} deviceAddress VBus address of the device
     * @returns {Promise} A Promise that resolvs to the optimizer for the given device.
     */
    getOptimizerByDeviceAddress: function(deviceAddress) {
        return Q.fcall(function() {
            var result;

            switch (deviceAddress) {

            }

            return result;
        });
    },

});



module.exports = ConfigurationOptimizer;
