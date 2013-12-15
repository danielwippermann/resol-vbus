/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var util = require('util');


var _ = require('lodash');



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

    if (parent) {
        var Surrogate = function() {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
    }

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
