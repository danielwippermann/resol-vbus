/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { Duplex } = require('stream');


const {
    Packet,
    Datagram,
    Connection,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    expectPromise,
    itShouldWorkCorrectlyAfterMigratingToClass,
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


const parseRawData = function(rawDataOrCallback, start, end, ignoreEvents) {
    let rawData, callback;
    if (typeof rawDataOrCallback === 'function') {
        callback = rawDataOrCallback;
    } else {
        rawData = rawDataOrCallback;
    }

    const connection = new Connection();

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

    if (!ignoreEvents) {
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

    const done = function() {
        connection.removeAllListeners();
    };

    let result;
    if (callback) {
        if (callback.length >= 3) {
            result = callback(connection, stats, done);
        } else {
            result = callback(connection, stats);

            if (result && result.then && (typeof result.then === 'function')) {
                result = result.then(() => {
                    done();
                });
            } else {
                done();
            }
        }
    } else if (rawData) {
        const buffer = rawData.slice(start, end);

        connection.write(buffer);

        result = stats;
    }

    return result;
};



const minTimeoutFactor = process.env.CI ? 0.8 : 1;
const maxTimeoutFactor = process.env.CI ? 1000 : 1;



describe('Connection', () => {

    describe('constructor', () => {

        it('should be a constructor', () => {
            expect(Connection).to.be.a('function');
        });

    });

    describe('.STATE_...', () => {

        it('should define states', () => {
            expect(Connection.STATE_DISCONNECTED).to.be.a('string');
            expect(Connection.STATE_CONNECTING).to.be.a('string');
            expect(Connection.STATE_CONNECTED).to.be.a('string');
            expect(Connection.STATE_INTERRUPTED).to.be.a('string');
            expect(Connection.STATE_RECONNECTING).to.be.a('string');
            expect(Connection.STATE_DISCONNECTING).to.be.a('string');
        });

    });

    describe('#connect', () => {

        it('should have abstract connect method', () => {
            const conn = new Connection();

            expect(() => {
                conn.connect();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#disconnect', () => {

        it('should have abstract disconnect method', () => {
            const conn = new Connection();

            expect(() => {
                conn.disconnect();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('writable stream', () => {

        it('should work correctly without event listeners', () => {
            parseRawData((conn, stats) => {
                conn.write(rawDataPacket);

                conn.write(rawDataDatagram);

                conn.write(rawDataTelegram1);
            }, null, null, true);
        });

        it('should parse valid v1 data correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(rawDataPacket);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(112);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(1);
                expect(stats.datagramCount).to.equal(0);

                conn.write(rawDataPacket);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(224);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(2);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should parse valid v2 data correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(rawDataDatagram);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(16);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(1);

                conn.write(rawDataDatagram);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(32);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(2);
            });
        });

        it('should parse valid v3 data correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(rawDataTelegram1);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(8);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
                expect(stats.telegramCount).to.equal(1);

                conn.write(rawDataTelegram2);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(25);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
                expect(stats.telegramCount).to.equal(2);
            });
        });

        it('should parse fragmented data correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(rawDataDatagram.slice(0, 15));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(15);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);

                conn.write(rawDataDatagram.slice(15, 16));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(16);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(1);
            });
        });

        it('should handle large junk data correctly', () => {
            parseRawData((conn, stats) => {
                const buffer = Buffer.alloc(2048);
                buffer.fill(0);

                conn.write(buffer);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(2048);
                expect(stats.junkDataCount).to.equal(1024);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report incomplete data correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(rawDataDatagram.slice(0, 15));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(15);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);

                conn.write(rawDataDatagram.slice(0, 1));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(16);
                expect(stats.junkDataCount).to.equal(15);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report MSB errors correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(Buffer.from('80aa', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(2);
                expect(stats.junkDataCount).to.equal(1);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report unknown protocol data correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(Buffer.from('aa100021770000010056aa', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(11);
                expect(stats.junkDataCount).to.equal(10);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v1 header checksum errors correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(Buffer.from('aa100021771000010000', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(10);
                expect(stats.junkDataCount).to.equal(10);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v1 frame checksum errors correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(Buffer.from('aa10002177100001014502032e020000', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(16);
                expect(stats.junkDataCount).to.equal(16);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v2 checksum errors correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(Buffer.from('aa000021772000050000000000000000', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(16);
                expect(stats.junkDataCount).to.equal(16);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v3 header checksum errors correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(Buffer.from('AA11207177300400', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(8);
                expect(stats.junkDataCount).to.equal(8);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
                expect(stats.telegramCount).to.equal(0);
            });
        });

        it('should report v3 frame checksum errors correctly', () => {
            parseRawData((conn, stats) => {
                conn.write(Buffer.from('AA7177112030251160182B040000000400', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(17);
                expect(stats.junkDataCount).to.equal(17);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
                expect(stats.telegramCount).to.equal(0);
            });
        });

    });

    describe('readable stream', () => {

        it('should process outgoing stream correctly', () => {
            parseRawData((conn, stats, done) => {
                const check = function() {
                    try {
                        expect(stats.txDataCount).to.equal(112);
                        expect(stats.rawDataCount).to.equal(112);
                        expect(stats.junkDataCount).to.equal(0);
                        expect(stats.packetCount).to.equal(1);
                        expect(stats.datagramCount).to.equal(0);

                        done();
                    } catch (ex) {
                        done(ex);
                    }
                };

                conn.on('data', () => {
                    process.nextTick(check);
                });

                conn.push(rawDataPacket);
            });
        });

    });

    describe('#_setConnectionState', () => {

        it('should be a method', () => {
            expect(Connection.prototype._setConnectionState).to.be.a('function');
        });

        it('should work correctly', () => {
            const conn = new Connection();

            const onConnectionState = sinon.spy();

            conn.on('connectionState', onConnectionState);

            expect(conn.connectionState).to.equal(Connection.STATE_DISCONNECTED);
            expect(onConnectionState.callCount).to.equal(0);

            conn._setConnectionState(Connection.STATE_CONNECTED);

            expect(conn.connectionState).to.equal(Connection.STATE_CONNECTED);
            expect(onConnectionState.callCount).to.equal(1);

            conn._setConnectionState(Connection.STATE_CONNECTED);

            expect(conn.connectionState).to.equal(Connection.STATE_CONNECTED);
            expect(onConnectionState.callCount).to.equal(1);
        });

    });

    describe('#send', () => {

        it('should be a method', () => {
            expect(Connection.prototype.send).to.be.a('function');
        });

        it('should work correctly with a header object', () => {
            return parseRawData((conn, stats, done) => {
                const packet = Packet.fromLiveBuffer(rawDataPacket, 0, rawDataPacket.length);

                const check = function() {
                    try {
                        expect(stats.txDataCount).to.equal(112);
                        expect(stats.rawDataCount).to.equal(112);
                        expect(stats.junkDataCount).to.equal(0);
                        expect(stats.packetCount).to.equal(1);
                        expect(stats.datagramCount).to.equal(0);

                        done();
                    } catch (ex) {
                        done(ex);
                    }
                };

                conn.once('data', () => {
                    process.nextTick(check);
                });

                conn.send(packet);
            });
        });

    });

    describe('#transceive', () => {

        it('should be a method', () => {
            expect(Connection.prototype.transceive).to.be.a('function');
        });

        it('should work correctly without arguments', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive();

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(500 * minTimeoutFactor, 520 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);
                });
            });
        });

        it('should work correctly with timeout option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(null, {
                    timeout: 10
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);
                });
            });
        });

        it('should work correctly with TX data', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

        it('should work correctly with tries option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    tries: 2,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(20 * minTimeoutFactor, 40 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);
                });
            });
        });

        it('should work correctly with timeoutIncr option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.transceive(null, {
                    timeout: 10,
                    timeoutIncr: 10,
                    tries: 2,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(30 * minTimeoutFactor, 50 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);
                });
            });
        });

        it('should work correctly with filterDatagram option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                const onDatagram = function(datagram, doneFiltering) {
                    expect(datagram).to.be.an('object');
                    expect(datagram.getId()).to.equal('00_0000_7721_20_0500_0000');
                    datagramResult = datagram;
                    doneFiltering(null, datagram);
                };

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    filterDatagram: onDatagram,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(datagramResult);
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

        it('should work correctly with async filterDatagram option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                let datagramResult;

                const onDatagram = async function(datagram) {
                    expect(datagram).to.be.an('object');
                    expect(datagram.getId()).to.equal('00_0000_7721_20_0500_0000');
                    datagramResult = datagram;
                    return datagram;
                };

                const promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    filterDatagram: onDatagram,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(datagramResult);
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

        it('should work correctly with filterPacket option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                let packetResult;

                const onPacket = function(packet, doneFiltering) {
                    expect(packet).to.be.an('object');
                    expect(packet.getId()).to.equal('00_0010_7721_10_0100');
                    packetResult = packet;
                    doneFiltering(null, packet);
                };

                const promise = conn.transceive(rawDataPacket, {
                    timeout: 10,
                    filterPacket: onPacket,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(packetResult);
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(112);
                    expect(stats.rawDataCount).to.equal(112);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(1);
                    expect(stats.datagramCount).to.equal(0);
                });
            });
        });

        it('should work correctly with async filterPacket option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                let packetResult;

                const onPacket = async function(packet) {
                    expect(packet).to.be.an('object');
                    expect(packet.getId()).to.equal('00_0010_7721_10_0100');
                    packetResult = packet;
                    return packet;
                };

                const promise = conn.transceive(rawDataPacket, {
                    timeout: 10,
                    filterPacket: onPacket,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(packetResult);
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(112);
                    expect(stats.rawDataCount).to.equal(112);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(1);
                    expect(stats.datagramCount).to.equal(0);
                });
            });
        });

        it('should work correctly with failing async filterPacket option', () => {
            return parseRawData((conn, stats) => {
                const error = new Error('Test error');

                const onPacket = async function(packet) {
                    expect(packet).to.be.an('object');
                    expect(packet.getId()).to.equal('00_0010_7721_10_0100');

                    throw error;
                };

                const promise = conn.transceive(rawDataPacket, {
                    timeout: 10,
                    filterPacket: onPacket,
                });

                expectPromise(promise);

                return promise.then(() => {
                    throw new Error('Should not have reached here...');
                }, (err) => {
                    expect(err).to.equal(error);
                });
            });
        });

        it('should work correctly with filterTelegram option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                let telegramResult;

                const onTelegram = function(telegram, doneFiltering) {
                    expect(telegram).to.be.an('object');
                    expect(telegram.destinationAddress).to.equal(0x2011);
                    telegramResult = telegram;
                    doneFiltering(null, telegram);
                };

                const promise = conn.transceive(rawDataTelegram1, {
                    timeout: 10,
                    filterTelegram: onTelegram,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(telegramResult);
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(8);
                    expect(stats.rawDataCount).to.equal(8);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);
                    expect(stats.telegramCount).to.equal(1);
                });
            });
        });

        it('should work correctly with async filterTelegram option', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                let telegramResult;

                const onTelegram = async function(telegram) {
                    expect(telegram).to.be.an('object');
                    expect(telegram.destinationAddress).to.equal(0x2011);
                    telegramResult = telegram;
                    return telegram;
                };

                const promise = conn.transceive(rawDataTelegram1, {
                    timeout: 10,
                    filterTelegram: onTelegram,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(telegramResult);
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(8);
                    expect(stats.rawDataCount).to.equal(8);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);
                    expect(stats.telegramCount).to.equal(1);
                });
            });
        });

    });

    describe('#waitForFreeBus', () => {

        it('should be a method', () => {
            expect(Connection.prototype.waitForFreeBus).to.be.a('function');
        });

        it('should work correctly without arguments', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.waitForFreeBus();

                expectPromise(promise);

                process.nextTick(() => {
                    conn.send(rawDataDatagram);
                });

                return promise.then((result) => {
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0000_7721_20_0500_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

        it('should work correctly with timeout', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.waitForFreeBus(10);

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);
                });
            });
        });

    });

    describe('#releaseBus', () => {

        it('should be a method', () => {
            expect(Connection.prototype.releaseBus).to.be.a('function');
        });

        it('should work correctly with address', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                conn.on('datagram', (datagram) => {
                    expect(datagram.getId()).to.equal('00_7721_0020_20_0600_0000');

                    conn.send(rawDataPacket);
                });

                const promise = conn.releaseBus(0x7721);

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0010_7721_10_0100');
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16 + 112);
                    expect(stats.rawDataCount).to.equal(16 + 112);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(1);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

        it('should work correctly with timeout', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.releaseBus(0, {
                    timeout: 10,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(20 * minTimeoutFactor, 40 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);
                });
            });
        });

        it('should work correctly with tries', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.releaseBus(0, {
                    timeout: 10,
                    tries: 1,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

    });

    describe('#getValueById', () => {

        it('should be a method', () => {
            expect(Connection.prototype.getValueById).to.be.a('function');
        });

        it('should work correctly with address and value index', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0300_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);
                });
            });
        });

        it('should work correctly with timeout', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0300_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with timeoutIncr', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(60 * minTimeoutFactor, 80 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with tries', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                    tries: 1,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

    });

    describe('#setValueById', () => {

        it('should be a method', () => {
            expect(Connection.prototype.setValueById).to.be.a('function');
        });

        it('should work correctly with address, value ID and value', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0200_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);
                });
            });
        });

        it('should work correctly with timeout', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0200_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with timeoutIncr', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(60 * minTimeoutFactor, 80 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with tries', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10,
                    tries: 1,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

    });

    describe('#getValueIdHashById', () => {

        it('should be a method', () => {
            expect(Connection.prototype.getValueIdHashById).to.be.a('function');
        });

        it('should work correctly with address and value ID', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_1000_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);
                });
            });
        });

        it('should work correctly with timeout', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_1000_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with timeoutIncr', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdHashById(0x7721, 0x1234, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(60 * minTimeoutFactor, 80 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with tries', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdHashById(0x7721, 0x1234, {
                    timeout: 10,
                    tries: 1,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

    });

    describe('#getValueIdByIdHash', () => {

        it('should be a method', () => {
            expect(Connection.prototype.getValueIdByIdHash).to.be.a('function');
        });

        it('should work correctly with address and value ID', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_1100_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);
                });
            });
        });

        it('should work correctly with timeout', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_1100_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with timeoutIncr', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdByIdHash(0x7721, 0x12345678, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(60 * minTimeoutFactor, 80 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);
                });
            });
        });

        it('should work correctly with tries', () => {
            return parseRawData((conn, stats) => {
                const startTimestamp = Date.now();

                const promise = conn.getValueIdByIdHash(0x7721, 0x12345678, {
                    timeout: 10,
                    tries: 1,
                });

                expectPromise(promise);

                return promise.then((result) => {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(10 * minTimeoutFactor, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);
                });
            });
        });

    });

    describe('#getCaps1', () => {

        it('should be a method', () => {
            expect(typeof Connection.prototype.getCaps1).equal('function');
        });

        it('should work correctly', () => {
            return parseRawData((conn, stats) => {
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

                expectPromise(promise);

                return promise.then((result) => {
                    expect(typeof datagramResult).equal('object');
                    expect(datagramResult.getId()).equal('00_7721_0020_20_1300_0000');

                    expect(typeof result).equal('object');
                    expect(result.getId()).equal('00_0020_7721_20_1301_0000');

                    expect(Date.now() - startTimestamp).within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);

                    expect(stats.txDataCount).equal(32);
                    expect(stats.rawDataCount).equal(32);
                    expect(stats.junkDataCount).equal(0);
                    expect(stats.packetCount).equal(0);
                    expect(stats.datagramCount).equal(2);
                });
            });
        });

    });

    describe('#beginBulkValueTransaction', () => {

        it('should be a method', () => {
            expect(typeof Connection.prototype.beginBulkValueTransaction).equal('function');
        });

        it('should work correctly', () => {
            return parseRawData((conn, stats) => {
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

                return conn.beginBulkValueTransaction(0x7721, 10).then((result) => {
                    expect(typeof datagramResult).equal('object');
                    expect(datagramResult.getId()).equal('00_7721_0020_20_1400_0000');
                    expect(datagramResult.value).equal(10);

                    expect(typeof result).equal('object');
                    expect(result.getId()).equal('00_0020_7721_20_1401_0000');

                    expect(Date.now() - startTimestamp).within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);

                    expect(stats.txDataCount).equal(32);
                    expect(stats.rawDataCount).equal(32);
                    expect(stats.junkDataCount).equal(0);
                    expect(stats.packetCount).equal(0);
                    expect(stats.datagramCount).equal(2);
                });
            });
        });

    });

    describe('#commitBulkValueTransaction', () => {

        it('should be a method', () => {
            expect(typeof Connection.prototype.commitBulkValueTransaction).equal('function');
        });

        it('should work correctly', () => {
            return parseRawData((conn, stats) => {
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

                return conn.commitBulkValueTransaction(0x7721).then((result) => {
                    expect(typeof datagramResult).equal('object');
                    expect(datagramResult.getId()).equal('00_7721_0020_20_1402_0000');

                    expect(typeof result).equal('object');
                    expect(result.getId()).equal('00_0020_7721_20_1403_0000');

                    expect(Date.now() - startTimestamp).within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);

                    expect(stats.txDataCount).equal(32);
                    expect(stats.rawDataCount).equal(32);
                    expect(stats.junkDataCount).equal(0);
                    expect(stats.packetCount).equal(0);
                    expect(stats.datagramCount).equal(2);
                });
            });
        });

    });

    describe('#rollbackBulkValueTransaction', () => {

        it('should be a method', () => {
            expect(typeof Connection.prototype.rollbackBulkValueTransaction).equal('function');
        });

        it('should work correctly', () => {
            return parseRawData((conn, stats) => {
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

                return conn.rollbackBulkValueTransaction(0x7721).then((result) => {
                    expect(typeof datagramResult).equal('object');
                    expect(datagramResult.getId()).equal('00_7721_0020_20_1404_0000');

                    expect(typeof result).equal('object');
                    expect(result.getId()).equal('00_0020_7721_20_1405_0000');

                    expect(Date.now() - startTimestamp).within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);

                    expect(stats.txDataCount).equal(32);
                    expect(stats.rawDataCount).equal(32);
                    expect(stats.junkDataCount).equal(0);
                    expect(stats.packetCount).equal(0);
                    expect(stats.datagramCount).equal(2);
                });
            });
        });

    });

    describe('#setBulkValueById', () => {

        it('should be a method', () => {
            expect(typeof Connection.prototype.setBulkValueById).equal('function');
        });

        it('should work correctly', () => {
            return parseRawData((conn, stats) => {
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

                return conn.setBulkValueById(0x7721, 0x123456, 0x789abcde).then((result) => {
                    expect(typeof datagramResult).equal('object');
                    expect(datagramResult.getId()).equal('00_7721_0020_20_1512_0000');
                    expect(datagramResult.valueId).equal(0x3456);
                    expect(datagramResult.value).equal(0x789abcde);

                    expect(typeof result).equal('object');
                    expect(result.getId()).equal('00_0020_7721_20_1612_0000');
                    expect(result.valueId).equal(0x3456);
                    expect(result.value).equal(0);

                    expect(Date.now() - startTimestamp).within(0 * minTimeoutFactor, 20 * maxTimeoutFactor);

                    expect(stats.txDataCount).equal(32);
                    expect(stats.rawDataCount).equal(32);
                    expect(stats.junkDataCount).equal(0);
                    expect(stats.packetCount).equal(0);
                    expect(stats.datagramCount).equal(2);
                });
            });
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(Connection, Duplex, {
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

});



module.exports = {
    parseRawData,
};
