/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    ConfigurationOptimizerFactory,
    utils: { promisify },
} = require('../resol-vbus');


const expect = require('../expect');
const _ = require('../lodash');
const testUtils = require('../test-utils');



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x2211);



describe('ResolDeltaSolCsPlusXxxConfigurationOptimizer', () => {

    describe('using ConfigurationOptimizerFactory', () => {

        it('should work correctly', () => {
            return testUtils.expectPromise(optimizerPromise).then((optimizer) => {
                expect(optimizer).an('object');
            });
        });

    });

    describe('#completeConfiguration', () => {

        it('should work correctly', () => {
            return optimizerPromise.then((optimizer) => {
                return promisify(() => {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then((config) => {
                    expect(config).an('array').lengthOf(82);
                });
            });
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly after', () => {
            return optimizerPromise.then((optimizer) => {
                return promisify(() => {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then((config) => {
                    return testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));
                }).then((config) => {
                    expect(config).an('array');

                    const valueIds = _.reduce(config, (memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);

                    expect(valueIds).lengthOf(49);

                    _.forEach(config, (value) => {
                        if (value.pending) {
                            value.pending = false;
                            value.transceived = true;
                            value.value = null;
                        }
                    });

                    return testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));
                }).then((config) => {
                    expect(config).an('array');

                    const valueIds = _.reduce(config, (memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);

                    expect(valueIds).lengthOf(33);
                });
            });
        });

    });

});
