/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const ConfigurationOptimizer = require('./configuration-optimizer');
const _ = require('./lodash');



class ValuesWrapper {

    constructor(pattern, values) {
        this.pattern = pattern;
        this.values = values;
        this.length = values.length;
    }

    $(pattern, values) {
        if (values === undefined) {
            values = this.values;
        }

        if (_.isString(pattern)) {
            pattern = new RegExp(pattern, 'i');
        }

        const matchingValues = _.reduce(values, (memo, value) => {
            if (pattern.test(value.valueId)) {
                memo.push(value);
            }
            return memo;
        }, []);

        if ((matchingValues.length === 0) && (values.length > 0)) {
            this._reportNoMatchingValues(pattern, values);
        }

        const wrapper = new ValuesWrapper(pattern, matchingValues);

        return wrapper;
    }

    forEach(callback) {
        return this._check(callback, () => {
            return true;
        });
    }

    isFalse(callback) {
        return this._check(callback, (value, valueInfo) => {
            return !value;
        });
    }

    isTrue(callback) {
        return this._check(callback, (value, valueInfo) => {
            return !!value;
        });
    }

    eql(refValue, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value === normalizedRefValue);
        });
    }

    notEql(refValue, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value !== normalizedRefValue);
        });
    }

    lt(refValue, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value < normalizedRefValue);
        });
    }

    lte(refValue, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value <= normalizedRefValue);
        });
    }

    gt(refValue, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value > normalizedRefValue);
        });
    }

    gte(refValue, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value >= normalizedRefValue);
        });
    }

    in(refValues, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValues = this._normalizeValues(refValues, valueInfo);
            return _.includes(normalizedRefValues, value);
        });
    }

    notIn(refValues, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValues = this._normalizeValues(refValues, valueInfo);
            return !_.includes(normalizedRefValues, value);
        });
    }

    isChanged(callback) {
        return this._check(callback, (value, valueInfo) => {
            return (_.isNumber(value) && valueInfo.changed);
        }, {
            includeUndefined: false,
            includeFailed: false,
        });
    }

    ignore() {
        _.forEach(this.values, (value) => {
            value.ignored = true;
        });

        return this;
    }

    invalidate() {
        _.forEach(this.values, (value) => {
            value.invalidated = true;
        });

        return this;
    }

    check(checker, action, options) {
        return this._check(action, checker, options);
    }

    _check(action, checker, options) {
        const _this = this;

        options = _.defaults({}, options, {
            includeUndefined: true,
            includeFailed: true,
        });

        _.forEach(this.values, (value) => {
            value.checked = true;

            let result;
            if (value.ignored) {
                result = false;
            } else if (value.value === undefined) {
                result = options.includeUndefined;
            } else if (value.value === null) {
                result = options.includeFailed;
            } else {
                result = checker.call(_this, value.value, value);
            }

            if (result !== false) {
                if (action.length > 0) {
                    const wrapper = _this.$('^' + value.valueId + '$');

                    wrapper.md = _this.pattern.exec(value.valueId);

                    action.call(_this, wrapper);
                } else {
                    action.call(_this);
                }
            }
        });

        return this;
    }

    _normalizeValue(value, valueInfo) {
        if (_.isString(value) && (value.charAt(0) === '#')) {
            const valueTextId = value.slice(1);
            const valueText = valueInfo.valueTextById [valueTextId];
            if (valueText !== undefined) {
                value = valueText;
            }
        }

        return value;
    }

    _normalizeValues(values, valueInfo) {
        const _this = this;

        values = _.map(values, (value) => {
            return _this._normalizeValue(value, valueInfo);
        });

        return values;
    }

    _reportNoMatchingValues(pattern, values) {
        throw new Error('WARNING: No values matching ' + pattern + ' found');
    }

}


Object.assign(ValuesWrapper.prototype, {

    pattern: null,

    values: null,

    length: 0,

    md: null,

});



class BaseConfigurationOptimizer extends ConfigurationOptimizer {

    async completeConfiguration(config) {
        const _this = this;

        const args = _.toArray(arguments);

        const adjustableValues = _this._getAdjustableValues();

        let result;
        if (!config) {
            result = _.map(adjustableValues, (value) => {
                return {
                    valueId: value.id,
                    valueIndex: value.index,
                };
            });
        } else {
            const valueByIndex = {}, valueById = {}, valueByIdHash = {};
            _.forEach(adjustableValues, (value) => {
                valueByIndex [value.index] = value;
                valueById [value.id] = value;
                if (value.idHash) {
                    valueByIdHash [value.idHash] = value;
                }
            });

            const configValuesById = {};

            const mergeConfig = (config) => {
                _.forEach(config, (value, key) => {
                    if (_.isArray(config)) {
                        // nop
                    } else if (_.isObject(config)) {
                        if (_.has(valueById, key)) {
                            value = {
                                valueId: key,
                                value,
                            };
                        } else {
                            value = null;
                        }
                    }

                    let refValue;
                    if (!value) {
                        refValue = null;
                    } else if (_.has(value, 'valueIndex')) {
                        refValue = valueByIndex [value.valueIndex];
                    } else if (_.has(value, 'valueId')) {
                        refValue = valueById [value.valueId];
                    } else if (_.has(value, 'index')) {
                        refValue = valueByIndex [value.index];
                    } else if (_.has(value, 'id')) {
                        refValue = valueById [value.id];
                    } else if (_.has(value, 'valueIdHash')) {
                        refValue = valueByIdHash [value.valueIdHash];
                    } else if (_.has(value, 'idHash')) {
                        refValue = valueByIdHash [value.idHash];
                    } else {
                        refValue = null;
                    }

                    if (!refValue) {
                        throw new Error('Unable to complete value ' + JSON.stringify({ key, value }));
                    }

                    let numericValue = value.value;
                    if (_.isString(numericValue)) {
                        if (numericValue.charAt(0) === '#') {
                            const valueTextId = numericValue.slice(1);
                            const valueText = refValue.valueTextById [valueTextId];
                            if (valueText !== undefined) {
                                numericValue = valueText;
                            } else {
                                throw new Error('Unable to convert value text ID to numeric value: ' + JSON.stringify(numericValue));
                            }
                        } else {
                            numericValue = numericValue | 0;
                        }
                    }

                    const configValue = _.extend({}, value, {
                        valueId: refValue.id,
                        valueIndex: refValue.index,
                        value: numericValue,
                        priority: refValue.priority || 0,
                        valueTextById: refValue.valueTextById,
                    });

                    configValuesById [configValue.valueId] = configValue;
                });
            };

            _.forEachRight(args, mergeConfig);

            result = _.reduce(adjustableValues, (memo, value) => {
                const configValue = configValuesById [value.id];
                if (configValue) {
                    memo.push(configValue);
                }
                return memo;
            }, []);
        }

        return result;
    }

    async optimizeLoadConfiguration(config) {
        const _this = this;

        config = await _this._buildConfiguration(config);

        _.forEach(config, (value) => {
            if (value.previousValue !== undefined) {
                value.value = value.previousValue;
            } else if (value.ignored) {
                // nop
            } else {
                value.pending = true;
            }
        });

        return config;
    }

    optimizeSaveConfiguration(newConfig, oldConfig) {
        throw new Error('NYI');
    }

    _buildConfiguration(oldConfig) {
        if (oldConfig === undefined) {
            oldConfig = [];
        }

        const adjustableValues = this._getAdjustableValues();

        const oldConfigValueById = _.reduce(oldConfig, (memo, value) => {
            memo [value.valueId] = value;
            return memo;
        }, {});

        let newConfig = _.map(adjustableValues, (value) => {
            let oldConfigValue;
            if (_.has(oldConfigValueById, value.id)) {
                oldConfigValue = oldConfigValueById [value.id];
            }

            const newConfigValue = _.extend({}, oldConfigValue, {
                valueId: value.id,
                valueIndex: value.index,
                priority: value.priority || 0,
                valueTextById: value.valueTextById,
            });

            if (oldConfigValue) {
                newConfigValue.previousValue = oldConfigValue.value;
            }

            return newConfigValue;
        });

        newConfig = this._optimizeConfiguration(newConfig, adjustableValues);

        newConfig.sort((l, r) => {
            let result = r.priority - l.priority;
            if (result === 0) {
                result = l.valueIndex - r.valueIndex;
            }
            return result;
        });

        return newConfig;
    }

    _getAdjustableValues() {
        const data = this.constructor.configurationData;

        const typeById = _.reduce(data.types, (memo, type) => {
            memo [type.id] = type;
            return memo;
        }, {});

        const valueById = _.reduce(data.values, (memo, value) => {
            memo [value.id] = value;
            return memo;
        }, {});

        const knownValueIds = {}, adjustableValueIds = {};

        const markValueIdAsAdjustable = (valueId) => {
            if (!_.has(knownValueIds, valueId)) {
                knownValueIds [valueId] = true;

                const value = valueById [valueId];
                if (value) {
                    let compoundValue;
                    if (value.compoundValueRef) {
                        compoundValue = valueById [value.compoundValueRef];
                    }

                    if (compoundValue) {
                        markValueIdAsAdjustable(compoundValue.id);
                    } else {
                        adjustableValueIds [valueId] = true;
                    }
                }
            }
        };

        _.forEach(data.values, (value) => {
            if (!value.storage || value.allowParameterization) {
                markValueIdAsAdjustable(value.id);
            }
        });

        const adjustableValues = _.reduce(data.values, (memo, value) => {
            if (adjustableValueIds [value.id]) {
                const valueTextById = {};
                const addValueText = (valueText, index) => {
                    if (valueText.id && !_.has(valueTextById, valueText.id)) {
                        let valueTextValue = valueText.value;
                        if (valueTextValue === undefined) {
                            valueTextValue = index;
                        }

                        valueTextById [valueText.id] = valueTextValue;
                    }
                };

                const dependsOnValueIds = [];

                let type = value.type;
                while (type) {
                    if (type.valueTexts && (type.valueTexts.length > 0)) {
                        _.forEach(type.valueTexts, addValueText);
                    }

                    if (type.selectorValueRef) {
                        dependsOnValueIds.push(type.selectorValueRef);
                    }

                    type = typeById [type.base];
                }

                const adjustableValue = _.extend({}, value, {
                    valueTextById,
                    dependsOnValueIds,
                });

                memo.push(adjustableValue);
            }
            return memo;
        }, []);

        return adjustableValues;
    }

    _optimizeConfiguration(config, adjustableValues) {
        const configValueById = _.reduce(config, (memo, configValue) => {
            memo [configValue.valueId] = configValue;
            return memo;
        }, {});

        adjustableValues = _.map(adjustableValues, (value) => {
            const configValue = configValueById [value.id];

            let changed;
            if (configValue.value === undefined) {
                changed = false;
            } else if (configValue.previousValue === undefined) {
                changed = true;
            } else {
                changed = (configValue.previousValue !== configValue.value);
            }

            let ignored = false;
            _.forEach(value.dependsOnValueIds, (dependsOnValueId) => {
                const dependsOnConfigValue = configValueById [dependsOnValueId];

                if (dependsOnConfigValue && (dependsOnConfigValue.value === undefined)) {
                    ignored = true;
                }
            });

            const valueInfo = _.extend({}, configValue, {
                changed,
                checked: false,
                ignored,
                invalidated: false,
            });

            return valueInfo;
        });

        const adjustableValuesWrapper = new ValuesWrapper(null, adjustableValues);

        const $ = (pattern) => {
            return adjustableValuesWrapper.$(pattern);
        };

        this.optimizeConfiguration($);

        return adjustableValues;
    }

    // FIXME(daniel): remove me!
    static extend(instanceMembers, staticMembers) {
        class SubClass extends BaseConfigurationOptimizer {}

        Object.assign(SubClass.prototype, instanceMembers);
        Object.assign(SubClass, staticMembers);

        return SubClass;
    }

}


Object.assign(BaseConfigurationOptimizer, {

    deviceAddress: 0,

    configurationData: null,

});



module.exports = BaseConfigurationOptimizer;
