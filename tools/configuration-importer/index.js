/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var path = require('path');


var _ = require('lodash');
var Q = require('q');
var xml2js = require('xml2js');


var vbus = require('../..');


var ConfigurationXmlDeserializer = require('./configuration-xml-deserializer');



var promise = vbus.utils.promise;



var mergeTypes = function(menuSystem) {
    var typeById = _.reduce(menuSystem.types, function(memo, type) {
        memo [type.id] = type;
        return memo;
    }, {});

    var mergeType = function(info, type) {
        if (type.base) {
            var baseType = typeById [type.base];
            if (baseType) {
                mergeType(info, baseType);
            } else {
                console.log('Unknown base type ' + JSON.stringify(type.base) + ' for type ' + JSON.stringify(type.id));
            }
        } else {
            info.rootTypeId = type.id;
        }

        var keys = [ 'storeFactors', 'displayFactors', 'minimums', 'maximums', 'defaults' ];
        _.forEach(keys, function(key) {
            _.forEach(type [key], function(typeValue) {
                if (!_.isString(typeValue.id) || (typeValue.id === info.id)) {
                    info [key] = typeValue.value;
                }
            });
        });

        _.forEach(type.quants, function(typeQuantValue) {
            if (!_.isString(typeQuantValue.id) || (typeQuantValue.id === info.id)) {
                info.quants [typeQuantValue.step] = typeQuantValue.value;
            }
        });

        _.forEach(type.valueTexts, function(typeValueText) {
            var value = typeValueText.value;
            if (value === null) {
                value = info.valueTexts.length;
            }

            info.valueTexts.push({
                value: value,
                id: typeValueText.id,
            });
        });

        keys = [ 'unit', 'selectorValueRef' ];
        _.forEach(keys, function(key) {
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

    _.forEach(menuSystem.values, function(value) {
        var info = {
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


var filterPrefsValues = function(menuSystem) {
    var valueById = {};
    _.forEach(menuSystem.values, function(value) {
        valueById [value.id] = value;
    });

    var knownValueIds = {}, usedValueIds = {};
    var markValueIdAsUsed = function(valueId) {
        if (!_.has(knownValueIds, valueId)) {
            knownValueIds [valueId] = true;

            var value = valueById [valueId];
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

    _.forEach(menuSystem.values, function(value) {
        if ((value.storage === null) || value.allowParameterization) {
            markValueIdAsUsed(value.id);
        }
    });

    var values = [];
    _.forEach(menuSystem.values, function(value) {
        if (_.has(usedValueIds, value.id)) {
            values.push(value);
        }
    });

    menuSystem = _.clone(menuSystem);
    menuSystem.values = values;

    return menuSystem;
};



var removeNamedValues = function(menuSystem, valueIds) {
    var valueIdPatterns;
    if (_.isArray(valueIds)) {
        valueIdPatterns = valueIds;
    } else {
        valueIdPatterns = [ valueIds ];
    }

    valueIdPatterns = _.map(valueIdPatterns, function(pattern) {
        if (_.isString(pattern)) {
            pattern = new RegExp(pattern, 'i');
        }
        return pattern;
    });

    var values = [];
    _.forEach(menuSystem.values, function(value) {
        var found = false;
        _.forEach(valueIdPatterns, function(pattern) {
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



var convertMenuXmlFile = function(inputFilename, outputFilename, convert) {
    inputFilename = path.join(__dirname, 'rpt-files', inputFilename);
    outputFilename = path.join(__dirname, '../../src/configuration-optimizers', outputFilename);

    return Q.fcall(function() {
        console.log(outputFilename);

        return Q.npost(fs, 'readFile', [ inputFilename ]);
    }).then(function(content) {
        return Q.npost(xml2js, 'parseString', [ content ]);
    }).then(function(root) {
        var deserializer = new ConfigurationXmlDeserializer();

        return deserializer.deserializeMenuSystem(root);
    }).then(function(menuSystem) {
        return filterPrefsValues(menuSystem);
    }).then(function(menuSystem) {
        return mergeTypes(menuSystem);
    }).then(function(menuSystem) {
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
    }).then(function(menuSystem) {
        menuSystem.values = _.clone(menuSystem.values).sort(function(left, right) {
            var result = right.priority - left.priority;
            if (result === 0) {
                result = left.index - right.index;
            }
            return result;
        });

        return menuSystem;
    }).then(function(menuSystem) {
        return convert(menuSystem);
    }).then(function(menuSystem) {
        return JSON.stringify(menuSystem, null, '    ');
    }).then(function(content) {
        return [
            '/*! resol-vbus | Copyright (c) 2013-2015, Daniel Wippermann | MIT license */',
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
    }).then(function(content) {
        // console.log(content);
        return Q.npost(fs, 'writeFile', [ outputFilename, content ]);
    });
};


var main = function() {
    return Q.fcall(function() {
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


    }).then(function() {
        var inputFilename = process.argv [2];
        var outputFilename = process.argv [3];
        var filterFilename = process.argv [4];
        if (inputFilename && outputFilename) {
            var filter;
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
