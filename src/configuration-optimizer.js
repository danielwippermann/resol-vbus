/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var extend = require('./extend');
var utils = require('./utils');



var optionKeys = [
    'id',
];



var ConfigurationOptimizer = extend(null, /** @lends ConfigurationOptimizer# */ {

    getInitialConfiguration: function(oldConfig) {
        throw new Error('NYI');
    },

    optimizeConfiguration: function(oldConfig) {
        throw new Error('NYI');
    },

});



module.exports = ConfigurationOptimizer;
