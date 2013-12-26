/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var dgram = require('dgram');
var http = require('http');
var url = require('url');


var _ = require('lodash');
var Q = require('q');


var TcpDataSource = require('./tcp-data-source');

var DataSourceProvider = require('./data-source-provider');



var optionKeys = [
    'broadcastAddress',
    'broadcastPort',
];



var TcpDataSourceProvider = DataSourceProvider.extend({

    id: 'tcp-data-source-provider',

    name: 'TCP VBus Data Source Provider',

    description: 'Data source provider for TCP connected VBus devices',

    broadcastAddress: '255.255.255.255',

    broadcastPort: 7053,

    constructor: function(options) {
        DataSourceProvider.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    discoverDataSources: function() {
        var _this = this;

        return this.sendBroadcast(function(address) {
            return _this.fetchDeviceInformation(address);
        }).then(function(promises) {
            return Q.allSettled(promises);
        }).then(function(results) {
            return _.reduce(results, function(memo, result) {
                if (result.state === 'fulfilled') {
                    memo.push(result.value);
                }
                return memo;
            }, []);
        }).then(function(results) {
            return _.map(results, function(result) {
                return new TcpDataSource({
                    provider: _this.id,
                    id: result.__address__,
                    name: result.name || result.__address__,
                    host: result.__address__,
                });
            });
        });
    },

    createDataSource: function(options) {
        return new TcpDataSource(options);
    },

    sendBroadcast: function(callback) {
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

        var bcastAddress = this.broadcastAddress;
        var bcastPort = this.broadcastPort;

        var addressMap = {};

        var queryString = '---RESOL-BROADCAST-QUERY---';
        var replyString = '---RESOL-BROADCAST-REPLY---';

        var tries = 3;

        var socket = dgram.createSocket('udp4');

        var sendQuery = function() {
            if (tries > 0) {
                tries--;

                var queryBuffer = new Buffer(queryString);
                socket.send(queryBuffer, 0, queryBuffer.length, bcastPort, bcastAddress);

                setTimeout(sendQuery, 500);
            } else {
                var keys = _.keys(addressMap).sort();
                
                var result = _.map(keys, function(key) {
                    return addressMap [key];
                });

                socket.close();

                done(null, result);
            }
        };

        socket.bind(bcastPort, function() {
            socket.setBroadcast(true);

            sendQuery();
        });

        socket.on('message', function(msg, rinfo) {
            if ((rinfo.family === 'IPv4') && (rinfo.port === 7053) && (msg.length >= replyString.length)) {
                var msgString = msg.slice(0, replyString.length).toString();
                if (msgString === replyString) {
                    var address = rinfo.address;
                    if (!_.has(addressMap, address)) {
                        addressMap [address] = callback(address);
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
        var _this = this;

        if (port === undefined) {
            port = 80;
        }

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
                    var info = _.extend(_this.parseDeviceInformation(bodyString), {
                        __address__: address,
                    });
                    done(null, info);
                });

                res.on('error', function(err) {
                    done(err);
                });
            } else {
                done(new Error('HTTP request returned status ' + res.statusCode));
            }
        });

        req.on('error', function(err) {
            done(err);
        });

        req.setTimeout(10000, function() {
            done(new Error('HTTP request timed out'));
        });

        return promise;
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
