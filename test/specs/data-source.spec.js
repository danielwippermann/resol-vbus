/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    DataSource,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    itShouldBeAClass,
} = require('./test-utils');



describe('DataSource', () => {

    itShouldBeAClass(DataSource, null, {
        provider: null,
        id: null,
        name: null,
        description: null,
        isSupportingLiveData: false,
        isSupportingCustomization: false,
        constructor: Function,
        connectLive: Function,
        createCustomizer: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const dataSource = new DataSource();

            expectOwnPropertyNamesToEqual(dataSource, [
                'provider',
                'id',
                'name',
                'description',
                'isSupportingLiveData',
                'isSupportingCustomization',
            ]);

            expect(dataSource.provider).toBe(null);
            expect(dataSource.id).toBe(null);
            expect(dataSource.name).toBe(null);
            expect(dataSource.description).toBe(null);
            expect(dataSource.isSupportingLiveData).toBe(false);
            expect(dataSource.isSupportingCustomization).toBe(false);
        });

        it('should copy selected options', () => {
            const options = {
                provider: 'provider',
                id: 'id',
                name: 'name',
                description: 'description',
                isSupportingLiveData: true,
                isSupportingCustomization: true,
                junk: 'JUNK',
            };

            const dataSource = new DataSource(options);

            expect(dataSource.provider).toBe(options.provider);
            expect(dataSource.id).toBe(options.id);
            expect(dataSource.name).toBe(options.name);
            expect(dataSource.description).toBe(options.description);
            expect(dataSource.isSupportingLiveData).toBe(options.isSupportingLiveData);
            expect(dataSource.isSupportingCustomization).toBe(options.isSupportingCustomization);
            expect(dataSource.junk).toBe(undefined);
        });

    });

    describe('#connectLive', () => {

        it('should report if not supported', () => {
            const converter = new DataSource();

            expect(() => {
                converter.connectLive();
            }).toThrow('Does not support live data');
        });

        it('should be abstract', () => {
            const converter = new DataSource({
                isSupportingLiveData: true,
            });

            expect(() => {
                converter.connectLive();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#createCustomizer', () => {

        it('should report if not supported', () => {
            const converter = new DataSource();

            expect(() => {
                converter.createCustomizer();
            }).toThrow('Does not support customization');
        });

        it('should be abstract', () => {
            const converter = new DataSource({
                isSupportingCustomization: true,
            });

            expect(() => {
                converter.createCustomizer();
            }).toThrow('Must be implemented by sub-class');
        });

    });

});
