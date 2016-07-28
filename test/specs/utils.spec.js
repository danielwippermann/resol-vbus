/*! resol-vbus | Copyright (c) 2013-2015, Daniel Wippermann | MIT license */
'use strict';



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

    describe('roundNumber', function() {

        it('should be a function', function() {
            expect(utils.roundNumber).to.be.a('function');
        });

        it('should work correctly', function() {
            var result = utils.roundNumber(55.55, -1);
            expect(result).to.equal(55.6);

            result = utils.roundNumber(55.549, -1);
            expect(result).to.equal(55.5);

            result = utils.roundNumber(1.005, -2);
            expect(result).to.equal(1.01);

            result = utils.roundNumber(-24.700000000000003, -1);
            expect(result).to.equal(-24.7);

            var number;

            result = utils.roundNumber(number, 10);
            expect(result).to.equal(undefined);

            result = utils.roundNumber(10, number);
            expect(result).to.equal(10);

            result = utils.roundNumber(10, 0);
            expect(result).to.equal(10);

            result = utils.roundNumber(NaN, 0);
            expect(result).not.to.equal(NaN);

            result = utils.roundNumber(10, 1.2);
            expect(result).not.to.equal(NaN);
        });

    });

});
