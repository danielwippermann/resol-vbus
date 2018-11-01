/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const EventEmitter = require('events').EventEmitter;
const net = require('net');


const Q = require('q');


const extend = require('./extend');
const _ = require('./lodash');



const optionKeys = [
    'port',
    'channels',
];



const TcpConnectionEndpoint = extend(EventEmitter, /** @lends TcpConnectionEndpoint# */ {

    /**
     * The port number to listen on for incoming connections.
     * @type {number}
     */
    port: 7053,

    /**
     * The list of channels to return if the CHANNELLIST command is received.
     * @type {string[]}
     */
    channels: null,

    /**
     * The Server instance used for listening for incoming connections.
     * @type {net.Server}
     */
    server: null,

    /**
     * Creates a new instance and optionally initializes its members.
     *
     * @constructs
     * @augments EventEmitter
     * @param {object} options The initialization values for this instance.
     * @param {number} options.port See {@link TcpConnectionEndpoint#port}
     * @param {number} options.channels See {@link TcpConnectionEndpoint#channels}
     *
     * @classdesc
     * The TcpConnectionEndpoint can act as the remote side for a TcpConnection.
     * It supports all the commands that a DL3 connected via VBus.net would
     * provide as well.
     *
     * A `connection` event is emitted whenever an incoming connection passes
     * the VBus-over-TCP handshake.
     */
    constructor: function(options) {
        EventEmitter.call(this);

        _.extend(this, _.pick(options, optionKeys));

        if (!_.has(this, 'channels')) {
            this.channels = [ 'VBus' ];
        }
    },

    /**
     * Starts the server to listen for incoming connections.
     *
     * @return {Promise} A promise that resolves when the server is started.
     */
    start: function() {
        const _this = this;

        let deferred = Q.defer();
        const promise = deferred.promise;

        const done = function(err, result) {
            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        const server = net.createServer(function(socket) {
            _this._onConnection(socket);
        });

        server.listen(this.port, function() {
            if (_this.port === 0) {
                _this.port = server.address().port;
            }
            done(null, true);
        });

        server.on('error', function(err) {
            done(err);
        });

        this.server = server;

        return promise;
    },

    stop: function() {
        if (this.server) {
            this.server.close();

            this.server = null;
        }
    },

    _onConnection: function(socket) {
        const _this = this;

        const connectionInfo = {
            socket: socket,
        };

        let phase = 0;
        let rxBuffer = null;

        const write = function() {
            return socket.write.apply(socket, arguments);
        };

        const onData = function(chunk) {
            if (phase < 1000) {
                let buffer;
                if (rxBuffer) {
                    buffer = Buffer.concat([ rxBuffer, chunk ]);
                } else {
                    buffer = chunk;
                }

                let start = 0, index = 0;

                let processNextLine = undefined;

                const callback = function(err, result, transition) {
                    if (err) {
                        write('-ERROR: ' + JSON.stringify(err.toString()) + '\r\n');
                    } else {
                        write(result.toString() + '\r\n');

                        if (transition === false) {
                            socket.end();
                            connectionInfo.socket = null;
                        } else if (transition === true) {
                            phase = 1000;

                            _this.emit('connection', connectionInfo);
                        }

                        processNextLine();
                    }
                };

                const processLine = function(line) {
                    let md;
                    if ((md = /^CONNECT (.*)$/.exec(line))) {
                        connectionInfo.viaTag = md [1];
                        callback(null, '+OK');
                    } else if ((md = /^PASS (.*)$/.exec(line))) {
                        connectionInfo.password = md [1];
                        callback(null, '+OK');
                    } else if ((md = /^CHANNELLIST$/.exec(line))) {
                        const response = _.reduce(_this.channels, function(memo, channel, index) {
                            if (channel) {
                                memo.push('*' + index + ':' + channel);
                            }
                            return memo;
                        }, []).join('\r\n');

                        callback(null, response + '\r\n+OK');
                    } else if ((md = /^CHANNEL (.*)$/.exec(line))) {
                        connectionInfo.channel = md [1];
                        callback(null, '+OK');
                    } else if ((md = /^QUIT$/.exec(line))) {
                        callback(null, '+OK', false);
                    } else if ((md = /^DATA$/.exec(line))) {
                        callback(null, '+OK', true);
                    } else {
                        callback('Unknown command');
                    }
                };

                processNextLine = function() {
                    if ((index < buffer.length) && (phase < 1000)) {
                        while (index < buffer.length) {
                            if ((buffer [index] === 13) || (buffer [index] === 10)) {
                                if (start < index) {
                                    const line = buffer.toString('utf8', start, index);
                                    start = index + 1;
                                    processLine(line);
                                    break;
                                } else {
                                    start = index + 1;
                                }
                            }

                            index++;
                        }
                    } else {
                        if (start < buffer.length) {
                            if (phase >= 1000) {
                                // _this._write(buffer.slice(start));

                                rxBuffer = null;
                            } else {
                                rxBuffer = buffer.slice(start);
                            }
                        } else {
                            rxBuffer = null;
                        }
                    }
                };

                processNextLine();
            // } else {
            //     _this._write(chunk);
            }
        };

        const onEnd = function() {

        };

        const onError = function() {

        };

        const onTimeout = function() {

        };

        socket.on('data', onData);
        socket.on('end', onEnd);
        socket.on('error', onError);
        socket.setTimeout(30000, onTimeout);
        socket.setKeepAlive(true, 60000);

        write('+HELLO: This is TcpConnectionEndpoint, at your service!\r\n');
    },

});



module.exports = TcpConnectionEndpoint;
