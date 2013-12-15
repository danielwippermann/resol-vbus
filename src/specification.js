/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var extend = require('./extend');

var specificationData = require('./specification-data');



var Specification = extend(null, {

    deviceSpecCache: null,

    packetSpecCache: null,

    constructor: function() {
        this.deviceSpecCache = {};
        this.packetSpecCache = {};
    },

    getDeviceSpecification: function(channel, selfAddress, peerAddress) {
        var deviceId = sprintf('%02d_%04X_%04X', channel, selfAddress, peerAddress);

        if (!_.has(this.deviceSpecCache, deviceId)) {
            var origDeviceSpec = specificationData.getDeviceSpecification(selfAddress, peerAddress);

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

        var packetId = sprintf('%02d_%04X_%04X_%04X', headerOrChannel, destinationAddress, sourceAddress, command);

        if (!_.has(this.packetSpecCache, packetId)) {
            var origPacketSpec = specificationData.getPacketSpecification(destinationAddress, sourceAddress, command);

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
    }

});



module.exports = Specification;
