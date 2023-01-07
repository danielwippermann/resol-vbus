/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    DataSourceProvider,
} = require('./resol-vbus');


const {
    expect,
    itShouldBeAClass,
} = require('./test-utils');



describe('DataSourceProvider', () => {

    itShouldBeAClass(DataSourceProvider, null, {
        id: null,
        name: null,
        description: null,
        constructor: Function,
        discoverDataSources: Function,
        createDataSource: Function,
    }, {

    });

    describe('#discoverDataSources', () => {

        it('should be abstract', () => {
            const converter = new DataSourceProvider();

            expect(() => {
                converter.discoverDataSources();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#createDataSource', () => {

        it('should be abstract', () => {
            const converter = new DataSourceProvider();

            expect(() => {
                converter.createDataSource();
            }).toThrow('Must be implemented by sub-class');
        });

    });

});
