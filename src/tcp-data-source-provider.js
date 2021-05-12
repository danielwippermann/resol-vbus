/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const dgram = require('dgram');
const http = require('http');


const _ = require('./lodash');
const TcpDataSource = require('./tcp-data-source');
const { promisify } = require('./utils');

const DataSourceProvider = require('./data-source-provider');



const optionKeys = [
    'broadcastAddress',
    'broadcastPort',
];



class TcpDataSourceProvider extends DataSourceProvider {

    /**
     * Creates a new TcpDataSourceProvider instance.
     *
     * @constructs
     * @augments DataSourceProvider
     */
    constructor(options) {
        super(options);

        _.extend(this, _.pick(options, optionKeys));
    }

    async discoverDataSources() {
        const options = {
            broadcastAddress: this.broadcastAddress,
            broadcastPort: this.broadcastPort,
        };

        const results = await TcpDataSourceProvider.discoverDevices(options);

        return results.map((result) => {
            const options = _.extend({}, result, {
                host: result.__address__
            });

            return this.createDataSource(options);
        });
    }

    createDataSource(options) {
        options = _.extend({}, options, {
            provider: this.id,
            id: options.__address__,
            name: options.name || options.__address__,
            host: options.__address__,
        });

        return new TcpDataSource(options);
    }

    /**
     * Discovers devices on the local network.
     *
     * @params {object} options
     * @params {string} options.broadcastAddress IP address to broadcast to
     * @params {number} options.broadcastPort Port number to broadcast to.
     * @returns {Promise} A Promise that resolves to an array of device information objects.
     */
    static async discoverDevices(options) {
        const promises = await TcpDataSourceProvider.sendBroadcast(options);

        const result = [];
        for (const promise of promises) {
            try {
                const info = await promise;
                result.push(info);
            } catch (err) {
                // nop
            }
        }

        return result;
    }

    static async sendBroadcast(options) {
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

        const queryString = '---RESOL-BROADCAST-QUERY---';
        const replyString = '---RESOL-BROADCAST-REPLY---';

        const socket = dgram.createSocket('udp4');

        socket.on('error', (err) => {
            socket.close();

            console.log(err);
        });

        const addressList = [];

        socket.on('message', (msg, rinfo) => {
            if ((rinfo.family === 'IPv4') && (rinfo.port === 7053) && (msg.length >= replyString.length)) {
                const msgString = msg.slice(0, replyString.length).toString();
                if (msgString === replyString) {
                    const { address } = rinfo;
                    if (addressList.indexOf(address) < 0) {
                        addressList.push(address);
                    }
                }
            }
        });

        await promisify(cb => socket.bind(0, cb));

        socket.setBroadcast(true);

        for (let tries = 0; tries < options.tries; tries++) {
            const queryBuffer = Buffer.from(queryString);
            socket.send(queryBuffer, 0, queryBuffer.length, bcastPort, bcastAddress);

            await promisify(cb => setTimeout(cb, options.timeout));
        }

        socket.close();

        const result = addressList.map(async (address) => {
            return options.fetchCallback(address);
        });

        return result;
    }

    static async fetchDeviceInformation(address, port) {
        if (port === undefined) {
            try {
                return await TcpDataSourceProvider.fetchDeviceInformation(address, 80);
            } catch (err) {
                return await TcpDataSourceProvider.fetchDeviceInformation(address, 3000);
            }
        } else {
            return new Promise((resolve, reject) => {
                let portSuffix;
                if (port !== 80) {
                    portSuffix = ':' + port;
                } else {
                    portSuffix = '';
                }

                const reqUrl = 'http://' + address + portSuffix + '/cgi-bin/get_resol_device_information';

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
    }

    static parseDeviceInformation(string) {
        const result = {};

        const re = /([\w]+)[\s]*=[\s]*"([^"\r\n]*)"/g;

        let md;
        while ((md = re.exec(string)) !== null) {
            result [md [1]] = md [2];
        }

        return result;
    }

}


Object.assign(TcpDataSourceProvider.prototype, /** @lends TcpDataSourceProvider.prototype */ {

    id: 'tcp-data-source-provider',

    name: 'TCP VBus Data Source Provider',

    description: 'Data source provider for TCP connected VBus devices',

    broadcastAddress: '255.255.255.255',

    broadcastPort: 7053,

});



module.exports = TcpDataSourceProvider;
