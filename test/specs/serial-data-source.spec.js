/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Q = require('q');


const vbus = require('./resol-vbus');
const testUtils = require('./test-utils');



const SerialConnection = vbus.SerialConnection;
const SerialDataSource = vbus.SerialDataSource;



describe('SerialDataSource', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(SerialDataSource).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            const ds = new SerialDataSource();

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
            const originalConnect = SerialConnection.prototype.connect;

            SerialConnection.prototype.connect = function() {
                return Q(null);
            };

            const ds = new SerialDataSource();

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
