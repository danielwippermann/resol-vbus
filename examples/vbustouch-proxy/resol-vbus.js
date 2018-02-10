/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var vbus;
try {
    vbus = require('../..');
} catch(ex) {
    vbus = require('resol-vbus');
}



module.exports = vbus;
