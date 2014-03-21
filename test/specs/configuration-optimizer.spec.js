/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var vbus = require('./resol-vbus');



var ConfigurationOptimizer = vbus.ConfigurationOptimizer;



describe('ConfigurationOptimizer', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(ConfigurationOptimizer).a('function');
        });

        it('should copy the device address', function() {
            var deviceAddress = 0x1234;

            var optimizer = new ConfigurationOptimizer(deviceAddress);

            expect(optimizer).property('deviceAddress').equal(deviceAddress);
        });

    });

    describe('#getInitialConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('getInitialConfiguration').a('function');
        });

    });

    describe('#optimizeConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('optimizeConfiguration').a('function');
        });

    });

});
