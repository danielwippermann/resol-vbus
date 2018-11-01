/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const chai = require('chai');
const Q = require('q');
const sinon = require('sinon');


const vbus = require('../../src/index');



chai.config.includeStack = true;


global.sinon = sinon;


global.promiseIt = function(message, callback) {
    it(message, function(done) {
        const _this = this;

        Q.fcall(function() {
            return callback.call(_this);
        }).then(function() {
            done();
        }, function(err) {
            done(err);
        }).done();
    });
};


global.xpromiseIt = function(message, callback) {
    xit(message, function() {
        // x-ed test
    });
};



module.exports = vbus;
