/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');



var localConfig;
try {
    localConfig = require('./local-config.json');
} catch (ex) {
    // nop
}



var config = _.extend({}, localConfig);



module.exports = config;
