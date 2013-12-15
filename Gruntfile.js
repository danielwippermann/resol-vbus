/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



module.exports = function(grunt) {
    // configure tasks
    grunt.initConfig({
        'mocha-chai-sinon': {
            build: {
                src: ['./test/specs/**/*.spec.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                }
            },
            xcoverage: {
                src: ['./test/specs/**/*.spec.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'html-cov',
                    quiet: true,
                    filter: 'src',
                    captureFile: './coverage.html',
                    'data-cover-flags': {
                        debug: true
                    }
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // register tasks for execution chain
    grunt.registerTask('test', [
        'mocha-chai-sinon:build'
    ]);
};
