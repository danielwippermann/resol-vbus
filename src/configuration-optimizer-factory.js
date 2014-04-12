/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');



var optimizerClasses = [

    // ======================================================================
    // RESOL
    // ======================================================================

    // DeltaSol BX Plus
    require('./configuration-optimizers/resol-deltasol-bx-plus-xxx-configuration-optimizer'),

];



var ConfigurationOptimizerFactory = {

    /**
     * Get the configuration optimizer for the given device (identified by its address).
     *
     * @param {number} deviceAddress VBus address of the device
     * @returns {Promise} A Promise that resolvs to the optimizer for the given device.
     */
    getOptimizerByDeviceAddress: function(deviceAddress) {
        return Q.fcall(function() {
            var result;

            _.forEach(optimizerClasses, function(Optimizer) {
                if (Optimizer.deviceAddress === deviceAddress) {
                    result = new Optimizer();
                }
                return !result;
            });

            return result;
        });
    },

};



module.exports = ConfigurationOptimizerFactory;
