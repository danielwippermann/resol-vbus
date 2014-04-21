/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var Q = require('q');


var vbus = require('./resol-vbus');



var ConfigurationOptimizerFactory = vbus.ConfigurationOptimizerFactory;



describe('ConfigurationOptimizerFactory', function() {

    describe('.createOptimizerByDeviceAddress', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizerFactory).property('createOptimizerByDeviceAddress').a('function');
        });

        promiseIt('should work correctly for unknown devices', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x0050);
            }).then(function(optimizer) {
                expect(optimizer).equal(null);
            });
        });

        promiseIt('should work correctly for RESOL DeltaSol BX Plus', function() {
            return Q.fcall(function() {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7112);
            }).then(function(optimizer) {
                expect(optimizer).a('object');
            });
        });

    });

});
