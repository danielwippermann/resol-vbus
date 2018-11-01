/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const Q = require('./q');
const vbus = require('./resol-vbus');



const Customizer = vbus.Customizer;



describe('Customizer', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Customizer).a('function');
        });

        it('should have reasonable defaults', function() {
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

        it('should copy selected options', function() {
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

    describe('#loadConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('loadConfiguration').a('function');
        });

        it('should work correctly without an optimizer', function() {
            const customizer = new Customizer({
                optimizer: null,
            });

            customizer._loadConfiguration = sinon.spy(function(configuration) {
                return Q(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            return Q.fcall(function() {
                return customizer.loadConfiguration(inConfig);
            }).then(function(outConfig) {
                expect(customizer._loadConfiguration).property('callCount').equal(1);

                expect(outConfig).equal(inConfig);
            });
        });

        it('should work correctly with an optimizer', function() {
            const optimizer = {
                completeConfiguration: function(config) {
                    return Q(config);
                },
            };

            const customizer = new Customizer({
                optimizer: optimizer,
            });

            customizer._loadConfiguration = sinon.spy(function(configuration) {
                return Q(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            return Q.fcall(function() {
                return customizer.loadConfiguration(inConfig);
            }).then(function(outConfig) {
                expect(customizer._loadConfiguration).property('callCount').equal(1);

                expect(outConfig).equal(inConfig);
            });
        });

    });

    describe('#_loadConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('_loadConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            const customizer = new Customizer();

            expect(function() {
                customizer._loadConfiguration();
            }).to.throw();
        });

    });

    describe('#saveConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('saveConfiguration').a('function');
        });

        it('should work correctly without an optimizer', function() {
            const customizer = new Customizer({
                optimizer: null,
            });

            customizer._saveConfiguration = sinon.spy(function(configuration) {
                return Q(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            return Q.fcall(function() {
                return customizer.saveConfiguration(inConfig);
            }).then(function(outConfig) {
                expect(customizer._saveConfiguration).property('callCount').equal(1);

                expect(outConfig).equal(inConfig);
            });
        });

        it('should work correctly with an optimizer', function() {
            const optimizer = {
                completeConfiguration: function(config) {
                    return Q(config);
                },
            };

            const customizer = new Customizer({
                optimizer: optimizer,
            });

            customizer._saveConfiguration = sinon.spy(function(configuration) {
                return Q(configuration);
            });

            const inConfig = [{
                valueIndex: 0x0001,
            }, {
                valueIndex: 0x0001,
            }];

            return Q.fcall(function() {
                return customizer.saveConfiguration(inConfig);
            }).then(function(outConfig) {
                expect(customizer._saveConfiguration).property('callCount').equal(1);

                expect(outConfig).equal(inConfig);
            });
        });

    });

    describe('#_saveConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('_saveConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            const customizer = new Customizer();

            expect(function() {
                customizer._saveConfiguration();
            }).to.throw();
        });

    });

    describe('#_completeConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('_completeConfiguration').a('function');
        });

        it('should forward to the optimizer', function() {
            const refResult = {};

            const spy = sinon.spy(function() {
                return refResult;
            });

            const optimizer = {
                completeConfiguration: spy,
            };

            const options = {
                optimizer: optimizer,
            };

            const customizer = new Customizer(options);

            const result = customizer._completeConfiguration();

            expect(optimizer.completeConfiguration.callCount).equal(1);
            expect(result).equal(refResult);
        });

    });

    describe('#_optimizeLoadConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('_optimizeLoadConfiguration').a('function');
        });

        it('should forward to the optimizer', function() {
            const refConfig = {};
            const refResult = {};

            const spy = sinon.spy(function() {
                return refResult;
            });

            const optimizer = {
                optimizeLoadConfiguration: spy,
            };

            const options = {
                optimizer: optimizer,
            };

            const customizer = new Customizer(options);

            const result = customizer._optimizeLoadConfiguration(refConfig);

            expect(optimizer.optimizeLoadConfiguration.callCount).equal(1);
            expect(optimizer.optimizeLoadConfiguration.firstCall.args [0]).equal(refConfig);
            expect(result).equal(refResult);
        });

    });

    describe('#_optimizeSaveConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('_optimizeSaveConfiguration').a('function');
        });

        it('should forward to the optimizer', function() {
            const newConfig = {};
            const oldConfig = {};
            const refResult = {};

            const spy = sinon.spy(function() {
                return refResult;
            });

            const optimizer = {
                optimizeSaveConfiguration: spy,
            };

            const options = {
                optimizer: optimizer,
            };

            const customizer = new Customizer(options);

            const result = customizer._optimizeSaveConfiguration(newConfig, oldConfig);

            expect(optimizer.optimizeSaveConfiguration.callCount).equal(1);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [0]).equal(newConfig);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [1]).equal(oldConfig);
            expect(result).equal(refResult);
        });

    });

});
