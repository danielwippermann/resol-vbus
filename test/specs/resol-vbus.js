/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const chai = require('chai');
const sinon = require('sinon');


const vbus = require('../../src/index');



chai.config.includeStack = true;


global.sinon = sinon;


global.promiseIt = function(message, callback) {
    it(message, function(done) {
        const _this = this;

        new Promise(resolve => {
            resolve(callback.call(_this));
        }).then(function() {
            done();
        }, function(err) {
            done(err);
        });
    });
};


global.xpromiseIt = function(message, callback) {
    xit(message, function() {
        // x-ed test
    });
};



module.exports = vbus;
