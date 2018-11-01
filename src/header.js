/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const sprintf = require('sprintf-js').sprintf;


const extend = require('./extend');
const _ = require('./lodash');



const optionKeys = [
    'timestamp',
    'channel',
    'destinationAddress',
    'sourceAddress',
];



const Header = extend(null, /** @lends Header# */ {

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
    constructor: function(options) {
        _.extend(this, _.pick(options, optionKeys));

        if (!this.timestamp) {
            this.timestamp = new Date();
        }
    },

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
    toLiveBuffer: function(/* buffer, start, end */) {
        throw new Error('Must be implemented by sub-class');
    },

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
    getProtocolVersion: function() {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Returns an info number about this Header instance. It can be used
     * for sorting purposes (to distinguish Header objects that would
     * otherwise compare as equal).
     *
     * @returns {number} Info value
     */
    getInfo: function() {
        return 0;
    },

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
    getId: function() {
        return sprintf('%02X_%04X_%04X_%02X', this.channel, this.destinationAddress, this.sourceAddress, this.getProtocolVersion());
    },

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
    compareTo: function(that) {
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
    },

}, /** @lends Header */ {

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
    fromLiveBuffer: function(/* buffer, start, end */) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Calculates the VBus checksum (according to version x.0 specification)
     * over a part of a Buffer instance.
     *
     * @param {Buffer} buffer Buffer to calc checksum for
     * @param {number} start Start index in the buffer
     * @param {number} end End index in the buffer
     * @returns {number} Calculated checksum
     */
    calcChecksumV0: function(buffer, start, end) {
        let checksum = 0;
        for (let index = start; index < end; index++) {
            checksum = (checksum + buffer [index]) & 0x7F;
        }
        checksum = (0x7F - checksum);
        return checksum;
    },

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
    calcAndCompareChecksumV0: function(buffer, start, end) {
        const checksum = this.calcChecksumV0(buffer, start, end);
        return (buffer [end] === checksum);
    },

    /**
     * Calculates the VBus checksum (according to version x.0 specification)
     * over a part of the Buffer instance and stores it at the `end` position.
     *
     * @param {Buffer} buffer Buffer to calc and store checksum for
     * @param {number} start Start index in the buffer
     * @param {number} end End index in the buffer
     * @returns {number} Calculated checksum
     */
    calcAndSetChecksumV0: function(buffer, start, end) {
        const checksum = this.calcChecksumV0(buffer, start, end);
        buffer [end] = checksum;
        return checksum;
    },

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
    injectSeptett: function(srcBuffer, srcStart, srcEnd, dstBuffer, dstStart) {
        let srcIndex = srcStart, dstIndex = dstStart, mask = 1, septett = srcBuffer [srcEnd];
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
    },

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
    extractSeptett: function(srcBuffer, srcStart, srcEnd, dstBuffer, dstStart) {
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

});



module.exports = Header;
