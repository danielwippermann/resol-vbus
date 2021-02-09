/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';


const configurationData = require('./resol-deltasol-cs2-200-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');

const ResolDeltaSolCs2200ConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration($) {
        // TODO?
    },

}, {

    deviceAddress: 0x1121,

    configurationData,

});



module.exports = ResolDeltaSolCs2200ConfigurationOptimizer;


