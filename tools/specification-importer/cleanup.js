/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var utils = require('./utils');



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


var formatFieldId = function(field) {
	var firstField = field.fields [0] || field;
	var size = Math.ceil(firstField.bitSize / 8);
	var mask;
	if (firstField.bitSize === 1) {
		mask = (1 << firstField.bitPos);
	} else {
		mask = 0;
	}
    return sprintf('%03d_%d_%d', firstField.offset, size, mask);
};


var cleanupSpec = function(spec) {
	// Apply masks to addresses of devices and packets
    _.forEach(spec.devices, function(device) {
        device.selfAddress &= device.selfMask;
    });

    _.forEach(spec.packets, function(packet) {
        packet.destinationAddress &= packet.destinationMask;
        packet.sourceAddress &= packet.sourceMask;
    });

	var devicesById = {};
	_.forEach(spec.devices, function(device) {
		var id = formatDeviceId(device);
		if (!_.has(devicesById, id)) {
			devicesById [id] = [];
		}
		devicesById [id].push(device);
	});

	var packetsById = {};
	_.forEach(spec.packets, function(packet) {
		var id = formatPacketId(packet);
		if (!_.has(packetsById, id)) {
			packetsById [id] = [];
		}
		packetsById [id].push(packet);
	});

	var packetFieldsById = {};
	_.forEach(spec.packets, function(packet) {
		var packetId = formatPacketId(packet);
		_.forEach(packet.fields, function(field) {
			var packetFieldId = packetId + formatFieldId(field);
			if (!_.has(packetFieldsById, packetFieldId)) {
				packetFieldsById [packetFieldId] = [];
			}
			packetFieldsById [packetFieldId].push({
				packet: packet,
				field: field,
			});
		});
	});

	// var packetFields = packetFieldsById ['0010_7101_0100_016_2_0'];
	// if (packetFields && (packetFields.length === 2)) {
	// 	var packetField = packetFields [1];
	// 	_.remove(packetField.packet.fields, packetField.field);
	// }

	// packetFields = packetFieldsById ['0010_7421_0100_016_2_0'];
	// if (packetFields && (packetFields.length === 2)) {
	// 	packetField = packetFields [1];
	// 	_.remove(packetField.packet.fields, packetField.field);
	// }

	// Sortech eCoo
	var packets = packetsById ['0010_1100_0100'];
	if (packets && (packets.length === 1)) {
		var packet = packets [0];
		packet.fields = _.reduce(packet.fields, function(memo, field) {
			if (field.unit === '********************') {
				// nop
			} else {
				switch (field.unit) {
					case ' - (0 = AUS; 1 = EIN)':
					case ' - (0 = Fehler; 1 = Ok)':
					case ' - (0 = Kühlen; 1 = Heizen)':
					case ' - Zyklen':
						field.unit = '';
						break;
				}

				memo.push(field);
			}
			return memo;
		}, []);
	}

    return spec;
};



module.exports = cleanupSpec;
