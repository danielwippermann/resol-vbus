/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    ConfigurationOptimizerFactory,
} = require('../resol-vbus');


const {
    expect,
    expectPromise,
    expectTypeToBe,
    expectPendingValuesCountInConfigToBe,
    markPendingValuesInConfigAsTransceived,
} = require('./test-utils');



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x1050);



describe('ResolDeltaSolEV2100ConfigurationOptimizer', () => {

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
            expect(config).toHaveLength(925);
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly after', async () => {
            const optimizer = await optimizerPromise;

            const config1 = await expectPromise(optimizer.completeConfiguration());

            const config2 = await expectPromise(optimizer.optimizeLoadConfiguration(config1));

            expectPendingValuesCountInConfigToBe(config2, 925);

            markPendingValuesInConfigAsTransceived(config2);

            const config3 = await expectPromise(optimizer.optimizeLoadConfiguration(config2));

            expectPendingValuesCountInConfigToBe(config3, 0);
        });

    });

});
