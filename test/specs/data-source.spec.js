/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    DataSource,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('DataSource', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(DataSource).to.be.a('function');
        });

        it('should have reasonable defaults', () => {
            const dataSource = new DataSource();

            expect(dataSource).to.be.an('object');
            expect(dataSource.provider).to.equal(null);
            expect(dataSource.id).to.equal(null);
            expect(dataSource.name).to.equal(null);
            expect(dataSource.description).to.equal(null);
            expect(dataSource.isSupportingLiveData).to.equal(false);
            expect(dataSource.isSupportingRecordedData).to.equal(false);
            expect(dataSource.isSupportingCustomization).to.equal(false);
        });

        it('should copy selected options', () => {
            const dataSource = new DataSource({
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

    describe('#connectLive', () => {

        it('should be a method', () => {
            expect(DataSource.prototype.connectLive).to.be.a('function');
        });

        it('should report if not supported', () => {
            const converter = new DataSource();

            expect(() => {
                converter.connectLive();
            }).to.throw(Error, 'Does not support live data');
        });

        it('should be abstract', () => {
            const converter = new DataSource({
                isSupportingLiveData: true,
            });

            expect(() => {
                converter.connectLive();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#openRecorder', () => {

        it('should be a method', () => {
            expect(DataSource.prototype.openRecorder).to.be.a('function');
        });

        it('should report if not supported', () => {
            const converter = new DataSource();

            expect(() => {
                converter.openRecorder();
            }).to.throw(Error, 'Does not support recorded data');
        });

        it('should be abstract', () => {
            const converter = new DataSource({
                isSupportingRecordedData: true,
            });

            expect(() => {
                converter.openRecorder();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#createCustomizer', () => {

        it('should be a method', () => {
            expect(DataSource.prototype).property('createCustomizer').to.be.a('function');
        });

        it('should report if not supported', () => {
            const converter = new DataSource();

            expect(() => {
                converter.createCustomizer();
            }).to.throw(Error, 'Does not support customization');
        });

        it('should be abstract', () => {
            const converter = new DataSource({
                isSupportingCustomization: true,
            });

            expect(() => {
                converter.createCustomizer();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(DataSource, null, {
        provider: null,
        id: null,
        name: null,
        description: null,
        isSupportingLiveData: false,
        isSupportingRecordedData: false,
        isSupportingCustomization: false,
        constructor: Function,
        connectLive: Function,
        openRecorder: Function,
        createCustomizer: Function,
    }, {

    });

});
