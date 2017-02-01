/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var vbus = require('./resol-vbus');



var SerialDataSourceProvider = vbus.SerialDataSourceProvider;



var serialPortPath = process.env.RESOL_VBUS_SERIALPORT;



var testUtils = {

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

        var comparableRanges = _.map(ranges, function(range) {
            return {
                minTimestamp: range.minTimestamp.toISOString(),
                maxTimestamp: range.maxTimestamp.toISOString(),
            };
        });

        return expect(comparableRanges);
    },

    adaptTimeout: function(timeout) {
        var factor = process.env.TRAVIS ? 1000 : 1;
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

};



module.exports = testUtils;
