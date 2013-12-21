/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var _ = require('lodash');


var Datagram = require('./resol-vbus').Datagram;


var connectionSpec = require('./connection.spec');



describe('Datagram', function() {

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

    it('should have a toLiveBuffer method', function() {
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

/*
        var stats = connectionSpec.parseRawDataOnce(buffer);
        expect(stats.rawDataCount).to.equal(buffer.length);
        expect(stats.junkDataCount).to.equal(0);
        expect(stats.datagramCount).to.equal(1);
        expect(stats.lastDatagram).to.be.an.instanceOf(Datagram);

        _.keys(options, function(key) {
            var value = stats.lastDatagram [key];
            var refValue = datagram [key];

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

    it('should have a getId method', function() {
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

        expect(datagram).to.be.an('object');
        expect(datagram.getId()).to.equal('13_2336_3335_20_4334_0000');

        datagram.command = 0x0900;
        expect(datagram.getId()).to.equal('13_2336_3335_20_0900_5333');
    });

});
