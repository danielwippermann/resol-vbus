/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


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

    in: function(refValues, callback) {
        return this._check(callback, function(value, valueInfo) {
            var normalizedRefValues = this._normalizeValues(refValues, valueInfo);
            return _.contains(normalizedRefValues, value);
        });
    },

    isChanged: function(callback) {
        return this._check(callback, function(value, valueInfo) {
            return valueInfo.changed;
        });
    },

    ignore: function() {
        _.forEach(this.values, function(value) {
            value.ignored = true;
        });
    },

    invalidate: function() {
        _.forEach(this.values, function(value) {
            value.invalidated = true;
        });
    },

    check: function(checker, action) {
        return this._check(action, checker);
    },

    _check: function(action, checker) {
        var _this = this;

        _.forEach(this.values, function(value) {
            value.checked = true;

            var result;
            if (value.ignored) {
                result = false;
            } else if (value.value !== undefined) {
                result = checker.call(_this, value.value, value);
            } else {
                result = undefined;
            }

            if (result !== false) {
                if (action.length > 0) {
                    var wrapper = _this.$(value.valueId);

                    wrapper.md = _this.pattern.exec(value.valueId);

                    action.call(_this, wrapper);
                } else {
                    action.call(_this);
                }
            }
        });
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

});



var BaseConfigurationOptimizer = ConfigurationOptimizer.extend({

    getInitialLoadConfiguration: function() {
        var config = this._buildLoadConfiguration([]);

        return config;
    },

    optimizeLoadConfiguration: function(oldConfig) {
        return this._buildLoadConfiguration(oldConfig);
    },

    getSaveConfiguration: function(newConfig, oldConfig) {
        throw new Error('NYI');
    },

    _buildLoadConfiguration: function(oldConfig) {
        var config = this._buildConfiguration(oldConfig);

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
            if (!value.storage) {
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
        var _this = this;

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
