/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    ConfigurationOptimizer,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('ConfigurationOptimizer', () => {

    describe('.getOptimizerOptions', () => {

        it('should be a function', () => {
            expect(ConfigurationOptimizer).property('getOptimizerOptions').a('function');
        });

        it('should reject if no deviceAddress is given', () => {
            return ConfigurationOptimizer.getOptimizerOptions().then(() => {
                throw new Error('Should have thrown an error, but resolved');
            }, (err) => {
                expect(err).instanceOf(Error);
                expect(err).property('message').equal('Must be implemented by sub-class');
            });
        });

        it('should return single match if a deviceAddress is given', () => {
            class TestableConfigurationOptimizer extends ConfigurationOptimizer {
            }

            TestableConfigurationOptimizer.deviceAddress = 0x1111;

            return TestableConfigurationOptimizer.getOptimizerOptions().then((matches) => {
                expect(matches).an('array').lengthOf(1);

                const match = matches [0];
                expect(match).equal(null);
            });
        });

    });

    describe('.matchOptimizer', () => {

        it('should be a function', () => {
            expect(ConfigurationOptimizer).property('matchOptimizer').a('function');
        });

        it('should reject if no deviceAddress is given', () => {
            const options = {
                deviceAddress: 0x1111,
            };

            return ConfigurationOptimizer.matchOptimizer(options).then(() => {
                throw new Error('Should have thrown an error, but resolved');
            }, (err) => {
                expect(err).instanceOf(Error);
                expect(err).property('message').equal('Must be implemented by sub-class');
            });
        });

        it('should match if the right deviceAddress is given', () => {
            class TestableConfigurationOptimizer extends ConfigurationOptimizer {
            }

            TestableConfigurationOptimizer.deviceAddress = 0x1111;

            const options = {
                deviceAddress: 0x1111,
            };

            return TestableConfigurationOptimizer.matchOptimizer(options).then((result) => {
                expect(result).property('match').equal(1);
                expect(result).property('Optimizer').equal(TestableConfigurationOptimizer);
                expect(result).property('options').equal(null);
            });
        });

        it('should not match if the wrong deviceAddress is given', () => {
            class TestableConfigurationOptimizer extends ConfigurationOptimizer {
            }

            TestableConfigurationOptimizer.deviceAddress = 0x1111;

            const options = {
                deviceAddress: 0x2222,
            };

            return TestableConfigurationOptimizer.matchOptimizer(options).then((result) => {
                expect(result).property('match').equal(0);
                expect(result).property('Optimizer').equal(TestableConfigurationOptimizer);
                expect(result).property('options').equal(null);
            });
        });

    });

    describe('#completeConfiguration', () => {

        it('should be a method', () => {
            expect(ConfigurationOptimizer.prototype).property('completeConfiguration').a('function');
        });

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.completeConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should be a method', () => {
            expect(ConfigurationOptimizer.prototype).property('optimizeLoadConfiguration').a('function');
        });

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.optimizeLoadConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#optimizeSaveConfiguration', () => {

        it('should be a method', () => {
            expect(ConfigurationOptimizer.prototype).property('optimizeSaveConfiguration').a('function');
        });

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.optimizeSaveConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#generateClockConfiguration', () => {

        it('should be a method', () => {
            expect(ConfigurationOptimizer.prototype).property('generateClockConfiguration').a('function');
        });

        it('should be an abstract method', () => {
            const optimizer = new ConfigurationOptimizer();

            expect(() => {
                return optimizer.generateClockConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(ConfigurationOptimizer, null, {
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

});
