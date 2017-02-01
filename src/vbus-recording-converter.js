/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var moreints = require('buffer-more-ints');


var HeaderSet = require('./header-set');
var Packet = require('./packet');

var Converter = require('./converter');



var optionKeys = [
    'topologyScanOnly',
];



var VBusRecordingConverter = Converter.extend(/** @lends VBusRecordingConverter# */ {

    topologyScanOnly: false,

    rxBuffer: null,

    headerSet: null,

    headerSetTimestamp: null,

    currentChannel: 0,

    knownHeaderIds: null,

    /**
     * Creates a new VBusRecordingConverter instance.
     *
     * @constructs
     * @augments Converter
     *
     * @classdesc
     * This Converter subclass converts Header and HeaderSet instances to and from a binary stream that
     * conforms to the VBus Recording File Format (the binary file format used e.g. to store data on the
     * Datalogger devices).
     */
    constructor: function(options) {
        Converter.call(this, options);

        _.extend(this, _.pick(options, optionKeys));

        this.knownHeaderIds = {};
    },

    reset: function() {
        this.rxBuffer = null;
    },

    end: function() {
        var _this = this;

        if (this.objectMode) {
            // nop
        } else if (this.topologyScanOnly) {
            this._processBuffer(new Buffer(0), true, function(record) {
                _this._processRecordForTopologyScan(record);
            });

            this._constructTopologyHeaderSet();
        } else {
            this._processBuffer(new Buffer(0), true, function(record) {
                _this._processRecord(record);
            });
        }

        this._emitHeaderSet();

        return Converter.prototype.end.apply(this, arguments);
    },

    convertRawData: function(rawData) {
        if (this.objectMode) {
            return Converter.prototype.convertRawData.apply(this, arguments);
        } else {
            var buffers = [];

            var createBuffer = function(type, length, timestamp) {
                var buffer = new Buffer(length);
                buffer.fill(0);

                buffer [0] = 0xA5;
                buffer [1] = (type & 0x0F) | ((type & 0x0F) << 4);
                buffer.writeUInt16LE(length, 2);
                buffer.writeUInt16LE(length, 4);
                moreints.writeUInt64LE(buffer, timestamp.getTime(), 6);

                return buffer;
            };

            var buffer;
            if (rawData.channel !== this.currentChannel) {
                buffer = createBuffer(7, 16, new Date(0));
                buffer.writeUInt16LE(rawData.channel, 14);
                buffers.push(buffer);

                this.currentChannel = rawData.channel;
            }

            buffer = createBuffer(8, 22 + rawData.buffer.length, rawData.startTimestamp);
            moreints.writeUInt64LE(buffer, rawData.endTimestamp.getTime(), 14);
            rawData.buffer.copy(buffer, 22, 0, rawData.buffer.length);
            buffers.push(buffer);

            buffer = Buffer.concat(buffers);
            return this.push(buffer);
        }
    },

    convertHeader: function(header) {
        if (this.objectMode) {
            return Converter.prototype.convertHeader.apply(this, arguments);
        } else {
            return this._convertHeaders(header.timestamp, [ header ]);
        }
    },

    convertHeaderSet: function(headerSet) {
        if (this.objectMode) {
            return Converter.prototype.convertHeaderSet.apply(this, arguments);
        } else {
            return this._convertHeaders(headerSet.timestamp, headerSet.getSortedHeaders());
        }
    },

    _convertHeaders: function(timestamp, headers) {
        var buffers = [];

        var createBuffer = function(type, length, timestamp) {
            var buffer = new Buffer(length);
            buffer.fill(0);

            buffer [0] = 0xA5;
            buffer [1] = (type & 0x0F) | ((type & 0x0F) << 4);
            buffer.writeUInt16LE(length, 2);
            buffer.writeUInt16LE(length, 4);
            moreints.writeUInt64LE(buffer, timestamp.getTime(), 6);

            return buffer;
        };

        var buffer = createBuffer(4, 14, timestamp);
        buffers.push(buffer);

        var currentChannel = 0;

        _.forEach(headers, function(header) {
            var majorVersion = header.getProtocolVersion() >> 4;

            var dataLength;
            if (majorVersion === 1) {
                dataLength = header.frameCount * 4;
            } else {
                dataLength = -1;
            }

            if (dataLength >= 0) {
                var buffer;

                if (currentChannel !== header.channel) {
                    currentChannel = header.channel;

                    buffer = createBuffer(7, 16, new Date(0));
                    buffer.writeUInt16LE(header.channel, 14);
                    buffers.push(buffer);
                }

                buffer = createBuffer(6, 26 + dataLength, header.timestamp);

                buffer.writeUInt16LE(header.destinationAddress, 14);
                buffer.writeUInt16LE(header.sourceAddress, 16);
                buffer.writeUInt16LE(header.getProtocolVersion(), 18);

                if (majorVersion === 1) {
                    buffer.writeUInt16LE(header.command, 20);
                    buffer.writeUInt16LE(dataLength, 22);
                    buffer.writeUInt16LE(0, 24);

                    header.frameData.copy(buffer, 26, 0, dataLength);
                }

                buffers.push(buffer);
            }
        });

        buffer = Buffer.concat(buffers);
        return this.push(buffer);
    },

    _read: function() {
        // nop
    },

    _write: function(chunk, encoding, callback) {
        var _this = this;

        if (this.objectMode) {
            return Converter.prototype._write.apply(this, arguments);
        } else if (this.topologyScanOnly) {
            this._processBuffer(chunk, false, function(record) {
                _this._processRecordForTopologyScan(record);
            });
            callback();
        } else {
            this._processBuffer(chunk, false, function(record) {
                _this._processRecord(record);
            });
            callback();
        }
    },

    _processBuffer: function(chunk, endOfStream, processRecord) {
        var buffer;
        if (this.rxBuffer) {
            buffer = Buffer.concat([ this.rxBuffer, chunk ]);
        } else {
            buffer = chunk;
        }

        var getRecordLength = function(index) {
            var length;
            if (index > buffer.length - 6) {
                length = -1;
            } else if (buffer [index] !== 0xA5) {
                length = 0;
            } else if ((buffer [index + 1] >> 4) !== (buffer [index + 1] & 15)) {
                length = 0;
            } else if (buffer [index + 2] !== buffer [index + 4]) {
                length = 0;
            } else if (buffer [index + 3] !== buffer [index + 5]) {
                length = 0;
            } else {
                length = buffer.readUInt16LE(index + 2);

                if ((index + length) > buffer.length) {
                    length = -1;
                }
            }
            return length;
        };

        var currentIndex = 0, currentLength = getRecordLength(0), nextIndex, nextLength, start = 0;
        while ((currentLength >= 0) && (currentIndex < buffer.length)) {
            if (currentLength > 0) {
                nextIndex = currentIndex + currentLength;
            } else {
                nextIndex = currentIndex + 1;
            }

            nextLength = getRecordLength(nextIndex);

            if ((nextLength < 0) && !endOfStream) {
                break;
            }

            if ((currentLength > 0) && ((nextLength > 0) || (nextIndex === buffer.length))) {
                var record = buffer.slice(currentIndex, nextIndex);

                processRecord(record);

                start = nextIndex;
            } else if (nextIndex !== (currentIndex + 1)) {
                nextIndex = currentIndex + 1;
                nextLength = getRecordLength(nextIndex);

                if (nextLength < 0) {
                    break;
                }
            }

            currentIndex = nextIndex;
            currentLength = nextLength;
        }

        var maxLength = 65536;
        if (buffer.length - start >= maxLength) {
            start = buffer.length - maxLength;
        }

        if (start < buffer.length) {
            this.rxBuffer = new Buffer(buffer.slice(start));
        } else {
            this.rxBuffer = null;
        }
    },

    _processRecord: function(buffer) {
        var type = buffer [1] & 0x0F;
        var timestamp = moreints.readUInt64LE(buffer, 6);

        if (type === 3) {
            this._processType3Record(buffer, timestamp);
        } else if (type === 4) {
            this._emitHeaderSet();

            this.headerSet = new HeaderSet();

            this.headerSetTimestamp = new Date(timestamp);

            this.currentChannel = 0;
        } else if ((type === 6) && (buffer.length >= 20)) {
            var destinationAddress = buffer.readUInt16LE(14);
            var sourceAddress = buffer.readUInt16LE(16);
            var protocolVersion = buffer.readUInt16LE(18);

            var majorVersion = protocolVersion >> 4;
            if ((majorVersion === 1) && (buffer.length >= 26)) {
                var command = buffer.readUInt16LE(20);
                var dataLength = buffer.readUInt16LE(22);

                if (buffer.length >= 26 + dataLength) {
                    var frameCount = Math.floor(dataLength / 4);

                    var frameData = new Buffer(127 * 4);
                    buffer.copy(frameData, 0, 26, 26 + dataLength);

                    var header = new Packet({
                        timestamp: new Date(timestamp),
                        channel: this.currentChannel,
                        destinationAddress: destinationAddress,
                        sourceAddress: sourceAddress,
                        command: command,
                        frameCount: frameCount,
                        frameData: frameData,
                        dontCopyFrameData: true,
                    });

                    if (this.headerSet) {
                        this.headerSet.addHeader(header);
                    }

                    this.emit('header', header);
                }
            }
        } else if ((type === 7) && (buffer.length >= 16)) {
            this.currentChannel = buffer [14];
        } else if ((type === 8) && (buffer.length >= 22)) {
            var endTimestamp = moreints.readUInt64LE(buffer, 14);
            var rawBuffer = new Buffer(buffer.length - 22);
            buffer.copy(rawBuffer, 0, 22, buffer.length);

            this.emit('rawData', {
                startTimestamp: new Date(timestamp),
                endTimestamp: new Date(endTimestamp),
                channel: this.currentChannel,
                buffer: rawBuffer,
            });
        }
    },

    _processType3Record: function(buffer, timestamp) {
        var destinationAddress = buffer.readUInt16LE(14);
        var sourceAddress = buffer.readUInt16LE(16);
        var protocolVersion = buffer.readUInt16LE(18);

        var majorVersion = protocolVersion >> 4;
        if ((majorVersion === 1) && (buffer.length >= 26)) {
            var command = buffer.readUInt16LE(20);
            var dataLength = buffer.readUInt16LE(22);

            if (buffer.length >= 26 + dataLength) {
                var frameCount = Math.floor(dataLength / 4);

                var frameData = new Buffer(127 * 4);
                buffer.copy(frameData, 0, 26, 26 + dataLength);

                var header = new Packet({
                    timestamp: new Date(timestamp),
                    channel: this.currentChannel,
                    destinationAddress: destinationAddress,
                    sourceAddress: sourceAddress,
                    command: command,
                    frameCount: frameCount,
                    frameData: frameData,
                    dontCopyFrameData: true,
                });

                if (destinationAddress === 0x0010) {
                    this._emitHeaderSet();
                } else if (this.headerSet && this.headerSet.containsHeader(header)) {
                    this._emitHeaderSet();
                }

                if (!this.headerSet) {
                    this.headerSet = new HeaderSet();

                    this.headerSet.timestamp = header.timestamp;
                }

                this.headerSet.addHeader(header);

                this.emit('header', header);
            }
        }
    },

    _emitHeaderSet: function() {
        if (this.headerSet) {
            if (this.headerSetTimestamp) {
                this.headerSet.timestamp = this.headerSetTimestamp;
            }

            this.emit('headerSet', this.headerSet);

            this.headerSet = null;
        }
    },

    _processRecordForTopologyScan: function(buffer) {
        var type = buffer [1] & 0x0F;

        var destinationAddress = 0, sourceAddress = 0, protocolVersion = 0, command = 0, hasHeader = false;
        if (((type === 3) || (type === 6)) && (buffer.length >= 20)) {
            destinationAddress = buffer.readUInt16LE(14);
            sourceAddress = buffer.readUInt16LE(16);
            protocolVersion = buffer.readUInt16LE(18);

            var majorVersion = protocolVersion >> 4;
            if ((majorVersion === 1) && (buffer.length >= 26)) {
                command = buffer.readUInt16LE(20);
                hasHeader = true;
            }
        } else if (type === 4) {
            this.currentChannel = 0;
        } else if ((type === 7) && (buffer.length >= 16)) {
            this.currentChannel = buffer [14];
        } else if ((type === 8) && (buffer.length >= 22)) {
            var startTimestamp = moreints.readUInt64LE(buffer, 6);
            var endTimestamp = moreints.readUInt64LE(buffer, 14);
            var rawBuffer = new Buffer(buffer.length - 22);
            buffer.copy(rawBuffer, 0, 22, buffer.length);

            this.emit('rawData', {
                startTimestamp: new Date(startTimestamp),
                endTimestamp: new Date(endTimestamp),
                channel: this.currentChannel,
                buffer: rawBuffer,
            });
        }

        if (hasHeader) {
            var headerIdBuffer = new Buffer(8);
            headerIdBuffer [0] = this.currentChannel;
            headerIdBuffer.writeUInt16LE(destinationAddress, 1);
            headerIdBuffer.writeUInt16LE(sourceAddress, 3);
            headerIdBuffer [5] = protocolVersion;
            headerIdBuffer.writeUInt16LE(command, 6);

            var headerId = headerIdBuffer.toString('hex');

            this.knownHeaderIds [headerId] = true;
        }
    },

    _constructTopologyHeaderSet: function() {
        var headerSet = new HeaderSet();

        var timestamp = new Date(0);

        _.forEach(_.keys(this.knownHeaderIds), function(headerId) {
            var headerIdBuffer = new Buffer(headerId, 'hex');

            var channel = headerIdBuffer [0];
            var destinationAddress = headerIdBuffer.readUInt16LE(1);
            var sourceAddress = headerIdBuffer.readUInt16LE(3);
            var protocolVersion = headerIdBuffer [5];
            var command = headerIdBuffer.readUInt16LE(6);

            var majorVersion = (protocolVersion >> 4);
            if (majorVersion === 1) {
                var packet = new Packet({
                    timestamp: timestamp,
                    channel: channel,
                    destinationAddress: destinationAddress,
                    sourceAddress: sourceAddress,
                    command: command,
                    frameCount: 0,
                });

                headerSet.addHeader(packet);
            } else {
                throw new Error('Unsupported major version');
            }
        });

        headerSet.timestamp = timestamp;

        this.headerSet = headerSet;
    },

});



module.exports = VBusRecordingConverter;
