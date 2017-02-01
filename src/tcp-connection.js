/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
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
    'channel',
    'rawVBusDataOnly',
];



var TcpConnection = Connection.extend( /** @lends TcpConnection# */ {

    /**
     * Host name or IP address of the connection target.
     * @type {string}
     */
    host: null,

    /**
     * Port number of the connection target.
     * @type {number}
     */
    port: 7053,

    /**
     * Via tag if connection target is accessed using the VBus.net service.
     * @type {string}
     */
    viaTag: null,

    /**
     * Password needed to connect to target.
     * @type {string}
     */
    password: null,

    /**
     * Channel number to connect to.
     * @type {string|number}
     */
    channel: 0,

    /**
     * Indicates that connection does not need to perform login handshake.
     * Useful for serial-to-LAN converters.
     * @type {boolean}
     */
    rawVBusDataOnly: false,

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

    /**
     * Creates a new TcpConnection instance and optionally initializes its
     * members to the given values.
     *
     * @constructs
     * @augments Connection
     * @param {object} options Initialization values
     * @param {string} options.host See {@link TcpConnection#host}
     * @param {number} options.port See {@link TcpConnection#port}
     * @param {string} options.viaTag See {@link TcpConnection#viaTag}
     * @param {string} options.password See {@link TcpConnection#password}
     * @param {boolean} options.rawVBusDataOnly See {@link TcpConnection#rawVBusDataOnly}
     *
     * @classdesc
     * The TcpConnection class is primarily designed to provide access to VBus live data
     * using the VBus-over-TCP specification. That includes the VBus/LAN adapter, the
     * Dataloggers (DL2 and DL3) and VBus.net.
     * In addition to that it can be used to connect to a raw VBus data stream using TCP
     * (for example provided by a serial-to-LAN gateway).
     */
    constructor: function(options) {
        Connection.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    connect: function(force) {
        if (this.connectionState !== TcpConnection.STATE_DISCONNECTED) {
            throw new Error('Connection is not disconnected (' + this.connectionState + ')');
        }

        this._setConnectionState(TcpConnection.STATE_CONNECTING);

        return this._connect(force);
    },

    disconnect: function() {
        if (this.connectionState === TcpConnection.STATE_DISCONNECTING) {
            if (this.socket) {
                this.socket.destroy();

                this.socket = null;
            }

            this._setConnectionState(TcpConnection.STATE_DISCONNECTED);
        } else if (this.connectionState !== TcpConnection.STATE_DISCONNECTED) {
            this._setConnectionState(TcpConnection.STATE_DISCONNECTING);

            if (this.socket) {
                this.socket.end();
            } else {
                this._setConnectionState(TcpConnection.STATE_DISCONNECTED);
            }
        }
    },

    _connect: function(force) {
        var _this = this;

        var socket;

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

        var options = {
            host: this.host,
            port: this.port
        };

        var phase = this.rawVBusDataOnly ? 1000 : 0;
        var rxBuffer = null;

        var write = function() {
            return socket.write.apply(socket, arguments);
        };

        var onConnectionEstablished = function() {
            _this.reconnectTimeout = 0;

            _this._setConnectionState(TcpConnection.STATE_CONNECTED);

            done();
        };

        var onConnect = function() {
            if (phase === 1000) {
                onConnectionEstablished();
            }
        };

        var channelList = [];

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
                    newPhase = 70;
                    _this.channelListCallback(channelList, function(err, channel) {
                        if (err) {
                            done(err);
                        } else {
                            if (channel !== undefined) {
                                if (_.isNumber(channel)) {
                                    _this.channel = channel;
                                } else if (_.isString(channel)) {
                                    _this.channel = parseInt(channel);
                                } else if (_.isObject(channel) && _.has(channel, 'channel')) {
                                    _this.channel = channel.channel;
                                } else {
                                    done(new Error('Invalid channel selection ' + JSON.stringify(channel)));
                                }
                            }

                            if (_this.channel) {
                                newPhase = 80;
                            } else {
                                newPhase = 900;
                            }
                        }
                    });
                } else if (phase === 80) {
                    newPhase = 900;
                } else if (phase === 900) {
                    newPhase = 1000;
                }
            } else if (line [0] === '-') {
                newPhase = 800;
                done(new Error('Remote side responded with ' + JSON.stringify(line)));
            } else if (line [0] === '*') {
                if (phase === 60) {
                    var md = /^\*([\d]+):(.*)$/.exec(line);
                    if (md) {
                        channelList.push({
                            channel: md [1],
                            name: md [2],
                        });
                    }
                }
            } else {
                // nop
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
                    onConnectionEstablished();
                }
            }
        };

        var onSocketData = function(chunk) {
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

        var onConnectionData = function(chunk) {
            write(chunk);
        };

        var onSocketTermination = function() {
            _this.removeListener('data', onConnectionData);

            if (_this.socket !== socket) {
                // nop
            } else if (!force && (_this.connectionState === TcpConnection.STATE_CONNECTING)) {
                // failed to connect
                _this._setConnectionState(TcpConnection.STATE_DISCONNECTED);

                _this.socket = null;

                done(new Error('Unable to connect'));
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
            onSocketTermination();
        };

        var onError = function(err) {
            socket.destroy();
            onSocketTermination();
        };

        var onTimeout = function() {
            socket.destroy();
            onSocketTermination();
        };

        this.on('data', onConnectionData);

        socket = net.connect(options, onConnect);
        socket.on('data', onSocketData);
        socket.on('end', onEnd);
        socket.on('error', onError);
        socket.setTimeout(30000, onTimeout);
        socket.setKeepAlive(true, 60000);

        this.socket = socket;

        return promise;
    },

});



module.exports = TcpConnection;
