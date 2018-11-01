/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const Q = require('./q');
const vbus = require('./resol-vbus');
const testUtils = require('./test-utils');



const SerialDataSource = vbus.SerialDataSource;
const SerialDataSourceProvider = vbus.SerialDataSourceProvider;



const TestableSerialDataSourceProvider = SerialDataSourceProvider.extend({

});



const ifHasSerialPortIt = testUtils.ifHasSerialPortIt;



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

        ifHasSerialPortIt('should work correctly', function() {
            const ports = [
                { comName: 'SERIALPORT1' },
                { comName: 'SERIALPORT2' },
            ];

            TestableSerialDataSourceProvider.prototype._listSerialPorts = sinon.spy(function(callback) {
                callback(null, ports);
            });

            const dsp = new TestableSerialDataSourceProvider();

            return Q.fcall(function() {
                const promise = dsp.discoverDataSources();

                return testUtils.expectPromise(promise);
            }).then(function(dataSources) {
                expect(dataSources)
                    .to.be.an('array')
                    .lengthOf(ports.length);
            });
        });

        ifHasSerialPortIt('should reject if an error occurs', function() {
            TestableSerialDataSourceProvider.prototype._listSerialPorts = sinon.spy(function(callback) {
                callback(new Error('ERROR'));
            });

            const dsp = new TestableSerialDataSourceProvider();

            return Q.fcall(function() {
                const promise = dsp.discoverDataSources();

                return testUtils.expectPromise(promise);
            }).then(() => {
                throw new Error('Should have thrown');
            }, () => {
                // nop, expected error
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
            const dsp = new SerialDataSourceProvider();

            const ds = dsp.createDataSource();

            expect(ds)
                .to.be.instanceOf(SerialDataSource);
        });

    });

});
