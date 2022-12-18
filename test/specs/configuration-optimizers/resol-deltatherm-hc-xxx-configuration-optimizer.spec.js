/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    ConfigurationOptimizerFactory,
} = require('../resol-vbus');


const expect = require('../expect');
const testUtils = require('../test-utils');


const { wrapAsPromise } = testUtils;



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x5400);



describe('ResolDeltaThermHcXxxConfigurationOptimizer', () => {

    describe('using ConfigurationOptimizerFactory', () => {

        it('should work correctly', () => {
            return testUtils.expectPromise(optimizerPromise).then((optimizer) => {
                expect(optimizer).an('object');
            });
        });

    });

    describe('#completeConfiguration', () => {

        it('should work correctly without provided config', () => {
            return optimizerPromise.then((optimizer) => {
                return wrapAsPromise(() => {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then((config) => {
                    expect(config).an('array').lengthOf(5753);
                });
            });
        });

        it('should work correctly with provided config object', () => {
            return optimizerPromise.then((optimizer) => {
                return wrapAsPromise(() => {
                    const config = {
                        Language: 0,
                        TemperatureHysteresisSelector: 0,
                    };

                    return testUtils.expectPromise(optimizer.completeConfiguration(config));
                }).then((config) => {
                    expect(config).an('array').lengthOf(2);
                });
            });
        });

        it('should work correctly with provided config array', () => {
            return optimizerPromise.then((optimizer) => {
                return wrapAsPromise(() => {
                    const config = [{
                        valueId: 'Language',
                    }, {
                        // valueId: 'TemperatureHysteresisSelector',
                        valueIndex: 2,
                    }];

                    return testUtils.expectPromise(optimizer.completeConfiguration(config));
                }).then((config) => {
                    expect(config).an('array').lengthOf(2);
                });
            });
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly after', () => {
            return optimizerPromise.then((optimizer) => {
                return wrapAsPromise(() => {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then((config) => {
                    return testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));
                }).then((config) => {
                    expect(config).a('array');

                    const valueIds = config.reduce((memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);

                    expect(valueIds).lengthOf(164);

                    for (const value of config) {
                        if (value.pending) {
                            value.pending = false;
                            value.transceived = true;
                            value.value = null;
                        }
                    }

                    return testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));
                }).then((config) => {
                    expect(config).an('array');

                    const valueIds = config.reduce((memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);

                    expect(valueIds).lengthOf(20);
                });
            });
        });

    });

});
