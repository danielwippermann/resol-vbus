/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const Header = require('./resol-vbus').Header;



const DebugHeader = Header.extend({

    protocolVersion: 0x37,

    constructor: function(options) {
        Header.call(this, options);

        if (options.protocolVersion !== undefined) {
            this.protocolVersion = options.protocolVersion;
        }
    },

    getProtocolVersion: function() {
        return this.protocolVersion;
    },

});



describe('Header', function() {

    describe('.fromLiveBuffer', function() {

        it('should be a function', function() {
            expect(Header.fromLiveBuffer).to.be.a('function');
        });

        it('should be abstract', function() {
            const buffer = new Buffer('aa000021772000050000000000000042', 'hex');

            expect(function() {
                Header.fromLiveBuffer(buffer);
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('.calcChecksumV0', function() {

        it('should be a function', function() {
            expect(Header.calcChecksumV0).to.be.a('function');
        });

        it('should work correctly', function() {
            const buffer = new Buffer('aa000021772000050000000000000042', 'hex');

            const checksum = Header.calcChecksumV0(buffer, 1, 15);
            expect(checksum).to.equal(0x42);
        });

    });

    describe('.calcAndCompareChecksumV0', function() {

        it('should be a function', function() {
            expect(Header.calcAndCompareChecksumV0).to.be.a('function');
        });

        it('should work correctly', function() {
            const buffer = new Buffer('aa000021772000050000000000000042', 'hex');

            let result = Header.calcAndCompareChecksumV0(buffer, 1, 15);
            expect(result).to.equal(true);

            buffer [15] = 0x41;  // corrupt the checksum

            result = Header.calcAndCompareChecksumV0(buffer, 1, 15);
            expect(result).to.equal(false);
        });

    });

    describe('.calcAndSetChecksumV0', function() {

        it('should be a function', function() {
            expect(Header.calcAndSetChecksumV0).to.be.a('function');
        });

        it('should work correctly', function() {
            const buffer = new Buffer('aa000021772000050000000000000000', 'hex');

            const checksum = Header.calcAndSetChecksumV0(buffer, 1, 15);
            expect(checksum).to.equal(0x42);
            expect(buffer [15]).to.equal(0x42);
        });

    });

    describe('.injectSeptett', function() {

        it('should be a function', function() {
            expect(Header.injectSeptett).to.be.a('function');
        });

        it('should work correctly', function() {
            const srcBuffer = new Buffer('aa21772165100001044c07014c00002b02017f00057838227600052a00000000007f', 'hex');
            const dstBuffer = new Buffer(16);

            Header.injectSeptett(srcBuffer, 10, 14, dstBuffer, 0);
            Header.injectSeptett(srcBuffer, 16, 20, dstBuffer, 4);
            Header.injectSeptett(srcBuffer, 22, 26, dstBuffer, 8);
            Header.injectSeptett(srcBuffer, 28, 32, dstBuffer, 12);

            expect(dstBuffer.toString('hex')).to.equal('07014c008201ff00b822f60000000000');
        });

    });

    describe('.extractSeptett', function() {

        it('should be a function', function() {
            expect(Header.extractSeptett).to.be.a('function');
        });

        it('should work correctly', function() {
            const srcBuffer = new Buffer('07014c008201ff00b822f60000000000', 'hex');
            const dstBuffer = new Buffer(34);

            Header.extractSeptett(srcBuffer, 0, 4, dstBuffer, 10);
            Header.extractSeptett(srcBuffer, 4, 8, dstBuffer, 16);
            Header.extractSeptett(srcBuffer, 8, 12, dstBuffer, 22);
            Header.extractSeptett(srcBuffer, 12, 16, dstBuffer, 28);

            dstBuffer [15] = dstBuffer [21] = dstBuffer [27] = dstBuffer [33] = 0;

            expect(dstBuffer.toString('hex', 10)).to.equal('07014c00000002017f000500382276000500000000000000');
        });

    });

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Header).to.be.a('function');
            expect(Header.extend).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            const before = new Date();
            const header = new Header();
            const after = new Date();

            expect(header).to.be.an('object');
            expect(header.timestamp).to.be.an.instanceOf(Date);
            expect(header.timestamp.getTime()).to.be.within(before.getTime(), after.getTime());
            expect(header.channel).to.equal(0);
            expect(header.destinationAddress).to.equal(0);
            expect(header.sourceAddress).to.equal(0);
        });

        it('should copy selected options', function() {
            const options = {
                timestamp: new Date(0),
                channel: 0x1337,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                junk: 0x7331
            };

            const header = new Header(options);

            expect(header).to.be.an('object');
            expect(header.timestamp).to.equal(options.timestamp);
            expect(header.channel).to.equal(options.channel);
            expect(header.destinationAddress).to.equal(options.destinationAddress);
            expect(header.sourceAddress).to.equal(options.sourceAddress);
            expect(header.junk).to.equal(undefined);
        });

    });

    describe('#toLiveBuffer', function() {

        it('should be a method', function() {
            expect(Header.prototype.toLiveBuffer).to.be.a('function');
        });

        it('should be abstract', function() {
            const header = new Header();

            expect(function() {
                header.toLiveBuffer();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#getProtocolVersion', function() {

        it('should be a method', function() {
            expect(Header.prototype.getProtocolVersion).to.be.a('function');
        });

        it('should be abstract', function() {
            const header = new Header();

            expect(function() {
                header.getProtocolVersion();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#getInfo', function() {

        it('should be a method', function() {
            expect(Header.prototype.getInfo).to.be.a('function');
        });

        it('should work correctly', function() {
            const header = new Header();

            expect(header.getInfo()).to.equal(0);
        });

    });

    describe('#getId', function() {

        it('should be a method', function() {
            expect(Header.prototype.getId).to.be.a('function');
        });

        it('should work correctly', function() {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const header = new DebugHeader(options);

            expect(header.getId()).to.equal('13_2336_3335_37');
        });

    });

    describe('#compareTo', function() {

        it('should be a method', function() {
            expect(Header.prototype.compareTo).to.be.a('function');
        });

        it('should work correctly for channel', function() {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new DebugHeader(options);

            expect(datagram.compareTo(new DebugHeader(options))).to.equal(0);

            options.channel = 0x00;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.above(0);

            options.channel = 0x7F;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.below(0);
        });

        it('should work correctly for destinationAddress', function() {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new DebugHeader(options);

            expect(datagram.compareTo(new DebugHeader(options))).to.equal(0);

            options.destinationAddress = 0x0000;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.above(0);

            options.destinationAddress = 0x7F7F;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.below(0);
        });

        it('should work correctly for sourceAddress', function() {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new DebugHeader(options);

            expect(datagram.compareTo(new DebugHeader(options))).to.equal(0);

            options.sourceAddress = 0x0000;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.above(0);

            options.sourceAddress = 0x7F7F;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.below(0);
        });

        it('should work correctly for protocol version', function() {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                protocolVersion: 0x37,
            };

            const datagram = new DebugHeader(options);

            expect(datagram.compareTo(new DebugHeader(options))).to.equal(0);

            options.protocolVersion = 0x00;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.above(0);

            options.protocolVersion = 0x7F;

            expect(datagram.compareTo(new DebugHeader(options))).to.be.below(0);
        });

    });

});
