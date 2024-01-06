/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const net = require('net');
const tls = require('tls');


const Connection = require('./connection');
const {
    applyDefaultOptions,
    hasOwnProperty,
    isNumber,
    isObject,
    isPromise,
    isString,
} = require('./utils');



class TcpConnection extends Connection {

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
     * @param {boolean} options.disableReconnect See {@link TcpConnection#disableReconnect}
     *
     * @classdesc
     * The TcpConnection class is primarily designed to provide access to VBus live data
     * using the VBus-over-TCP specification. That includes the VBus/LAN adapter, the
     * Dataloggers (DL2 and DL3) and VBus.net.
     * In addition to that it can be used to connect to a raw VBus data stream using TCP
     * (for example provided by a serial-to-LAN gateway).
     */
    constructor(options) {
        super(options);

        applyDefaultOptions(this, options, /** @lends TcpConnection.prototype */ {

            /**
            * Host name or IP address of the connection target.
            * @type {string}
            */
            host: null,

            /**
            * Port number of the connection target.
            * @type {number}
            */
            port: (options && options.tlsOptions) ? 57053 : 7053,

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

            channelListCallback: null,

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

            tlsOptions: null,

            /**
             * Disable automatic reconnect on connection interruption.
             * @type {boolean}
             */
            disableReconnect: false,

        });
    }

    async connect(force) {
        if (this.connectionState !== TcpConnection.STATE_DISCONNECTED) {
            throw new Error('Connection is not disconnected (' + this.connectionState + ')');
        }

        this._setConnectionState(TcpConnection.STATE_CONNECTING);

        return this._connect(force);
    }

    disconnect() {
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
    }

    _connect(force) {
        const _this = this;

        let socket;

        return new Promise((resolve, reject) => {
            const done = function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };

            const options = {
                host: this.host,
                port: this.port
            };

            let phase = this.rawVBusDataOnly ? 1000 : 0;
            let rxBuffer = null;

            const write = function() {
                return socket.write.apply(socket, arguments);
            };

            const onConnectionEstablished = function() {
                _this.reconnectTimeout = 0;

                _this._setConnectionState(TcpConnection.STATE_CONNECTED);

                done();
            };

            const onConnect = function() {
                if (phase === 1000) {
                    onConnectionEstablished();
                }
            };

            const changePhase = function (newPhase) {
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

            const channelList = [];

            const onLine = function(line) {
                let newPhase = -1;
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

                        const channelListCallbackDone = (err, channel) => {
                            if (err) {
                                _this.socket.destroy();
                                _this.socket = null;

                                _this._setConnectionState(TcpConnection.STATE_DISCONNECTED);

                                done(err);
                            } else {
                                if (channel !== undefined) {
                                    if (isNumber(channel)) {
                                        _this.channel = channel;
                                    } else if (isString(channel)) {
                                        _this.channel = parseInt(channel);
                                    } else if (isObject(channel) && hasOwnProperty(channel, 'channel')) {
                                        _this.channel = channel.channel;
                                    } else {
                                        done(new Error('Invalid channel selection ' + JSON.stringify(channel)));
                                    }
                                }

                                let newPhase;
                                if (_this.channel) {
                                    newPhase = 80;
                                } else {
                                    newPhase = 900;
                                }

                                process.nextTick(() => {
                                    changePhase(newPhase);
                                });
                            }
                        };

                        const channelListCallbackResult = _this.channelListCallback(channelList, channelListCallbackDone);
                        if (isPromise(channelListCallbackResult)) {
                            channelListCallbackResult.then(result => {
                                channelListCallbackDone(null, result);
                            }, err => {
                                channelListCallbackDone(err);
                            });
                        }
                    } else if (phase === 80) {
                        newPhase = 900;
                    } else if (phase === 900) {
                        newPhase = 1000;
                    }
                } else if (line [0] === '-') {
                    newPhase = 800;

                    const error = new Error('Remote side responded with ' + JSON.stringify(line));

                    switch (phase) {
                    case 20:
                        error.vbusPhase = 'CONNECT';
                        break;
                    case 40:
                        error.vbusPhase = 'PASS';
                        break;
                    case 60:
                        error.vbusPhase = 'CHANNELLIST';
                        break;
                    case 80:
                        error.vbusPhase = 'CHANNEL';
                        break;
                    case 900:
                        error.vbusPhase = 'DATA';
                        break;
                    }

                    done(error);
                } else if (line [0] === '*') {
                    if (phase === 60) {
                        const md = /^\*([\d]+):(.*)$/.exec(line);
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

                changePhase(newPhase);
            };

            const onSocketData = function(chunk) {
                // console.log('onData');

                if (phase < 1000) {
                    // console.log(chunk.toString('utf8'));

                    let buffer;
                    if (rxBuffer) {
                        buffer = Buffer.concat([ rxBuffer, chunk ]);
                    } else {
                        buffer = chunk;
                    }

                    let start = 0, index = 0;
                    /* eslint-disable-next-line no-unmodified-loop-condition */
                    while ((index < buffer.length) && (phase < 1000)) {
                        if ((buffer [index] === 13) || (buffer [index] === 10)) {
                            if (start < index) {
                                const line = buffer.toString('utf8', start, index);
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

            const onConnectionData = function(chunk) {
                write(chunk);
            };

            const onSocketTermination = function() {
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

                    if (!_this.disableReconnect) {
                        const timeout = _this.reconnectTimeout;
                        if (_this.reconnectTimeout < _this.reconnectTimeoutMax) {
                            _this.reconnectTimeout += _this.reconnectTimeoutIncr;
                        }

                        setTimeout(() => {
                            _this._setConnectionState(TcpConnection.STATE_RECONNECTING);

                            _this._connect();
                        }, timeout);
                    }
                }
            };

            const onEnd = function() {
                onSocketTermination();
            };

            const onError = function(/* err */) {
                socket.destroy();
                onSocketTermination();
            };

            const onTimeout = function() {
                socket.destroy();
                onSocketTermination();
            };

            this.on('data', onConnectionData);

            if (this.tlsOptions) {
                Object.assign(options, this.tlsOptions);
                socket = tls.connect(options, onConnect);
            } else {
                socket = net.connect(options, onConnect);
            }
            socket.on('data', onSocketData);
            socket.on('end', onEnd);
            socket.on('error', onError);
            socket.setTimeout(30000, onTimeout);
            socket.setKeepAlive(true, 60000);

            this.socket = socket;
        });
    }

}


Object.assign(TcpConnection.prototype, /** @lends TcpConnection.prototype */ {

    /**
     * Host name or IP address of the connection target.
     * @type {string}
     */
    host: null,

    /**
     * Port number of the connection target.
     * @type {number}
     */
    port: null,

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

    channelListCallback: null,

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

    tlsOptions: null,

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
     * Disable automatic reconnect on connection interruption.
     * @type {boolean}
     */
    disableReconnect: false,

});



module.exports = TcpConnection;
