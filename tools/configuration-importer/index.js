/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const path = require('path');


const _ = require('lodash');
const Q = require('q');
const xml2js = require('xml2js');


const ConfigurationXmlDeserializer = require('./configuration-xml-deserializer');



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



const convertMenuXmlFile = function(inputFilename, outputFilename, convert) {
    inputFilename = path.join(__dirname, 'rpt-files', inputFilename);
    outputFilename = path.join(__dirname, '../../src/configuration-optimizers', outputFilename);

    return Q.fcall(() => {
        console.log(outputFilename);

        return Q.npost(fs, 'readFile', [ inputFilename ]);
    }).then((content) => {
        return Q.npost(xml2js, 'parseString', [ content ]);
    }).then((root) => {
        const deserializer = new ConfigurationXmlDeserializer();

        return deserializer.deserializeMenuSystem(root);
    }).then((menuSystem) => {
        return filterPrefsValues(menuSystem);
    }).then((menuSystem) => {
        return mergeTypes(menuSystem);
    }).then((menuSystem) => {
        menuSystem.translationGroups = null;
        menuSystem.strings = null;
        menuSystem.types = null;
        menuSystem.presets = null;
        menuSystem.masks = null;
        menuSystem.linesTemplates = null;
        menuSystem.menus = null;
        menuSystem.implHeaders = null;
        menuSystem.implInitializers = null;

        return menuSystem;
    }).then((menuSystem) => {
        menuSystem.values = _.clone(menuSystem.values).sort((left, right) => {
            let result = right.priority - left.priority;
            if (result === 0) {
                result = left.index - right.index;
            }
            return result;
        });

        return menuSystem;
    }).then((menuSystem) => {
        return convert(menuSystem);
    }).then((menuSystem) => {
        return JSON.stringify(menuSystem, null, '    ');
    }).then((content) => {
        return [
            '/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */',
            '\'use strict\';',
            '',
            '',
            '',
            'var rawConfiguration = ' + content,
            '',
            '',
            '',
            'module.exports = rawConfiguration;',
        ].join('\n');
    }).then((content) => {
        // console.log(content);
        return Q.npost(fs, 'writeFile', [ outputFilename, content ]);
    });
};


const main = function() {
    return Q.fcall(() => {
    //     return convertMenuXmlFile('BS4-Menu.xml', 'resol-deltasol-bs4v2-xxx-data.js', function(menuSystem) {
    //         return menuSystem;
    //     });
    // }).then(function() {
    //     return convertMenuXmlFile('BXPlus-Menu.xml', 'resol-deltasol-bx-plus-xxx-data.js', function(menuSystem) {
    //         return menuSystem;
    //     });
    // }).then(function() {
    //     return convertMenuXmlFile('CSPlus-Menu.xml', 'resol-deltasol-cs-plus-110-data.js', function(menuSystem) {
    //         menuSystem = removeNamedValues(menuSystem, [
    //             /^S[0-9]+(_C|_F)?$/,
    //             /^Emv_DDS_Temperatur(_C|_F)?$/,
    //             /^Save$/,
    //             /^UnitSensor$/,
    //             /^Variantenummer$/,
    //             /^Wmz1_TemperatureSensor[12](_C|_F)?$/,
    //         ]);
    //         return menuSystem;
    //     });
    // }).then(function() {
    //     return convertMenuXmlFile('MX-112-Menu.xml', 'resol-deltasol-mx-112-data.js', function(menuSystem) {
    //         return menuSystem;
    //     });
    // }).then(function() {
    //     return convertMenuXmlFile('HC-Menu.xml', 'resol-deltatherm-hc-xxx-data.js', function(menuSystem) {
    //         return menuSystem;
    //     });


        // ==== CURRENTLY NOT SUPPORTED CONTROLLERS BELOW ====

        // }).then(function() {
        //     return convertMenuXmlFile('BS2-Menu.xml', 'resol-deltasol-bs2v2-xxx-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });
        // }).then(function() {
        //     return convertMenuXmlFile('BSPlus-Menu.xml', 'resol-deltasol-bsplusv2-xxx-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });
        // }).then(function() {
        //     return convertMenuXmlFile('BX-Menu.xml', 'resol-deltasol-bx-xxx-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });
        // }).then(function() {
        //     return convertMenuXmlFile('MX-Menu.xml', 'resol-deltasol-mx-xxx-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });
        // }).then(function() {
        //     return convertMenuXmlFile('BS4-103-Menu.xml', 'resol-deltasol-bs4v2-103-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });
        // }).then(function() {
        //     return convertMenuXmlFile('SL-Menu.xml', 'resol-deltasol-sl-xxx-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });
        // }).then(function() {
        //     return convertMenuXmlFile('HCMini-100-Menu.xml', 'resol-deltatherm-hc-mini-100-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });
        // }).then(function() {
        //     return convertMenuXmlFile('E-Menu.xml', 'resol-deltasol-e-xxx-data.js', function(menuSystem) {
        //         return menuSystem;
        //     });


    }).then(() => {
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

            return convertMenuXmlFile(inputFilename, outputFilename, filter);
        }
    });
};



if (require.main === module) {
    Q.fcall(main).done();
} else {
    module.exports = main;
}
