/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var Packet = require('./resol-vbus').Packet;



describe('Packet', function() {

    describe('#constructor', function() {

        it('should be a constructor function', function() {
            expect(Packet).to.be.a('function');
            expect(Packet.extend).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            var before = new Date();
            var packet = new Packet();
            var after = new Date();

            expect(packet).to.be.an('object');
            expect(packet.timestamp).to.be.an.instanceOf(Date);
            expect(packet.timestamp.getTime()).to.be.within(before.getTime(), after.getTime());
            expect(packet.channel).to.equal(0);
            expect(packet.destinationAddress).to.equal(0);
            expect(packet.sourceAddress).to.equal(0);
            expect(packet.command).to.equal(0);
            expect(packet.frameCount).to.equal(0);
            expect(packet.frameData).to.be.an.instanceOf(Buffer);
            expect(packet.frameData.length).to.equal(127 * 4);
        });

        it('should copy certain options', function() {
            var frameData = new Buffer(13 * 4);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            var options = {
                timestamp: new Date(0),
                channel: 0x1337,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData: frameData,
                junk: 0x7331
            };

            var packet = new Packet(options);

            expect(packet).to.be.an('object');

            _.forEach(options, function(refValue, key) {
                var value = packet [key];

                if ((value instanceof Buffer) && (refValue instanceof Buffer)) {
                    value = value.slice(0, refValue.length).toString('hex');
                    refValue = refValue.toString('hex');
                }
                if (key === 'junk') {
                    refValue = undefined;
                }

                expect(value).to.equal(refValue, key);
            });
        });
    });

    describe('#toLiveBuffer', function() {

        it('should be a method', function() {
            expect(Packet.prototype.toLiveBuffer).to.be.a('function');
        });

        it('should work correctly without a buffer', function() {
            var frameData = new Buffer(13 * 4);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData: frameData,
            };

            var packet = new Packet(options);

            var buffer = packet.toLiveBuffer();

            expect(buffer).to.be.an.instanceOf(Buffer);
            expect(buffer.length).to.equal(88);
            expect(buffer.toString('hex')).to.equal('aa362335331034430d2a0004080c00671014181c00272024282c00673034383c00274044484c00675054585c00276064686c00677074787c00270004080c0f581014181c0f182024282c0f583034383c0f184044484c0f58');

    /*
            var stats = connectionSpec.parseRawDataOnce(buffer);
            expect(stats.rawDataCount).to.equal(buffer.length);
            expect(stats.junkDataCount).to.equal(0);
            expect(stats.packetCount).to.equal(1);
            expect(stats.lastPacket).to.be.an.instanceOf(Packet);

            _.forEach(options, function(optionsValue, key) {
                var value = stats.lastPacket [key];
                var refValue = packet [key];

                if (value instanceof Buffer) {
                    value = value.toString('hex');
                }
                if (refValue instanceof Buffer) {
                    refValue = refValue.toString('hex');
                }

                expect(value).to.equal(refValue, key);
            });
    */
        });

        it('should work correctly with a buffer', function() {
            var frameData = new Buffer(13 * 4);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData: frameData,
            };

            var packet = new Packet(options);

            var bigBuffer = new Buffer(800);

            var buffer = packet.toLiveBuffer(bigBuffer, 100, 200);

            expect(buffer).to.be.an.instanceOf(Buffer);
            expect(buffer.length).to.equal(88);
            expect(buffer.toString('hex')).to.equal('aa362335331034430d2a0004080c00671014181c00272024282c00673034383c00274044484c00675054585c00276064686c00677074787c00270004080c0f581014181c0f182024282c0f583034383c0f184044484c0f58');
        });

        it('should throw if buffer is too small', function() {
            var frameData = new Buffer(13 * 4);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData: frameData,
            };

            var packet = new Packet(options);

            var bigBuffer = new Buffer(800);

            expect(function() {
                packet.toLiveBuffer(bigBuffer, 100, 180);
            }).to.throw();
        });

    });

    describe('.fromLiveBuffer', function() {

        it('should be a function', function() {
            expect(Packet.fromLiveBuffer).to.be.a('function');
        });

        it('should work correctly', function() {
            var frameData = new Buffer(13 * 4);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData: frameData,
            };

            var buffer = new Buffer('aa362335331034430d2a0004080c00671014181c00272024282c00673034383c00274044484c00675054585c00276064686c00677074787c00270004080c0f581014181c0f182024282c0f583034383c0f184044484c0f58', 'hex');

            var packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

            expect(packet).to.be.an.instanceOf(Packet);

            _.forEach(options, function(refValue, key) {
                var value = packet [key];

                if ((value instanceof Buffer) && (refValue instanceof Buffer)) {
                    value = value.slice(0, refValue.length).toString('hex');
                    refValue = refValue.toString('hex');
                }

                expect(value).to.equal(refValue, key);
            });
        });

    });

    describe('#getId', function() {

        it('should be a method', function() {
            expect(Packet.prototype.getId).to.be.a('function');
        });

        it('should work correctly', function() {
            var frameData = new Buffer(13 * 4);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 4;
            }

            var options = {
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                frameCount: 13,
                frameData: frameData,
            };

            var packet = new Packet(options);

            expect(packet).to.be.an('object');
            expect(packet.getId()).to.equal('13_2336_3335_10_4334');
        });

    });

});
