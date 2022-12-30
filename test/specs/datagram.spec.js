/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Datagram,
    Header,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('Datagram', () => {

    describe('.fromLiveBuffer', () => {

        it('should be a function', () => {
            expect(Datagram.fromLiveBuffer).to.be.a('function');
        });

        it('should have a fromLiveBuffer function', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            const buffer = Buffer.from('aa362335332034433353300332630851', 'hex');

            const datagram = Datagram.fromLiveBuffer(buffer, 0, buffer.length);

            expect(datagram).to.be.an.instanceOf(Datagram);

            for (const key of Object.getOwnPropertyNames(options)) {
                const refValue = options [key];
                const value = datagram [key];

                expect(value).to.equal(refValue, key);
            }
        });

    });

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(Datagram).to.be.a('function');
        });

        it('should have reasonable defaults', () => {
            const before = new Date();
            const datagram = new Datagram();
            const after = new Date();

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

        it('should copy certain options', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x1337,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330,
                junk: 0x7331
            };

            const datagram = new Datagram(options);

            expect(datagram).to.be.an('object');
            for (const key of Object.getOwnPropertyNames(options)) {
                let refValue = options [key];
                const value = datagram [key];

                if (key === 'junk') {
                    refValue = undefined;
                }

                expect(value).to.equal(refValue, key);
            }
        });

    });

    describe('#toLiveBuffer', () => {

        it('should be a method', () => {
            expect(Datagram.prototype.toLiveBuffer).to.be.a('function');
        });

        it('should work correctly', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            const datagram = new Datagram(options);

            const buffer = datagram.toLiveBuffer();

            expect(buffer).to.be.an.instanceOf(Buffer);
            expect(buffer.length).to.equal(16);
            expect(buffer.toString('hex')).to.equal('aa362335332034433353300332630851');
        });

    });

    describe('#getProtocolVersion', () => {

        it('should be a method', () => {
            expect(Datagram.prototype.getProtocolVersion).to.be.a('function');
        });

        it('should work correctly', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            const datagram = new Datagram(options);

            expect(datagram.getProtocolVersion()).to.equal(0x20);
        });

    });

    describe('#getInfo', () => {

        it('should be a method', () => {
            expect(Datagram.prototype.getInfo).to.be.a('function');
        });

        it('should work correctly for non-notifications', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            const datagram = new Datagram(options);

            expect(datagram.getInfo()).to.equal(0);
        });

        it('should work correctly for notifications', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330
            };

            const datagram = new Datagram(options);

            expect(datagram.getInfo()).to.equal(0x5333);
        });

    });

    describe('#getId', () => {

        it('should be a method', () => {
            expect(Datagram.prototype.getId).to.be.a('function');
        });

        it('should work correctly for non-notifications', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330,
            };

            const datagram = new Datagram(options);

            expect(datagram.getId()).to.equal('13_2336_3335_20_4334_0000');
        });

        it('should work correctly for notifications', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            const datagram = new Datagram(options);

            expect(datagram.getId()).to.equal('13_2336_3335_20_0900_5333');
        });

    });

    describe('#compareTo', () => {

        it('should be a method', () => {
            expect(Datagram.prototype.compareTo).to.be.a('function');
        });

        it('should work correctly for channel', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            const datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.channel = 0x00;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.channel = 0x7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for destinationAddress', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            const datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.destinationAddress = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.destinationAddress = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for sourceAddress', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            const datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.sourceAddress = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.sourceAddress = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for command', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            const datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.command = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.command = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

        it('should work correctly for info', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x13,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x0900,
                valueId: 0x5333,
                value: 0x63328330,
            };

            const datagram = new Datagram(options);

            expect(datagram.compareTo(new Datagram(options))).to.equal(0);

            options.valueId = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).to.be.above(0);

            options.valueId = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).to.be.below(0);
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(Datagram, Header, {
        command: 0,
        valueId: 0,
        value: 0,
        constructor: Function,
        toLiveBuffer: Function,
        getProtocolVersion: Function,
        getInfo: Function,
        getId: Function,
        compareTo: Function,
    }, {
        fromLiveBuffer: Function,
    });

});
