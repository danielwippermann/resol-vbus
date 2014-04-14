/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var vbus = require('./resol-vbus');



var ConfigurationOptimizer = vbus.ConfigurationOptimizer;



describe('ConfigurationOptimizer', function() {

    describe('#completeConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('completeConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            var optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.completeConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#optimizeLoadConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('optimizeLoadConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            var optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.optimizeLoadConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#optimizeSaveConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('optimizeSaveConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            var optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.optimizeSaveConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

});
