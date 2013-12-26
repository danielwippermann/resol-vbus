/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var DataSourceProvider = require('./resol-vbus').DataSourceProvider;



describe('DataSourceProvider', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(DataSourceProvider).to.be.a('function');
        });

    });

    describe('#discoverDataSources', function() {

        it('should be a method', function() {
            expect(DataSourceProvider.prototype.discoverDataSources).to.be.a('function');
        });

        it('should be abstract', function() {
            var converter = new DataSourceProvider();

            expect(function() {
                converter.discoverDataSources();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#createDataSource', function() {

        it('should be a method', function() {
            expect(DataSourceProvider.prototype.createDataSource).to.be.a('function');
        });

        it('should be abstract', function() {
            var converter = new DataSourceProvider();

            expect(function() {
                converter.createDataSource();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

});
