/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



let SerialPort;
try {
    SerialPort = require('serialport');
} catch (ex) {
    // eat it
}


const _ = require('./lodash');
const Q = require('./q');
const SerialDataSource = require('./serial-data-source');

const DataSourceProvider = require('./data-source-provider');



const optionKeys = [
];



const SerialDataSourceProvider = DataSourceProvider.extend({

    id: 'serial-data-source-provider',

    name: 'Serial VBus Data Source Provider',

    description: 'Data source provider for VBus devices connected using a serial port (incl. USB)',

    constructor: function(options) {
        DataSourceProvider.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    discoverDataSources: function() {
        const _this = this;

        let deferred = Q.defer();
        const promise = deferred.promise;

        const done = function(err, result) {
            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        this._listSerialPorts(function(err, ports) {
            if (err) {
                done(err);
            } else {
                const dataSources = _.map(ports, function(port) {
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

        return promise;
    },

    createDataSource: function(options) {
        return new SerialDataSource(options);
    },

    _listSerialPorts: function() {
        return SerialPort.list.apply(SerialPort, arguments);
    },

}, {

    hasSerialPortSupport: !!SerialPort,

});



module.exports = SerialDataSourceProvider;
