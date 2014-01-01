/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var http = require('http');


var TcpDataSourceProvider = require('./resol-vbus').TcpDataSourceProvider;



describe('TCP Data Source Provider', function() {

    describe('constructor', function() {

        it('should be a constructor', function() {
            expect(TcpDataSourceProvider).to.be.a('function');
        });

    });

    describe('.parseDeviceInformation', function() {

        it('should be a function', function() {
            expect(TcpDataSourceProvider.parseDeviceInformation).to.be.a('function');
        });

        it('should work correctly', function() {
            var string = 'vendor = \"RESOL\"\r\nproduct = \"DL3\"\r\nserial = \"001E660300F0\"\r\nversion = \"2.1.0\"\r\nbuild = \"201311280853\"\r\nname = \"DL3-001E660300F0\"\r\nfeatures = \"vbus,dl2,dl3\"\r\n';

            var info = TcpDataSourceProvider.parseDeviceInformation(string);

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
            var server;

            var onFetch = function(info) {
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

            var onListening = function() {
                var address = server.address();

                TcpDataSourceProvider.fetchDeviceInformation(address.address, address.port).done(onFetch);
            };

            var onRequest = function(req, res) {
                if (req.url === '/cgi-bin/get_resol_device_information') {
                    res.statusCode = 200;
                    res.end('vendor = \"RESOL\"\r\nproduct = \"DL3\"\r\nserial = \"001E660300F0\"\r\nversion = \"2.1.0\"\r\nbuild = \"201311280853\"\r\nname = \"DL3-001E660300F0\"\r\nfeatures = \"vbus,dl2,dl3\"\r\n');
                } else {
                    res.statusCode = 404;
                    res.end();
                }
            };

            server = http.createServer(onRequest).listen(0, onListening);
        });

    });

});
