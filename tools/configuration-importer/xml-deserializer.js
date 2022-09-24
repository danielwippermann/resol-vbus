/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const _ = require('lodash');


const vbus = require('../..');



class XmlDeserializer {

    constructor() {
        this.stack = [];
    }

    _getStringValue(child) {
        return child;
    }

    _getIntegerValue(child) {
        return _.parseInt(child.trim());
    }

    _getNumberValue(child) {
        return +child.replace(/,/g, '.');
    }

    _getBooleanValue(child) {
        if ((child === 'true') || (child === '1')) {
            return true;
        } else if ((child === 'false') || (child === '0')) {
            return false;
        } else {
            throw new Error('Unexpected boolean value ' + JSON.stringify(child));
        }
    }

    _filterProperties(parent, iterator) {
        const _this = this;

        const originalStack = _.clone(this.stack);

        const callIterator = function(key, value) {
            if (key) {
                _this.stack = originalStack.concat([ key ]);
                iterator.call(_this, key.toLowerCase(), value);
                _this.stack = originalStack;
            } else {
                iterator.call(_this, null, value);
            }
        };

        if (_.isObject(parent)) {
            const keys = _.keys(parent);

            let count = 0;
            if (_.includes(keys, '_')) {
                count++;
            }
            if (_.includes(keys, '$')) {
                count++;
            }
            if (count === keys.length) {
                callIterator(null, parent._);
            }

            _.forEach(parent.$, (child, key) => {
                callIterator(key, child);
            });

            _.forEach(parent, (children, key) => {
                if ((key !== '$') && (key !== '_')) {
                    _.forEach(children, (child) => {
                        callIterator(key, child);
                    });
                }
            });
        } else if (_.isString(parent)) {
            callIterator(null, parent);
        } else {
            throw new Error('Unexpected parent ' + JSON.stringify(parent));
        }
    }

    _reportUnexpectedProperty(parent, key) {
        if (key !== null) {
            throw new Error('Unexpected property ' + JSON.stringify(key));
        }
    }

}


module.exports = XmlDeserializer;
