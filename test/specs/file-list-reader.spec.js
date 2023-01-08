/*! resol-vbus | Copyright (c) 2022-present, Daniel Wippermann | MIT license */

const crypto = require('crypto');
const path = require('path');


const FileListReader = require('../../src/file-list-reader');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    itShouldBeAClass
} = require('./test-utils');



const testableDirname = path.resolve(__dirname, '../fixtures/test-recorder');


async function readStatsToEnd(flr) {
    return new Promise((resolve, reject) => {
        let cleanup = () => {};

        flr.on('error', err => {
            cleanup();
            reject(err);
        });

        const stats = {
            length: 0,
            hash: null,
            readCallCount: 0,
        };

        const originalMethod = flr._read;

        cleanup = () => {
            flr._read = originalMethod;
        };

        flr._read = jest.fn((...args) => {
            stats.readCallCount += 1;
            return originalMethod.apply(flr, args);
        });


        const hasher = crypto.createHash('sha256');

        flr.on('readable', () => {
            let chunk;
            while ((chunk = flr.read()) != null) {
                stats.length += chunk.length;
                hasher.update(chunk);
            }
        });

        flr.on('end', () => {
            stats.hash = hasher.digest('hex');
            cleanup();
            resolve(stats);
        });
    });
}


describe('FileListReader', () => {

    itShouldBeAClass(FileListReader, null, {
        constructor: Function,
        _read: Function,
    }, {
        getListOfFiles: Function,
    });

    describe('#constructor', () => {

        it('should work correctly', () => {
            const flr = new FileListReader({
                dirname: testableDirname,
                minDatecode: 20220101,
                maxDatecode: 20221231,
            });

            expectOwnPropertyNamesToEqual(flr, [
                'dirname',
                'minDatecode',
                'maxDatecode',
                'files',
                'fileIndex',

                // base-class related
                '_events',
                '_eventsCount',
                '_maxListeners',
                '_readableState',
            ]);

            expect(flr.dirname).toBe(testableDirname);
            expect(flr.minDatecode).toBe('20220101');
            expect(flr.maxDatecode).toBe('20221231');
            expect(flr.files).toBe(null);
            expect(flr.fileIndex).toBe(0);
        });

    });

    describe('Readable interface', () => {

        it('should work correctly', async () => {
            const flr = new FileListReader({ dirname: testableDirname });

            const stats = await readStatsToEnd(flr);

            expect(stats.length).toBe(931336);
            expect(stats.hash).toBe('d2f70dcaf27e6ed80a4cf94d9353244e6e9ed740f8074fcfb2ca2ea6fe05cca6');
        });

        it('should report errors', async () => {
            const flr = new FileListReader({ dirname: testableDirname });

            // manually set list of unknown files for testing purposes
            flr.files = [
                path.resolve(testableDirname, 'unknown-file.txt'),
            ];

            await expect(async () => {
                await readStatsToEnd(flr);
            }).rejects.toThrow('ENOENT');
        });

    });

    describe('.getListOfFiles', () => {

        function normalizeFilenames(filenames) {
            return filenames.map(filename => filename.replace(testableDirname, '$testableDirname'));
        }

        it('should work correctly', async () => {
            let result;

            result = await FileListReader.getListOfFiles(testableDirname, null, null);

            expect(normalizeFilenames(result)).toEqual([
                '$testableDirname/20140214_packets.vbus',
                '$testableDirname/20140215_packets.vbus',
                '$testableDirname/20140216_packets.vbus',
            ]);

            result = await FileListReader.getListOfFiles(testableDirname, '20140215', null);

            expect(normalizeFilenames(result)).toEqual([
                '$testableDirname/20140215_packets.vbus',
                '$testableDirname/20140216_packets.vbus',
            ]);

            result = await FileListReader.getListOfFiles(testableDirname, null, '20140215');

            expect(normalizeFilenames(result)).toEqual([
                '$testableDirname/20140214_packets.vbus',
                '$testableDirname/20140215_packets.vbus',
            ]);
        });

    });

});
