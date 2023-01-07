/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Customizer,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    itShouldBeAClass,
} = require('./test-utils');



describe('Customizer', () => {

    itShouldBeAClass(Customizer, null, {
        id: null,
        deviceAddress: 0,
        optimizer: null,
        constructor: Function,
        loadConfiguration: Function,
        _loadConfiguration: Function,
        saveConfiguration: Function,
        _saveConfiguration: Function,
        _completeConfiguration: Function,
        _optimizeLoadConfiguration: Function,
        _optimizeSaveConfiguration: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const options = {
                id: null,
                deviceAddress: 0,
                optimizer: null,
            };

            const customizer = new Customizer();

            expectOwnPropertyNamesToEqual(customizer, [
                'id',
                'deviceAddress',
                'optimizer',

                // EventEmitter-related
                '_events',
                '_eventsCount',
                '_maxListeners',
            ]);

            expect(customizer.id).toBe(options.id);
            expect(customizer.deviceAddress).toBe(options.deviceAddress);
            expect(customizer.optimizer).toBe(options.optimizer);
        });

        it('should copy selected options', () => {
            const options = {
                id: 'ID',
                deviceAddress: 0x1234,
                optimizer: 'OPTIMIZER',
                junk: 'JUNK',
            };

            const customizer = new Customizer(options);

            expect(customizer.id).toBe(options.id);
            expect(customizer.deviceAddress).toBe(options.deviceAddress);
            expect(customizer.optimizer).toBe(options.optimizer);
            expect(customizer.junk).toBe(undefined);
        });

    });

    describe('#loadConfiguration', () => {

        it('should work correctly without an optimizer', async () => {
            const customizer = new Customizer({
                optimizer: null,
            });

            customizer._loadConfiguration = sinon.spy(async (configuration) => {
                return configuration;
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            const outConfig = await customizer.loadConfiguration(inConfig);

            expect(customizer._loadConfiguration.callCount).toBe(1);

            expect(outConfig).toBe(inConfig);
        });

        it('should work correctly with an optimizer', async () => {
            const optimizer = {
                async completeConfiguration(config) {
                    return config;
                },
            };

            const customizer = new Customizer({
                optimizer,
            });

            customizer._loadConfiguration = sinon.spy(async (configuration) => {
                return configuration;
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            const outConfig = await customizer.loadConfiguration(inConfig);

            expect(customizer._loadConfiguration.callCount).toBe(1);

            expect(outConfig).toBe(inConfig);
        });

    });

    describe('#_loadConfiguration', () => {

        it('should be an abstract method', () => {
            const customizer = new Customizer();

            expect(() => {
                customizer._loadConfiguration();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#saveConfiguration', () => {

        it('should work correctly without an optimizer', async () => {
            const customizer = new Customizer({
                optimizer: null,
            });

            customizer._saveConfiguration = sinon.spy(async (configuration) => {
                return configuration;
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            const outConfig = await customizer.saveConfiguration(inConfig);

            expect(customizer._saveConfiguration.callCount).toBe(1);

            expect(outConfig).toBe(inConfig);
        });

        it('should work correctly with an optimizer', async () => {
            const optimizer = {
                async completeConfiguration(config) {
                    return config;
                },
            };

            const customizer = new Customizer({
                optimizer,
            });

            customizer._saveConfiguration = sinon.spy(async (configuration) => {
                return configuration;
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            const outConfig = await customizer.saveConfiguration(inConfig);

            expect(customizer._saveConfiguration.callCount).toBe(1);

            expect(outConfig).toBe(inConfig);
        });

    });

    describe('#_saveConfiguration', () => {

        it('should be an abstract method', () => {
            const customizer = new Customizer();

            expect(() => {
                customizer._saveConfiguration();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#_completeConfiguration', () => {

        it('should forward to the optimizer', () => {
            const refResult = {};

            const spy = sinon.spy(() => {
                return refResult;
            });

            const optimizer = {
                completeConfiguration: spy,
            };

            const options = {
                optimizer,
            };

            const customizer = new Customizer(options);

            const result = customizer._completeConfiguration();

            expect(optimizer.completeConfiguration.callCount).toBe(1);
            expect(result).toBe(refResult);
        });

    });

    describe('#_optimizeLoadConfiguration', () => {

        it('should forward to the optimizer', () => {
            const refConfig = {};
            const refResult = {};

            const spy = sinon.spy(() => {
                return refResult;
            });

            const optimizer = {
                optimizeLoadConfiguration: spy,
            };

            const options = {
                optimizer,
            };

            const customizer = new Customizer(options);

            const result = customizer._optimizeLoadConfiguration(refConfig);

            expect(optimizer.optimizeLoadConfiguration.callCount).toBe(1);
            expect(optimizer.optimizeLoadConfiguration.firstCall.args [0]).toBe(refConfig);
            expect(result).toBe(refResult);
        });

    });

    describe('#_optimizeSaveConfiguration', () => {

        it('should forward to the optimizer', () => {
            const newConfig = {};
            const oldConfig = {};
            const refResult = {};

            const spy = sinon.spy(() => {
                return refResult;
            });

            const optimizer = {
                optimizeSaveConfiguration: spy,
            };

            const options = {
                optimizer,
            };

            const customizer = new Customizer(options);

            const result = customizer._optimizeSaveConfiguration(newConfig, oldConfig);

            expect(optimizer.optimizeSaveConfiguration.callCount).toBe(1);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [0]).toBe(newConfig);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [1]).toBe(oldConfig);
            expect(result).toBe(refResult);
        });

    });

});
