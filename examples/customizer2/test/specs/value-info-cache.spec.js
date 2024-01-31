const fs = require('fs/promises');
const path = require('path');

const valueInfoCacheModule = require('../../src/value-info-cache');

const {
    expect,
    expectObjectOwnPropertyNamesToEqual,
} = require('./test-utils');


const readableFixtureFilename = path.resolve(__dirname, '../fixtures/cache.json');
const writableFixtureFilename = path.resolve(__dirname, `../fixtures/tmp-cache-${process.pid}.json`);


describe('value-info-cache', () => {

    afterAll(async () => {
        try {
            await fs.unlink(writableFixtureFilename);
        } catch (err) {
            // ignore
        }
    });

    it('should export correctly', () => {
        expectObjectOwnPropertyNamesToEqual(valueInfoCacheModule, [
            'valueInfoCacheDirname',
            'ValueInfoCache',
        ]);
    });

    describe('ValueInfoCache', () => {

        const { ValueInfoCache } = valueInfoCacheModule;

        it('should be a class', () => {
            expectObjectOwnPropertyNamesToEqual(ValueInfoCache.prototype, [
                'constructor',
                'loadFromFile',
                'saveToFile',
                'getValueInfoById',
                'getValueInfoByIndexOrId',
                'setValueIndexById',
            ]);
        });

        describe('constructor', () => {

            it('should work correctly', () => {
                const cache = new ValueInfoCache(0x1234, 0x76543210);

                expectObjectOwnPropertyNamesToEqual(cache, [
                    'filename',
                    'cache',
                    'isDirty',
                ]);

                expect(cache.filename).toMatch(/\/1234_76543210\.json$/);
                expect(cache.cache).toHaveLength(0);
                expect(cache.isDirty).toBe(false);
            });

        });

        describe('loadFromFile', () => {

            it('should work correctly', async () => {
                const cache = new ValueInfoCache(0x1234, 0x76543210);
                cache.filename = readableFixtureFilename;

                await cache.loadFromFile();

                expect(cache.cache).toHaveLength(1);
                expect(cache.cache [0].valueId).toBe('Schema');
                expect(cache.cache [0].valueIdHash).toBe(12345678);
                expect(cache.cache [0].valueIndex).toBe(12345);
                expect(cache.isDirty).toBe(false);

                cache.filename = writableFixtureFilename;

                await cache.loadFromFile();

                expect(cache.cache).toHaveLength(0);
                expect(cache.isDirty).toBe(false);
            });

        });

        describe('saveToFile', () => {

            it('should work correctly', async () => {
                const cache = new ValueInfoCache(0x1234, 0x76543210);
                cache.filename = writableFixtureFilename;

                await cache.saveToFile();

                await expect(async () => {
                    await fs.access(cache.filename);
                }).rejects.toThrow('ENOENT');

                cache.isDirty = true;

                await cache.saveToFile();

                const contents = await fs.readFile(cache.filename, 'utf-8');

                await fs.unlink(cache.filename);

                expect(contents).toBe('[]');
            });

        });

        describe('getValueInfoById', () => {

            it('should work correctly', async () => {
                const cache = new ValueInfoCache(0x1234, 0x76543210);
                cache.filename = readableFixtureFilename;

                await cache.loadFromFile();

                const result1 = cache.getValueInfoById('Schema');

                expect(result1.valueId).toBe('Schema');
                expect(result1.valueIdHash).toBe(12345678);
                expect(result1.valueIndex).toBe(12345);
                expect(cache.isDirty).toBe(false);

                const result2 = cache.getValueInfoById('UnknownValue');

                expect(result2.valueId).toBe('UnknownValue');
                expect(result2.valueIdHash).toBe(206004685);
                expect(result2.valueIndex).toBe(null);
                expect(cache.isDirty).toBe(true);
            });

        });

        describe('getValueInfoByIndexOrId', () => {

            it('should work correctly', async () => {
                const cache = new ValueInfoCache(0x1234, 0x76543210);
                cache.filename = readableFixtureFilename;

                await cache.loadFromFile();

                const result1 = cache.getValueInfoByIndexOrId(null, 'Schema');

                expect(result1.valueId).toBe('Schema');
                expect(result1.valueIdHash).toBe(12345678);
                expect(result1.valueIndex).toBe(12345);
                expect(cache.isDirty).toBe(false);

                const result2 = cache.getValueInfoByIndexOrId(null, 'UnknownValue');

                expect(result2.valueId).toBe('UnknownValue');
                expect(result2.valueIdHash).toBe(206004685);
                expect(result2.valueIndex).toBe(null);
                expect(cache.isDirty).toBe(false);
            });

        });

        describe('setValueIndexById', () => {

            it('should work correctly', async () => {
                const cache = new ValueInfoCache(0x1234, 0x76543210);
                cache.filename = readableFixtureFilename;

                await cache.loadFromFile();

                const result1 = cache.setValueIndexById('Schema', 12345);

                expect(result1.valueId).toBe('Schema');
                expect(result1.valueIdHash).toBe(12345678);
                expect(result1.valueIndex).toBe(12345);
                expect(cache.isDirty).toBe(false);

                const result2 = cache.setValueIndexById('Schema', 23456);

                expect(result2.valueId).toBe('Schema');
                expect(result2.valueIdHash).toBe(12345678);
                expect(result2.valueIndex).toBe(23456);
                expect(cache.isDirty).toBe(true);
            });

        });

    });

});
