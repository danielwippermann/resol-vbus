/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var Handlebars = require('handlebars');
var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var generateSpecInfo = require('./specification-info-generator');
var utils = require('./utils');



var generateVBusSpecificationDocs = function(spec) {
    var info = generateSpecInfo(spec);

    var escapeString = function(input) {
        return (input || '').replace(/([\(\)\[\]])/g, '\\$1');
    };

    var lines = [];

    lines.push([
        '---',
        'layout: docs',
        'title: VBus Packets',
        '---',
        '',
        '',
        '',
        '## Table of Contents',
        '',
    ]);

    _.forEach(info.packetTemplates, function(packet) {
        var destinationDevice = info.devices [info.formatPacketDeviceId(packet, 'destination')];
        var sourceDevice = info.devices [info.formatPacketDeviceId(packet, 'source')];

        var destinationName = escapeString(destinationDevice && destinationDevice.name || 'Unknown device');
        var sourceName = escapeString(sourceDevice && sourceDevice.name || 'Unknown device');

        lines.push(sprintf('- [%s (0x%04X) <= %s (0x%04X), command 0x%04X](#%s)', destinationName, packet.destinationAddress, sourceName, packet.sourceAddress, packet.command, packet.packetTemplateId));
    });

    lines.push([
        '',
        '',
        '',
        '## Known device addresses',
        '',
        '| Address | Mask | Name |',
        '|:-:|:-:|:--|',
    ]);

    var deviceTemplateKeys = _.keys(info.deviceTemplates).sort(function(lKey, rKey) {
        var l = info.deviceTemplates [lKey];
        var r = info.deviceTemplates [rKey];

        var result = (l.selfAddress & l.selfMask) - (r.selfAddress & l.selfMask);
        if (result === 0) {
            result = l.selfMask - r.selfMask;
        }
        return result;
    });

    _.forEach(deviceTemplateKeys, function(deviceKey) {
        var device = info.deviceTemplates [deviceKey];
        lines.push(sprintf('| 0x%04X | 0x%04X | %s |', device.selfAddress, device.selfMask, escapeString(device.name)));
    });

    lines.push([
        '',
        '',
        '',
        '## Known packets (VBus Protocol Version 1.0)',
        '',
    ]);

    _.forEach(info.packetTemplates, function(packet) {
        var destinationDevice = info.devices [info.formatPacketDeviceId(packet, 'destination')];
        var sourceDevice = info.devices [info.formatPacketDeviceId(packet, 'source')];

        var destinationName = escapeString(destinationDevice && destinationDevice.name || 'Unknown device');
        var sourceName = escapeString(sourceDevice && sourceDevice.name || 'Unknown device');

        var fields = _.reduce(packet.fields, function(memo, field) {
            return _.reduce(field.parts, function(memo, part) {
                memo.push(_.extend({}, field, part));
                return memo;
            }, memo);
        }, []).sort(function(l, r) {
            var result = l.offset - r.offset;
            if (result === 0) {
                result = l.mask - r.mask;
            }
            return result;
        });

        lines.push([
            sprintf('### <a name="%s"></a>%s (0x%04X) <= %s (0x%04X), command 0x%04X', packet.packetTemplateId, destinationName, packet.destinationAddress, sourceName, packet.sourceAddress, packet.command),
            '',
            '| Offset | Mask | Name | Factor | Unit |',
            '|:-:|:-:|:--|:-:|:-:|',
        ]);

        _.forEach(fields, function(field) {
            var mask = (field.mask !== 0xFF) ? sprintf('0x%02X', field.mask) : '';

            var factorText = sprintf('%.' + field.precision + 'f', field.factor);

            lines.push(sprintf('| %d | %s | %s | %s | %s |', field.offset, mask, escapeString(field.name), factorText, escapeString(field.unitText)));
        });

        lines.push([
            '',
            '',
            '',
        ]);
    });

    return _.flatten([ lines ]).join('\n');
};



module.exports = generateVBusSpecificationDocs;
