/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var DataSource = require('./resol-vbus').DataSource;



describe('DataSource', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(DataSource).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            var dataSource = new DataSource();

            expect(dataSource).to.be.an('object');
            expect(dataSource.provider).to.equal(null);
            expect(dataSource.id).to.equal(null);
            expect(dataSource.name).to.equal(null);
            expect(dataSource.description).to.equal(null);
            expect(dataSource.isSupportingLiveData).to.equal(false);
            expect(dataSource.isSupportingRecordedData).to.equal(false);
            expect(dataSource.isSupportingCustomization).to.equal(false);
        });

        it('should copy selected options', function() {
            var dataSource = new DataSource({
                provider: 'provider',
                id: 'id',
                name: 'name',
                description: 'description',
                isSupportingLiveData: true,
                isSupportingRecordedData: true,
                isSupportingCustomization: true,
                junk: 'JUNK',
            });

            expect(dataSource).to.be.an('object');
            expect(dataSource.provider).to.equal('provider');
            expect(dataSource.id).to.equal('id');
            expect(dataSource.name).to.equal('name');
            expect(dataSource.description).to.equal('description');
            expect(dataSource.isSupportingLiveData).to.equal(true);
            expect(dataSource.isSupportingRecordedData).to.equal(true);
            expect(dataSource.isSupportingCustomization).to.equal(true);
            expect(dataSource.junk).to.equal(undefined);
        });

    });

    describe('#connectLive', function() {

        it('should be a method', function() {
            expect(DataSource.prototype.connectLive).to.be.a('function');
        });

        it('should report if not supported', function() {
            var converter = new DataSource();

            expect(function() {
                converter.connectLive();
            }).to.throw(Error, 'Does not support live data');
        });

        it('should be abstract', function() {
            var converter = new DataSource({
                isSupportingLiveData: true,
            });

            expect(function() {
                converter.connectLive();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#openRecorder', function() {

        it('should be a method', function() {
            expect(DataSource.prototype.openRecorder).to.be.a('function');
        });

        it('should report if not supported', function() {
            var converter = new DataSource();

            expect(function() {
                converter.openRecorder();
            }).to.throw(Error, 'Does not support recorded data');
        });

        it('should be abstract', function() {
            var converter = new DataSource({
                isSupportingRecordedData: true,
            });

            expect(function() {
                converter.openRecorder();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#createCustomizer', function() {

        it('should be a method', function() {
            expect(DataSource.prototype).property('createCustomizer').to.be.a('function');
        });

        it('should report if not supported', function() {
            var converter = new DataSource();

            expect(function() {
                converter.createCustomizer();
            }).to.throw(Error, 'Does not support customization');
        });

        it('should be abstract', function() {
            var converter = new DataSource({
                isSupportingCustomization: true,
            });

            expect(function() {
                converter.createCustomizer();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

});
