/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const ResolDeltaSolMx112ConfigurationOptimizer = require('../../../src/configuration-optimizers/resol-deltasol-mx-112-configuration-optimizer');


const {
    BaseConfigurationOptimizer,
    ConfigurationOptimizerFactory,
} = require('../resol-vbus');


const {
    expect,
    expectPromise,
    expectTypeToBe,
    expectPendingValuesCountInConfigToBe,
    markPendingValuesInConfigAsTransceived,
    itShouldBeAClass,
} = require('./test-utils');



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);



describe('ResolDeltaSolMx112ConfigurationOptimizer', () => {

    describe('using ConfigurationOptimizerFactory', () => {

        it('should work correctly', async () => {
            const optimizer = await expectPromise(optimizerPromise);

            expectTypeToBe(optimizer, 'object');
        });

    });

    describe('#completeConfiguration', () => {

        it('should work correctly', async () => {
            const optimizer = await optimizerPromise;

            const config = await expectPromise(optimizer.completeConfiguration());

            expectTypeToBe(config, 'array');
            expect(config).toHaveLength(6291);
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly after', async () => {
            const optimizer = await optimizerPromise;

            const config1 = await expectPromise(optimizer.completeConfiguration());

            const config2 = await expectPromise(optimizer.optimizeLoadConfiguration(config1));

            expectPendingValuesCountInConfigToBe(config2, 248);

            markPendingValuesInConfigAsTransceived(config2);

            const config3 = await expectPromise(optimizer.optimizeLoadConfiguration(config2));

            expectPendingValuesCountInConfigToBe(config3, 15);
        });

    });

    itShouldBeAClass(ResolDeltaSolMx112ConfigurationOptimizer, BaseConfigurationOptimizer, {
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
        deviceMajorVersion: 1,
        configurationData: expect.any(Object),
        matchOptimizer: Function,
    });

});
