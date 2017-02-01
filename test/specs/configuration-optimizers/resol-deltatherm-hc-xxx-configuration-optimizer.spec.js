/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var vbus = require('../resol-vbus');

var testUtils = require('../test-utils');



var optimizerPromise = vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x5400);



describe('ResolDeltaThermHcXxxConfigurationOptimizer', function() {

    describe('using ConfigurationOptimizerFactory', function() {

        promiseIt('should work correctly', function() {
            return testUtils.expectPromise(optimizerPromise).then(function(optimizer) {
                expect(optimizer).an('object');
            });
        });

    });

    describe('#completeConfiguration', function() {

        promiseIt('should work correctly without provided config', function() {
            return optimizerPromise.then(function(optimizer) {
                return Q.fcall(function() {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then(function(config) {
                    expect(config).an('array').lengthOf(5753);
                });
            });
        });

        promiseIt('should work correctly with provided config object', function() {
            return optimizerPromise.then(function(optimizer) {
                return Q.fcall(function() {
                    var config = {
                        Language: 0,
                        TemperatureHysteresisSelector: 0,
                    };

                    return testUtils.expectPromise(optimizer.completeConfiguration(config));
                }).then(function(config) {
                    expect(config).an('array').lengthOf(2);
                });
            });
        });

        promiseIt('should work correctly with provided config array', function() {
            return optimizerPromise.then(function(optimizer) {
                return Q.fcall(function() {
                    var config = [{
                        valueId: 'Language',
                    }, {
                        // valueId: 'TemperatureHysteresisSelector',
                        valueIndex: 2,
                    }];

                    return testUtils.expectPromise(optimizer.completeConfiguration(config));
                }).then(function(config) {
                    expect(config).an('array').lengthOf(2);
                });
            });
        });

    });

    describe('#optimizeLoadConfiguration', function() {

        promiseIt('should work correctly after', function() {
            this.timeout(10000);

            return optimizerPromise.then(function(optimizer) {
                return Q.fcall(function() {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then(function(config) {
                    return testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));
                }).then(function(config) {
                    expect(config).a('array');

                    var valueIds = _.pluck(_.where(config, { pending: true }), 'valueId');
                    expect(valueIds).lengthOf(164);

                    _.forEach(config, function(value) {
                        if (value.pending) {
                            value.pending = false;
                            value.transceived = true;
                            value.value = null;
                        }
                    });

                    return testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));
                }).then(function(config) {
                    expect(config).an('array');

                    var valueIds = _.pluck(_.where(config, { pending: true }), 'valueId');
                    expect(valueIds).lengthOf(20);
                });
            });
        });

    });

});
