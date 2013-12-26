/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');
var serialport = require('serialport');


var SerialDataSource = require('./serial-data-source');

var DataSourceProvider = require('./data-source-provider');



var optionKeys = [
];



var SerialDataSourceProvider = DataSourceProvider.extend({

    id: 'serial-data-source-provider',

    name: 'Serial VBus Data Source Provider',

    description: 'Data source provider for VBus devices connected using a serial port (incl. USB)',

    constructor: function(options) {
        DataSourceProvider.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    discoverDataSources: function() {
        var _this = this;

        var deferred = Q.defer();
        var promise = deferred.promise;

        var done = function(err, result) {
            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        serialport.list(function(err, ports) {
            if (err) {
                done(err);
            } else {
                var dataSources = _.map(ports, function(port) {
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

});



module.exports = SerialDataSourceProvider;
