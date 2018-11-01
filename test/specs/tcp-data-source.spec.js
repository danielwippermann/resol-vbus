/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const Q = require('./q');
const vbus = require('./resol-vbus');



const TcpConnection = vbus.TcpConnection;
const TcpDataSource = vbus.TcpDataSource;



describe('TcpDataSource', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(TcpDataSource)
                .to.be.a('function')
                .that.has.a.property('extend')
                .that.is.a('function');
        });

        it('should have reasonable defaults', () => {
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

    describe('#connectLive', () => {

        it('should be a method', () => {
            expect(TcpDataSource.prototype)
                .to.have.a.property('connectLive')
                .that.is.a('function');
        });

        it('should work correctly', () => {
            const originalConnect = TcpConnection.prototype.connect;

            TcpConnection.prototype.connect = sinon.spy(() => {
                return Q();
            });

            const promise = Q.fcall(() => {
                const ds = new TcpDataSource();

                return ds.connectLive();
            }).then((connection) => {
                expect(connection)
                    .to.be.instanceOf(TcpConnection);
            });

            return vbus.utils.promiseFinally(promise, () => {
                TcpConnection.prototype.connect = originalConnect;
            });
        });

    });

});
