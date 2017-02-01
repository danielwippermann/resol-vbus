/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var utils = require('./utils');



var sortSpec = function(spec) {
    spec.devices.sort(function(left, right) {
        return left.selfAddress - right.selfAddress;
    });

    spec.packets.sort(function(left, right) {
        var result = left.destinationAddress - right.destinationAddress;
        if (result === 0) {
            result = left.sourceAddress - right.sourceAddress;
        }
        if (result === 0) {
            result = left.command - right.command;
        }
        return result;
    });

    return spec;
};


var isAddressOverlapping = function(addressA, maskA, addressB, maskB) {
    var startA = (addressA & maskA) & 0x7F7F;
    var   endA = (addressA | (~maskA)) & 0x7F7F;
    var startB = (addressB & maskB) & 0x7F7F;
    var   endB = (addressB | (~maskB)) & 0x7F7F;

    return ((maskA !== 0) && (maskB !== 0) && !((startA > endB) || (endA < startB)));
};


var checkSpec = function(spec) {
    spec = sortSpec(spec);

    _.forEach(spec.devices, function(deviceA) {
        _.forEach(spec.devices, function(deviceB) {
            if (deviceA === deviceB) {
                // nop
            } else if (isAddressOverlapping(deviceA.selfAddress, deviceA.selfMask, deviceB.selfAddress, deviceB.selfMask)) {
                console.log('Multiple devices for same address space defined:', deviceA, deviceB);
            }
        });

        if (utils.getRefText(deviceA.name) === null) {
            console.log('No name for device ' + JSON.stringify(deviceA));
        }
    });

    var checkField = function(field) {
        if (field.fields.length > 0) {
            console.log('Field must not have sub fields');
        }

        if ((field.bitPos !== 0) && (field.bitSize > 1)) {
            console.log('Invalid bitPos ' + field.bitPos + ' for bitSize ' + field.bitSize);
        }
    };

    _.forEach(spec.packets, function(packetA) {
        var packetAId = sprintf('%04X(%04X) <- %04X(%04X), Cmd %04X', packetA.destinationAddress, packetA.destinationMask, packetA.sourceAddress, packetA.sourceMask, packetA.command);

        _.forEach(spec.packets, function(packetB) {
            var packetBId = sprintf('%04X(%04X) <- %04X(%04X), Cmd %04X', packetB.destinationAddress, packetB.destinationMask, packetB.sourceAddress, packetB.sourceMask, packetB.command);


            if (packetA === packetB) {
                // nop
            } else if (!isAddressOverlapping(packetA.destinationAddress, packetA.destinationMask, packetB.destinationAddress, packetB.destinationMask)) {
                // nop
            } else if (!isAddressOverlapping(packetA.sourceAddress, packetA.sourceMask, packetB.sourceAddress, packetB.sourceMask)) {
                // nop
            } else if (packetA.command !== packetB.command) {
                // nop
            } else {
                console.log('Multiple packets defined for same address space:', packetAId, packetBId);
            }
        });

        _.forEach(packetA.fields, function(field) {
            var fields;
            if (field.fields.length > 0) {
                fields = field.fields;
            } else {
                fields = [ field ];
            }

            if (utils.getRefText(field.name) === null) {
                console.log('No name for field ' + JSON.stringify(field));
            }

            _.forEach(fields, checkField);
        });
    });

    // console.log(JSON.stringify(spec.devices, null, 4));

    return spec;
};



module.exports = checkSpec;
