/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var vbus = require('./resol-vbus');



var Customizer = vbus.Customizer;



describe('Customizer', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Customizer).a('function');
        });

        it('should have reasonable defaults', function() {
            var options = {
                id: null,
                deviceAddress: 0,
                optimizer: null,
            };

            var customizer = new Customizer();

            expect(customizer).property('id').equal(options.id);
            expect(customizer).property('deviceAddress').equal(options.deviceAddress);
            expect(customizer).property('optimizer').equal(options.optimizer);
        });

        it('should copy selected options', function() {
            var options = {
                id: 'ID',
                deviceAddress: 0x1234,
                optimizer: 'OPTIMIZER',
                junk: 'JUNK',
            };

            var customizer = new Customizer(options);

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

        it('should be an abstract method', function() {
            var customizer = new Customizer();

            expect(function() {
                customizer.loadConfiguration();
            }).to.throw();
        });

    });

    describe('#saveConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('saveConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            var customizer = new Customizer();

            expect(function() {
                customizer.saveConfiguration();
            }).to.throw();
        });

    });

    describe('#_completeConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('_completeConfiguration').a('function');
        });

        it('should forward to the optimizer', function() {
            var refResult = {};

            var spy = sinon.spy(function() {
                return refResult;
            });

            var optimizer = {
                completeConfiguration: spy,
            };

            var options = {
                optimizer: optimizer,
            };

            var customizer = new Customizer(options);

            var result = customizer._completeConfiguration();

            expect(optimizer.completeConfiguration.callCount).equal(1);
            expect(result).equal(refResult);
        });

    });

    describe('#_optimizeLoadConfiguration', function() {

        it('should be a method', function() {
            expect(Customizer.prototype).property('_optimizeLoadConfiguration').a('function');
        });

        it('should forward to the optimizer', function() {
            var refConfig = {};
            var refResult = {};

            var spy = sinon.spy(function() {
                return refResult;
            });

            var optimizer = {
                optimizeLoadConfiguration: spy,
            };

            var options = {
                optimizer: optimizer,
            };

            var customizer = new Customizer(options);

            var result = customizer._optimizeLoadConfiguration(refConfig);

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
            var newConfig = {};
            var oldConfig = {};
            var refResult = {};

            var spy = sinon.spy(function() {
                return refResult;
            });

            var optimizer = {
                optimizeSaveConfiguration: spy,
            };

            var options = {
                optimizer: optimizer,
            };

            var customizer = new Customizer(options);

            var result = customizer._optimizeSaveConfiguration(newConfig, oldConfig);

            expect(optimizer.optimizeSaveConfiguration.callCount).equal(1);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [0]).equal(newConfig);
            expect(optimizer.optimizeSaveConfiguration.firstCall.args [1]).equal(oldConfig);
            expect(result).equal(refResult);
        });

    });

});
