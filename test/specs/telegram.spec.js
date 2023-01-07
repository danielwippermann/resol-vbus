/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Header,
    Telegram,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTimestampToBeWithin,
    itShouldBeAClass,
} = require('./test-utils');



describe('Telegram', () => {

    itShouldBeAClass(Telegram, Header, {
        command: 0,
        frameData: null,
        constructor: Function,
        toLiveBuffer: Function,
        getProtocolVersion: Function,
        getId: Function,
        compareTo: Function,
        getFrameCount: Function,
    }, {
        fromLiveBuffer: Function,
        getFrameCountForCommand: Function,
    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const before = new Date();

            const telegram = new Telegram();

            const after = new Date();

            expectOwnPropertyNamesToEqual(telegram, [
                'command',
                'frameData',

                // base class related
                'timestamp',
                'channel',
                'destinationAddress',
                'sourceAddress',
                'minorVersion',
            ]);

            expectTimestampToBeWithin(telegram.timestamp, before, after);
            expect(telegram.channel).toBe(0);
            expect(telegram.destinationAddress).toBe(0);
            expect(telegram.sourceAddress).toBe(0);
            expect(telegram.minorVersion).toBe(0);
            expect(telegram.command).toBe(0);
            expect(telegram.frameData).toHaveLength(21);
        });

        it('should copy selected options', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x11,
                destinationAddress: 0x1111,
                sourceAddress: 0x2222,
                minorVersion: 0x05,
                command: 0x3333,
                frameData: Buffer.from('123456712345671234567123456712345671234567', 'hex'),
            };

            const telegram = new Telegram(options);

            expect(telegram.timestamp).toBe(options.timestamp);
            expect(telegram.channel).toBe(options.channel);
            expect(telegram.destinationAddress).toBe(options.destinationAddress);
            expect(telegram.sourceAddress).toBe(options.sourceAddress);
            expect(telegram.minorVersion).toBe(options.minorVersion);
            expect(telegram.command).toBe(options.command);
            expect(telegram.frameData.toString('hex')).toBe(options.frameData.toString('hex'));
        });

        it('should respect the dontCopyFrameData option', () => {
            const options = {
                frameData: Buffer.from('123456712345671234567123456712345671234567', 'hex'),
                dontCopyFrameData: true,
            };

            const telegram = new Telegram(options);

            expect(telegram.frameData).toBe(options.frameData);
        });

    });

    describe('#toLiveBuffer', () => {

        it('should work correctly without a buffer', () => {
            const frameData = Buffer.alloc(21);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            const telegram = new Telegram({
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData,
            });

            const buffer = telegram.toLiveBuffer();

            expect(buffer.toString('hex')).toBe('aa2211443330772e000c1824303c48000354606c7804101c70472834404c5864707f6c');
        });

        it('should work correctly with a buffer', () => {
            const frameData = Buffer.alloc(21);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            const telegram = new Telegram({
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData,
            });

            const bigBuffer = Buffer.alloc(800);

            const buffer = telegram.toLiveBuffer(bigBuffer, 100, 200);

            expect(buffer.toString('hex')).toBe('aa2211443330772e000c1824303c48000354606c7804101c70472834404c5864707f6c');
        });

        it('should throw if buffer is too small', () => {
            const frameData = Buffer.alloc(21);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            const telegram = new Telegram({
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData,
            });

            const bigBuffer = Buffer.alloc(800);

            expect(() => {
                telegram.toLiveBuffer(bigBuffer, 100, 10);
            }).toThrow('Buffer too small');
        });

    });

    describe('.fromLiveBuffer', () => {

        it('should work correctly', () => {
            const options = {
                destinationAddress: 0x7771,
                sourceAddress: 0x2011,
                minorVersion: 0x00,
                command: 0x25,
                frameData: Buffer.from('6018ab04000000', 'hex'),
            };

            const buffer = Buffer.from('AA7177112030251160182B040000000454', 'hex');

            const before = new Date();

            const telegram = Telegram.fromLiveBuffer(buffer, 0, buffer.length);

            const after = new Date();

            expect(telegram).toBeInstanceOf(Telegram);

            expectTimestampToBeWithin(telegram.timestamp, before, after);
            expect(telegram.channel).toBe(0);
            expect(telegram.destinationAddress).toBe(options.destinationAddress);
            expect(telegram.sourceAddress).toBe(options.sourceAddress);
            expect(telegram.minorVersion).toBe(options.minorVersion);
            expect(telegram.command).toBe(options.command);
            expect(telegram.frameData.slice(0, 7)).toEqual(options.frameData);
        });

    });

    describe('#getId', () => {

        it('should work correctly', () => {
            const frameData = Buffer.alloc(21);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            const telegram = new Telegram({
                channel: 0x13,
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData,
            });

            expect(telegram.getId()).toBe('13_1122_3344_30_77');
        });

    });

    describe('#compareTo', () => {

        it('should work correctly', () => {
            const frameData = Buffer.alloc(21);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            const telegram1 = new Telegram({
                channel: 0x13,
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData,
            });

            const telegram2 = new Telegram({
                channel: 0x13,
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData,
            });

            expect(telegram1.compareTo(telegram2)).toBe(0);

            telegram2.channel = 0x14;

            expect(telegram1.compareTo(telegram2)).toBe(-1);
        });

    });

});
