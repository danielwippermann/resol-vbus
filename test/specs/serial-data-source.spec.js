/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    DataSource,
    SerialConnection,
    SerialDataSource,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('SerialDataSource', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(SerialDataSource).to.be.a('function');
        });

        it('should have reasonable defaults', () => {
            const ds = new SerialDataSource();

            expect(ds)
                .to.have.a.property('path')
                .that.equal(null);
        });

    });

    describe('#connectLive', () => {

        it('should be a method', () => {
            expect(SerialDataSource.prototype)
                .to.have.a.property('connectLive')
                .that.is.a('function');
        });

        it('should work correctly', async () => {
            const originalConnect = SerialConnection.prototype.connect;

            SerialConnection.prototype.connect = function() {
                return Promise.resolve(null);
            };

            const ds = new SerialDataSource();

            try {
                const connection = await ds.connectLive();

                expect(connection)
                    .to.be.instanceOf(SerialConnection);
            } finally {
                SerialConnection.prototype.connect = originalConnect;
            }
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(SerialDataSource, DataSource, {
        path: null,
        constructor: Function,
        connectLive: Function,
    }, {

    });

});
