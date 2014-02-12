/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var utils = require('./resol-vbus').utils;


var testUtils = require('./test-utils');



describe('utils', function() {

    describe('cancelablePromise', function() {

        it('should be a function', function() {
            expect(utils.cancelablePromise).to.be.a('function');
        });

        it('should resolve correctly', function(done) {
            testUtils.performAsyncTest(done, function() {
                var sharedResult = {};

                var promise = utils.cancelablePromise(function(resolve, reject, notify) {
                    setTimeout(function() {
                        resolve(sharedResult);
                    }, 10);
                });

                testUtils.expectPromise(promise);

                return promise.then(function(result) {
                    expect(result).to.equal(sharedResult);
                }, function() {
                    expect(true).to.equal(false);
                }, function() {
                    expect(true).to.equal(false);
                });
            });
        });

        it('should reject correctly', function(done) {
            testUtils.performAsyncTest(done, function() {
                var sharedReason = {};

                var promise = utils.cancelablePromise(function(resolve, reject, notify) {
                    setTimeout(function() {
                        reject(sharedReason);
                    }, 10);
                });

                testUtils.expectPromise(promise);

                return promise.then(function() {
                    expect(true).to.equal(false);
                }, function(reason) {
                    expect(reason).to.equal(sharedReason);
                }, function() {
                    expect(true).to.equal(false);
                });
            });
        });

        it('should notify correctly', function(done) {
            testUtils.performAsyncTest(done, function() {
                var sharedResult = {}, sharedProgress = {};

                var promise = utils.cancelablePromise(function(resolve, reject, notify) {
                    setTimeout(function() {
                        notify(sharedProgress);

                        setTimeout(function() {
                            resolve(sharedResult);
                        }, 10);
                    }, 10);
                });

                testUtils.expectPromise(promise);

                return promise.then(function(result) {
                    expect(result).to.equal(sharedResult);
                }, function() {
                    expect(true).to.equal(false);
                }, function(progress) {
                    expect(progress).to.equal(sharedProgress);
                });
            });
        });

        it('should cancel correctly', function(done) {
            testUtils.performAsyncTest(done, function() {
                var sharedReason = {};

                var promise = utils.cancelablePromise(function(resolve, reject, notify) {
                    setTimeout(function() {
                        promise.cancel(sharedReason);
                    }, 10);
                });

                testUtils.expectPromise(promise);

                return promise.then(function() {
                    expect(true).to.equal(false);
                }, function(reason) {
                    expect(reason).to.equal(sharedReason);
                });
            });
        });

    });

});
