/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const dgram = require('dgram');
const http = require('http');


const Q = require('q');


const expect = require('./expect');
const vbus = require('./resol-vbus');



const TcpDataSourceProvider = vbus.TcpDataSourceProvider;



describe('TCP Data Source Provider', function() {

    describe('constructor', function() {

        it('should be a constructor', function() {
            expect(TcpDataSourceProvider).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            const dsp = new TcpDataSourceProvider();

            expect(dsp).property('broadcastAddress').equals('255.255.255.255');
            expect(dsp).property('broadcastPort').equals(7053);
        });

        it('should copy selected options', function() {
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

    describe('.parseDeviceInformation', function() {

        it('should be a function', function() {
            expect(TcpDataSourceProvider.parseDeviceInformation).to.be.a('function');
        });

        it('should work correctly', function() {
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

    describe('.fetchDeviceInformation', function() {

        it('should be a function', function() {
            expect(TcpDataSourceProvider.fetchDeviceInformation).to.be.a('function');
        });

        it('should work correctly', function(done) {
            let server = undefined;

            const onFetch = function(info) {
                server.close();

                expect(info).to.be.an('object');
                expect(info.vendor).to.equal('RESOL');
                expect(info.product).to.equal('DL3');
                expect(info.serial).to.equal('001E660300F0');
                expect(info.version).to.equal('2.1.0');
                expect(info.build).to.equal('201311280853');
                expect(info.name).to.equal('DL3-001E660300F0');
                expect(info.features).to.equal('vbus,dl2,dl3');

                done();
            };

            const onListening = function() {
                const address = server.address();

                let host = address.address;
                if ((address.family === 'IPv6') && (host.indexOf(':') >= 0)) {
                    host = '[' + host + ']';
                }

                TcpDataSourceProvider.fetchDeviceInformation(host, address.port).then(onFetch, done);
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

            server = http.createServer(onRequest).listen(0, '127.0.0.1', onListening);
        });

    });

    describe('.sendBroadcast', function() {

        it('should be a function', function() {
            expect(TcpDataSourceProvider)
                .to.have.a.property('sendBroadcast')
                .that.is.a('function');
        });

        promiseIt('should work correctly', function() {
            const originalSend = dgram.Socket.prototype.send;
            const originalFDI = TcpDataSourceProvider.fetchDeviceInformation;

            dgram.Socket.prototype.send = sinon.spy(function() {
                this.emit('message', '---RESOL-BROADCAST-REPLY---', {
                    family: 'IPv4',
                    port: 7053,
                    address: 'ADDRESS',
                });
            });

            TcpDataSourceProvider.fetchDeviceInformation = sinon.spy(function() {
                return {};
            });

            return Q.fcall(function() {
                return TcpDataSourceProvider.sendBroadcast({
                    timeout: 50,
                });
            }).then(function(infos) {
                expect(infos).lengthOf(1);
                expect(dgram.Socket.prototype.send.callCount).equal(3);
                expect(TcpDataSourceProvider.fetchDeviceInformation).property('callCount').equal(1);
            }).finally(function() {
                dgram.Socket.prototype.send = originalSend;
                TcpDataSourceProvider.fetchDeviceInformation = originalFDI;
            });
        });

    });

    describe('.discoverDevices', function() {

        it('should be a function', function() {
            expect(TcpDataSourceProvider)
                .to.have.a.property('discoverDevices')
                .that.is.a('function');
        });

        promiseIt('should work correctly', function() {
            const originalSendBroadcast = TcpDataSourceProvider.sendBroadcast;

            TcpDataSourceProvider.sendBroadcast = sinon.spy(function() {
                return Q([
                    Q.reject(new Error('Failed')),
                    Q({ address: 'ADDRESS' }),
                ]);
            });

            return Q.fcall(function() {
                return TcpDataSourceProvider.discoverDevices();
            }).then(function(infos) {
                expect(infos).lengthOf(1);
                expect(infos [0]).property('address').equals('ADDRESS');
                expect(TcpDataSourceProvider.sendBroadcast).property('callCount').equal(1);
            }).finally(function() {
                TcpDataSourceProvider.sendBroadcast = originalSendBroadcast;
            });
        });

    });

    describe('#discoverDataSources', function() {

        it('should be a method', function() {
            expect(TcpDataSourceProvider.prototype).property('discoverDataSources').a('function');
        });

        promiseIt('should work correctly', function() {
            const originalDiscoverDevices = TcpDataSourceProvider.discoverDevices;

            TcpDataSourceProvider.discoverDevices = sinon.spy(function() {
                return Q([
                    { __address__ : 'ADDRESS' },
                ]);
            });

            const dsp = new TcpDataSourceProvider();

            return Q.fcall(function() {
                return dsp.discoverDataSources();
            }).then(function(dataSources) {
                expect(dataSources).a('array').lengthOf(1);
                expect(TcpDataSourceProvider.discoverDevices).property('callCount').equals(1);
            }).finally(function() {
                TcpDataSourceProvider.discoverDevices = originalDiscoverDevices;
            });
        });

    });
});
