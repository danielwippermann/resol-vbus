/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const _ = require('./lodash');
const vbus = require('./resol-vbus');



const SerialDataSourceProvider = vbus.SerialDataSourceProvider;



const serialPortPath = process.env.RESOL_VBUS_SERIALPORT;



const testUtils = {

    expectPromise: function(promise) {
        // expect(promise).to.be.instanceOf(Promise);
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
            xit(msg + ' (missing serial port support)', () => {});
        } else if (!serialPortPath) {
            xit(msg + ' (missing serial port path)', () => {});
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
