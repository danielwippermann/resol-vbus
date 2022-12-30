/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    DataSourceProvider,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



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

    itShouldWorkCorrectlyAfterMigratingToClass(DataSourceProvider, null, {
        id: null,
        name: null,
        description: null,
        constructor: Function,
        discoverDataSources: Function,
        createDataSource: Function,
    }, {

    });

});
