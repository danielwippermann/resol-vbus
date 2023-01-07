/*! resol-vbus | Copyright (c) 2023-present, Daniel Wippermann | MIT license */

const logger = require('./logger');
const { hex } = require('./utils');
const { ValueInfoCache } = require('./value-info-cache');


async function performTransaction(connection, fn) {
    let result;

    logger.debug('Waiting for free bus...');

    const dgram1 = await connection.waitForFreeBus();
    if (dgram1) {
        const peerAddress = dgram1.sourceAddress;

        logger.debug(`Got bus offer from 0x${hex(peerAddress, 4)}, getting changeset...`);

        const dgram2 = await connection.getValueById(peerAddress, 0);
        const changeset = dgram2 ? dgram2.value : 0;

        if (dgram2) {
            logger.debug(`Got changeset 0x${hex(changeset, 8)}!`);
        } else {
            logger.debug(`Unable to get changeset, using 0 as default`);
        }

        const cache = new ValueInfoCache(peerAddress, changeset);

        logger.debug(`Loading value info cache from ${cache.filename}...`);

        await cache.loadFromFile();

        logger.debug(`Cache loaded! Cached entry count: ${cache.cache.length}`);

        try {
            result = await fn({
                connection,
                peerAddress,
                changeset,
                cache,
            });
        } finally {
            logger.debug(`Releasing bus...`);

            await connection.releaseBus(peerAddress);

            logger.debug('Bus released!');

            await cache.saveToFile();
        }
    }

    return result;
}

async function updateCacheForValues(connection, peerAddress, cache, values) {
    let knownValues = 0, unknownValues = 0;
    for (const value of values) {
        const { valueIndex } = cache.getValueInfoById(value.valueId);
        if (valueIndex) {
            knownValues += 1;
        } else {
            unknownValues += 1;
        }
    }

    logger.debug(`Known values: ${knownValues}, unknown values: ${unknownValues}`);

    if (unknownValues > 0) {
        logger.debug(`Value index lookup necessary!`);

        for (const value of values) {
            const { valueId } = value;

            const { valueIdHash, valueIndex } = cache.getValueInfoById(valueId);

            if (!valueIndex) {
                logger.debug(`Getting value index for "${valueId}" (0x${hex(valueIdHash, 8)})...`);

                const dgram3 = await connection.getValueIdByIdHash(peerAddress, valueIdHash);

                const valueIndex = dgram3 ? dgram3.valueId : 0;
                if (valueIndex) {
                    logger.debug(`Got value index 0x${hex(valueIndex, 4)}...`);

                    cache.setValueIndexById(valueId, valueIndex);

                    knownValues += 1;
                    unknownValues -= 1;
                } else {
                    logger.debug(`Unable to get value index, skipping value!`);
                }
            }
        }

        logger.debug(`Value index lookup completed, resyncing...`);

        await connection.getValueById(peerAddress, 0);

        logger.debug(`Resynced!`);

        logger.debug(`Known values: ${knownValues}, unknown values: ${unknownValues}`);
    }
}

async function loadConfiguration(connection, values) {
    return await performTransaction(connection, async ({ peerAddress, cache }) => {
        await updateCacheForValues(connection, peerAddress, cache, values);

        let validValues = 0, invalidValues = 0, unknownValues = 0;

        for (const jobValue of values) {
            const { valueId } = jobValue;

            const { valueIndex } = cache.getValueInfoById(valueId);

            if (valueIndex) {
                logger.debug(`Getting value for "${valueId}" (0x${hex(valueIndex, 4)})...`);

                const dgram3 = await connection.getValueById(peerAddress, valueIndex);
                if (dgram3) {
                    const { value } = dgram3;

                    logger.debug(`Got value ${value} (0x${hex(value, 8)})!`);

                    jobValue.value = value;

                    validValues += 1;
                } else {
                    logger.debug(`Unable to get value, skipping!`);

                    jobValue.value = null;

                    invalidValues += 1;
                }
            } else {
                logger.debug(`Skipping value without value index: "${valueId}"!`);

                jobValue.value = null;

                unknownValues += 1;
            }
        }

        logger.debug(`Valid values: ${validValues}, invalid values: ${invalidValues}, unknown values: ${unknownValues}!`);

        return values;
    });
}

async function saveConfiguration(connection, values) {
    return await performTransaction(connection, async ({ peerAddress, cache }) => {
        await updateCacheForValues(connection, peerAddress, cache, values);

        let validValues = 0, invalidValues = 0, unknownValues = 0;

        for (const jobValue of values) {
            const { valueId, value } = jobValue;

            const { valueIndex } = cache.getValueInfoById(valueId);

            if (valueIndex && (value != null)) {
                logger.debug(`Setting value for "${valueId}" (0x${hex(valueIndex, 4)}) to ${value} (0x${hex(value, 8)})...`);

                const dgram3 = await connection.setValueById(peerAddress, valueIndex, value);
                if (dgram3) {
                    const { value } = dgram3;

                    logger.debug(`Got value ${value} (0x${hex(value, 8)})!`);

                    jobValue.value = value;

                    validValues += 1;
                } else {
                    logger.debug(`Unable to set value, skipping!`);

                    jobValue.value = null;

                    invalidValues += 1;
                }
            } else {
                logger.debug(`Skipping value without value index: "${valueId}"!`);

                jobValue.value = null;

                unknownValues += 1;
            }
        }

        logger.debug(`Valid values: ${validValues}, invalid values: ${invalidValues}, unknown values: ${unknownValues}!`);

        return values;
    });
}


module.exports = {
    performTransaction,
    updateCacheForValues,
    loadConfiguration,
    saveConfiguration,
};
