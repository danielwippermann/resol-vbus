/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var vbus = require('./resol-vbus');



var Specification = vbus.Specification;



describe('SpecificationData', function() {

    it('is auto-generated, just increase test coverage :)', function() {
        this.slow(1000);

        var spec = new Specification();

        var specificationData = spec.specificationData;

        var buffer = new Buffer(127 * 4);

        _.forEach(specificationData.getRawValueFunctions, function(getRawValue) {
            getRawValue(buffer, 0, buffer.length);
        });
    });

    it('should calc multi-byte masks correctly', function() {
    	var buffer = new Buffer(76);
    	buffer.fill(0);

    	var spec = Specification.getDefaultSpecification();

    	var pfs = spec.getPacketFieldSpecification('00_0010_7761_0100_036_1_8388608');

    	spec.setRawValue(pfs, 3, buffer);

    	expect(buffer [36]).equal(0);
    	expect(buffer [37]).equal(0);
    	expect(buffer [38]).equal(128);
    	expect(buffer [39]).equal(0);

    	var rv = spec.getRawValue(pfs, buffer);

    	expect(rv).equal(1);

    	spec.setRawValue(pfs, 4, buffer);

    	expect(buffer [36]).equal(0);
    	expect(buffer [37]).equal(0);
    	expect(buffer [38]).equal(0);
    	expect(buffer [39]).equal(0);

    	rv = spec.getRawValue(pfs, buffer);

    	expect(rv).equal(0);
    });

});
