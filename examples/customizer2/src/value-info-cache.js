/*! resol-vbus | Copyright (c) 2023-present, Daniel Wippermann | MIT license */

const fs = require('fs/promises');
const path = require('path');

const { calcValueIdHash, hex } = require('./utils');


const valueInfoCacheDirname = path.resolve(__dirname, '../cache');


class ValueInfoCache {

    constructor(address, changeset) {
        this.filename = path.resolve(valueInfoCacheDirname, `${hex(address, 4)}_${hex(changeset, 8)}.json`);
        this.cache = [];
        this.isDirty = false;
    }

    async loadFromFile() {
        try {
            const cacheString = await fs.readFile(this.filename);
            this.cache = JSON.parse(cacheString);
        } catch (err) {
            this.cache = [];
        }
        this.isDirty = false;
    }

    async saveToFile() {
        if (this.isDirty) {
            const cacheString = JSON.stringify(this.cache, null, 4);
            await fs.writeFile(this.filename, cacheString);
            this.isDirty = false;
        }
    }

    getValueInfoById(valueId) {
        let valueInfo = this.cache.find(info => info.valueId === valueId);
        if (!valueInfo) {
            valueInfo = {
                valueId,
                valueIdHash: calcValueIdHash(valueId),
                valueIndex: null,
            };
            this.cache.push(valueInfo);
            this.isDirty = true;
        }
        return valueInfo;
    }

    setValueIndexById(valueId, valueIndex) {
        const valueInfo = this.getValueInfoById(valueId);
        if (valueInfo.valueIndex !== valueIndex) {
            valueInfo.valueIndex = valueIndex;
            this.isDirty = true;
        }
        return valueInfo;
    }

}


module.exports = {
    valueInfoCacheDirname,
    ValueInfoCache,
};
