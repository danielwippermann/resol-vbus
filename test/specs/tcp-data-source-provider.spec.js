/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const dgram = require('dgram');
const http = require('http');


const {
    DataSourceProvider,
    TcpDataSourceProvider,
} = require('./resol-vbus');


const {
    expect,
    itShouldBeAClass,
    expectOwnPropertyNamesToEqual,
} = require('./test-utils');



describe('TCP Data Source Provider', () => {

    itShouldBeAClass(TcpDataSourceProvider, DataSourceProvider, {
        id: 'tcp-data-source-provider',
        name: 'TCP VBus Data Source Provider',
        description: 'Data source provider for TCP connected VBus devices',
        broadcastAddress: '255.255.255.255',
        broadcastPort: 7053,
        constructor: Function,
        discoverDataSources: Function,
        createDataSource: Function,
    }, {
        discoverDevices: Function,
        sendBroadcast: Function,
        sendBroadcastIPv6: Function,
        fetchDeviceInformation: Function,
        parseDeviceInformation: Function,
    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const dsp = new TcpDataSourceProvider();

            expectOwnPropertyNamesToEqual(dsp, [
                'broadcastAddress',
                'broadcastPort',
            ]);

            expect(dsp.broadcastAddress).toBe('255.255.255.255');
            expect(dsp.broadcastPort).toBe(7053);
        });

        it('should copy selected options', () => {
            const options = {
                broadcastAddress: '0.0.0.0',
                broadcastPort: 3507,
                junk: 'JUNK',
            };

            const dsp = new TcpDataSourceProvider(options);

            expect(dsp.broadcastAddress).toBe(options.broadcastAddress);
            expect(dsp.broadcastPort).toBe(options.broadcastPort);
            expect(dsp.junk).toBe(undefined);
        });

    });

    describe('.parseDeviceInformation', () => {

        it('should work correctly', () => {
            const string = 'vendor = "RESOL"\r\nproduct = "DL3"\r\nserial = "001E660300F0"\r\nversion = "2.1.0"\r\nbuild = "201311280853"\r\nname = "DL3-001E660300F0"\r\nfeatures = "vbus,dl2,dl3"\r\n';

            const info = TcpDataSourceProvider.parseDeviceInformation(string);

            expectOwnPropertyNamesToEqual(info, [
                'vendor',
                'product',
                'serial',
                'version',
                'build',
                'name',
                'features',
            ]);

            expect(info.vendor).toBe('RESOL');
            expect(info.product).toBe('DL3');
            expect(info.serial).toBe('001E660300F0');
            expect(info.version).toBe('2.1.0');
            expect(info.build).toBe('201311280853');
            expect(info.name).toBe('DL3-001E660300F0');
            expect(info.features).toBe('vbus,dl2,dl3');
        });

    });

    describe('.fetchDeviceInformation', () => {

        it('should work correctly', () => {
            return new Promise((resolve, reject) => {
                let server = undefined;

                const cleanup = () => {
                    if (server) {
                        server.close();
                        server = null;
                    }
                };

                const onListening = async function() {
                    try {
                        const address = server.address();

                        let host = address.address;
                        if ((address.family === 'IPv6') && (host.indexOf(':') >= 0)) {
                            host = '[' + host + ']';
                        }

                        const info = await TcpDataSourceProvider.fetchDeviceInformation(host, address.port);

                        expectOwnPropertyNamesToEqual(info, [
                            '__address__',
                            'vendor',
                            'product',
                            'serial',
                            'version',
                            'build',
                            'name',
                            'features',
                        ]);

                        expect(info.__address__).toBe('127.0.0.1');
                        expect(info.vendor).toBe('RESOL');
                        expect(info.product).toBe('DL3');
                        expect(info.serial).toBe('001E660300F0');
                        expect(info.version).toBe('2.1.0');
                        expect(info.build).toBe('201311280853');
                        expect(info.name).toBe('DL3-001E660300F0');
                        expect(info.features).toBe('vbus,dl2,dl3');

                        resolve();
                    } catch (err) {
                        reject(err);
                    } finally {
                        cleanup();
                    }
                };

                const onRequest = function(req, res) {
                    if (req.url === '/cgi-bin/get_resol_device_information') {
                        res.statusCode = 200;
                        res.end('vendor = "RESOL"\r\nproduct = "DL3"\r\nserial = "001E660300F0"\r\nversion = "2.1.0"\r\nbuild = "201311280853"\r\nname = "DL3-001E660300F0"\r\nfeatures = "vbus,dl2,dl3"\r\n');
                    } else {
                        res.statusCode = 404;
                        res.end();
                    }
                };

                server = http.createServer(onRequest);

                server.on('error', err => {
                    cleanup();
                    reject(err);
                });

                server.listen(0, '127.0.0.1', onListening);
            });
        });
    });

    describe('.sendBroadcast', () => {

        it('should work correctly', async () => {
            const originalSend = dgram.Socket.prototype.send;
            const originalFDI = TcpDataSourceProvider.fetchDeviceInformation;

            dgram.Socket.prototype.send = sinon.spy(function() {
                this.emit('message', '---RESOL-BROADCAST-REPLY---', {
                    family: 'IPv4',
                    port: 7053,
                    address: 'ADDRESS',
                });
            });

            TcpDataSourceProvider.fetchDeviceInformation = sinon.spy(() => {
                return {};
            });

            try {
                const infos = await TcpDataSourceProvider.sendBroadcast({
                    timeout: 50,
                });

                expect(infos).toHaveLength(1);
                expect(dgram.Socket.prototype.send.callCount).toBe(3);
                expect(TcpDataSourceProvider.fetchDeviceInformation.callCount).toBe(1);
            } finally {
                dgram.Socket.prototype.send = originalSend;
                TcpDataSourceProvider.fetchDeviceInformation = originalFDI;
            }
        });

    });

    describe('.discoverDevices', () => {

        it('should work correctly', async () => {
            const originalSendBroadcast = TcpDataSourceProvider.sendBroadcast;

            TcpDataSourceProvider.sendBroadcast = sinon.spy(() => {
                return Promise.resolve([
                    Promise.reject(new Error('Failed')),
                    Promise.resolve({ address: 'ADDRESS' }),
                ]);
            });

            try {
                const infos = await TcpDataSourceProvider.discoverDevices();

                expect(infos).toHaveLength(1);
                expect(infos [0].address).toBe('ADDRESS');
                expect(TcpDataSourceProvider.sendBroadcast.callCount).toBe(1);
            } finally {
                TcpDataSourceProvider.sendBroadcast = originalSendBroadcast;
            }
        });

    });

    describe('#discoverDataSources', () => {

        it('should work correctly', async () => {
            const originalDiscoverDevices = TcpDataSourceProvider.discoverDevices;

            TcpDataSourceProvider.discoverDevices = sinon.spy(() => {
                return Promise.resolve([
                    { __address__: 'ADDRESS' },
                ]);
            });

            const dsp = new TcpDataSourceProvider();

            try {
                const dataSources = await dsp.discoverDataSources();
                expect(dataSources).toHaveLength(1);
                expect(TcpDataSourceProvider.discoverDevices.callCount).toBe(1);
            } finally {
                TcpDataSourceProvider.discoverDevices = originalDiscoverDevices;
            }
        });

    });

});
