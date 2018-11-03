/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    TcpConnection,
    TcpDataSource,
} = require('./resol-vbus');


const expect = require('./expect');



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

        it('should work correctly', async () => {
            const originalConnect = TcpConnection.prototype.connect;

            TcpConnection.prototype.connect = sinon.spy(() => {
                return Promise.resolve();
            });

            try {
                const ds = new TcpDataSource();

                const connection = await ds.connectLive();

                expect(connection)
                    .to.be.instanceOf(TcpConnection);
            } finally {
                TcpConnection.prototype.connect = originalConnect;
            }
        });

    });

});
