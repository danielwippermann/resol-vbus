/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var Handlebars = require('handlebars');
var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var generateSpecInfo = require('./specification-info-generator');
var utils = require('./utils');
var template = require('./template.hbs');



var generateVBusSpecificationData = function(spec) {
    var info = generateSpecInfo(spec);

    // console.log(JSON.stringify(info, null, '    '));

    Handlebars.registerHelper('stringify', function(value) {
        var output = JSON.stringify(value);
        if (_.isString(value)) {
            output = '\'' + output.substring(1, output.length - 1).replace(/'/g, '\\\'') + '\'';
        }
        return new Handlebars.SafeString(output);
    });

    var sortedMap = function(obj, iterator) {
        return _.map(_.keys(obj).sort(), function(key) {
            return iterator(obj [key], key, obj);
        });
    };

    var units = [];
    utils.forEachUnitCode(function(unitCode) {
        units.push({
            unitCode: unitCode,
            unitText: utils.getUnitByUnitCode(unitCode),
            unitFamily: utils.getUnitFamilyByUnitCode(unitCode) || null,
        });
    });

    var deviceTemplates = sortedMap(info.deviceTemplates, function(device, deviceId) {
        return {
            deviceId: deviceId,
            name: device.name,
        };
    });

    var devices = sortedMap(info.devices, function(device, deviceId) {
        var selfAddressCondition;
        if (device.selfMask === 0) {
            selfAddressCondition = 'true';
        } else if (device.selfMask === 0xFFFF) {
            selfAddressCondition = sprintf('(selfAddress === 0x%04X)', device.selfAddress);
        }

        var peerAddressCondition;
        if (device.peerMask === 0) {
            peerAddressCondition = 'true';
        } else {
            peerAddressCondition = sprintf('(peerAddress === 0x%04X)', device.peerAddress);
        }

        return {
            deviceId: deviceId,
            name: device.name,
            selfAddressCondition: selfAddressCondition,
            peerAddressCondition: peerAddressCondition,
        };
    });

    var types = {}, fieldTemplates = {};
    _.forEach(info.packetTemplates, function(packet) {
        _.forEach(packet.fields, function(field) {
            if (!_.has(types, field.typeId)) {
                types [field.typeId] = field;
            }

            var packetFieldId = packet.packetTemplateId + '_' + field.fieldId;
            if (!_.has(fieldTemplates, packetFieldId)) {
                fieldTemplates [packetFieldId] = field;
            } else {
                throw new Error('Non-unique packet field ID ' + JSON.stringify(packetFieldId));
            }
        });
    });

    types = sortedMap(types, function(type, typeId) {
        return {
            typeId: typeId,
            rootTypeId: type.rootTypeId,
            precision: type.precision,
            unitCode: type.unitCode,
        };
    });

    fieldTemplates = sortedMap(fieldTemplates, function(field, packetFieldId) {
        var parts = _.map(field.parts, function(part) {
            var bitPos = (part.bitPos | 0) & 7;

            return {
                offset: part.offset | 0,
                mask: part.mask | 0,
                hasMask: part.mask !== 0xFF,
                bitPos: bitPos,
                hasBitPos: bitPos !== 0,
                isSigned: part.isSigned,
                factor: part.factor,
            };
        });

        return {
            packetFieldId: packetFieldId,
            factor: field.factor,
            parts: parts
        };
    });

    var packetTemplates = sortedMap(info.packetTemplates, function(packet, packetId) {
        var fields = _.map(packet.fields, function(field) {
            var parts = _.map(field.parts, function(part) {
                var bitPos = (part.bitPos | 0) & 7;

                return {
                    offset: part.offset | 0,
                    mask: part.mask | 0,
                    hasMask: part.mask !== 0xFF,
                    bitPos: bitPos,
                    hasBitPos: bitPos !== 0,
                    isSigned: JSON.stringify(part.isSigned),
                    factor: part.factor,
                };
            });

            return {
                packetFieldId: packetId + '_' + field.fieldId,
                fieldId: field.fieldId,
                name: field.name,
                typeId: field.typeId,
                factor: field.factor,
                parts: parts,
            };
        });

        return {
            packetId: packetId,
            fields: fields,
        };
    });

    var packets = sortedMap(info.packets, function(packet, packetId) {
        var destinationCondition;
        if (packet.destinationMask === 0) {
            destinationCondition = '(true)';  // TODO: remove braces
        } else {
            destinationCondition = sprintf('(destinationAddress === 0x%04X)', packet.destinationAddress);
        }

        var sourceCondition;
        if (packet.sourceMask === 0) {
            sourceCondition = '(true)';  // TODO: remove braces
        } else {
            sourceCondition = sprintf('(sourceAddress === 0x%04X)', packet.sourceAddress);
        }

        var commandCondition = sprintf('(command === 0x%04X)', packet.command);

        return {
            packetId: packetId,
            packetTemplateId: packet.packetTemplateId,
            destinationCondition: destinationCondition,
            sourceCondition: sourceCondition,
            commandCondition: commandCondition,
        };
    });

    var values = {
        units: units,
        types: types,
        deviceTemplates: deviceTemplates,
        devices: devices,
        fieldTemplates: fieldTemplates,
        packetTemplates: packetTemplates,
        packets: packets,
    };

    return template(values);
};



module.exports = generateVBusSpecificationData;
