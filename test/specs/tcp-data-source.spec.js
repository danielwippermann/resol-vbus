/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    DataSource,
    TcpConnection,
    TcpDataSource,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    itShouldBeAClass,
} = require('./test-utils');



describe('TcpDataSource', () => {

    itShouldBeAClass(TcpDataSource, DataSource, {
        host: null,
        port: 7053,
        liveChannel: 0,
        livePassword: 'vbus',
        constructor: Function,
        connectLive: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const ds = new TcpDataSource();

            expectOwnPropertyNamesToEqual(ds, [
                'host',
                'port',
                'liveChannel',
                'livePassword',
                'options',

                // base class related
                'provider',
                'id',
                'name',
                'description',
                'isSupportingLiveData',
                'isSupportingCustomization',
            ]);

            expect(ds.host).toBe(null);
            expect(ds.port).toBe(7053);
            expect(ds.liveChannel).toBe(0);
            expect(ds.livePassword).toBe('vbus');
            expect(ds.options).toBe(undefined);
        });

    });

    describe('#connectLive', () => {

        it('should work correctly', async () => {
            const originalConnect = TcpConnection.prototype.connect;

            TcpConnection.prototype.connect = jest.fn(async () => {
                // nop
            });

            try {
                const ds = new TcpDataSource();

                const connection = await ds.connectLive();

                expect(connection).toBeInstanceOf(TcpConnection);
            } finally {
                TcpConnection.prototype.connect = originalConnect;
            }
        });

    });

});
