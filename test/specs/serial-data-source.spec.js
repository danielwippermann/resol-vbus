/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var Q = require('q');


var vbus = require('./resol-vbus');
var testUtils = require('./test-utils');



var SerialConnection = vbus.SerialConnection;
var SerialDataSource = vbus.SerialDataSource;



describe('SerialDataSource', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(SerialDataSource).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            var ds = new SerialDataSource();

            expect(ds)
                .to.have.a.property('path')
                    .that.equal(null);
        });

    });

    describe('#connectLive', function() {

        it('should be a method', function() {
            expect(SerialDataSource.prototype)
                .to.have.a.property('connectLive')
                    .that.is.a('function');
        });

        it('should work correctly', function(done) {
            var originalConnect = SerialConnection.prototype.connect;

            SerialConnection.prototype.connect = function() {
                return Q(null);
            };

            var ds = new SerialDataSource();

            testUtils.performAsyncTest(done, function() {
                return Q.fcall(function() {
                    return ds.connectLive();
                }).then(function(connection) {
                    expect(connection)
                        .to.be.instanceOf(SerialConnection);
                }).finally(function() {
                    SerialConnection.prototype.connect = originalConnect;
                });
            });
        });

    });

});
