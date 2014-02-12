/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



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
        expect(promise.then).to.be.a('function');
        return promise;
    },

};



module.exports = testUtils;
