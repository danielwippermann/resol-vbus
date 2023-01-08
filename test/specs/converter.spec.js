/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { Duplex } = require('stream');


const {
    Converter,
    HeaderSet,
    Packet,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectPromise,
    itShouldBeAClass,
} = require('./test-utils');



class TestableConverter extends Converter {

    _read() {
        // nop
    }

}



describe('Converter', () => {

    itShouldBeAClass(Converter, Duplex, {
        objectMode: false,
        finishedPromise: null,
        constructor: Function,
        reset: Function,
        finish: Function,
        convertRawData: Function,
        convertComment: Function,
        convertHeader: Function,
        convertHeaderSet: Function,
        _read: Function,
        _write: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const converter = new TestableConverter();

            expectOwnPropertyNamesToEqual(converter, [
                'objectMode',
                'finishedPromise',

                // Duplex-related
                '_events',
                '_eventsCount',
                '_maxListeners',
                '_readableState',
                '_writableState',
                'allowHalfOpen',
            ]);

            expect(converter.objectMode).toBe(false);
            expectPromise(converter.finishedPromise);
        });

        it('should copy selected options', () => {
            const options = {
                objectMode: true,
                junk: 'JUNK',
            };

            const converter = new TestableConverter(options);

            expect(converter.objectMode).toBe(true);
            expectPromise(converter.finishedPromise);
            expect(converter.junk).toBe(undefined);
        });

    });

    describe('#reset', () => {

        it('should work correctly (nop)', () => {
            const converter = new TestableConverter();

            converter.reset();
        });

    });

    describe('#finish', () => {

        it('should fire an end event', async () => {
            const converter = new TestableConverter({
                objectMode: true,
            });

            const endEventPromise = new Promise(resolve => {
                converter.once('end', () => {
                    resolve();
                });
            });

            const promise = converter.finish();

            await expectPromise(promise);

            await endEventPromise;
        });

    });

    describe('#convertRawData', () => {

        it('should be abstract', () => {
            const converter = new TestableConverter();

            expect(() => {
                converter.convertRawData();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#convertHeader', () => {

        it('should be abstract', () => {
            const converter = new TestableConverter();

            expect(() => {
                converter.convertHeader();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#convertHeaderSet', () => {

        it('should be abstract', () => {
            const converter = new TestableConverter();

            expect(() => {
                converter.convertHeaderSet();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#_read', () => {

        it('should be abstract', () => {
            const converter = new TestableConverter();

            expect(() => {
                Converter.prototype._read.call(converter);
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#_write', () => {

        it('should be abstract', () => {
            const converter = new TestableConverter();

            expect(() => {
                converter._write();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('writable stream (object mode)', () => {

        const rawPacket1 = 'aa100053001000010b0020051000004a723d1000013f40571000015706100000016800000000007f00000000007f00000000007f00000000007f00007f00000025003600051f11000000006e';
        const rawPacket2 = 'aa1000217e100001013e00000b000074';
        const rawPacket3 = 'aa1000317e100001042b05774a00003900000000007f00000000007f130d0000005f';

        it('should work correctly', async () => {
            const buffer1 = Buffer.from(rawPacket1, 'hex');
            const packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            const buffer2 = Buffer.from(rawPacket2, 'hex');
            const packet2 = Packet.fromLiveBuffer(buffer2, 0, buffer2.length);
            packet2.timestamp = new Date(1387893003303);
            packet2.channel = 1;

            const buffer3 = Buffer.from(rawPacket3, 'hex');
            const packet3 = Packet.fromLiveBuffer(buffer3, 0, buffer3.length);
            packet3.timestamp = new Date(1387893003454);
            packet3.channel = 1;

            const headerSet = new HeaderSet({
                timestamp: new Date(1387893006829),
                headers: [ packet1, packet2, packet3 ]
            });

            const converter = new TestableConverter({
                objectMode: true,
            });

            const onData = jest.fn();
            converter.on('data', onData);

            converter.convertHeaderSet(headerSet);

            const onHeader = jest.fn();
            converter.on('header', onHeader);

            const onHeaderSet = jest.fn();
            converter.on('headerSet', onHeaderSet);

            const finishEventPromise = new Promise(resolve => {
                converter.on('finish', () => {
                    resolve();
                });
            });

            converter.write(packet1);
            converter.write(packet2);
            converter.write(packet3);
            converter.write(headerSet);

            converter.end();

            await finishEventPromise;

            expect(onHeader.mock.calls.length).toBe(3);
            expect(onHeader.mock.calls [0] [0]).toBe(packet1);
            expect(onHeader.mock.calls [1] [0]).toBe(packet2);
            expect(onHeader.mock.calls [2] [0]).toBe(packet3);

            expect(onHeaderSet.mock.calls.length).toBe(1);
            expect(onHeaderSet.mock.calls [0] [0]).toBe(headerSet);
        });

    });

    describe('readable stream (object mode)', () => {

        const rawPacket1 = 'aa100053001000010b0020051000004a723d1000013f40571000015706100000016800000000007f00000000007f00000000007f00000000007f00007f00000025003600051f11000000006e';
        const rawPacket2 = 'aa1000217e100001013e00000b000074';
        const rawPacket3 = 'aa1000317e100001042b05774a00003900000000007f00000000007f130d0000005f';

        it('should work correctly', async () => {
            const buffer1 = Buffer.from(rawPacket1, 'hex');
            const packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            const buffer2 = Buffer.from(rawPacket2, 'hex');
            const packet2 = Packet.fromLiveBuffer(buffer2, 0, buffer2.length);
            packet2.timestamp = new Date(1387893003303);
            packet2.channel = 1;

            const buffer3 = Buffer.from(rawPacket3, 'hex');
            const packet3 = Packet.fromLiveBuffer(buffer3, 0, buffer3.length);
            packet3.timestamp = new Date(1387893003454);
            packet3.channel = 1;

            const headerSet = new HeaderSet({
                timestamp: new Date(1387893006829),
                headers: [ packet1, packet2, packet3 ]
            });

            const converter = new TestableConverter({
                objectMode: true,
            });

            const onData = jest.fn();
            converter.on('data', onData);

            const endEventPromise = new Promise(resolve => {
                converter.on('end', () => {
                    resolve();
                });
            });

            converter.convertHeader(packet1);

            converter.convertHeaderSet(headerSet);

            converter.push(null);

            await endEventPromise;

            expect(onData.mock.calls.length).toBe(2);
            expect(onData.mock.calls [0] [0]).toBe(packet1);
            expect(onData.mock.calls [1] [0]).toBe(headerSet);
        });

    });

});
