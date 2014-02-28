/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');



var testUtils = {

    performAsyncTest: function(done, callback) {
        return Q.fcall(callback).then(function() {
            done();
        }).fail(function(reason) {
            done(reason);
        });
    },

    expectPromise: function(promise) {
        expect(promise).to.be.an('object');
        expect(promise).to.have.a.property('then').that.is.a('function');
        return promise;
    },

    expectRanges: function(ranges) {
        expect(ranges).a('array');

        var comparableRanges = _.map(ranges, function(range) {
            return {
                minTimestamp: range.minTimestamp.toISOString(),
                maxTimestamp: range.maxTimestamp.toISOString(),
            };
        });

        return expect(comparableRanges);
    },

};



module.exports = testUtils;
