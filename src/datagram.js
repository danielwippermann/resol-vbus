/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var Header = require('./header');



var optionKeys = [
    'command',
    'valueId',
    'value'
];



var Datagram = Header.extend({

    command: 0,

    valueId: 0,

    value: 0,

    constructor: function(options) {
        Header.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    toLiveBuffer: function(origBuffer, start, end) {
        var length = 16;

        var buffer;
        if (origBuffer === undefined) {
            buffer = new Buffer(length);
        } else {
            buffer = origBuffer.slice(start, end);
        }

        if (buffer.length < length) {
            throw new Error('Buffer too small');
        }

        buffer [0] = 0xAA;
        buffer.writeUInt16LE(this.destinationAddress & 0x7F7F, 1);
        buffer.writeUInt16LE(this.sourceAddress & 0x7F7F, 3);
        buffer [5] = 0x20;
        buffer.writeUInt16LE(this.command & 0x7F7F, 6);

        var frameData = new Buffer(6);
        frameData.writeUInt16LE(this.valueId, 0);
        frameData.writeInt32LE(this.value, 2);
        Datagram.extractSeptett(frameData, 0, 6, buffer, 8);
        Datagram.calcAndSetChecksumV0(buffer, 1, 15);

        return buffer;
    },

    getProtocolVersion: function() {
        return 0x20;
    },

    getId: function() {
        var info = 0;
        if (this.command === 0x0900) {
            info = this.valueId;
        }

        var baseId = Header.prototype.getId.call(this);
        return sprintf('%s_%04X_%04X', baseId, this.command, info);
    },

}, {

    fromLiveBuffer: function(buffer, start, end) {
        var frameData = new Buffer(6);
        Header.injectSeptett(buffer, start + 8, start + 14, frameData, 0);

        return new Datagram({
            destinationAddress: buffer.readUInt16LE(start + 1),
            sourceAddress: buffer.readUInt16LE(start + 3),
            command: buffer.readUInt16LE(start + 6),
            valueId: frameData.readUInt16LE(0),
            value: frameData.readInt32LE(2)
        });
    }

});



module.exports = Datagram;
