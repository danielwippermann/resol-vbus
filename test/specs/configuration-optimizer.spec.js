/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    ConfigurationOptimizer,
} = require('./resol-vbus');


const {
    expect,
    itShouldBeAClass,
} = require('./test-utils');



describe('ConfigurationOptimizer', () => {

    itShouldBeAClass(ConfigurationOptimizer, null, {
        constructor: Function,
        completeConfiguration: Function,
        optimizeLoadConfiguration: Function,
        optimizeSaveConfiguration: Function,
        generateClockConfiguration: Function,
    }, {
        deviceAddress: null,
        getOptimizerOptions: Function,
        matchOptimizer: Function,
    });

    describe('.getOptimizerOptions', () => {

        it('should reject if no deviceAddress is given', async () => {
            await expect(async () => {
                await ConfigurationOptimizer.getOptimizerOptions();
            }).rejects.toThrow('Must be implemented by sub-class');
        });

        it('should return single match if a deviceAddress is given', async () => {
            class TestableConfigurationOptimizer extends ConfigurationOptimizer {
            }

            TestableConfigurationOptimizer.deviceAddress = 0x1111;

            const matches = await TestableConfigurationOptimizer.getOptimizerOptions();

            expect(matches).toHaveLength(1);

            const match = matches [0];
            expect(match).toBe(null);
        });

    });

    describe('.matchOptimizer', () => {

        it('should reject if no deviceAddress is given', async () => {
            const options = {
                deviceAddress: 0x1111,
            };

            await expect(async () => {
                await ConfigurationOptimizer.matchOptimizer(options);
            }).rejects.toThrow('Must be implemented by sub-class');
        });

        it('should match if the right deviceAddress is given', async () => {
            class TestableConfigurationOptimizer extends ConfigurationOptimizer {
            }

            TestableConfigurationOptimizer.deviceAddress = 0x1111;

            const options = {
                deviceAddress: 0x1111,
            };

            const result = await TestableConfigurationOptimizer.matchOptimizer(options);

            expect(result.match).toBe(1);
            expect(result.Optimizer).toBe(TestableConfigurationOptimizer);
            expect(result.options).toBe(null);
        });

        it('should not match if the wrong deviceAddress is given', async () => {
            class TestableConfigurationOptimizer extends ConfigurationOptimizer {
            }

            TestableConfigurationOptimizer.deviceAddress = 0x1111;

            const options = {
                deviceAddress: 0x2222,
            };

            const result = await TestableConfigurationOptimizer.matchOptimizer(options);

            expect(result.match).toBe(0);
            expect(result.Optimizer).toBe(TestableConfigurationOptimizer);
            expect(result.options).toBe(null);
        });

    });

    describe('#completeConfiguration', () => {

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.completeConfiguration();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.optimizeLoadConfiguration();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#optimizeSaveConfiguration', () => {

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.optimizeSaveConfiguration();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#generateClockConfiguration', () => {

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.generateClockConfiguration();
            }).toThrow('Must be implemented by sub-class');
        });

    });

});
