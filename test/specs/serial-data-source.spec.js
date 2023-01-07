/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    DataSource,
    SerialConnection,
    SerialDataSource,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    itShouldBeAClass,
} = require('./test-utils');



describe('SerialDataSource', () => {

    itShouldBeAClass(SerialDataSource, DataSource, {
        path: null,
        constructor: Function,
        connectLive: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const ds = new SerialDataSource();

            expectOwnPropertyNamesToEqual(ds, [
                'path',

                // base class related
                'provider',
                'id',
                'name',
                'description',
                'isSupportingLiveData',
                'isSupportingCustomization',
            ]);

            expect(ds.path).toBe(null);
        });

    });

    describe('#connectLive', () => {

        it('should work correctly', async () => {
            const originalConnect = SerialConnection.prototype.connect;

            SerialConnection.prototype.connect = function() {
                return Promise.resolve(null);
            };

            const ds = new SerialDataSource();

            try {
                const connection = await ds.connectLive();

                expect(connection).toBeInstanceOf(SerialConnection);
            } finally {
                SerialConnection.prototype.connect = originalConnect;
            }
        });

    });

});
