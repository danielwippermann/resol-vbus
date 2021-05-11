/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    BaseConfigurationOptimizer,
    ConfigurationOptimizer,
} = require('./resol-vbus');


const expect = require('./expect');
const _ = require('./lodash');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('BaseConfigurationOptimizer', () => {

    describe('constructor', () => {

        it('should be a constructor', () => {
            expect(BaseConfigurationOptimizer).a('function');
        });

    });

    describe('#completeConfiguration', () => {

        it('should be a method', () => {
            expect(BaseConfigurationOptimizer.prototype).property('completeConfiguration').a('function');
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should be a method', () => {
            expect(BaseConfigurationOptimizer.prototype).property('optimizeLoadConfiguration').a('function');
        });

    });

    describe('#optimizeSaveConfiguration', () => {

        it('should be a method', () => {
            expect(BaseConfigurationOptimizer.prototype).property('optimizeSaveConfiguration').a('function');
        });

    });

    describe('_getAdjustableValues', () => {

        it('should be a method', () => {
            expect(BaseConfigurationOptimizer.prototype).property('_getAdjustableValues').a('function');
        });

        it('should work correctly', () => {
            const optimizer = new TestConfigurationOptimizer();

            const values = optimizer._getAdjustableValues();

            const ids = _.map(values, 'id');

            expect(ids).eql([
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

            let value = _.find(values, { id: 'BooleanValue' });
            expect(value).property('valueTextById').eql({
                False: 0,
                True: 1,
            });

            value = _.find(values, { id: 'ValueTextsValue' });
            expect(value).property('valueTextById').eql({
                FourtyTwo: 42,
            });
        });
    });

    describe('_optimizeConfiguration', () => {

        it('should be a method', () => {
            expect(BaseConfigurationOptimizer.prototype).property('_optimizeConfiguration').a('function');
        });

        it('should work correctly', () => {
            const optimizer = new TestConfigurationOptimizer();

            let values = optimizer._getAdjustableValues();

            const config = _.map(values, (value) => {
                const configValue = {
                    valueId: value.id,
                    valueIndex: value.index,
                    priority: value.priority,
                    valueTextById: value.valueTextById,
                };

                return configValue;
            });

            let value = _.find(config, { valueId: 'PrefsValue' });
            value.value = 1;
            value.previousValue = 0;

            value = _.find(config, { valueId: 'KnownOptionValue' });
            value.value = 1;

            optimizer.optimizeConfiguration = function($) {
                let values = $('^PrefsValue$');
                expect(values.length).equal(1);

                values = $(/^PrefsValue$/);
                expect(values.length).equal(1);

                values = $(/PrefsValue$/);
                expect(values.length).equal(2);

                values = values.$('^C');
                expect(values.length).equal(1);

                expect(() => {
                    values = values.$('NotHere');
                }).throw(Error, 'WARNING: No values matching /NotHere/i found');
            };

            values = optimizer._optimizeConfiguration(config, values);

            const ids = _.reduce(values, (memo, value) => {
                if (value.ignored) {
                    memo.push(value.valueId);
                }
                return memo;
            }, []);

            expect(ids).eql([
                'DependsOnUnknownOptionValue',
            ]);

            value = _.find(values, { valueId: 'BooleanValue' });

            expect(value.valueTextById).eql({
                False: 0,
                True: 1,
            });

            // expect(values).eql([1]);
        });

    });

});



describe('ValuesWrapper', () => {

    const testValuesWrapper = function(optimize) {
        const optimizer = new TestConfigurationOptimizer();

        let values = optimizer._getAdjustableValues();

        const config = _.map(values, (value) => {
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
                const configValue = _.find(allValues.values, { valueId: id });
                configValue.value = value;
                configValue.changed = true;
            };

            return optimize($, setValue);
        };

        values = optimizer._optimizeConfiguration(config, values);

        return values;
    };

    describe('#_check', () => {

        it('should be a function', () => {
            testValuesWrapper(($, setValue) => {
                const values = $(/^TestValue[1-5]$/);

                expect(values._check).a('function');
            });
        });

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

                expect(result).equal(values);

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(0);
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

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0].md [0]).equal('TestValue1');

                checker.resetHistory();
                action.resetHistory();

                values._check(actionWrapper, checker, {
                    includeUndefined: false,
                });

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(0);
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

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0].md [0]).equal('TestValue1');

                checker.resetHistory();
                action.resetHistory();

                values._check(actionWrapper, checker, {
                    includeFailed: false,
                });

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(0);
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

                expect(checker.callCount).equal(2);
                expect(checker.getCall(0).args [0]).equal(7353);
                expect(checker.getCall(1).args [0]).equal(1337);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0].md [0]).equal('TestValue2');
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

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0]).equal(undefined);
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

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0]).an('object');
                expect(action.getCall(0).args [0].md).an('array');
                expect(action.getCall(0).args [0].md [0]).equal('TestValue1');
                expect(action.getCall(0).args [0].md [1]).equal('1');
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

                expect(values._check.callCount).equal(1);
                expect(values._check.getCall(0).args [0]).equal(action);
                expect(values._check.getCall(0).args [1]).equal(checker);
                expect(values._check.getCall(0).args [2]).equal(options);
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

                expect(count).equal(8);
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(2).eql([
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(4).eql([
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(4).eql([
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

                expect(valueIds).lengthOf(3).eql([
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

                expect(valueIds).lengthOf(4).eql([
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

                expect(valueIds).lengthOf(4).eql([
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

                expect(valueIds).lengthOf(4).eql([
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

                expect(valueIds).lengthOf(1).eql([
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

                _.forEach(values.values, (value) => {
                    expect(value.ignored).equal(false);
                });

                const result = values.ignore();

                expect(result).equal(values);

                _.forEach(values.values, (value) => {
                    expect(value.ignored).equal(true);
                });
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

                _.forEach(values.values, (value) => {
                    expect(value.invalidated).equal(false);
                });

                const result = values.invalidate();

                expect(result).equal(values);

                _.forEach(values.values, (value) => {
                    expect(value.invalidated).equal(true);
                });
            });
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(BaseConfigurationOptimizer, ConfigurationOptimizer, {
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
