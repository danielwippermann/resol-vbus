/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var sprintf = require('sprintf-js').sprintf;


var Header = require('./header');
var _ = require('./lodash');



var optionKeys = [
    'command',
    'valueId',
    'value',
];



var Datagram = Header.extend(/** @lends Datagram# */ {

    /**
     * The command field of this VBus datagram. See the VBus Protocol Specification for details.
     * @type {number}
     */
    command: 0,

    /**
     * The value ID field of this VBus datagram.
     * @type {number}
     */
    valueId: 0,

    /**
     * The value field of this VBus datagram.
     * @type {number}
     */
    value: 0,

    /**
     * Creates a new Datagram instance and optionally initializes its members with the given values.
     *
     * @constructs
     * @augments Header
     * @param {object} options Initialization values for this instance's members
     * @param {number} options.command {@link Datagram#command}
     * @param {number} options.valueId {@link Datagram#valueId}
     * @param {Buffer} options.value {@link Datagram#value}
     * @see Header#constructor
     *
     * @classdesc
     * The Datagram sub-class provides access to all properties and methods applicable for VBus version 2 datagrams.
     * In addition to the packet header it may contain a command, a value ID and a value.
     * The value ID is a device-specific reference to one of the values presented in the device's menu interface.
     */
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

    getInfo: function() {
        var info;
        if (this.command === 0x0900) {
            info = this.valueId;
        } else {
            info = 0;
        }
        return info;
    },

    getId: function() {
        var baseId = Header.prototype.getId.call(this);
        var info = this.getInfo();
        return sprintf('%s_%04X_%04X', baseId, this.command, info);
    },

    compareTo: function(that) {
        var result = Header.prototype.compareTo.apply(this, arguments);
        if (result === 0) {
            result = this.command - that.command;
        }
        if (result === 0) {
            result = this.getInfo() - that.getInfo();
        }
        return result;
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
