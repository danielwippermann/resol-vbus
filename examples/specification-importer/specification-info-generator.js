/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var utils = require('./utils');



var generateSpecInfo = function(spec) {
    var iterateAddresses = function(addressA, maskA, addressB, maskB, callback) {
        var countA = (maskA === 0) ? 0 : ((~maskA) & 0x7F);
        var countB = (maskB === 0) ? 0 : ((~maskB) & 0x7F);

        for (var indexA = 0; indexA <= countA; indexA++) {
            var instanceA = (addressA + indexA);

            for (var indexB = 0; indexB <= countB; indexB++) {
                var instanceB = (addressB + indexB);

                callback(instanceA, instanceB);
            }
        }
    };

    var formatDeviceId = function(device) {
        return sprintf('%04X', device.selfAddress);
    };

    var formatPacketDeviceId = function(packet, which) {
        var device;
        if (which === 'source') {
            device = {
                selfAddress: packet.sourceAddress,
                selfMask: packet.sourceMask,
                peerAddress: packet.destinationAddress,
                peerMask: packet.destinationMask,
            };
        } else if (which === 'destination') {
            device = {
                selfAddress: packet.destinationAddress,
                selfMask: packet.destinationMask,
                peerAddress: packet.sourceAddress,
                peerMask: packet.sourceMask,
            };
        } else {
            throw new Error('Unexpected which ' + JSON.stringify(which));
        }
        return formatDeviceId(device);
    };

    var formatPacketId = function(packet) {
        return sprintf('%s_%s_%04X', formatPacketDeviceId(packet, 'destination'), formatPacketDeviceId(packet, 'source'), packet.command);
    };

    var deviceTemplates = {}, devices = {};
    _.forEach(spec.devices, function(device) {
        var deviceTemplateId = formatDeviceId(device);

        var deviceName = utils.getRefText(device.name);

        if (_.has(deviceTemplates, deviceTemplateId)) {
            throw new Error('Non-unique device template ID ' + JSON.stringify(deviceTemplateId));
        }

        deviceTemplates [deviceTemplateId] = {
            deviceTemplateId: deviceTemplateId,
            selfAddress: device.selfAddress,
            selfMask: device.selfMask,
            peerAddress: device.peerAddress,
            peerMask: device.peerMask,
            name: deviceName,
        };

        iterateAddresses(device.selfAddress, device.selfMask, device.peerAddress, device.peerMask, function(selfAddress, peerAddress) {
            var deviceInstance = _.extend({}, device, {
                selfAddress: selfAddress,
                selfMask: device.selfMask && 0xFFFF,
                peerAddress: peerAddress,
                peerMask: device.peerMask && 0xFFFF,
            });

            var deviceId = formatDeviceId(deviceInstance);

            if (_.has(devices, deviceId)) {
                throw new Error('Non-unique device ID ' + JSON.stringify(deviceId) + ' for device ' + JSON.stringify(device));
            }

            devices [deviceId] = {
                deviceId: deviceId,
                deviceTemplateId: deviceTemplateId,
                selfAddress: deviceInstance.selfAddress,
                selfMask: deviceInstance.selfMask,
                peerAddress: deviceInstance.peerAddress,
                peerMask: deviceInstance.peerMask,
                name: deviceName.replace(/#/, '#' + (selfAddress - device.selfAddress)),
            };
        });
    });

    var packetTemplates = {}, packets = {}, fieldNames = {};
    _.forEach(spec.packets, function(packet) {
        var packetTemplateId = formatPacketId(packet);

        var fieldIds = [];

        var fields = _.map(packet.fields, function(field) {
            var fields;
            if (field.fields.length > 0) {
                fields = field.fields;
            } else {
                fields = [ field ];
            }

            var parts = [];
            _.forEach(fields, function(field) {
                var size = (field.bitSize + 7) >> 3;

                var factor = field.factor;

                var mask;
                if (field.bitSize === 1) {
                    mask = (1 << field.bitPos);
                } else {
                    mask = 0xFF;
                }

                for (var i = 0; i < size; i++) {
                    var isSigned = ((field.bitSize & 1) && (i === (size - 1)));

                    parts.push({
                        offset: field.offset + i,
                        mask: mask,
                        isSigned: isSigned,
                        factor: factor,
                    });

                    factor *= 256;
                }
            });

            if (parts.length === 0) {
                console.log('No parts for fields ' + JSON.stringify(fields));
            }

            var firstField = fields [0];
            var firstPart = parts [0];

            var size = (firstField.bitSize + 7) >> 3;

            var mask;
            if (firstField.bitSize === 1) {
                mask = (1 << firstField.bitPos);
            } else {
                mask = 0;
            }

            var fieldIdPrefix = sprintf('%03d_%d_%d', firstPart.offset, size, mask);
            var fieldIdVariant = 0;
            var fieldId;
            do {
                fieldId = fieldIdPrefix;
                if (fieldIdVariant > 0) {
                    fieldId += '_' + fieldIdVariant;
                }
                fieldIdVariant++;
            } while (_.contains(fieldIds, fieldId));

            fieldIds.push(fieldId);

            var origName = utils.getRefText(field.name);
            var name = origName.replace(/\./g, '_');
            if (!_.has(fieldNames, name)) {
                fieldNames [name] = origName;
            } else if (fieldNames [name] !== origName) {
                throw new Error('Non-unique encoded field name ' + JSON.stringify(origName));
            }

            var unitCode = utils.getUnitCodeByUnit(field.unit);
            var unitText = utils.getUnitByUnitCode(unitCode);
            var unitFamily = utils.getUnitFamilyByUnitCode(unitCode);

            var rootTypeId, precision;
            if (field.format === null) {
                rootTypeId = 'Number';
                precision = - Math.round(Math.log(firstField.factor) / Math.log(10));
            } else if (field.format.charAt(0) === 'F') {
                rootTypeId = 'Number';
                precision = + field.format.substring(1);
            } else if (field.format === 't') {
                rootTypeId = 'Time';
                precision = 0;
            } else if (field.format === 'T') {
                rootTypeId = 'Weektime';
                precision = 0;
            } else if (field.format === 'r') {
                rootTypeId = 'DateTime';
                precision = 0;
            } else {
                throw new Error('Unknown format ' + JSON.stringify(field.format));
            }

            if (_.isNaN(precision)) {
                precision = 0;
            } else if (precision === Infinity) {
                precision = 0;
            } else if (precision < 0) {
                precision = 0;
            }

            var typeId = rootTypeId + '_';
            typeId += sprintf('%.' + precision + 'f', Math.pow(10, - precision)).replace(/[^0-9]/g, '_');
            typeId += '_' + unitCode;

            return {
                fieldId: fieldId,
                name: name,
                offset: firstPart.offset,
                size: size,
                mask: mask,
                typeId: typeId,
                rootTypeId: rootTypeId,
                precision: precision,
                unitCode: unitCode,
                unitFamily: unitFamily,
                unitText: unitText,
                parts: parts,
            };
        });

        if (_.has(packetTemplates, packetTemplateId)) {
            throw new Error('Non-unique packet template ID ' + JSON.stringify(packetTemplateId));
        }

        packetTemplates [packetTemplateId] = {
            packetTemplateId: packetTemplateId,
            destinationAddress: packet.destinationAddress,
            destinationMask: packet.destinationMask,
            sourceAddress: packet.sourceAddress,
            sourceMask: packet.sourceMask,
            command: packet.command,
            fields: fields,
        };

        iterateAddresses(packet.destinationAddress, packet.destinationMask, packet.sourceAddress, packet.sourceMask, function(destinationAddress, sourceAddress) {
            var packetInstance = _.extend({}, packet, {
                destinationAddress: destinationAddress,
                destinationMask: packet.destinationMask && 0xFFFF,
                sourceAddress: sourceAddress,
                sourceMask: packet.sourceMask && 0xFFFF,
            });

            var packetId = formatPacketId(packetInstance);

            if (_.has(packets, packetId)) {
                throw new Error('Non-unique packet ID ' + JSON.stringify(packetId));
            }

            packets [packetId] = {
                packetId: packetId,
                packetTemplateId: packetTemplateId,
                destinationAddress: packetInstance.destinationAddress,
                destinationMask: packetInstance.destinationMask,
                sourceAddress: packetInstance.sourceAddress,
                sourceMask: packetInstance.sourceMask,
                command: packetInstance.command,
                fields: fields,
            };
        });
    });

    var info = {
        formatDeviceId: formatDeviceId,
        deviceTemplates: deviceTemplates,
        devices: devices,
        formatPacketDeviceId: formatPacketDeviceId,
        formatPacketId: formatPacketId,
        packetTemplates: packetTemplates,
        packets: packets,
    };

    return info;
};



module.exports = generateSpecInfo;
