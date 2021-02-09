/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';


const configurationData = require('./resol-deltasol-cs4-200-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');

const ResolDeltaSolCs4200ConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration($) {
        // TODO?
    },

}, {

    deviceAddress: 0x1122,

    configurationData,

});



module.exports = ResolDeltaSolCs4200ConfigurationOptimizer;


