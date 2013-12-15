/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Header = require('./resol-vbus').Header;



describe('Header', function() {

    it('should be a constructor function', function() {
        expect(Header).to.be.a('function');
        expect(Header.extend).to.be.a('function');
    });

    it('has reasonable defaults', function() {
        var before = new Date();
        var header = new Header();
        var after = new Date();

        expect(header).to.be.an('object');
        expect(header.timestamp).to.be.an.instanceOf(Date);
        expect(header.timestamp.getTime()).to.be.within(before.getTime(), after.getTime());
        expect(header.channel).to.eql(0);
        expect(header.destinationAddress).to.eql(0);
        expect(header.sourceAddress).to.eql(0);
    });

    it('should copy certain options', function() {
        var options = {
            timestamp: new Date(0),
            channel: 1337,
            destinationAddress: 2 * 1337,
            sourceAddress: 3 * 1337,
            junk: 4 * 1337
        };

        var header = new Header(options);

        expect(header).to.be.an('object');
        expect(header.timestamp).to.eql(options.timestamp);
        expect(header.channel).to.eql(options.channel);
        expect(header.destinationAddress).to.eql(options.destinationAddress);
        expect(header.sourceAddress).to.eql(options.sourceAddress);
        expect(header.junk).to.eql(undefined);
    });

    it('should have abstract toBuffer method', function() {
        var header = new Header();

        expect(function() {
            header.toBuffer();
        }).to.throw(Error, 'Must be implemented by sub-class');
    });

    it('should have abstract fromBuffer function', function() {
        var buffer = new Buffer('aa000021772000050000000000000042', 'hex');

        expect(function() {
            Header.fromBuffer(buffer);
        }).to.throw(Error, 'Must be implemented by sub-class');
    });

    it('should calc v0 checksum correctly', function() {
        var buffer = new Buffer('aa000021772000050000000000000042', 'hex');

        var checksum = Header.calcChecksumV0(buffer, 1, 15);
        expect(checksum).to.eql(0x42);
    });

    it('should calc and compare v0 checksum correctly', function() {
        var buffer = new Buffer('aa000021772000050000000000000042', 'hex');

        var result = Header.calcAndCompareChecksumV0(buffer, 1, 15);
        expect(result).to.eql(true);

        buffer [15] = 0x41;  // corrupt the checksum

        result = Header.calcAndCompareChecksumV0(buffer, 1, 15);
        expect(result).to.eql(false);
    });

    it('should calc and set v0 checksum correctly', function() {
        var buffer = new Buffer('aa000021772000050000000000000000', 'hex');

        var checksum = Header.calcAndSetChecksumV0(buffer, 1, 15);
        expect(checksum).to.eql(0x42);
        expect(buffer [15]).to.eql(0x42);
    });

    it('should inject septetts correctly', function() {
        var srcBuffer = new Buffer('aa21772165100001044c07014c00002b02017f00057838227600052a00000000007f', 'hex');
        var dstBuffer = new Buffer(16);

        Header.injectSeptett(srcBuffer, 10, 14, dstBuffer, 0);
        Header.injectSeptett(srcBuffer, 16, 20, dstBuffer, 4);
        Header.injectSeptett(srcBuffer, 22, 26, dstBuffer, 8);
        Header.injectSeptett(srcBuffer, 28, 32, dstBuffer, 12);

        expect(dstBuffer.toString('hex')).to.eql('07014c008201ff00b822f60000000000');
    });

    it('should extract septetts correctly', function() {
        var srcBuffer = new Buffer('07014c008201ff00b822f60000000000', 'hex');
        var dstBuffer = new Buffer(34);

        Header.extractSeptett(srcBuffer, 0, 4, dstBuffer, 10);
        Header.extractSeptett(srcBuffer, 4, 8, dstBuffer, 16);
        Header.extractSeptett(srcBuffer, 8, 12, dstBuffer, 22);
        Header.extractSeptett(srcBuffer, 12, 16, dstBuffer, 28);

        dstBuffer [15] = dstBuffer [21] = dstBuffer [27] = dstBuffer [33] = 0;

        expect(dstBuffer.toString('hex', 10)).to.eql('07014c00000002017f000500382276000500000000000000');
    });

});
