/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const dgram = require('dgram');
const http = require('http');


const {
    DataSourceProvider,
    TcpDataSourceProvider,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('TCP Data Source Provider', () => {

    describe('constructor', () => {

        it('should be a constructor', () => {
            expect(TcpDataSourceProvider).to.be.a('function');
        });

        it('should have reasonable defaults', () => {
            const dsp = new TcpDataSourceProvider();

            expect(dsp).property('broadcastAddress').equals('255.255.255.255');
            expect(dsp).property('broadcastPort').equals(7053);
        });

        it('should copy selected options', () => {
            const options = {
                broadcastAddress: '0.0.0.0',
                broadcastPort: 3507,
                junk: 'JUNK',
            };

            const dsp = new TcpDataSourceProvider(options);

            expect(dsp).property('broadcastAddress').equals(options.broadcastAddress);
            expect(dsp).property('broadcastPort').equals(options.broadcastPort);
            expect(dsp).not.property('junk');
        });

    });

    describe('.parseDeviceInformation', () => {

        it('should be a function', () => {
            expect(TcpDataSourceProvider.parseDeviceInformation).to.be.a('function');
        });

        it('should work correctly', () => {
            const string = 'vendor = "RESOL"\r\nproduct = "DL3"\r\nserial = "001E660300F0"\r\nversion = "2.1.0"\r\nbuild = "201311280853"\r\nname = "DL3-001E660300F0"\r\nfeatures = "vbus,dl2,dl3"\r\n';

            const info = TcpDataSourceProvider.parseDeviceInformation(string);

            expect(info).to.be.an('object');
            expect(info.vendor).to.equal('RESOL');
            expect(info.product).to.equal('DL3');
            expect(info.serial).to.equal('001E660300F0');
            expect(info.version).to.equal('2.1.0');
            expect(info.build).to.equal('201311280853');
            expect(info.name).to.equal('DL3-001E660300F0');
            expect(info.features).to.equal('vbus,dl2,dl3');
        });

    });

    describe('.fetchDeviceInformation', () => {

        it('should be a function', () => {
            expect(TcpDataSourceProvider.fetchDeviceInformation).to.be.a('function');
        });

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

                        expect(info).to.be.an('object');
                        expect(info.vendor).to.equal('RESOL');
                        expect(info.product).to.equal('DL3');
                        expect(info.serial).to.equal('001E660300F0');
                        expect(info.version).to.equal('2.1.0');
                        expect(info.build).to.equal('201311280853');
                        expect(info.name).to.equal('DL3-001E660300F0');
                        expect(info.features).to.equal('vbus,dl2,dl3');

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

        it('should be a function', () => {
            expect(TcpDataSourceProvider)
                .to.have.a.property('sendBroadcast')
                .that.is.a('function');
        });

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

                expect(infos).lengthOf(1);
                expect(dgram.Socket.prototype.send.callCount).equal(3);
                expect(TcpDataSourceProvider.fetchDeviceInformation).property('callCount').equal(1);
            } finally {
                dgram.Socket.prototype.send = originalSend;
                TcpDataSourceProvider.fetchDeviceInformation = originalFDI;
            }
        });

    });

    describe('.discoverDevices', () => {

        it('should be a function', () => {
            expect(TcpDataSourceProvider)
                .to.have.a.property('discoverDevices')
                .that.is.a('function');
        });

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

                expect(infos).lengthOf(1);
                expect(infos [0]).property('address').equals('ADDRESS');
                expect(TcpDataSourceProvider.sendBroadcast).property('callCount').equal(1);
            } finally {
                TcpDataSourceProvider.sendBroadcast = originalSendBroadcast;
            }
        });

    });

    describe('#discoverDataSources', () => {

        it('should be a method', () => {
            expect(TcpDataSourceProvider.prototype).property('discoverDataSources').a('function');
        });

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
                expect(dataSources).a('array').lengthOf(1);
                expect(TcpDataSourceProvider.discoverDevices).property('callCount').equals(1);
            } finally {
                TcpDataSourceProvider.discoverDevices = originalDiscoverDevices;
            }
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(TcpDataSourceProvider, DataSourceProvider, {
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

});
