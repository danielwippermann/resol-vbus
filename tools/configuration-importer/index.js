/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const path = require('path');


const _ = require('lodash');
const xml2js = require('xml2js');


const ConfigurationXmlDeserializer = require('./configuration-xml-deserializer');



function promisify(fn) {
    return new Promise((resolve, reject) => {
        fn((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


const mergeTypes = function(menuSystem) {
    const typeById = _.reduce(menuSystem.types, (memo, type) => {
        memo [type.id] = type;
        return memo;
    }, {});

    const mergeType = function(info, type) {
        if (type.base) {
            const baseType = typeById [type.base];
            if (baseType) {
                mergeType(info, baseType);
            } else {
                console.log('Unknown base type ' + JSON.stringify(type.base) + ' for type ' + JSON.stringify(type.id));
            }
        } else {
            info.rootTypeId = type.id;
        }

        let keys = [ 'storeFactors', 'displayFactors', 'minimums', 'maximums', 'defaults' ];
        _.forEach(keys, (key) => {
            _.forEach(type [key], (typeValue) => {
                if (!_.isString(typeValue.id) || (typeValue.id === info.id)) {
                    info [key] = typeValue.value;
                }
            });
        });

        _.forEach(type.quants, (typeQuantValue) => {
            if (!_.isString(typeQuantValue.id) || (typeQuantValue.id === info.id)) {
                info.quants [typeQuantValue.step] = typeQuantValue.value;
            }
        });

        _.forEach(type.valueTexts, (typeValueText) => {
            let value = typeValueText.value;
            if (value === null) {
                value = info.valueTexts.length;
            }

            info.valueTexts.push({
                value,
                id: typeValueText.id,
            });
        });

        keys = [ 'unit', 'selectorValueRef' ];
        _.forEach(keys, (key) => {
            if (type [key] !== null) {
                info [key] = type [key];
            }
        });

        if (type.unit) {
            info.unit = type.unit;
        }

        if (type.size) {
            info.size = type.size;
        }
    };

    _.forEach(menuSystem.values, (value) => {
        const info = {
            id: value.id,
            quants: [],
            valueTexts: [],
        };

        mergeType(info, value.type);

        delete info.id;
        if (info.quants.length === 0) {
            delete info.quants;
        }
        if (info.valueTexts.length === 0) {
            delete info.valueTexts;
        }

        value.type = info;
    });

    return menuSystem;
};


const filterPrefsValues = function(menuSystem) {
    const valueById = {};
    _.forEach(menuSystem.values, (value) => {
        valueById [value.id] = value;
    });

    const knownValueIds = {}, usedValueIds = {};
    const markValueIdAsUsed = function(valueId) {
        if (!_.has(knownValueIds, valueId)) {
            knownValueIds [valueId] = true;

            const value = valueById [valueId];
            if (value !== undefined) {
                if (value.compoundValueRef) {
                    markValueIdAsUsed(value.compoundValueRef);
                }
                usedValueIds [valueId] = true;
            } else {
                console.log('Unknown value ID ' + JSON.stringify(valueId));
            }
        }
    };

    _.forEach(menuSystem.values, (value) => {
        if ((value.storage === null) || value.allowParameterization) {
            markValueIdAsUsed(value.id);
        }
    });

    const values = [];
    _.forEach(menuSystem.values, (value) => {
        if (_.has(usedValueIds, value.id)) {
            values.push(value);
        }
    });

    menuSystem = _.clone(menuSystem);
    menuSystem.values = values;

    return menuSystem;
};



// eslint-disable-next-line no-unused-vars
const removeNamedValues = function(menuSystem, valueIds) {
    let valueIdPatterns;
    if (_.isArray(valueIds)) {
        valueIdPatterns = valueIds;
    } else {
        valueIdPatterns = [ valueIds ];
    }

    valueIdPatterns = _.map(valueIdPatterns, (pattern) => {
        if (_.isString(pattern)) {
            pattern = new RegExp(pattern, 'i');
        }
        return pattern;
    });

    const values = [];
    _.forEach(menuSystem.values, (value) => {
        let found = false;
        _.forEach(valueIdPatterns, (pattern) => {
            if (pattern.test(value.id)) {
                found = true;
            }
            return !found;
        });
        if (!found) {
            values.push(value);
        }
    });

    menuSystem = _.clone(menuSystem);
    menuSystem.values = values;

    return menuSystem;
};



const convertMenuXmlFile = async function(inputFilename, outputFilename, convert) {
    inputFilename = path.resolve(__dirname, 'rpt-files', inputFilename);
    outputFilename = path.resolve(__dirname, '../../src/configuration-optimizers', outputFilename);

    console.log(outputFilename);

    const content = await promisify(cb => fs.readFile(inputFilename, cb));

    const root = await promisify(cb => xml2js.parseString(content, cb));

    const deserializer = new ConfigurationXmlDeserializer();

    let menuSystem = await deserializer.deserializeMenuSystem(root);

    menuSystem = filterPrefsValues(menuSystem);

    menuSystem = mergeTypes(menuSystem);

    menuSystem.translationGroups = null;
    menuSystem.strings = null;
    menuSystem.types = null;
    menuSystem.presets = null;
    menuSystem.masks = null;
    menuSystem.linesTemplates = null;
    menuSystem.menus = null;
    menuSystem.implHeaders = null;
    menuSystem.implInitializers = null;

    menuSystem.values = _.clone(menuSystem.values).sort((left, right) => {
        let result = right.priority - left.priority;
        if (result === 0) {
            result = left.index - right.index;
        }
        return result;
    });

    menuSystem = await convert(menuSystem);

    const jsonContent = JSON.stringify(menuSystem, null, '    ');

    const jsContent = [
        '/*! resol-vbus | Copyright (c) 2013-2019, Daniel Wippermann | MIT license */',
        '\'use strict\';',
        '',
        '',
        '',
        'var rawConfiguration = ' + jsonContent,
        '',
        '',
        '',
        'module.exports = rawConfiguration;',
    ].join('\n');

    await promisify(cb => fs.writeFile(outputFilename, jsContent, cb));
};


async function main() {
    const inputFilename = process.argv [2];
    const outputFilename = process.argv [3];
    const filterFilename = process.argv [4];
    if (inputFilename && outputFilename) {
        let filter;
        if (filterFilename) {
            filter = require(filterFilename);
        } else {
            filter = function(menuSystem) {
                return menuSystem;
            };
        }

        await convertMenuXmlFile(inputFilename, outputFilename, filter);
    }
}


if (require.main === module) {
    main().then(null, err => {
        console.log(err);
        process.exit(1);
    });
} else {
    module.exports = main;
}
