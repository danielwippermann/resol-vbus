/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



let SerialPort, serialPortRequireError;
try {
    SerialPort = require('serialport');
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

    discoverDataSources() {
        const _this = this;

        return new Promise((resolve, reject) => {
            const done = function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };

            this._listSerialPorts((err, ports) => {
                if (err) {
                    done(err);
                } else {
                    const dataSources = ports.map((port) => {
                        return new SerialDataSource({
                            provider: _this.id,
                            id: port.comName,
                            name: port.comName,
                            path: port.comName,
                        });
                    });

                    done(null, dataSources);
                }
            });
        });
    }

    createDataSource(options) {
        return new SerialDataSource(options);
    }

    _listSerialPorts() {
        if (serialPortRequireError) {
            throw serialPortRequireError;
        }

        return SerialPort.list.apply(SerialPort, arguments);
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
