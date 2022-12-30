/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const configurationData = require('./resol-deltasol-cs2-200-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



class ResolDeltaSolCs2200ConfigurationOptimizer extends BaseConfigurationOptimizer {

    optimizeConfiguration($) {
        // TODO?
    }

}


Object.assign(ResolDeltaSolCs2200ConfigurationOptimizer, /** @lends ResolDeltaSolCs2200ConfigurationOptimizer */ {

    deviceAddress: 0x1121,

    configurationData,

});



module.exports = ResolDeltaSolCs2200ConfigurationOptimizer;


