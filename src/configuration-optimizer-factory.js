/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');



var optimizerClasses = [

    // ======================================================================
    // RESOL
    // ======================================================================

    // DeltaSol BS4 v2
    require('./configuration-optimizers/resol-deltasol-bs4v2-103-configuration-optimizer'),

    // DeltaSol BX Plus
    require('./configuration-optimizers/resol-deltasol-bx-plus-xxx-configuration-optimizer'),

    // DeltaSol CS Plus
    require('./configuration-optimizers/resol-deltasol-cs-plus-xxx-configuration-optimizer'),

    // DeltaSol MX
    require('./configuration-optimizers/resol-deltasol-mx-112-configuration-optimizer'),

    // DeltaSol SLT
    require('./configuration-optimizers/resol-deltasol-slt-102-configuration-optimizer'),

    // DeltaTherm HC
    require('./configuration-optimizers/resol-deltatherm-hc-xxx-configuration-optimizer'),

];



var ConfigurationOptimizerFactory = {

    /**
     * Get the configuration optimizer for the given device (identified by its address).
     *
     * @param {number} deviceAddress VBus address of the device
     * @returns {Promise} A Promise that resolvs to the optimizer for the given device or `null` if no optimizer was found.
     */
    createOptimizerByDeviceAddress: function(deviceAddress) {
        return Q.fcall(function() {
            var result = null;

            _.forEach(optimizerClasses, function(Optimizer) {
                if (Optimizer.deviceAddress === deviceAddress) {
                    result = new Optimizer();
                }
                return !result;
            });

            return result;
        });
    },

    _optimizerClasses: optimizerClasses,

};



module.exports = ConfigurationOptimizerFactory;
