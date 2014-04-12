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
        if ((value.storage === null)) {
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
            '/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */',
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
        return convertMenuXmlFile('BS2-Menu.xml', 'resol-deltasol-bs2v2-xxx-data.js', function(menuSystem) {
            return menuSystem;
        });
    }).then(function() {
        return convertMenuXmlFile('BS4-Menu.xml', 'resol-deltasol-bs4v2-xxx-data.js', function(menuSystem) {
            return menuSystem;
        });
    }).then(function() {
        return convertMenuXmlFile('BSPlus-Menu.xml', 'resol-deltasol-bsplusv2-xxx-data.js', function(menuSystem) {
            return menuSystem;
        });
    }).then(function() {
        return convertMenuXmlFile('BX-Menu.xml', 'resol-deltasol-bx-xxx-data.js', function(menuSystem) {
            return menuSystem;
        });
    }).then(function() {
        return convertMenuXmlFile('BXPlus-Menu.xml', 'resol-deltasol-bx-plus-xxx-data.js', function(menuSystem) {
            return menuSystem;
        });
    }).then(function() {
        return convertMenuXmlFile('MX-Menu.xml', 'resol-deltasol-mx-xxx-data.js', function(menuSystem) {
            return menuSystem;
        });
    }).then(function() {
        return convertMenuXmlFile('HC-Menu.xml', 'resol-deltasol-hc-xxx-data.js', function(menuSystem) {
            return menuSystem;
        });
    // }).then(function() {
    //     var filename = process.argv [2];
    //     // var filename = '/Users/daniel/Projects/RESOL/DeltaSol_SLT/DeltaSol_SLT/src/Menu_output.xml';

    //     return loadMenuXmlFile(filename);
    });
};



if (require.main === module) {
    Q.fcall(main).done();
} else {
    module.exports = main;
}
