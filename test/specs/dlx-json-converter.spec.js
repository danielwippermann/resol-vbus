/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var HeaderSet = require('./resol-vbus').HeaderSet;
var Packet = require('./resol-vbus').Packet;

var VBusRecordingConverter = require('./resol-vbus').VBusRecordingConverter;

var DLxJsonConverter = require('./resol-vbus').DLxJsonConverter;



var rawRecording1, refJsonRecording1;



describe('DLxJsonConverter', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(DLxJsonConverter).to.be.a('function');
        });

    });

    describe('#reset', function() {

        it('should be a method', function() {
            expect(DLxJsonConverter.prototype.reset).to.be.a('function');
        });

    });

    describe('readable stream', function() {

        var rawPacket1 = 'aa100053001000010b0020051000004a723d1000013f40571000015706100000016800000000007f00000000007f00000000007f00000000007f00007f00000025003600051f11000000006e';
        var rawPacket2 = 'aa1000217e100001013e00000b000074';
        var rawPacket3 = 'aa1000317e100001042b05774a00003900000000007f00000000007f130d0000005f';

        it('should work correctly', function() {
            var buffer1 = new Buffer(rawPacket1, 'hex');
            var packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            var buffer2 = new Buffer(rawPacket2, 'hex');
            var packet2 = Packet.fromLiveBuffer(buffer2, 0, buffer2.length);
            packet2.timestamp = new Date(1387893003303);
            packet2.channel = 1;

            var buffer3 = new Buffer(rawPacket3, 'hex');
            var packet3 = Packet.fromLiveBuffer(buffer3, 0, buffer3.length);
            packet3.timestamp = new Date(1387893003454);
            packet3.channel = 1;

            var headerSet = new HeaderSet({
                timestamp: new Date(1387893006829),
                headers: []
            });

            var converter = new DLxJsonConverter();

            var onData = sinon.spy();
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

            // converter.reset();

            converter.convertHeaderSet(headerSet);

            converter.end();

            expect(onData.callCount).to.equal(7);

            var chunk = onData.firstCall.args [0];

            expect(chunk).to.be.an('object');
            expect(chunk.toString()).to.equal('{\"headersets\":[');

            chunk = onData.secondCall.args [0];

            expect(chunk).to.be.an('object');
            expect(chunk.toString()).to.equal('{\"timestamp\":1387893006.829,\"packets\":[]}');

            chunk = onData.thirdCall.args [0];

            expect(chunk).to.be.an('object');
            expect(chunk.toString()).to.equal(',{\"timestamp\":1387893006.829,\"packets\":[{\"header_index\":0,\"timestamp\":1387893003.303,\"field_values\":[{\"field_index\":0,\"raw_value\":0,\"value\":\"0.0\"},{\"field_index\":1,\"raw_value\":11,\"value\":\"11\"}]},{\"header_index\":1,\"timestamp\":1387893003.454,\"field_values\":[{\"field_index\":0,\"raw_value\":4880133,\"value\":\"4880133\"},{\"field_index\":1,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":2,\"raw_value\":3347,\"value\":\"3347\"}]}]}');

            chunk = onData.getCall(3).args [0];

            expect(chunk).to.be.an('object');
            expect(chunk.toString()).to.equal(',{\"timestamp\":1387893006.829,\"packets\":[{\"header_index\":0,\"timestamp\":1387893003.303,\"field_values\":[{\"field_index\":0,\"raw_value\":0,\"value\":\"0.0\"},{\"field_index\":1,\"raw_value\":11,\"value\":\"11\"}]},{\"header_index\":1,\"timestamp\":1387893003.454,\"field_values\":[{\"field_index\":0,\"raw_value\":4880133,\"value\":\"4880133\"},{\"field_index\":1,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":2,\"raw_value\":3347,\"value\":\"3347\"}]},{\"header_index\":2,\"timestamp\":1387893006.778,\"field_values\":[{\"field_index\":0,\"raw_value\":1049.888,\"value\":\"1049.888\"},{\"field_index\":1,\"raw_value\":1064.434,\"value\":\"1064.434\"},{\"field_index\":2,\"raw_value\":1071.04,\"value\":\"1071.040\"},{\"field_index\":3,\"raw_value\":4.23,\"value\":\"4.230\"},{\"field_index\":4,\"raw_value\":12.7,\"value\":\"12.7\"},{\"field_index\":5,\"raw_value\":16.5,\"value\":\"16.5\"},{\"field_index\":6,\"raw_value\":18.2,\"value\":\"18.2\"},{\"field_index\":7,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":8,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":9,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":10,\"raw_value\":17,\"value\":\"17\"}]}]}');

            chunk = onData.getCall(4).args [0];

            expect(chunk).to.be.an('object');
            expect(chunk.toString()).to.equal(',{\"timestamp\":1387893006.829,\"packets\":[{\"header_index\":0,\"timestamp\":1387893003.303,\"field_values\":[{\"field_index\":0,\"raw_value\":0,\"value\":\"0.0\"},{\"field_index\":1,\"raw_value\":11,\"value\":\"11\"}]},{\"header_index\":1,\"timestamp\":1387893003.454,\"field_values\":[{\"field_index\":0,\"raw_value\":4880133,\"value\":\"4880133\"},{\"field_index\":1,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":2,\"raw_value\":3347,\"value\":\"3347\"}]},{\"header_index\":2,\"timestamp\":1387893006.778,\"field_values\":[{\"field_index\":0,\"raw_value\":1049.888,\"value\":\"1049.888\"},{\"field_index\":1,\"raw_value\":1064.434,\"value\":\"1064.434\"},{\"field_index\":2,\"raw_value\":1071.04,\"value\":\"1071.040\"},{\"field_index\":3,\"raw_value\":4.23,\"value\":\"4.230\"},{\"field_index\":4,\"raw_value\":12.7,\"value\":\"12.7\"},{\"field_index\":5,\"raw_value\":16.5,\"value\":\"16.5\"},{\"field_index\":6,\"raw_value\":18.2,\"value\":\"18.2\"},{\"field_index\":7,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":8,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":9,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":10,\"raw_value\":17,\"value\":\"17\"}]}]}');

            chunk = onData.getCall(5).args [0];

            expect(chunk).to.be.an('object');
            expect(chunk.toString()).to.equal(',{\"timestamp\":1387893006.829,\"packets\":[{\"header_index\":0,\"timestamp\":1387893003.303,\"field_values\":[{\"field_index\":0,\"raw_value\":0,\"value\":\"0.0\"},{\"field_index\":1,\"raw_value\":11,\"value\":\"11\"}]},{\"header_index\":1,\"timestamp\":1387893003.454,\"field_values\":[{\"field_index\":0,\"raw_value\":4880133,\"value\":\"4880133\"},{\"field_index\":1,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":2,\"raw_value\":3347,\"value\":\"3347\"}]},{\"header_index\":2,\"timestamp\":1387893006.778,\"field_values\":[{\"field_index\":0,\"raw_value\":1049.888,\"value\":\"1049.888\"},{\"field_index\":1,\"raw_value\":1064.434,\"value\":\"1064.434\"},{\"field_index\":2,\"raw_value\":1071.04,\"value\":\"1071.040\"},{\"field_index\":3,\"raw_value\":4.23,\"value\":\"4.230\"},{\"field_index\":4,\"raw_value\":12.7,\"value\":\"12.7\"},{\"field_index\":5,\"raw_value\":16.5,\"value\":\"16.5\"},{\"field_index\":6,\"raw_value\":18.2,\"value\":\"18.2\"},{\"field_index\":7,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":8,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":9,\"raw_value\":0,\"value\":\"0\"},{\"field_index\":10,\"raw_value\":17,\"value\":\"17\"}]}]}');

            chunk = onData.getCall(6).args [0];

            expect(chunk).to.be.an('object');
            expect(chunk.toString()).to.equal('],"headerset_stats":{\"headerset_count\":5,\"min_timestamp\":1387893006.829,\"max_timestamp\":1387893006.829},"headers":[{\"id\":\"01_0010_7E21_0100\",\"description\":\"VBus 1: DeltaSol MX [Heizkreis #1]\",\"channel\":1,\"destination_address\":16,\"source_address\":32289,\"protocol_version\":16,\"command\":256,\"info\":0,\"destination_name\":\"DFA\",\"source_name\":\"DeltaSol MX [Heizkreis #1]\",\"fields\":[{\"id\":\"000_2_0\",\"name\":\"Flow set temperature\",\"unit\":\" °C\",\"unit_code\":\"DegreesCelsius\"},{\"id\":\"002_1_0\",\"name\":\"Operating status\",\"unit\":\"\",\"unit_code\":\"None\"}]},{\"id\":\"01_0010_7E31_0100\",\"description\":\"VBus 1: DeltaSol MX [WMZ #1]\",\"channel\":1,\"destination_address\":16,\"source_address\":32305,\"protocol_version\":16,\"command\":256,\"info\":0,\"destination_name\":\"DFA\",\"source_name\":\"DeltaSol MX [WMZ #1]\",\"fields\":[{\"id\":\"000_4_0\",\"name\":\"Heat quantity\",\"unit\":\" Wh\",\"unit_code\":\"WattHours\"},{\"id\":\"008_4_0\",\"name\":\"Heat quantity today\",\"unit\":\" Wh\",\"unit_code\":\"WattHours\"},{\"id\":\"012_4_0\",\"name\":\"Heat quantity week\",\"unit\":\" Wh\",\"unit_code\":\"WattHours\"}]},{\"id\":\"00_0010_0053_0100\",\"description\":\"VBus 0: DL3\",\"channel\":0,\"destination_address\":16,\"source_address\":83,\"protocol_version\":16,\"command\":256,\"info\":0,\"destination_name\":\"DFA\",\"source_name\":\"DL3\",\"fields\":[{\"id\":\"000_4_0\",\"name\":\"Resistor sensor 1\",\"unit\":\" Ohm\",\"unit_code\":\"Ohms\"},{\"id\":\"004_4_0\",\"name\":\"Resistor sensor 2\",\"unit\":\" Ohm\",\"unit_code\":\"Ohms\"},{\"id\":\"008_4_0\",\"name\":\"Resistor sensor 3\",\"unit\":\" Ohm\",\"unit_code\":\"Ohms\"},{\"id\":\"012_4_0\",\"name\":\"Current sensor 4\",\"unit\":\" mA\",\"unit_code\":\"Milliamperes\"},{\"id\":\"034_2_0\",\"name\":\"Temperature Sensor 1\",\"unit\":\" °C\",\"unit_code\":\"DegreesCelsius\"},{\"id\":\"036_2_0\",\"name\":\"Temperature Sensor 2\",\"unit\":\" °C\",\"unit_code\":\"DegreesCelsius\"},{\"id\":\"038_2_0\",\"name\":\"Temperature Sensor 3\",\"unit\":\" °C\",\"unit_code\":\"DegreesCelsius\"},{\"id\":\"016_4_0\",\"name\":\"Impulse Counter Sensor 1\",\"unit\":\"\",\"unit_code\":\"None\"},{\"id\":\"020_4_0\",\"name\":\"Impulse Counter Sensor 2\",\"unit\":\"\",\"unit_code\":\"None\"},{\"id\":\"024_4_0\",\"name\":\"Impulse Counter Sensor 3\",\"unit\":\"\",\"unit_code\":\"None\"},{\"id\":\"040_2_0\",\"name\":\"Irradiation Sensor 4\",\"unit\":\" W/m²\",\"unit_code\":\"WattsPerSquareMeter\"}]}],"language":"en"}');
        });

        it('should work correctly', function(done) {
            var rawRecording = rawRecording1;

            var refJsonRecording = refJsonRecording1;

            var inConv = new VBusRecordingConverter();

            var outConv = new DLxJsonConverter();

            var onHeaderSet = sinon.spy(function(headerSet) {
                outConv.convertHeaderSet(headerSet);
            });

            inConv.on('headerSet', onHeaderSet);

            var buffers = [];

            var onData = sinon.spy(function(chunk) {
                buffers.push(chunk);
            });

            outConv.on('data', onData);

            inConv.on('finish', function() {
                expect(onHeaderSet.callCount).to.equal(1);

                expect(onData.callCount).to.equal(2);

                outConv.end();

                expect(onData.callCount).to.equal(3);

                var buffer = Buffer.concat(buffers);

                var string = buffer.toString();

                var jsonRecording;

                expect(function() {
                    jsonRecording = JSON.parse(string);
                }).to.not.throw();

                expect(jsonRecording).to.be.an('object');

                expect(jsonRecording).to.eql({
                    headersets: refJsonRecording.headersets,
                    headerset_stats: refJsonRecording.headerset_stats,
                    headers: refJsonRecording.headers,
                    language: refJsonRecording.language,
                });

                done();
            });
            
            inConv.write(rawRecording, 'hex');

            inConv.end();
        });

    });

});



rawRecording1 = [
    'a5440e000e00e535993e43010000a566',
    '46004600c335993e4301000010005300',
    '100000012c00000070ee0f002d2d1000',
    'f54b10001c1b00000000000000000000',
    '0000000000000000000071009a00ae00',
    'dc000000a57710001000000000000000',
    '00000100a5667e007e002a2d993e4301',
    '00001000117e10000001640000002101',
    'aa00ce00b60184010f02a300bb003f00',
    'eb006affdf001f0248dd0f2746054501',
    'fa000f270f2700000000000000000000',
    '00000000000000000000000000000000',
    '00000f27fc000f270f271e0000640000',
    '00000000646400000000256e70180000',
    '0000a566560056001334993e43010000',
    '1000127e100000013c00000006012d01',
    '000129010101b8220f270f270f270f27',
    '0f270f270f270f270f270f270f270f27',
    '0f270f270f270f270f270f270f270f27',
    '0f270f270f270f27a5661e001e00932d',
    '993e430100001000217e100000010400',
    '000000000b00a5662a002a004d2e993e',
    '430100001000317e1000000110000000',
    'd57f4a000000000089060000e3150000',
    'a5662a002a004d2e993e430100001000',
    '327e100000011000000029236d000000',
    '00006c0b0000c1280000a5662a002a00',
    'eb2e993e430100001000337e10000001',
    '100000001149c9000000000015000000',
    'b7550200a5662a002a00632f993e4301',
    '00001000347e1000000110000000f94a',
    '04000000000010000000c93c0000a566',
    '2a002a00632f993e430100001000357e',
    '10000001100000008e8cbf0000000000',
    '0000000077190200a566420042002a2d',
    '993e430100001500117e100000012800',
    '0000020a00002101aa00d57f4a00010b',
    '000000000000040800001e0000640000',
    '00000000646400000000a56652005200',
    '5931993e430100005166117e10000002',
    '38000000000100000000000000010000',
    '00000000000100000000000000010000',
    '00000000640100006400000000000000',
    '000000000000000000000000a5665200',
    '5200d922993e430100005266117e1000',
    '00023800000000010000000000000001',
    '00000000000000010000000000000001',
    '00000000000000010000000000000000',
    '0000000000000000000000000000a566',
    '52005200ded4983e430100005366117e',
    '10000002380000000001000000000000',
    '00010000000000000001000000000000',
    '00010000000000000001000000000000',
    '00000000000000000000000000000000',
    'a566520052006486983e430100005466',
    '117e1000000238000000000100000000',
    '00000001000000000000000100000000',
    '00000001000000000000000100000000',
    '00000000000000000000000000000000',
    '0000a56652005200c7f3983e43010000',
    '5566117e100000023800000000010000',
    '00000000000100000000000000010000',
    '00000000000100000000000000010000',
    '00000000000000000000000000000000',
    '00000000a566320032003f22993e4301',
    '0000117e5166100000011800000044d1',
    '10000f0c110086c71000b10511003ec9',
    '10001c969800',
].join('');

refJsonRecording1 = {
    'language': 'en',
    'headers': [{
        'id': '00_0010_0053_0100',
        'description': 'VBus 0: DL3',
        'channel': 0,
        'destination_address': 16,
        'source_address': 83,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DL3',
        'fields': [{
            'id': '000_4_0',
            'name': 'Resistor sensor 1',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '004_4_0',
            'name': 'Resistor sensor 2',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '008_4_0',
            'name': 'Resistor sensor 3',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '012_4_0',
            'name': 'Current sensor 4',
            'unit': ' mA',
            'unit_code': 'Milliamperes'
        }, {
            'id': '034_2_0',
            'name': 'Temperature Sensor 1',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '036_2_0',
            'name': 'Temperature Sensor 2',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '038_2_0',
            'name': 'Temperature Sensor 3',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '016_4_0',
            'name': 'Impulse Counter Sensor 1',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '020_4_0',
            'name': 'Impulse Counter Sensor 2',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '024_4_0',
            'name': 'Impulse Counter Sensor 3',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '040_2_0',
            'name': 'Irradiation Sensor 4',
            'unit': ' W/m\u00B2',
            'unit_code': 'WattsPerSquareMeter'
        }]
    }, {
        'id': '01_0010_7E11_0100',
        'description': 'VBus 1: DeltaSol MX [Regler]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32273,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [Regler]',
        'fields': [{
            'id': '000_2_0',
            'name': 'Temperature sensor 1',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '002_2_0',
            'name': 'Temperature sensor 2',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '004_2_0',
            'name': 'Temperature sensor 3',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '006_2_0',
            'name': 'Temperature sensor 4',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '008_2_0',
            'name': 'Temperature sensor 5',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '010_2_0',
            'name': 'Temperature sensor 6',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '012_2_0',
            'name': 'Temperature sensor 7',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '014_2_0',
            'name': 'Temperature sensor 8',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '016_2_0',
            'name': 'Temperature sensor 9',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '018_2_0',
            'name': 'Temperature sensor 10',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '020_2_0',
            'name': 'Temperature sensor 11',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '022_2_0',
            'name': 'Temperature sensor 12',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '024_2_0',
            'name': 'Temperature sensor 13',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '026_2_0',
            'name': 'Temperature sensor 14',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '028_2_0',
            'name': 'Temperature sensor 15',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '030_2_0',
            'name': 'Irradiation sensor 16',
            'unit': ' W/m\u00B2',
            'unit_code': 'WattsPerSquareMeter'
        }, {
            'id': '032_2_0',
            'name': 'Temperature sensor 17',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '034_2_0',
            'name': 'Temperature sensor 18',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '036_2_0',
            'name': 'Temperature sensor 19',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '038_2_0',
            'name': 'Temperature sensor 20',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '040_4_0',
            'name': 'Flow rate sensor 13',
            'unit': ' l/h',
            'unit_code': 'LitersPerHour'
        }, {
            'id': '044_4_0',
            'name': 'Flow rate sensor 14',
            'unit': ' l/h',
            'unit_code': 'LitersPerHour'
        }, {
            'id': '048_4_0',
            'name': 'Flow rate sensor 15',
            'unit': ' l/h',
            'unit_code': 'LitersPerHour'
        }, {
            'id': '052_4_0',
            'name': 'Flow rate sensor 17',
            'unit': ' l/h',
            'unit_code': 'LitersPerHour'
        }, {
            'id': '056_4_0',
            'name': 'Flow rate sensor 18',
            'unit': ' l/h',
            'unit_code': 'LitersPerHour'
        }, {
            'id': '060_4_0',
            'name': 'Flow rate sensor 19',
            'unit': ' l/h',
            'unit_code': 'LitersPerHour'
        }, {
            'id': '064_4_0',
            'name': 'Flow rate sensor 20',
            'unit': ' l/h',
            'unit_code': 'LitersPerHour'
        }, {
            'id': '068_2_0',
            'name': 'Pressure sensor 17',
            'unit': ' bar',
            'unit_code': 'Bars'
        }, {
            'id': '070_2_0',
            'name': 'Pressure sensor 18',
            'unit': ' bar',
            'unit_code': 'Bars'
        }, {
            'id': '072_2_0',
            'name': 'Pressure sensor 19',
            'unit': ' bar',
            'unit_code': 'Bars'
        }, {
            'id': '074_2_0',
            'name': 'Pressure sensor 20',
            'unit': ' bar',
            'unit_code': 'Bars'
        }, {
            'id': '076_1_0',
            'name': 'Pump speed relay 1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '077_1_0',
            'name': 'Pump speed relay 2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '078_1_0',
            'name': 'Pump speed relay 3',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '079_1_0',
            'name': 'Pump speed relay 4',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '080_1_0',
            'name': 'Pump speed relay 5',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '081_1_0',
            'name': 'Pump speed relay 6',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '082_1_0',
            'name': 'Pump speed relay 7',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '083_1_0',
            'name': 'Pump speed relay 8',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '084_1_0',
            'name': 'Pump speed relay 9',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '085_1_0',
            'name': 'Pump speed relay 10',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '086_1_0',
            'name': 'Pump speed relay 11',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '087_1_0',
            'name': 'Pump speed relay 12',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '088_1_0',
            'name': 'Pump speed relay 13',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '089_1_0',
            'name': 'Pump speed relay 14',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '092_4_0',
            'name': 'System date',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '096_4_0',
            'name': 'Error mask',
            'unit': '',
            'unit_code': 'None'
        }]
    }, {
        'id': '01_0010_7E12_0100',
        'description': 'VBus 1: DeltaSol MX [Module]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32274,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [Module]',
        'fields': [{
            'id': '000_2_0',
            'name': 'Temperatur Modul 1 Sensor 1',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '002_2_0',
            'name': 'Temperatur Modul 1 Sensor 2',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '004_2_0',
            'name': 'Temperatur Modul 1 Sensor 3',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '006_2_0',
            'name': 'Temperatur Modul 1 Sensor 4',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '008_2_0',
            'name': 'Temperatur Modul 1 Sensor 5',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '010_2_0',
            'name': 'Temperatur Modul 1 Sensor 6',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '012_2_0',
            'name': 'Temperatur Modul 2 Sensor 1',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '014_2_0',
            'name': 'Temperatur Modul 2 Sensor 2',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '016_2_0',
            'name': 'Temperatur Modul 2 Sensor 3',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '018_2_0',
            'name': 'Temperatur Modul 2 Sensor 4',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '020_2_0',
            'name': 'Temperatur Modul 2 Sensor 5',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '022_2_0',
            'name': 'Temperatur Modul 2 Sensor 6',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '024_2_0',
            'name': 'Temperatur Modul 3 Sensor 1',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '026_2_0',
            'name': 'Temperatur Modul 3 Sensor 2',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '028_2_0',
            'name': 'Temperatur Modul 3 Sensor 3',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '030_2_0',
            'name': 'Temperatur Modul 3 Sensor 4',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '032_2_0',
            'name': 'Temperatur Modul 3 Sensor 5',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '034_2_0',
            'name': 'Temperatur Modul 3 Sensor 6',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '036_2_0',
            'name': 'Temperatur Modul 4 Sensor 1',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '038_2_0',
            'name': 'Temperatur Modul 4 Sensor 2',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '040_2_0',
            'name': 'Temperatur Modul 4 Sensor 3',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '042_2_0',
            'name': 'Temperatur Modul 4 Sensor 4',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '044_2_0',
            'name': 'Temperatur Modul 4 Sensor 5',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '046_2_0',
            'name': 'Temperatur Modul 4 Sensor 6',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '048_2_0',
            'name': 'Temperatur Modul 5 Sensor 1',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '050_2_0',
            'name': 'Temperatur Modul 5 Sensor 2',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '052_2_0',
            'name': 'Temperatur Modul 5 Sensor 3',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '054_2_0',
            'name': 'Temperatur Modul 5 Sensor 4',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '056_2_0',
            'name': 'Temperatur Modul 5 Sensor 5',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '058_2_0',
            'name': 'Temperatur Modul 5 Sensor 6',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }]
    }, {
        'id': '01_0010_7E21_0100',
        'description': 'VBus 1: DeltaSol MX [Heizkreis #1]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32289,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [Heizkreis #1]',
        'fields': [{
            'id': '000_2_0',
            'name': 'Flow set temperature',
            'unit': ' \u00B0C',
            'unit_code': 'DegreesCelsius'
        }, {
            'id': '002_1_0',
            'name': 'Operating status',
            'unit': '',
            'unit_code': 'None'
        }]
    }, {
        'id': '01_0010_7E31_0100',
        'description': 'VBus 1: DeltaSol MX [WMZ #1]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32305,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [WMZ #1]',
        'fields': [{
            'id': '000_4_0',
            'name': 'Heat quantity',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '008_4_0',
            'name': 'Heat quantity today',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '012_4_0',
            'name': 'Heat quantity week',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }]
    }, {
        'id': '01_0010_7E32_0100',
        'description': 'VBus 1: DeltaSol MX [WMZ #2]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32306,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [WMZ #2]',
        'fields': [{
            'id': '000_4_0',
            'name': 'Heat quantity',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '008_4_0',
            'name': 'Heat quantity today',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '012_4_0',
            'name': 'Heat quantity week',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }]
    }, {
        'id': '01_0010_7E33_0100',
        'description': 'VBus 1: DeltaSol MX [WMZ #3]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32307,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [WMZ #3]',
        'fields': [{
            'id': '000_4_0',
            'name': 'Heat quantity',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '008_4_0',
            'name': 'Heat quantity today',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '012_4_0',
            'name': 'Heat quantity week',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }]
    }, {
        'id': '01_0010_7E34_0100',
        'description': 'VBus 1: DeltaSol MX [WMZ #4]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32308,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [WMZ #4]',
        'fields': [{
            'id': '000_4_0',
            'name': 'Heat quantity',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '008_4_0',
            'name': 'Heat quantity today',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '012_4_0',
            'name': 'Heat quantity week',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }]
    }, {
        'id': '01_0010_7E35_0100',
        'description': 'VBus 1: DeltaSol MX [WMZ #5]',
        'channel': 1,
        'destination_address': 16,
        'source_address': 32309,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DFA',
        'source_name': 'DeltaSol MX [WMZ #5]',
        'fields': [{
            'id': '000_4_0',
            'name': 'Heat quantity',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '008_4_0',
            'name': 'Heat quantity today',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }, {
            'id': '012_4_0',
            'name': 'Heat quantity week',
            'unit': ' Wh',
            'unit_code': 'WattHours'
        }]
    }, {
        'id': '01_0015_7E11_0100',
        'description': 'VBus 1: DeltaSol MX [Regler] => Standard-Infos',
        'channel': 1,
        'destination_address': 21,
        'source_address': 32273,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'Standard-Infos',
        'source_name': 'DeltaSol MX [Regler]',
        'fields': []
    }, {
        'id': '01_6651_7E11_0200',
        'description': 'VBus 1: DeltaSol MX [Regler] => EM #1',
        'channel': 1,
        'destination_address': 26193,
        'source_address': 32273,
        'protocol_version': 16,
        'command': 512,
        'info': 0,
        'destination_name': 'EM #1',
        'source_name': 'DeltaSol MX [Regler]',
        'fields': [{
            'id': '000_1_0',
            'name': 'Pump speed relay 1.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '001_3_0',
            'name': 'Timer 1.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '004_1_0',
            'name': 'Pump speed relay 1.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '005_3_0',
            'name': 'Timer 1.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '008_1_0',
            'name': 'Pump speed relay 2.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '009_3_0',
            'name': 'Timer 2.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '012_1_0',
            'name': 'Pump speed relay 2.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '013_3_0',
            'name': 'Timer 2.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '016_1_0',
            'name': 'Pump speed relay 3.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '017_3_0',
            'name': 'Timer 3.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '020_1_0',
            'name': 'Pump speed relay 3.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '021_3_0',
            'name': 'Timer 3.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '024_1_0',
            'name': 'Pump speed relay 4.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '025_3_0',
            'name': 'Timer 4.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '028_1_0',
            'name': 'Pump speed relay 4.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '029_3_0',
            'name': 'Timer 4.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '032_1_0',
            'name': 'Pump speed relay 5.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '033_3_0',
            'name': 'Timer 5.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '036_1_0',
            'name': 'Pump speed relay 5.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '037_3_0',
            'name': 'Timer 5.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '040_1_0',
            'name': 'SensorOutputType1',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '041_1_0',
            'name': 'SensorOutputType2',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '042_1_0',
            'name': 'SensorOutputType3',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '043_1_0',
            'name': 'SensorOutputType4',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '044_1_0',
            'name': 'SensorOutputType5',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '045_1_0',
            'name': 'SensorOutputType6',
            'unit': '',
            'unit_code': 'None'
        }]
    }, {
        'id': '01_6652_7E11_0200',
        'description': 'VBus 1: DeltaSol MX [Regler] => EM #2',
        'channel': 1,
        'destination_address': 26194,
        'source_address': 32273,
        'protocol_version': 16,
        'command': 512,
        'info': 0,
        'destination_name': 'EM #2',
        'source_name': 'DeltaSol MX [Regler]',
        'fields': [{
            'id': '000_1_0',
            'name': 'Pump speed relay 1.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '001_3_0',
            'name': 'Timer 1.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '004_1_0',
            'name': 'Pump speed relay 1.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '005_3_0',
            'name': 'Timer 1.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '008_1_0',
            'name': 'Pump speed relay 2.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '009_3_0',
            'name': 'Timer 2.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '012_1_0',
            'name': 'Pump speed relay 2.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '013_3_0',
            'name': 'Timer 2.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '016_1_0',
            'name': 'Pump speed relay 3.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '017_3_0',
            'name': 'Timer 3.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '020_1_0',
            'name': 'Pump speed relay 3.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '021_3_0',
            'name': 'Timer 3.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '024_1_0',
            'name': 'Pump speed relay 4.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '025_3_0',
            'name': 'Timer 4.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '028_1_0',
            'name': 'Pump speed relay 4.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '029_3_0',
            'name': 'Timer 4.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '032_1_0',
            'name': 'Pump speed relay 5.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '033_3_0',
            'name': 'Timer 5.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '036_1_0',
            'name': 'Pump speed relay 5.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '037_3_0',
            'name': 'Timer 5.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '040_1_0',
            'name': 'SensorOutputType1',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '041_1_0',
            'name': 'SensorOutputType2',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '042_1_0',
            'name': 'SensorOutputType3',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '043_1_0',
            'name': 'SensorOutputType4',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '044_1_0',
            'name': 'SensorOutputType5',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '045_1_0',
            'name': 'SensorOutputType6',
            'unit': '',
            'unit_code': 'None'
        }]
    }, {
        'id': '01_6653_7E11_0200',
        'description': 'VBus 1: DeltaSol MX [Regler] => EM #3',
        'channel': 1,
        'destination_address': 26195,
        'source_address': 32273,
        'protocol_version': 16,
        'command': 512,
        'info': 0,
        'destination_name': 'EM #3',
        'source_name': 'DeltaSol MX [Regler]',
        'fields': [{
            'id': '000_1_0',
            'name': 'Pump speed relay 1.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '001_3_0',
            'name': 'Timer 1.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '004_1_0',
            'name': 'Pump speed relay 1.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '005_3_0',
            'name': 'Timer 1.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '008_1_0',
            'name': 'Pump speed relay 2.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '009_3_0',
            'name': 'Timer 2.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '012_1_0',
            'name': 'Pump speed relay 2.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '013_3_0',
            'name': 'Timer 2.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '016_1_0',
            'name': 'Pump speed relay 3.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '017_3_0',
            'name': 'Timer 3.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '020_1_0',
            'name': 'Pump speed relay 3.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '021_3_0',
            'name': 'Timer 3.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '024_1_0',
            'name': 'Pump speed relay 4.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '025_3_0',
            'name': 'Timer 4.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '028_1_0',
            'name': 'Pump speed relay 4.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '029_3_0',
            'name': 'Timer 4.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '032_1_0',
            'name': 'Pump speed relay 5.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '033_3_0',
            'name': 'Timer 5.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '036_1_0',
            'name': 'Pump speed relay 5.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '037_3_0',
            'name': 'Timer 5.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '040_1_0',
            'name': 'SensorOutputType1',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '041_1_0',
            'name': 'SensorOutputType2',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '042_1_0',
            'name': 'SensorOutputType3',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '043_1_0',
            'name': 'SensorOutputType4',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '044_1_0',
            'name': 'SensorOutputType5',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '045_1_0',
            'name': 'SensorOutputType6',
            'unit': '',
            'unit_code': 'None'
        }]
    }, {
        'id': '01_6654_7E11_0200',
        'description': 'VBus 1: DeltaSol MX [Regler] => EM #4',
        'channel': 1,
        'destination_address': 26196,
        'source_address': 32273,
        'protocol_version': 16,
        'command': 512,
        'info': 0,
        'destination_name': 'EM #4',
        'source_name': 'DeltaSol MX [Regler]',
        'fields': [{
            'id': '000_1_0',
            'name': 'Pump speed relay 1.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '001_3_0',
            'name': 'Timer 1.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '004_1_0',
            'name': 'Pump speed relay 1.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '005_3_0',
            'name': 'Timer 1.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '008_1_0',
            'name': 'Pump speed relay 2.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '009_3_0',
            'name': 'Timer 2.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '012_1_0',
            'name': 'Pump speed relay 2.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '013_3_0',
            'name': 'Timer 2.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '016_1_0',
            'name': 'Pump speed relay 3.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '017_3_0',
            'name': 'Timer 3.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '020_1_0',
            'name': 'Pump speed relay 3.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '021_3_0',
            'name': 'Timer 3.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '024_1_0',
            'name': 'Pump speed relay 4.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '025_3_0',
            'name': 'Timer 4.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '028_1_0',
            'name': 'Pump speed relay 4.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '029_3_0',
            'name': 'Timer 4.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '032_1_0',
            'name': 'Pump speed relay 5.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '033_3_0',
            'name': 'Timer 5.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '036_1_0',
            'name': 'Pump speed relay 5.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '037_3_0',
            'name': 'Timer 5.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '040_1_0',
            'name': 'SensorOutputType1',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '041_1_0',
            'name': 'SensorOutputType2',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '042_1_0',
            'name': 'SensorOutputType3',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '043_1_0',
            'name': 'SensorOutputType4',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '044_1_0',
            'name': 'SensorOutputType5',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '045_1_0',
            'name': 'SensorOutputType6',
            'unit': '',
            'unit_code': 'None'
        }]
    }, {
        'id': '01_6655_7E11_0200',
        'description': 'VBus 1: DeltaSol MX [Regler] => EM #5',
        'channel': 1,
        'destination_address': 26197,
        'source_address': 32273,
        'protocol_version': 16,
        'command': 512,
        'info': 0,
        'destination_name': 'EM #5',
        'source_name': 'DeltaSol MX [Regler]',
        'fields': [{
            'id': '000_1_0',
            'name': 'Pump speed relay 1.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '001_3_0',
            'name': 'Timer 1.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '004_1_0',
            'name': 'Pump speed relay 1.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '005_3_0',
            'name': 'Timer 1.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '008_1_0',
            'name': 'Pump speed relay 2.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '009_3_0',
            'name': 'Timer 2.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '012_1_0',
            'name': 'Pump speed relay 2.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '013_3_0',
            'name': 'Timer 2.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '016_1_0',
            'name': 'Pump speed relay 3.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '017_3_0',
            'name': 'Timer 3.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '020_1_0',
            'name': 'Pump speed relay 3.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '021_3_0',
            'name': 'Timer 3.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '024_1_0',
            'name': 'Pump speed relay 4.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '025_3_0',
            'name': 'Timer 4.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '028_1_0',
            'name': 'Pump speed relay 4.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '029_3_0',
            'name': 'Timer 4.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '032_1_0',
            'name': 'Pump speed relay 5.1',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '033_3_0',
            'name': 'Timer 5.1',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '036_1_0',
            'name': 'Pump speed relay 5.2',
            'unit': '%',
            'unit_code': 'Percent'
        }, {
            'id': '037_3_0',
            'name': 'Timer 5.2',
            'unit': ' s',
            'unit_code': 'Seconds'
        }, {
            'id': '040_1_0',
            'name': 'SensorOutputType1',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '041_1_0',
            'name': 'SensorOutputType2',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '042_1_0',
            'name': 'SensorOutputType3',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '043_1_0',
            'name': 'SensorOutputType4',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '044_1_0',
            'name': 'SensorOutputType5',
            'unit': '',
            'unit_code': 'None'
        }, {
            'id': '045_1_0',
            'name': 'SensorOutputType6',
            'unit': '',
            'unit_code': 'None'
        }]
    }, {
        'id': '01_7E11_6651_0100',
        'description': 'VBus 1: EM #1 => DeltaSol MX [Regler]',
        'channel': 1,
        'destination_address': 32273,
        'source_address': 26193,
        'protocol_version': 16,
        'command': 256,
        'info': 0,
        'destination_name': 'DeltaSol MX [Regler]',
        'source_name': 'EM #1',
        'fields': [{
            'id': '000_4_0',
            'name': 'Resistor 1',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '004_4_0',
            'name': 'Resistor 2',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '008_4_0',
            'name': 'Resistor 3',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '012_4_0',
            'name': 'Resistor 4',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '016_4_0',
            'name': 'Resistor 5',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }, {
            'id': '020_4_0',
            'name': 'Resistor 6',
            'unit': ' Ohm',
            'unit_code': 'Ohms'
        }]
    }],
    'headerset_stats': {
        'headerset_count': 1,
        'min_timestamp': 1388324664.805000,
        'max_timestamp': 1388324664.805000
    },
    'headersets': [{
        'timestamp': 1388324664.805000,
        'packets': [{
            'header_index': 0,
            'timestamp': 1388324664.771000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 1044.080000,
                'value': '1044.080'
            }, {
                'field_index': 1,
                'raw_value': 1060.141000,
                'value': '1060.141'
            }, {
                'field_index': 2,
                'raw_value': 1068.021000,
                'value': '1068.021'
            }, {
                'field_index': 3,
                'raw_value': 6.940000,
                'value': '6.940'
            }, {
                'field_index': 4,
                'raw_value': 11.300000,
                'value': '11.3'
            }, {
                'field_index': 5,
                'raw_value': 15.400000,
                'value': '15.4'
            }, {
                'field_index': 6,
                'raw_value': 17.400000,
                'value': '17.4'
            }, {
                'field_index': 7,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 8,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 9,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 10,
                'raw_value': 220.000000,
                'value': '220'
            }]
        }, {
            'header_index': 1,
            'timestamp': 1388324662.570000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 28.900000,
                'value': '28.9'
            }, {
                'field_index': 1,
                'raw_value': 17.000000,
                'value': '17.0'
            }, {
                'field_index': 2,
                'raw_value': 20.600000,
                'value': '20.6'
            }, {
                'field_index': 3,
                'raw_value': 43.800000,
                'value': '43.8'
            }, {
                'field_index': 4,
                'raw_value': 38.800000,
                'value': '38.8'
            }, {
                'field_index': 5,
                'raw_value': 52.700000,
                'value': '52.7'
            }, {
                'field_index': 6,
                'raw_value': 16.300000,
                'value': '16.3'
            }, {
                'field_index': 7,
                'raw_value': 18.700000,
                'value': '18.7'
            }, {
                'field_index': 8,
                'raw_value': 6.300000,
                'value': '6.3'
            }, {
                'field_index': 9,
                'raw_value': 23.500000,
                'value': '23.5'
            }, {
                'field_index': 10,
                'raw_value': -15.000000,
                'value': '-15.0'
            }, {
                'field_index': 11,
                'raw_value': 22.300000,
                'value': '22.3'
            }, {
                'field_index': 12,
                'raw_value': 54.300000,
                'value': '54.3'
            }, {
                'field_index': 13,
                'raw_value': -888.800000,
                'value': '-888.8'
            }, {
                'field_index': 14,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 15,
                'raw_value': 1350.000000,
                'value': '1350'
            }, {
                'field_index': 16,
                'raw_value': 32.500000,
                'value': '32.5'
            }, {
                'field_index': 17,
                'raw_value': 25.000000,
                'value': '25.0'
            }, {
                'field_index': 18,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 19,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 20,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 21,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 22,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 23,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 24,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 25,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 26,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 27,
                'raw_value': 99.990000,
                'value': '99.99'
            }, {
                'field_index': 28,
                'raw_value': 2.520000,
                'value': '2.52'
            }, {
                'field_index': 29,
                'raw_value': 99.990000,
                'value': '99.99'
            }, {
                'field_index': 30,
                'raw_value': 99.990000,
                'value': '99.99'
            }, {
                'field_index': 31,
                'raw_value': 30.000000,
                'value': '30'
            }, {
                'field_index': 32,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 33,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 34,
                'raw_value': 100.000000,
                'value': '100'
            }, {
                'field_index': 35,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 36,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 37,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 38,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 39,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 40,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 41,
                'raw_value': 100.000000,
                'value': '100'
            }, {
                'field_index': 42,
                'raw_value': 100.000000,
                'value': '100'
            }, {
                'field_index': 43,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 44,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 45,
                'raw_value': 410021413.000000,
                'value': '12/29/2013 14:50:13'
            }, {
                'field_index': 46,
                'raw_value': 0.000000,
                'value': '0'
            }]
        }, {
            'header_index': 2,
            'timestamp': 1388324664.339000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 26.200000,
                'value': '26.2'
            }, {
                'field_index': 1,
                'raw_value': 30.100000,
                'value': '30.1'
            }, {
                'field_index': 2,
                'raw_value': 25.600000,
                'value': '25.6'
            }, {
                'field_index': 3,
                'raw_value': 29.700000,
                'value': '29.7'
            }, {
                'field_index': 4,
                'raw_value': 25.700000,
                'value': '25.7'
            }, {
                'field_index': 5,
                'raw_value': 888.800000,
                'value': '888.8'
            }, {
                'field_index': 6,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 7,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 8,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 9,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 10,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 11,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 12,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 13,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 14,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 15,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 16,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 17,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 18,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 19,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 20,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 21,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 22,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 23,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 24,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 25,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 26,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 27,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 28,
                'raw_value': 999.900000,
                'value': '999.9'
            }, {
                'field_index': 29,
                'raw_value': 999.900000,
                'value': '999.9'
            }]
        }, {
            'header_index': 3,
            'timestamp': 1388324662.675000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 0.000000,
                'value': '0.0'
            }, {
                'field_index': 1,
                'raw_value': 11.000000,
                'value': '11'
            }]
        }, {
            'header_index': 4,
            'timestamp': 1388324662.861000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 4882389.000000,
                'value': '4882389'
            }, {
                'field_index': 1,
                'raw_value': 1673.000000,
                'value': '1673'
            }, {
                'field_index': 2,
                'raw_value': 5603.000000,
                'value': '5603'
            }]
        }, {
            'header_index': 5,
            'timestamp': 1388324662.861000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 7152425.000000,
                'value': '7152425'
            }, {
                'field_index': 1,
                'raw_value': 2924.000000,
                'value': '2924'
            }, {
                'field_index': 2,
                'raw_value': 10433.000000,
                'value': '10433'
            }]
        }, {
            'header_index': 6,
            'timestamp': 1388324663.019000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 13191441.000000,
                'value': '13191441'
            }, {
                'field_index': 1,
                'raw_value': 21.000000,
                'value': '21'
            }, {
                'field_index': 2,
                'raw_value': 153015.000000,
                'value': '153015'
            }]
        }, {
            'header_index': 7,
            'timestamp': 1388324663.139000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 281337.000000,
                'value': '281337'
            }, {
                'field_index': 1,
                'raw_value': 16.000000,
                'value': '16'
            }, {
                'field_index': 2,
                'raw_value': 15561.000000,
                'value': '15561'
            }]
        }, {
            'header_index': 8,
            'timestamp': 1388324663.139000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 12553358.000000,
                'value': '12553358'
            }, {
                'field_index': 1,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 2,
                'raw_value': 137591.000000,
                'value': '137591'
            }]
        }, {
            'header_index': 9,
            'timestamp': 1388324662.570000,
            'field_values': []
        }, {
            'header_index': 10,
            'timestamp': 1388324663.641000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 1,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 2,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 3,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 4,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 5,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 6,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 7,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 8,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 9,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 10,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 11,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 12,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 13,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 14,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 15,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 16,
                'raw_value': 100.000000,
                'value': '100'
            }, {
                'field_index': 17,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 18,
                'raw_value': 100.000000,
                'value': '100'
            }, {
                'field_index': 19,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 20,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 21,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 22,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 23,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 24,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 25,
                'raw_value': 0.000000,
                'value': '0'
            }]
        }, {
            'header_index': 11,
            'timestamp': 1388324659.929000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 1,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 2,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 3,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 4,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 5,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 6,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 7,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 8,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 9,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 10,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 11,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 12,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 13,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 14,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 15,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 16,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 17,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 18,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 19,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 20,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 21,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 22,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 23,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 24,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 25,
                'raw_value': 0.000000,
                'value': '0'
            }]
        }, {
            'header_index': 12,
            'timestamp': 1388324639.966000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 1,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 2,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 3,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 4,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 5,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 6,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 7,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 8,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 9,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 10,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 11,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 12,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 13,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 14,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 15,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 16,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 17,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 18,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 19,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 20,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 21,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 22,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 23,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 24,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 25,
                'raw_value': 0.000000,
                'value': '0'
            }]
        }, {
            'header_index': 13,
            'timestamp': 1388324619.876000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 1,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 2,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 3,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 4,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 5,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 6,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 7,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 8,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 9,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 10,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 11,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 12,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 13,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 14,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 15,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 16,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 17,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 18,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 19,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 20,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 21,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 22,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 23,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 24,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 25,
                'raw_value': 0.000000,
                'value': '0'
            }]
        }, {
            'header_index': 14,
            'timestamp': 1388324647.879000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 1,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 2,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 3,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 4,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 5,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 6,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 7,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 8,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 9,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 10,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 11,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 12,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 13,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 14,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 15,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 16,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 17,
                'raw_value': 1.000000,
                'value': '1'
            }, {
                'field_index': 18,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 19,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 20,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 21,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 22,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 23,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 24,
                'raw_value': 0.000000,
                'value': '0'
            }, {
                'field_index': 25,
                'raw_value': 0.000000,
                'value': '0'
            }]
        }, {
            'header_index': 15,
            'timestamp': 1388324659.775000,
            'field_values': [{
                'field_index': 0,
                'raw_value': 1102.148000,
                'value': '1102.148'
            }, {
                'field_index': 1,
                'raw_value': 1117.199000,
                'value': '1117.199'
            }, {
                'field_index': 2,
                'raw_value': 1099.654000,
                'value': '1099.654'
            }, {
                'field_index': 3,
                'raw_value': 1115.569000,
                'value': '1115.569'
            }, {
                'field_index': 4,
                'raw_value': 1100.094000,
                'value': '1100.094'
            }, {
                'field_index': 5,
                'raw_value': 9999.900000,
                'value': '9999.900'
            }]
        }]
    }]
};