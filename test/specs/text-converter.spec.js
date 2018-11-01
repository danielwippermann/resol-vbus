/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const vbus = require('./resol-vbus');
const testUtils = require('./test-utils');



const HeaderSet = vbus.HeaderSet;
const Packet = vbus.Packet;

const TextConverter = vbus.TextConverter;



describe('TextConverter', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(TextConverter).to.be.a('function');
        });

    });

    describe('#reset', () => {

        it('should be a method', () => {
            expect(TextConverter.prototype.reset).to.be.a('function');
        });

    });

    describe('readable stream', () => {

        const rawPacket1 = 'aa100053001000010b0020051000004a723d1000013f40571000015706100000016800000000007f00000000007f00000000007f00000000007f00007f00000025003600051f11000000006e';
        const rawPacket2 = 'aa1000217e100001013e00000b000074';
        const rawPacket3 = 'aa1000317e100001042b05774a00003900000000007f00000000007f130d0000005f';

        it('should work correctly', () => {
            const buffer1 = Buffer.from(rawPacket1, 'hex');
            const packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            const buffer2 = Buffer.from(rawPacket2, 'hex');
            const packet2 = Packet.fromLiveBuffer(buffer2, 0, buffer2.length);
            packet2.timestamp = new Date(1387893003303);
            packet2.channel = 1;

            const buffer3 = Buffer.from(rawPacket3, 'hex');
            const packet3 = Packet.fromLiveBuffer(buffer3, 0, buffer3.length);
            packet3.timestamp = new Date(1387893003454);
            packet3.channel = 1;

            let headerSet = new HeaderSet({
                timestamp: new Date(1387893006829),
                headers: []
            });

            const converter = new TextConverter();
            converter.specification.i18n.timezone = 'Europe/Berlin';

            const onData = sinon.spy();
            converter.on('data', onData);

            converter.convertHeaderSet(headerSet);

            headerSet = new HeaderSet({
                timestamp: new Date(1387893006829),
                headers: [ packet2, packet3 ]
            });

            converter.convertHeaderSet(headerSet);

            headerSet = new HeaderSet({
                timestamp: new Date(1387893006829),
                headers: [ packet1, packet2, packet3 ]
            });

            converter.convertHeaderSet(headerSet);

            converter.convertHeaderSet(headerSet);

            converter.reset();

            converter.convertHeaderSet(headerSet);

            return converter.finish().then(() => {
                converter.removeListener('data', onData);

                expect(onData.callCount).to.equal(5);

                let chunk = onData.firstCall.args [0];

                testUtils.expectToBeABuffer(chunk);
                expect(chunk.toString()).to.equal('\r\nDate / Time\r\n12/24/2013 14:50:06\r\n');

                chunk = onData.secondCall.args [0];

                testUtils.expectToBeABuffer(chunk);
                expect(chunk.toString()).to.equal('\tVBus #1: DeltaSol MX [Heizkreis #1]\t\tVBus #1: DeltaSol MX [WMZ #1]\t\t\t\t\t\t\t\t\r\nDate / Time\tFlow set temperature [ °C]\tOperating state\tHeat quantity [ Wh]\tHeat quantity today [ Wh]\tHeat quantity week [ Wh]\tHeat quantity month [ Wh]\tVolume in total [ l]\tVolume today [ l]\tVolume week [ l]\tVolume month [ l]\tPower [ W]\r\n12/24/2013 14:50:06\t0.0\t11\t4880133\t0\t3347\t\t\t\t\t\t0\r\n');

                chunk = onData.thirdCall.args [0];

                testUtils.expectToBeABuffer(chunk);
                expect(chunk.toString()).to.equal('\tDL3\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tVBus #1: DeltaSol MX [Heizkreis #1]\t\tVBus #1: DeltaSol MX [WMZ #1]\t\t\t\t\t\t\t\t\r\nDate / Time\tResistor sensor 1 [ Ω]\tResistor sensor 2 [ Ω]\tResistor sensor 3 [ Ω]\tCurrent sensor 4 [ mA]\tTemperature Sensor 1 [ °C]\tTemperature Sensor 2 [ °C]\tTemperature Sensor 3 [ °C]\tImpulse Counter Sensor 1\tImpulse Counter Sensor 2\tImpulse Counter Sensor 3\tIrradiation Sensor 4 [ W/m²]\tLast Impulse Interval Sensor 1 [ ms]\tLast Impulse Interval Sensor 2 [ ms]\tLast Impulse Interval Sensor 3 [ ms]\tCurrent Impulse Interval Sensor 1 [ ms]\tCurrent Impulse Interval Sensor 2 [ ms]\tCurrent Impulse Interval Sensor 3 [ ms]\tHeat quantity [ Wh]\tFlow set temperature [ °C]\tOperating state\tHeat quantity [ Wh]\tHeat quantity today [ Wh]\tHeat quantity week [ Wh]\tHeat quantity month [ Wh]\tVolume in total [ l]\tVolume today [ l]\tVolume week [ l]\tVolume month [ l]\tPower [ W]\r\n12/24/2013 14:50:06\t1049.888\t1064.434\t1071.040\t4.230\t12.7\t16.5\t18.2\t0\t0\t0\t17\t\t\t\t\t\t\t\t0.0\t11\t4880133\t0\t3347\t\t\t\t\t\t0\r\n');

                chunk = onData.getCall(3).args [0];

                testUtils.expectToBeABuffer(chunk);
                expect(chunk.toString()).to.equal('12/24/2013 14:50:06\t1049.888\t1064.434\t1071.040\t4.230\t12.7\t16.5\t18.2\t0\t0\t0\t17\t\t\t\t\t\t\t\t0.0\t11\t4880133\t0\t3347\t\t\t\t\t\t0\r\n');

                chunk = onData.getCall(4).args [0];

                testUtils.expectToBeABuffer(chunk);
                expect(chunk.toString()).to.equal('\tDL3\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tVBus #1: DeltaSol MX [Heizkreis #1]\t\tVBus #1: DeltaSol MX [WMZ #1]\t\t\t\t\t\t\t\t\r\nDate / Time\tResistor sensor 1 [ Ω]\tResistor sensor 2 [ Ω]\tResistor sensor 3 [ Ω]\tCurrent sensor 4 [ mA]\tTemperature Sensor 1 [ °C]\tTemperature Sensor 2 [ °C]\tTemperature Sensor 3 [ °C]\tImpulse Counter Sensor 1\tImpulse Counter Sensor 2\tImpulse Counter Sensor 3\tIrradiation Sensor 4 [ W/m²]\tLast Impulse Interval Sensor 1 [ ms]\tLast Impulse Interval Sensor 2 [ ms]\tLast Impulse Interval Sensor 3 [ ms]\tCurrent Impulse Interval Sensor 1 [ ms]\tCurrent Impulse Interval Sensor 2 [ ms]\tCurrent Impulse Interval Sensor 3 [ ms]\tHeat quantity [ Wh]\tFlow set temperature [ °C]\tOperating state\tHeat quantity [ Wh]\tHeat quantity today [ Wh]\tHeat quantity week [ Wh]\tHeat quantity month [ Wh]\tVolume in total [ l]\tVolume today [ l]\tVolume week [ l]\tVolume month [ l]\tPower [ W]\r\n12/24/2013 14:50:06\t1049.888\t1064.434\t1071.040\t4.230\t12.7\t16.5\t18.2\t0\t0\t0\t17\t\t\t\t\t\t\t\t0.0\t11\t4880133\t0\t3347\t\t\t\t\t\t0\r\n');
            });
        });

    });

});
