const path = require('path');

const {
    Datagram,
    Packet,
} = require('../../../resol-vbus');

const customizerModule = require('../../src/customizer');
const { hex } = require('../../src/utils');
const { ValueInfoCache } = require('../../src/value-info-cache');

const {
    expect,
    expectObjectOwnPropertyNamesToEqual,
} = require('./test-utils');


const readableCacheFilename = path.resolve(__dirname, '../fixtures/cache.json');


async function runWithTestableConnection(fn) {
    const connection = {
        simulateNoController: false,
        simulateNoChangesetSupport: false,
        simulateNoSchemaValueSupport: false,

        log: [],

        async waitForFreeBus() {
            connection.log.push('waitForFreeBus()');

            return connection.simulateNoController ? null : new Datagram({
                destinationAddress: 0x0000,
                sourceAddress: 0x7E11,
                command: 0x0500,
                valueId: 0,
                value: 0,
            });
        },

        async releaseBus(peerAddress) {
            connection.log.push(`releaseBus(0x${hex(peerAddress, 4)})`);

            if (peerAddress != 0x7E11) {
                throw new Error(`Unexpected peer address`);
            }

            return connection.simulateNoController ? null : new Packet({
                destinationAddress: 0x0010,
                sourceAddress: 0x7E11,
                command: 0x0100,
                frameCount: 0,
            });
        },

        async getValueById(peerAddress, valueIndex) {
            connection.log.push(`getValueById(0x${hex(peerAddress, 4)}, 0x${hex(valueIndex, 4)})`);

            if (peerAddress != 0x7E11) {
                throw new Error(`Unexpected peer address`);
            }

            let value;
            if (valueIndex === 0) {
                value = (connection.simulateNoChangesetSupport) ? null : 0x12345678;
            } else if (valueIndex === 0x6991) {
                value = connection.simulateNoSchemaValueSupport ? null : valueIndex + 1;
            } else {
                value = valueIndex + 1;
            }

            return (value == null) ? null : new Datagram({
                destinationAddress: 0x0020,
                sourceAddress: 0x7E11,
                command: 0x0100,
                valueId: valueIndex,
                value,
            });
        },

        async setValueById(peerAddress, valueIndex, value) {
            connection.log.push(`setValueById(0x${hex(peerAddress, 4)}, 0x${hex(valueIndex, 4)}, 0x${hex(value, 8)})`);

            if (peerAddress != 0x7E11) {
                throw new Error(`Unexpected peer address`);
            }

            let valueIsSet;
            if (valueIndex === 0x6991) {
                valueIsSet = !connection.simulateNoSchemaValueSupport;
            } else if (valueIndex === 0x5a8a) {
                valueIsSet = true;
            } else {
                valueIsSet = false;
            }

            return (!valueIsSet) ? null : new Datagram({
                destinationAddress: 0x0020,
                sourceAddress: 0x7E11,
                command: 0x0100,
                valueId: valueIndex,
                value,
            });
        },

        async getValueIdByIdHash(peerAddress, valueIdHash) {
            connection.log.push(`getValueIdByIdHash(0x${hex(peerAddress, 4)}, 0x${hex(valueIdHash, 8)})`);

            if (peerAddress !== 0x7E11) {
                throw new Error(`Unexpected peer address`);
            }

            let valueIndex;
            if (valueIdHash === 0x48d66991) {
                // Schema
                valueIndex = 0x6991;
            } else if (valueIdHash === 0x7c515a8a) {
                // KnownValue
                valueIndex = 0x5a8a;
            } else {
                valueIndex = null;
            }

            return (valueIndex == null) ? null : new Datagram({
                destinationAddress: 0x0020,
                sourceAddress: 0x7E11,
                command: 0x0100,
                valueId: valueIndex,
                value: valueIdHash,
            });
        },
    };

    const result = await fn(connection);

    return result;
}

describe('customizer', () => {

    it('should export correctly', () => {
        expectObjectOwnPropertyNamesToEqual(customizerModule, [
            'performTransaction',
            'updateCacheForValues',
            'loadConfiguration',
            'saveConfiguration',
        ]);
    });

    describe('performTransaction', () => {

        const { performTransaction } = customizerModule;

        it('should work correctly', async () => {
            const result1 = await runWithTestableConnection(async (connection) => {
                const options = await performTransaction(connection, async (options) => options);

                return {
                    connection,
                    options,
                };
            });

            expectObjectOwnPropertyNamesToEqual(result1.options, [
                'connection',
                'peerAddress',
                'changeset',
                'cache',
            ]);

            expect(result1.options.connection).toBe(result1.connection);
            expect(result1.options.peerAddress).toBe(0x7E11);
            expect(result1.options.changeset).toBe(0x12345678);
            expect(result1.options.cache.filename).toMatch(/\/7e11_12345678\.json$/);

            await runWithTestableConnection(async (connection) => {
                connection.simulateNoController = true;

                await performTransaction(connection, async () => {});
            });

            await runWithTestableConnection(async (connection) => {
                connection.simulateNoChangesetSupport = true;

                await performTransaction(connection, async () => {});
            });
        });

    });

    describe('updateCacheForValues', () => {

        const { updateCacheForValues } = customizerModule;

        it('should work correctly', async () => {
            await runWithTestableConnection(async (connection) => {
                const peerAddress = 0x7E11;

                const cache = new ValueInfoCache(peerAddress, 0x12345678);
                await cache.loadFromFile();

                const values1 = [{
                    valueId: 'Schema',
                }, {
                    valueId: 'KnownValue',
                }, {
                    valueId: 'UnknownValue',
                }];

                await updateCacheForValues(connection, peerAddress, cache, values1);

                expect(cache.cache).toHaveLength(3);
                expect(cache.cache [0].valueId).toBe('Schema');
                expect(cache.cache [0].valueIndex).toBe(0x6991);
                expect(cache.cache [1].valueId).toBe('KnownValue');
                expect(cache.cache [1].valueIndex).toBe(0x5a8a);
                expect(cache.cache [2].valueId).toBe('UnknownValue');
                expect(cache.cache [2].valueIndex).toBe(null);

                expect(connection.log).toEqual([
                    'getValueIdByIdHash(0x7e11, 0x48d66991)',
                    'getValueIdByIdHash(0x7e11, 0x7c515a8a)',
                    'getValueIdByIdHash(0x7e11, 0x0c4761cd)',
                    'getValueById(0x7e11, 0x0000)',
                ]);

                // try again to get unknown value
                connection.log = [];

                await updateCacheForValues(connection, peerAddress, cache, values1);

                expect(connection.log).toEqual([
                    'getValueIdByIdHash(0x7e11, 0x0c4761cd)',
                    'getValueById(0x7e11, 0x0000)',
                ]);

                // nop, since all values are known
                connection.log = [];

                await updateCacheForValues(connection, peerAddress, cache, values1.slice(0, 2));

                expect(connection.log).toEqual([
                    // empty
                ]);
            });
        });

    });

    describe('loadConfiguration', () => {

        const { loadConfiguration } = customizerModule;

        it('should work correctly', async () => {
            await runWithTestableConnection(async (connection) => {
                const values1 = [
                    { valueId: 'Schema' },
                    { valueId: 'KnownValue' },
                    { valueId: 'UnknownValue' },
                ];

                const result1 = await loadConfiguration(connection, values1);

                expect(result1).toBe(values1);
                expect(result1).toHaveLength(3);
                expect(result1 [0].value).toBe(0x6992);
                expect(result1 [1].value).toBe(0x5a8b);
                expect(result1 [2].value).toBe(null);

                expect(connection.log).toEqual([
                    'waitForFreeBus()',
                    'getValueById(0x7e11, 0x0000)',
                    'getValueIdByIdHash(0x7e11, 0x48d66991)',
                    'getValueIdByIdHash(0x7e11, 0x7c515a8a)',
                    'getValueIdByIdHash(0x7e11, 0x0c4761cd)',
                    'getValueById(0x7e11, 0x0000)',
                    'getValueById(0x7e11, 0x6991)',
                    'getValueById(0x7e11, 0x5a8a)',
                    'releaseBus(0x7e11)',
                ]);

                connection.log = [];
                connection.simulateNoSchemaValueSupport = true;

                const result2 = await loadConfiguration(connection, values1.slice(0, 1));

                expect(result2).toHaveLength(1);
                expect(result2 [0].value).toBe(null);

                expect(connection.log).toEqual([
                    'waitForFreeBus()',
                    'getValueById(0x7e11, 0x0000)',
                    'getValueById(0x7e11, 0x6991)',
                    'releaseBus(0x7e11)',
                ]);
            });
        });

    });

    describe('saveConfiguration', () => {

        const { saveConfiguration } = customizerModule;

        it('should work correctly', async () => {
            await runWithTestableConnection(async (connection) => {
                const values1 = [
                    { valueId: 'Schema', value: 1 },
                    { valueId: 'KnownValue', value: null },
                    { valueId: 'UnknownValue', value: 2 },
                ];

                const result1 = await saveConfiguration(connection, values1);

                expect(result1).toBe(values1);
                expect(result1).toHaveLength(3);
                expect(result1 [0].value).toBe(1);
                expect(result1 [1].value).toBe(null);
                expect(result1 [2].value).toBe(null);

                expect(connection.log).toEqual([
                    'waitForFreeBus()',
                    'getValueById(0x7e11, 0x0000)',
                    'getValueIdByIdHash(0x7e11, 0x0c4761cd)',
                    'getValueById(0x7e11, 0x0000)',
                    'setValueById(0x7e11, 0x6991, 0x00000001)',
                    'releaseBus(0x7e11)',
                ]);

                connection.log = [];
                connection.simulateNoSchemaValueSupport = true;

                const result2 = await saveConfiguration(connection, values1.slice(0, 1));

                expect(result2).toHaveLength(1);
                expect(result2 [0].value).toBe(null);

                expect(connection.log).toEqual([
                    'waitForFreeBus()',
                    'getValueById(0x7e11, 0x0000)',
                    'setValueById(0x7e11, 0x6991, 0x00000001)',
                    'releaseBus(0x7e11)',
                ]);
            });
        });

    });

});
