/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Datagram,
    Header,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTimestampToBeWithin,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



describe('Datagram', () => {

    itShouldBeAClass(Datagram, Header, {
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

    describe('.fromLiveBuffer', () => {

        it('should work correctly', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            const buffer = Buffer.from('aa362335332034433353300332630851', 'hex');

            const before = new Date();
            const datagram = Datagram.fromLiveBuffer(buffer, 0, buffer.length);
            const after = new Date();

            expect(datagram).toBeInstanceOf(Datagram);
            expectTimestampToBeWithin(datagram.timestamp, before, after);
            expect(datagram.destinationAddress).toBe(options.destinationAddress);
            expect(datagram.sourceAddress).toBe(options.sourceAddress);
            expect(datagram.minorVersion).toBe(0);
            expect(datagram.command).toBe(options.command);
            expect(datagram.valueId).toBe(options.valueId);
            expect(datagram.value).toBe(options.value);
        });

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const before = new Date();
            const datagram = new Datagram();
            const after = new Date();

            expectOwnPropertyNamesToEqual(datagram, [
                'timestamp',
                'channel',
                'destinationAddress',
                'sourceAddress',
                'minorVersion',
                'command',
                'valueId',
                'value',
            ]);

            expectTimestampToBeWithin(datagram.timestamp, before, after);
            expect(datagram.channel).toBe(0);
            expect(datagram.destinationAddress).toBe(0);
            expect(datagram.sourceAddress).toBe(0);
            expect(datagram.minorVersion).toBe(0);
            expect(datagram.command).toBe(0);
            expect(datagram.valueId).toBe(0);
            expect(datagram.value).toBe(0);
        });

        it('should copy certain options', () => {
            const options = {
                timestamp: new Date(0),
                channel: 0x1337,
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                minorVersion: 0x05,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330,
                junk: 0x7331
            };

            const datagram = new Datagram(options);

            expect(datagram.timestamp).toBe(options.timestamp);
            expect(datagram.channel).toBe(options.channel);
            expect(datagram.destinationAddress).toBe(options.destinationAddress);
            expect(datagram.sourceAddress).toBe(options.sourceAddress);
            expect(datagram.minorVersion).toBe(options.minorVersion);
            expect(datagram.command).toBe(options.command);
            expect(datagram.valueId).toBe(options.valueId);
            expect(datagram.value).toBe(options.value);
            expect(datagram.junk).toBe(undefined);
        });

    });

    describe('#toLiveBuffer', () => {

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

            expectTypeToBe(buffer, 'buffer');
            expect(buffer.toString('hex')).toBe('aa362335332034433353300332630851');
        });

    });

    describe('#getProtocolVersion', () => {

        it('should work correctly', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                minorVersion: 0x05,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            const datagram = new Datagram(options);

            expect(datagram.getProtocolVersion()).toBe(0x25);
        });

    });

    describe('#getInfo', () => {

        it('should work correctly for non-notifications', () => {
            const options = {
                destinationAddress: 0x2336,
                sourceAddress: 0x3335,
                command: 0x4334,
                valueId: 0x5333,
                value: 0x63328330
            };

            const datagram = new Datagram(options);

            expect(datagram.getInfo()).toBe(0);
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

            expect(datagram.getInfo()).toBe(0x5333);
        });

    });

    describe('#getId', () => {

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

            expect(datagram.getId()).toBe('13_2336_3335_20_4334_0000');
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

            expect(datagram.getId()).toBe('13_2336_3335_20_0900_5333');
        });

    });

    describe('#compareTo', () => {

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

            expect(datagram.compareTo(new Datagram(options))).toBe(0);

            options.channel = 0x00;

            expect(datagram.compareTo(new Datagram(options))).toBeGreaterThan(0);

            options.channel = 0x7F;

            expect(datagram.compareTo(new Datagram(options))).toBeLessThan(0);
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

            expect(datagram.compareTo(new Datagram(options))).toBe(0);

            options.destinationAddress = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).toBeGreaterThan(0);

            options.destinationAddress = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).toBeLessThan(0);
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

            expect(datagram.compareTo(new Datagram(options))).toBe(0);

            options.sourceAddress = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).toBeGreaterThan(0);

            options.sourceAddress = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).toBeLessThan(0);
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

            expect(datagram.compareTo(new Datagram(options))).toBe(0);

            options.command = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).toBeGreaterThan(0);

            options.command = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).toBeLessThan(0);
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

            expect(datagram.compareTo(new Datagram(options))).toBe(0);

            options.valueId = 0x0000;

            expect(datagram.compareTo(new Datagram(options))).toBeGreaterThan(0);

            options.valueId = 0x7F7F;

            expect(datagram.compareTo(new Datagram(options))).toBeLessThan(0);
        });

    });

});
