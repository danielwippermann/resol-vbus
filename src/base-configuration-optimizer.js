/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const ConfigurationOptimizer = require('./configuration-optimizer');
const {
    isNumber,
    isObject,
    isString,
    hasOwnProperty,
} = require('./utils');



class ValuesWrapper {

    constructor(pattern, values) {
        this.pattern = pattern;
        this.values = values;
        this.length = values.length;
    }

    $(pattern, values) {
        if (values === undefined) {
            ({ values } = this);
        }

        if (isString(pattern)) {
            pattern = new RegExp(pattern, 'i');
        }

        const matchingValues = values.reduce((memo, value) => {
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
            return normalizedRefValues.includes(value);
        });
    }

    notIn(refValues, callback) {
        return this._check(callback, (value, valueInfo) => {
            const normalizedRefValues = this._normalizeValues(refValues, valueInfo);
            return !normalizedRefValues.includes(value);
        });
    }

    isChanged(callback) {
        return this._check(callback, (value, valueInfo) => {
            return (isNumber(value) && valueInfo.changed);
        }, {
            includeUndefined: false,
            includeFailed: false,
        });
    }

    ignore() {
        for (const value of this.values) {
            value.ignored = true;
        }

        return this;
    }

    invalidate() {
        for (const value of this.values) {
            value.invalidated = true;
        }

        return this;
    }

    check(checker, action, options) {
        return this._check(action, checker, options);
    }

    _check(action, checker, options) {
        const _this = this;

        options = {
            includeUndefined: true,
            includeFailed: true,
            ...options,
        };

        for (const value of this.values) {
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
        }

        return this;
    }

    _normalizeValue(value, valueInfo) {
        if (isString(value) && (value.charAt(0) === '#')) {
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

        values = values.map((value) => {
            return _this._normalizeValue(value, valueInfo);
        });

        return values;
    }

    _reportNoMatchingValues(pattern, values) {
        throw new Error('WARNING: No values matching ' + pattern + ' found');
    }

}


Object.assign(ValuesWrapper.prototype, /** @lends ValuesWrapper.prototype */ {

    pattern: null,

    values: null,

    length: 0,

    md: null,

});



class BaseConfigurationOptimizer extends ConfigurationOptimizer {

    async completeConfiguration(...configs) {
        const _this = this;

        const adjustableValues = _this._getAdjustableValues();

        let result;
        if (!configs [0]) {
            result = adjustableValues.map((value) => {
                return {
                    valueId: value.id,
                    valueIndex: value.index,
                };
            });
        } else {
            const valueByIndex = {}, valueById = {}, valueByIdHash = {};
            for (const value of adjustableValues) {
                valueByIndex [value.index] = value;
                valueById [value.id] = value;
                if (value.idHash) {
                    valueByIdHash [value.idHash] = value;
                }
            }

            const configValuesById = new Map();
            for (let config of configs.reverse()) {
                if (Array.isArray(config)) {
                    // nop
                } else if (isObject(config)) {
                    config = Object.getOwnPropertyNames(config).map(key => {
                        let value;
                        if (hasOwnProperty(valueById, key)) {
                            value = {
                                valueId: key,
                                value: config [key],
                            };
                        } else {
                            value = {
                                unknownValueKeyProvided: key,
                            };
                        }
                        return value;
                    });
                }

                for (const value of config) {
                    let refValue;
                    if (!value) {
                        refValue = null;
                    } else if (hasOwnProperty(value, 'valueIndex')) {
                        refValue = valueByIndex [value.valueIndex];
                    } else if (hasOwnProperty(value, 'valueId')) {
                        refValue = valueById [value.valueId];
                    } else if (hasOwnProperty(value, 'index')) {
                        refValue = valueByIndex [value.index];
                    } else if (hasOwnProperty(value, 'id')) {
                        refValue = valueById [value.id];
                    } else if (hasOwnProperty(value, 'valueIdHash')) {
                        refValue = valueByIdHash [value.valueIdHash];
                    } else if (hasOwnProperty(value, 'idHash')) {
                        refValue = valueByIdHash [value.idHash];
                    } else {
                        refValue = null;
                    }

                    if (!refValue) {
                        throw new Error('Unable to complete value ' + JSON.stringify(value));
                    }

                    let numericValue = value.value;
                    if (isString(numericValue)) {
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

                    const configValue = {
                        ...value,
                        valueId: refValue.id,
                        valueIndex: refValue.index,
                        value: numericValue,
                        priority: refValue.priority || 0,
                        valueTextById: refValue.valueTextById,
                    };

                    configValuesById.set(configValue.valueId, configValue);
                }
            }

            result = adjustableValues.reduce((memo, value) => {
                if (configValuesById.has(value.id)) {
                    memo.push(configValuesById.get(value.id));
                }
                return memo;
            }, []);
        }

        return result;
    }

    async optimizeLoadConfiguration(config) {
        config = await this._buildConfiguration(config);

        for (const value of config) {
            if (value.previousValue !== undefined) {
                value.value = value.previousValue;
            } else if (value.ignored) {
                // nop
            } else {
                value.pending = true;
            }
        }

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

        const oldConfigValueById = (oldConfig || []).reduce((memo, value) => {
            memo [value.valueId] = value;
            return memo;
        }, {});

        let newConfig = adjustableValues.map((value) => {
            let oldConfigValue;
            if (hasOwnProperty(oldConfigValueById, value.id)) {
                oldConfigValue = oldConfigValueById [value.id];
            }

            const newConfigValue = {
                ...oldConfigValue,
                valueId: value.id,
                valueIndex: value.index,
                priority: value.priority || 0,
                valueTextById: value.valueTextById,
            };

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

        const typeById = (data.types || []).reduce((memo, type) => {
            memo [type.id] = type;
            return memo;
        }, {});

        const valueById = data.values.reduce((memo, value) => {
            memo [value.id] = value;
            return memo;
        }, {});

        const knownValueIds = new Set(), adjustableValueIds = {};

        const markValueIdAsAdjustable = (valueId) => {
            if (!knownValueIds.has(valueId)) {
                knownValueIds.add(valueId);

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

        for (const value of data.values) {
            if (!value.storage || value.allowParameterization) {
                markValueIdAsAdjustable(value.id);
            }
        }

        const adjustableValues = data.values.reduce((memo, value) => {
            if (adjustableValueIds [value.id]) {
                const valueTextById = {};
                const addValueText = (valueText, index) => {
                    if (valueText.id && !hasOwnProperty(valueTextById, valueText.id)) {
                        let valueTextValue = valueText.value;
                        if (valueTextValue === undefined) {
                            valueTextValue = index;
                        }

                        valueTextById [valueText.id] = valueTextValue;
                    }
                };

                const dependsOnValueIds = [];

                let { type } = value;
                while (type) {
                    if (type.valueTexts && (type.valueTexts.length > 0)) {
                        for (let i = 0; i < type.valueTexts.length; i++) {
                            addValueText(type.valueTexts [i], i);
                        }
                    }

                    if (type.selectorValueRef) {
                        dependsOnValueIds.push(type.selectorValueRef);
                    }

                    type = typeById [type.base];
                }

                const adjustableValue = {
                    ...value,
                    valueTextById,
                    dependsOnValueIds,
                };

                memo.push(adjustableValue);
            }
            return memo;
        }, []);

        return adjustableValues;
    }

    _optimizeConfiguration(config, adjustableValues) {
        const configValueById = config.reduce((memo, configValue) => {
            memo [configValue.valueId] = configValue;
            return memo;
        }, {});

        adjustableValues = adjustableValues.map((value) => {
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
            for (const dependsOnValueId of value.dependsOnValueIds) {
                const dependsOnConfigValue = configValueById [dependsOnValueId];

                if (dependsOnConfigValue && (dependsOnConfigValue.value === undefined)) {
                    ignored = true;
                }
            }

            const valueInfo = {
                ...configValue,
                changed,
                checked: false,
                ignored,
                invalidated: false,
            };

            return valueInfo;
        });

        const adjustableValuesWrapper = new ValuesWrapper(null, adjustableValues);

        const $ = (pattern) => {
            return adjustableValuesWrapper.$(pattern);
        };

        this.optimizeConfiguration($);

        return adjustableValues;
    }

}


Object.assign(BaseConfigurationOptimizer, /** @lends BaseConfigurationOptimizer */ {

    deviceAddress: 0,

    configurationData: null,

});



module.exports = BaseConfigurationOptimizer;
