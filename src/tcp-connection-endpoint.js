/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var net = require('net');


var _ = require('lodash');
var Q = require('q');


var Connection = require('./Connection');



var optionKeys = [
    'port',
];



var TcpConnectionEndpoint = Connection.extend({

    port: 7053,

    server: null,

    constructor: function(options) {
        Connection.call(this);

        _.extend(this, _.pick(options, optionKeys));
    },

    start: function() {
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

        var server = net.createServer(function(socket) {
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
        var _this = this;

        var phase = 0;
        var rxBuffer = null;

        var write = function() {
            return socket.write.apply(socket, arguments);
        };

        var onData = function(chunk) {
            if (phase < 1000) {
                var buffer;
                if (rxBuffer) {
                    buffer = Buffer.concat([ rxBuffer, chunk ]);
                } else {
                    buffer = chunk;
                }

                var start = 0, index = 0;

                var processNextLine;

                var callback = function(err, result, transition) {
                    if (err) {
                        write('-ERROR: ' + JSON.stringify(err.toString()) + '\r\n');
                    } else {
                        write(result.toString() + '\r\n');

                        if (transition === false) {
                            socket.end();
                        } else if (transition === true) {
                            phase = 1000;
                        }

                        processNextLine();
                    }
                };

                processNextLine = function() {
                    if ((index < buffer.length) && (phase < 1000)) {
                        while (index < buffer.length) {
                            if ((buffer [index] === 13) || (buffer [index] === 10)) {
                                if (start < index) {
                                    var line = buffer.toString('utf8', start, index);
                                    start = index + 1;
                                    _this.processLine(line, callback);
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
                                _this._write(buffer.slice(start));

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
            } else {
                _this._write(chunk);
            }
        };

        var onEnd = function() {

        };

        var onError = function() {

        };

        var onTimeout = function() {

        };

        socket.on('data', onData);
        socket.on('end', onEnd);
        socket.on('error', onError);
        socket.setTimeout(30000, onTimeout);
        socket.setKeepAlive(true, 60000);

        write('+HELLO: This is TcpConnectionEndpoint, at your service!\r\n');

        this.emit('connection', socket);
    },

    processLine: function(line, callback) {
        var md;
        if ((md = /^CONNECT (.*)$/.exec(line))) {
            this.viaTag = md [1];
            callback(null, '+OK');
        } else if ((md = /^PASS (.*)$/.exec(line))) {
            this.password = md [1];
            callback(null, '+OK');
        } else if ((md = /^CHANNELLIST$/.exec(line))) {
            callback(null, '*0:VBus\r\n+OK');
        } else if ((md = /^CHANNEL (.*)$/.exec(line))) {
            this.channel = md [1];
            callback(null, '+OK');
        } else if ((md = /^QUIT$/.exec(line))) {
            callback(null, '+OK', false);
        } else if ((md = /^DATA$/.exec(line))) {
            callback(null, '+OK', true);
        } else {
            callback('Unknown command');
        }
    }

});



module.exports = TcpConnectionEndpoint;
