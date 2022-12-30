/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const configurationData = require('./resol-deltasol-c-104-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



class ResolDeltaSolC104ConfigurationOptimizer extends BaseConfigurationOptimizer {

    optimizeConfiguration($) {
        // TODO?
    }

}


Object.assign(ResolDeltaSolC104ConfigurationOptimizer, /** @lends ResolDeltaSolC104ConfigurationOptimizer */ {

    deviceAddress: 0x4212,

    configurationData,

});



module.exports = ResolDeltaSolC104ConfigurationOptimizer;
