/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var ConfigurationOptimizer = require('./configuration-optimizer');
var extend = require('./extend');



var ValuesWrapper = extend(null, {

    pattern: null,

    values: null,

    length: 0,

    md: null,

    constructor: function(pattern, values) {
        this.pattern = pattern;
        this.values = values;
        this.length = values.length;
    },

    $: function(pattern, values) {
        if (values === undefined) {
            values = this.values;
        }

        if (_.isString(pattern)) {
            pattern = new RegExp(pattern, 'i');
        }

        var matchingValues = _.reduce(values, function(memo, value) {
            if (pattern.test(value.valueId)) {
                memo.push(value);
            }
            return memo;
        }, []);

        if ((matchingValues.length === 0) && (values.length > 0)) {
            this._reportNoMatchingValues(pattern, values);
        }

        var wrapper = new ValuesWrapper(pattern, matchingValues);

        return wrapper;
    },

    forEach: function(callback) {
        return this._check(callback, function() {
            return true;
        });
    },

    isFalse: function(callback) {
        return this._check(callback, function(value, valueInfo) {
            return !value;
        });
    },

    isTrue: function(callback) {
        return this._check(callback, function(value, valueInfo) {
            return !!value;
        });
    },

    eql: function(refValue, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value === normalizedRefValue);
        });
    },

    notEql: function(refValue, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value !== normalizedRefValue);
        });
    },

    lt: function(refValue, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value < normalizedRefValue);
        });
    },

    lte: function(refValue, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value <= normalizedRefValue);
        });
    },

    gt: function(refValue, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value > normalizedRefValue);
        });
    },

    gte: function(refValue, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValue = this._normalizeValue(refValue, valueInfo);
            return (value >= normalizedRefValue);
        });
    },

    in: function(refValues, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValues = this._normalizeValues(refValues, valueInfo);
            return _.contains(normalizedRefValues, value);
        });
    },

    notIn: function(refValues, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValues = this._normalizeValues(refValues, valueInfo);
            return !_.contains(normalizedRefValues, value);
        });
    },

    isChanged: function(callback) {
        return this._check(callback, function(value, valueInfo) {
            return (_.isNumber(value) && valueInfo.changed);
        }, {
            includeUndefined: false,
            includeFailed: false,
        });
    },

    ignore: function() {
        _.forEach(this.values, function(value) {
            value.ignored = true;
        });

        return this;
    },

    invalidate: function() {
        _.forEach(this.values, function(value) {
            value.invalidated = true;
        });

        return this;
    },

    check: function(checker, action, options) {
        return this._check(action, checker, options);
    },

    _check: function(action, checker, options) {
        var _this = this;

        options = _.defaults({}, options, {
            includeUndefined: true,
            includeFailed: true,
        });

        _.forEach(this.values, function(value) {
            value.checked = true;

            var result;
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
                    var wrapper = _this.$('^' + value.valueId + '$');

                    wrapper.md = _this.pattern.exec(value.valueId);

                    action.call(_this, wrapper);
                } else {
                    action.call(_this);
                }
            }
        });

        return this;
    },

    _normalizeValue: function(value, valueInfo) {
        if (_.isString(value) && (value.charAt(0) === '#')) {
            var valueTextId = value.slice(1);
            var valueText = valueInfo.valueTextById [valueTextId];
            if (valueText !== undefined) {
                value = valueText;
            }
        }

        return value;
    },

    _normalizeValues: function(values, valueInfo) {
        var _this = this;

        values = _.map(values, function(value) {
            return _this._normalizeValue(value, valueInfo);
        });

        return values;
    },

    _reportNoMatchingValues: function(pattern, values) {
        throw new Error('WARNING: No values matching ' + pattern + ' found');
    },

});



var BaseConfigurationOptimizer = ConfigurationOptimizer.extend({

    completeConfiguration: function(config) {
        var _this = this;

        var args = _.toArray(arguments);

        return Q.fcall(function() {
            var adjustableValues = _this._getAdjustableValues();

            var result;
            if (!config) {
                result = _.map(adjustableValues, function(value) {
                    return {
                        valueId: value.id,
                        valueIndex: value.index,
                    };
                });
            } else {
                var valueByIndex = {}, valueById = {}, valueByIdHash = {};
                _.forEach(adjustableValues, function(value) {
                    valueByIndex [value.index] = value;
                    valueById [value.id] = value;
                    if (value.idHash) {
                        valueByIdHash [value.idHash] = value;
                    }
                });

                var configValuesById = {};

                var mergeConfig = function(config) {
                    _.forEach(config, function(value, key) {
                        if (_.isArray(config)) {
                            // nop
                        } else if (_.isObject(config)) {
                            if (_.has(valueById, key)) {
                                value = {
                                    valueId: key,
                                    value: value,
                                };
                            } else {
                                value = null;
                            }
                        }

                        var refValue;
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
                            throw new Error('Unable to complete value ' + JSON.stringify({ key: key, value: value }));
                        }

                        var numericValue = value.value;
                        if (_.isString(numericValue)) {
                            if (numericValue.charAt(0) === '#') {
                                var valueTextId = numericValue.slice(1);
                                var valueText = refValue.valueTextById [valueTextId];
                                if (valueText !== undefined) {
                                    numericValue = valueText;
                                } else {
                                    throw new Error('Unable to convert value text ID to numeric value: ' + JSON.stringify(numericValue));
                                }
                            } else {
                                numericValue = numericValue | 0;
                            }
                        }

                        var configValue = _.extend({}, value, {
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

                result = _.reduce(adjustableValues, function(memo, value) {
                    var configValue = configValuesById [value.id];
                    if (configValue) {
                        memo.push(configValue);
                    }
                    return memo;
                }, []);
            }

            return result;
        });
    },

    optimizeLoadConfiguration: function(config) {
        var _this = this;

        return Q.fcall(function() {
            return _this._buildConfiguration(config);
        }).then(function(config) {
            _.forEach(config, function(value) {
                if (value.previousValue !== undefined) {
                    value.value = value.previousValue;
                } else if (value.ignored) {
                    // nop
                } else {
                    value.pending = true;
                }
            });

            return config;
        });
    },

    optimizeSaveConfiguration: function(newConfig, oldConfig) {
        throw new Error('NYI');
    },

    _buildConfiguration: function(oldConfig) {
        if (oldConfig === undefined) {
            oldConfig = [];
        }

        var adjustableValues = this._getAdjustableValues();

        var oldConfigValueById = _.reduce(oldConfig, function(memo, value) {
            memo [value.valueId] = value;
            return memo;
        }, {});

        var newConfig = _.map(adjustableValues, function(value) {
            var oldConfigValue;
            if (_.has(oldConfigValueById, value.id)) {
                oldConfigValue = oldConfigValueById [value.id];
            }

            var newConfigValue = _.extend({}, oldConfigValue, {
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

        newConfig.sort(function(l, r) {
            var result = r.priority - l.priority;
            if (result === 0) {
                result = l.valueIndex - r.valueIndex;
            }
            return result;
        });

        return newConfig;
    },

    _getAdjustableValues: function() {
        var data = this.constructor.configurationData;

        var typeById = _.reduce(data.types, function(memo, type) {
            memo [type.id] = type;
            return memo;
        }, {});

        var valueById = _.reduce(data.values, function(memo, value) {
            memo [value.id] = value;
            return memo;
        }, {});

        var knownValueIds = {}, adjustableValueIds = {};

        var markValueIdAsAdjustable = function(valueId) {
            if (!_.has(knownValueIds, valueId)) {
                knownValueIds [valueId] = true;

                var value = valueById [valueId];
                if (value) {
                    var compoundValue;
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

        _.forEach(data.values, function(value) {
            if (!value.storage || value.allowParameterization) {
                markValueIdAsAdjustable(value.id);
            }
        });

        var adjustableValues = _.reduce(data.values, function(memo, value) {
            if (adjustableValueIds [value.id]) {
                var valueTextById = {};
                var addValueText = function(valueText, index) {
                    if (valueText.id && !_.has(valueTextById, valueText.id)) {
                        var valueTextValue = valueText.value;
                        if (valueTextValue === undefined) {
                            valueTextValue = index;
                        }

                        valueTextById [valueText.id] = valueTextValue;
                    }
                };

                var dependsOnValueIds = [];

                var type = value.type;
                while (type) {
                    if (type.valueTexts && (type.valueTexts.length > 0)) {
                        _.forEach(type.valueTexts, addValueText);
                    }

                    if (type.selectorValueRef) {
                        dependsOnValueIds.push(type.selectorValueRef);
                    }

                    type = typeById [type.base];
                }

                var adjustableValue = _.extend({}, value, {
                    valueTextById: valueTextById,
                    dependsOnValueIds: dependsOnValueIds,
                });

                memo.push(adjustableValue);
            }
            return memo;
        }, []);

        return adjustableValues;
    },

    _optimizeConfiguration: function(config, adjustableValues) {
        var configValueById = _.reduce(config, function(memo, configValue) {
            memo [configValue.valueId] = configValue;
            return memo;
        }, {});

        adjustableValues = _.map(adjustableValues, function(value) {
            var configValue = configValueById [value.id];

            var changed;
            if (configValue.value === undefined) {
                changed = false;
            } else if (configValue.previousValue === undefined) {
                changed = true;
            } else {
                changed = (configValue.previousValue !== configValue.value);
            }

            var ignored = false;
            _.forEach(value.dependsOnValueIds, function(dependsOnValueId) {
                var dependsOnConfigValue = configValueById [dependsOnValueId];

                if (dependsOnConfigValue && (dependsOnConfigValue.value === undefined)) {
                    ignored = true;
                }
            });

            var valueInfo = _.extend({}, configValue, {
                changed: changed,
                checked: false,
                ignored: ignored,
                invalidated: false,
            });

            return valueInfo;
        });

        var adjustableValuesWrapper = new ValuesWrapper(null, adjustableValues);

        var $ = function(pattern) {
            return adjustableValuesWrapper.$(pattern);
        };

        this.optimizeConfiguration($);

        return adjustableValues;
    },

}, {

    deviceAddress: 0,

    configurationData: null,

});



module.exports = BaseConfigurationOptimizer;
