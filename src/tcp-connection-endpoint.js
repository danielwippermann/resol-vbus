/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { EventEmitter } = require('events');
const net = require('net');


const { applyDefaultOptions } = require('./utils');



class TcpConnectionEndpoint extends EventEmitter {

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
    constructor(options) {
        super();

        applyDefaultOptions(this, options, /** @lends TcpConnectionEndpoint.prototype */ {

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

        });

        if (this.channels == null) {
            this.channels = [ 'VBus' ];
        }
    }

    /**
     * Starts the server to listen for incoming connections.
     *
     * @return {Promise} A promise that resolves when the server is started.
     */
    start() {
        const _this = this;

        return new Promise((resolve, reject) => {
            const done = function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };

            const server = net.createServer((socket) => {
                _this._onConnection(socket);
            });

            server.listen(this.port, () => {
                if (_this.port === 0) {
                    _this.port = server.address().port;
                }
                done(null, true);
            });

            server.on('error', (err) => {
                done(err);
            });

            this.server = server;
        });
    }

    stop() {
        if (this.server) {
            this.server.close();

            this.server = null;
        }
    }

    _onConnection(socket) {
        const _this = this;

        const connectionInfo = {
            socket,
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
                        const response = _this.channels.reduce((memo, channel, index) => {
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
                        callback(new Error('Unknown command'));
                    }
                };

                processNextLine = function() {
                    if (phase < 1000) {
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
                    }

                    if (start < buffer.length) {
                        if (phase >= 1000) {
                            rxBuffer = null;
                        } else {
                            rxBuffer = buffer.slice(start);
                        }
                    } else {
                        rxBuffer = null;
                    }
                };

                processNextLine();
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
    }

}


Object.assign(TcpConnectionEndpoint.prototype, /** @lends TcpConnectionEndpoint.prototype */ {

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

});



module.exports = TcpConnectionEndpoint;
