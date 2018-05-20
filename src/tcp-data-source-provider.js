/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var dgram = require('dgram');
var http = require('http');
var url = require('url');


var Q = require('q');


var _ = require('./lodash');
var TcpDataSource = require('./tcp-data-source');
var utils = require('./utils');

var DataSourceProvider = require('./data-source-provider');



var optionKeys = [
    'broadcastAddress',
    'broadcastPort',
];



var TcpDataSourceProvider = DataSourceProvider.extend(/** @lends TcpDataSourceProvider# */ {

    id: 'tcp-data-source-provider',

    name: 'TCP VBus Data Source Provider',

    description: 'Data source provider for TCP connected VBus devices',

    broadcastAddress: '255.255.255.255',

    broadcastPort: 7053,

    /**
     * Creates a new TcpDataSourceProvider instance.
     *
     * @constructs
     * @augments DataSourceProvider
     */
    constructor: function(options) {
        DataSourceProvider.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    discoverDataSources: function() {
        var _this = this;

        var options = {
            broadcastAddress: this.broadcastAddress,
            broadcastPort: this.broadcastPort,
        };

        return Q.fcall(function() {
            return TcpDataSourceProvider.discoverDevices(options);
        }).then(function(results) {
            return _.map(results, function(result) {
                var options = _.extend({}, result, {
                    host: result.__address__
                });

                return _this.createDataSource(options);
            });
        });
    },

    createDataSource: function(options) {
        options = _.extend({}, options, {
            provider: this.id,
            id: options.__address__,
            name: options.name || options.__address__,
            host: options.__address__,
        });

        return new TcpDataSource(options);
    },

}, /** @lends TcpDataSourceProvider */ {

    /**
     * Discovers devices on the local network.
     *
     * @params {object} options
     * @params {string} options.broadcastAddress IP address to broadcast to
     * @params {number} options.broadcastPort Port number to broadcast to.
     * @returns {Promise} A Promise that resolves to an array of device information objects.
     */
    discoverDevices: function(options) {
        return TcpDataSourceProvider.sendBroadcast(options).then(function(promises) {
            return Q.allSettled(promises);
        }).then(function(results) {
            return _.reduce(results, function(memo, result) {
                if (result.state === 'fulfilled') {
                    memo.push(result.value);
                }
                return memo;
            }, []);
        });
    },

    sendBroadcast: function(options) {
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

        options = _.defaults({}, options, {
            broadcastAddress: '255.255.255.255',
            broadcastPort: 7053,
            tries: 3,
            timeout: 500,
        });

        if (options.fetchCallback === undefined) {
            options.fetchCallback = function(address) {
                return TcpDataSourceProvider.fetchDeviceInformation(address);
            };
        }

        var bcastAddress = options.broadcastAddress;
        var bcastPort = options.broadcastPort;

        var addressMap = {};

        var queryString = '---RESOL-BROADCAST-QUERY---';
        var replyString = '---RESOL-BROADCAST-REPLY---';

        var tries = 0;

        var socket = dgram.createSocket('udp4');

        var sendQuery = function() {
            if (tries < options.tries) {
                tries++;

                var queryBuffer = new Buffer(queryString);
                socket.send(queryBuffer, 0, queryBuffer.length, bcastPort, bcastAddress);

                setTimeout(sendQuery, options.timeout);
            } else {
                var keys = _.keys(addressMap).sort();

                var result = _.map(keys, function(key) {
                    return addressMap [key];
                });

                socket.close();

                done(null, result);
            }
        };

        socket.bind(0, function() {
            socket.setBroadcast(true);

            sendQuery();
        });

        socket.on('message', function(msg, rinfo) {
            if ((rinfo.family === 'IPv4') && (rinfo.port === 7053) && (msg.length >= replyString.length)) {
                var msgString = msg.slice(0, replyString.length).toString();
                if (msgString === replyString) {
                    var address = rinfo.address;
                    if (!_.has(addressMap, address)) {
                        addressMap [address] = options.fetchCallback(address);
                    }
                }
            }
        });

        socket.on('error', function(err) {
            socket.close();

            done(err);
        });

        return promise;
    },

    fetchDeviceInformation: function(address, port) {
        if (port === undefined) {
            return Q.fcall(function() {
                return TcpDataSourceProvider.fetchDeviceInformation(address, 80);
            }).fail(function() {
                return TcpDataSourceProvider.fetchDeviceInformation(address, 3000);
            });
        } else {
            return utils.promise(function(resolve, reject) {
                var portSuffix;
                if (port !== 80) {
                    portSuffix = ':' + port;
                } else {
                    portSuffix = '';
                }

                var reqUrl = url.parse('http://' + address + portSuffix + '/cgi-bin/get_resol_device_information');

                var req = http.get(reqUrl, function(res) {
                    if (res.statusCode === 200) {
                        var buffer = new Buffer(0);

                        res.on('data', function(chunk) {
                            buffer = Buffer.concat([ buffer, chunk ]);
                        });

                        res.on('end', function() {
                            var bodyString = buffer.toString();
                            var info = _.extend(TcpDataSourceProvider.parseDeviceInformation(bodyString), {
                                __address__: address,
                            });
                            resolve(info);
                        });

                        res.on('error', function(err) {
                            reject(err);
                        });
                    } else {
                        reject(new Error('HTTP request returned status ' + res.statusCode));
                    }
                });

                req.on('error', function(err) {
                    reject(err);
                });

                req.setTimeout(10000, function() {
                    reject(new Error('HTTP request timed out'));
                });
            });
        }
    },

    parseDeviceInformation: function(string) {
        var result = {};

        var re = /([\w]+)[\s]*=[\s]*"([^"\r\n]*)"/g;

        var md;
        while ((md = re.exec(string)) !== null) {
            result [md [1]] = md [2];
        }

        return result;
    },

});



module.exports = TcpDataSourceProvider;
