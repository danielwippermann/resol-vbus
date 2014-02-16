/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;
var Duplex = require('stream').Duplex;


var _ = require('lodash');
var Q = require('q');


var extend = require('./extend');

var Header = require('./header');
var Packet = require('./packet');
var Datagram = require('./datagram');
var Telegram = require('./telegram');
var utils = require('./utils');



var states = _.reduce([
    'DISCONNECTED',
    'CONNECTING',
    'CONNECTED',
    'INTERRUPTED',
    'RECONNECTING',
    'DISCONNECTING',
], function(memo, state) {
    memo ['STATE_' + state] = state;
    return memo;
}, {});



var optionKeys = [
    'channel',
    'selfAddress',
];



var Connection = extend(Duplex, /** @lends Connection# */ {

    /**
     * Creates a new Connection instance and optionally initializes its member with the given values.
     *
     * @constructs
     * @augments Duplex
     * @param {object} options Initialization values for this instance's members
     * @param {number} options.channel {@link Connection#channel}
     * @param {number} options.selfAddress {@link Connection#selfAddress}
     */
    constructor: function(options) {
        Duplex.call(this);

        _.extend(this, _.pick(options, optionKeys));
    },

    /**
     * Reference to this instance's DataSource.
     * @type {DataSource}
     */
    dataSource: null,

    /**
     * The VBus channel that this connection is established to.
     * @type {number}
     */
    channel: 0,

    /**
     * The VBus address used for sending information over this connection.
     * @type {number}
     */
    selfAddress: 0x0020,

    /**
     * The current connection state.
     * @type {string}
     */
    connectionState: states.STATE_DISCONNECTED,

    /**
     * The internal receive buffer of this conneciton.
     * @type {Buffer}
     */
    rxBuffer: null,

    /**
     * Establish connection.
     * @abstract
     * @returns {Promise} A promise that resolves once the connection has been established.
     */
    connect: function() {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Diconnect this instance.
     * @abstract
     */
    disconnect: function() {
        throw new Error('Must be implemented by sub-class');
    },

    _write: function(chunk, encoding, callback) {
        var _this = this;

        if (EventEmitter.listenerCount(this, 'rawData') > 0) {
            this.emit('rawData', chunk);
        }

        var buffer;
        if (this.rxBuffer) {
            buffer = Buffer.concat([ this.rxBuffer, chunk ]);
        } else {
            buffer = chunk;
        }

        var reportJunk = function(index) {
            if (index > processed) {
                if (EventEmitter.listenerCount(_this, 'junkData') > 0) {
                    var junkData = buffer.slice(processed, index);
                    _this.emit('junkData', junkData);
                }
            }
        };

        // console.log('_write (start):', this.rxBuffer, chunk);

        var index = 0, start = null, processed = 0;
        while (index < buffer.length) {
            var b = buffer [index] & 255;
            if (b === 0xAA) {
                reportJunk(index);

                start = index;
                processed = index;
            } else if (b >= 0x80) {
                start = null;
            } else if (start === null) {
                // skip junk
            } else if (index >= start + 5) {
                var version = buffer [start + 5] & 255;
                var majorVersion = version >> 4;
                var length;
                if (majorVersion === 1) {
                    if (index >= start + 8) {
                        length = 10 + buffer [start + 8] * 6;
                    } else {
                        length = 10;
                    }
                } else if (majorVersion === 2) {
                    length = 16;
                } else if (majorVersion === 3) {
                    if (index >= start + 6) {
                        length = 8 + Telegram.getFrameCountForCommand(buffer [start + 6]) * 9;
                    } else {
                        length = 8;
                    }
                } else {
                    length = 0;
                }

                if (index === start + length - 1) {
                    var valid = true, frameIndex;
                    if (version === 0x10) {
                        if (!Header.calcAndCompareChecksumV0(buffer, start + 1, start + 9)) {
                            // console.log('checksum error in header');
                            valid = false;
                        }

                        frameIndex = start + 10;
                        while (valid && (frameIndex < start + length)) {
                            if (!Header.calcAndCompareChecksumV0(buffer, frameIndex, frameIndex + 5)) {
                                // console.log('checksum error in frame index ' + frameIndex);
                                valid = false;
                            }
                            frameIndex += 6;
                        }
                    } else if (version === 0x20) {
                        if (!Header.calcAndCompareChecksumV0(buffer, start + 1, start + 15)) {
                            valid = false;
                        }
                    } else if (version === 0x30) {
                        if (!Header.calcAndCompareChecksumV0(buffer, start + 1, start + 7)) {
                            valid = false;
                        }

                        frameIndex = start + 8;
                        while (valid && (frameIndex < start + length)) {
                            if (!Header.calcAndCompareChecksumV0(buffer, frameIndex, frameIndex + 8)) {
                                valid = false;
                            }
                            frameIndex += 9;
                        }
                    } else {
                        valid = false;
                    }

                    if (valid) {
                        if (majorVersion === 1) {
                            if (EventEmitter.listenerCount(this, 'packet') > 0) {
                                var packet = Packet.fromLiveBuffer(buffer, start, index);
                                packet.channel = this.channel;
                                this.emit('packet', packet);
                            }
                        } else if (majorVersion === 2) {
                            if (EventEmitter.listenerCount(this, 'datagram') > 0) {
                                var datagram = Datagram.fromLiveBuffer(buffer, start, index);
                                datagram.channel = this.channel;
                                this.emit('datagram', datagram);
                            }
                        } else if (majorVersion === 3) {
                            if (EventEmitter.listenerCount(this, 'telegram') > 0) {
                                var telegram = Telegram.fromLiveBuffer(buffer, start, index);
                                telegram.channel = this.channel;
                                this.emit('telegram', telegram);
                            }
                        }
                    } else {
                        reportJunk(index + 1);
                    }

                    start = null;
                    processed = index + 1;
                }
            }

            index++;
        }

        var minProcessed = buffer.length - 1024;
        if (processed < minProcessed) {
            reportJunk(minProcessed);
            processed = minProcessed;
        }

        if (processed < buffer.length) {
            this.rxBuffer = buffer.slice(processed);
        } else {
            this.rxBuffer = null;
        }

        // console.log('_write (end): ', this.rxBuffer);

        if (callback) {
            callback(null);
        }
    },

    _read: function() {
        // nop
    },

    _setConnectionState: function(newState) {
        if (this.connectionState !== newState) {
            this.connectionState = newState;

            this.rxBuffer = null;

            if (EventEmitter.listenerCount(this, 'connectionState') > 0) {
                this.emit('connectionState', newState);
            }
        }
    },

    /**
     * Send raw data over this Connection instance.
     *
     * @param {Header|Buffer} data The Header or Buffer instance to be sent.
     */
    send: function(data) {
        if (data instanceof Header) {
            data = data.toLiveBuffer();
        }
        return this.push(data);
    },

    /**
     * Sends and / or receives a VBus data.
     *
     * @param {Header|Buffer} txData The Header or Buffer instance to be sent.
     * @param {object} options
     * @param {number} options.timeout Timeout in milliseconds after which the `txData` will be sent again
     * @param {number} options.timeoutIncr After each timeout retransmission the timeout value for the next try is increment by this value.
     * @param {number} options.tries After this number of tries the returned Promise will resolve with value `null`.
     * @param {?function} options.filterPacket Will be called when a Packet has been received with the Packet and a callback as arguments.
     * @param {?function} options.filterDatagram Will be called when a Datagram has been received with the Datagram and a callback as arguments.
     * @returns {Promise} A Promise that either resolves to the VBus data selected by one of the filter callbacks or `null` on timeout.
     */
    transceive: function(txData, options) {
        var _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 0,
            tries: 1,
        });

        var deferred = Q.defer();
        var promise = deferred.promise;

        var timer, onPacket, onDatagram;

        var done = function(err, result) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            if (onPacket) {
                _this.removeListener('packet', onPacket);
                onPacket = null;
            }

            if (onDatagram) {
                _this.removeListener('datagram', onDatagram);
                onDatagram = null;
            }

            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        if (options.filterPacket) {
            onPacket = function(rxPacket) {
                options.filterPacket(rxPacket, done);
            };

            this.on('packet', onPacket);
        }

        if (options.filterDatagram) {
            onDatagram = function(rxDatagram) {
                options.filterDatagram(rxDatagram, done);
            };

            this.on('datagram', onDatagram);
        }

        var tries = options.tries, timeout = options.timeout;

        var nextTry = function() {
            if (tries > 0) {
                tries--;

                timer = setTimeout(nextTry, timeout);

                timeout += options.timeoutIncr;

                if (txData) {
                    _this.send(txData);
                }
            } else {
                done(null, null);
            }
        };

        process.nextTick(nextTry);

        return promise;
    },

    /**
     * Waits for a VBus bus offering datagram (Command 0x0500).
     *
     * Returns a Promise that resolves with the Datagram or `null` if the method timed out.
     * @param {number} timeout=20000 Timeout in milliseconds
     * @returns {Promise} A Promise that resolves to the bus offering Datagram or `null` on timeout.
     */
    waitForFreeBus: function(timeout) {
        var options = {
            tries: 1,
            timeout: timeout || 20000,
        };

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.command === 0x0500) {
                done(null, rxDatagram);
            }
        };

        return this.transceive(null, options);
    },

    /**
     * Sends a VBus bus release datagram (Command 0x0600).
     * Returns a Promise that resolves with the first VBus packet received after the release or `null` on timeout.
     *
     * @param {number} address The VBus address of the master device to give the bus ownership back to.
     * @param {object} options
     * @param {number} options.tries=2 Number of tries to give the bus ownership back.
     * @param {number} options.timeout=1500 Time in milliseconds to wait between tries.
     */
    releaseBus: function(address, options) {
        options = _.defaults({}, options, {
            tries: 2,
            timeout: 1500
        });

        var txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x0600,
            valueId: 0,
            value: 0
        }).toLiveBuffer();

        options.filterPacket = function(rxPacket, done) {
            done(null, rxPacket);
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to get a value from a device.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param {number} address The VBus address of the device to get the value from
     * @param {number} valueId The ID of the value to read from the device.
     * @param {object} options
     * @param {number} options.timeout=500 Time in milliseconds between tries.
     * @param {number} options.tries=2 Number of tries to get the value.
     * @returns {Promise} A promise that resolves to the received Datagram or `null` on timeout.
     */
    getValueById: function(address, valueId, options) {
        var _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        var txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x0300,
            valueId: valueId,
            value: 0
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {

            } else if (rxDatagram.sourceAddress !== address) {

            } else if (rxDatagram.command !== 0x0100) {

            } else if (rxDatagram.valueId !== valueId) {

            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to set a value in a device.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param {number} address The VBus address of the device to set the value in
     * @param {number} valueId The ID of the value to write to the device.
     * @param {object} options
     * @param {number} options.timeout=500 Time in milliseconds between tries.
     * @param {number} options.tries=2 Number of tries to get the value.
     * @returns {Promise} A promise that resolves to the received Datagram or `null` on timeout.
     */
    setValueById: function(address, valueId, value, options) {
        var _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
            save: false
        });

        var txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: options.save ? 0x0400 : 0x0200,
            valueId: valueId,
            value: value
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {

            } else if (rxDatagram.sourceAddress !== address) {

            } else if (rxDatagram.command !== 0x0100) {

            } else if (rxDatagram.valueId !== valueId) {

            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Creates a promise that resolves when this Connection
     * instance is connected and rejects if it is disconnected.
     * If it is either connected nor disconnected the promise
     * will stay pending until one of the states is entered.
     *
     * @returns {Promise}
     */
    createConnectedPromise: function() {
        var _this = this;

        return utils.promise(function(resolve, reject) {
            var checkConnectionState = function(state) {
                if (state === Connection.STATE_DISCONNECTED) {
                    reject(new Error(state));
                    return true;
                } else if (state === Connection.STATE_CONNECTED) {
                    resolve();
                    return true;
                } else {
                    return false;
                }
            };

            if (!checkConnectionState(_this.connectionState)) {
                var onConnectionState = function(state) {
                    if (checkConnectionState(state)) {
                        _this.removeListener('connectionState', onConnectionState);
                    }
                };

                _this.on('connectionState', onConnectionState);
            }
        });
    },

}, states);



module.exports = Connection;
