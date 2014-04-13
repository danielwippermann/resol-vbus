/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var vbus = require('./resol-vbus');



var ConfigurationOptimizer = vbus.ConfigurationOptimizer;



describe('ConfigurationOptimizer', function() {

    describe('#getInitialLoadConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('getInitialLoadConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            var optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.getInitialLoadConfiguration();
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

    describe('#getSaveConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('getSaveConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            var optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.getSaveConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

});
