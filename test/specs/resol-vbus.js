/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const chai = require('chai');
const sinon = require('sinon');


const vbus = require('../../src/index');



chai.config.includeStack = true;


global.sinon = sinon;



module.exports = vbus;
