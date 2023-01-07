/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    DataSourceProvider,
    SerialDataSource,
    SerialDataSourceProvider,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectPromise,
    ifHasSerialPortIt,
    itShouldBeAClass,
} = require('./test-utils');



class TestableSerialDataSourceProvider extends SerialDataSourceProvider {

}



describe('SerialDataSourceProvider', () => {

    itShouldBeAClass(SerialDataSourceProvider, DataSourceProvider, {
        id: 'serial-data-source-provider',
        name: 'Serial VBus Data Source Provider',
        description: 'Data source provider for VBus devices connected using a serial port (incl. USB)',
        constructor: Function,
        discoverDataSources: Function,
        createDataSource: Function,
        _listSerialPorts: Function,
    }, {
        hasSerialPortSupport: expect.any(Boolean),
    });

    describe('constructor', () => {

        it('should work correctly', () => {
            const dsp = new SerialDataSourceProvider();

            expectOwnPropertyNamesToEqual(dsp, [
                // nothing
            ]);
        });

    });

    describe('#discoverDataSources', () => {

        ifHasSerialPortIt('should work correctly', async () => {
            const ports = [
                { comName: 'SERIALPORT1' },
                { comName: 'SERIALPORT2' },
            ];

            TestableSerialDataSourceProvider.prototype._listSerialPorts = sinon.spy((callback) => {
                callback(null, ports);
            });

            const dsp = new TestableSerialDataSourceProvider();

            const dataSources = await expectPromise(dsp.discoverDataSources());

            expect(dataSources).toHaveLength(ports.length);
        });

        ifHasSerialPortIt('should reject if an error occurs', async () => {
            TestableSerialDataSourceProvider.prototype._listSerialPorts = sinon.spy((callback) => {
                callback(new Error('ERROR'));
            });

            const dsp = new TestableSerialDataSourceProvider();

            await expect(async () => {
                await dsp.discoverDataSources();
            }).rejects.toThrow();
        });

    });

    describe('#createDataSource', () => {

        it('should work correctly', () => {
            const dsp = new SerialDataSourceProvider();

            const ds = dsp.createDataSource();

            expect(ds).toBeInstanceOf(SerialDataSource);
        });

    });

});
