/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const path = require('path');


const expect = require('./expect');
const _ = require('./lodash');
const Q = require('./q');
const vbus = require('./resol-vbus');
const TestRecorder = require('./test-recorder');
const testUtils = require('./test-utils');



const Converter = vbus.Converter;
const FileSystemRecorder = vbus.FileSystemRecorder;
const HeaderSet = vbus.HeaderSet;
const Packet = vbus.Packet;
const Recorder = vbus.Recorder;
const VBusRecordingConverter = vbus.VBusRecordingConverter;



const createDeleteFilesInPathPromise = function(pathname) {
    return vbus.utils.promise((resolve, reject) => {
        fs.readdir(pathname, (err, filenames) => {
            if (err) {
                reject(err);
            } else {
                let index = 0;

                const deleteNextFile = function() {
                    if (index < filenames.length) {
                        const filename = filenames [index++];

                        if (filename !== '.gitignore') {
                            fs.unlink(path.join(pathname, filename), (err) => {
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


function checkFileExistance(absoluteFilename, expectedFilename) {
    return new Promise((resolve, reject) => {
        fs.access(absoluteFilename, (err) => {
            if (err) {
                reject(new Error('Expected file ' + JSON.stringify(expectedFilename) + ' to exist'));
            } else {
                resolve();
            }
        });
    });
}


describe('FileSystemRecorder', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(FileSystemRecorder).a('function').property('extend').a('function');
        });

        it('should have reasonable defaults', () => {
            const recorder = new FileSystemRecorder();

            expect(recorder.id).a('string');
            expect(recorder.minTimestamp.toISOString()).equal('2001-01-01T00:00:00.000Z');
            expect(recorder.maxTimestamp.toISOString()).equal('2038-01-01T00:00:00.000Z');
            expect(recorder.interval).equal(0);
            expect(recorder).property('path').equal('.');
        });

        it('should copy selected properties', () => {
            const options = {
                path: 'PATH',
                junk: 'JUNK',
            };

            const recorder = new FileSystemRecorder(options);

            expect(recorder).property('path').equal(options.path);
            expect(recorder).not.property('junk');
        });

    });

    describe('#getHash', () => {

        it('should be a method', () => {
            expect(FileSystemRecorder.prototype).property('getHash').a('function');
        });

        it('should work correctly', () => {
            const recorder = new FileSystemRecorder();

            let result = recorder.getHash('FileSystem');

            expect(result).equal('0a008f5b8c77c121d0fd39ae985593ba78ae5d85');

            result = recorder.getHash('Test');

            expect(result).equal('c1444fc16b7108b3f7635616549920e3dc2d96b1');
        });

    });

    describe('#playback', () => {

        it('should be a method', () => {
            expect(FileSystemRecorder.prototype).ownProperty('_playback').a('function');
        });

        it('should work correctly', () => {
            const options = {
                id: 'FileSystem',
                interval: 300000,
                path: path.join(__dirname, '../fixtures/filesystem-recorder-2'),
            };

            const sourceRecorder = new FileSystemRecorder(options);

            const readToStreamSpy = sinon.spy(sourceRecorder, '_readToStream');

            const converter = new VBusRecordingConverter({
                objectMode: true,
            });

            let ranges = [];

            const onHeaderSet = sinon.spy((headerSet) => {
                const headerSetRanges = [{
                    minTimestamp: headerSet.timestamp,
                    maxTimestamp: headerSet.timestamp,
                }];

                ranges = Recorder.performRangeSetOperation(ranges, headerSetRanges, options.interval, 'union');
            });

            converter.on('headerSet', onHeaderSet);

            const promise = Q.fcall(() => {
                return sourceRecorder.playback(converter);
            }).then((ranges) => {
                expect(onHeaderSet).property('callCount').equal(864);
                expect(ranges).lengthOf(1);
                testUtils.expectRanges(ranges).eql([{
                    maxTimestamp: '2014-02-16T23:55:00.805Z',
                    minTimestamp: '2014-02-14T00:00:00.983Z',
                }]);
            });

            return vbus.utils.promiseFinally(promise, () => {
                readToStreamSpy.restore();
            });
        });

    });

    describe('#record', () => {

        const fixturesPath = path.join(__dirname, '../fixtures/filesystem-recorder-1/');

        const testFixturesPath = path.join(fixturesPath, '0a008f5b8c77c121d0fd39ae985593ba78ae5d85');

        xit('should work correctly for multiple HeaderSets', () => {
            const options = {
                id: 'FileSystem',
                interval: 300000,
                path: fixturesPath,
            };

            const sourceRecorder = new TestRecorder({
                id: 'Test',
                interval: 300000,
            });

            const targetRecorder = new FileSystemRecorder(options);

            return Q.fcall(() => {
                return createDeleteFilesInPathPromise(testFixturesPath);
            }).then(() => {
                const sourceConverter = new Converter({ objectMode: true });
                sourceConverter.pause();

                const targetConverter = new Converter({ objectMode: true });
                targetConverter.pause();

                sourceConverter.on('headerSet', (headerSet) => {
                    targetConverter.convertHeaderSet(headerSet);
                });

                sourceConverter.on('finish', () => {
                    targetConverter.finish();
                });

                return Q.all([
                    sourceRecorder.playback(sourceConverter),
                    targetRecorder.record(targetConverter),
                ]);
            }).then((results) => {
                const sourceRanges = results [0];
                expect(sourceRanges).an('array').lengthOf(1);
                expect(sourceRanges [0]).property('minTimestamp').instanceOf(Date);
                expect(sourceRanges [0].minTimestamp.toISOString()).equal('2014-02-14T00:00:00.983Z');
                expect(sourceRanges [0]).property('maxTimestamp').instanceOf(Date);
                expect(sourceRanges [0].maxTimestamp.toISOString()).equal('2014-02-16T23:55:00.805Z');

                const targetRanges = results [1];
                expect(targetRanges).an('array').lengthOf(1);
                expect(targetRanges [0]).property('minTimestamp').instanceOf(Date);
                expect(targetRanges [0].minTimestamp.toISOString()).equal('2014-02-14T00:00:00.983Z');
                expect(targetRanges [0]).property('maxTimestamp').instanceOf(Date);
                expect(targetRanges [0].maxTimestamp.toISOString()).equal('2014-02-16T23:55:00.805Z');

                const expectedFilenames = [
                    'SyncState.json',
                    '300000_20140214000000983.vbus',
                    '300000_20140215000001077.vbus',
                    '300000_20140216000002271.vbus',
                ];

                let promise = Q();

                _.forEach(expectedFilenames, (expectedFilename) => {
                    const absoluteFilename = path.join(testFixturesPath, expectedFilename);

                    promise = promise.then(() => {
                        return checkFileExistance(absoluteFilename, expectedFilename);
                    });
                });

                return promise;
            });
        });

        it('should work correctly for a single HeaderSet', () => {
            const options = {
                id: 'FileSystem',
                interval: 300000,
                path: fixturesPath,
            };

            const targetRecorder = new FileSystemRecorder(options);

            return Q.fcall(() => {
                return createDeleteFilesInPathPromise(testFixturesPath);
            }).then(() => {
                const targetConverter = new Converter({ objectMode: true });
                targetConverter.pause();

                const timestamp = new Date('2014-02-14T00:00:00.983Z');

                const header1 = new Packet({
                    timestamp,
                    channel: 1,
                    command: 0x7654,
                });

                const header2 = new Packet({
                    timestamp,
                    channel: 2,
                    command: 0x7654,
                });

                const headerSet = new HeaderSet({
                    timestamp,
                    headers: [ header2, header1 ]
                });

                targetConverter.convertHeaderSet(headerSet);
                targetConverter.finish();

                return targetRecorder.record(targetConverter);
            }).then((ranges) => {
                expect(ranges).an('array').lengthOf(1);
                expect(ranges [0]).property('minTimestamp').instanceOf(Date);
                expect(ranges [0].minTimestamp.toISOString()).equal('2014-02-14T00:00:00.983Z');
                expect(ranges [0]).property('maxTimestamp').instanceOf(Date);
                expect(ranges [0].maxTimestamp.toISOString()).equal('2014-02-14T00:00:00.983Z');

                const expectedFilenames = [
                    '300000_20140214000000983.vbus',
                ];

                let promise = Q();

                _.forEach(expectedFilenames, (expectedFilename) => {
                    const absoluteFilename = path.join(testFixturesPath, expectedFilename);

                    promise = promise.then(() => {
                        return checkFileExistance(absoluteFilename, expectedFilename);
                    });
                });

                return promise;
            });
        });

    });

    describe('synchronization target', () => {

        const fixturesPath = path.join(__dirname, '../fixtures/filesystem-recorder-1/');

        const testFixturesPath = path.join(fixturesPath, '0a008f5b8c77c121d0fd39ae985593ba78ae5d85');

        it('should work correctly', () => {
            const options = {
                id: 'FileSystem',
                interval: 300000,
                path: fixturesPath,
            };

            const sourceRecorder = new TestRecorder({
                id: 'Test',
                interval: 300000,
            });

            const targetRecorder = new FileSystemRecorder(options);

            return Q.fcall(() => {
                return createDeleteFilesInPathPromise(testFixturesPath);
            }).then(() => {
                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then((ranges) => {
                expect(ranges).an('array').lengthOf(1);
                expect(ranges [0]).property('minTimestamp').instanceOf(Date);
                expect(ranges [0].minTimestamp.toISOString()).equal('2014-02-14T00:00:00.983Z');
                expect(ranges [0]).property('maxTimestamp').instanceOf(Date);
                expect(ranges [0].maxTimestamp.toISOString()).equal('2014-02-16T23:55:00.805Z');

                const expectedFilenames = [
                    'SyncState.json',
                    '300000_20140214000000983.vbus',
                    '300000_20140215000001077.vbus',
                    '300000_20140216000002271.vbus',
                ];

                let promise = Q();

                _.forEach(expectedFilenames, (expectedFilename) => {
                    const absoluteFilename = path.join(testFixturesPath, expectedFilename);

                    promise = promise.then(() => {
                        return checkFileExistance(absoluteFilename, expectedFilename);
                    });
                });

                return promise;
            }).then(() => {
                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then((ranges) => {
                expect(ranges).an('array').lengthOf(0);
                expect(ranges).eql(sourceRecorder.playedBackRanges);

            });
        });

    });

    describe('synchronization source', () => {

        xit('should work correctly', () => {
            const options = {
                id: 'FileSystem',
                interval: 300000,
                path: path.join(__dirname, '../fixtures/filesystem-recorder-2'),
            };

            const sourceRecorder = new FileSystemRecorder(options);

            const readToStream = sinon.spy(sourceRecorder, '_readToStream');

            const targetRecorder = new TestRecorder({
                id: 'Test',
                interval: 300000,
            });

            const promise = Q.fcall(() => {
                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(() => {
                targetRecorder.resetCounters();

                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(() => {

            });

            return vbus.utils.promiseFinally(promise, () => {
                readToStream.restore();
            });
        });

    });

});
