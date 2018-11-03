/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    SerialDataSourceProvider,
} = require('./resol-vbus');


const expect = require('./expect');
const _ = require('./lodash');



const serialPortPath = process.env.RESOL_VBUS_SERIALPORT;



const testUtils = {

    expectPromise(promise) {
        // expect(promise).to.be.instanceOf(Promise);
        expect(promise).to.have.a.property('then').that.is.a('function');
        return promise;
    },

    async expectPromiseToReject(promise) {
        testUtils.expectPromise(promise);

        await promise.then(() => {
            throw new Error('Expected promise to reject');
        }, () => {
            // nop
        });
    },

    expectRanges(ranges) {
        expect(ranges).a('array');

        const comparableRanges = _.map(ranges, (range) => {
            return {
                minTimestamp: range.minTimestamp.toISOString(),
                maxTimestamp: range.maxTimestamp.toISOString(),
            };
        });

        return expect(comparableRanges);
    },

    adaptTimeout(timeout) {
        const factor = process.env.TRAVIS ? 1000 : 1;
        return timeout * factor;
    },

    serialPortPath,

    ifHasSerialPortIt(msg) {
        if (!SerialDataSourceProvider.hasSerialPortSupport) {
            xit(msg + ' (missing serial port support)', () => {});
        } else if (!serialPortPath) {
            xit(msg + ' (missing serial port path)', () => {});
        } else {
            it.apply(null, arguments);
        }
    },

    expectToBeABuffer(buffer) {
        expect(buffer).instanceOf(Buffer);
    },

    itShouldBeAClass(Class) {
        it('should be a class', () => {
            expect(Class).a('function')
                .property('prototype').an('object')
                .property('constructor');
        });
    },

};



module.exports = testUtils;
