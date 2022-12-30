/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const chai = require('chai');
const sinon = require('sinon');


const vbus = require('../../src/index');
// const vbus = require('../../dist/index');



chai.config.includeStack = true;


global.sinon = sinon;



module.exports = vbus;
