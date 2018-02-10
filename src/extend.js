/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');



/**
 * A helper method for classical inheritance.
 *
 * @param {?function} parent Parent class constructor
 * @param {?object} protoProps Properties to be mixed-in the prototype of
 *                             the child class
 * @param {?object} staticProps Properties to be mixed-in the constructor
 *                              function of the child class
 * @returns {function} Child class constructor
 */
var extend = function(parent, protoProps, staticProps) {

    var child;
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else if (parent) {
        child = function() {
            return parent.apply(this, arguments);
        };
    } else {
        child = function() {
            // nop
        };
    }

    _.extend(child, parent, staticProps);

    var Surrogate = function() {
        this.constructor = child;
    };
    if (parent) {
        Surrogate.prototype = parent.prototype;
    }
    child.prototype = new Surrogate();

    if (protoProps) {
        _.extend(child.prototype, protoProps);
    }

    if (parent) {
        child.__super__ = parent.prototype;
    }

    if (!_.has(child, 'extend')) {
        child.extend = function(protoProps, staticProps) {
            return extend(this, protoProps, staticProps);
        };
    }

    return child;
};



module.exports = extend;
