/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Header,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTimestampToBeWithin,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



class TestableHeader extends Header {

    constructor(options) {
        super(options);

        this.protocolVersion = 0x37;

        if (options.protocolVersion !== undefined) {
            this.protocolVersion = options.protocolVersion;
        }
    }

    getProtocolVersion() {
        return this.protocolVersion;
    }

}



describe('Header', () => {

    itShouldBeAClass(Header, null, {
        timestamp: null,
        channel: 0,
        destinationAddress: 0,
        sourceAddress: 0,
        constructor: Function,
        toLiveBuffer: Function,
        getProtocolVersion: Function,
        getInfo: Function,
        getId: Function,
        compareTo: Function,
    }, {
        fromLiveBuffer: Function,
        calcChecksumV0: Function,
        calcAndCompareChecksumV0: Function,
        calcAndSetChecksumV0: Function,
        calcChecksumV1: Function,
        calcChecksum: Function,
        calcAndCompareChecksum: Function,
        calcAndSetChecksum: Function,
        injectSeptett: Function,
        extractSeptett: Function,
    });

    describe('.fromLiveBuffer', () => {

        it('should be abstract', () => {
            const buffer = Buffer.from('aa000021772000050000000000000042', 'hex');

            expect(() => {
                Header.fromLiveBuffer(buffer);
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('.calcChecksumV0', () => {

        it('should work correctly', () => {
            const buffer = Buffer.from('aa000021772000050000000000000042', 'hex');

            const checksum = Header.calcChecksumV0(buffer, 1, 15);
            expect(checksum).toBe(0x42);
        });

    });

    describe('.calcAndCompareChecksumV0', () => {

        it('should work correctly', () => {
            const buffer = Buffer.from('aa000021772000050000000000000042', 'hex');

            let result = Header.calcAndCompareChecksumV0(buffer, 1, 15);
            expect(result).toBe(true);

            buffer [15] = 0x41;  // corrupt the checksum

            result = Header.calcAndCompareChecksumV0(buffer, 1, 15);
            expect(result).toBe(false);
        });

    });

    describe('.calcAndSetChecksumV0', () => {

        it('should work correctly', () => {
            const buffer = Buffer.from('aa000021772000050000000000000000', 'hex');

            const checksum = Header.calcAndSetChecksumV0(buffer, 1, 15);
            expect(checksum).toBe(0x42);
            expect(buffer [15]).toBe(0x42);
        });

    });

    describe('.injectSeptett', () => {

        it('should work correctly', () => {
            const srcBuffer = Buffer.from('aa21772165100001044c07014c00002b02017f00057838227600052a00000000007f', 'hex');
            const dstBuffer = Buffer.alloc(16);

            Header.injectSeptett(srcBuffer, 10, 14, dstBuffer, 0);
            Header.injectSeptett(srcBuffer, 16, 20, dstBuffer, 4);
            Header.injectSeptett(srcBuffer, 22, 26, dstBuffer, 8);
            Header.injectSeptett(srcBuffer, 28, 32, dstBuffer, 12);

            expect(dstBuffer.toString('hex')).toBe('07014c008201ff00b822f60000000000');
        });

    });

    describe('.extractSeptett', () => {

        it('should work correctly', () => {
            const srcBuffer = Buffer.from('07014c008201ff00b822f60000000000', 'hex');
            const dstBuffer = Buffer.alloc(34);

            Header.extractSeptett(srcBuffer, 0, 4, dstBuffer, 10);
            Header.extractSeptett(srcBuffer, 4, 8, dstBuffer, 16);
            Header.extractSeptett(srcBuffer, 8, 12, dstBuffer, 22);
            Header.extractSeptett(srcBuffer, 12, 16, dstBuffer, 28);

            dstBuffer [15] = dstBuffer [21] = dstBuffer [27] = dstBuffer [33] = 0;

            expect(dstBuffer.toString('hex', 10)).toBe('07014c00000002017f000500382276000500000000000000');
        });

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const before = new Date();
            const header = new Header();
            const after = new Date();

            expectOwnPropertyNamesToEqual(header, [
                'timestamp',
                'channel',
                'destinationAddress',
                'sourceAddress',
                'minorVersion',
            ]);

            expectTimestampToBeWithin(header.timestamp, before, after);
            expect(header.channel).toBe(0);
            expect(header.destinationAddress).toBe(0);
            expect(header.sourceAddress).toBe(0);
            expect(header.minorVersion).toBe(0);
        });

        it('should copy selected options', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x1337,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                minorVersion: 0x05,
                junk: 0x7331
            };

            const header = new Header(options);

            expect(header.timestamp).toBe(options.timestamp);
            expect(header.channel).toBe(options.channel);
            expect(header.destinationAddress).toBe(options.destinationAddress);
            expect(header.sourceAddress).toBe(options.sourceAddress);
            expect(header.minorVersion).toBe(options.minorVersion);
            expect(header.junk).toBe(undefined);
        });

    });

    describe('#toLiveBuffer', () => {

        it('should be abstract', () => {
            const header = new Header();

            expect(() => {
                header.toLiveBuffer();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#getProtocolVersion', () => {

        it('should be abstract', () => {
            const header = new Header();

            expect(() => {
                header.getProtocolVersion();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#getInfo', () => {

        it('should work correctly', () => {
            const header = new Header();

            expect(header.getInfo()).toBe(0);
        });

    });

    describe('#getId', () => {

        it('should work correctly', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const header = new TestableHeader(options);

            expect(header.getId()).toBe('13_2336_3335_37');
        });

    });

    describe('#compareTo', () => {

        it('should work correctly for channel', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new TestableHeader(options);

            expect(datagram.compareTo(new TestableHeader(options))).toBe(0);

            options.channel = 0x00;

            expect(datagram.compareTo(new TestableHeader(options))).toBeGreaterThan(0);

            options.channel = 0x7F;

            expect(datagram.compareTo(new TestableHeader(options))).toBeLessThan(0);
        });

        it('should work correctly for destinationAddress', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new TestableHeader(options);

            expect(datagram.compareTo(new TestableHeader(options))).toBe(0);

            options.destinationAddress = 0x0000;

            expect(datagram.compareTo(new TestableHeader(options))).toBeGreaterThan(0);

            options.destinationAddress = 0x7F7F;

            expect(datagram.compareTo(new TestableHeader(options))).toBeLessThan(0);
        });

        it('should work correctly for sourceAddress', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new TestableHeader(options);

            expect(datagram.compareTo(new TestableHeader(options))).toBe(0);

            options.sourceAddress = 0x0000;

            expect(datagram.compareTo(new TestableHeader(options))).toBeGreaterThan(0);

            options.sourceAddress = 0x7F7F;

            expect(datagram.compareTo(new TestableHeader(options))).toBeLessThan(0);
        });

        it('should work correctly for protocol version', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new TestableHeader(options);

            expect(datagram.compareTo(new TestableHeader(options))).toBe(0);

            options.protocolVersion = 0x00;

            expect(datagram.compareTo(new TestableHeader(options))).toBeGreaterThan(0);

            options.protocolVersion = 0x7F;

            expect(datagram.compareTo(new TestableHeader(options))).toBeLessThan(0);
        });

    });

});
