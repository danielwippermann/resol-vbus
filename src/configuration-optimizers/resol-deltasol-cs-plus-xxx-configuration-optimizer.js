/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const configurationData = require('./resol-deltasol-cs-plus-110-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



const ResolDeltaSolCsPlusXxxConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        // TODO?
    },

}, {

    deviceAddress: 0x2211,

    configurationData: configurationData,

});



module.exports = ResolDeltaSolCsPlusXxxConfigurationOptimizer;
