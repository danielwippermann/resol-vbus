/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const DataSourceProvider = require('./resol-vbus').DataSourceProvider;



describe('DataSourceProvider', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(DataSourceProvider).to.be.a('function');
        });

    });

    describe('#discoverDataSources', () => {

        it('should be a method', () => {
            expect(DataSourceProvider.prototype.discoverDataSources).to.be.a('function');
        });

        it('should be abstract', () => {
            const converter = new DataSourceProvider();

            expect(() => {
                converter.discoverDataSources();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#createDataSource', () => {

        it('should be a method', () => {
            expect(DataSourceProvider.prototype.createDataSource).to.be.a('function');
        });

        it('should be abstract', () => {
            const converter = new DataSourceProvider();

            expect(() => {
                converter.createDataSource();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

});
