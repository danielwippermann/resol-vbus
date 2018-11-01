/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Q = require('q');


const _ = require('../lodash');
const vbus = require('../resol-vbus');

const testUtils = require('../test-utils');



const optimizerPromise = vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7112);



describe('ResolDeltaSolBxPlusXxxConfigurationOptimizer', function() {

    describe('using ConfigurationOptimizerFactory', function() {

        promiseIt('should work correctly', function() {
            return testUtils.expectPromise(optimizerPromise).then(function(optimizer) {
                expect(optimizer).an('object');
            });
        });

    });

    describe('#completeConfiguration', function() {

        promiseIt('should work correctly', function() {
            return optimizerPromise.then(function(optimizer) {
                return Q.fcall(function() {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then(function(config) {
                    expect(config).an('array').lengthOf(4351);
                });
            });
        });

    });

    describe('#optimizeLoadConfiguration', function() {

        promiseIt('should work correctly after', function() {
            this.timeout(20000);

            return optimizerPromise.then(function(optimizer) {
                return Q.fcall(function() {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then(function(config) {
                    return testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));
                }).then(function(config) {
                    expect(config).an('array');

                    const valueIds = _.reduce(config, (memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);
                    expect(valueIds).lengthOf(159);

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

                    const valueIds = _.reduce(config, (memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);

                    expect(valueIds).lengthOf(9);
                });
            });
        });

    });

});
