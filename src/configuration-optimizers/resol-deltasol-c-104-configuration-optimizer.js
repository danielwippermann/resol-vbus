/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const configurationData = require('./resol-deltasol-c-104-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



const ResolDeltaSolC104ConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        // TODO?
    },

}, {

    deviceAddress: 0x4212,

    configurationData: configurationData,

});



module.exports = ResolDeltaSolC104ConfigurationOptimizer;
