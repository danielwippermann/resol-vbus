/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');
var SerialPort = require('serialport').SerialPort;


var Connection = require('./connection');



var optionKeys = [
    'path',
];



var SerialConnection = Connection.extend({

    path: null,

    reconnectTimeout: 0,

    reconnectTimeoutIncr: 10000,

    reconnectTimeoutMax: 60000,

    serialPort: null,

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
            this._setConnectionState(SerialConnection.STATE_DISCONNECTING);

            if (this.serialPort) {
                this.serialPort.destroy();
            } else {
                this._setConnectionState(SerialConnection.STATE_DISCONNECTED);
            }
        }
    },

    _connect: function() {
        var _this = this;

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

        this.on('data', onConnectionData);

        var serialPort = new SerialPort(this.path);
        serialPort.on('data', onSerialPortData);
        serialPort.on('end', onEnd);
        serialPort.on('error', onError);

        this.serialPort = serialPort;

        return promise;
    }

});



module.exports = SerialConnection;
