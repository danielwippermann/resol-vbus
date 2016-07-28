/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var Datagram = require('./resol-vbus').Datagram;



describe('Datagram', function() {

    describe('.fromLiveBuffer', function() {

        it('should be a function', function() {
            expect(Datagram.fromLiveBuffer).to.be.a('function');
        });

        it('should have a fromLiveBuffer function', function() {
            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            var buffer = new Buffer('aa362335332034433353300332630851', 'hex');

            var datagram = Datagram.fromLiveBuffer(buffer, 0, buffer.length);

            expect(datagram).to.be.an.instanceOf(Datagram);

            _.forEach(options, function(refValue, key) {
                var value = datagram [key];

                expect(value).to.equal(refValue, key);
            });
        });

    });

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Datagram).to.be.a('function');
            expect(Datagram.extend).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            var before = new Date();
            var datagram = new Datagram();
            var after = new Date();

            expect(datagram).to.be.an('object');
            expect(datagram.timestamp).to.be.an.instanceOf(Date);
            expect(datagram.timestamp.getTime()).to.be.within(before.getTime(), after.getTime());
            expect(datagram.channel).to.equal(0);
            expect(datagram.destinationAddress).to.equal(0);
            expect(datagram.sourceAddress).to.equal(0);
            expect(datagram.command).to.equal(0);
            expect(datagram.valueId).to.equal(0);
            expect(datagram.value).to.equal(0);
        });

        it('should copy certain options', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x1337,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330,
                junk: 0x7331
            };

            var datagram = new Datagram(options);

            expect(datagram).to.be.an('object');
            _.forEach(options, function(refValue, key) {
                var value = datagram [key];

                if (key === 'junk') {
                    refValue = undefined;
                }

                expect(value).to.equal(refValue, key);
            });
        });

    });

    describe('#toLiveBuffer', function() {

        it('should be a method', function() {
            expect(Datagram.prototype.toLiveBuffer).to.be.a('function');
        });

        it('should work correctly', function() {
            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            var datagram = new Datagram(options);

            var buffer = datagram.toLiveBuffer();

            expect(buffer).to.be.an.instanceOf(Buffer);
            expect(buffer.length).to.equal(16);
            expect(buffer.toString('hex')).to.equal('aa362335332034433353300332630851');
        });

    });

    describe('#getProtocolVersion', function() {

        it('should be a method', function() {
            expect(Datagram.prototype.getProtocolVersion).to.be.a('function');
        });

        it('should work correctly', function() {
            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            var datagram = new Datagram(options);

            expect(datagram.getProtocolVersion()).to.equal(0x20);
        });

    });

    describe('#getInfo', function() {

        it('should be a method', function() {
            expect(Datagram.prototype.getInfo).to.be.a('function');
        });

        it('should work correctly for non-notifications', function() {
            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            var datagram = new Datagram(options);

            expect(datagram.getInfo()).to.equal(0);
        });

        it('should work correctly for notifications', function() {
            var options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330
            };

            var datagram = new Datagram(options);

            expect(datagram.getInfo()).to.equal(0x5333);
        });

    });

    describe('#getId', function() {

        it('should be a method', function() {
            expect(Datagram.prototype.getId).to.be.a('function');
        });

        it('should work correctly for non-notifications', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330,
            };

            var datagram = new Datagram(options);

            expect(datagram.getId()).to.equal('13_2336_3335_20_4334_0000');
        });

        it('should work correctly for notifications', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            var datagram = new Datagram(options);

            expect(datagram.getId()).to.equal('13_2336_3335_20_0900_5333');
        });

    });

    describe('#compareTo', function() {

        it('should be a method', function() {
            expect(Datagram.prototype.compareTo).to.be.a('function');
        });

        it('should work correctly for channel', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            var datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.channel = 0x00;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.channel = 0x7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for destinationAddress', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            var datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.destinationAddress = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.destinationAddress = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for sourceAddress', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            var datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.sourceAddress = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.sourceAddress = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for command', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            var datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.command = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.command = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for info', function() {
            var options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            var datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.valueId = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.valueId = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

    });

});
