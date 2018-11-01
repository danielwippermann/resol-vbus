/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



require('better-stack-traces').install();
const chai = require('chai');
const Q = require('q');
const sinon = require('sinon');


const _ = require('./lodash');
const vbus = require('./resol-vbus');



const SerialDataSourceProvider = vbus.SerialDataSourceProvider;



const serialPortPath = process.env.RESOL_VBUS_SERIALPORT;



chai.config.includeStack = true;

global.expect = chai.expect;

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



const testUtils = {

    performAsyncTest: function(done, callback) {
        return Q.fcall(callback).then(function() {
            done();
        }).fail(function(reason) {
            done(reason);
        });
    },

    expectPromise: function(promise) {
        expect(promise).to.be.an('object');
        expect(promise).to.have.a.property('then').that.is.a('function');
        return promise;
    },

    expectRanges: function(ranges) {
        expect(ranges).a('array');

        const comparableRanges = _.map(ranges, function(range) {
            return {
                minTimestamp: range.minTimestamp.toISOString(),
                maxTimestamp: range.maxTimestamp.toISOString(),
            };
        });

        return expect(comparableRanges);
    },

    adaptTimeout: function(timeout) {
        const factor = process.env.TRAVIS ? 1000 : 1;
        return timeout * factor;
    },

    serialPortPath: serialPortPath,

    ifHasSerialPortIt: function(msg) {
        if (!SerialDataSourceProvider.hasSerialPortSupport) {
            xit.call(null, msg + ' (missing serial port support)');
        } else if (!serialPortPath) {
            xit.call(null, msg + ' (missing serial port path)');
        } else {
            it.apply(null, arguments);
        }
    },

    expectToBeABuffer: function(buffer) {
        expect(buffer).instanceOf(Buffer);
    },

    itShouldBeAClass: function(Class) {
        it('should be a class', function() {
            expect(Class).a('function')
                .property('prototype').an('object')
                .property('constructor').equal(Class);
        });
    },

};



module.exports = testUtils;
