/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Header,
    Packet,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTimestampToBeWithin,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



function getTestableOptions() {
    const frameData = Buffer.alloc(13 * 4);
    for (let i = 0; i < frameData.length; i++) {
        frameData [i] = i * 4;
    }

    const options = {
        channel: 0x13,
        destinationAddress: 0x2336,
        sourceAddress: 0x3335,
        command: 0x4334,
        frameCount: 13,
        frameData,
    };

    return options;
}



describe('Packet', () => {

    itShouldBeAClass(Packet, Header, {
        command: 0,
        frameCount: 0,
        frameData: null,
        constructor: Function,
        toLiveBuffer: Function,
        getProtocolVersion: Function,
        getId: Function,
        compareTo: Function,
    }, {
        fromLiveBuffer: Function,
    });

    describe('#constructor', () => {

        it('should have reasonable defaults', () => {
            const before = new Date();
            const packet = new Packet();
            const after = new Date();

            expectOwnPropertyNamesToEqual(packet, [
                'timestamp',
                'channel',
                'destinationAddress',
                'sourceAddress',
                'minorVersion',
                'command',
                'frameCount',
                'frameData',
            ]);

            expectTimestampToBeWithin(packet.timestamp, before, after);
            expect(packet.channel).toBe(0);
            expect(packet.destinationAddress).toBe(0);
            expect(packet.sourceAddress).toBe(0);
            expect(packet.minorVersion).toBe(0);
            expect(packet.command).toBe(0);
            expect(packet.frameCount).toBe(0);
            expectTypeToBe(packet.frameData, 'buffer');
            expect(packet.frameData).toHaveLength(127 * 4);
        });

        it('should copy certain options', () => {
            const frameData = Buffer.alloc(13 * 4);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            const options = {
                timestamp: new Date(0),
                channel: 0x1337,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                minorVersion: 0x05,
                command: 0x4334,
                frameCount: 13,
                frameData,
                junk: 0x7331
            };

            const packet = new Packet(options);

            expect(packet.timestamp).toBe(options.timestamp);
            expect(packet.channel).toBe(options.channel);
            expect(packet.destinationAddress).toBe(options.destinationAddress);
            expect(packet.sourceAddress).toBe(options.sourceAddress);
            expect(packet.minorVersion).toBe(options.minorVersion);
            expect(packet.command).toBe(options.command);
            expect(packet.frameCount).toBe(options.frameCount);
            expect(packet.frameData.slice(0, 13 * 4)).toEqual(options.frameData);
            expect(packet.junk).toBe(undefined);
        });

        it('should respect the dontCopyFrameData option', () => {
            const frameData = Buffer.alloc(127 * 4);

            const options = {
                frameData,
                dontCopyFrameData: true,
            };

            const packet = new Packet(options);

            expect(packet.frameData).toBe(options.frameData);
        });
    });

    describe('#toLiveBuffer', () => {

        it('should work correctly without a buffer', () => {
            const frameData = Buffer.alloc(13 * 4);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData,
            };

            const packet = new Packet(options);

            const buffer = packet.toLiveBuffer();

            expectTypeToBe(buffer, 'buffer');
            expect(buffer).toHaveLength(88);
            expect(buffer.toString('hex')).toBe('aa362335331034430d2a0004080c00671014181c00272024282c00673034383c00274044484c00675054585c00276064686c00677074787c00270004080c0f581014181c0f182024282c0f583034383c0f184044484c0f58');
        });

        it('should work correctly with a buffer', () => {
            const frameData = Buffer.alloc(13 * 4);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData,
            };

            const packet = new Packet(options);

            const bigBuffer = Buffer.alloc(800);

            const buffer = packet.toLiveBuffer(bigBuffer, 100, 200);

            expectTypeToBe(buffer, 'buffer');
            expect(buffer).toHaveLength(88);
            expect(buffer.toString('hex')).toBe('aa362335331034430d2a0004080c00671014181c00272024282c00673034383c00274044484c00675054585c00276064686c00677074787c00270004080c0f581014181c0f182024282c0f583034383c0f184044484c0f58');
        });

        it('should throw if buffer is too small', () => {
            const frameData = Buffer.alloc(13 * 4);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData,
            };

            const packet = new Packet(options);

            const bigBuffer = Buffer.alloc(800);

            expect(() => {
                packet.toLiveBuffer(bigBuffer, 100, 180);
            }).toThrow('Buffer too small');
        });

    });

    describe('.fromLiveBuffer', () => {

        it('should work correctly', () => {
            const frameData = Buffer.alloc(13 * 4);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData,
            };

            const buffer = Buffer.from('aa362335331034430d2a0004080c00671014181c00272024282c00673034383c00274044484c00675054585c00276064686c00677074787c00270004080c0f581014181c0f182024282c0f583034383c0f184044484c0f58', 'hex');

            const before = new Date();

            const packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

            const after = new Date();

            expect(packet).toBeInstanceOf(Packet);
            expectTimestampToBeWithin(packet.timestamp, before, after);
            expect(packet.channel).toBe(0);
            expect(packet.destinationAddress).toBe(options.destinationAddress);
            expect(packet.sourceAddress).toBe(options.sourceAddress);
            expect(packet.command).toBe(options.command);
            expect(packet.frameCount).toBe(options.frameCount);
            expect(packet.frameData.slice(0, 13 * 4)).toEqual(options.frameData);
        });

    });

    describe('#getProtocolVersion', () => {

        it('should work correctly', () => {
            const packet = new Packet({
                minorVersion: 0x05,
            });

            const result = packet.getProtocolVersion();

            expect(result).toBe(0x15);
        });

    });

    describe('#getId', () => {

        it('should work correctly', () => {
            const frameData = Buffer.alloc(13 * 4);
            for (let i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            const options = {
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData,
            };

            const packet = new Packet(options);

            expect(packet.getId()).toBe('13_2336_3335_10_4334');
        });

    });

    describe('#compareTo', () => {

        it('should work correctly for Header related info', () => {
            const options = getTestableOptions();

            const packet = new Packet(options);

            expect(packet.compareTo(new Packet(options))).toBe(0);

            options.channel = 0x00;

            expect(packet.compareTo(new Packet(options))).toBeGreaterThan(0);

            options.channel = 0xFF;

            expect(packet.compareTo(new Packet(options))).toBeLessThan(0);
        });

        it('should work correctly for command', () => {
            const options = getTestableOptions();

            const packet = new Packet(options);

            expect(packet.compareTo(new Packet(options))).toBe(0);

            options.command = 0x0000;

            expect(packet.compareTo(new Packet(options))).toBeGreaterThan(0);

            options.command = 0x7F7F;

            expect(packet.compareTo(new Packet(options))).toBeLessThan(0);
        });

    });

});
