/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var path = require('path');


var glob = require('glob');
var _ = require('lodash');
var minimist = require('minimist');
var Q = require('q');
var xml2js = require('xml2js');


var checkSpec = require('./checker');
var cleanupSpec = require('./cleanup');
var VBusSpecDeserializer = require('./deserializer');
var models = require('./models');
var generateVBusSpecificationData = require('./specification-data-generator');
var generateVBusSpecificationDocs = require('./specification-docs-generator');



/*
 * mkdir <tmpdir>
 * cd <tmpdir>
 * 7z x <RSC setup exe>
 * mkdir resol
 * cp -a \$_OUTDIR/plugins/de.resol* resol/
 * cd resol
 * for NAME in *.jar; do DIR="$(basename $NAME .jar)"; mkdir $DIR; (cd $DIR; 7z x ../$NAME); done
 * rm ./de.resol.servicecenter.vbus.cosmo_2.0.0/VBusSpecificationCosmoMulti.xml
 * find . -iname VBus*.xml
 * node .../specification-import/index.js
 */



var main = function() {
    var args = minimist(process.argv.slice(2));

    return Q.fcall(function() {
        if (args.fileList) {
            return Q.fcall(function() {
                return Q.npost(fs, 'readFile', [ args.fileList ]);
            }).then(function(contentsAsBuffer) {
                var contentsAsString = contentsAsBuffer.toString('utf-8');
                var lines = contentsAsString.split(/\r?\n/g);
                return lines;
            });
        } else if (args.files) {
            return Q([ args.files ]);
        } else if (args.allXmls) {
            return Q([ '**/*.xml' ]);
        } else {
            return Q([ '**/VBus*.xml' ]);
        }
    }).then(function(globList) {
        var rscExtractPath = args._ [0] || '.';

        return _.reduce(globList, function(promise, pattern) {
            return promise.then(function(files) {
                if (!pattern) {
                    return files;
                } else if (/^#/.test(pattern)) {
                    return files;
                } else {
                    var negatedMd = /^!(.*)$/.exec(pattern);
                    var isNegated;
                    if (negatedMd) {
                        isNegated = true;
                        pattern = negatedMd [1];
                    } else {
                        isNegated = false;
                    }


                    return Q.fcall(function() {
                        return Q.nfapply(glob, [ path.join(rscExtractPath, pattern) ]);
                    }).then(function(foundFiles) {
                        if (isNegated) {
                            files = _.difference(files, foundFiles);
                        } else {
                            files = _.union(files, foundFiles);
                        }

                        return files;
                    });
                }
            });
        }, Q([])).then(function(files) {
            return files.sort();
        });
    }).then(function(filenames) {
        var promise = Q();

        var spec = new models.VBusSpecification();

        _.forEach(filenames, function(filename) {
            promise = promise.then(function() {
                return Q.npost(fs, 'readFile', [ filename ]);
            }).then(function(content) {
                return Q.npost(xml2js, 'parseString', [ content ]);
            }).then(function(xmlRoot) {
                var specRoot = xmlRoot.vbusSpecification;

                if (specRoot) {
                    var deserializer = new VBusSpecDeserializer();

                    deserializer._modelAnnotations = {
                        _filename: filename,
                    };

                    deserializer.deserializeVBusSpecification(specRoot, spec);
                } else {
                    throw new Error('Unknown root element');
                }
            });
        });

        return promise.then(function() {
            return spec;
        });
    }).then(function(spec) {
        return cleanupSpec(spec);
    }).then(function(spec) {
        return checkSpec(spec);
    }).then(function(spec) {
        if (args.plugin) {
            var pluginFilename = path.resolve(args.plugin);
            var plugin = require(pluginFilename);
            return plugin(spec);
        } else if (args.docs) {
            return generateVBusSpecificationDocs(spec);
        } else if (!args.nop) {
            return generateVBusSpecificationData(spec);
        }
    }).then(function(output) {
        if (args.out) {
            return Q.npost(fs, 'writeFile', [ args.out, output ]);
        } else {
            console.log(output);
        }
    });
};



if (require.main === module) {
    Q.fcall(main).done();
} else {
    module.exports = main;
}
