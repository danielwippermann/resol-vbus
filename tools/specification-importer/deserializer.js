/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var extend = require('../../src/extend');


var models = require('./models');



var VBusSpecDeserializer = extend(null, {

    _deserializeText: function(parent, model) {
        this._annotateModel(model);

        this._filterProperties(parent, function(key, child) {
            if (key === 'lang') {
                model.lang = this._getStringValue(child);
            } else if (key === null) {
                model.text = this._getStringValue(child || '');
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusPacketField: function(parent, model) {
        this._annotateModel(model);

        this._filterProperties(parent, function(key, child) {
            if (key === 'offset') {
                model.offset = this._getIntegerValue(child);
            } else if (key === 'name') {
                model.name.push(this._deserializeText(child, new models.VBusSpecText()));
            } else if (key === 'bitsize') {
                model.bitSize = this._getIntegerValue(child);
            } else if (key === 'bitpos') {
                model.bitPos = this._getIntegerValue(child);
                if (model.bitSize === 0) {
                    model.bitSize = 1;
                }
            } else if (key === 'factor') {
                model.factor = this._getNumberValue(child);
            } else if (key === 'unit') {
                model.unit = this._getStringValue(child);
            } else if (key === 'commonusage') {
                model.commonUsage = this._getStringValue(child);
            } else if (key === 'format') {
                model.format = this._getStringValue(child);
            } else if (key === 'timeref') {
                model.timeRef = this._getIntegerValue(child);
            } else if (key === 'field') {
                model.fields.push(this._deserializeVBusPacketField(child, new models.VBusSpecPacketField()));
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusPacket: function(parent, model) {
        this._annotateModel(model);

        this._filterProperties(parent, function(key, child) {
            if (key === 'destination') {
                model.destinationAddress = this._getIntegerValue(child);
            } else if (key === 'destinationmask') {
                model.destinationMask = this._getIntegerValue(child);
            } else if (key === 'source') {
                model.sourceAddress = this._getIntegerValue(child);
            } else if (key === 'sourcemask') {
                model.sourceMask = this._getIntegerValue(child);
            } else if (key === 'command') {
                model.command = this._getIntegerValue(child);
            } else if (key === 'field') {
                model.fields.push(this._deserializeVBusPacketField(child, new models.VBusSpecPacketField()));
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusDevice: function(parent, model) {
        this._annotateModel(model);

        this._filterProperties(parent, function(key, child) {
            if (key === 'vendor') {
                // ignore for now
            } else if (key === 'address') {
                model.selfAddress = this._getIntegerValue(child);
            } else if (key === 'mask') {
                model.selfMask = this._getIntegerValue(child);
            } else if (key === 'name') {
                model.name.push(this._deserializeText(child, new models.VBusSpecText()));
            } else if (key === 'ismaster') {
                model.isMaster = this._getBooleanValue(child);
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusSpecification: function(parent, model) {
        this._annotateModel(model);

        this._filterProperties(parent, function(key, child) {
            if (key === 'device') {
                model.devices.push(this._deserializeVBusDevice(child, new models.VBusSpecDevice()));
            } else if (key === 'packet') {
                model.packets.push(this._deserializeVBusPacket(child, new models.VBusSpecPacket()));
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
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
                iterator.call(this, null, parent._);
            }

            _.forEach(parent.$, function(child, key) {
                iterator.call(_this, key.toLowerCase(), child);
            });

            _.forEach(parent, function(children, key) {
                if ((key !== '$') && (key !== '_')) {
                    _.forEach(children, function(child) {
                        iterator.call(_this, key.toLowerCase(), child);
                    });
                }
            });
        } else if (_.isString(parent)) {
            iterator.call(this, null, parent);
        } else {
            throw new Error('Unexpected parent ' + JSON.stringify(parent));
        }
    },

    _reportUnexpectedProperty: function(parent, key) {
        throw new Error('Unexpected property ' + JSON.stringify(key));
    },

    _annotateModel: function(model) {
        _.extend(model, this._modelAnnotations);
    },

    deserializeVBusSpecification: function(parent, model) {
        if (model === undefined) {
            model = new models.VBusSpecification();
        }

        return this._deserializeVBusSpecification(parent, model);
    },

});



module.exports = VBusSpecDeserializer;
