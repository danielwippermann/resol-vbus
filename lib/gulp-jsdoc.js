/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var exec = require('child_process').exec;
var path = require('path');


var gutil = require('gulp-util');
var through2 = require('through2');



var jsdoc = function() {
    var sources = [];

    return through2.obj(function(file, enc, cb) {
        if (file.isNull()) {
            // nop
        } else if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-jsdoc-vbus', 'Streaming not supported'));
        } else {
            sources.push(file.path);
        }

        return cb();
    }, function(cb) {
        var sourceList = sources.map(function(source) {
            return '"' + source.replace(/\\/g, '\\\\').replace(/"/g, '\\\"') + '"';
        }).join(' ');

        var command = 'node_modules/gulp-jsdoc/node_modules/.bin/jsdoc -t node_modules/gulp-jsdoc/node_modules/ink-docstrap/template/ -c jsdoc.json -d .docs/jsdoc/ -l ' + sourceList;

        exec(command, {}, function(err, stdout, stderr) {
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.log(stderr);
            }
            cb(err);
        });
    });
};



module.exports = jsdoc;
