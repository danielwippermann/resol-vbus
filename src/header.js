/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { sprintf } = require('sprintf-js');


const { applyDefaultOptions } = require('./utils');



const crc7Table = [
    0x00, 0x09, 0x12, 0x1b, 0x24, 0x2d, 0x36, 0x3f,
    0x48, 0x41, 0x5a, 0x53, 0x6c, 0x65, 0x7e, 0x77,
    0x19, 0x10, 0x0b, 0x02, 0x3d, 0x34, 0x2f, 0x26,
    0x51, 0x58, 0x43, 0x4a, 0x75, 0x7c, 0x67, 0x6e,
    0x32, 0x3b, 0x20, 0x29, 0x16, 0x1f, 0x04, 0x0d,
    0x7a, 0x73, 0x68, 0x61, 0x5e, 0x57, 0x4c, 0x45,
    0x2b, 0x22, 0x39, 0x30, 0x0f, 0x06, 0x1d, 0x14,
    0x63, 0x6a, 0x71, 0x78, 0x47, 0x4e, 0x55, 0x5c,
    0x64, 0x6d, 0x76, 0x7f, 0x40, 0x49, 0x52, 0x5b,
    0x2c, 0x25, 0x3e, 0x37, 0x08, 0x01, 0x1a, 0x13,
    0x7d, 0x74, 0x6f, 0x66, 0x59, 0x50, 0x4b, 0x42,
    0x35, 0x3c, 0x27, 0x2e, 0x11, 0x18, 0x03, 0x0a,
    0x56, 0x5f, 0x44, 0x4d, 0x72, 0x7b, 0x60, 0x69,
    0x1e, 0x17, 0x0c, 0x05, 0x3a, 0x33, 0x28, 0x21,
    0x4f, 0x46, 0x5d, 0x54, 0x6b, 0x62, 0x79, 0x70,
    0x07, 0x0e, 0x15, 0x1c, 0x23, 0x2a, 0x31, 0x38,
    0x41, 0x48, 0x53, 0x5a, 0x65, 0x6c, 0x77, 0x7e,
    0x09, 0x00, 0x1b, 0x12, 0x2d, 0x24, 0x3f, 0x36,
    0x58, 0x51, 0x4a, 0x43, 0x7c, 0x75, 0x6e, 0x67,
    0x10, 0x19, 0x02, 0x0b, 0x34, 0x3d, 0x26, 0x2f,
    0x73, 0x7a, 0x61, 0x68, 0x57, 0x5e, 0x45, 0x4c,
    0x3b, 0x32, 0x29, 0x20, 0x1f, 0x16, 0x0d, 0x04,
    0x6a, 0x63, 0x78, 0x71, 0x4e, 0x47, 0x5c, 0x55,
    0x22, 0x2b, 0x30, 0x39, 0x06, 0x0f, 0x14, 0x1d,
    0x25, 0x2c, 0x37, 0x3e, 0x01, 0x08, 0x13, 0x1a,
    0x6d, 0x64, 0x7f, 0x76, 0x49, 0x40, 0x5b, 0x52,
    0x3c, 0x35, 0x2e, 0x27, 0x18, 0x11, 0x0a, 0x03,
    0x74, 0x7d, 0x66, 0x6f, 0x50, 0x59, 0x42, 0x4b,
    0x17, 0x1e, 0x05, 0x0c, 0x33, 0x3a, 0x21, 0x28,
    0x5f, 0x56, 0x4d, 0x44, 0x7b, 0x72, 0x69, 0x60,
    0x0e, 0x07, 0x1c, 0x15, 0x2a, 0x23, 0x38, 0x31,
    0x46, 0x4f, 0x54, 0x5d, 0x62, 0x6b, 0x70, 0x79
];


class Header {

    /**
     * Creates a new Header instance and optionally initializes its members
     * with the given values
     *
     * @constructs
     * @param {object} [options] Initialization values for this instance's members
     * @param {Date} [options.timestamp] {@link Header#timestamp}
     * @param {number} [options.channel] {@link Header#channel}
     * @param {number} [options.destinationAddress] {@link Header#destinationAddress}
     * @param {number} [options.sourceAddress] {@link Header#sourceAddress}
     *
     * @classdesc
     * All VBus models are sub-classes of this Header class. The Header class provides
     * a generic interface and the common properties that all (currently three)
     * different types of VBus models can use.
     *
     * Header instances can either be created by calling the constructor function or
     * by passing a Buffer object containing the binary VBus data to the class method
     * `HeaderSubClass.fromLiveBuffer`.
     *
     * @see Packet
     * @see Datagram
     * @see Telegram
     */
    constructor(options) {
        applyDefaultOptions(this, options, /** @lends Header.prototype */ {

            /**
            * Timestamp of this header
            * @type {Date}
            * @default now
            */
            timestamp: null,

            /**
            * VBus channel of this header
            * @type {number}
            * @default 0
            */
            channel: 0,

            /**
            * VBus address of this header's destination
            * @type {number}
            * @default 0
            */
            destinationAddress: 0,

            /**
            * VBus address of this header's source
            * @type {number}
            * @default
            */
            sourceAddress: 0,

        });

        this.minorVersion = (options && options.minorVersion) || 0;

        if (!this.timestamp) {
            this.timestamp = new Date();
        }
    }

    /**
     * Creates a representation of this Header instance that can be
     * transmitted over a Connection. If no buffer is given as an
     * arguments, it creates a new one that is big enough to hold
     * the representation.
     *
     * Must be implemented by sub-class.
     *
     * @abstract
     * @param {Buffer} [buffer] Buffer object to store data in
     * @param {number} [start] Start index in the buffer
     * @param {number} [end] End index in the buffer
     * @returns {Buffer} Buffer object containing the data
     */
    toLiveBuffer(/* buffer, start, end */) {
        throw new Error('Must be implemented by sub-class');
    }

    /**
     * Returns the protocol version of this Header instance as a 8-bit
     * number. The high nibble is used for the major version, the low
     * nibble for the minor version. For example: a header with protocol
     * version 2.0 would return `0x20`.
     *
     * Must be implemented by sub-class.
     *
     * @abstract
     * @returns {number} Protocol version
     */
    getProtocolVersion() {
        throw new Error('Must be implemented by sub-class');
    }

    /**
     * Returns an info number about this Header instance. It can be used
     * for sorting purposes (to distinguish Header objects that would
     * otherwise compare as equal).
     *
     * @returns {number} Info value
     */
    getInfo() {
        return 0;
    }

    /**
     * Returns a string identifier describing this Header instance.
     * It contains at least:
     *
     *   - channel
     *   - destination address
     *   - source address
     *   - protocol version
     *
     * Sub-classes can extend that information. The structure of this
     * identifier is implementation specific, do not rely on it!
     *
     * @returns {string} Identifier
     */
    getId() {
        return sprintf('%02X_%04X_%04X_%02X', this.channel, this.destinationAddress, this.sourceAddress, this.getProtocolVersion());
    }

    /**
     * Compares this Header instance to another one.
     *
     * Sub-classes can extend the comparison to include specific
     * information.
     *
     * @param {Header} that Another Header instance to compare to.
     * @returns {number} Returns a number
     *
     *   - less than 0 if `this < that`
     *   - greater than 0 if `this > that`
     *   - equal to to if `this == that`
     */
    compareTo(that) {
        let result = this.channel - that.channel;
        if (result === 0) {
            result = this.destinationAddress - that.destinationAddress;
        }
        if (result === 0) {
            result = this.sourceAddress - that.sourceAddress;
        }
        if (result === 0) {
            result = this.getProtocolVersion() - that.getProtocolVersion();
        }
        return result;
    }

    /**
     * Creates a Header instance from a representation that was
     * received over a Connection.
     *
     * Must be implemented by sub-class.
     *
     * @abstract
     * @param {Buffer} buffer Buffer that contains the representation
     * @param {number} start Start index in the buffer
     * @param {number} end End index in the buffer
     * @returns {Header} Header instance created from the representation
     */
    static fromLiveBuffer(/* buffer, start, end */) {
        throw new Error('Must be implemented by sub-class');
    }

    /**
     * Calculates the VBus checksum (according to version x.0 specification)
     * over a part of a Buffer instance.
     *
     * @param {Buffer} buffer Buffer to calc checksum for
     * @param {number} start Start index in the buffer
     * @param {number} end End index in the buffer
     * @returns {number} Calculated checksum
     */
    static calcChecksumV0(buffer, start, end) {
        let checksum = 0;
        for (let index = start; index < end; index++) {
            checksum = (checksum + buffer [index]) & 0x7F;
        }
        checksum = (0x7F - checksum);
        return checksum;
    }

    /**
     * Calculates the VBus checksum (according to version x.0 specification)
     * over a part of a Buffer instance and compares it the checksum byte
     * stored at the `end` position.
     *
     * @param {Buffer} buffer Buffer to calc and compare checksum for
     * @param {number} start Start index in the buffer
     * @param {number} end End index in the buffer
     * @returns {boolean} Result whether calculated and stored checksum match
     */
    static calcAndCompareChecksumV0(buffer, start, end) {
        const checksum = this.calcChecksumV0(buffer, start, end);
        return (buffer [end] === checksum);
    }

    /**
     * Calculates the VBus checksum (according to version x.0 specification)
     * over a part of the Buffer instance and stores it at the `end` position.
     *
     * @param {Buffer} buffer Buffer to calc and store checksum for
     * @param {number} start Start index in the buffer
     * @param {number} end End index in the buffer
     * @returns {number} Calculated checksum
     */
    static calcAndSetChecksumV0(buffer, start, end) {
        const checksum = this.calcChecksumV0(buffer, start, end);
        buffer [end] = checksum;
        return checksum;
    }

    static calcChecksumV1(buffer, start, end) {
        let crc = 0x00;
        for (let index = start; index < end; index++) {
            crc = crc7Table [(crc << 1) ^ buffer [index]];
        }
        return crc;
    }

    static calcChecksum(version, buffer, start, end) {
        const minorVersion = (version & 0x0F);
        let crc;
        if (minorVersion === 0x00) {
            crc = this.calcChecksumV0(buffer, start, end);
        } else if (minorVersion === 0x01) {
            crc = this.calcChecksumV1(buffer, start, end);
        } else {
            throw new Error(`Unexpected minor version ${minorVersion}`);
        }
        return crc;
    }

    static calcAndCompareChecksum(version, buffer, start, end) {
        const checksum = this.calcChecksum(version, buffer, start, end);
        return (buffer [end] === checksum);
    }

    static calcAndSetChecksum(version, buffer, start, end) {
        const checksum = this.calcChecksum(version, buffer, start, end);
        buffer [end] = checksum;
        return checksum;
    }

    /**
     * Copies a part of the source Buffer instance to the destination Buffer
     * instance, injecting the MSBs stored in the septett byte during the process.
     *
     * @param {Buffer} srcBuffer Buffer to copy from
     * @param {number} srcStart Start index in the source buffer
     * @param {number} srcEnd End index in the source buffer
     * @param {Buffer} dstBuffer Buffer to copy to
     * @param {number} dstStart Start index in the destination buffer
     */
    static injectSeptett(srcBuffer, srcStart, srcEnd, dstBuffer, dstStart) {
        const septett = srcBuffer [srcEnd];
        let srcIndex = srcStart, dstIndex = dstStart, mask = 1;
        while (srcIndex < srcEnd) {
            let b = srcBuffer [srcIndex];
            if (septett & mask) {
                b |= 0x80;
            }
            dstBuffer [dstIndex] = b;

            srcIndex++;
            dstIndex++;
            mask = mask << 1;
        }
    }

    /**
     * Copies a part of the source Buffer instance to the destination Buffer
     * instance, extracting the MSBs during the process and storing the septett
     * byte to the destination buffer's end position.
     *
     * @param {Buffer} srcBuffer Buffer to copy from
     * @param {number} srcStart Start index in the source buffer
     * @param {number} srcEnd End index in the source buffer
     * @param {Buffer} dstBuffer Buffer to copy to
     * @param {number} dstStart Start index in the destination buffer
     */
    static extractSeptett(srcBuffer, srcStart, srcEnd, dstBuffer, dstStart) {
        let srcIndex = srcStart, dstIndex = dstStart, mask = 1, septett = 0;
        while (srcIndex < srcEnd) {
            let b = srcBuffer [srcIndex];
            if (b & 0x80) {
                b &= 0x7F;
                septett |= mask;
            }
            dstBuffer [dstIndex] = b;

            srcIndex++;
            dstIndex++;
            mask = mask << 1;
        }

        dstBuffer [dstIndex] = septett;
    }

}


Object.assign(Header.prototype, /** @lends Header.prototype */ {

    /**
     * Timestamp of this header
     * @type {Date}
     * @default now
     */
    timestamp: null,

    /**
     * VBus channel of this header
     * @type {number}
     * @default 0
     */
    channel: 0,

    /**
     * VBus address of this header's destination
     * @type {number}
     * @default 0
     */
    destinationAddress: 0,

    /**
     * VBus address of this header's source
     * @type {number}
     * @default
     */
    sourceAddress: 0,

});



module.exports = Header;
