/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var net = require('net');


var _ = require('lodash');
var Q = require('q');


var Connection = require('./connection');



var optionKeys = [
    'host',
    'port',
    'viaTag',
    'password',
];



var TcpConnection = Connection.extend({

    host: null,

    port: 7053,

    viaTag: null,

    password: null,

    reconnectTimeout: 0,

    reconnectTimeoutIncr: 10000,

    reconnectTimeoutMax: 60000,

    constructor: function(options) {
        Connection.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    connect: function() {
        if (this.connectionState !== TcpConnection.STATE_DISCONNECTED) {
            throw new Error('Connection is not disconnected (' + this.connectionState + ')');
        }

        this._setConnectionState(TcpConnection.STATE_CONNECTING);

        return this._connect();
    },

    disconnect: function() {
        if (this.connectionState !== TcpConnection.STATE_DISCONNECTED) {
            this._setConnectionState(TcpConnection.STATE_DISCONNECTING);

            this.socket.destroy();

            this._setConnectionState(TcpConnection.STATE_DISCONNECTED);
        }
    },

    _connect: function() {
        var _this = this;

        var deferred = Q.defer();

        var options = {
            host: this.host,
            port: this.port
        };

        var phase = 0;
        var rxBuffer = null;

        var write = function() {
            // console.log(arguments);
            return socket.write.apply(socket, arguments);
        };

        var onConnect = function() {
            // console.log('onConnect');

        };

        var onLine = function(line) {
            var newPhase = -1;
            if (line [0] === '+') {
                if (phase === 0) {
                    if (_this.viaTag) {
                        // CONNECT ...
                        newPhase = 20;
                    } else {
                        // PASS ...
                        newPhase = 40;
                    }
                } else if (phase === 20) {
                    newPhase = 40;
                } else if (phase === 40) {
                    if (_this.channelListCallback) {
                        newPhase = 60;
                    } else if (_this.channel) {
                        newPhase = 80;
                    } else {
                        newPhase = 900;
                    }
                } else if (phase === 60) {
                    // TODO: call callback
                } else if (phase === 80) {
                    newPhase = 900;
                } else if (phase === 900) {
                    newPhase = 1000;
                }
            } else if (line [0] === '-') {
                newPhase = 800;
            } else if (line [0] === '*') {
                if (phase === 60) {

                }
            } else {

            }

            if (newPhase >= 0) {
                phase = newPhase;

                if (phase === 20) {
                    // CONNECT
                    write('CONNECT ' + _this.viaTag + '\r\n');
                } else if (phase === 40) {
                    // PASS
                    write('PASS ' + _this.password + '\r\n');
                } else if (phase === 60) {
                    // CHANNELLIST
                    write('CHANNELLIST\r\n');
                } else if (phase === 80) {
                    // CHANNEL
                    write('CHANNEL ' + _this.channel + '\r\n');
                } else if (phase === 800) {
                    // QUIT
                    write('QUIT\r\n');
                } else if (phase === 900) {
                    // DATA
                    write('DATA\r\n');
                } else if (phase === 1000) {
                    _this.reconnectTimeout = 0;

                    _this._setConnectionState(TcpConnection.STATE_CONNECTED);
                }
            }
        };

        var onData = function(chunk) {
            // console.log('onData');

            if (phase < 1000) {
                // console.log(chunk.toString('utf8'));

                var buffer;
                if (rxBuffer) {
                    buffer = Buffer.concat([ rxBuffer, chunk ]);
                } else {
                    buffer = chunk;
                }

                var start = 0, index = 0;
                while ((index < buffer.length) && (phase < 1000)) {
                    if ((buffer [index] === 13) || (buffer [index] === 10)) {
                        if (start < index) {
                            var line = buffer.toString('utf8', start, index);
                            onLine(line);
                        }

                        start = index + 1;
                    }

                    index++;
                }

                if (start < buffer.length) {
                    if (phase >= 1000) {
                        _this._write(buffer.slice(start));

                        rxBuffer = null;
                    } else {
                        rxBuffer = buffer.slice(start);
                    }
                } else {
                    rxBuffer = null;
                }
            } else {
                _this._write(chunk);
            }
        };

        var onSocketTermination = function() {
            console.log('onSocketTermination', _this.socket === socket, _this.connectionState, 'TO: ' + _this.reconnectTimeout);

            if (_this.socket !== socket) {
                // nop
            } else if (_this.connectionState === TcpConnection.STATE_CONNECTING) {
                // failed to connect
                _this._setConnectionState(TcpConnection.STATE_DISCONNECTED);

                _this.socket = null;
            } else if (_this.connectionState === TcpConnection.STATE_DISCONNECTING) {
                _this._setConnectionState(TcpConnection.STATE_DISCONNECTED);

                _this.socket = null;
            } else {
                _this._setConnectionState(TcpConnection.STATE_INTERRUPTED);

                _this.socket = null;

                var timeout = _this.reconnectTimeout;
                if (_this.reconnectTimeout < _this.reconnectTimeoutMax) {
                    _this.reconnectTimeout += _this.reconnectTimeoutIncr;
                }

                setTimeout(function() {
                    _this._setConnectionState(TcpConnection.STATE_RECONNECTING);

                    _this._connect();
                }, timeout);
            }
        };

        var onEnd = function() {
            console.log('onEnd');
            
            onSocketTermination();
        };

        var onError = function(err) {
            console.log(err);

            socket.destroy();
            onSocketTermination();
        };

        var onTimeout = function() {
            console.log('onTimeout');

            socket.destroy();
            onSocketTermination();
        };

        var socket = net.connect(options, onConnect);
        socket.on('data', onData);
        socket.on('end', onEnd);
        socket.on('error', onError);
        socket.setTimeout(30000, onTimeout);
        socket.setKeepAlive(true, 60000);

        this.socket = socket;

        return deferred.promise;
    },

});



module.exports = TcpConnection;
