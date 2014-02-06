/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var Header = require('./header');



var optionKeys = [
    'command',
];



var Telegram = Header.extend({

    command: 0,

    frameData: null,

    constructor: function(options) {
        Header.call(this, options);

        _.extend(this, _.pick(options, optionKeys));

        if (_.has(options, 'frameData') && _.has(options, 'dontCopyFrameData') && options.dontCopyFrameData) {
            this.frameData = options.frameData;
        } else {
            this.frameData = new Buffer(3 * 7);
            this.frameData.fill(0);

            if (_.has(options, 'frameData')) {
                var minLength = Math.min(this.frameData.length, options.frameData.length);
                options.frameData.copy(this.frameData, 0, 0, minLength);
            }
        }
    },

    toLiveBuffer: function(origBuffer, start, end) {
        var frameCount = this.getFrameCount();
        var length = 8 + frameCount * 9;

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
        buffer [5] = 0x30;
        buffer [6] = this.command & 0x7F;
        Telegram.calcAndSetChecksumV0(buffer, 1, 7);

        for (var i = 0; i < frameCount; i++) {
            var srcStart = 7 * i;
            var dstStart = 8 + 9 * i;
            Telegram.extractSeptett(this.frameData, srcStart, srcStart + 7, buffer, dstStart);
            Telegram.calcAndSetChecksumV0(buffer, dstStart, dstStart + 8);
        }

        return buffer;
    },

    getProtocolVersion: function() {
        return 0x30;
    },

    getId: function() {
        var baseId = Header.prototype.getId.call(this);
        return sprintf('%s_%02X', baseId, this.command);
    },

    compareTo: function(that) {
        var result = Header.prototype.compareTo.apply(this, arguments);
        if (result === 0) {
            result = this.command - that.command;
        }
        return result;
    },

    getFrameCount: function() {
        return Telegram.getFrameCountForCommand(this.command);
    },

}, {

    fromLiveBuffer: function(buffer, start, end) {
        var frameCount = this.getFrameCountForCommand(buffer [start + 6]);

        var frameData = new Buffer(3 * 7);
        frameData.fill(0);

        for (var i = 0; i < frameCount; i++) {
            var srcStart = start + 8 + 9 * i;
            var dstStart = 7 * i;
            Telegram.injectSeptett(buffer, srcStart, srcStart + 7, frameData, dstStart);
        }

        return new Telegram({
            destinationAddress: buffer.readUInt16LE(start + 1),
            sourceAddress: buffer.readUInt16LE(start + 3),
            command: buffer [start + 6],
            frameData: frameData,
            dontCopyFrameData: true
        });
    },

    getFrameCountForCommand: function(command) {
        return ((command >> 5) & 0x03);
    }

});



module.exports = Telegram;
