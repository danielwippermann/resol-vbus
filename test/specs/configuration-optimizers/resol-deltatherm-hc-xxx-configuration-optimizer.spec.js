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



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x5400);



describe('ResolDeltaThermHcXxxConfigurationOptimizer', () => {

    describe('using ConfigurationOptimizerFactory', () => {

        it('should work correctly', async () => {
            const optimizer = await expectPromise(optimizerPromise);

            expectTypeToBe(optimizer, 'object');
        });

    });

    describe('#completeConfiguration', () => {

        it('should work correctly without provided config', async () => {
            const optimizer = await optimizerPromise;

            const config = await expectPromise(optimizer.completeConfiguration());

            expectTypeToBe(config, 'array');
            expect(config).toHaveLength(5753);
        });

        it('should work correctly with provided config object', async () => {
            const optimizer = await optimizerPromise;

            const config1 = {
                Language: 0,
                TemperatureHysteresisSelector: 0,
            };

            const config2 = await expectPromise(optimizer.completeConfiguration(config1));

            expectTypeToBe(config2, 'array');
            expect(config2).toHaveLength(2);
        });

        it('should work correctly with provided config array', async () => {
            const optimizer = await optimizerPromise;

            const config1 = [{
                valueId: 'Language',
            }, {
                // valueId: 'TemperatureHysteresisSelector',
                valueIndex: 2,
            }];

            const config2 = await expectPromise(optimizer.completeConfiguration(config1));

            expectTypeToBe(config2, 'array');
            expect(config2).toHaveLength(2);
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly after', async () => {
            const optimizer = await optimizerPromise;

            const config1 = await expectPromise(optimizer.completeConfiguration());

            const config2 = await expectPromise(optimizer.optimizeLoadConfiguration(config1));

            expectPendingValuesCountInConfigToBe(config2, 164);

            markPendingValuesInConfigAsTransceived(config2);

            const config3 = await expectPromise(optimizer.optimizeLoadConfiguration(config2));

            expectPendingValuesCountInConfigToBe(config3, 20);
        });

    });

});
