/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Q = require('q');


const expect = require('./expect');
const vbus = require('./resol-vbus');



const TcpConnection = vbus.TcpConnection;
const TcpDataSource = vbus.TcpDataSource;



describe('TcpDataSource', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(TcpDataSource)
                .to.be.a('function')
                .that.has.a.property('extend')
                .that.is.a('function');
        });

        it('should have reasonable defaults', function() {
            const ds = new TcpDataSource();

            expect(ds)
                .to.have.a.property('host')
                .that.equals(null);
            expect(ds)
                .to.have.a.property('liveChannel')
                .that.equals(0);
            expect(ds)
                .to.have.a.property('livePassword')
                .that.equals('vbus');
        });

    });

    describe('#connectLive', function() {

        it('should be a method', function() {
            expect(TcpDataSource.prototype)
                .to.have.a.property('connectLive')
                .that.is.a('function');
        });

        promiseIt('should work correctly', function() {
            const originalConnect = TcpConnection.prototype.connect;

            TcpConnection.prototype.connect = sinon.spy(function() {
                return Q();
            });

            return Q.fcall(function() {
                const ds = new TcpDataSource();

                return ds.connectLive();
            }).then(function(connection) {
                expect(connection)
                    .to.be.instanceOf(TcpConnection);
            }).finally(function() {
                TcpConnection.prototype.connect = originalConnect;
            });
        });

    });

});
