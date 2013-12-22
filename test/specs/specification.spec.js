/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Packet = require('./resol-vbus').Packet;
var Specification = require('./resol-vbus').Specification;



describe('Specification', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Specification).to.be.a('function');

            var spec = new Specification();

            expect(spec).to.be.an.instanceOf(Specification);
        });

        it('should have resonable defaults', function() {
            var spec = new Specification();

            expect(spec.language).to.equal('en');
        });

        it('should copy selected options', function() {
            var options = {
                language: 'de',
                junk: 'JUNK'
            };

            var spec = new Specification(options);

            expect(spec.language).to.equal(options.language);
            expect(spec.junk).to.equal(undefined);
        });

        // the specificationData option if checked later

    });

    describe('.loadSpecificationData', function() {

        var rawSpecificationData1 = {
            'filteredPacketFieldSpecs': [{
                'filteredPacketFieldId': 'DemoValue1',
                'packetId': '00_0010_7722_10_0100',
                'fieldId': '000_2_0',
                'name': {
                    'ref': 'Flow temperatureL',
                    'en': 'Flow temperature',
                    'de': 'T-VL',
                    'fr': 'Température Départ'
                },
                'type': 'Number_0_1_DegreesCelsius',
                'getRawValue': '_0010_7722_0100_000_2_0'
            }]
        };

        var checkSpecificationData1 = function(specData) {
            expect(specData).to.be.an('object');

            var fpfs = specData.filteredPacketFieldSpecs;

            expect(fpfs).to.be.an('array');
            expect(fpfs.length).to.equal(1);
            expect(fpfs [0].filteredPacketFieldId).to.equal('DemoValue1');
            expect(fpfs [0].packetId).to.equal('00_0010_7722_10_0100');
            expect(fpfs [0].fieldId).to.equal('000_2_0');
            expect(fpfs [0].name.de).to.equal('T-VL');
            expect(fpfs [0].type).to.be.an('object');
            expect(fpfs [0].getRawValue).to.be.a('function');
            expect(fpfs [0].packetSpec).to.be.an('object');
            expect(fpfs [0].packetFieldSpec).to.be.an('object');
        };

        it('should be a function', function() {
            expect(Specification.loadSpecificationData).to.be.a('function');
        });

        it('should work correctly without arguments', function() {
            var spec = new Specification();

            var specData = Specification.loadSpecificationData();

            expect(specData).to.be.an('object');
            expect(specData.units).to.be.an('object', 'units');
            expect(specData.types).to.be.an('object', 'types');
            expect(specData.deviceSpecs).to.be.an('object', 'deviceSpecs');
            expect(specData.packetSpecs).to.be.an('object', 'packetSpecs');
            expect(specData.getDeviceSpecification).to.be.a('function');
            expect(specData.getPacketSpecification).to.be.a('function');
            expect(specData.filteredPacketFieldSpecs).to.equal(undefined);
        });

        it('should work correctly with raw spec data', function() {
            var rawSpecData = rawSpecificationData1;

            var specData = Specification.loadSpecificationData(rawSpecData);

            checkSpecificationData1(specData);
        });

        it('should work correctly as part of the constructor', function() {
            var rawSpecData = rawSpecificationData1;

            var spec = new Specification({
                specificationData: rawSpecData
            });

            checkSpecificationData1(spec.specificationData);
        });
    });

    describe('.storeSpecificationData', function() {

        var rawSpecificationData1 = {
            'filteredPacketFieldSpecs': [{
                'filteredPacketFieldId': 'DemoValue1',
                'packetId': '00_0010_7722_10_0100',
                'fieldId': '000_2_0',
                'name': {
                    'ref': 'Flow temperatureL',
                    'en': 'Flow temperature',
                    'de': 'T-VL',
                    'fr': 'Température Départ'
                },
                'type': 'Number_0_1_DegreesCelsius',
                'getRawValue': '_0010_7722_0100_000_2_0'
            }]
        };

        it('should be a function', function() {
            expect(Specification.storeSpecificationData).to.be.a('function');
        });

        it('should work correctly without arguments', function() {
            var spec = new Specification();

            var rawSpecData = Specification.storeSpecificationData();

            expect(rawSpecData).to.be.an('object');
            expect(rawSpecData.units).to.equal(undefined);
            expect(rawSpecData.types).to.equal(undefined);
            expect(rawSpecData.deviceSpecs).to.equal(undefined);
            expect(rawSpecData.packetSpecs).to.equal(undefined);
            expect(rawSpecData.getDeviceSpecification).to.equal(undefined);
            expect(rawSpecData.getPacketSpecification).to.equal(undefined);
            expect(rawSpecData.filteredPacketFieldSpecs).to.equal(undefined);
        });

        it('should work correctly with an unfiltered spec', function() {
            var spec = new Specification();

            var rawSpecData = Specification.storeSpecificationData(spec);

            expect(rawSpecData).to.be.an('object');
            expect(rawSpecData.units).to.equal(undefined);
            expect(rawSpecData.types).to.equal(undefined);
            expect(rawSpecData.deviceSpecs).to.equal(undefined);
            expect(rawSpecData.packetSpecs).to.equal(undefined);
            expect(rawSpecData.getDeviceSpecification).to.equal(undefined);
            expect(rawSpecData.getPacketSpecification).to.equal(undefined);
            expect(rawSpecData.filteredPacketFieldSpecs).to.equal(undefined);
        });

        it('should work correctly with a filtered spec', function() {
            var rawSpecDataInput = rawSpecificationData1;

            var spec = new Specification({
                specificationData: rawSpecDataInput
            });

            var rawSpecData = Specification.storeSpecificationData(spec);

            expect(rawSpecData).to.eql(rawSpecDataInput);
        });

    });

    describe('#getDeviceSpecification', function() {

        it('should be a method', function() {
            expect(Specification.prototype.getDeviceSpecification).to.be.a('function');
        });

        it('should work correctly with a number pair', function() {
            var spec = new Specification();

            var deviceSpec = spec.getDeviceSpecification(0x7721, 0x0010);

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.name).to.equal('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).to.equal('DeltaSol E [Regler]');
        });

        it('should work correctly with a number triple', function() {
            var spec = new Specification();

            var deviceSpec = spec.getDeviceSpecification(0x7721, 0x0010, 1);

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.name).to.equal('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).to.equal('VBus #1: DeltaSol E [Regler]');
        });

        it('should work correctly with a header and "source"', function() {
            var header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
            });

            var spec = new Specification();

            var deviceSpec = spec.getDeviceSpecification(header, 'source');

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.name).to.equal('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).to.equal('VBus #1: DeltaSol E [Regler]');
        });

        it('should work correctly with a header and "destination"', function() {
            var header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
            });

            var spec = new Specification();

            var deviceSpec = spec.getDeviceSpecification(header, 'destination');

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.name).to.equal('DFA');
            expect(deviceSpec.fullName).to.equal('VBus #1: DFA');
        });

        it('should work correctly for an unknown device', function() {
            var spec = new Specification();

            var deviceSpec = spec.getDeviceSpecification(0x772F, 0x0010, 1);

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.name).to.equal('Unknown Device (0x772F)');
            expect(deviceSpec.fullName).to.equal('VBus #1: Unknown Device (0x772F)');
        });

    });

    describe('#getPacketSpecification', function() {

        it('should be a method', function() {
            expect(Specification.prototype.getPacketSpecification).to.be.a('function');
        });

        it('should work correctly with a number quadruple', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly with a header', function() {
            var header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
                command: 0x0100,
            });

            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification(header);

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly with a packet ID string', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification('01_0010_7721_10_0100');

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly for an unknown packet', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification(1, 0x0010, 0x772F, 0x0100);

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.equal(0);
        });

    });

    describe('#getPacketFieldSpecification', function() {

        it('should be a method', function() {
            expect(Specification.prototype.getPacketFieldSpecification).to.be.a('function');
        });

        it('should work correctly with a packet spec and a field ID', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            var packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.an('object');
            expect(packetFieldSpec.name.ref).to.be.a('string');
            expect(packetFieldSpec.type).to.be.an('object');
            expect(packetFieldSpec.type.typeId).to.be.a('string');
            expect(packetFieldSpec.type.rootTypeId).to.be.a('string');
            expect(packetFieldSpec.type.precision).to.be.a('number');
            expect(packetFieldSpec.type.unit).to.be.an('object');
            expect(packetFieldSpec.type.unit.unitCode).to.be.a('string');
            expect(packetFieldSpec.type.unit.unitText).to.be.a('string');
        });

        it('should work correctly with a packet field ID string', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.an('object');
            expect(packetFieldSpec.name.ref).to.be.a('string');
            expect(packetFieldSpec.type).to.be.an('object');
            expect(packetFieldSpec.type.typeId).to.be.a('string');
            expect(packetFieldSpec.type.rootTypeId).to.be.a('string');
            expect(packetFieldSpec.type.precision).to.be.a('number');
            expect(packetFieldSpec.type.unit).to.be.an('object');
            expect(packetFieldSpec.type.unit.unitCode).to.be.a('string');
            expect(packetFieldSpec.type.unit.unitText).to.be.a('string');
        });

        it('should work correctly for a missing packet spec', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification(null, '000_2_0');

            expect(packetFieldSpec).to.equal(undefined);
        });
        
        it('should work correctly for a missing field ID', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            var packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, null);

            expect(packetFieldSpec).to.equal(undefined);
        });
        
        it('should work correctly for an unknown field ID', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            var packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_0_0');

            expect(packetFieldSpec).to.equal(undefined);
        });

    });

    describe('#getRawValue', function() {

        it('should be a method', function() {
            expect(Specification.prototype.getRawValue).to.be.a('function');
        });

        it('should work correctly with all arguments', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var buffer = new Buffer('b822', 'hex');

            var rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(888.8, 0.05);
        });

        it('should work correctly without start and end arguments', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var buffer = new Buffer('b822', 'hex');

            var rawValue = spec.getRawValue(packetFieldSpec, buffer);

            expect(rawValue).to.be.closeTo(888.8, 0.05);
        });

        it('should work correctly with a too small buffer', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var buffer = new Buffer('', 'hex');

            var rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly with a partial buffer', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var buffer = new Buffer('b8', 'hex');

            var rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(18.4, 0.05);
        });

        it('should work correctly for an unknown packet field spec', function() {
            var spec = new Specification();

            var buffer = new Buffer('b822', 'hex');

            var rawValue = spec.getRawValue(null, buffer, 0, buffer.length);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly without a buffer', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var rawValue = spec.getRawValue(packetFieldSpec);

            expect(rawValue).to.equal(null);
        });

    });

    describe('#formatTextValueFromRawValue', function() {

        it('should be a methods', function() {
            expect(Specification.prototype.formatTextValueFromRawValue).to.be.a('function');
        });

        it('should work correctly with all arguments', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8, 'DegreesCelsius');

            expect(textValue).to.equal('888.8 °C');
        });

        it('should work correctly without unit', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8);

            expect(textValue).to.equal('888.8 °C');
        });

        it('should work correctly with "None" unit', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8, 'None');

            expect(textValue).to.equal('888.8');
        });

        it('should work correctly without raw value', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            var textValue = spec.formatTextValueFromRawValue(packetFieldSpec, null, 'None');

            expect(textValue).to.equal('');
        });

        it('should work correctly without packet field spec', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValue(null, 888.8, 'DegreesCelsius');

            expect(textValue).to.equal('888.8 °C');
        });

    });

    describe('#getPacketFieldsForHeaders', function() {

        var header1 = new Packet({
            channel: 1,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
            frameCount: 1,
            frameData: new Buffer('b8220000', 'hex'),
        });

        var header2 = new Packet({
            channel: 2,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
            frameCount: 1,
            frameData: new Buffer('000048dd', 'hex'),
        });

        var rawSpecificationData1 = {
            'filteredPacketFieldSpecs': [{
                'filteredPacketFieldId': 'DemoValue1',
                'packetId': '01_0010_7722_10_0100',
                'fieldId': '000_2_0',
                'name': 'T-flow',
                'type': 'Number_0_1_DegreesCelsius',
                'getRawValue': '_0010_7722_0100_000_2_0'
            }, {
                'filteredPacketFieldId': 'DemoValue2',
                'packetId': '02_0010_7722_10_0100',
                'fieldId': '002_2_0',
                'name': 'T-return',
                'type': 'Number_0_1_DegreesCelsius',
                'getRawValue': '_0010_7722_0100_002_2_0'
            }]
        };

        it('should be a method', function() {
            expect(Specification.prototype.getPacketFieldsForHeaders).to.be.a('function');
        });

        it('should work correctly with an unfiltered spec', function() {
            var spec = new Specification();

            var pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expect(pfs).to.be.an('array');
            expect(pfs.length).to.equal(8);
            expect(pfs [0]).to.be.an('object');
            expect(pfs [0].id).to.equal('01_0010_7722_10_0100_000_2_0');
            expect(pfs [0].packet).to.be.an('object');
            expect(pfs [0].packetSpec).to.be.an('object');
            expect(pfs [0].packetFieldSpec).to.be.an('object');
            expect(pfs [0].origPacketFieldSpec).to.be.an('object');
            expect(pfs [0].name).to.equal('Flow temperature');
            expect(pfs [0].rawValue).to.be.closeTo(888.8, 0.05);
            expect(pfs [0].formatTextValue).to.be.a('function');
            expect(pfs [0].formatTextValue()).to.equal('888.8 °C');
            expect(pfs [5]).to.be.an('object');
            expect(pfs [5].id).to.equal('02_0010_7722_10_0100_002_2_0');
            expect(pfs [5].packet).to.be.an('object');
            expect(pfs [5].packetSpec).to.be.an('object');
            expect(pfs [5].packetFieldSpec).to.be.an('object');
            expect(pfs [5].origPacketFieldSpec).to.be.an('object');
            expect(pfs [5].name).to.equal('Return temperature');
            expect(pfs [5].rawValue).to.be.closeTo(-888.8, 0.05);
            expect(pfs [5].formatTextValue).to.be.a('function');
            expect(pfs [5].formatTextValue()).to.equal('-888.8 °C');
        });

        it('should work correctly with a filtered spec', function() {
            var spec = new Specification({
                specificationData: rawSpecificationData1
            });

            var pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expect(pfs).to.be.an('array');
            expect(pfs.length).to.equal(2);
            expect(pfs [0]).to.be.an('object');
            expect(pfs [0].id).to.equal('DemoValue1');
            expect(pfs [0].packet).to.be.an('object');
            expect(pfs [0].packetSpec).to.be.an('object');
            expect(pfs [0].packetFieldSpec).to.be.an('object');
            expect(pfs [0].origPacketFieldSpec).to.be.an('object');
            expect(pfs [0].name).to.equal('T-flow');
            expect(pfs [0].rawValue).to.be.closeTo(888.8, 0.05);
            expect(pfs [0].formatTextValue).to.be.a('function');
            expect(pfs [0].formatTextValue()).to.equal('888.8 °C');
            expect(pfs [1]).to.be.an('object');
            expect(pfs [1].id).to.equal('DemoValue2');
            expect(pfs [1].packet).to.be.an('object');
            expect(pfs [1].packetSpec).to.be.an('object');
            expect(pfs [1].packetFieldSpec).to.be.an('object');
            expect(pfs [1].origPacketFieldSpec).to.be.an('object');
            expect(pfs [1].name).to.equal('T-return');
            expect(pfs [1].rawValue).to.be.closeTo(-888.8, 0.05);
            expect(pfs [1].formatTextValue).to.be.a('function');
            expect(pfs [1].formatTextValue()).to.equal('-888.8 °C');
        });

        it('should work correctly with a filtered spec but empty headers', function() {
            var spec = new Specification({
                specificationData: rawSpecificationData1
            });

            var pfs = spec.getPacketFieldsForHeaders([]);

            expect(pfs).to.be.an('array');
            expect(pfs.length).to.equal(2);
            expect(pfs [0]).to.be.an('object');
            expect(pfs [0].id).to.equal('DemoValue1');
            expect(pfs [0].packet).to.equal(undefined);
            expect(pfs [0].packetSpec).to.be.an('object');
            expect(pfs [0].packetFieldSpec).to.be.an('object');
            expect(pfs [0].origPacketFieldSpec).to.be.an('object');
            expect(pfs [0].name).to.equal('T-flow');
            expect(pfs [0].rawValue).to.equal(undefined);
            expect(pfs [0].formatTextValue).to.be.a('function');
            expect(pfs [0].formatTextValue()).to.equal('');
            expect(pfs [1]).to.be.an('object');
            expect(pfs [1].id).to.equal('DemoValue2');
            expect(pfs [1].packet).to.equal(undefined);
            expect(pfs [1].packetSpec).to.be.an('object');
            expect(pfs [1].packetFieldSpec).to.be.an('object');
            expect(pfs [1].origPacketFieldSpec).to.be.an('object');
            expect(pfs [1].name).to.equal('T-return');
            expect(pfs [1].rawValue).to.equal(undefined);
            expect(pfs [1].formatTextValue).to.be.a('function');
            expect(pfs [1].formatTextValue()).to.equal('');
        });

    });

    describe('#getFilteredPacketFieldSpecificationsForHeaders', function() {

        var header1 = new Packet({
            channel: 1,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
        });

        var header2 = new Packet({
            channel: 2,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
        });

        it('should be a method', function() {
            expect(Specification.prototype.getFilteredPacketFieldSpecificationsForHeaders).to.be.a('function');
        });

        it('should work correctly', function() {
            var spec = new Specification();

            var fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([ header1, header2 ]);

            expect(fpfs).to.be.an('array');
            expect(fpfs.length).to.equal(8);
            expect(fpfs [0]).to.be.an('object');
            expect(fpfs [0].filteredPacketFieldId).to.equal('01_0010_7722_10_0100_000_2_0');
            expect(fpfs [0].packetId).to.equal('01_0010_7722_10_0100');
            expect(fpfs [0].fieldId).to.equal('000_2_0');
            expect(fpfs [0].name).to.equal('Flow temperature');
            expect(fpfs [0].type.typeId).to.equal('Number_0_1_DegreesCelsius');
            expect(fpfs [0].getRawValue).to.be.a('function');
            expect(fpfs [4]).to.be.an('object');
            expect(fpfs [4].filteredPacketFieldId).to.equal('02_0010_7722_10_0100_000_2_0');
            expect(fpfs [4].packetId).to.equal('02_0010_7722_10_0100');
            expect(fpfs [4].fieldId).to.equal('000_2_0');
            expect(fpfs [4].name).to.equal('Flow temperature');
            expect(fpfs [4].type.typeId).to.equal('Number_0_1_DegreesCelsius');
            expect(fpfs [4].getRawValue).to.be.a('function');
        });

        it('should work correctly with empty headers', function() {
            var spec = new Specification();

            var fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([]);

            expect(fpfs).to.be.an('array');
            expect(fpfs.length).to.equal(0);
        });

    });

/*

    it('should get unknown packet fields with filter', function() {
        var buffer = new Buffer('aa10002277100001034224012701003200006401001a350201000047', 'hex');

        var packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

        var rawSpecificationData = {
            'filteredPacketFieldSpecs': [{
                'fieldId': '000_2_0',
                'name': {
                    'ref': 'Flow temperature',
                    'en': 'Flow temperature',
                    'de': 'Temperatur Vorlauf',
                    'fr': 'Température Départ'
                },
                'type': 'Number_0_1_DegreesCelsius',
                'getRawValue': '_0010_772F_0100_000_2_0',
                'filteredPacketFieldId': '00_0010_772F_0100_10_000_2_0',
                'packetId': '00_0010_772F_0100_10'
            }]
        };

        var spec = new Specification({
            specificationData: rawSpecificationData
        });

        var packetSpec = spec.getPacketSpecification(packet);
        var packetFieldSpec = spec.getPacketFieldSpecification('00_0010_772F_0100_10_000_2_0');

        var packetFields = spec.getPacketFieldsForHeaders([ packet ]);

        expect(packetFields).to.be.an('array');
        expect(packetFields.length).to.equal(1);
        expect(packetFields [0].id).to.equal('00_0010_772F_0100_10_000_2_0');
        expect(packetFields [0].packet).to.equal(undefined);
        expect(packetFields [0].packetSpec).to.equal(undefined);
        expect(packetFields [0].packetFieldSpec).to.equal(packetFieldSpec);
        expect(packetFields [0].origPacketFieldSpec).to.equal(undefined);
    });

*/
});
