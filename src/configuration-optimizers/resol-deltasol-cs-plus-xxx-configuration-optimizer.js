/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var configurationData = require('./resol-deltasol-cs-plus-110-data');

var BaseConfigurationOptimizer = require('../base-configuration-optimizer');



var ResolDeltaSolCsPlusXxxConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        // TODO?
    },

}, {

    deviceAddress: 0x2211,

    configurationData: configurationData,

});



module.exports = ResolDeltaSolCsPlusXxxConfigurationOptimizer;
