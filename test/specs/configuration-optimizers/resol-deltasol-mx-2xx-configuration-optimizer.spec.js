/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    BaseConfigurationOptimizer,
    ConfigurationOptimizerFactory,
} = require('../resol-vbus');


const jestExpect = global.expect;
const expect = require('../expect');
const testUtils = require('../test-utils');
const ResolDeltaSolMx2xxConfigurationOptimizer = require('../../../src/configuration-optimizers/resol-deltasol-mx-2xx-configuration-optimizer');


const { wrapAsPromise } = testUtils;



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizer({
    deviceAddress: 0x7E11,
    deviceMajorVersion: 2,
});



describe('ResolDeltaSolMx2xxConfigurationOptimizer', () => {

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
                    expect(config).an('array').lengthOf(6144);
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

                    const valueIds = config.reduce((memo, value) => {
                        if (value.pending) {
                            memo.push(value.valueId);
                        }
                        return memo;
                    }, []);

                    expect(valueIds).lengthOf(552);

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

                    expect(valueIds).lengthOf(33);
                });
            });
        });

    });

    testUtils.itShouldWorkCorrectlyAfterMigratingToClass(ResolDeltaSolMx2xxConfigurationOptimizer, BaseConfigurationOptimizer, {
        constructor: Function,
        optimizeConfiguration: Function,
        optimizeAktorConfiguration: Function,
        optimizeModuleConfiguration: Function,
        optimizeSolarConfiguration: Function,
        optimizeSolarWfConfiguration: Function,
        optimizeAnlageWfConfiguration: Function,
        optimizeHeizungWfConfiguration: Function,
        optimizeHeizungHeizkreisConfiguration: Function,
        optimizeHeizungRelaisConfiguration: Function,
        optimizeWmzConfiguration: Function,
        optimizeWsuConfiguration: Function,
    }, {
        deviceAddress: 0x7E11,
        deviceMajorVersion: 2,
        configurationData: jestExpect.any(Object),
        matchOptimizer: Function,
    });

});
