/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

let SerialPort, serialPortRequireError;
try {
    SerialPort = require('serialport').SerialPort;
} catch (ex) {
    serialPortRequireError = ex;
}


const SerialDataSource = require('./serial-data-source');
const { applyDefaultOptions } = require('./utils');

const DataSourceProvider = require('./data-source-provider');



class SerialDataSourceProvider extends DataSourceProvider {

    constructor(options) {
        super(options);

        applyDefaultOptions(this, options, {});
    }

    async discoverDataSources() {
        const ports = await this._listSerialPorts();

        const dataSources = ports.map((port) => {
            return new SerialDataSource({
                provider: _this.id,
                id: port.comName,
                name: port.comName,
                path: port.comName,
            });
        });

        return dataSources;
    }

    createDataSource(options) {
        return new SerialDataSource(options);
    }

    async _listSerialPorts() {
        if (serialPortRequireError) {
            throw serialPortRequireError;
        }

        return await SerialPort.list();
    }

}


Object.assign(SerialDataSourceProvider.prototype, /** @lends SerialDataSourceProvider.prototype */ {

    id: 'serial-data-source-provider',

    name: 'Serial VBus Data Source Provider',

    description: 'Data source provider for VBus devices connected using a serial port (incl. USB)',

});


Object.assign(SerialDataSourceProvider, /** @lends SerialDataSourceProvider */ {

    hasSerialPortSupport: !!SerialPort,

});



module.exports = SerialDataSourceProvider;
