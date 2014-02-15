/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var Q = require('q');
var serialport = require('serialport');


var vbus = require('./resol-vbus');
var testUtils = require('./test-utils');



var SerialDataSource = vbus.SerialDataSource;
var SerialDataSourceProvider = vbus.SerialDataSourceProvider;



describe('SerialDataSourceProvider', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(SerialDataSourceProvider)
                .to.be.a('function')
                .that.has.a.property('extend')
                    .that.is.a('function');
        });

    });

    describe('#discoverDataSources', function() {

        it('should be a method', function() {
            expect(SerialDataSourceProvider.prototype)
                .to.have.a.property('discoverDataSources')
                    .that.is.a('function');
        });

        it('should work correctly', function(done) {
            var originalList = serialport.list;

            var ports = [
                { comName: 'SERIALPORT1' },
                { comName: 'SERIALPORT2' },
            ];

            serialport.list = sinon.spy(function(callback) {
                callback(null, ports);
            });

            var dsp = new SerialDataSourceProvider();

            testUtils.performAsyncTest(done, function() {
                return Q.fcall(function() {
                    var promise = dsp.discoverDataSources();

                    return testUtils.expectPromise(promise);
                }).then(function(dataSources) {
                    expect(dataSources)
                        .to.be.an('array')
                        .lengthOf(ports.length);
                }).finally(function() {
                    serialport.list = originalList;
                });
            });
        });

        it('should reject if an error occurs', function(done) {
            var originalList = serialport.list;

            serialport.list = sinon.spy(function(callback) {
                callback(new Error('ERROR'));
            });

            var dsp = new SerialDataSourceProvider();

            var callback = function(err) {
                if (err) {
                    done();
                } else {
                    done(new Error('Should have thrown'));
                }
            };

            testUtils.performAsyncTest(callback, function() {
                return Q.fcall(function() {
                    var promise = dsp.discoverDataSources();

                    return testUtils.expectPromise(promise);
                }).finally(function() {
                    serialport.list = originalList;
                });
            });
        });

    });

    describe('#createDataSource', function() {

        it('should be a method', function() {
            expect(SerialDataSourceProvider.prototype)
                .to.have.a.property('createDataSource')
                    .that.is.a('function');
        });

        it('should work correctly', function() {
            var dsp = new SerialDataSourceProvider();

            var ds = dsp.createDataSource();

            expect(ds)
                .to.be.instanceOf(SerialDataSource);
        });

    });

});
