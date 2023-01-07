const testUtils = require('./test-utils');


const { expect } = global;


describe('test-utils', () => {

    it('should export correctly', () => {
        testUtils.expectOwnPropertyNamesToEqual(testUtils, [
            'expect',
            'getType',
            'expectTypeToBe',
            'expectPromise',
            'serialPortPath',
            'ifHasSerialPortIt',
            'itShouldBeAClass',
            'expectToBeAClass',
            'expectOwnPropertyNamesToEqual',
            'expectTimestampToBeWithin',
            'expectElapsedTimeToBeWithin',
        ]);
    });

    describe('expect', () => {

        it('should work correctly', () => {
            expect(testUtils.expect).toBe(expect);
        });

    });

    describe('getType', () => {

        const { getType } = testUtils;

        it('should work correctly', () => {
            expect(getType(undefined)).toBe('undefined');
            expect(getType(null)).toBe('null');
            expect(getType(true)).toBe('boolean');
            expect(getType(1)).toBe('number');
            expect(getType('string')).toBe('string');
            expect(getType(getType)).toBe('function');
            expect(getType(Symbol.iterator)).toBe('symbol');
            expect(getType(testUtils)).toBe('object');

            // special cases
            expect(getType([])).toBe('array');
            expect(getType(Buffer.alloc(0))).toBe('buffer');
            expect(getType(Promise.resolve())).toBe('promise');
        });

    });

    describe('expectTypeToBe', () => {

        const { expectTypeToBe } = testUtils;

        it('should work correctly', () => {
            expectTypeToBe(undefined, 'undefined');
            expectTypeToBe(null, 'null');
            expectTypeToBe(true, 'boolean');
            expectTypeToBe(1, 'number');
            expectTypeToBe('string', 'string');
            expectTypeToBe(expectTypeToBe, 'function');
            expectTypeToBe(Symbol.iterator, 'symbol');
            expectTypeToBe(testUtils, 'object');

            // special cases
            expectTypeToBe([], 'array');
            expectTypeToBe(Buffer.alloc(0), 'buffer');
            expectTypeToBe(Promise.resolve(), 'promise');
        });

    });

    describe('expectPromise', () => {

        const { expectPromise } = testUtils;

        it('should work correctly', () => {
            const promise = { then() {} };

            const result = expectPromise(promise);

            expect(result).toBe(promise);
        });

    });

    xdescribe('serialPortPath', () => {

        const { serialPortPath } = testUtils;

        it('should work correctly', () => {
            throw new Error('NYI');
        });

    });

    xdescribe('ifHasSerialPortIt', () => {

        const { ifHasSerialPortIt } = testUtils;

        it('should work correctly', () => {
            throw new Error('NYI');
        });

    });

    // describe('itShouldBeAClass', () => {

    //     const { itShouldBeAClass } = testUtils;

    //     it('should work correctly', () => {
    //         throw new Error('NYI');
    //     });

    // });

    describe('expectToBeAClass', () => {

        const { expectToBeAClass } = testUtils;

        it('should work correctly', () => {
            class ClassA {

                methodA() {}

                static functionA() {}

            }

            class ClassB extends ClassA {

                methodB() {}

                static functionB() {}

            }

            class ClassC extends ClassB {

                methodC() {}

                static functionC() {}

            }

            expectToBeAClass(ClassA, null, {
                constructor: Function,
                methodA: Function,
            }, {
                functionA: Function,
            });

            expectToBeAClass(ClassB, ClassA, {
                constructor: Function,
                methodB: Function,
            }, {
                functionB: Function,
            });

            expectToBeAClass(ClassC, ClassB, {
                constructor: Function,
                methodC: Function,
            }, {
                functionC: Function,
            });
        });

    });

    describe('expectOwnPropertyNamesToEqual', () => {

        const { expectOwnPropertyNamesToEqual } = testUtils;

        it('should work correctly', () => {
            const obj = {
                prop1: true,
                prop2: true,
                [Symbol.iterator]: true,
            };

            Object.defineProperty(obj, 'prop3', {
                enumerable: false,
                value: true,
            });

            expectOwnPropertyNamesToEqual(obj, [
                'prop1',
                'prop2',
                'prop3',
            ]);

            expectOwnPropertyNamesToEqual(obj, [
                'prop3',
                'prop2',
                'prop1',
            ]);
        });

    });

    describe('expectTimestampToBeWithin', () => {

        const { expectTimestampToBeWithin } = testUtils;

        it('should work correctly', () => {
            const now = new Date();

            expectTimestampToBeWithin(now, now, now);
        });

    });

    describe('expectElapsedTimeToBeWithin', () => {

        const { expectElapsedTimeToBeWithin } = testUtils;

        it('should work correctly', () => {
            const startTimestamp = new Date();

            expectElapsedTimeToBeWithin(startTimestamp, 0, 10);
        });

    });

});
