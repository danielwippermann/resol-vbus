/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const dgram = require('dgram');
const http = require('http');
const url = require('url');


const _ = require('./lodash');
const TcpDataSource = require('./tcp-data-source');
const Q = require('./q');
const utils = require('./utils');

const DataSourceProvider = require('./data-source-provider');



const optionKeys = [
    'broadcastAddress',
    'broadcastPort',
];



const TcpDataSourceProvider = DataSourceProvider.extend(/** @lends TcpDataSourceProvider# */ {

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
    constructor(options) {
        DataSourceProvider.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    discoverDataSources() {
        const _this = this;

        const options = {
            broadcastAddress: this.broadcastAddress,
            broadcastPort: this.broadcastPort,
        };

        return Q.fcall(() => {
            return TcpDataSourceProvider.discoverDevices(options);
        }).then((results) => {
            return _.map(results, (result) => {
                const options = _.extend({}, result, {
                    host: result.__address__
                });

                return _this.createDataSource(options);
            });
        });
    },

    createDataSource(options) {
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
    discoverDevices(options) {
        return TcpDataSourceProvider.sendBroadcast(options).then((promises) => {
            return new Promise(resolve => {
                const results = [];
                let promiseIndex = 0;

                function nextPromise() {
                    if (promiseIndex < promises.length) {
                        const promise = promises [promiseIndex];
                        promiseIndex += 1;

                        promise.then(result => {
                            results.push(result);
                            nextPromise();
                        }, () => {
                            nextPromise();
                        });
                    } else {
                        resolve(results);
                    }
                }

                nextPromise();
            });
        });
    },

    sendBroadcast(options) {
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

        const bcastAddress = options.broadcastAddress;
        const bcastPort = options.broadcastPort;

        const addressMap = {};

        const queryString = '---RESOL-BROADCAST-QUERY---';
        const replyString = '---RESOL-BROADCAST-REPLY---';

        let tries = 0;

        const socket = dgram.createSocket('udp4');

        const sendQuery = function() {
            if (tries < options.tries) {
                tries++;

                const queryBuffer = Buffer.from(queryString);
                socket.send(queryBuffer, 0, queryBuffer.length, bcastPort, bcastAddress);

                setTimeout(sendQuery, options.timeout);
            } else {
                const keys = _.keys(addressMap).sort();

                const result = _.map(keys, (key) => {
                    return addressMap [key];
                });

                socket.close();

                done(null, result);
            }
        };

        socket.bind(0, () => {
            socket.setBroadcast(true);

            sendQuery();
        });

        socket.on('message', (msg, rinfo) => {
            if ((rinfo.family === 'IPv4') && (rinfo.port === 7053) && (msg.length >= replyString.length)) {
                const msgString = msg.slice(0, replyString.length).toString();
                if (msgString === replyString) {
                    const address = rinfo.address;
                    if (!_.has(addressMap, address)) {
                        addressMap [address] = options.fetchCallback(address);
                    }
                }
            }
        });

        socket.on('error', (err) => {
            socket.close();

            done(err);
        });

        return promise;
    },

    fetchDeviceInformation(address, port) {
        if (port === undefined) {
            return Q.fcall(() => {
                return TcpDataSourceProvider.fetchDeviceInformation(address, 80);
            }).fail(() => {
                return TcpDataSourceProvider.fetchDeviceInformation(address, 3000);
            });
        } else {
            return utils.promise((resolve, reject) => {
                let portSuffix;
                if (port !== 80) {
                    portSuffix = ':' + port;
                } else {
                    portSuffix = '';
                }

                const reqUrl = new url.URL('http://' + address + portSuffix + '/cgi-bin/get_resol_device_information');

                const req = http.get(reqUrl, (res) => {
                    if (res.statusCode === 200) {
                        let buffer = Buffer.alloc(0);

                        res.on('data', (chunk) => {
                            buffer = Buffer.concat([ buffer, chunk ]);
                        });

                        res.on('end', () => {
                            const bodyString = buffer.toString();
                            const info = _.extend(TcpDataSourceProvider.parseDeviceInformation(bodyString), {
                                __address__: address,
                            });
                            resolve(info);
                        });

                        res.on('error', (err) => {
                            reject(err);
                        });
                    } else {
                        reject(new Error('HTTP request returned status ' + res.statusCode));
                    }
                });

                req.on('error', (err) => {
                    reject(err);
                });

                req.setTimeout(10000, () => {
                    reject(new Error('HTTP request timed out'));
                });
            });
        }
    },

    parseDeviceInformation(string) {
        const result = {};

        const re = /([\w]+)[\s]*=[\s]*"([^"\r\n]*)"/g;

        let md;
        while ((md = re.exec(string)) !== null) {
            result [md [1]] = md [2];
        }

        return result;
    },

});



module.exports = TcpDataSourceProvider;
