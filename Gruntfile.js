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
        },
        copy: {
            logger: {
                files: [ {
                    expand: true,
                    cwd: 'nw-apps/logger',
                    src: [
                        '**/*',
                    ],
                    dest: 'nw-builds/tmp/logger'
                }, { 
                    expand: true,
                    cwd: '.',
                    src: [ 
                        'package.json', 
                        'src/**/*',
                    ], 
                    dest: 'nw-builds/tmp/logger/node_modules/resol-vbus'
                } ]
            }
        },
        shell: {
            logger: {
                command: '(cd nw-builds/tmp/logger/; npm install --production; bower install; cd node_modules/resol-vbus; npm install --production)'
            }
        },
        nodewebkit: {
            options: {
                version: '0.8.2',
                build_dir: './nw-builds',
                mac: true,
                win: false,
                linux32: false,
                linux64: false
            },
            logger: {
                options: {
                    app_name: 'RESOL VBus Logger'
                },
                src: [
                    'nw-builds/tmp/logger/**/*',
                ]
            }
        },
        open: {
            logger: {
                path: 'nw-builds/releases/RESOL VBus Logger/mac/RESOL VBus Logger.app',
            },
        },
        compress: {
            logger: {
                options: {
                    archive: 'nw-builds/releases/RESOL VBus Logger/mac/RESOL VBus Logger.zip'
                },
                files: [ {
                    expand: true,
                    cwd: 'nw-builds/releases/RESOL VBus Logger/mac',
                    src: [ 'RESOL VBus Logger.app/**/*' ],
                } ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // register tasks for execution chain
    grunt.registerTask('test', [
        'mocha-chai-sinon:build'
    ]);

    grunt.registerTask('deploy:logger', [
        'copy:logger',
        'shell:logger',
        'nodewebkit:logger',
        'open:logger',
        'compress:logger',
    ]);
};
