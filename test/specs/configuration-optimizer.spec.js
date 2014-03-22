/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var vbus = require('./resol-vbus');



var ConfigurationOptimizer = vbus.ConfigurationOptimizer;



describe('ConfigurationOptimizer', function() {

    describe('.getOptimizerByDeviceAddress', function() {

        it('should be a function', function() {
            expect(ConfigurationOptimizer).property('getOptimizerByDeviceAddress').a('function');
        });

    });

    describe('#getInitialLoadConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('getInitialLoadConfiguration').a('function');
        });

    });

    describe('#optimizeLoadConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('optimizeLoadConfiguration').a('function');
        });

    });

    describe('#getSaveConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('getSaveConfiguration').a('function');
        });

    });

});
