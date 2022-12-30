/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const configurationData = require('./resol-deltasol-cs4-200-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



class ResolDeltaSolCs4200ConfigurationOptimizer extends BaseConfigurationOptimizer {

    optimizeConfiguration($) {
        // TODO?
    }

}


Object.assign(ResolDeltaSolCs4200ConfigurationOptimizer, /** @lends ResolDeltaSolCs4200ConfigurationOptimizer */ {

    deviceAddress: 0x1122,

    configurationData,

});



module.exports = ResolDeltaSolCs4200ConfigurationOptimizer;


