/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var vbus = require('./resol-vbus');



var BaseConfigurationOptimizer = vbus.BaseConfigurationOptimizer;



var TestConfigurationOptimizer;



describe('BaseConfigurationOptimizer', function() {

    describe('constructor', function() {

        it('should be a constructor', function() {
            expect(BaseConfigurationOptimizer).a('function');
        });

    });

    describe('#completeConfiguration', function() {

        it('should be a method', function() {
            expect(BaseConfigurationOptimizer.prototype).property('completeConfiguration').a('function');
        });

    });

    describe('#optimizeLoadConfiguration', function() {

        it('should be a method', function() {
            expect(BaseConfigurationOptimizer.prototype).property('optimizeLoadConfiguration').a('function');
        });

    });

    describe('#optimizeSaveConfiguration', function() {

        it('should be a method', function() {
            expect(BaseConfigurationOptimizer.prototype).property('optimizeSaveConfiguration').a('function');
        });

    });

    describe('_getAdjustableValues', function() {

        it('should be a method', function() {
            expect(BaseConfigurationOptimizer.prototype).property('_getAdjustableValues').a('function');
        });

        it('should work correctly', function() {
            var optimizer = new TestConfigurationOptimizer();

            var values = optimizer._getAdjustableValues();

            var ids = _.pluck(values, 'id');

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

            var value = _.find(values, { id: 'BooleanValue' });
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

    describe('_optimizeConfiguration', function() {

        it('should be a method', function() {
            expect(BaseConfigurationOptimizer.prototype).property('_optimizeConfiguration').a('function');
        });

        it('should work correctly', function() {
            var optimizer = new TestConfigurationOptimizer();

            var values = optimizer._getAdjustableValues();

            var config = _.map(values, function(value) {
                var configValue = {
                    valueId: value.id,
                    valueIndex: value.index,
                    priority: value.priority,
                    valueTextById: value.valueTextById,
                };

                return configValue;
            });

            var value = _.find(config, { valueId: 'PrefsValue' });
            value.value = 1;
            value.previousValue = 0;

            value = _.find(config, { valueId: 'KnownOptionValue' });
            value.value = 1;

            optimizer.optimizeConfiguration = function($) {
                var values = $('^PrefsValue$');
                expect(values.length).equal(1);

                values = $(/^PrefsValue$/);
                expect(values.length).equal(1);

                values = $(/PrefsValue$/);
                expect(values.length).equal(2);

                values = values.$('^C');
                expect(values.length).equal(1);

                expect(function() {
                    values = values.$('NotHere');
                }).throw(Error, 'WARNING: No values matching /NotHere/i found');
            };

            values = optimizer._optimizeConfiguration(config, values);

            var ids = _.pluck(_.where(values, { ignored: true }), 'valueId');

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



describe('ValuesWrapper', function() {

    var testValuesWrapper = function(optimize) {
        var optimizer = new TestConfigurationOptimizer();

        var values = optimizer._getAdjustableValues();

        var config = _.map(values, function(value) {
            var configValue = {
                valueId: value.id,
                valueIndex: value.index,
                priority: value.priority,
                valueTextById: value.valueTextById,
            };

            return configValue;
        });

        optimizer.optimizeConfiguration = function($) {
            var allValues = $(/.*/);

            var setValue = function(id, value) {
                var configValue = _.find(allValues.values, { valueId: id });
                configValue.value = value;
                configValue.changed = true;
            };

            return optimize($, setValue);
        };

        values = optimizer._optimizeConfiguration(config, values);

        return values;
    };

    describe('#_check', function() {

        it('should be a function', function() {
            testValuesWrapper(function($, setValue) {
                var values = $(/^TestValue[1-5]$/);

                expect(values._check).a('function');
            });
        });

        it('should work correctly for ignored values', function() {
            testValuesWrapper(function($, setValue) {
                var values = $(/^TestValue1$/);

                values.values [0].ignored = true;

                var checker = sinon.spy(function(value) {
                    return true;
                });

                var action = sinon.spy();

                var actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                var result = values._check(actionWrapper, checker);

                expect(result).equal(values);

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(0);
            });
        });

        it('should work correctly for undefined values', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);

                var values = $(/^TestValue1$/);

                var checker = sinon.spy(function(value) {
                    return false;
                });

                var action = sinon.spy();

                var actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0].md [0]).equal('TestValue1');

                checker.reset();
                action.reset();

                values._check(actionWrapper, checker, {
                    includeUndefined: false,
                });

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(0);
            });
        });

        it('should work correctly for failed values', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', null);

                var values = $(/^TestValue1$/);

                var checker = sinon.spy(function(value) {
                    return false;
                });

                var action = sinon.spy();

                var actionWrapper = function(value) {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0].md [0]).equal('TestValue1');

                checker.reset();
                action.reset();

                values._check(actionWrapper, checker, {
                    includeFailed: false,
                });

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(0);
            });
        });

        it('should work correctly for checker approved values', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', 7353);
                setValue('TestValue2', 1337);

                var values = $(/^TestValue[1-2]$/);

                var checker = sinon.spy(function(value) {
                    return (value === 1337);
                });

                var action = sinon.spy();

                var actionWrapper = function(value) {
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

        it('should work correctly with argument-less action callback', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);

                var values = $(/^TestValue1$/);

                var checker = sinon.spy(function(value) {
                    return false;
                });

                var action = sinon.spy();

                var actionWrapper = function() {
                    return action.apply(this, arguments);
                };

                values._check(actionWrapper, checker);

                expect(checker.callCount).equal(0);

                expect(action.callCount).equal(1);
                expect(action.getCall(0).args [0]).equal(undefined);
            });
        });

        it('should work correctly with argument-having action callback', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);

                var values = $(/^TestValue(1)$/);

                var checker = sinon.spy(function(value) {
                    return false;
                });

                var action = sinon.spy();

                var actionWrapper = function(value) {
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

    describe('#check', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                var values = $(/^TestValue1$/);

                var checker = 'CHECKER';
                var action = 'ACTION';
                var options = 'OPTIONS';

                values._check = sinon.spy();

                values.check(checker, action, options);

                expect(values._check.callCount).equal(1);
                expect(values._check.getCall(0).args [0]).equal(action);
                expect(values._check.getCall(0).args [1]).equal(checker);
                expect(values._check.getCall(0).args [2]).equal(options);
            });
        });

    });

    describe('#forEach', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var count = 0;

                $(/^TestValue[\d]$/).forEach(function() {
                    count++;
                });

                expect(count).equal(8);
            });
        });

    });

    describe('#isFalse', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).isFalse(function(value) {
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

    describe('#isTrue', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).isTrue(function(value) {
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

    describe('#eql', function() {

        it('should work correctly for numbers', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).eql(1, function(value) {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).lengthOf(3).eql([
                    'TestValue1',
                    'TestValue2',
                    'TestValue4',
                ]);
            });
        });

        it('should work correctly for valid strings', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).eql('#False', function(value) {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).lengthOf(3).eql([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                ]);
            });
        });

        it('should work correctly for invalid strings', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).eql('#Unknown', function(value) {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).lengthOf(2).eql([
                    'TestValue1',
                    'TestValue2',
                ]);
            });
        });

    });

    describe('#notEql', function() {

        it('should work correctly for numbers', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).notEql(1, function(value) {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).lengthOf(3).eql([
                    'TestValue1',
                    'TestValue2',
                    'TestValue3',
                ]);
            });
        });

        it('should work correctly for valid strings', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).notEql('#False', function(value) {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).lengthOf(3).eql([
                    'TestValue1',
                    'TestValue2',
                    'TestValue4',
                ]);
            });
        });

        it('should work correctly for invalid strings', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);

                var valueIds = [];

                $(/^TestValue[1-4]$/).notEql('#Unknown', function(value) {
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

    describe('#lt', function() {

        it('should work correctly for numbers', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                var valueIds = [];

                $(/^TestValue[1-5]$/).lt(1, function(value) {
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

    describe('#lte', function() {

        it('should work correctly for numbers', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                var valueIds = [];

                $(/^TestValue[1-5]$/).lte(1, function(value) {
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

    describe('#gt', function() {

        it('should work correctly for numbers', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                var valueIds = [];

                $(/^TestValue[1-5]$/).gt(1, function(value) {
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

    describe('#gte', function() {

        it('should work correctly for numbers', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);

                var valueIds = [];

                $(/^TestValue[1-5]$/).gte(1, function(value) {
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

    describe('#in', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);
                setValue('TestValue6', 3);

                var valueIds = [];

                $(/^TestValue[1-6]$/).in([ '#True', 3, 4, 5], function(value) {
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

    describe('#notIn', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);
                setValue('TestValue4', 1);
                setValue('TestValue5', 2);
                setValue('TestValue6', 3);

                var valueIds = [];

                $(/^TestValue[1-6]$/).notIn([ '#True', 3, 4, 5], function(value) {
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

    describe('#isChanged', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);

                var valueIds = [];

                $(/^TestValue[1-3]$/).isChanged(function(value) {
                    valueIds.push(value.md [0]);
                });

                expect(valueIds).lengthOf(1).eql([
                    'TestValue3',
                ]);
            });
        });

    });

    describe('#ignore', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);

                var values = $(/^TestValue[1-3]$/);

                _.forEach(values.values, function(value) {
                    expect(value.ignored).equal(false);
                });

                var result = values.ignore();

                expect(result).equal(values);

                _.forEach(values.values, function(value) {
                    expect(value.ignored).equal(true);
                });
            });
        });

    });

    describe('#invalidate', function() {

        it('should work correctly', function() {
            testValuesWrapper(function($, setValue) {
                setValue('TestValue1', undefined);
                setValue('TestValue2', null);
                setValue('TestValue3', 0);

                var values = $(/^TestValue[1-3]$/);

                _.forEach(values.values, function(value) {
                    expect(value.invalidated).equal(false);
                });

                var result = values.invalidate();

                expect(result).equal(values);

                _.forEach(values.values, function(value) {
                    expect(value.invalidated).equal(true);
                });
            });
        });

    });

});



TestConfigurationOptimizer  = BaseConfigurationOptimizer.extend({

}, {

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
