/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { EventEmitter } = require('events');
const net = require('net');


const { applyDefaultOptions } = require('./utils');



function runAsync(fn) {
    async function runner() {
        return await fn();
    }
    return runner();
}

class TcpConnectionEndpoint extends EventEmitter {

    /**
     * Creates a new instance and optionally initializes its members.
     *
     * @constructs
     * @augments EventEmitter
     * @param {object} options The initialization values for this instance.
     * @param {number} options.port See {@link TcpConnectionEndpoint#port}
     * @param {string} options.password See {@link TcpConnectionEndpoint#password}
     * @param {string[]} options.channels See {@link TcpConnectionEndpoint#channels}
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
             * An optional async function that verifies the viaTag provided to the `CONNECT` command.
             * @type {function}
             */
            verifyViaTag: null,

            /**
             * The password to check against if the PASS command is received.
             * @type {string}
             */
            password: null,

            /**
             * An optional async function that verifies the password provided to the `PASS` command.
             * @type {function}
             */
            verifyPassword: null,

            /**
            * The list of channels to return if the CHANNELLIST command is received.
            * @type {string[]}
            */
            channels: null,

            /**
             * An optional async function that verifies the channel provided to the `CHANNEL` command.
             * @type {function}
             */
            verifyChannel: null,

            /**
             * An optional async function that verifies whether the `DATA` command succeeds.
             * @type {function}
             */
            verifyDataMode: null,

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
                        const viaTagString = md [1];
                        if (_this.verifyViaTag) {
                            runAsync(() => _this.verifyViaTag(viaTagString, connectionInfo)).then(() => {
                                connectionInfo.viaTag = viaTagString;
                                callback(null, '+OK');
                            }, err => callback(err));
                        } else {
                            connectionInfo.viaTag = viaTagString;
                            callback(null, '+OK');
                        }
                    } else if ((md = /^PASS (.*)$/.exec(line))) {
                        const passwordString = md [1];
                        if (_this.verifyPassword) {
                            runAsync(() => _this.verifyPassword(passwordString, connectionInfo)).then(() => {
                                connectionInfo.password = passwordString;
                                callback(null, '+OK');
                            }, err => callback(err));
                        } else if (!_this.password || (passwordString === _this.password)) {
                            connectionInfo.password = passwordString;
                            callback(null, '+OK');
                        } else {
                            callback(new Error('Password mismatch'));
                        }
                    } else if ((md = /^CHANNELLIST$/.exec(line))) {
                        const response = _this.channels.reduce((memo, channel, index) => {
                            if (channel) {
                                memo.push('*' + index + ':' + channel);
                            }
                            return memo;
                        }, []).join('\r\n');

                        callback(null, response + '\r\n+OK');
                    } else if ((md = /^CHANNEL (\d+)$/.exec(line))) {
                        const channelString = md [1];
                        const index = +channelString;
                        const channel = _this.channels [index];
                        if (_this.verifyChannel) {
                            runAsync(() => _this.verifyChannel(channelString, index, channel, connectionInfo)).then(() => {
                                connectionInfo.channel = channelString;
                                callback(null, '+OK');
                            }, err => callback(err));
                        } else if (channel) {
                            connectionInfo.channel = channelString;
                            callback(null, '+OK');
                        } else {
                            callback(new Error('Channel not available'));
                        }
                    } else if ((md = /^QUIT$/.exec(line))) {
                        callback(null, '+OK', false);
                    } else if ((md = /^DATA$/.exec(line))) {
                        if (_this.verifyDataMode) {
                            runAsync(() => _this.verifyDataMode(connectionInfo)).then(() => {
                                callback(null, '+OK', true);
                            }, err => callback(err));
                        } else {
                            callback(null, '+OK', true);
                        }
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
