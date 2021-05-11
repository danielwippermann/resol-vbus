/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



let SerialPort;
try {
    SerialPort = require('serialport');
} catch (ex) {
    // eat it
}


const _ = require('./lodash');
const SerialDataSource = require('./serial-data-source');

const DataSourceProvider = require('./data-source-provider');



const optionKeys = [
];



class SerialDataSourceProvider extends DataSourceProvider {

    constructor(options) {
        super(options);

        _.extend(this, _.pick(options, optionKeys));
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
                    const dataSources = _.map(ports, (port) => {
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
        return SerialPort.list.apply(SerialPort, arguments);
    }

}


Object.assign(SerialDataSourceProvider.prototype, {

    id: 'serial-data-source-provider',

    name: 'Serial VBus Data Source Provider',

    description: 'Data source provider for VBus devices connected using a serial port (incl. USB)',

});


SerialDataSourceProvider.hasSerialPortSupport = !!SerialPort;



module.exports = SerialDataSourceProvider;
