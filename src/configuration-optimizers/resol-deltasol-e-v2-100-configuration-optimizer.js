/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const configurationData = require('./resol-deltasol-e-v2-100-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



class ResolDeltaSolEV2100ConfigurationOptimizer extends BaseConfigurationOptimizer {

    optimizeConfiguration($) {
        // TODO?
    }

}


Object.assign(ResolDeltaSolEV2100ConfigurationOptimizer, /** @lends ResolDeltaSolEV2100ConfigurationOptimizer */ {

    deviceAddress: 0x1050,

    configurationData,

});



module.exports = ResolDeltaSolEV2100ConfigurationOptimizer;
