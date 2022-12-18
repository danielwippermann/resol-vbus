/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const { sprintf } = require('sprintf-js');


const Header = require('./header');
const {
    applyDefaultOptions,
    hasOwnProperty,
} = require('./utils');



class Telegram extends Header {

    /**
     * Creates a new Telegram instance.
     *
     * @constructs
     * @augments Header
     * @param {object} options Initialization options.
     */
    constructor(options) {
        super(options);

        applyDefaultOptions(this, options, /** @lends Telegram.prototype */ {

            /**
            * The VBus command of this Telegram instance.
            * @type {number}
            */
            command: 0,

        });

        if (hasOwnProperty(options, 'frameData') && hasOwnProperty(options, 'dontCopyFrameData') && options.dontCopyFrameData) {
            this.frameData = options.frameData;
        } else {
            this.frameData = Buffer.alloc(3 * 7);
            this.frameData.fill(0);

            if (hasOwnProperty(options, 'frameData')) {
                const minLength = Math.min(this.frameData.length, options.frameData.length);
                options.frameData.copy(this.frameData, 0, 0, minLength);
            }
        }
    }

    toLiveBuffer(origBuffer, start, end) {
        const frameCount = this.getFrameCount();
        const length = 8 + frameCount * 9;

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
        buffer [6] = this.command & 0x7F;
        Telegram.calcAndSetChecksum(this.minorVersion, buffer, 1, 7);

        for (let i = 0; i < frameCount; i++) {
            const srcStart = 7 * i;
            const dstStart = 8 + 9 * i;
            Telegram.extractSeptett(this.frameData, srcStart, srcStart + 7, buffer, dstStart);
            Telegram.calcAndSetChecksum(this.minorVersion, buffer, dstStart, dstStart + 8);
        }

        return buffer;
    }

    getProtocolVersion() {
        return 0x30 | this.minorVersion;
    }

    getId() {
        const baseId = Header.prototype.getId.call(this);
        return sprintf('%s_%02X', baseId, this.command);
    }

    compareTo(that) {
        let result = Header.prototype.compareTo.apply(this, arguments);
        if (result === 0) {
            result = this.command - that.command;
        }
        return result;
    }

    getFrameCount() {
        return Telegram.getFrameCountForCommand(this.command);
    }

    static fromLiveBuffer(buffer, start, end) {
        const frameCount = this.getFrameCountForCommand(buffer [start + 6]);

        const frameData = Buffer.alloc(3 * 7);
        frameData.fill(0);

        for (let i = 0; i < frameCount; i++) {
            const srcStart = start + 8 + 9 * i;
            const dstStart = 7 * i;
            Telegram.injectSeptett(buffer, srcStart, srcStart + 7, frameData, dstStart);
        }

        return new Telegram({
            destinationAddress: buffer.readUInt16LE(start + 1),
            sourceAddress: buffer.readUInt16LE(start + 3),
            command: buffer [start + 6],
            frameData,
            dontCopyFrameData: true
        });
    }

    static getFrameCountForCommand(command) {
        return ((command >> 5) & 0x03);
    }

}


Object.assign(Telegram.prototype, /** @lends Telegram.prototype */ {
    /**
     * The VBus command of this Telegram instance.
     * @type {number}
     */
    command: 0,

    frameData: null,

});



module.exports = Telegram;
