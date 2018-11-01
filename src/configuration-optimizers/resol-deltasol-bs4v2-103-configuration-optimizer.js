/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const configurationData = require('./resol-deltasol-bs4v2-103-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



const ResolDeltaSolBs4V2103ConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        // TODO?
    },

}, {

    deviceAddress: 0x427B,

    configurationData: configurationData,

});



module.exports = ResolDeltaSolBs4V2103ConfigurationOptimizer;
