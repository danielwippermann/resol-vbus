/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Customizer,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
    wrapAsPromise,
} = require('./test-utils');



describe('Customizer', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(Customizer).a('function');
        });

        it('should have reasonable defaults', () => {
            const options = {
                id: null,
                deviceAddress: 0,
                optimizer: null,
            };

            const customizer = new Customizer();

            expect(customizer).property('id').equal(options.id);
            expect(customizer).property('deviceAddress').equal(options.deviceAddress);
            expect(customizer).property('optimizer').equal(options.optimizer);
        });

        it('should copy selected options', () => {
            const options = {
                id: 'ID',
                deviceAddress: 0x1234,
                optimizer: 'OPTIMIZER',
                junk: 'JUNK',
            };

            const customizer = new Customizer(options);

            expect(customizer).property('id').equal(options.id);
            expect(customizer).property('deviceAddress').equal(options.deviceAddress);
            expect(customizer).property('optimizer').equal(options.optimizer);
            expect(customizer).not.property('junk');
        });

    });

    describe('#loadConfiguration', () => {

        it('should be a method', () => {
            expect(Customizer.prototype).property('loadConfiguration').a('function');
        });

        it('should work correctly without an optimizer', () => {
            const customizer = new Customizer({
                optimizer: null,
            });

            customizer._loadConfiguration = sinon.spy((configuration) => {
                return Promise.resolve(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            return wrapAsPromise(() => {
                return customizer.loadConfiguration(inConfig);
            }).then((outConfig) => {
                expect(customizer._loadConfiguration).property('callCount').equal(1);

                expect(outConfig).equal(inConfig);
            });
        });

        it('should work correctly with an optimizer', async () => {
            const optimizer = {
                completeConfiguration(config) {
                    return Promise.resolve(config);
                },
            };

            const customizer = new Customizer({
                optimizer,
            });

            customizer._loadConfiguration = sinon.spy((configuration) => {
                return Promise.resolve(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            const outConfig = await customizer.loadConfiguration(inConfig);

            expect(customizer._loadConfiguration).property('callCount').equal(1);

            expect(outConfig).equal(inConfig);
        });

    });

    describe('#_loadConfiguration', () => {

        it('should be a method', () => {
            expect(Customizer.prototype).property('_loadConfiguration').a('function');
        });

        it('should be an abstract method', () => {
            const customizer = new Customizer();

            expect(() => {
                customizer._loadConfiguration();
            }).to.throw();
        });

    });

    describe('#saveConfiguration', () => {

        it('should be a method', () => {
            expect(Customizer.prototype).property('saveConfiguration').a('function');
        });

        it('should work correctly without an optimizer', () => {
            const customizer = new Customizer({
                optimizer: null,
            });

            customizer._saveConfiguration = sinon.spy((configuration) => {
                return Promise.resolve(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            return wrapAsPromise(() => {
                return customizer.saveConfiguration(inConfig);
            }).then((outConfig) => {
                expect(customizer._saveConfiguration).property('callCount').equal(1);

                expect(outConfig).equal(inConfig);
            });
        });

        it('should work correctly with an optimizer', () => {
            const optimizer = {
                completeConfiguration(config) {
                    return Promise.resolve(config);
                },
            };

            const customizer = new Customizer({
                optimizer,
            });

            customizer._saveConfiguration = sinon.spy((configuration) => {
                return Promise.resolve(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            return wrapAsPromise(() => {
                return customizer.saveConfiguration(inConfig);
            }).then((outConfig) => {
                expect(customizer._saveConfiguration).property('callCount').equal(1);

                expect(outConfig).equal(inConfig);
            });
        });

    });

    describe('#_saveConfiguration', () => {

        it('should be a method', () => {
            expect(Customizer.prototype).property('_saveConfiguration').a('function');
        });

        it('should be an abstract method', () => {
            const customizer = new Customizer();

            expect(() => {
                customizer._saveConfiguration();
            }).to.throw();
        });

    });

    describe('#_completeConfiguration', () => {

        it('should be a method', () => {
            expect(Customizer.prototype).property('_completeConfiguration').a('function');
        });

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

            expect(optimizer.completeConfiguration.callCount).equal(1);
            expect(result).equal(refResult);
        });

    });

    describe('#_optimizeLoadConfiguration', () => {

        it('should be a method', () => {
            expect(Customizer.prototype).property('_optimizeLoadConfiguration').a('function');
        });

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

            expect(optimizer.optimizeLoadConfiguration.callCount).equal(1);
            expect(optimizer.optimizeLoadConfiguration.firstCall.args [0]).equal(refConfig);
            expect(result).equal(refResult);
        });

    });

    describe('#_optimizeSaveConfiguration', () => {

        it('should be a method', () => {
            expect(Customizer.prototype).property('_optimizeSaveConfiguration').a('function');
        });

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

            expect(optimizer.optimizeSaveConfiguration.callCount).equal(1);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [0]).equal(newConfig);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [1]).equal(oldConfig);
            expect(result).equal(refResult);
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(Customizer, null, {
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

});
