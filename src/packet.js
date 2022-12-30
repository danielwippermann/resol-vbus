/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { sprintf } = require('sprintf-js');


const {
    applyDefaultOptions,
    hasOwnProperty,
} = require('./utils');


const Header = require('./header');



class Packet extends Header {

    /**
     * Creates a new Packet instance and optionally initializes its members with the given values.
     *
     * @constructs
     * @augments Header
     * @param {object} options Initialization values for this instance's members
     * @param {number} options.command {@link Packet#command}
     * @param {number} options.frameCount {@link Packet#frameCount}
     * @param {Buffer} options.frameData {@link Packet#frameData}
     * @see Header#constructor
     *
     * @classdesc
     * The Packet sub-class provides access to all properties and methods applicable for VBus version 1 packets.
     * In addition to the packet header it may contain up to 508 bytes of payload data.
     * The structure of the payload depends on the combination of destination and source addresses as well as
     * the command of the packet. The different payloads are described in further detail
     * in Chapter H of the VBus Protocol Specification and can be decoded using a Specification instance.
     *
     * @see Specification
     */
    constructor(options) {
        super(options);

        applyDefaultOptions(this, options, /** @lends Packet.prototype */ {

            /**
            * The command field of this VBus packet. See the VBus Protocol specification for details.
            * @type {number}
            */
            command: 0,

            /**
            * The number of frames of this VBus packet. Each frame can hold four bytes of payload.
            * @type {number}
            */
            frameCount: 0,

        });

        if (hasOwnProperty(options, 'frameData') && hasOwnProperty(options, 'dontCopyFrameData') && options.dontCopyFrameData) {
            this.frameData = options.frameData;
        } else {
            this.frameData = Buffer.alloc(127 * 4);
            this.frameData.fill(0);

            if (hasOwnProperty(options, 'frameData')) {
                const minLength = Math.min(this.frameData.length, options.frameData.length);
                options.frameData.copy(this.frameData, 0, 0, minLength);
            }
        }
    }

    toLiveBuffer(origBuffer, start, end) {
        const length = 10 + this.frameCount * 6;

        let buffer;
        if (origBuffer === undefined) {
            buffer = Buffer.alloc(length);
        } else if (start + length <= end) {
            buffer = origBuffer.slice(start, start + length);
        } else {
            throw new Error('Buffer too small');
        }

        buffer [0] = 0xAA;
        buffer.writeUInt16LE(this.destinationAddress & 0x7F7F, 1);
        buffer.writeUInt16LE(this.sourceAddress & 0x7F7F, 3);
        buffer [5] = this.getProtocolVersion();
        buffer.writeUInt16LE(this.command & 0x7F7F, 6);
        buffer [8] = this.frameCount & 0x7F;
        Packet.calcAndSetChecksum(this.minorVersion, buffer, 1, 9);

        for (let i = 0; i < this.frameCount; i++) {
            const srcStart = 4 * i;
            const dstStart = 10 + 6 * i;
            Packet.extractSeptett(this.frameData, srcStart, srcStart + 4, buffer, dstStart);
            Packet.calcAndSetChecksum(this.minorVersion, buffer, dstStart, dstStart + 5);
        }

        return buffer;
    }

    getProtocolVersion() {
        return 0x10 | this.minorVersion;
    }

    getId() {
        const baseId = Header.prototype.getId.call(this);
        return sprintf('%s_%04X', baseId, this.command);
    }

    compareTo(that) {
        let result = Header.prototype.compareTo.apply(this, arguments);
        if (result === 0) {
            result = this.command - that.command;
        }
        return result;
    }

    static fromLiveBuffer(buffer, start, end) {
        const frameCount = buffer [start + 8];

        const frameData = Buffer.alloc(127 * 4);
        frameData.fill(0);

        for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
            const sourceStart = start + 10 + frameIndex * 6;
            const targetStart = frameIndex * 4;
            Packet.injectSeptett(buffer, sourceStart, sourceStart + 4, frameData, targetStart);
        }

        return new Packet({
            destinationAddress: buffer.readUInt16LE(start + 1),
            sourceAddress: buffer.readUInt16LE(start + 3),
            command: buffer.readUInt16LE(start + 6),
            frameCount,
            frameData,
            dontCopyFrameData: true
        });
    }

}


Object.assign(Packet.prototype, /** @lends Packet.prototype */ {

    /**
     * The command field of this VBus packet. See the VBus Protocol specification for details.
     * @type {number}
     */
    command: 0,

    /**
     * The number of frames of this VBus packet. Each frame can hold four bytes of payload.
     * @type {number}
     */
    frameCount: 0,

    /**
     * The buffer containing the frame data of this VBus packet.
     */
    frameData: null,

});



module.exports = Packet;
