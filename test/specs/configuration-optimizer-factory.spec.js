/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var Q = require('q');


var vbus = require('./resol-vbus');



var ConfigurationOptimizerFactory = vbus.ConfigurationOptimizerFactory;



describe('ConfigurationOptimizerFactory', function() {

    describe('.getOptimizerByDeviceAddress', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizerFactory).property('getOptimizerByDeviceAddress').a('function');
        });

        promiseIt('should work correctly for unknown devices', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.getOptimizerByDeviceAddress(0x0050);
            }).then(function(optimizer) {
                expect(optimizer).equal(null);
            });
        });

        promiseIt('should work correctly for RESOL DeltaSol BX Plus', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.getOptimizerByDeviceAddress(0x7112);
            }).then(function(optimizer) {
                expect(optimizer).a('object');
            });
        });

    });

});
