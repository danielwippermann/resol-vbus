/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

let SerialPort, serialPortRequireError;
try {
    // eslint-disable-next-line prefer-destructuring
    SerialPort = require('serialport').SerialPort;
} catch (ex) {
    serialPortRequireError = ex;
}


const Connection = require('./connection');
const { applyDefaultOptions } = require('./utils');



class SerialConnection extends Connection {

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
        super(options);

        applyDefaultOptions(this, options, /** @lends SerialConnection.prototype */ {

            /**
            * The path to the serial port.
            * @type {string}
            */
            path: null,

            baudrate: 9600,

        });
    }

    connect() {
        if (this.connectionState !== SerialConnection.STATE_DISCONNECTED) {
            throw new Error('Connection is not disconnected (' + this.connectionState + ')');
        }

        this._setConnectionState(SerialConnection.STATE_CONNECTING);

        return this._connect();
    }

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
    }

    _connect() {
        return new Promise((resolve, reject) => {
            let cleanup = () => { reject(new Error('Called too soon')); };

            const options = {
                path: this.path,
                baudRate: this.baudrate,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
            };

            const serialPort = this._createSerialPort(options);

            let onConnectionReadable = () => {
                let chunk;
                while ((chunk = this.read()) != null) {
                    if (serialPort) {
                        serialPort.write(chunk);
                    }
                }
            };

            let onSerialPortError = () => {
                cleanup();
            };

            let onSerialPortOpen = () => {
                onSerialPortOpen = null;

                this.reconnectTimeout = 0;

                this._setConnectionState(SerialConnection.STATE_CONNECTED);

                resolve();
            };

            let onSerialPortClose = () => {
                cleanup();
            };

            let onSerialPortReadable = () => {
                let chunk;
                while ((chunk = serialPort.read()) != null) {
                    this._write(chunk);
                }
            };

            cleanup = () => {
                if (onConnectionReadable) {
                    this.removeListener('readable', onConnectionReadable);
                    onConnectionReadable = null;
                }

                if (serialPort) {
                    if (onSerialPortError) {
                        serialPort.removeListener('error', onSerialPortError);
                        onSerialPortError = null;
                    }

                    if (onSerialPortOpen) {
                        serialPort.removeListener('open', onSerialPortOpen);
                        onSerialPortOpen = null;
                    }

                    if (onSerialPortClose) {
                        serialPort.removeListener('close', onSerialPortClose);
                        onSerialPortClose = null;
                    }

                    if (onSerialPortReadable) {
                        serialPort.removeListener('readable', onSerialPortReadable);
                        onSerialPortReadable = null;
                    }

                    if (serialPort.isOpen) {
                        serialPort.close();
                    }
                }

                if (this.serialPort !== serialPort) {
                    // nop
                } else if (this.connectionState === SerialConnection.STATE_CONNECTING) {
                    this._setConnectionState(SerialConnection.STATE_DISCONNECTED);

                    this.serialPort = null;

                    reject(new Error('Unable to connect'));
                } else if (this.connectionState === SerialConnection.STATE_DISCONNECTING) {
                    this._setConnectionState(SerialConnection.STATE_DISCONNECTED);

                    this.serialPort = null;
                } else {
                    this._setConnectionState(SerialConnection.STATE_INTERRUPTED);

                    this.serialPort = null;

                    const timeout = this.reconnectTimeout;
                    if (this.reconnectTimeout < this.reconnectTimeoutMax) {
                        this.reconnectTimeout += this.reconnectTimeoutIncr;
                    }

                    setTimeout(() => {
                        this._setConnectionState(SerialConnection.STATE_RECONNECTING);

                        this._connect();
                    }, timeout);
                }
            };

            this.on('readable', onConnectionReadable);
            serialPort.on('error', onSerialPortError);
            serialPort.once('open', onSerialPortOpen);
            serialPort.on('close', onSerialPortClose);
            serialPort.on('readable', onSerialPortReadable);

            this.serialPort = serialPort;
        });
    }

    _createSerialPort(options) {
        if (serialPortRequireError) {
            throw serialPortRequireError;
        }

        return new SerialPort(options);
    }

}


Object.assign(SerialConnection.prototype, /** @lends SerialConnection.prototype */ {

    /**
     * The path to the serial port.
     * @type {string}
     */
    path: null,

    baudrate: 9600,

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

});


Object.assign(SerialConnection, /** @lends SerialConnection */ {

    hasSerialPortSupport: !!SerialPort,

});



module.exports = SerialConnection;
