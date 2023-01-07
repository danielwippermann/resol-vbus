/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    ConfigurationOptimizer,
    ConfigurationOptimizerFactory,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTypeToBe,
} = require('./test-utils');



describe('ConfigurationOptimizerFactory', () => {

    it('should export correctly', () => {
        expectOwnPropertyNamesToEqual(ConfigurationOptimizerFactory, [
            'matchOptimizer',
            'createOptimizer',
            'createOptimizerByDeviceAddress',
            '_optimizerClasses',
        ]);
    });

    describe('.createOptimizerByDeviceAddress', () => {

        it('should have unique addresses for registered optimizers', async () => {
            const knownAddresses = new Set();

            const optimizerClasses = ConfigurationOptimizerFactory._optimizerClasses;

            for (const OptimizerClass of optimizerClasses) {
                const address = OptimizerClass.deviceAddress;
                if (address != null) {
                    const addressKey = address.toString(16) + '/' + OptimizerClass.deviceMajorVersion;

                    expectTypeToBe(address, 'number');
                    expect(address).toBeGreaterThan(0);

                    if (knownAddresses.has(address)) {
                        console.log(address.toString(16));
                    }

                    expect(knownAddresses.has(addressKey)).toBe(false);

                    knownAddresses.add(addressKey);

                    const optimizer = await ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(address);

                    expectTypeToBe(optimizer, 'object');

                    // FIXME(daniel): requesting 0x7E11 ALWAYS returns an 1.12 optimizer...
                }
            }
        });

        it('should work correctly for unknown devices', async () => {
            const optimizer = await ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x0050);

            expect(optimizer).toBe(null);
        });

        it('should work correctly for RESOL DeltaSol BX Plus', async () => {
            const optimizer = await ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7112);

            expect(optimizer).toBeInstanceOf(ConfigurationOptimizer);
        });

        it('should work correctly for RESOL DeltaSol CS Plus', async () => {
            const optimizer = await ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x2211);

            expect(optimizer).toBeInstanceOf(ConfigurationOptimizer);
        });

        it('should work correctly for RESOL DeltaSol MX', async () => {
            const optimizer = await ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);

            expect(optimizer).toBeInstanceOf(ConfigurationOptimizer);
        });

        it('should work correctly for RESOL DeltaSol SLT', async () => {
            const optimizer = await ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x1001);

            expect(optimizer).toBeInstanceOf(ConfigurationOptimizer);
        });

        it('should work correctly for RESOL DeltaTherm HC', async () => {
            const optimizer = await ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x5400);

            expect(optimizer).toBeInstanceOf(ConfigurationOptimizer);
        });

    });

});
