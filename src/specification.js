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

        this.specificationData = createVBusSpecificationData();
    },

    getDeviceSpecification: function(channel, selfAddress, peerAddress) {
        var deviceId = sprintf('%02X_%04X_%04X', channel, selfAddress, peerAddress);

        if (!_.has(this.deviceSpecCache, deviceId)) {
            var origDeviceSpec = this.specificationData.getDeviceSpecification(selfAddress, peerAddress);

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
            var origPacketSpec = this.specificationData.getPacketSpecification(destinationAddress, sourceAddress, command);

            var destinationDeviceSpec = this.getDeviceSpecification(headerOrChannel, destinationAddress, sourceAddress);
            var sourceDeviceSpec = this.getDeviceSpecification(headerOrChannel, sourceAddress, destinationAddress);

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

});



module.exports = Specification;
