/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var Q = require('q');


var vbus = require('./resol-vbus');
require('./test-utils');



var Promise = vbus.utils.promise;

var ConfigurationOptimizerFactory = vbus.ConfigurationOptimizerFactory;



describe('ConfigurationOptimizerFactory', function() {

    describe('.createOptimizerByDeviceAddress', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizerFactory).property('createOptimizerByDeviceAddress').a('function');
        });

        promiseIt('should have unique addresses for registered optimizers', function() {
            return new Promise(function(resolve, reject) {
                var knownAddresses = {};

                var optimizerClasses = ConfigurationOptimizerFactory._optimizerClasses;

                var index = 0;

                var nextOptimizer = function() {
                    if (index < optimizerClasses.length) {
                        var OptimizerClass = optimizerClasses [index++];

                        var address = OptimizerClass.deviceAddress;
                        if (address !== null) {
                            var addressKey = address.toString(16);

                            Q.fcall(function() {
                                expect(address).a('number').above(0);

                                expect(knownAddresses).not.property(addressKey);

                                knownAddresses [addressKey] = true;

                                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(address);
                            }).then(function(optimizer) {
                                expect(optimizer).an('object');

                                nextOptimizer();
                            }).then(null, function(err) {
                                reject(err);
                            }).done();
                        } else {
                            nextOptimizer();
                        }
                    } else {
                        resolve();
                    }
                };

                nextOptimizer();
            });
        });

        promiseIt('should work correctly for unknown devices', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x0050);
            }).then(function(optimizer) {
                expect(optimizer).equal(null);
            });
        });

        promiseIt('should work correctly for RESOL DeltaSol BX Plus', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7112);
            }).then(function(optimizer) {
                expect(optimizer).a('object');
            });
        });

        promiseIt('should work correctly for RESOL DeltaSol CS Plus', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x2211);
            }).then(function(optimizer) {
                expect(optimizer).a('object');
            });
        });

        promiseIt('should work correctly for RESOL DeltaSol MX', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);
            }).then(function(optimizer) {
                expect(optimizer).a('object');
            });
        });

        promiseIt('should work correctly for RESOL DeltaSol SLT', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x1001);
            }).then(function(optimizer) {
                expect(optimizer).a('object');
            });
        });

        promiseIt('should work correctly for RESOL DeltaTherm HC', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x5400);
            }).then(function(optimizer) {
                expect(optimizer).a('object');
            });
        });



    });

});
