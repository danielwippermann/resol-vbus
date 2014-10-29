/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var Header = require('./resol-vbus').Header;
var Packet = require('./resol-vbus').Packet;
var Datagram = require('./resol-vbus').Datagram;
var Telegram = require('./resol-vbus').Telegram;
var Connection = require('./resol-vbus').Connection;



var rawDataPacket = new Buffer([
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

var rawDataDatagram = new Buffer('aa000021772000050000000000000042', 'hex');

var rawDataTelegram1 = new Buffer('AA11207177300432', 'hex');

var rawDataTelegram2 = new Buffer('AA7177112030251160182B040000000454', 'hex');


var parseRawData = function(rawDataOrCallback, start, end, ignoreEvents) {
    var rawData, callback;
    if (typeof rawDataOrCallback === 'function') {
        callback = rawDataOrCallback;
    } else {
        rawData = rawDataOrCallback;
    }

    var connection = new Connection();

    var stats = {
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

        connection.on('rawData', function(chunk) {
            // console.log(new Error('DEBUG rawData').stack);

            stats.rawDataCount += chunk.length;
        });

        connection.on('junkData', function(chunk) {
            stats.junkDataCount += chunk.length;
        });

        connection.on('packet', function(packet) {
            stats.packetCount++;
            stats.lastPacket = packet;
        });

        connection.on('datagram', function(datagram) {
            stats.datagramCount++;
            stats.lastDatagram = datagram;
        });

        connection.on('telegram', function(telegram) {
            stats.telegramCount++;
            stats.lastTelegram = telegram;
        });
    }

    var done = function() {
        connection.removeAllListeners();
    };

    var result;
    if (callback) {
        if (callback.length >= 3) {
            result = callback(connection, stats, done);
        } else {
            result = callback(connection, stats);
            done();
        }
    } else if (rawData) {
        var buffer = rawData.slice(start, end);

        connection.write(buffer);

        result = stats;
    }

    return result;
};



var maxTimeoutFactor = process.env.TRAVIS ? 1000 : 1;



describe('Connection', function() {

    describe('constructor', function() {

        it('should be a constructor', function() {
            expect(Connection).to.be.a('function');
            expect(Connection.extend).to.be.a('function');
        });

    });

    describe('.STATE_...', function() {

        it('should define states', function() {
            expect(Connection.STATE_DISCONNECTED).to.be.a('string');
            expect(Connection.STATE_CONNECTING).to.be.a('string');
            expect(Connection.STATE_CONNECTED).to.be.a('string');
            expect(Connection.STATE_INTERRUPTED).to.be.a('string');
            expect(Connection.STATE_RECONNECTING).to.be.a('string');
            expect(Connection.STATE_DISCONNECTING).to.be.a('string');
        });

    });

    describe('#connect', function() {

        it('should have abstract connect method', function() {
            var conn = new Connection();

            expect(function() {
                conn.connect();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#disconnect', function() {

        it('should have abstract disconnect method', function() {
            var conn = new Connection();

            expect(function() {
                conn.disconnect();
            }).to.throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('writable stream', function() {

        it('should work correctly without event listeners', function() {
            parseRawData(function(conn, stats) {
                conn.write(rawDataPacket);

                conn.write(rawDataDatagram);

                conn.write(rawDataTelegram1);
            }, null, null, true);
        });

        it('should parse valid v1 data correctly', function() {
            parseRawData(function(conn, stats) {
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

        it('should parse valid v2 data correctly', function() {
            parseRawData(function(conn, stats) {
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

        it('should parse valid v3 data correctly', function() {
            parseRawData(function(conn, stats) {
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

        it('should parse fragmented data correctly', function() {
            parseRawData(function(conn, stats) {
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

        it('should handle large junk data correctly', function() {
            parseRawData(function(conn, stats) {
                var buffer = new Buffer(2048);
                buffer.fill(0);

                conn.write(buffer);

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(2048);
                expect(stats.junkDataCount).to.equal(1024);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report incomplete data correctly', function() {
            parseRawData(function(conn, stats) {
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

        it('should report MSB errors correctly', function() {
            parseRawData(function(conn, stats) {
                conn.write(new Buffer('80aa', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(2);
                expect(stats.junkDataCount).to.equal(1);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report unknown protocol data correctly', function() {
            parseRawData(function(conn, stats) {
                conn.write(new Buffer('aa100021770000010056aa', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(11);
                expect(stats.junkDataCount).to.equal(10);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v1 header checksum errors correctly', function() {
            parseRawData(function(conn, stats) {
                conn.write(new Buffer('aa100021771000010000', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(10);
                expect(stats.junkDataCount).to.equal(10);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v1 frame checksum errors correctly', function() {
            parseRawData(function(conn, stats) {
                conn.write(new Buffer('aa10002177100001014502032e020000', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(16);
                expect(stats.junkDataCount).to.equal(16);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v2 checksum errors correctly', function() {
            parseRawData(function(conn, stats) {
                conn.write(new Buffer('aa000021772000050000000000000000', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(16);
                expect(stats.junkDataCount).to.equal(16);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
            });
        });

        it('should report v3 header checksum errors correctly', function() {
            parseRawData(function(conn, stats) {
                conn.write(new Buffer('AA11207177300400', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(8);
                expect(stats.junkDataCount).to.equal(8);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
                expect(stats.telegramCount).to.equal(0);
            });
        });

        it('should report v3 frame checksum errors correctly', function() {
            parseRawData(function(conn, stats) {
                conn.write(new Buffer('AA7177112030251160182B040000000400', 'hex'));

                expect(stats.txDataCount).to.equal(0);
                expect(stats.rawDataCount).to.equal(17);
                expect(stats.junkDataCount).to.equal(17);
                expect(stats.packetCount).to.equal(0);
                expect(stats.datagramCount).to.equal(0);
                expect(stats.telegramCount).to.equal(0);
            });
        });

    });

    describe('readable stream', function() {

        it('should process outgoing stream correctly', function() {
            parseRawData(function(conn, stats) {
                conn.push(rawDataPacket);

                expect(stats.txDataCount).to.equal(112);
                expect(stats.rawDataCount).to.equal(112);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(1);
                expect(stats.datagramCount).to.equal(0);
            });
        });

    });

    describe('#_setConnectionState', function() {

        it('should be a method', function() {
            expect(Connection.prototype._setConnectionState).to.be.a('function');
        });

        it('should work correctly', function() {
            var conn = new Connection();

            var onConnectionState = sinon.spy();

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

    describe('#send', function() {

        it('should be a method', function() {
            expect(Connection.prototype.send).to.be.a('function');
        });

        it('should work correctly with a header object', function() {
            parseRawData(function(conn, stats) {
                var packet = Packet.fromLiveBuffer(rawDataPacket, 0, rawDataPacket.length);

                conn.send(packet);

                expect(stats.txDataCount).to.equal(112);
                expect(stats.rawDataCount).to.equal(112);
                expect(stats.junkDataCount).to.equal(0);
                expect(stats.packetCount).to.equal(1);
                expect(stats.datagramCount).to.equal(0);
            });
        });

    });

    describe('#transceive', function() {

        it('should be a method', function() {
            expect(Connection.prototype.transceive).to.be.a('function');
        });

        it('should work correctly without arguments', function(doneTesting) {
            this.slow(600);

            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.transceive();

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(490, 520 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with timeout option', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.transceive(null, {
                    timeout: 10
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with TX data', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.transceive(rawDataDatagram, {
                    timeout: 10
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with tries option', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    tries: 2,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(18, 40 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with timeoutIncr option', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.transceive(null, {
                    timeout: 10,
                    timeoutIncr: 10,
                    tries: 2,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null, 'result');
                    expect(Date.now() - startTimestamp).to.be.within(27, 50 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with filterDatagram option', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var datagramResult;

                var onDatagram = function(datagram, doneFiltering) {
                    expect(datagram).to.be.an('object');
                    expect(datagram.getId()).to.equal('00_0000_7721_20_0500_0000');
                    datagramResult = datagram;
                    doneFiltering(null, datagram);
                };

                var promise = conn.transceive(rawDataDatagram, {
                    timeout: 10,
                    filterDatagram: onDatagram,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(datagramResult);
                    expect(Date.now() - startTimestamp).to.be.within(0, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with filterPacket option', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var packetResult;

                var onPacket = function(packet, doneFiltering) {
                    expect(packet).to.be.an('object');
                    expect(packet.getId()).to.equal('00_0010_7721_10_0100');
                    packetResult = packet;
                    doneFiltering(null, packet);
                };

                var promise = conn.transceive(rawDataPacket, {
                    timeout: 10,
                    filterPacket: onPacket,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(packetResult);
                    expect(Date.now() - startTimestamp).to.be.within(0, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(112);
                    expect(stats.rawDataCount).to.equal(112);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(1);
                    expect(stats.datagramCount).to.equal(0);

                    doneParsing();
                    doneTesting();
                });
            });
        });

    });

    describe('#waitForFreeBus', function() {

        it('should be a method', function() {
            expect(Connection.prototype.waitForFreeBus).to.be.a('function');
        });

        it('should work correctly without arguments', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.waitForFreeBus();

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0000_7721_20_0500_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);

                    doneParsing();
                    doneTesting();
                });

                process.nextTick(function() {
                    conn.send(rawDataDatagram);
                });
            });
        });

        it('should work correctly with timeout', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.waitForFreeBus(10);

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(0);
                    expect(stats.rawDataCount).to.equal(0);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(0);

                    doneParsing();
                    doneTesting();
                });
            });
        });

    });

    describe('#releaseBus', function() {

        it('should be a method', function() {
            expect(Connection.prototype.releaseBus).to.be.a('function');
        });

        it('should work correctly with address', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                conn.on('datagram', function(datagram) {
                    expect(datagram.getId()).to.equal('00_7721_0020_20_0600_0000');

                    conn.send(rawDataPacket);
                });

                var promise = conn.releaseBus(0x7721);

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0010_7721_10_0100');
                    expect(Date.now() - startTimestamp).to.be.within(0, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16 + 112);
                    expect(stats.rawDataCount).to.equal(16 + 112);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(1);
                    expect(stats.datagramCount).to.equal(1);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with timeout', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.releaseBus(0, {
                    timeout: 10,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(18, 40 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with tries', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.releaseBus(0, {
                    timeout: 10,
                    tries: 1,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);

                    doneParsing();
                    doneTesting();
                });
            });
        });

    });

    describe('#getValueById', function() {

        it('should be a method', function() {
            expect(Connection.prototype.getValueById).to.be.a('function');
        });

        it('should work correctly with address and value index', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var datagramResult;

                conn.on('datagram', function(rxDatagram) {
                    if (rxDatagram.command === 0x0300) {
                        datagramResult = rxDatagram;

                        var txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: 0x12345678
                        });

                        conn.send(txDatagram);
                    }
                });

                var promise = conn.getValueById(0x7721, 0x1234);

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0300_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with timeout', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var datagramResult;

                conn.on('datagram', function(rxDatagram) {
                    if ((rxDatagram.command === 0x0300) && (stats.datagramCount === 2)) {
                        datagramResult = rxDatagram;

                        var txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: 0x12345678
                        });

                        conn.send(txDatagram);
                    }
                });

                var promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0300_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with timeoutIncr', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(54, 80 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with tries', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.getValueById(0x7721, 0x1234, {
                    timeout: 10,
                    tries: 1,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);

                    doneParsing();
                    doneTesting();
                });
            });
        });

    });

    describe('#setValueById', function() {

        it('should be a method', function() {
            expect(Connection.prototype.setValueById).to.be.a('function');
        });

        it('should work correctly with address, value ID and value', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var datagramResult;

                conn.on('datagram', function(rxDatagram) {
                    if (rxDatagram.command === 0x0200) {
                        datagramResult = rxDatagram;

                        var txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: rxDatagram.value,
                        });

                        conn.send(txDatagram);
                    }
                });

                var promise = conn.setValueById(0x7721, 0x1234, 0x1234);

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0200_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(0, 20 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(32);
                    expect(stats.rawDataCount).to.equal(32);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(2);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with timeout', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var datagramResult;

                conn.on('datagram', function(rxDatagram) {
                    if ((rxDatagram.command === 0x0200) && (stats.datagramCount === 2)) {
                        datagramResult = rxDatagram;

                        var txDatagram = new Datagram({
                            destinationAddress: rxDatagram.sourceAddress,
                            sourceAddress: rxDatagram.destinationAddress,
                            command: 0x0100,
                            valueId: rxDatagram.valueId,
                            value: rxDatagram.value,
                        });

                        conn.send(txDatagram);
                    }
                });

                var promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(datagramResult).to.be.an('object');
                    expect(datagramResult.getId()).to.equal('00_7721_0020_20_0200_0000');
                    expect(result).to.be.an('object');
                    expect(result.getId()).to.equal('00_0020_7721_20_0100_0000');
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with timeoutIncr', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10,
                    timeoutIncr: 10,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(54, 80 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(48);
                    expect(stats.rawDataCount).to.equal(48);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(3);

                    doneParsing();
                    doneTesting();
                });
            });
        });

        it('should work correctly with tries', function(doneTesting) {
            parseRawData(function(conn, stats, doneParsing) {
                var startTimestamp = Date.now();

                var promise = conn.setValueById(0x7721, 0x1234, 0x12345678, {
                    timeout: 10,
                    tries: 1,
                });

                expect(promise).to.be.an('object');
                expect(promise.then).to.be.a('function');

                promise.done(function(result) {
                    expect(result).to.equal(null);
                    expect(Date.now() - startTimestamp).to.be.within(9, 30 * maxTimeoutFactor);
                    expect(stats.txDataCount).to.equal(16);
                    expect(stats.rawDataCount).to.equal(16);
                    expect(stats.junkDataCount).to.equal(0);
                    expect(stats.packetCount).to.equal(0);
                    expect(stats.datagramCount).to.equal(1);

                    doneParsing();
                    doneTesting();
                });
            });
        });

    });

});



module.exports = {
    parseRawData: parseRawData,
};
