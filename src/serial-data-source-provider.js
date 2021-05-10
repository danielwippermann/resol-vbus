/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const _ = require('./lodash');
const SerialDataSource = require('./serial-data-source');

const DataSourceProvider = require('./data-source-provider');



const optionKeys = [
];



const SerialDataSourceProvider = DataSourceProvider.extend({

    id: 'serial-data-source-provider',

    name: 'Serial VBus Data Source Provider',

    description: 'Data source provider for VBus devices connected using a serial port (incl. USB)',

    constructor(options) {
        DataSourceProvider.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

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
    },

    createDataSource(options) {
        return new SerialDataSource(options);
    },

    _listSerialPorts() {
        const SerialPort = require('serialport');
        return SerialPort.list.apply(SerialPort, arguments);
    },

});



module.exports = SerialDataSourceProvider;
