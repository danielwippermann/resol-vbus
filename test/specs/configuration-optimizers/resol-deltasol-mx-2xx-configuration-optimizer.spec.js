/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const ResolDeltaSolMx2xxConfigurationOptimizer = require('../../../src/configuration-optimizers/resol-deltasol-mx-2xx-configuration-optimizer');


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



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizer({
    deviceAddress: 0x7E11,
    deviceMajorVersion: 2,
});



describe('ResolDeltaSolMx2xxConfigurationOptimizer', () => {

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
            expect(config).toHaveLength(6144);
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly after', async () => {
            const optimizer = await optimizerPromise;

            const config1 = await expectPromise(optimizer.completeConfiguration());

            const config2 = await expectPromise(optimizer.optimizeLoadConfiguration(config1));

            expectPendingValuesCountInConfigToBe(config2, 552);

            markPendingValuesInConfigAsTransceived(config2);

            const config3 = await expectPromise(optimizer.optimizeLoadConfiguration(config2));

            expectPendingValuesCountInConfigToBe(config3, 33);
        });

    });

    itShouldBeAClass(ResolDeltaSolMx2xxConfigurationOptimizer, BaseConfigurationOptimizer, {
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
        configurationData: expect.any(Object),
        matchOptimizer: Function,
    });

});
