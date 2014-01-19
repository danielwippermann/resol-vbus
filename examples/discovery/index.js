/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');


var _ = require('lodash');
// var optimist = require('optimist');
var Q = require('q');


var vbus = require('../../src/index');



var dsp = new vbus.TcpDataSourceProvider();



var knownDataSources = {};

var discover = function() {
    return vbus.TcpDataSourceProvider.discoverDevices(function(address) {
        var result;
        if (_.has(knownDataSources, address)) {
            result = knownDataSources [address];
        } else {
            console.log('QUERY: ', address);
            result = vbus.TcpDataSourceProvider.fetchDeviceInformation(address);
            result = result.then(function(result) {
                console.log('QUERY SUCCESS: ', address);
                return result;
            }, function(reason) {
                console.log('QUERY FAILED: ', address);
                throw reason;
            });
        }
        return result;
    }).then(function(devices) {
        var added = [], removed = [], devicesById = {};
        _.forEach(devices, function(device) {
            var id = device.__address__;
            devicesById [id] = device;
            if (!_.has(knownDataSources, id)) {
                added.push(device);
            }
        });
        _.forEach(knownDataSources, function(device, id) {
            if (!_.has(devicesById, id)) {
                removed.push(device);
            }
        });
        _.forEach(removed, function(device) {
            var id = device.__address__;
            delete knownDataSources [id];
            console.log('REMOVED: ', id, device.name);
        });
        _.forEach(added, function(device) {
            var id = device.__address__;
            knownDataSources [id] = device;
            console.log('ADDED: ', id, device.name);
        });
    });
};



var main = function() {
    var loop = function() {
        console.log('------', new Date(), '------');
        discover().done(function() {
            setTimeout(loop, 10000);
        });
    };

    loop();
};



if (require.main === module) {
    main();
}
