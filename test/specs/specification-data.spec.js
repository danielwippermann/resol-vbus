/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var Specification = require('./resol-vbus').Specification;



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

});
