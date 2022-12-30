/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    utils,
} = require('./resol-vbus');


const { expectOwnPropertyNamesToEqual } = require('./test-utils');


const expect = global.expect;

const {
    generateGUID,
    roundNumber,
    deepFreezeObjectTree,
    promisify,
    isPromise,
    hasOwnProperty,
    applyDefaultOptions,
    isNumber,
    isObject,
    isString,
    normalizeDatecode,
} = utils;


describe('utils', () => {

    it('should export correctly', () => {
        expectOwnPropertyNamesToEqual(utils, [
            'generateGUID',
            'roundNumber',
            'deepFreezeObjectTree',
            'promisify',
            'isPromise',
            'hasOwnProperty',
            'applyDefaultOptions',
            'isNumber',
            'isObject',
            'isString',
            'normalizeDatecode',
        ]);
    });

    describe('generateGUID', () => {

        it('should work correctly', () => {
            const result = generateGUID();

            expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        });

    });

    describe('roundNumber', () => {

        it('should be a function', () => {
            expect(typeof roundNumber).toBe('function');
        });

        it('should work correctly', () => {
            let result = roundNumber(55.55, -1);
            expect(result).toBe(55.6);

            result = roundNumber(55.549, -1);
            expect(result).toBe(55.5);

            result = roundNumber(1.005, -2);
            expect(result).toBe(1.01);

            result = roundNumber(-24.700000000000003, -1);
            expect(result).toBe(-24.7);

            let number;

            result = roundNumber(number, 10);
            expect(result).toBe(undefined);

            result = roundNumber(10, number);
            expect(result).toBe(10);

            result = roundNumber(10, 0);
            expect(result).toBe(10);

            result = roundNumber(NaN, 0);
            expect(result).toBe(NaN);

            result = roundNumber(10, 1.2);
            expect(result).toBe(NaN);

            result = roundNumber(1.2345e100, 98);
            expect(result).toBe(1.23e100);

            result = roundNumber(1.2345e200, 100);
            expect(result).toBe(1.2345e200);
        });

    });

    describe('deepFreezeObjectTree', () => {

        it('should work correctly', () => {
            const object1 = {};
            object1.key1 = object1;

            expect(() => {
                deepFreezeObjectTree(object1);
            }).toThrow('Circular reference while deep freezing');
        });

    });

    describe('promisify', () => {

        it('should work correctly', async () => {
            const value1 = {};

            const fn1 = jest.fn(cb => {
                cb(null, value1);
            });

            const promise1 = promisify(fn1);

            expect(isPromise(promise1)).toBe(true);

            await expect(promise1).resolves.toBe(value1);

            const error2 = {};

            const fn2 = jest.fn(cb => {
                cb(error2);
            });

            const promise2 = promisify(fn2);

            expect(isPromise(promise2)).toBe(true);

            await expect(promise2).rejects.toBe(error2);
        });

    });

    describe('isPromise', () => {

        it('should be a function', () => {
            expect(typeof isPromise).toBe('function');
        });

        it('should work correctly', async () => {
            expect(isPromise(undefined)).toBe(false);
            expect(isPromise(null)).toBe(false);
            expect(isPromise(true)).toBe(false);

            const valueA = {};
            const promiseA = Promise.resolve(valueA);
            expect(isPromise(promiseA)).toBe(true);
            await expect(promiseA).resolves.toBe(valueA);

            const errorB = {};
            const promiseB = Promise.reject(errorB);
            expect(isPromise(promiseB)).toBe(true);
            await expect(promiseB).rejects.toBe(errorB);
        });

    });

    describe('hasOwnProperty', () => {

        it('should work correctly', () => {
            const obj1 = { key1: 1 };

            expect(obj1.key1).toBe(1);
            expect(obj1.key2).toBe(undefined);
            expect(obj1.constructor).toBeTruthy();
            expect(obj1.__proto__).toBeTruthy();

            expect(hasOwnProperty(obj1, 'key1')).toBe(true);
            expect(hasOwnProperty(obj1, 'key2')).toBe(false);
            expect(hasOwnProperty(obj1, 'constructor')).toBe(false);
            expect(hasOwnProperty(obj1, '__proto__')).toBe(false);
        });

    });

    describe('applyDefaultOptions', () => {

        it('should work correctly', () => {
            const obj1 = {
                key1: 11,
                key3: 13,
            };

            const options1 = {
                key2: 22,
                key3: 23,
            };

            const result1 = applyDefaultOptions(obj1, options1, {
                key1: 31,
                key2: 32,
            });

            expect(result1).toBe(obj1);

            expectOwnPropertyNamesToEqual(result1, [
                'key1',
                'key2',
                'key3',
            ]);

            expect(result1.key1).toBe(31);
            expect(result1.key2).toBe(22);
            expect(result1.key3).toBe(13);
        });

    });

    describe('isNumber', () => {

        it('should work correctly', () => {
            expect(isNumber(undefined)).toBe(false);
            expect(isNumber(null)).toBe(false);
            expect(isNumber(true)).toBe(false);
            expect(isNumber(1)).toBe(true);
            expect(isNumber(NaN)).toBe(true);
            expect(isNumber('1')).toBe(false);
            expect(isNumber({})).toBe(false);
            expect(isNumber([])).toBe(false);
            expect(isNumber(() => {})).toBe(false);
        });

    });

    describe('isObject', () => {

        it('should work correctly', () => {
            expect(isObject(undefined)).toBe(false);
            expect(isObject(null)).toBe(false);
            expect(isObject(true)).toBe(false);
            expect(isObject(1)).toBe(false);
            expect(isObject(NaN)).toBe(false);
            expect(isObject('1')).toBe(false);
            expect(isObject({})).toBe(true);
            expect(isObject([])).toBe(false);
            expect(isObject(() => {})).toBe(false);
        });

    });

    describe('isString', () => {

        it('should work correctly', () => {
            expect(isString(undefined)).toBe(false);
            expect(isString(null)).toBe(false);
            expect(isString(true)).toBe(false);
            expect(isString(1)).toBe(false);
            expect(isString(NaN)).toBe(false);
            expect(isString('1')).toBe(true);
            expect(isString({})).toBe(false);
            expect(isString([])).toBe(false);
            expect(isString(() => {})).toBe(false);
        });

    });

    describe('normalizeDatecode', () => {

        it('should work correctly', () => {
            let result;

            result = normalizeDatecode(undefined);
            expect(result).toBe(null);

            result = normalizeDatecode(null);
            expect(result).toBe(null);

            result = normalizeDatecode(20221230);
            expect(result).toBe('20221230');

            expect(() => {
                normalizeDatecode(19700101);
            }).toThrow('Invalid number as datecode: 19700101');

            result = normalizeDatecode('20221230');
            expect(result).toBe('20221230');

            expect(() => {
                normalizeDatecode('now');
            }).toThrow('Invalid string as datecode: now');

            result = normalizeDatecode(new Date(1672380216000));
            expect(result).toBe('20221230');

            expect(() => {
                normalizeDatecode(new Date(0));
            }).toThrow('Invalid date as datecode: 1970-01-01T00:00:00.000Z');

            expect(() => {
                normalizeDatecode(true);
            }).toThrow('Unsupported input as datecode: true');
        });

    });

});
