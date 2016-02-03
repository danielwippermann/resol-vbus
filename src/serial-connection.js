/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');
var serialport;
try {
    serialport = require('serialport');
} catch (ex) {
    // eat it
}


var Connection = require('./connection');



var optionKeys = [
    'path',
];



var SerialConnection = Connection.extend(/** @lends SerialConnection# */ {

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
    constructor: function(options) {
        Connection.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    connect: function() {
        if (this.connectionState !== SerialConnection.STATE_DISCONNECTED) {
            throw new Error('Connection is not disconnected (' + this.connectionState + ')');
        }

        this._setConnectionState(SerialConnection.STATE_CONNECTING);

        return this._connect();
    },

    disconnect: function() {
        if (this.connectionState !== SerialConnection.STATE_DISCONNECTED) {
            var previousConnectionState = this.connectionState;

            this._setConnectionState(SerialConnection.STATE_DISCONNECTING);

            if (this.serialPort && (previousConnectionState !== SerialConnection.STATE_CONNECTING)) {
                this.serialPort.close();
            } else {
                this._setConnectionState(SerialConnection.STATE_DISCONNECTED);
            }
        }
    },

    _connect: function() {
        var _this = this;

        var serialPort;

        var deferred = Q.defer();
        var promise = deferred.promise;

        var done = function(err, result) {
            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        var onConnectionData = function(chunk) {
            serialPort.write(chunk);
        };

        var onSerialPortData = function(chunk) {
            _this._write(chunk);
        };

        var onSerialPortTermination = function() {
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

                var timeout = _this.reconnectTimeout;
                if (_this.reconnectTimeout < _this.reconnectTimeoutMax) {
                    _this.reconnectTimeout += _this.reconnectTimeoutIncr;
                }

                setTimeout(function() {
                    _this._setConnectionState(SerialConnection.STATE_RECONNECTING);

                    _this._connect();
                }, timeout);
            }
        };

        var onEnd = function() {
            onSerialPortTermination();
        };

        var onError = function() {
            serialPort.close();
            onSerialPortTermination();
        };

        var onConnectionEstablished = function() {
            _this.reconnectTimeout = 0;

            _this._setConnectionState(SerialConnection.STATE_CONNECTED);

            done();
        };

        this.on('data', onConnectionData);

        var onCompletion = function(err) {
            if (err) {
                done(err);
            }
        };

        var onDisconnect = function() {
            console.log(_this.id);
            console.log(new Error().toString());
            onError();
        };

        var options = {
            baudrate: 9600,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            disconnectedCallback: onDisconnect,
        };

        serialPort = this._createSerialPort(this.path, options, onCompletion);

        serialPort.once('open', function() {
            serialPort.on('data', onSerialPortData);
            serialPort.on('end', onEnd);
            serialPort.on('error', onError);

            onConnectionEstablished();
        });

        this.serialPort = serialPort;

        return promise;
    },

    _createSerialPort: function(path, options, onCompletion) {
        return new serialport.SerialPort(path, options, null, onCompletion);
    }

}, {

    hasSerialPortSupport: !!serialport,

});



module.exports = SerialConnection;
