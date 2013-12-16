/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Header = require('./resol-vbus').Header;
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



var parseRawData = function(rawDataOrCallback, start, end) {
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

    connection.on('data', function(chunk) {
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

    connection.send = function(chunk) {
        if (chunk instanceof Header) {
            chunk = chunk.toBuffer();
        }

        stats.txDataCount += chunk.length;

        this.write(chunk);
    };

    var result;
    if (callback) {
        result = callback(connection, stats);
    } else if (rawData) {
        var buffer = rawData.slice(start, end);

        connection.write(buffer);

        result = stats;
    }

    connection.removeAllListeners();

    return result;
};



describe('Connection', function() {

    it('should be a constructor', function() {
        expect(Connection).to.be.a('function');
        expect(Connection.extend).to.be.a('function');
    });

    it('should define states', function() {
        expect(Connection.STATE_DISCONNECTED).to.be.a('string');
        expect(Connection.STATE_CONNECTING).to.be.a('string');
        expect(Connection.STATE_CONNECTED).to.be.a('string');
        expect(Connection.STATE_INTERRUPTED).to.be.a('string');
        expect(Connection.STATE_RECONNECTING).to.be.a('string');
        expect(Connection.STATE_DISCONNECTING).to.be.a('string');
    });

    it('should have abstract connect method', function() {
        var conn = new Connection();

        expect(function() {
            conn.connect();
        }).to.throw(Error, 'Must be implemented by sub-class');
    });

    it('should have abstract disconnect method', function() {
        var conn = new Connection();

        expect(function() {
            conn.disconnect();
        }).to.throw(Error, 'Must be implemented by sub-class');
    });

    it('should parse incoming stream correctly', function() {
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

            conn.write(rawDataPacket);

            expect(stats.txDataCount).to.equal(0);
            expect(stats.rawDataCount).to.equal(336);
            expect(stats.junkDataCount).to.equal(0);
            expect(stats.packetCount).to.equal(3);
            expect(stats.datagramCount).to.equal(0);

            conn.write(rawDataDatagram);

            expect(stats.txDataCount).to.equal(0);
            expect(stats.rawDataCount).to.equal(352);
            expect(stats.junkDataCount).to.equal(0);
            expect(stats.packetCount).to.equal(3);
            expect(stats.datagramCount).to.equal(1);
        });
    });

    it('should process outgoing stream correctly', function() {
        parseRawData(function(conn, stats) {
            conn.send(rawDataPacket);

            expect(stats.txDataCount).to.equal(112);
            expect(stats.rawDataCount).to.equal(112);
            expect(stats.junkDataCount).to.equal(0);
            expect(stats.packetCount).to.equal(1);
            expect(stats.datagramCount).to.equal(0);
        });
    });

    

});



module.exports = {
    parseRawData: parseRawData,
};
