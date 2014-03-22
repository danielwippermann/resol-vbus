/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var exec = require('child_process').exec;


require('better-stack-traces').install();
var chai = require('chai');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Q = require('q');
global.sinon = require('sinon');


var jsdoc = require('./lib/gulp-jsdoc');


chai.Assertion.includeStack = true;

global.expect = chai.expect;



global.promiseIt = function(message, callback) {
    it(message, function(done) {
        var _this = this;

        Q.fcall(function() {
            return callback.call(_this);
        }).then(function() {
            done();
        }, function(err) {
            done(err);
        }).done();
    });
};

global.xpromiseIt = function(message, callback) {
    xit(message, function() {
        // x-ed test
    });
};



var patterns = {
    src: [
        'src/**/*.js',
    ],
    test: [
        'test/specs/**/*.spec.js',
    ],
    all: [
        'src/**/*.js',
        '!src/specification-data.js',
        '!src/configurations/**/*-data.js',
        'test/specs/**/*.js'
    ],
    jsdoc: [
        'src/**/*.js',
        '!src/specification-data.js',
        'README.md',
    ],
    coverage: [
        'src/**/*.js',
        '!src/specification-data.js',
    ],
    docs: [
        'docs/**/*',
        '!docs/_site/**/*',
    ],
};



gulp.task('jshint', function() {
    return gulp.src(patterns.all)
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'));
});


gulp.task('jscs', function() {
    return gulp.src(patterns.all)
        .pipe(plugins.jscs());
});


gulp.task('mocha', function() {
    return gulp.src(patterns.test)
        .pipe(plugins.mocha({
            ui: 'bdd',
            reporter: 'dot',
        }));
});


gulp.task('jsdoc', function() {
    return gulp.src(patterns.jsdoc)
        .pipe(jsdoc());
});


gulp.task('jekyll', function(done) {
    exec('jekyll build', { cwd: 'docs' }, function(err) {
        if (err) {
            done(err);
        } else {
            gulp.src('docs/_site/**/*', { base: 'docs/_site' })
                .pipe(gulp.dest('.docs/'))
                .on('error', done)
                .on('end', done);
        }
    });
});


gulp.task('publish', [ 'jekyll', 'jsdoc' ], function() {
    return gulp.src('.docs/**/*', { base: './.docs' })
        .pipe(gulp.dest('../danielwippermann.github.io/resol-vbus'));
});


gulp.task('coverage-prepare', function() {
    return gulp.src(patterns.coverage)
        .pipe(plugins.istanbul());
});


gulp.task('coverage', [ 'coverage-prepare' ], function(done) {
    return gulp.src(patterns.test)
        .pipe(plugins.mocha({
            ui: 'bdd',
        }))
        .pipe(plugins.istanbul.writeReports());
});


gulp.task('coveralls', function() {
    return gulp.src('coverage/lcov.info')
        .pipe(plugins.coveralls());
});


gulp.task('watch', function() {
    gulp.watch(patterns.all, [ 'default' ]);
});


gulp.task('test-force-exit', [ 'jshint', 'jscs', 'mocha' ], function() {
    process.exit(0);
});


gulp.task('coverage-force-exit', [ 'coverage' ], function() {
    process.exit(0);
});


gulp.task('default', [ 'jshint', 'jscs', 'mocha' ]);


gulp.task('nodemon', [ 'coverage', 'jsdoc' ]);
