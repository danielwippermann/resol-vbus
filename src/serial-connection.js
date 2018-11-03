/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



let SerialPort;
try {
    SerialPort = require('serialport');
} catch (ex) {
    // eat it
}


const Connection = require('./connection');
const _ = require('./lodash');
const { promisify } = require('./utils');



const optionKeys = [
    'path',
];



const SerialConnection = Connection.extend(/** @lends SerialConnection# */ {

    /**
     * The path to the serial port.
     * @type {string}
     */
    path: null,

    /**
     * Timeout in milliseconds to way between reconnection retries.
     * @type {number}
     */
    reconnectTimeout: 0,

    /**
     * Value to increment timeout after every unsuccessful reconnection retry.
     * @type {number}
     */
    reconnectTimeoutIncr: 10000,

    /**
     * Maximum timeout value between unsuccessful reconnection retry.
     * @type {number}
     */
    reconnectTimeoutMax: 60000,

    serialPort: null,

    /**
     * Creates a new SerialConnection instance and optionally initialized its member with the given values.
     *
     * @constructs
     * @augments Connection
     * @param {object} options Initialization values
     * @param {string} options.path See {@link SerialConnection#path}
     *
     * @classdesc
     * The SerialConnection class provides asscess to a VBus live data stream using a serial port.
     */
    constructor(options) {
        Connection.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    connect() {
        if (this.connectionState !== SerialConnection.STATE_DISCONNECTED) {
            throw new Error('Connection is not disconnected (' + this.connectionState + ')');
        }

        this._setConnectionState(SerialConnection.STATE_CONNECTING);

        return this._connect();
    },

    disconnect() {
        if (this.connectionState !== SerialConnection.STATE_DISCONNECTED) {
            const previousConnectionState = this.connectionState;

            this._setConnectionState(SerialConnection.STATE_DISCONNECTING);

            if (this.serialPort && (previousConnectionState !== SerialConnection.STATE_CONNECTING)) {
                this.serialPort.close();
            } else {
                this._setConnectionState(SerialConnection.STATE_DISCONNECTED);
            }
        }
    },

    _connect() {
        const _this = this;

        let serialPort = undefined;

        return new Promise((resolve, reject) => {
            const done = function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };

            const onConnectionData = function(chunk) {
                serialPort.write(chunk);
            };

            const onSerialPortData = function(chunk) {
                _this._write(chunk);
            };

            const onSerialPortTermination = function() {
                _this.removeListener('data', onConnectionData);

                if (_this.serialPort !== serialPort) {
                    // nop
                } else if (_this.connectionState === SerialConnection.STATE_CONNECTING) {
                    _this._setConnectionState(SerialConnection.STATE_DISCONNECTED);

                    _this.serialPort = null;

                    done(new Error('Unable to connect'));
                } else if (_this.connectionState === SerialConnection.STATE_DISCONNECTING) {
                    _this._setConnectionState(SerialConnection.STATE_DISCONNECTED);

                    _this.serialPort = null;
                } else {
                    _this._setConnectionState(SerialConnection.STATE_INTERRUPTED);

                    _this.serialPort = null;

                    const timeout = _this.reconnectTimeout;
                    if (_this.reconnectTimeout < _this.reconnectTimeoutMax) {
                        _this.reconnectTimeout += _this.reconnectTimeoutIncr;
                    }

                    setTimeout(() => {
                        _this._setConnectionState(SerialConnection.STATE_RECONNECTING);

                        _this._connect();
                    }, timeout);
                }
            };

            const onEnd = function() {
                onSerialPortTermination();
            };

            const onError = function() {
                serialPort.close();
                onSerialPortTermination();
            };

            const onConnectionEstablished = function() {
                _this.reconnectTimeout = 0;

                _this._setConnectionState(SerialConnection.STATE_CONNECTED);

                done();
            };

            this.on('data', onConnectionData);

            const onCompletion = function(err) {
                if (err) {
                    done(err);
                }
            };

            const onDisconnect = function() {
                onError();
            };

            const options = {
                baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                disconnectedCallback: onDisconnect,
            };

            serialPort = this._createSerialPort(this.path, options, onCompletion);

            serialPort.once('open', () => {
                serialPort.on('data', onSerialPortData);
                serialPort.on('end', onEnd);
                serialPort.on('error', onError);

                onConnectionEstablished();
            });

            this.serialPort = serialPort;
        });
    },

    _createSerialPort(path, options, onCompletion) {
        return new SerialPort(path, options, null, onCompletion);
    }

}, {

    hasSerialPortSupport: !!SerialPort,

});



module.exports = SerialConnection;
