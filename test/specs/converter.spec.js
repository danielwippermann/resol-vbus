/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const vbus = require('./resol-vbus');



const Converter = vbus.Converter;
const HeaderSet = vbus.HeaderSet;
const Packet = vbus.Packet;



const TestableConverter = Converter.extend({

    _read: function() {
        // nop
    },

});



describe('Converter', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Converter).to.be.a('function');

            const converter = new TestableConverter();

            expect(converter).to.be.an.instanceOf(Converter);
        });

        it('should reasonable defaults', function() {
            const converter = new TestableConverter();

            expect(converter).property('objectMode').to.equal(false);
        });

        it('should copy selected options', function() {
            const options = {
                objectMode: true,
                junk: 'JUNK',
            };

            const converter = new TestableConverter(options);

            expect(converter).property('objectMode').to.equal(options.objectMode);
            expect(converter).not.property('junk');
        });

    });

    describe('#reset', function() {

        it('should be a method', function() {
            expect(Converter.prototype.reset).to.be.a('function');
        });

    });

    describe('#finish', function() {

        it('should be a method', function() {
            expect(Converter.prototype).property('finish').a('function');
        });

        it('should be fire an end event', function(done) {
            const converter = new TestableConverter({
                objectMode: true,
            });

            converter.once('end', function() {
                done();
            });

            converter.finish();
        });

    });

    describe('#convertRawData', function() {

        it('should be a method', function() {
            expect(Converter.prototype.convertRawData).to.be.a('function');
        });

        it('should be abstract', function() {
            const converter = new TestableConverter();

            expect(function() {
                converter.convertRawData();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#convertHeader', function() {

        it('should be a method', function() {
            expect(Converter.prototype.convertHeader).to.be.a('function');
        });

        it('should be abstract', function() {
            const converter = new TestableConverter();

            expect(function() {
                converter.convertHeader();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#convertHeaderSet', function() {

        it('should be a method', function() {
            expect(Converter.prototype.convertHeaderSet).to.be.a('function');
        });

        it('should be abstract', function() {
            const converter = new TestableConverter();

            expect(function() {
                converter.convertHeaderSet();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#_read', function() {

        it('should be a method', function() {
            expect(Converter.prototype._read).to.be.a('function');
        });

        it('should be abstract', function() {
            const converter = new TestableConverter();

            expect(function() {
                Converter.prototype._read.call(converter);
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#_write', function() {

        it('should be a method', function() {
            expect(Converter.prototype._write).to.be.a('function');
        });

        it('should be abstract', function() {
            const converter = new TestableConverter();

            expect(function() {
                converter._write();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('writable stream (object mode)', function() {

        const rawPacket1 = 'aa100053001000010b0020051000004a723d1000013f40571000015706100000016800000000007f00000000007f00000000007f00000000007f00007f00000025003600051f11000000006e';
        const rawPacket2 = 'aa1000217e100001013e00000b000074';
        const rawPacket3 = 'aa1000317e100001042b05774a00003900000000007f00000000007f130d0000005f';

        promiseIt('should work correctly', function() {
            const buffer1 = new Buffer(rawPacket1, 'hex');
            const packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            const buffer2 = new Buffer(rawPacket2, 'hex');
            const packet2 = Packet.fromLiveBuffer(buffer2, 0, buffer2.length);
            packet2.timestamp = new Date(1387893003303);
            packet2.channel = 1;

            const buffer3 = new Buffer(rawPacket3, 'hex');
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

            const onData = sinon.spy();
            converter.on('data', onData);

            converter.convertHeaderSet(headerSet);

            const onHeader = sinon.spy();
            converter.on('header', onHeader);

            const onHeaderSet = sinon.spy();
            converter.on('headerSet', onHeaderSet);

            return vbus.utils.promise(function(resolve, reject) {
                converter.on('finish', function() {
                    resolve();
                });

                converter.write(packet1);
                converter.write(packet2);
                converter.write(packet3);
                converter.write(headerSet);

                converter.end();
            }).then(function() {
                expect(onHeader.callCount).equal(3);
                expect(onHeader.firstCall.args [0]).equal(packet1);
                expect(onHeader.secondCall.args [0]).equal(packet2);
                expect(onHeader.thirdCall.args [0]).equal(packet3);

                expect(onHeaderSet.callCount).equal(1);
                expect(onHeaderSet.firstCall.args [0]).equal(headerSet);
            });
        });

    });

    describe('readable stream (object mode)', function() {

        const rawPacket1 = 'aa100053001000010b0020051000004a723d1000013f40571000015706100000016800000000007f00000000007f00000000007f00000000007f00007f00000025003600051f11000000006e';
        const rawPacket2 = 'aa1000217e100001013e00000b000074';
        const rawPacket3 = 'aa1000317e100001042b05774a00003900000000007f00000000007f130d0000005f';

        promiseIt('should work correctly', function() {
            const buffer1 = new Buffer(rawPacket1, 'hex');
            const packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            const buffer2 = new Buffer(rawPacket2, 'hex');
            const packet2 = Packet.fromLiveBuffer(buffer2, 0, buffer2.length);
            packet2.timestamp = new Date(1387893003303);
            packet2.channel = 1;

            const buffer3 = new Buffer(rawPacket3, 'hex');
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

            const onData = sinon.spy();
            converter.on('data', onData);

            return vbus.utils.promise(function(resolve, reject) {
                converter.on('end', function() {
                    resolve();
                });

                converter.convertHeader(packet1);

                converter.convertHeaderSet(headerSet);

                converter.push(null);
            }).then(function() {
                expect(onData.callCount).equal(2);
                expect(onData.firstCall.args [0]).equal(packet1);
                expect(onData.secondCall.args [0]).equal(headerSet);
            });
        });

    });

});
