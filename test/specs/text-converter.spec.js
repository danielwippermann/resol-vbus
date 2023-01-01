/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Converter,
    HeaderSet,
    I18N,
    Packet,
    Specification,
    TextConverter,
} = require('./resol-vbus');


const expect = require('./expect');
const testUtils = require('./test-utils');



const jestExpect = global.expect;


describe('TextConverter', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(TextConverter).to.be.a('function');
        });

        it('should work correctly', () => {
            const expect = global.expect;

            const conv1 = new TextConverter();

            testUtils.expectOwnPropertyNamesToEqual(conv1, [
                'columnSeparator',
                'lineSeparator',
                'separateDateAndTime',
                'specification',
                'dateFormat',
                'timeFormat',

                // Converter
                'finishedPromise',

                // Duplex
                '_events',
                '_eventsCount',
                '_maxListeners',
                '_readableState',
                '_writableState',
                'allowHalfOpen',
                'objectMode',
            ]);

            expect(conv1.columnSeparator).toBe('\t');
            expect(conv1.lineSeparator).toBe('\r\n');
            expect(conv1.separateDateAndTime).toBe(false);
            expect(conv1.specification.language).toBe('en');
            expect(conv1.dateFormat).toBe('L');
            expect(conv1.timeFormat).toBe('HH:mm:ss');

            const specification = Specification.getDefaultSpecification();

            const conv2 = new TextConverter({
                columnSeparator: ',',
                lineSeparator: '\n',
                separateDateAndTime: true,
                specification,
                dateFormat: 'dd.MM.YYYY',
                timeFormat: 'HH:mm',
            });

            expect(conv2.columnSeparator).toBe(',');
            expect(conv2.lineSeparator).toBe('\n');
            expect(conv2.separateDateAndTime).toBe(true);
            expect(conv2.specification).toBe(specification);
            expect(conv2.dateFormat).toBe('dd.MM.YYYY');
            expect(conv2.timeFormat).toBe('HH:mm');

            const conv3 = new TextConverter({
                language: 'de',
            });

            expect(conv3.specification.language).toBe('de');
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

        it('should work correctly', async () => {
            const expect = global.expect;

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

            const specification = {
                ...Specification.getDefaultSpecification(),

                getPacketFieldsForHeaders(headers) {
                    return [{
                        packetSpec: {},
                        formatTextValue() {
                            return 'TextValue1';
                        },
                    }, {
                        formatTextValue() {
                            return 'TextValue2';
                        }
                    }];
                },
            };

            const converter = new TextConverter({
                columnSeparator: ',',
                lineSeparator: '\n',
                separateDateAndTime: true,
                specification,
            });
            converter.specification.i18n.timezone = 'Europe/Berlin';

            const endPromise = new Promise(resolve => {
                converter.once('end', () => {
                    resolve();
                });
            });

            const chunks = [];
            converter.on('readable', () => {
                let chunk;
                while ((chunk = converter.read()) != null) {
                    chunks.push(chunk);
                }
            });

            converter.convertHeaderSet(headerSet);
            await converter.finish();

            await endPromise;

            const content = Buffer.concat(chunks).toString();

            expect(content).toBe(',,,\nDate,Time,,\n12/24/2013,14:50:06,TextValue1,TextValue2\n');
        });

    });

    describe('#formatDateAndTime', () => {

        it('should be a method', () => {
            jestExpect(typeof TextConverter.prototype.formatDateAndTime).toBe('function');
        });

        it('should work with a format string', () => {
            const converter = new TextConverter();

            const i18n = new I18N('en');
            const now = i18n.moment(1387893006829);
            const format = 'L';

            const result = converter.formatDateAndTime(now, format);

            jestExpect(result).toBe('12/24/2013');
        });

        it('should work with a format function', () => {
            const converter = new TextConverter();

            const i18n = new I18N('en');
            const now = i18n.moment(1387893006829);
            const format = (...args) => {
                jestExpect(args).toHaveLength(1);
                jestExpect(args [0]).toBe(now);

                return 'Formatted';
            };

            const result = converter.formatDateAndTime(now, format);

            jestExpect(result).toBe('Formatted');
        });

        it('should fail with an unsupported parameter', () => {
            const converter = new TextConverter();

            const i18n = new I18N('en');
            const now = i18n.moment(1387893006829);

            jestExpect(() => {
                converter.formatDateAndTime(now, {});
            }).toThrow('Unsupported format specifier');
        });

    });

    testUtils.itShouldWorkCorrectlyAfterMigratingToClass(TextConverter, Converter, {
        columnSeparator: '\t',
        lineSeparator: '\r\n',
        separateDateAndTime: false,
        specification: null,
        dateFormat: 'L',
        timeFormat: 'HH:mm:ss',
        lastIdList: null,
        constructor: Function,
        reset: Function,
        convertHeaderSet: Function,
        formatDateAndTime: Function,
        _read: Function,
    }, {

    });

});
