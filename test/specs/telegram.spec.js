/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Header,
    Telegram,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('Telegram', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(Telegram).to.be.a('function');

        });

        it('should have reasonable defaults', () => {
            const telegram = new Telegram();

            expect(telegram).to.have.a.property('destinationAddress').that.is.equal(0);
            expect(telegram).to.have.a.property('sourceAddress').that.is.equal(0);
            expect(telegram).to.have.a.property('command').that.is.equal(0);
            expect(telegram).to.have.a.property('frameData').that.is.an.instanceOf(Buffer).that.has.a.lengthOf(21);
        });

        it('should copy selected options', () => {
            const options = {
                destinationAddress: 0x1111,
                sourceAddress: 0x2222,
                command: 0x3333,
                frameData: Buffer.from('123456712345671234567123456712345671234567', 'hex'),
            };

            const telegram = new Telegram(options);

            expect(telegram).to.have.a.property('destinationAddress').that.is.equal(options.destinationAddress);
            expect(telegram).to.have.a.property('sourceAddress').that.is.equal(options.sourceAddress);
            expect(telegram).to.have.a.property('command').that.is.equal(options.command);
            expect(telegram).to.have.a.property('frameData').that.is.eql(options.frameData).that.is.not.equal(options.frameData);
        });

        it('should not copy frameData', () => {
            const options = {
                destinationAddress: 0x1111,
                sourceAddress: 0x2222,
                command: 0x3333,
                frameData: Buffer.from('123456712345671234567123456712345671234567', 'hex'),
                dontCopyFrameData: true,
            };

            const telegram = new Telegram(options);

            expect(telegram).to.have.a.property('destinationAddress').that.is.equal(options.destinationAddress);
            expect(telegram).to.have.a.property('sourceAddress').that.is.equal(options.sourceAddress);
            expect(telegram).to.have.a.property('command').that.is.equal(options.command);
            expect(telegram).to.have.a.property('frameData').that.is.equal(options.frameData);
        });

    });

    describe('#toLiveBuffer', () => {

        it('should be a method', () => {
            expect(Telegram.prototype).to.have.a.property('toLiveBuffer').that.is.a('function');
        });

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

            expect(buffer.toString('hex')).to.equal('aa2211443330772e000c1824303c48000354606c7804101c70472834404c5864707f6c');
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

            expect(buffer.toString('hex')).to.equal('aa2211443330772e000c1824303c48000354606c7804101c70472834404c5864707f6c');
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
            }).to.throw();
        });

    });

    describe('.fromLiveBuffer', () => {

        it('should be a method', () => {
            expect(Telegram).to.have.a.property('fromLiveBuffer').that.is.a('function');
        });

        it('should work correctly', () => {
            const options = {
                destinationAddress: 0x7771,
                sourceAddress: 0x2011,
                command: 0x25,
                frameData: Buffer.from('6018ab04000000', 'hex'),
            };

            const buffer = Buffer.from('AA7177112030251160182B040000000454', 'hex');

            const telegram = Telegram.fromLiveBuffer(buffer, 0, buffer.length);

            expect(telegram).to.be.an.instanceOf(Telegram);

            for (const key of Object.getOwnPropertyNames(options)) {
                let refValue = options [key];
                let value = telegram [key];

                if ((value instanceof Buffer) && (refValue instanceof Buffer)) {
                    value = value.slice(0, refValue.length).toString('hex');
                    refValue = refValue.toString('hex');
                }

                expect(value).to.equal(refValue, key);
            }
        });

    });

    describe('#getId', () => {

        it('should be a method', () => {
            expect(Telegram.prototype).to.have.a.property('getId').that.is.a('function');
        });

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

            expect(telegram).to.be.an('object');
            expect(telegram.getId()).to.equal('13_1122_3344_30_77');
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(Telegram, Header, {
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

});
