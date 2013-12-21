/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var _ = require('lodash');
var moment = require('moment');
var sprintf = require('sprintf').sprintf;


var extend = require('./extend');

var createVBusSpecificationData = require('./specification-data');



var globalSpecificationData = createVBusSpecificationData();



var optionKeys = [
    'language'
];



var Specification = extend(null, {

    language: 'en',

    deviceSpecCache: null,

    packetSpecCache: null,

    specificationData: null,

    constructor: function(options) {
        var _this = this;

        _.extend(this, _.pick(options, optionKeys));

        this.deviceSpecCache = {};
        this.packetSpecCache = {};

        this.specificationData = this.loadSpecificationData(options.specificationData);
    },

    loadSpecificationData: function(rawSpecificationData) {
        // TODO mix in rawSpecData
        return globalSpecificationData;
    },

    storeSpecificationData: function(options) {
        // TODO mix out specData
    },

    getDeviceSpecification: function(selfAddress, peerAddress, channel) {
        if (typeof selfAddress === 'object') {
            if (peerAddress === 'source') {
                channel = selfAddress.channel;
                peerAddress = selfAddress.destinationAddress;
                selfAddress = selfAddress.sourceAddress;
            } else if (peerAddress === 'destination') {
                channel = selfAddress.channel;
                peerAddress = selfAddress.sourceAddress;
                selfAddress = selfAddress.destinationAddress;
            } else {
                throw new Error('Invalid arguments');
            }
        }

        if (channel === undefined) {
            channel = 0;
        }

        var deviceId = sprintf('%02X_%04X_%04X', channel, selfAddress, peerAddress);

        if (!_.has(this.deviceSpecCache, deviceId)) {
            var origDeviceSpec;
            if (!origDeviceSpec && this.specificationData.getDeviceSpecification) {
                origDeviceSpec = this.specificationData.getDeviceSpecification(selfAddress, peerAddress);
            }
            if (!origDeviceSpec && this.specificationData.deviceSpecs) {
                origDeviceSpec = this.specificationData.deviceSpecs ['_' + deviceId];
            }

            var deviceSpec = _.extend({}, origDeviceSpec, {
                deviceId: deviceId,
            });

            if (!_.has(deviceSpec, 'name')) {
                deviceSpec.name = sprintf('Unknown Device (0x%04X)', selfAddress);
            }

            this.deviceSpecCache [deviceId] = deviceSpec;
        }

        return this.deviceSpecCache [deviceId];
    },

    getPacketSpecification: function(headerOrChannel, destinationAddress, sourceAddress, command) {
        if (typeof headerOrChannel === 'object') {
            command = headerOrChannel.command;
            sourceAddress = headerOrChannel.sourceAddress;
            destinationAddress = headerOrChannel.destinationAddress;
            headerOrChannel = headerOrChannel.channel;
        }

        var packetId = sprintf('%02X_%04X_%04X_%04X_10', headerOrChannel, destinationAddress, sourceAddress, command);

        if (!_.has(this.packetSpecCache, packetId)) {
            var origPacketSpec;
            if (!origPacketSpec && this.specificationData.getPacketSpecification) {
                origPacketSpec = this.specificationData.getPacketSpecification(destinationAddress, sourceAddress, command);
            }
            if (!origPacketSpec && this.specificationData.packetSpecs) {
                origPacketSpec = this.specificationData.packetSpecs ['_' + packetId];
            }

            var destinationDeviceSpec = this.getDeviceSpecification(destinationAddress, sourceAddress, headerOrChannel);
            var sourceDeviceSpec = this.getDeviceSpecification(sourceAddress, destinationAddress, headerOrChannel);

            var packetSpec = _.extend({}, origPacketSpec, {
                packetId: packetId,
                destinationDevice: destinationDeviceSpec,
                sourceDevice: sourceDeviceSpec,
            });

            if (!_.has(packetSpec, 'packetFields')) {
                packetSpec.packetFields = [];
            }

            this.packetSpecCache [packetId] = packetSpec;
        }
        
        return this.packetSpecCache [packetId];
    },

    getRawValue: function(packetField, buffer, start, end) {
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            end = buffer.length;
        }

        var rawValue = 0;
        if (packetField && packetField.getRawValue) {
            rawValue = packetField.getRawValue(buffer, start, end);
        }

        return rawValue;
    },

    formatTextValueFromRawValue: function(packetField, rawValue, unit) {
        var textValue;

        if ((rawValue !== undefined) && (rawValue !== null)) {
            if (typeof unit === 'string') {
                if (_.has(this.specificationData.units, unit)) {
                    unit = this.specificationData.units [unit];
                } else {
                    throw new Error('Unknown unit named "' + unit + '"');
                }
            }

            if (packetField && packetField.type) {
                var type = packetField.type;
                textValue = this.formatTextValueFromRawValueInternal(rawValue, unit, type.rootTypeId, type.precision, type.unit);
            } else {
                textValue = rawValue.toString();
            }
        } else {
            textValue = '';
        }

        return textValue;
    },

    formatTextValueFromRawValueInternal: function(rawValue, unit, rootType, precision, defaultUnit) {
        var unitText = unit ? unit.unitText : defaultUnit.unitText;

        var result, textValue, format;
        if (rootType === 'Time') {
            textValue = moment(rawValue * 60000).lang(this.language).utc().format('HH:mm');
            result = textValue + unitText;
        } else if (rootType === 'Weektime') {
            textValue = moment(rawValue * 60000).lang(this.language).utc().format('ddd,HH:mm');
            result = textValue + unitText;
        } else if (rootType === 'Datetime') {
            textValue = moment(rawValue).lang(this.language).format('L HH:mm:ss');
            result = textValue + unitText;
        } else if (precision === 0) {
            result = sprintf('%.0f%s', rawValue, unitText);
        } else if (precision === 1) {
            result = sprintf('%.1f%s', rawValue, unitText);
        } else if (precision === 2) {
            result = sprintf('%.2f%s', rawValue, unitText);
        } else if (precision === 3) {
            result = sprintf('%.3f%s', rawValue, unitText);
        } else if (precision === 4) {
            result = sprintf('%.4f%s', rawValue, unitText);
        } else {
            format = '%.' + precision + 'f%s';
            result = sprintf(format, rawValue, unitText);
        }

        return result;
    },

    getPacketFieldsForHeaders: function(headers) {
        var packetFields = [];

        for (var i = 0; i < headers.length; i++) {
            var header = headers [i];

            var sourceDeviceSpec = this.getDeviceSpecification(header, 'source');
            var destinationDeviceSpec = this.getDeviceSpecification(header, 'destination');
            var packetSpec = this.getPacketSpecification(header);

            if (packetSpec) {
                for (var j = 0; j < packetSpec.packetFields.length; j++) {
                    var packetFieldSpec = packetSpec.packetFields [j];

                    packetFields.push({
                        id: packetSpec.packetId + '_' + packetFieldSpec.fieldId,
                        sourceDeviceSpec: sourceDeviceSpec,
                        destinationDeviceSpec: destinationDeviceSpec,
                        packetSpec: packetSpec,
                        packetFieldSpec: packetFieldSpec,
                    });
                }
            }
        }

        return packetFields;
    },

});



module.exports = Specification;
