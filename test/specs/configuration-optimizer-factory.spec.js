/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var vbus = require('./resol-vbus');



var ConfigurationOptimizerFactory = vbus.ConfigurationOptimizerFactory;



describe('ConfigurationOptimizerFactory', function() {

    describe('.getOptimizerByDeviceAddress', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizerFactory).property('getOptimizerByDeviceAddress').a('function');
        });

    });

});
