/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var configurationData = require('./resol-deltasol-bs4v2-103-data');

var BaseConfigurationOptimizer = require('../base-configuration-optimizer');



var ResolDeltaSolBs4V2103ConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        // TODO?
    },

}, {

    deviceAddress: 0x427B,

    configurationData: configurationData,

});



module.exports = ResolDeltaSolBs4V2103ConfigurationOptimizer;
