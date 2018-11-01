/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Q = require('q');


const _ = require('./lodash');
const utils = require('./utils');



const Promise = utils.promise;



const optimizerClasses = [

    // ======================================================================
    // RESOL
    // ======================================================================

    // DeltaSol BS4 v2
    require('./configuration-optimizers/resol-deltasol-bs4v2-103-configuration-optimizer'),

    // DeltaSol BX Plus
    require('./configuration-optimizers/resol-deltasol-bx-plus-xxx-configuration-optimizer'),

    // DeltaSol C
    require('./configuration-optimizers/resol-deltasol-c-104-configuration-optimizer'),

    // DeltaSol CS Plus
    require('./configuration-optimizers/resol-deltasol-cs-plus-xxx-configuration-optimizer'),

    // DeltaSol MX
    require('./configuration-optimizers/resol-deltasol-mx-112-configuration-optimizer'),

    // DeltaSol SLT
    require('./configuration-optimizers/resol-deltasol-slt-102-configuration-optimizer'),

    // DeltaTherm HC
    require('./configuration-optimizers/resol-deltatherm-hc-xxx-configuration-optimizer'),

];



const ConfigurationOptimizerFactory = {

    /**
     * Find a `ConfigurationOptimizer` sub-class that matches the given options best.
     *
     * @param  {object} options Options to look for while searching a matching configuration optimizer.
     * @param  {number} options.deviceAddress The VBus address of the controller.
     * @param  {string} options.version The version of the controller.
     * @param  {Customizer} options.customizer A `Customizer` instance to query additional information with.
     * @return {Promise} A Promise that resolves to the best matching optimizer result or `null` if no match was found.
     */
    matchOptimizer: function(options) {
        return new Promise(function(resolve, reject) {
            options = _.defaults({}, options);

            let result = {
                match: 0,
                Optimizer: null,
                options: null,
            };

            const cache = {
                masterAddress: null,
                masterConfiguration: [],
            };

            let index = 0;

            const nextOptimizer = function() {
                if (index < optimizerClasses.length) {
                    const Optimizer = optimizerClasses [index++];

                    Q.fcall(function() {
                        return Optimizer.matchOptimizer(options, cache);
                    }).then(function(refResult) {
                        if ((refResult.match > 0) && (refResult.match > result.match)) {
                            result = refResult;
                        }

                        nextOptimizer();
                    }).then(null, reject).done();
                } else {
                    if (result.match > 0) {
                        resolve(result);
                    } else {
                        resolve(null);
                    }
                }
            };

            nextOptimizer();
        });
    },

    /**
     * Find and create an instance of a `ConfigurationOptimizer` sub-class that matches the given options best.
     *
     * @param  {object} options See {@link ConfigurationOptimizerFactory.matchOptimizer} for details.
     * @return {Promise} A promise that resolves to the `ConfigurationOptimizer` instance or `null` if no matching optimizer was found.
     */
    createOptimizer: function(options) {
        return Q.fcall(function() {
            return ConfigurationOptimizerFactory.matchOptimizer(options);
        }).then(function(result) {
            let optimizer;
            if (result) {
                optimizer = new result.Optimizer(result.options);
            } else {
                optimizer = null;
            }
            return optimizer;
        });
    },

    /**
     * Get the configuration optimizer for the given device (identified by its address).
     *
     * @param {number} deviceAddress VBus address of the device
     * @returns {Promise} A Promise that resolvs to the optimizer for the given device or `null` if no optimizer was found.
     */
    createOptimizerByDeviceAddress: function(deviceAddress) {
        return ConfigurationOptimizerFactory.createOptimizer({
            deviceAddress: deviceAddress,
        });
    },

    _optimizerClasses: optimizerClasses,

};



module.exports = ConfigurationOptimizerFactory;
