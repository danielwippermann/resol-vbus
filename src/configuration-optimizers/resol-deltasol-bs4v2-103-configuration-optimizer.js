/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const configurationData = require('./resol-deltasol-bs4v2-103-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



class ResolDeltaSolBs4V2103ConfigurationOptimizer extends BaseConfigurationOptimizer {

    optimizeConfiguration($) {
        // TODO?
    }

}


Object.assign(ResolDeltaSolBs4V2103ConfigurationOptimizer, /** @lends ResolDeltaSolBs4V2103ConfigurationOptimizer */ {

    deviceAddress: 0x427B,

    configurationData,

});



module.exports = ResolDeltaSolBs4V2103ConfigurationOptimizer;
