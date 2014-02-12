/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



require('better-stack-traces').install();
var chai = require('chai');
var gulp = require('gulp');
var tasks = require('gulp-load-tasks')();
global.sinon = require('sinon');



chai.Assertion.includeStack = true;

global.expect = chai.expect;



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
        'test/specs/**/*.js'
    ],
    doc: [
        'src/**/*.js',
        '!src/specification-data.js',
        'README.md',
    ],
    coverage: [
        'src/**/*.js',
        '!src/specification-data.js',
    ],
};



gulp.task('default', function() {
    return gulp.src(patterns.all)
        .pipe(tasks.jshint('.jshintrc'))
        .pipe(tasks.jshint.reporter('default'))
        .pipe(tasks.jscs())
        .on('end', function() {
            return gulp.src(patterns.test)
                .pipe(tasks.mocha({
                    ui: 'bdd',
                    reporter: 'spec',
                }));
        });
});


gulp.task('docs', function() {
    return gulp.src(patterns.doc)
        .pipe(tasks.jsdoc('./docs', {
            'path': 'ink-docstrap',
            'cleverLinks': false,
            'monospaceLinks': false,
            'default': {
                'outputSourceFiles': true
            },
            'systemName': 'resol-vbus',
            'footer': '',
            'copyright': 'resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann',
            'navType': 'vertical',
            'theme': 'spacelab',
            'linenums': false,
            'collapseSymbols': false,
            'inverseNav': true
        }));
});


gulp.task('publish', [ 'docs' ], function() {
    return gulp.src('./docs/**/*', { base: './docs' })
        .pipe(gulp.dest('../danielwippermann.github.io/resol-vbus/docs'));
});


gulp.task('coverage', function() {
    return gulp.src(patterns.coverage)
        .pipe(tasks.istanbul())
        .on('end', function() {
            return gulp.src(patterns.test)
                .pipe(tasks.mocha({
                    ui: 'bdd',
                }))
                .pipe(tasks.istanbul.writeReports());
        });
});


gulp.task('coveralls', function() {
    return gulp.src('coverage/lcov.info')
        .pipe(tasks.coveralls());
});


gulp.task('watch', function() {
    gulp.watch(patterns.all, [ 'default' ]);
});
