/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var vbus = require('./resol-vbus');



var Telegram = vbus.Telegram;



describe('Telegram', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Telegram).to.be.a('function');
            expect(Telegram).to.have.a.property('extend').that.is.a('function');
        });

        it('should have reasonable defaults', function() {
            var telegram = new Telegram();

            expect(telegram).to.have.a.property('destinationAddress').that.is.equal(0);
            expect(telegram).to.have.a.property('sourceAddress').that.is.equal(0);
            expect(telegram).to.have.a.property('command').that.is.equal(0);
            expect(telegram).to.have.a.property('frameData').that.is.an.instanceOf(Buffer).that.has.a.lengthOf(21);
        });

        it('should copy selected options', function() {
            var options = {
                destinationAddress: 0x1111,
                sourceAddress: 0x2222,
                command: 0x3333,
                frameData: new Buffer('123456712345671234567123456712345671234567', 'hex'),
            };

            var telegram = new Telegram(options);

            expect(telegram).to.have.a.property('destinationAddress').that.is.equal(options.destinationAddress);
            expect(telegram).to.have.a.property('sourceAddress').that.is.equal(options.sourceAddress);
            expect(telegram).to.have.a.property('command').that.is.equal(options.command);
            expect(telegram).to.have.a.property('frameData').that.is.eql(options.frameData).that.is.not.equal(options.frameData);
        });

        it('should not copy frameData', function() {
            var options = {
                destinationAddress: 0x1111,
                sourceAddress: 0x2222,
                command: 0x3333,
                frameData: new Buffer('123456712345671234567123456712345671234567', 'hex'),
                dontCopyFrameData: true,
            };

            var telegram = new Telegram(options);

            expect(telegram).to.have.a.property('destinationAddress').that.is.equal(options.destinationAddress);
            expect(telegram).to.have.a.property('sourceAddress').that.is.equal(options.sourceAddress);
            expect(telegram).to.have.a.property('command').that.is.equal(options.command);
            expect(telegram).to.have.a.property('frameData').that.is.equal(options.frameData);
        });

    });

    describe('#toLiveBuffer', function() {

        it('should be a method', function() {
            expect(Telegram.prototype).to.have.a.property('toLiveBuffer').that.is.a('function');
        });

        it('should work correctly without a buffer', function() {
            var frameData = new Buffer(21);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            var telegram = new Telegram({
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData: frameData,
            });

            var buffer = telegram.toLiveBuffer();

            expect(buffer.toString('hex')).to.equal('aa2211443330772e000c1824303c48000354606c7804101c70472834404c5864707f6c');
        });

        it('should work correctly with a buffer', function() {
            var frameData = new Buffer(21);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            var telegram = new Telegram({
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData: frameData,
            });

            var bigBuffer = new Buffer(800);

            var buffer = telegram.toLiveBuffer(bigBuffer, 100, 200);

            expect(buffer.toString('hex')).to.equal('aa2211443330772e000c1824303c48000354606c7804101c70472834404c5864707f6c');
        });

        it('should throw if buffer is too small', function() {
            var frameData = new Buffer(21);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            var telegram = new Telegram({
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData: frameData,
            });

            var bigBuffer = new Buffer(800);

            expect(function() {
                telegram.toLiveBuffer(bigBuffer, 100, 10);
            }).to.throw();
        });

    });

    describe('.fromLiveBuffer', function() {

        it('should be a method', function() {
            expect(Telegram).to.have.a.property('fromLiveBuffer').that.is.a('function');
        });

        it('should work correctly', function() {
            var options = {
                destinationAddress: 0x7771,
                sourceAddress: 0x2011,
                command: 0x25,
                frameData: new Buffer('6018ab04000000', 'hex'),
            };

            var buffer = new Buffer('AA7177112030251160182B040000000454', 'hex');

            var telegram = Telegram.fromLiveBuffer(buffer, 0, buffer.length);

            expect(telegram).to.be.an.instanceOf(Telegram);

            _.forEach(options, function(refValue, key) {
                var value = telegram [key];

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
            expect(Telegram.prototype).to.have.a.property('getId').that.is.a('function');
        });

        it('should work correctly', function() {
            var frameData = new Buffer(21);
            for (var i = 0; i < frameData.length; i++) {
                frameData [i] = i * 12;
            }

            var telegram = new Telegram({
                channel: 0x13,
                destinationAddress: 0x1122,
                sourceAddress: 0x3344,
                command: 0x77,
                frameData: frameData,
            });

            expect(telegram).to.be.an('object');
            expect(telegram.getId()).to.equal('13_1122_3344_30_77');
        });

    });

});
