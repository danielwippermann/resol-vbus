/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var vbus = require('../..');



var extend = vbus.extend;



var XmlDeserializer = extend(null, {

    stack: null,

    constructor: function() {
        this.stack = [];
    },

    _getStringValue: function(child) {
        return child;
    },

    _getIntegerValue: function(child) {
        return _.parseInt(child.trim());
    },

    _getNumberValue: function(child) {
        return + child.replace(/,/g, '.');
    },

    _getBooleanValue: function(child) {
        if ((child === 'true') || (child === '1')) {
            return true;
        } else if ((child === 'false') || (child === '0')) {
            return false;
        } else {
            throw new Error('Unexpected boolean value ' + JSON.stringify(child));
        }
    },

    _filterProperties: function(parent, iterator) {
        var _this = this;

        var originalStack = _.clone(this.stack);

        var callIterator = function(key, value) {
            if (key) {
                _this.stack = originalStack.concat([ key ]);
                iterator.call(_this, key.toLowerCase(), value);
                _this.stack = originalStack;
            } else {
                iterator.call(_this, null, value);
            }
        };

        if (_.isObject(parent)) {
            var keys = _.keys(parent);

            var count = 0;
            if (_.contains(keys, '_')) {
                count++;
            }
            if (_.contains(keys, '$')) {
                count++;
            }
            if (count === keys.length) {
                callIterator(null, parent._);
            }

            _.forEach(parent.$, function(child, key) {
                callIterator(key, child);
            });

            _.forEach(parent, function(children, key) {
                if ((key !== '$') && (key !== '_')) {
                    _.forEach(children, function(child) {
                        callIterator(key, child);
                    });
                }
            });
        } else if (_.isString(parent)) {
            callIterator(null, parent);
        } else {
            throw new Error('Unexpected parent ' + JSON.stringify(parent));
        }
    },

    _reportUnexpectedProperty: function(parent, key) {
        if (key !== null) {
            throw new Error('Unexpected property ' + JSON.stringify(key));
        }
    },

});



module.exports = XmlDeserializer;
