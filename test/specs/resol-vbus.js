/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const chai = require('chai');
const sinon = require('sinon');


const vbus = require('../../src/index');
// const vbus = require('../../dist/index');



chai.config.includeStack = true;


global.sinon = sinon;


// FIXME(daniel): some old tests still rely on this function which was removed
vbus.utils.promisify = function(fn) {
    return new Promise((resolve) => resolve(fn()));
};



module.exports = vbus;
