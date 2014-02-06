/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var Header = require('./header');



var optionKeys = [
    'command',
    'frameCount',
];



var Packet = Header.extend({

    command: 0,

    frameCount: 0,

    frameData: null,

    constructor: function(options) {
        Header.call(this, options);

        _.extend(this, _.pick(options, optionKeys));

        if (_.has(options, 'frameData') && _.has(options, 'dontCopyFrameData') && options.dontCopyFrameData) {
            this.frameData = options.frameData;
        } else {
            this.frameData = new Buffer(127 * 4);
            this.frameData.fill(0);

            if (_.has(options, 'frameData')) {
                var minLength = Math.min(this.frameData.length, options.frameData.length);
                options.frameData.copy(this.frameData, 0, 0, minLength);
            }
        }
    },

    toLiveBuffer: function(origBuffer, start, end) {
        var length = 10 + this.frameCount * 6;

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
        buffer [5] = 0x10;
        buffer.writeUInt16LE(this.command & 0x7F7F, 6);
        buffer [8] = this.frameCount & 0x7F;
        Packet.calcAndSetChecksumV0(buffer, 1, 9);

        for (var i = 0; i < this.frameCount; i++) {
            var srcStart = 4 * i;
            var dstStart = 10 + 6 * i;
            Packet.extractSeptett(this.frameData, srcStart, srcStart + 4, buffer, dstStart);
            Packet.calcAndSetChecksumV0(buffer, dstStart, dstStart + 5);
        }

        return buffer;
    },

    getProtocolVersion: function() {
        return 0x10;
    },

    getId: function() {
        var baseId = Header.prototype.getId.call(this);
        return sprintf('%s_%04X', baseId, this.command);
    },

    compareTo: function(that) {
        var result = Header.prototype.compareTo.apply(this, arguments);
        if (result === 0) {
            result = this.command - that.command;
        }
        return result;
    },

}, {

    fromLiveBuffer: function(buffer, start, end) {
        var frameCount = buffer [start + 8];

        var frameData = new Buffer(127 * 4);
        frameData.fill(0);

        for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
            var sourceStart = start + 10 + frameIndex * 6;
            var targetStart = frameIndex * 4;
            Packet.injectSeptett(buffer, sourceStart, sourceStart + 4, frameData, targetStart);
        }

        return new Packet({
            destinationAddress: buffer.readUInt16LE(start + 1),
            sourceAddress: buffer.readUInt16LE(start + 3),
            command: buffer.readUInt16LE(start + 6),
            frameCount: frameCount,
            frameData: frameData,
            dontCopyFrameData: true
        });
    }

});



module.exports = Packet;
