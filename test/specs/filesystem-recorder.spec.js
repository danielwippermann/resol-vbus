/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var path = require('path');


var _ = require('lodash');
var moment = require('moment');
var Q = require('q');


var vbus = require('./resol-vbus');
var TestRecorder = require('./test-recorder');
var testUtils = require('./test-utils');



var FileSystemRecorder = vbus.FileSystemRecorder;
var Recorder = vbus.Recorder;
var VBusRecordingConverter = vbus.VBusRecordingConverter;



describe('FileSystemRecorder', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(FileSystemRecorder).a('function').property('extend').a('function');
        });

        it('should have reasonable defaults', function() {
            var recorder = new FileSystemRecorder();

            expect(recorder.id).a('string');
            expect(recorder.minTimestamp.toISOString()).equal('2001-01-01T00:00:00.000Z');
            expect(recorder.maxTimestamp.toISOString()).equal('2038-01-01T00:00:00.000Z');
            expect(recorder.interval).equal(0);
            expect(recorder).property('path').equal('.');
        });

        it('should copy selected properties', function() {
            var options = {
                path: 'PATH',
                junk: 'JUNK',
            };

            var recorder = new FileSystemRecorder(options);

            expect(recorder).property('path').equal(options.path);
            expect(recorder).not.property('junk');
        });

    });

    describe('#getHash', function() {

        it('should be a method', function() {
            expect(FileSystemRecorder.prototype).property('getHash').a('function');
        });

        it('should work correctly', function() {
            var recorder = new FileSystemRecorder();

            var result = recorder.getHash('FileSystem');

            expect(result).equal('0a008f5b8c77c121d0fd39ae985593ba78ae5d85');

            result = recorder.getHash('Test');

            expect(result).equal('c1444fc16b7108b3f7635616549920e3dc2d96b1');
        });

    });

    describe('#playback', function() {

        it('should be a method', function() {
            expect(FileSystemRecorder.prototype).ownProperty('_playback').property('_playback').a('function');
        });

        promiseIt('should work correctly', function() {
            this.timeout(30000);

            var options = {
                id: 'FileSystem',
                interval: 300000,
                path: path.join(__dirname, '../fixtures/filesystem-recorder-2'),
            };

            var sourceRecorder = new FileSystemRecorder(options);

            var readToStreamSpy = sinon.spy(sourceRecorder, '_readToStream');

            var converter = new VBusRecordingConverter();

            var ranges = [];

            var onHeaderSet = sinon.spy(function(headerSet) {
                var headerSetRanges = [{
                    minTimestamp: headerSet.timestamp,
                    maxTimestamp: headerSet.timestamp,
                }];

                ranges = Recorder.performRangeSetOperation(ranges, headerSetRanges, options.interval, 'union');
            });

            converter.on('headerSet', onHeaderSet);

            return Q.fcall(function() {
                return sourceRecorder.playback(converter);
            }).then(function(ranges) {
                expect(onHeaderSet).property('callCount').equal(864);
                expect(ranges).lengthOf(1);
                testUtils.expectRanges(ranges).eql([{
                    maxTimestamp: '2014-02-16T23:55:00.805Z',
                    minTimestamp: '2014-02-14T00:00:00.983Z',
                }]);
            }).finally(function() {
                readToStreamSpy.restore();
            });
        });

    });

    describe('synchronization target', function() {

        var fixturesPath = path.join(__dirname, '../fixtures/filesystem-recorder-1/');

        var testFixturesPath = path.join(fixturesPath, '0a008f5b8c77c121d0fd39ae985593ba78ae5d85');

        var createDeleteFixturesPathPromise = function() {
            return vbus.utils.promise(function(resolve, reject) {
                fs.readdir(testFixturesPath, function(err, filenames) {
                    if (err) {
                        reject(err);
                    } else {
                        var index = 0;

                        var deleteNextFile = function() {
                            if (index < filenames.length) {
                                var filename = filenames [index++];

                                if (filename !== '.gitignore') {
                                    fs.unlink(path.join(testFixturesPath, filename), function(err) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            deleteNextFile();
                                        }
                                    });
                                } else {
                                    deleteNextFile();
                                }
                            } else {
                                resolve();
                            }
                        };

                        deleteNextFile();
                    }
                });
            });
        };

        promiseIt('should work correctly', function() {
            this.timeout(30000);

            var options = {
                id: 'FileSystem',
                interval: 300000,
                path: fixturesPath,
            };

            var sourceRecorder = new TestRecorder({
                id: 'Test',
                interval: 300000,
            });

            var targetRecorder = new FileSystemRecorder(options);

            return Q.fcall(function() {
                return createDeleteFixturesPathPromise();
            }).then(function() {
                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(function(ranges) {
                expect(ranges).an('array').lengthOf(1);
                expect(ranges [0]).property('minTimestamp').instanceOf(Date);
                expect(ranges [0].minTimestamp.toISOString()).equal('2014-02-14T00:00:00.983Z');
                expect(ranges [0]).property('maxTimestamp').instanceOf(Date);
                expect(ranges [0].maxTimestamp.toISOString()).equal('2014-02-16T23:55:00.805Z');

                var expectedFilenames = [
                    'SyncState.json',
                    '300000_20140214000000983.vbus',
                    '300000_20140215000001077.vbus',
                    '300000_20140216000002271.vbus',
                ];

                var promise = Q();

                _.forEach(expectedFilenames, function(expectedFilename) {
                    var absoluteFilename = path.join(testFixturesPath, expectedFilename);

                    promise = promise.then(function() {
                        return vbus.utils.promise(function(resolve, reject) {
                            fs.exists(absoluteFilename, function(exists) {
                                if (!exists) {
                                    reject(new Error('Expected file ' + JSON.stringify(expectedFilename) + ' to exist'));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });
                });

                return promise;
            }).then(function() {
                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(function(ranges) {
                expect(ranges).an('array').lengthOf(0);
                expect(ranges).eql(sourceRecorder.playedBackRanges);

            });
        });

    });

    describe('synchronization source', function() {

        xpromiseIt('should work correctly', function() {
            var options = {
                id: 'FileSystem',
                interval: 300000,
                path: path.join(__dirname, '../fixtures/filesystem-recorder-2'),
            };

            var sourceRecorder = new FileSystemRecorder(options);

            var readToStream = sinon.spy(sourceRecorder, '_readToStream');

            var targetRecorder = new TestRecorder({
                id: 'Test',
                interval: 300000,
            });

            return Q.fcall(function() {
                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(function() {
                targetRecorder.resetCounters();

                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(function() {

            }).finally(function() {
                readToStream.restore();
            });
        });

    });

});
