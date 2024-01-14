/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    SerialDataSourceProvider,
} = require('./resol-vbus');



const { expect } = global;

const serialPortPath = process.env.RESOL_VBUS_SERIALPORT;

const minTimeoutFactor = process.env.CI ? 0.8 : 1;
const maxTimeoutFactor = process.env.CI ? 1000 : 1;



const testUtils = {

    expect,

    getType(value) {
        let type = typeof value;
        if (type !== 'object') {
            // nop
        } else if (value === null) {
            type = 'null';
        } else if (Array.isArray(value)) {
            type = 'array';
        } else if (Buffer.isBuffer(value)) {
            type = 'buffer';
        } else if (typeof value.then === 'function') {
            type = 'promise';
        }
        return type;
    },

    expectTypeToBe(value, expectedType) {
        expect(testUtils.getType(value)).toBe(expectedType);
    },

    expectPromise(promise) {
        testUtils.expectTypeToBe(promise, 'promise');
        return promise;
    },

    serialPortPath,

    ifHasSerialPortIt(msg, ...args) {
        if (!SerialDataSourceProvider.hasSerialPortSupport) {
            xit(msg + ' (missing serial port support)', () => {});
        } else if (!testUtils.serialPortPath) {
            xit(msg + ' (missing serial port path)', () => {});
        } else {
            it(msg, ...args);
        }
    },

    itShouldBeAClass(Class, ParentClass, instanceMembers, staticMembers) {
        it('should be a class', () => {
            testUtils.expectToBeAClass(Class, ParentClass, instanceMembers, staticMembers);
        });
    },

    expectToBeAClass(Class, ParentClass, instanceMembers, staticMembers) {
        expect(typeof Class).toBe('function');
        if (ParentClass) {
            expect(typeof ParentClass).toBe('function');
            expect(Class.prototype).toBeInstanceOf(ParentClass);
        }

        function convertObject(obj, filter) {
            return Object.getOwnPropertyNames(obj || {}).filter(key => filter ? filter(key) : true).reduce((memo, key) => {
                let value = obj [key];
                if (value === Function) {
                    value = expect.any(Function);
                }
                memo [key] = value;
                return memo;
            }, {});
        }

        function filterOutStaticMembers(key) {
            switch (key) {
            case 'length':
            case 'name':
            case 'prototype':
                return false;
            default:
                return true;
            }
        }

        if (instanceMembers) {
            expect(convertObject(Class.prototype)).toEqual(convertObject(instanceMembers));
        }
        if (staticMembers) {
            expect(convertObject(Class, filterOutStaticMembers)).toEqual(convertObject(staticMembers));
        }
    },

    expectOwnPropertyNamesToEqual(obj, expected, ignored) {
        let actual = Object.getOwnPropertyNames(obj).slice(0);
        if (ignored) {
            actual = actual.filter(key => !ignored.includes(key));
        }
        expect(actual.sort()).toEqual(expected.slice(0).sort());
    },

    expectTimestampToBeWithin(timestamp, before, after) {
        expect(timestamp).toBeInstanceOf(Date);
        expect(before).toBeInstanceOf(Date);
        expect(after).toBeInstanceOf(Date);
        expect(timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    },

    expectElapsedTimeToBeWithin(startTimestamp, minElapsed, maxElapsed) {
        const diff = Date.now() - startTimestamp;
        expect(diff).toBeGreaterThanOrEqual(minElapsed * minTimeoutFactor);
        expect(diff).toBeLessThanOrEqual(maxElapsed * maxTimeoutFactor);
    },

};



module.exports = testUtils;
