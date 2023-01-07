/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    BaseConfigurationOptimizer,
    ConfigurationOptimizer,
} = require('./resol-vbus');


const {
    expect,
    expectTypeToBe,
    itShouldBeAClass,
    expectOwnPropertyNamesToEqual,
} = require('./test-utils');



describe('BaseConfigurationOptimizer', () => {

    itShouldBeAClass(BaseConfigurationOptimizer, ConfigurationOptimizer, {
        constructor: Function,
        completeConfiguration: Function,
        optimizeLoadConfiguration: Function,
        optimizeSaveConfiguration: Function,
        _buildConfiguration: Function,
        _getAdjustableValues: Function,
        _optimizeConfiguration: Function,
    }, {
        deviceAddress: 0,
        configurationData: null,
    });

    describe('#completeConfiguration', () => {

        it('should work correctly without arguments', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const result = await optimizer.completeConfiguration();

            expect(result).toHaveLength(22);
            expect(result [0].valueId).toBe('LowestPriorityValue');
            expect(result [0].valueIndex).toBe(0x1000);
        });

        it('should work correctly with array arguments', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const config1 = [{
                valueIndex: 0x1011,
                value: 1,
            }, {
                valueId: 'TestValue2',
                value: 2,
            }, {
                index: 0x1013,
                value: 3,
            }, {
                id: 'TestValue4',
                value: 4,
            }];

            const config2 = [{
                valueIdHash: 0x12345689,
                value: 5,
            }, {
                idHash: 0x1234568d,
                value: 6,
            }];

            const result = await optimizer.completeConfiguration(config1, config2);

            expect(result).toHaveLength(5);

            expectOwnPropertyNamesToEqual(result [0], [
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [0].valueIndex).toBe(0x1011);
            expect(result [0].value).toBe(1);
            expect(result [0].valueId).toBe('TestValue1');
            expect(result [0].priority).toBe(0);

            expectOwnPropertyNamesToEqual(result [1], [
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [1].valueIndex).toBe(0x1012);
            expect(result [1].value).toBe(2);
            expect(result [1].valueId).toBe('TestValue2');
            expect(result [1].priority).toBe(0);

            expectOwnPropertyNamesToEqual(result [2], [
                'index',
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [2].index).toBe(0x1013);
            expect(result [2].valueIndex).toBe(0x1013);
            expect(result [2].value).toBe(3);
            expect(result [2].valueId).toBe('TestValue3');
            expect(result [2].priority).toBe(0);

            expectOwnPropertyNamesToEqual(result [3], [
                'id',
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [3].id).toBe('TestValue4');
            expect(result [3].valueIndex).toBe(0x1014);
            expect(result [3].value).toBe(4);
            expect(result [3].valueId).toBe('TestValue4');
            expect(result [3].priority).toBe(0);

            expectOwnPropertyNamesToEqual(result [4], [
                'idHash',
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [4].valueIndex).toBe(0x1015);
            expect(result [4].value).toBe(6);
            expect(result [4].valueId).toBe('TestValue5');
            expect(result [4].priority).toBe(0);
        });

        it('should work correctly with object arguments', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const config1 = {
                TestValue1: 1,
                TestValue2: 2,
            };

            const config2 = {
                TestValue1: 3,
                TestValue3: 4,
            };

            const result = await optimizer.completeConfiguration(config1, config2);

            expect(result).toHaveLength(3);

            expectOwnPropertyNamesToEqual(result [0], [
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [0].valueIndex).toBe(0x1011);
            expect(result [0].value).toBe(1);
            expect(result [0].valueId).toBe('TestValue1');
            expect(result [0].priority).toBe(0);

            expectOwnPropertyNamesToEqual(result [1], [
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [1].valueIndex).toBe(0x1012);
            expect(result [1].value).toBe(2);
            expect(result [1].valueId).toBe('TestValue2');
            expect(result [1].priority).toBe(0);

            expectOwnPropertyNamesToEqual(result [2], [
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [2].valueIndex).toBe(0x1013);
            expect(result [2].value).toBe(4);
            expect(result [2].valueId).toBe('TestValue3');
            expect(result [2].priority).toBe(0);
        });

        it('should fail for unknown values', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const config = {
                UnknownValue: 1,
            };

            await expect(async () => {
                await optimizer.completeConfiguration(config);
            }).rejects.toThrow('Unable to complete value {"unknownValueKeyProvided":"UnknownValue"}');
        });

        it('should fail for incomplete values', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const config = [{
                // no known value identification here
            }];

            await expect(async() => {
                await optimizer.completeConfiguration(config);
            }).rejects.toThrow('Unable to complete value {}');
        });

        it('should fail for falsy values', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const config = [null];

            await expect(async () => {
                await optimizer.completeConfiguration(config);
            }).rejects.toThrow('Unable to complete value null');
        });

        it('should parse string values correctly', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const config = [{
                valueId: 'TestValue1',
                value: '#True',
            }, {
                valueId: 'TestValue2',
                value: '2',
            }];

            const result = await optimizer.completeConfiguration(config);

            expect(result).toHaveLength(2);

            expectOwnPropertyNamesToEqual(result [0], [
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [0].valueIndex).toBe(0x1011);
            expect(result [0].value).toBe(1);
            expect(result [0].valueId).toBe('TestValue1');
            expect(result [0].priority).toBe(0);

            expectOwnPropertyNamesToEqual(result [1], [
                'valueIndex',
                'value',
                'valueId',
                'priority',
                'valueTextById',
            ]);

            expect(result [1].valueIndex).toBe(0x1012);
            expect(result [1].value).toBe(2);
            expect(result [1].valueId).toBe('TestValue2');
            expect(result [1].priority).toBe(0);
        });

        it('should fail parsing unknown string values correctly', async () => {
            const optimizer = new TestConfigurationOptimizer();

            const config = [{
                valueId: 'TestValue1',
                value: '#Unknown',
            }];

            await expect(async() => {
                await optimizer.completeConfiguration(config);
            }).rejects.toThrow('Unable to convert value text ID to numeric value: "#Unknown"');
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly', async () => {
            const optimizer = new TestConfigurationOptimizer();

            optimizer.optimizeConfiguration = jest.fn($ => {
                $('BooleanValue').isFalse(() => {
                    $(/^TestValue\d+$/).ignore();
                });
            });

            const result1 = await optimizer.optimizeLoadConfiguration(undefined);

            expect(result1).toHaveLength(22);

            expectOwnPropertyNamesToEqual(result1 [0], [
                'pending',
                'changed',
                'checked',
                'ignored',
                'invalidated',
                'priority',
                'valueId',
                'valueIndex',
                'valueTextById',
            ]);

            expect(result1 [4].valueId).toBe('BooleanValue');
            expect(result1 [4].pending).toBe(true);

            expect(result1 [10].valueId).toBe('TestValue1');
            expect(result1 [10].ignored).toBe(true);
            expect(result1 [10].pending).toBe(undefined);

            const result2 = await optimizer.optimizeLoadConfiguration([{
                valueId: 'BooleanValue',
                value: 0,
            }]);

            expect(result2).toHaveLength(22);

            expect(result2 [4].valueId).toBe('BooleanValue');
            expect(result2 [4].pending).toBe(undefined);

            expect(result2 [10].valueId).toBe('TestValue1');
            expect(result2 [10].ignored).toBe(true);
            expect(result2 [10].pending).toBe(undefined);

            const result3 = await optimizer.optimizeLoadConfiguration([{
                valueId: 'BooleanValue',
                value: 1,
            }]);

            expect(result3).toHaveLength(22);

            expect(result3 [4].valueId).toBe('BooleanValue');
            expect(result3 [4].pending).toBe(undefined);

            expect(result3 [10].valueId).toBe('TestValue1');
            expect(result3 [10].ignored).toBe(false);
            expect(result3 [10].pending).toBe(true);
        });

    });

    describe('#optimizeSaveConfiguration', () => {

        it('should fail', () => {
            const optimizer = new TestConfigurationOptimizer();

            expect(() => {
                optimizer.optimizeSaveConfiguration();
            }).toThrow('NYI');
        });

    });

    describe('#_buildConfiguration', () => {

        it('should work correctly with undefined config', () => {
            const optimizer = new TestConfigurationOptimizer();

            optimizer.optimizeConfiguration = jest.fn();

            const result = optimizer._buildConfiguration(undefined);

            expect(result).toHaveLength(22);

            expectOwnPropertyNamesToEqual(result [0], [
                'changed',
                'checked',
                'ignored',
                'invalidated',
                'priority',
                'valueId',
                'valueIndex',
                'valueTextById',
            ]);

            expect(result [0].changed).toBe(false);
            expect(result [0].checked).toBe(false);
            expect(result [0].ignored).toBe(false);
            expect(result [0].invalidated).toBe(false);
            expect(result [0].priority).toBe(20);
            expect(result [0].valueId).toBe('HighestPriorityValue');
            expect(result [0].valueIndex).toBe(0x101c);
        });

        it('should work correctly with config', () => {
            const optimizer = new TestConfigurationOptimizer();

            optimizer.optimizeConfiguration = jest.fn();

            const config = [{
                valueId: 'TestValue1',
                value: 1,
            }];

            const result = optimizer._buildConfiguration(config);

            expect(result).toHaveLength(22);
        });

    });

    describe('_getAdjustableValues', () => {

        it('should work correctly', () => {
            const optimizer = new TestConfigurationOptimizer();

            const values = optimizer._getAdjustableValues();

            const ids = values.map(value => value.id);

            expect(ids).toEqual([
                'LowestPriorityValue',
                'StructSubValue',
                'PrefsValue',
                'CompoundPrefsValue',
                'BooleanValue',
                'ValueTextsValue',
                'KnownOptionValue',
                'DependsOnKnownOptionValue',
                'UnknownOptionValue',
                'DependsOnUnknownOptionValue',
                'TestValue1',
                'TestValue2',
                'TestValue3',
                'TestValue4',
                'TestValue5',
                'TestValue6',
                'TestValue7',
                'TestValue8',
                'TestValueA',
                'TestValueB',
                'TestValueC',
                'HighestPriorityValue',
            ]);

            let value = values.find(value => value.id === 'BooleanValue');
            expect(value.valueTextById).toEqual({
                False: 0,
                True: 1,
            });

            value = values.find(value => value.id === 'ValueTextsValue');
            expect(value.valueTextById).toEqual({
                FourtyTwo: 42,
            });
        });
    });

    describe('_optimizeConfiguration', () => {

        it('should work correctly', () => {
            const optimizer = new TestConfigurationOptimizer();

            let values = optimizer._getAdjustableValues();

            const config = values.map((value) => {
                const configValue = {
                    valueId: value.id,
                    valueIndex: value.index,
                    priority: value.priority,
                    valueTextById: value.valueTextById,
                };

                return configValue;
            });

            let value = config.find(value => value.valueId === 'PrefsValue');
            value.value = 1;
            value.previousValue = 0;

            value = config.find(value => value.valueId === 'KnownOptionValue');
            value.value = 1;

            optimizer.optimizeConfiguration = function($) {
                let values = $('^PrefsValue$');
                expect(values.length).toBe(1);

                values = $(/^PrefsValue$/);
                expect(values.length).toBe(1);

                values = $(/PrefsValue$/);
                expect(values.length).toBe(2);

                values = values.$('^C');
                expect(values.length).toBe(1);

                expect(() => {
                    values = values.$('NotHere');
                }).toThrow('WARNING: No values matching /NotHere/i found');
            };

            values = optimizer._optimizeConfiguration(config, values);

            const ids = values.reduce((memo, value) => {
                if (value.ignored) {
                    memo.push(value.valueId);
                }
                return memo;
            }, []);

            expect(ids).toEqual([
                'DependsOnUnknownOptionValue',
            ]);

            value = values.find(value => value.valueId === 'BooleanValue');

            expect(value.valueTextById).toEqual({
                False: 0,
                True: 1,
            });
        });

    });

});



describe('ValuesWrapper', () => {

    const testValuesWrapper = function(optimize) {
        const optimizer = new TestConfigurationOptimizer();

        let values = optimizer._getAdjustableValues();

        const config = values.map((value) => {
            const configValue = {
                valueId: value.id,
                valueIndex: value.index,
                priority: value.priority,
                valueTextById: value.valueTextById,
            };

            return configValue;
        });

        optimizer.optimizeConfiguration = function($) {
            const allValues = $(/.*/);

            const setValue = function(id, value) {
                const configValue = allValues.values.find(value => value.valueId === id);
                configValue.value = value;
                configValue.changed = true;
            };

            return optimize($, setValue);
        };

        values = optimizer._optimizeConfiguration(config, values);

        return values;
    };

    it('should export correctly', () => {
        testValuesWrapper(($, setValue) => {
            const values = $(/^TestValue[1-5]$/);

            expectOwnPropertyNamesToEqual(values.constructor.prototype, [
                'constructor',
                '$',
                'forEach',
                'isFalse',
                'isTrue',
                'eql',
                'notEql',
                'lt',
                'lte',
                'gt',
                'gte',
                'in',
                'notIn',
                'isChanged',
                'ignore',
                'invalidate',
                'check',
                '_check',
                '_normalizeValue',
                '_normalizeValues',
                '_reportNoMatchingValues',

                'pattern',
                'values',
                'length',
                'md',
            ]);
        });
    });

    describe('#_check', () => {

        it('should work correctly for ignored values', () => {
            testValuesWrapper(($, setValue) => {
                const values = $(/^TestValue1$/);

                values.values [0].ignored = true;

                const checker = sinon.spy((value) => {
                    return true;
                });

                const action = sinon.spy();

                const actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                const result = values._check(actionWrapper, checker);

                expect(result).toBe(values);

                expect(checker.callCount).toBe(0);

                expect(action.callCount).toBe(0);
            });
        });

        it('should work correctly for undefined values', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);

                const values = $(/^TestValue1$/);

                const checker = sinon.spy((value) => {
                    return false;
                });

                const action = sinon.spy();

                const actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).toBe(0);

                expect(action.callCount).toBe(1);
                expect(action.getCall(0).args [0].md [0]).toBe('TestValue1');

                checker.resetHistory();
                action.resetHistory();

                values._check(actionWrapper, checker, {
                    includeUndefined: false,
                });

                expect(checker.callCount).toBe(0);

                expect(action.callCount).toBe(0);
            });
        });

        it('should work correctly for failed values', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', null);

                const values = $(/^TestValue1$/);

                const checker = sinon.spy((value) => {
                    return false;
                });

                const action = sinon.spy();

                const actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).toBe(0);

                expect(action.callCount).toBe(1);
                expect(action.getCall(0).args [0].md [0]).toBe('TestValue1');

                checker.resetHistory();
                action.resetHistory();

                values._check(actionWrapper, checker, {
                    includeFailed: false,
                });

                expect(checker.callCount).toBe(0);

                expect(action.callCount).toBe(0);
            });
        });

        it('should work correctly for checker approved values', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', 7353);
                setValue('TestValue2', 1337);

                const values = $(/^TestValue[1-2]$/);

                const checker = sinon.spy((value) => {
                    return (value === 1337);
                });

                const action = sinon.spy();

                const actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).toBe(2);
                expect(checker.getCall(0).args [0]).toBe(7353);
                expect(checker.getCall(1).args [0]).toBe(1337);

                expect(action.callCount).toBe(1);
                expect(action.getCall(0).args [0].md [0]).toBe('TestValue2');
            });
        });

        it('should work correctly with argument-less action callback', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);

                const values = $(/^TestValue1$/);

                const checker = sinon.spy((value) => {
                    return false;
                });

                const action = sinon.spy();

                const actionWrapper = function() {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).toBe(0);

                expect(action.callCount).toBe(1);
                expect(action.getCall(0).args [0]).toBe(undefined);
            });
        });

        it('should work correctly with argument-having action callback', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);

                const values = $(/^TestValue(1)$/);

                const checker = sinon.spy((value) => {
                    return false;
                });

                const action = sinon.spy();

                const actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).toBe(0);

                expect(action.callCount).toBe(1);
                expectTypeToBe(action.getCall(0).args [0], 'object');
                expectTypeToBe(action.getCall(0).args [0].md, 'array');
                expect(action.getCall(0).args [0].md [0]).toBe('TestValue1');
                expect(action.getCall(0).args [0].md [1]).toBe('1');
            });
        });

    });

    describe('#check', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                const values = $(/^TestValue1$/);

                const checker = 'CHECKER';
                const action = 'ACTION';
                const options = 'OPTIONS';

                values._check = sinon.spy();

                values.check(checker, action, options);

                expect(values._check.callCount).toBe(1);
                expect(values._check.getCall(0).args [0]).toBe(action);
                expect(values._check.getCall(0).args [1]).toBe(checker);
                expect(values._check.getCall(0).args [2]).toBe(options);
            });
        });

    });

    describe('#forEach', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                let count = 0;

                $(/^TestValue[\d]$/).forEach(() => {
                    count++;
                });

                expect(count).toBe(8);
            });
        });

    });

    describe('#isFalse', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).isFalse((value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                ]);
            });
        });

    });

    describe('#isTrue', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).isTrue((value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue4',
                ]);
            });
        });

    });

    describe('#eql', () => {

        it('should work correctly for numbers', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).eql(1, (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue4',
                ]);
            });
        });

        it('should work correctly for valid strings', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).eql('#False', (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                ]);
            });
        });

        it('should work correctly for invalid strings', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).eql('#Unknown', (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                ]);
            });
        });

    });

    describe('#notEql', () => {

        it('should work correctly for numbers', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).notEql(1, (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                ]);
            });
        });

        it('should work correctly for valid strings', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).notEql('#False', (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue4',
                ]);
            });
        });

        it('should work correctly for invalid strings', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                const valueIds = [];

                $(/^TestValue[1-4]$/).notEql('#Unknown', (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                    'TestValue4',
                ]);
            });
        });

    });

    describe('#lt', () => {

        it('should work correctly for numbers', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                const valueIds = [];

                $(/^TestValue[1-5]$/).lt(1, (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                ]);
            });
        });

    });

    describe('#lte', () => {

        it('should work correctly for numbers', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                const valueIds = [];

                $(/^TestValue[1-5]$/).lte(1, (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                    'TestValue4',
                ]);
            });
        });

    });

    describe('#gt', () => {

        it('should work correctly for numbers', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                const valueIds = [];

                $(/^TestValue[1-5]$/).gt(1, (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue5',
                ]);
            });
        });

    });

    describe('#gte', () => {

        it('should work correctly for numbers', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                const valueIds = [];

                $(/^TestValue[1-5]$/).gte(1, (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue4',
                    'TestValue5',
                ]);
            });
        });

    });

    describe('#in', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);
                setValue('TestValue6', 3);

                const valueIds = [];

                $(/^TestValue[1-6]$/).in([ '#True', 3, 4, 5 ], (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue4',
                    'TestValue6',
                ]);
            });
        });

    });

    describe('#notIn', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);
                setValue('TestValue6', 3);

                const valueIds = [];

                $(/^TestValue[1-6]$/).notIn([ '#True', 3, 4, 5 ], (value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                    'TestValue5',
                ]);
            });
        });

    });

    describe('#isChanged', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);

                const valueIds = [];

                $(/^TestValue[1-3]$/).isChanged((value) => {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).toEqual([
                    'TestValue3',
                ]);
            });
        });

    });

    describe('#ignore', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);

                const values = $(/^TestValue[1-3]$/);

                for (const value of values.values) {
                    expect(value.ignored).toBe(false);
                }

                const result = values.ignore();

                expect(result).toBe(values);

                for (const value of values.values) {
                    expect(value.ignored).toBe(true);
                }
            });
        });

    });

    describe('#invalidate', () => {

        it('should work correctly', () => {
            testValuesWrapper(($, setValue) => {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);

                const values = $(/^TestValue[1-3]$/);

                for (const value of values.values) {
                    expect(value.invalidated).toBe(false);
                }

                const result = values.invalidate();

                expect(result).toBe(values);

                for (const value of values.values) {
                    expect(value.invalidated).toBe(true);
                }
            });
        });

    });

});



class TestConfigurationOptimizer extends BaseConfigurationOptimizer {

}


Object.assign(TestConfigurationOptimizer, {

    configurationData: {

        types: [{
            id: 'Boolean',
            valueTexts: [{
                id: 'False',
            }, {
                id: 'True',
            }]
        }],

        values: [{
            id: 'LowestPriorityValue',
            priority: -20,
        }, {
            id: 'AbstractValue',
            storage: 'abstract',
        }, {
            id: 'StructValue',
            storage: 'struct',
        }, {
            id: 'StructSubValue',
            structValueRef: 'StructValue',
        }, {
            id: 'VolatileValue',
            storage: 'volatile',
        }, {
            id: 'PrefsValue',
        }, {
            id: 'PersistentValue',
            storage: 'persistent',
        }, {
            id: 'CompoundPrefsValue',
            storage: 'abstract',
        }, {
            id: 'CompoundPrefsSubValue1',
            compoundValueRef: 'CompoundPrefsValue',
        }, {
            id: 'CompoundVolatileValue',
            storage: 'abstract',
        }, {
            id: 'CompoundVolatileSubValue1',
            storage: 'volatile',
            compoundValueRef: 'CompoundValue',
        }, {
            id: 'BooleanValue',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'ValueTextsValue',
            type: {
                valueTexts: [{
                    id: 'FourtyTwo',
                    value: 42,
                }],
            },
        }, {
            id: 'KnownOptionValue',
        }, {
            id: 'DependsOnKnownOptionValue',
            type: {
                selectorValueRef: 'KnownOptionValue',
            },
        }, {
            id: 'UnknownOptionValue',
        }, {
            id: 'DependsOnUnknownOptionValue',
            type: {
                selectorValueRef: 'UnknownOptionValue',
            },
        }, {
            id: 'TestValue1',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValue2',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValue3',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValue4',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValue5',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValue6',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValue7',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValue8',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValueA',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValueB',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'TestValueC',
            type: {
                base: 'Boolean',
            },
        }, {
            id: 'HighestPriorityValue',
            priority: 20,
        }]

    }

});


for (let i = 0; i < TestConfigurationOptimizer.configurationData.values.length; i++) {
    const value = TestConfigurationOptimizer.configurationData.values [i];
    value.index = 0x1000 + i;
    value.idHash = 0x12345678 + i;
}
