/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Duplex = require('stream').Duplex;


const extend = require('./extend');
const _ = require('./lodash');

const Header = require('./header');
const Packet = require('./packet');
const Datagram = require('./datagram');
const Telegram = require('./telegram');



const states = _.reduce([
    'DISCONNECTED',
    'CONNECTING',
    'CONNECTED',
    'INTERRUPTED',
    'RECONNECTING',
    'DISCONNECTING',
], (memo, state) => {
    memo ['STATE_' + state] = state;
    return memo;
}, {});



const optionKeys = [
    'channel',
    'selfAddress',
];



function promiseToCallback(maybePromise, callback) {
    if (maybePromise && (typeof maybePromise.then === 'function')) {
        maybePromise.then((result) => {
            if (result != null) {
                callback(null, result);
            }
        }, (err) => {
            callback(err);
        });
    }
}



const Connection = extend(Duplex, /** @lends Connection# */ {

    /**
     * Creates a new Connection instance and optionally initializes its member with the given values.
     *
     * @constructs
     * @augments Duplex
     * @param {object} options Initialization values for this instance's members
     * @param {number} options.channel See {@link Connection#channel}
     * @param {number} options.selfAddress See {@link Connection#selfAddress}
     *
     * @classdesc
     * The `Connection` class is the abstract base class for all VBus live data connections.
     * It extends the `Duplex` stream class. Any data written to a `Connection` instance is
     * parsed according to the VBus Protocol Specification. Once a valid instance of one of the
     * `Header` sub-classes (`Packet`, `Datagram` or `Telegram`)
     * is created from the binary data stream, the respective event is emitted on
     * the `Connection` instance.
     *
     * In addition to receiving incoming data the `Connection` class
     * offers several helper methods e.g. to send data to the underlying VBus connection.
     *
     * The `Connection` class itself has no knowledge about the underlying VBus connection.
     * Several sub-classes exist that know how to contact different types of VBus live streams.
     *
     * See `SerialConnection` or `TcpConnection` for concrete implementations.
     *
     * @example
     * var connection = new SerialConnection({ path: '/dev/tty.usbserial' });
     * connection.on('connectionState', function(state) {
     *     console.log(state);
     * });
     * connection.on('packet', function(packet) {
     *     console.log(packet.getId());
     * });
     * connection.on('datagram', function(datagram) {
     *     console.log(datagram.getId());
     * });
     * connection.connect();
     */
    constructor(options) {
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
     * All `Header` instances created by this `Connection` instance will be assigned
     * this VBus channel.
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
     * Establish underlying connection and start streaming data to the writable side
     * of this `Connection` instance's stream.
     *
     * @abstract
     * @returns {Promise} A promise that resolves once the connection has been established.
     */
    connect(force) {
        throw new Error('Must be implemented by sub-class');
    },

    /**
     * Diconnect this instance.
     * @abstract
     */
    disconnect() {
        throw new Error('Must be implemented by sub-class');
    },

    _write(chunk, encoding, callback) {
        this.receive(new Date(), chunk);

        if (callback) {
            callback(null);
        }
    },

    receive(timestamp, chunk) {
        const _this = this;

        if (this.listenerCount('rawData') > 0) {
            this.emit('rawData', chunk, timestamp);
        }

        let buffer;
        if (this.rxBuffer) {
            buffer = Buffer.concat([ this.rxBuffer, chunk ]);
        } else {
            buffer = chunk;
        }

        let processed = 0;

        const reportJunk = function(index) {
            if (index > processed) {
                if (_this.listenerCount('junkData') > 0) {
                    const junkData = buffer.slice(processed, index);
                    _this.emit('junkData', junkData, timestamp);
                }
            }
        };

        // console.log('_write (start):', this.rxBuffer, chunk);

        let index = 0, start = null;
        while (index < buffer.length) {
            const b = buffer [index] & 255;
            if (b === 0xAA) {
                reportJunk(index);

                start = index;
                processed = index;
            } else if (b >= 0x80) {
                start = null;
            } else if (start === null) {
                // skip junk
            } else if (index >= start + 5) {
                const version = buffer [start + 5] & 255;
                const majorVersion = version >> 4;
                let length;
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
                    let valid = true;
                    if (version === 0x10) {
                        if (!Header.calcAndCompareChecksumV0(buffer, start + 1, start + 9)) {
                            // console.log('checksum error in header');
                            valid = false;
                        }

                        let frameIndex = start + 10;
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

                        let frameIndex = start + 8;
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
                            if (this.listenerCount('packet') > 0) {
                                const packet = Packet.fromLiveBuffer(buffer, start, index);
                                packet.timestamp = new Date(timestamp);
                                packet.channel = this.channel;
                                this.emit('packet', packet);
                            }
                        } else if (majorVersion === 2) {
                            if (this.listenerCount('datagram') > 0) {
                                const datagram = Datagram.fromLiveBuffer(buffer, start, index);
                                datagram.timestamp = new Date(timestamp);
                                datagram.channel = this.channel;
                                this.emit('datagram', datagram);
                            }
                        } else if (majorVersion === 3) {
                            if (this.listenerCount('telegram') > 0) {
                                const telegram = Telegram.fromLiveBuffer(buffer, start, index);
                                telegram.timestamp = new Date(timestamp);
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

        const minProcessed = buffer.length - 1024;
        if (processed < minProcessed) {
            reportJunk(minProcessed);
            processed = minProcessed;
        }

        if (processed < buffer.length) {
            this.rxBuffer = buffer.slice(processed);
        } else {
            this.rxBuffer = null;
        }
    },

    _read() {
        // nop
    },

    _setConnectionState(newState) {
        if (this.connectionState !== newState) {
            this.connectionState = newState;

            this.rxBuffer = null;

            if (this.listenerCount('connectionState') > 0) {
                this.emit('connectionState', newState);
            }
        }
    },

    /**
     * Send raw data over this Connection instance.
     *
     * @param {Header|Buffer} data The Header or Buffer instance to be sent.
     */
    send(data) {
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
    transceive(txData, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 0,
            tries: 1,
        });

        return new Promise((resolve, reject) => {
            let timer, onPacket, onDatagram;

            const done = function(err, result) {
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

                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };

            if (options.filterPacket) {
                onPacket = function(rxPacket) {
                    const result = options.filterPacket(rxPacket, done);

                    promiseToCallback(result, done);
                };

                this.on('packet', onPacket);
            }

            if (options.filterDatagram) {
                onDatagram = function(rxDatagram) {
                    const result = options.filterDatagram(rxDatagram, done);

                    promiseToCallback(result, done);
                };

                this.on('datagram', onDatagram);
            }

            let tries = options.tries, timeout = options.timeout;

            const nextTry = function() {
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
        });
    },

    /**
     * Waits for a VBus bus offering datagram (Command 0x0500).
     *
     * Returns a Promise that resolves with the Datagram or `null` if the method timed out.
     * @param {number} timeout=20000 Timeout in milliseconds
     * @returns {Promise} A Promise that resolves to the bus offering Datagram or `null` on timeout.
     */
    waitForFreeBus(timeout) {
        const options = {
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
    releaseBus(address, options) {
        options = _.defaults({}, options, {
            tries: 2,
            timeout: 1500
        });

        const txDatagram = new Datagram({
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
     * @param {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param {number} options.tries=3 Number of tries to get the value.
     * @returns {Promise} A promise that resolves to the received Datagram or `null` on timeout.
     */
    getValueById(address, valueId, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const subIndex = (valueId >> 16) & 0x7F;
        valueId = valueId & 0xFFFF;

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x0300 | subIndex,
            valueId,
            value: 0
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== (0x0100 | subIndex)) {
                // nop
            } else if (rxDatagram.valueId !== valueId) {
                // nop
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
     * @param {number} value The value to write to the device.
     * @param {object} options
     * @param {number} options.timeout=500 Time in milliseconds between tries.
     * @param {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param {number} options.tries=3 Number of tries to get the value.
     * @returns {Promise} A promise that resolves to the received Datagram or `null` on timeout.
     */
    setValueById(address, valueId, value, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
            save: false,
        });

        const subIndex = (valueId >> 16) & 0x7F;
        valueId = valueId & 0xFFFF;

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: (options.save ? 0x0400 : 0x0200) | subIndex,
            valueId,
            value
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== (0x0100 | subIndex)) {
                // nop
            } else if (rxDatagram.valueId !== valueId) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to lookup a value ID hash in a device.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param  {number} address The VBus address of the device to lookup the value in.
     * @param  {number} valueId The ID of the value to lookup in the device.
     * @param  {object} options
     * @param  {number} options.timeout=500 Time in milliseconds between tries.
     * @param {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param  {number} options.tries=3 Number of tries to lookup the value.
     * @return {Promise} A Promise the resolves to the received Datagram or `null` on timeout.
     */
    getValueIdHashById(address, valueId, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x1000,
            valueId,
            value: 0
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== 0x0100) {
                // nop
            } else if (rxDatagram.valueId !== valueId) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to lookup a value ID in a device.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param  {number} address The VBus address of the device to lookup the value in.
     * @param  {number} valueIdHash The ID hash of the value to lookup in the device.
     * @param  {object} options
     * @param  {number} options.timeout=500 Time in milliseconds between tries.
     * @param {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param  {number} options.tries=3 Number of tries to lookup the value.
     * @return {Promise} A Promise the resolves to the received Datagram or `null` on timeout.
     */
    getValueIdByIdHash(address, valueIdHash, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x1100,
            valueId: 0,
            value: valueIdHash
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if ((rxDatagram.command !== 0x0100) && (rxDatagram.command !== 0x1101)) {
                // nop
            } else if (rxDatagram.value !== valueIdHash) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to lookup the controller's capabilities (part 1).
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param  {number} address The VBus address of the device to get the capabilities from.
     * @param  {object} options
     * @param  {number} options.timeout=500 Time in milliseconds between tries.
     * @param  {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param  {number} options.tries=3 Number of tries to lookup the value.
     * @return {Promise} A Promise the resolves to the received Datagram or `null` on timeout.
     */
    getCaps1(address, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x1300,
            valueId: 0,
            value: 0,
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== 0x1301) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to begin a bulk valke transaction.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param  {number} address The VBus address of the device to begin the transaction on.
     * @param  {number} txTimeout The number of seconds of inactivity after which the transaction is rolled back.
     * @param  {object} options
     * @param  {number} options.timeout=500 Time in milliseconds between tries.
     * @param  {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param  {number} options.tries=3 Number of tries to lookup the value.
     * @return {Promise} A Promise the resolves to the received Datagram or `null` on timeout.
     */
    beginBulkValueTransaction(address, txTimeout, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x1400,
            valueId: 0,
            value: txTimeout
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== 0x1401) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to commit a bulk valke transaction.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param  {number} address The VBus address of the device to commit the transaction on.
     * @param  {object} options
     * @param  {number} options.timeout=500 Time in milliseconds between tries.
     * @param  {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param  {number} options.tries=3 Number of tries to lookup the value.
     * @return {Promise} A Promise the resolves to the received Datagram or `null` on timeout.
     */
    commitBulkValueTransaction(address, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x1402,
            valueId: 0,
            value: 0
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== 0x1403) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to rollback a bulk valke transaction.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param  {number} address The VBus address of the device to perform the rollback on.
     * @param  {object} options
     * @param  {number} options.timeout=500 Time in milliseconds between tries.
     * @param  {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param  {number} options.tries=3 Number of tries to lookup the value.
     * @return {Promise} A Promise the resolves to the received Datagram or `null` on timeout.
     */
    rollbackBulkValueTransaction(address, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x1404,
            valueId: 0,
            value: 0
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== 0x1405) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Sends a Datagram to set a value during a bulk value transaction.
     * Returns a Promise that resolves to the answer Datagram or `null` on timeout.
     *
     * @param  {number} address The VBus address of the device to set the value on.
     * @param  {number} valueId The ID of the value to write to the device.
     * @param  {number} value The value to write to the device.
     * @param  {object} options
     * @param  {number} options.timeout=500 Time in milliseconds between tries.
     * @param  {number} options.timeoutIncr=500 Additional time in milliseconds to increase the timeout per try.
     * @param  {number} options.tries=3 Number of tries to lookup the value.
     * @return {Promise} A Promise the resolves to the received Datagram or `null` on timeout.
     */
    setBulkValueById(address, valueId, value, options) {
        const _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        const subIndex = (valueId >> 16) & 0x7F;
        valueId = valueId & 0xFFFF;

        const txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x1500 | subIndex,
            valueId,
            value
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {
                // nop
            } else if (rxDatagram.sourceAddress !== address) {
                // nop
            } else if (rxDatagram.command !== (0x1600 | subIndex)) {
                // nop
            } else if (rxDatagram.valueId !== valueId) {
                // nop
            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    /**
     * Creates a promise that resolves when this Connection
     * instance is connected and rejects if it is disconnected.
     * If it is neither connected nor disconnected the promise
     * will stay pending until one of the states is entered.
     *
     * @returns {Promise}
     */
    createConnectedPromise() {
        const _this = this;

        return new Promise((resolve, reject) => {
            const checkConnectionState = function(state) {
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
                const onConnectionState = function(state) {
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
