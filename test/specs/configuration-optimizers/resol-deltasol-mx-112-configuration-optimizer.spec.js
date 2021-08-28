/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    BaseConfigurationOptimizer,
    ConfigurationOptimizerFactory,
} = require('../resol-vbus');


const jestExpect = global.expect;
const expect = require('../expect');
const _ = require('../lodash');
const testUtils = require('../test-utils');
const ResolDeltaSolMx112ConfigurationOptimizer = require('../../../src/configuration-optimizers/resol-deltasol-mx-112-configuration-optimizer');


const { wrapAsPromise } = testUtils;



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);



describe('ResolDeltaSolMx112ConfigurationOptimizer', () => {

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
                return wrapAsPromise(() => {
                    return testUtils.expectPromise(optimizer.completeConfiguration());
                }).then((config) => {
                    expect(config).an('array').lengthOf(6291);
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
                    expect(config).an('array');

                    const valueIds = _.reduce(config, (memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);

                    expect(valueIds).lengthOf(248);

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

                    expect(valueIds).lengthOf(15);
                });
            });
        });

    });

    testUtils.itShouldWorkCorrectlyAfterMigratingToClass(ResolDeltaSolMx112ConfigurationOptimizer, BaseConfigurationOptimizer, {
        constructor: Function,
        optimizeConfiguration: Function,
        optimizeModuleConfiguration: Function,
        optimizeSolarConfiguration: Function,
        optimizeSolarWfConfiguration: Function,
        optimizeAnlageWfConfiguration: Function,
        optimizeHeizungWfConfiguration: Function,
        optimizeHeizungHeizkreisConfiguration: Function,
        optimizeWmzConfiguration: Function,
    }, {
        deviceAddress: 0x7E11,
        configurationData: jestExpect.any(Object),
    });

});
