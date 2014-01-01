/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var extend = require('./extend');



var optionKeys = [
    'timestamp',
    'channel',
    'destinationAddress',
    'sourceAddress',
];



var Header = extend(null, {

    timestamp: null,

    channel: 0,
    
    destinationAddress: 0,

    sourceAddress: 0,

    constructor: function(options) {
        _.extend(this, _.pick(options, optionKeys));

        if (!this.timestamp) {
            this.timestamp = new Date();
        }
    },

    toLiveBuffer: function() {
        throw new Error('Must be implemented by sub-class');
    },

    getProtocolVersion: function() {
        throw new Error('Must be implemented by sub-class');
    },

    getInfo: function() {
        return 0;
    },

    getId: function() {
        return sprintf('%02X_%04X_%04X_%02X', this.channel, this.destinationAddress, this.sourceAddress, this.getProtocolVersion());
    },

    compareTo: function(that) {
        var result = this.channel - that.channel;
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

}, {

    fromLiveBuffer: function() {
        throw new Error('Must be implemented by sub-class');
    },
    
    calcChecksumV0: function(buffer, start, end) {
        var checksum = 0;
        for (var index = start; index < end; index++) {
            checksum = (checksum + buffer [index]) & 0x7F;
        }
        checksum = (0x7F - checksum);
        return checksum;
    },

    calcAndCompareChecksumV0: function(buffer, start, end) {
        var checksum = this.calcChecksumV0(buffer, start, end);
        return (buffer [end] === checksum);
    },

    calcAndSetChecksumV0: function(buffer, start, end) {
        var checksum = this.calcChecksumV0(buffer, start, end);
        buffer [end] = checksum;
        return checksum;
    },

    injectSeptett: function(srcBuffer, srcStart, srcEnd, dstBuffer, dstStart) {
        var srcIndex = srcStart, dstIndex = dstStart, mask = 1, septett = srcBuffer [srcEnd];
        while (srcIndex < srcEnd) {
            var b = srcBuffer [srcIndex];
            if (septett & mask) {
                b |= 0x80;
            }
            dstBuffer [dstIndex] = b;

            srcIndex++;
            dstIndex++;
            mask = mask << 1;
        }
    },

    extractSeptett: function(srcBuffer, srcStart, srcEnd, dstBuffer, dstStart) {
        var srcIndex = srcStart, dstIndex = dstStart, mask = 1, septett = 0;
        while (srcIndex < srcEnd) {
            var b = srcBuffer [srcIndex];
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
