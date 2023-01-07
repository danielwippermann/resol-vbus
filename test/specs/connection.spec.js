/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { Duplex } = require('stream');


const {
    Packet,
    Datagram,
    Connection,
    Telegram,
} = require('./resol-vbus');


const {
    expect,
    expectElapsedTimeToBeWithin,
    expectOwnPropertyNamesToEqual,
    expectPromise,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



const rawDataPacket = Buffer.from([
    'aa100021771000011135',
    '02032e02004a',
    '760104010003',
    '7b0078000507',
    '02013822041e',
    '170116010050',
    '460500000034',
    '01000000007e',
    '646400000037',
    '00000000007f',
    '00000000007f',
    '01000000007e',
    '0e0109000067',
    '06010a00016d',
    '68010a00000c',
    '0e0109000067',
    '010e01230448',
    '5d070c0f017f'
].join(''), 'hex');

const rawDataDatagram = Buffer.from('aa000021772000050000000000000042', 'hex');

const rawDataTelegram1 = Buffer.from('AA11207177300432', 'hex');

const rawDataTelegram2 = Buffer.from('AA7177112030251160182B040000000454', 'hex');


async function withTestableConnection(options, fn) {
    if (typeof options === 'function') {
        fn = options;
        options = {};
    }

    const connection = new Connection();

    try {
        const stats = {
            txDataCount: 0,

            rawDataCount: 0,
            junkDataCount: 0,
            packetCount: 0,
            lastPacket: null,
            datagramCount: 0,
            lastDatagram: null,
            telegramCount: 0,
            lastTelegram: null,
        };

        if (!options.ignoreEvents) {
            connection.on('data', function(chunk) {
                stats.txDataCount += chunk.length;

                this.write(chunk);
            });

            connection.on('rawData', (chunk) => {
                // console.log(new Error('DEBUG rawData').stack);

                stats.rawDataCount += chunk.length;
            });

            connection.on('junkData', (chunk) => {
                stats.junkDataCount += chunk.length;
            });

            connection.on('packet', (packet) => {
                stats.packetCount++;
                stats.lastPacket = packet;
            });

            connection.on('datagram', (datagram) => {
                stats.datagramCount++;
                stats.lastDatagram = datagram;
            });

            connection.on('telegram', (telegram) => {
                stats.telegramCount++;
                stats.lastTelegram = telegram;
            });
        }

        return await fn(connection, stats);
    } finally {
        connection.removeAllListeners();
    }
}



describe('Connection', () => {

    itShouldBeAClass(Connection, Duplex, {
        constructor: Function,
        dataSource: null,
        channel: 0,
        selfAddress: 0x0020,
        connectionState: Connection.STATE_DISCONNECTED,
        rxBuffer: null,
        connect: Function,
        disconnect: Function,
        _write: Function,
        receive: Function,
        _read: Function,
        _setConnectionState: Function,
        send: Function,
        transceive: Function,
        waitForFreeBus: Function,
        releaseBus: Function,
        getValueById: Function,
        setValueById: Function,
        getValueIdHashById: Function,
        getValueIdByIdHash: Function,
        getCaps1: Function,
        beginBulkValueTransaction: Function,
        commitBulkValueTransaction: Function,
        rollbackBulkValueTransaction: Function,
        setBulkValueById: Function,
        ping: Function,
        getStorageActivity: Function,
        createConnectedPromise: Function,
    }, {
        STATE_DISCONNECTED: 'DISCONNECTED',
        STATE_CONNECTING: 'CONNECTING',
        STATE_CONNECTED: 'CONNECTED',
        STATE_INTERRUPTED: 'INTERRUPTED',
        STATE_RECONNECTING: 'RECONNECTING',
        STATE_DISCONNECTING: 'DISCONNECTING',
    });

    describe('.STATE_...', () => {

        it('should define states', () => {
            expectTypeToBe(Connection.STATE_DISCONNECTED, 'string');
            expectTypeToBe(Connection.STATE_CONNECTING, 'string');
            expectTypeToBe(Connection.STATE_CONNECTED, 'string');
            expectTypeToBe(Connection.STATE_INTERRUPTED, 'string');
            expectTypeToBe(Connection.STATE_RECONNECTING, 'string');
            expectTypeToBe(Connection.STATE_DISCONNECTING, 'string');
        });

    });

    describe('#constructor', () => {

        it('should have reasonable defaults', () => {
            const connection = new Connection();

            expectOwnPropertyNamesToEqual(connection, [
                'channel',
                'selfAddress',

                // base class related
                '_events',
                '_eventsCount',
                '_maxListeners',
                '_readableState',
                '_writableState',
                'allowHalfOpen',
            ]);

            expect(connection.channel).toBe(0);
            expect(connection.selfAddress).toBe(0x0020);
        });

        it('should copy selected options', () => {
            const options = {
                channel: 0x11,
                selfAddress: 0x0022,
                junk: 'DO NOT COPY ME',
            };

            const connection = new Connection(options);

            expect(connection.channel).toBe(0x11);
            expect(connection.selfAddress).toBe(0x0022);
            expect(connection.junk).toBe(undefined);
        });

    });

    describe('#connect', () => {

        it('should have abstract connect method', () => {
            const conn = new Connection();

            expect(() => {
                conn.connect();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('#disconnect', () => {

        it('should have abstract disconnect method', () => {
            const conn = new Connection();

            expect(() => {
                conn.disconnect();
            }).toThrow('Must be implemented by sub-class');
        });

    });

    describe('writable stream', () => {

        it('should work correctly without event listeners', async () => {
            await withTestableConnection({ ignoreEvents: true }, async (conn) => {
                conn.write(rawDataPacket);

                conn.write(rawDataDatagram);

                conn.write(rawDataTelegram1);
            });
        });

        it('should parse valid v1 data correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(rawDataPacket);

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(112);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(1);
                expect(stats.datagramCount).toBe(0);

                conn.write(rawDataPacket);

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(224);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(2);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should parse valid v2 data correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(rawDataDatagram);

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);

                conn.write(rawDataDatagram);

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

        it('should parse valid v3 data correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(rawDataTelegram1);

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(8);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
                expect(stats.telegramCount).toBe(1);

                conn.write(rawDataTelegram2);

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(25);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
                expect(stats.telegramCount).toBe(2);
            });
        });

        it('should parse fragmented data correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(rawDataDatagram.slice(0, 15));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(15);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);

                conn.write(rawDataDatagram.slice(15, 16));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

        it('should handle large junk data correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                const buffer = Buffer.alloc(2048);
                buffer.fill(0);

                conn.write(buffer);

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(2048);
                expect(stats.junkDataCount).toBe(1024);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should report incomplete data correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(rawDataDatagram.slice(0, 15));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(15);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);

                conn.write(rawDataDatagram.slice(0, 1));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(15);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should report MSB errors correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(Buffer.from('80aa', 'hex'));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(2);
                expect(stats.junkDataCount).toBe(1);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should report unknown protocol data correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(Buffer.from('aa100021770000010056aa', 'hex'));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(11);
                expect(stats.junkDataCount).toBe(10);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should report v1 header checksum errors correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(Buffer.from('aa100021771000010000', 'hex'));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(10);
                expect(stats.junkDataCount).toBe(10);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should report v1 frame checksum errors correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(Buffer.from('aa10002177100001014502032e020000', 'hex'));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(16);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should report v2 checksum errors correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(Buffer.from('aa000021772000050000000000000000', 'hex'));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(16);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should report v3 header checksum errors correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(Buffer.from('AA11207177300400', 'hex'));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(8);
                expect(stats.junkDataCount).toBe(8);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
                expect(stats.telegramCount).toBe(0);
            });
        });

        it('should report v3 frame checksum errors correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                conn.write(Buffer.from('AA7177112030251160182B040000000400', 'hex'));

                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(17);
                expect(stats.junkDataCount).toBe(17);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
                expect(stats.telegramCount).toBe(0);
            });
        });

    });

    describe('readable stream', () => {

        it('should process outgoing stream correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                const promise = new Promise(resolve => {
                    conn.on('data', () => {
                        resolve();
                    });
                });

                conn.push(rawDataPacket);

                await promise;

                expect(stats.txDataCount).toBe(112);
                expect(stats.rawDataCount).toBe(112);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(1);
                expect(stats.datagramCount).toBe(0);
            });
        });

    });

    describe('#_setConnectionState', () => {

        it('should work correctly', () => {
            const conn = new Connection();

            const onConnectionState = sinon.spy();

            conn.on('connectionState', onConnectionState);

            expect(conn.connectionState).toBe(Connection.STATE_DISCONNECTED);
            expect(onConnectionState.callCount).toBe(0);

            conn._setConnectionState(Connection.STATE_CONNECTED);

            expect(conn.connectionState).toBe(Connection.STATE_CONNECTED);
            expect(onConnectionState.callCount).toBe(1);

            conn._setConnectionState(Connection.STATE_CONNECTED);

            expect(conn.connectionState).toBe(Connection.STATE_CONNECTED);
            expect(onConnectionState.callCount).toBe(1);
        });

    });

    describe('#send', () => {

        it('should work correctly with a header object', async () => {
            await withTestableConnection(async (conn, stats) => {
                const packet = Packet.fromLiveBuffer(rawDataPacket, 0, rawDataPacket.length);

                const promise = new Promise(resolve => {
                    conn.once('data', resolve);
                });

                conn.send(packet);

                await promise;

                expect(stats.txDataCount).toBe(112);
                expect(stats.rawDataCount).toBe(112);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(1);
                expect(stats.datagramCount).toBe(0);
            });
        });

    });

    describe('#transceive', () => {

        it('should work correctly without arguments', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive();

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 500, 520);
                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(0);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should work correctly with timeout option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(null, {
                    timeout: 10
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(0);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should work correctly with TX data', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

        it('should work correctly with tries option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    tries: 2,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 20, 40);
                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

        it('should work correctly with timeoutIncr option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(null, {
                    timeout: 10,
                    timeoutIncr: 10,
                    tries: 2,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null, 'result');
                expectElapsedTimeToBeWithin(startTimestamp, 30, 50);
                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(0);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should work correctly with filterDatagram option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                const onDatagram = function(datagram, doneFiltering) {
                    expect(datagram).toBeInstanceOf(Datagram);
                    expect(datagram.getId()).toBe('00_0000_7721_20_0500_0000');
                    datagramResult = datagram;
                    doneFiltering(null, datagram);
                };

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    filterDatagram: onDatagram,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(datagramResult);
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

        it('should work correctly with async filterDatagram option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                const onDatagram = async function(datagram) {
                    expect(datagram).toBeInstanceOf(Datagram);
                    expect(datagram.getId()).toBe('00_0000_7721_20_0500_0000');
                    datagramResult = datagram;
                    return datagram;
                };

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    filterDatagram: onDatagram,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(datagramResult);
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

        it('should work correctly with filterPacket option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let packetResult;

                const onPacket = function(packet, doneFiltering) {
                    expect(packet).toBeInstanceOf(Packet);
                    expect(packet.getId()).toBe('00_0010_7721_10_0100');
                    packetResult = packet;
                    doneFiltering(null, packet);
                };

                const promise = conn.transceive(rawDataPacket, {
                    timeout: 10,
                    filterPacket: onPacket,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(packetResult);
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(112);
                expect(stats.rawDataCount).toBe(112);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(1);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should work correctly with async filterPacket option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let packetResult;

                const onPacket = async function(packet) {
                    expect(packet).toBeInstanceOf(Packet);
                    expect(packet.getId()).toBe('00_0010_7721_10_0100');
                    packetResult = packet;
                    return packet;
                };

                const promise = conn.transceive(rawDataPacket, {
                    timeout: 10,
                    filterPacket: onPacket,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(packetResult);
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(112);
                expect(stats.rawDataCount).toBe(112);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(1);
                expect(stats.datagramCount).toBe(0);
            });
        });

        it('should work correctly with failing async filterPacket option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const error = new Error('Test error');

                const onPacket = async function(packet) {
                    expect(packet).toBeInstanceOf(Packet);
                    expect(packet.getId()).toBe('00_0010_7721_10_0100');

                    throw error;
                };

                const promise = conn.transceive(rawDataPacket, {
                    timeout: 10,
                    filterPacket: onPacket,
                });

                expectPromise(promise);

                await expect(async () => {
                    await promise;
                }).rejects.toThrow(error);
            });
        });

        it('should work correctly with filterTelegram option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let telegramResult;

                const onTelegram = function(telegram, doneFiltering) {
                    expect(telegram).toBeInstanceOf(Telegram);
                    expect(telegram.destinationAddress).toBe(0x2011);
                    telegramResult = telegram;
                    doneFiltering(null, telegram);
                };

                const promise = conn.transceive(rawDataTelegram1, {
                    timeout: 10,
                    filterTelegram: onTelegram,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(telegramResult);
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(8);
                expect(stats.rawDataCount).toBe(8);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
                expect(stats.telegramCount).toBe(1);
            });
        });

        it('should work correctly with async filterTelegram option', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let telegramResult;

                const onTelegram = async function(telegram) {
                    expect(telegram).toBeInstanceOf(Telegram);
                    expect(telegram.destinationAddress).toBe(0x2011);
                    telegramResult = telegram;
                    return telegram;
                };

                const promise = conn.transceive(rawDataTelegram1, {
                    timeout: 10,
                    filterTelegram: onTelegram,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(telegramResult);
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(8);
                expect(stats.rawDataCount).toBe(8);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
                expect(stats.telegramCount).toBe(1);
            });
        });

    });

    describe('#waitForFreeBus', () => {

        it('should work correctly without arguments', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.waitForFreeBus();

                conn.send(rawDataDatagram);

                const result = await expectPromise(promise);

                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0000_7721_20_0500_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

        it('should work correctly with timeout', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.waitForFreeBus(10);

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(0);
                expect(stats.rawDataCount).toBe(0);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(0);
            });
        });

    });

    describe('#releaseBus', () => {

        it('should work correctly with address', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                conn.on('datagram', (datagram) => {
                    expect(datagram.getId()).toBe('00_7721_0020_20_0600_0000');

                    conn.send(rawDataPacket);
                });

                const promise = conn.releaseBus(0x7721);

                const result = await expectPromise(promise);

                expect(result).toBeInstanceOf(Packet);
                expect(result.getId()).toBe('00_0010_7721_10_0100');
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(16 + 112);
                expect(stats.rawDataCount).toBe(16 + 112);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(1);
                expect(stats.datagramCount).toBe(1);
            });
        });

        it('should work correctly with timeout', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.releaseBus(0, {
                    timeout: 10,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 20, 40);
                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

        it('should work correctly with tries', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.releaseBus(0, {
                    timeout: 10,
                    tries: 1,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

    });

    describe('#getValueById', () => {

        it('should work correctly with address and value index', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x0300) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: 0x12345678
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.getValueById(0x7721, 0x1234);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_0300_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

        it('should work correctly with timeout', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if ((rxDatagram.command === 0x0300) && (stats.datagramCount === 2)) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: 0x12345678
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                });

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_0300_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with timeoutIncr', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 60, 80);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with tries', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                    tries: 1,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

    });

    describe('#setValueById', () => {

        it('should work correctly with address, value ID and value', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x0200) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: rxDatagram.value,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.setValueById(0x7721, 0x1234, 0x1234);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_0200_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

        it('should work correctly with timeout', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if ((rxDatagram.command === 0x0200) && (stats.datagramCount === 2)) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: rxDatagram.value,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10
                });

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_0200_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with timeoutIncr', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 60, 80);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with tries', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10,
                    tries: 1,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

    });

    describe('#getValueIdHashById', () => {

        it('should work correctly with address and value ID', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x1000) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: 0x12345678,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.getValueIdHashById(0x7721, 0x1234);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1000_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

        it('should work correctly with timeout', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if ((rxDatagram.command === 0x1000) && (stats.datagramCount === 2)) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: rxDatagram.value,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.getValueIdHashById(0x7721, 0x1234, {
                    timeout: 10
                });

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1000_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with timeoutIncr', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdHashById(0x7721, 0x1234, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 60, 80);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with tries', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdHashById(0x7721, 0x1234, {
                    timeout: 10,
                    tries: 1,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

    });

    describe('#getValueIdByIdHash', () => {

        it('should work correctly with address and value ID', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x1100) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: 0x1234,
                            value: rxDatagram.value,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.getValueIdByIdHash(0x7721, 0x12345678);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1100_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);
                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

        it('should work correctly with timeout', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if ((rxDatagram.command === 0x1100) && (stats.datagramCount === 2)) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: 0x1234,
                            value: rxDatagram.value,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.getValueIdByIdHash(0x7721, 0x12345678, {
                    timeout: 10
                });

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1100_0000');
                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_0100_0000');
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with timeoutIncr', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdByIdHash(0x7721, 0x12345678, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 60, 80);
                expect(stats.txDataCount).toBe(48);
                expect(stats.rawDataCount).toBe(48);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(3);
            });
        });

        it('should work correctly with tries', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdByIdHash(0x7721, 0x12345678, {
                    timeout: 10,
                    tries: 1,
                });

                const result = await expectPromise(promise);

                expect(result).toBe(null);
                expectElapsedTimeToBeWithin(startTimestamp, 10, 30);
                expect(stats.txDataCount).toBe(16);
                expect(stats.rawDataCount).toBe(16);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(1);
            });
        });

    });

    describe('#getCaps1', () => {

        it('should work correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x1300) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x1301,
                            valueId: 0,
                            value: 0x12345678,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.getCaps1(0x7721);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1300_0000');

                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_1301_0000');

                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);

                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

    });

    describe('#beginBulkValueTransaction', () => {

        it('should work correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x1400) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x1401,
                            valueId: 0,
                            value: 0,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.beginBulkValueTransaction(0x7721, 10);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1400_0000');
                expect(datagramResult.value).toBe(10);

                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_1401_0000');

                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);

                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

    });

    describe('#commitBulkValueTransaction', () => {

        it('should work correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x1402) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x1403,
                            valueId: 0,
                            value: 0,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.commitBulkValueTransaction(0x7721);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1402_0000');

                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_1403_0000');

                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);

                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

    });

    describe('#rollbackBulkValueTransaction', () => {

        it('should work correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x1404) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x1405,
                            valueId: 0,
                            value: 0,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.rollbackBulkValueTransaction(0x7721);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1404_0000');

                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_1405_0000');

                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);

                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

    });

    describe('#setBulkValueById', () => {

        it('should work correctly', async () => {
            await withTestableConnection(async (conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                conn.on('datagram', (rxDatagram) => {
                    if (rxDatagram.command === 0x1512) {
                        datagramResult = rxDatagram;

                        const txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x1612,
                            valueId: 0x3456,
                            value: 0,
                        });

                        conn.send(txDatagram);
                    }
                });

                const promise = conn.setBulkValueById(0x7721, 0x123456, 0x789abcde);

                const result = await expectPromise(promise);

                expect(datagramResult).toBeInstanceOf(Datagram);
                expect(datagramResult.getId()).toBe('00_7721_0020_20_1512_0000');
                expect(datagramResult.valueId).toBe(0x3456);
                expect(datagramResult.value).toBe(0x789abcde);

                expect(result).toBeInstanceOf(Datagram);
                expect(result.getId()).toBe('00_0020_7721_20_1612_0000');
                expect(result.valueId).toBe(0x3456);
                expect(result.value).toBe(0);

                expectElapsedTimeToBeWithin(startTimestamp, 0, 20);

                expect(stats.txDataCount).toBe(32);
                expect(stats.rawDataCount).toBe(32);
                expect(stats.junkDataCount).toBe(0);
                expect(stats.packetCount).toBe(0);
                expect(stats.datagramCount).toBe(2);
            });
        });

    });

});



module.exports = {
    withTestableConnection,
};
