/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    Packet,
    Specification,
    utils: { hasOwnProperty },
} = require('./resol-vbus');


const expect = require('./expect');
const testUtils = require('./test-utils');


const { expectOwnPropertyNamesToEqual } = testUtils;



describe('Specification', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(Specification).to.be.a('function');

            const spec = new Specification();

            expect(spec).to.be.an.instanceOf(Specification);
        });

        it('should have resonable defaults', () => {
            const spec = new Specification();

            expect(spec.language).to.equal('en');
        });

        it('should copy selected options', () => {
            const options = {
                language: 'de',
                junk: 'JUNK'
            };

            const spec = new Specification(options);

            expect(spec.language).to.equal(options.language);
            expect(spec.junk).to.equal(undefined);
        });

        // the specificationData option if checked later

    });

    describe('.loadSpecificationData', () => {

        const rawSpecificationData1 = {
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
            }, {
                'filteredPacketFieldId': 'DemoValue2',
                'packetId': '00_0010_7722_10_0100',
                'fieldId': '000_2_0',
                'name': {
                    'ref': 'Flow temperatureL',
                    'en': 'Flow temperature',
                    'de': 'T-VL',
                    'fr': 'Température Départ'
                },
                'type': 'Number_0_1_DegreesFahrenheit',
                'conversions': [{
                    'factor': 1.8,
                    'sourceUnit': 'DegreesCelsius',
                    'targetUnit': 'None'
                }, {
                    'offset': 32,
                    'sourceUnit': 'None',
                    'targetUnit': 'DegreesFahrenheit'
                }],
                'getRawValue': '_0010_7722_0100_000_2_0'
            }]
        };

        const checkSpecificationData1 = function(specData) {
            expect(specData).to.be.an('object');

            const fpfs = specData.filteredPacketFieldSpecs;

            expect(fpfs).to.be.an('array');
            expect(fpfs.length).to.equal(2);
            expect(fpfs [0].filteredPacketFieldId).to.equal('DemoValue1');
            expect(fpfs [0].packetId).to.equal('00_0010_7722_10_0100');
            expect(fpfs [0].fieldId).to.equal('000_2_0');
            expect(fpfs [0].name.de).to.equal('T-VL');
            expect(fpfs [0].type).to.be.an('object');
            expect(fpfs [0].getRawValue).to.be.a('function');
            expect(fpfs [0].packetSpec).to.be.an('object');
            expect(fpfs [0].packetFieldSpec).to.be.an('object');
            expect(fpfs [1].filteredPacketFieldId).to.equal('DemoValue2');
            expect(fpfs [1].packetId).to.equal('00_0010_7722_10_0100');
            expect(fpfs [1].fieldId).to.equal('000_2_0');
            expect(fpfs [1].name.de).to.equal('T-VL');
            expect(fpfs [1].type).to.be.an('object');
            expect(fpfs [1].conversions).an('array').lengthOf(2);
            expect(fpfs [1].conversions [0].factor).an('number');
            expect(fpfs [1].conversions [0].sourceUnit).an('object');
            expect(fpfs [1].conversions [0].targetUnit).an('object');
            expect(fpfs [1].conversions [1].offset).an('number');
            expect(fpfs [1].conversions [1].sourceUnit).an('object');
            expect(fpfs [1].conversions [1].targetUnit).an('object');
            expect(fpfs [1].getRawValue).to.be.a('function');
            expect(fpfs [1].packetSpec).to.be.an('object');
            expect(fpfs [1].packetFieldSpec).to.be.an('object');
        };

        it('should be a function', () => {
            expect(Specification.loadSpecificationData).to.be.a('function');
        });

        it('should work correctly without arguments', () => {
            const specData = Specification.loadSpecificationData();

            expect(specData).to.be.an('object');
            expect(specData.units).to.be.an('object', 'units');
            expect(specData.types).to.be.an('object', 'types');
            expect(specData.deviceSpecs).to.be.an('object', 'deviceSpecs');
            expect(specData.packetSpecs).to.be.an('object', 'packetSpecs');
            expect(specData.getDeviceSpecification).to.be.a('function');
            expect(specData.getPacketSpecification).to.be.a('function');
            expect(specData.filteredPacketFieldSpecs).to.equal(undefined);
        });

        it('should work correctly with raw spec data', () => {
            const rawSpecData = rawSpecificationData1;

            const specData = Specification.loadSpecificationData(rawSpecData);

            checkSpecificationData1(specData);
        });

        it('should work correctly as part of the constructor', () => {
            const rawSpecData = rawSpecificationData1;

            const spec = new Specification({
                specificationData: rawSpecData
            });

            checkSpecificationData1(spec.specificationData);
        });
    });

    describe('.storeSpecificationData', () => {

        const rawSpecificationData1 = {
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
                'getRawValue': '_0010_7722_0100_000_2_0',
                'setRawValue': '_0010_7722_0100_000_2_0'
            }, {
                'filteredPacketFieldId': 'DemoValue2',
                'packetId': '00_0010_7722_10_0100',
                'fieldId': '000_2_0',
                'name': {
                    'ref': 'Flow temperatureL',
                    'en': 'Flow temperature',
                    'de': 'T-VL',
                    'fr': 'Température Départ'
                },
                'type': 'Number_0_1_DegreesFahrenheit',
                'conversions': [{
                    'factor': 1.8,
                    'sourceUnit': 'DegreesCelsius',
                    'targetUnit': 'None'
                }, {
                    'offset': 32,
                    'sourceUnit': 'None',
                    'targetUnit': 'DegreesFahrenheit'
                }],
                'getRawValue': '_0010_7722_0100_000_2_0',
                'setRawValue': '_0010_7722_0100_000_2_0'
            }]
        };

        it('should be a function', () => {
            expect(Specification.storeSpecificationData).to.be.a('function');
        });

        it('should work correctly without arguments', () => {
            const rawSpecData = Specification.storeSpecificationData();

            expect(rawSpecData).to.be.an('object');
            expect(rawSpecData.units).to.equal(undefined);
            expect(rawSpecData.types).to.equal(undefined);
            expect(rawSpecData.deviceSpecs).to.equal(undefined);
            expect(rawSpecData.packetSpecs).to.equal(undefined);
            expect(rawSpecData.getDeviceSpecification).to.equal(undefined);
            expect(rawSpecData.getPacketSpecification).to.equal(undefined);
            expect(rawSpecData.filteredPacketFieldSpecs).to.equal(undefined);
        });

        it('should work correctly with an unfiltered spec', () => {
            const spec = new Specification();

            const rawSpecData = Specification.storeSpecificationData(spec);

            expect(rawSpecData).to.be.an('object');
            expect(rawSpecData.units).to.equal(undefined);
            expect(rawSpecData.types).to.equal(undefined);
            expect(rawSpecData.deviceSpecs).to.equal(undefined);
            expect(rawSpecData.packetSpecs).to.equal(undefined);
            expect(rawSpecData.getDeviceSpecification).to.equal(undefined);
            expect(rawSpecData.getPacketSpecification).to.equal(undefined);
            expect(rawSpecData.filteredPacketFieldSpecs).to.equal(undefined);
        });

        it('should work correctly with a filtered spec', () => {
            const rawSpecDataInput = rawSpecificationData1;

            const spec = new Specification({
                specificationData: rawSpecDataInput
            });

            const rawSpecData = Specification.storeSpecificationData(spec);

            expect(rawSpecData).to.eql(rawSpecDataInput);
        });

    });

    describe('#getUnitById', () => {

        it('should be a method', () => {
            expect(Specification.prototype.getUnitById).to.be.a('function');
        });

        it('should work correctly for known units', () => {
            const spec = new Specification();

            const unit = spec.getUnitById('None');

            expect(unit).to.be.an('object');
        });

        it('should work correctly for unknown units', () => {
            const spec = new Specification();

            const unit = spec.getUnitById('Unknown');

            expect(unit).to.equal(undefined);
        });

    });

    describe('#getTypeById', () => {

        it('should be a method', () => {
            expect(Specification.prototype.getTypeById).to.be.a('function');
        });

        it('should work correctly for known types', () => {
            const spec = new Specification();

            const unit = spec.getTypeById('Number_1_None');

            expect(unit).to.be.an('object');
        });

        it('should work correctly for unknown types', () => {
            const spec = new Specification();

            const unit = spec.getTypeById('Unknown');

            expect(unit).to.equal(undefined);
        });

    });

    describe('#getDeviceSpecification', () => {

        it('should be a method', () => {
            expect(Specification.prototype.getDeviceSpecification).to.be.a('function');
        });

        it('should work correctly with a number pair', () => {
            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(0x7721, 0x0010);

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.channel).to.equal(0);
            expect(deviceSpec.selfAddress).to.equal(0x7721);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
            expect(deviceSpec.name).to.equal('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).to.equal('DeltaSol E [Regler]');
        });

        it('should work correctly with a number triple', () => {
            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(0x7721, 0x0010, 1);

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.channel).to.equal(1);
            expect(deviceSpec.selfAddress).to.equal(0x7721);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
            expect(deviceSpec.name).to.equal('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).to.equal('VBus #1: DeltaSol E [Regler]');
        });

        it('should work correctly with a header and "source"', () => {
            const header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
            });

            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(header, 'source');

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.channel).to.equal(1);
            expect(deviceSpec.selfAddress).to.equal(0x7721);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
            expect(deviceSpec.name).to.equal('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).to.equal('VBus #1: DeltaSol E [Regler]');
        });

        it('should work correctly with a header and "destination"', () => {
            const header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
            });

            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(header, 'destination');

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.name).to.equal('DFA');
            expect(deviceSpec.fullName).to.equal('VBus #1: DFA');
        });

        it('should work correctly for an unknown device', () => {
            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(0x772F, 0x0010, 1);

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.channel).to.equal(1);
            expect(deviceSpec.selfAddress).to.equal(0x772F);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
            expect(deviceSpec.name).to.equal('Unknown Device (0x772F)');
            expect(deviceSpec.fullName).to.equal('VBus #1: Unknown Device (0x772F)');
        });

    });

    describe('#getPacketSpecification', () => {

        it('should be a method', () => {
            expect(Specification.prototype.getPacketSpecification).to.be.a('function');
        });

        it('should work correctly with a number quadruple', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.channel).to.equal(1);
            expect(packetSpec.destinationAddress).to.equal(0x0010);
            expect(packetSpec.sourceAddress).to.equal(0x7721);
            expect(packetSpec.command).to.equal(0x0100);
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.fullName).to.equal('VBus #1: DeltaSol E [Regler]');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly with a header', () => {
            const header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
                command: 0x0100,
            });

            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(header);

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly with a packet ID string with protocol version', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification('01_0010_7721_10_0100');

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly with a packet ID string without protocol version', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification('01_0010_7721_0100');

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly for an unknown packet', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x772F, 0x0100);

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.equal(0);
        });

        it('should work correctly with a packet field ID string', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification('01_0010_7721_10_0100_000_2_0');

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

    });

    describe('#getPacketFieldSpecification', () => {

        const rawSpecificationData1 = {
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

        it('should be a method', () => {
            expect(Specification.prototype.getPacketFieldSpecification).to.be.a('function');
        });

        it('should work correctly with a packet spec and a field ID', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            const packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.an('object');
            expect(packetFieldSpec.name.de).to.be.a('string');
            expect(packetFieldSpec.name.en).to.be.a('string');
            expect(packetFieldSpec.name.fr).to.be.a('string');
            expect(packetFieldSpec.type).to.be.an('object');
            expect(packetFieldSpec.type.typeId).to.be.a('string');
            expect(packetFieldSpec.type.rootTypeId).to.be.a('string');
            expect(packetFieldSpec.type.precision).to.be.a('number');
            expect(packetFieldSpec.type.unit).to.be.an('object');
            expect(packetFieldSpec.type.unit.unitCode).to.be.a('string');
            expect(packetFieldSpec.type.unit.unitText).to.be.a('string');
        });

        it('should work correctly with a packet field ID string with protocol version', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.an('object');
            expect(packetFieldSpec.name.de).to.be.a('string');
            expect(packetFieldSpec.name.en).to.be.a('string');
            expect(packetFieldSpec.name.fr).to.be.a('string');
            expect(packetFieldSpec.type).to.be.an('object');
            expect(packetFieldSpec.type.typeId).to.be.a('string');
            expect(packetFieldSpec.type.rootTypeId).to.be.a('string');
            expect(packetFieldSpec.type.precision).to.be.a('number');
            expect(packetFieldSpec.type.unit).to.be.an('object');
            expect(packetFieldSpec.type.unit.unitCode).to.be.a('string');
            expect(packetFieldSpec.type.unit.unitText).to.be.a('string');
        });

        it('should work correctly with a packet field ID string without protocol version', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_0100_000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.an('object');
            expect(packetFieldSpec.name.de).to.be.a('string');
            expect(packetFieldSpec.name.en).to.be.a('string');
            expect(packetFieldSpec.name.fr).to.be.a('string');
            expect(packetFieldSpec.type).to.be.an('object');
            expect(packetFieldSpec.type.typeId).to.be.a('string');
            expect(packetFieldSpec.type.rootTypeId).to.be.a('string');
            expect(packetFieldSpec.type.precision).to.be.a('number');
            expect(packetFieldSpec.type.unit).to.be.an('object');
            expect(packetFieldSpec.type.unit.unitCode).to.be.a('string');
            expect(packetFieldSpec.type.unit.unitText).to.be.a('string');
        });

        it('should work correctly for a missing packet spec', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification(null, '000_2_0');

            expect(packetFieldSpec).to.equal(undefined);
        });

        it('should work correctly for a missing field ID', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            const packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, null);

            expect(packetFieldSpec).to.equal(undefined);
        });

        it('should work correctly for an unknown field ID', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            const packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_0_0');

            expect(packetFieldSpec).to.equal(undefined);
        });

        it('should work correctly with a filtered spec and a custom ID string', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData1
            });

            const packetFieldSpec = spec.getPacketFieldSpecification('DemoValue1');

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

    });

    describe('#setRawValue', () => {

        it('should be a method', () => {
            expect(Specification.prototype.setRawValue).to.be.a('function');
        });


        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const setRawValue = 20.5;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(20.5, 0.05);
        });

        it('should work correctly without start and end arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const setRawValue = 999.9;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer);

            expect(rawValue).to.be.closeTo(999.9, 0.05);
        });

        it('should work correctly with a too small buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('', 'hex');

            const setRawValue = 12.3;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly with a partial buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const setRawValue = 12.3;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(12.3, 0.05);
        });

        it('should work correctly for an unknown packet field spec', () => {
            const spec = new Specification();

            const buffer = Buffer.from('b822', 'hex');

            const setRawValue = 12.3;

            spec.setRawValue(null, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(null, buffer, 0, buffer.length);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly without a buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const setRawValue = 12.3;

            spec.setRawValue(packetFieldSpec, setRawValue);

            const rawValue = spec.getRawValue(packetFieldSpec);

            expect(rawValue).to.equal(null);
        });

    });


    describe('#getRawValue', () => {

        it('should be a method', () => {
            expect(Specification.prototype.getRawValue).to.be.a('function');
        });

        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(888.8, 0.05);
        });

        it('should work correctly without start and end arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer);

            expect(rawValue).to.be.closeTo(888.8, 0.05);
        });

        it('should work correctly with a too small buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly with a partial buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(18.4, 0.05);
        });

        it('should work correctly for an unknown packet field spec', () => {
            const spec = new Specification();

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRawValue(null, buffer, 0, buffer.length);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly without a buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const rawValue = spec.getRawValue(packetFieldSpec);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly with a filtered spec and conversion', () => {
            const rawSpecificationData1 = {
                'filteredPacketFieldSpecs': [{
                    'filteredPacketFieldId': 'DemoValue1',
                    'packetId': '01_0010_7721_10_0100',
                    'fieldId': '000_2_0',
                    'name': 'T1',
                    'type': 'Number_0_1_DegreesFahrenheit',
                }]
            };
            const spec = new Specification({
                specificationData: rawSpecificationData1,
            });

            const packetFieldSpec = spec.getPacketFieldSpecification('DemoValue1');

            const buffer = Buffer.from('0000', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(32.0, 0.05);
        });

    });

    describe('#getRoundedRawValue', () => {

        it('should be a method', () => {
            expect(Specification.prototype.getRoundedRawValue).to.be.a('function');
        });

        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.equal(888.8);
        });

        it('should work correctly without start and end arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer);

            expect(rawValue).to.be.equal(888.8);
        });

        it('should work correctly with a too small buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.equal(0);
        });

        it('should work correctly with a partial buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.equal(18.4);
        });

        it('should work correctly for an unknown packet field spec', () => {
            const spec = new Specification();

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRoundedRawValue(null, buffer, 0, buffer.length);

            expect(rawValue).to.equal(null);
        });

        it('should work correctly without a buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec);

            expect(rawValue).to.equal(0);
        });

        it('should work correctly with a filtered spec and conversion', () => {
            const rawSpecificationData1 = {
                'filteredPacketFieldSpecs': [{
                    'filteredPacketFieldId': 'DemoValue1',
                    'packetId': '01_0010_7721_10_0100',
                    'fieldId': '000_2_0',
                    'name': 'T1',
                    'type': 'Number_0_1_DegreesFahrenheit',
                }]
            };
            const spec = new Specification({
                specificationData: rawSpecificationData1,
            });

            const packetFieldSpec = spec.getPacketFieldSpecification('DemoValue1');

            const buffer = Buffer.from('0000', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.equal(32);
        });

    });

    describe('#invertConversions', () => {

        it('should be a method', () => {
            expect(Specification.prototype.invertConversions).to.be.a('function');
        });

        it('should work correctly without conversion', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions();

            expect(invertedConversions).to.equal(undefined);
        });

        it('should work correctly with conversions are not an array', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions('string');

            expect(invertedConversions).to.equal('string');
        });

        it('should work correctly with empty conversions', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([]);

            expect(invertedConversions).an('array').lengthOf(0);
        });

        it('should work correctly with one conversion and a factor greater 1', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 2
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('factor').equal(0.5);
        });

        it('should work correctly with one conversion and a factor smaller 1', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 0.5
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('factor').equal(2);
        });

        it('should work correctly with one conversion and a factor of 0', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 0
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('factor').equal(Infinity);
        });

        it('should work correctly with one conversion and a power of 0', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: 0
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('power').equal(0);
        });

        it('should work correctly with one conversion and a power of 2', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: 2
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('power').equal(0.5);
        });

        it('should work correctly with one conversion and a power of 0.5', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: 0.5
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('power').equal(2);
        });

        it('should work correctly with one conversion and a power of -2', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: -2
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('power').equal(-0.5);
        });

        it('should work correctly with one conversion and an offset 1000', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                offset: 1000
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('offset').equal(-1000);
        });

        it('should work correctly with one conversion and an offset -500', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                offset: -500
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('offset').equal(500);
        });

        it('should work correctly with one conversion and an unit change', () => {
            const spec = new Specification();

            const celsiusUnit = spec.getUnitById('DegreesCelsius');
            const fahrenheitUnit = spec.getUnitById('DegreesFahrenheit');

            const invertedConversions = spec.invertConversions([{
                sourceUnit: celsiusUnit,
                targetUnit: fahrenheitUnit,
            }]);

            expect(invertedConversions).an('array').lengthOf(1);
            expect(invertedConversions[0]).property('sourceUnit').equal(fahrenheitUnit);
            expect(invertedConversions[0]).property('targetUnit').equal(celsiusUnit);
        });

        it('should work correctly with multiple conversions using a factor of 2 and an offset -10', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 2
            }, {
                offset: -10
            }]);

            expect(invertedConversions).an('array').lengthOf(2);
            expect(invertedConversions[0]).property('offset').equal(10);
            expect(invertedConversions[1]).property('factor').equal(0.5);
        });

        it('should work correctly with multiple conversions using an offset 10 and a factor of 0.5', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                offset: 10
            }, {
                factor: 0.5
            }]);

            expect(invertedConversions).an('array').lengthOf(2);
            expect(invertedConversions[0]).property('factor').equal(2);
            expect(invertedConversions[1]).property('offset').equal(-10);
        });

        it('should work correctly with multiple conversions using a manual °C -> °F conversion', () => {
            const spec = new Specification();

            const noneUnit = spec.getUnitById('None');
            const celsiusUnit = spec.getUnitById('DegreesCelsius');
            const fahrenheitUnit = spec.getUnitById('DegreesFahrenheit');

            const invertedConversions = spec.invertConversions([{
                factor: 1.8,
                sourceUnit: celsiusUnit,
                targetUnit: noneUnit,
            }, {
                offset: 32,
                sourceUnit: noneUnit,
                targetUnit: fahrenheitUnit,
            }]);

            expect(invertedConversions).an('array').lengthOf(2);
            expect(invertedConversions [0]).property('offset').equal(-32);
            expect(invertedConversions [0]).property('sourceUnit').equal(fahrenheitUnit);
            expect(invertedConversions [0]).property('targetUnit').equal(noneUnit);
            expect(invertedConversions [1]).property('factor').equal(5 / 9);
            expect(invertedConversions [1]).property('sourceUnit').equal(noneUnit);
            expect(invertedConversions [1]).property('targetUnit').equal(celsiusUnit);
        });

    });

    describe('#convertRawValue', () => {

        const specData = Specification.loadSpecificationData();

        const unitsByFamily = {};

        const knownFamilyUnitCodes = [];

        for (const unitId of Object.getOwnPropertyNames(specData.units)) {
            const unit = specData.units [unitId];
            const uf = unit.unitFamily;
            if (uf) {
                if (!hasOwnProperty(unitsByFamily, uf)) {
                    unitsByFamily [uf] = [];
                }

                unitsByFamily [uf].push(unit);
                knownFamilyUnitCodes.push(unit.unitCode);
            }
        }

        const content = [];
        for (const uf of Object.getOwnPropertyNames(unitsByFamily).sort()) {
            const units = unitsByFamily [uf];

            content.push('describe(\'Unit Family ' + JSON.stringify(uf) + '\', function() {');
            content.push('');
            // content.push('var units = unitsByFamily [\'' + uf + '\'];');
            // content.push('');

            for (let index = 0; index < units.length; index++) {
                const sourceUnit = units [index];
                const targetUnit = units [index + 1] || units [0];

                content.push('it(\'should convert from ' + JSON.stringify(sourceUnit.unitCode) + ' to ' + JSON.stringify(targetUnit.unitCode) + '\', function() {');
                content.push('expectConversion(0, \'' + sourceUnit.unitCode + '\', \'' + targetUnit.unitCode + '\').closeTo(undefined, delta);');
                content.push('expectConversion(1000000, \'' + sourceUnit.unitCode + '\', \'' + targetUnit.unitCode + '\').closeTo(undefined, delta);');
                content.push('});');
                content.push('');
            }

            content.push('});');
            content.push('');
        }

        // console.log(content.join('\n'));

        it('should be a method', () => {
            expect(Specification.prototype).property('convertRawValue').a('function');
        });

        const checkedSourceUnitCodes = new Set();
        const checkedTargetUnitCodes = new Set();

        const expectConversion = function(rawValue, sourceUnitCode, targetUnitCode) {
            checkedSourceUnitCodes.add(sourceUnitCode);
            checkedTargetUnitCodes.add(targetUnitCode);

            const spec = new Specification();

            const sourceUnit = specData.units [sourceUnitCode];
            const targetUnit = specData.units [targetUnitCode];

            expect(sourceUnit).a('object').property('unitCode').equal(sourceUnitCode);
            expect(targetUnit).a('object').property('unitCode').equal(targetUnitCode);

            let error, result;
            try {
                result = spec.convertRawValue(rawValue, sourceUnit, targetUnit);
            } catch (ex) {
                error = ex;
            }

            expect(error).equal(undefined);
            expect(result).a('object').property('unit').equal(targetUnit);

            return expect(result).property('rawValue').a('number');
        };

        const delta = 0.000000001;

        describe('Unit Family "Energy"', () => {

            it('should convert from "Btus" to "GramsCO2Gas"', () => {
                expectConversion(0, 'Btus', 'GramsCO2Gas').closeTo(0, delta);
                expectConversion(1000000, 'Btus', 'GramsCO2Gas').closeTo(74323.12035187425, delta);
            });

            it('should convert from "GramsCO2Gas" to "GramsCO2Oil"', () => {
                expectConversion(0, 'GramsCO2Gas', 'GramsCO2Oil').closeTo(0, delta);
                expectConversion(10, 'GramsCO2Gas', 'GramsCO2Oil').closeTo(22.397476, 0.0000005);
            });

            it('should convert from "GramsCO2Oil" to "KiloBtus"', () => {
                expectConversion(0, 'GramsCO2Oil', 'KiloBtus').closeTo(0, delta);
                expectConversion(1000000, 'GramsCO2Oil', 'KiloBtus').closeTo(6007.267605633803, delta);
            });

            it('should convert from "KiloBtus" to "KilogramsCO2Gas"', () => {
                expectConversion(0, 'KiloBtus', 'KilogramsCO2Gas').closeTo(0, delta);
                expectConversion(1000000, 'KiloBtus', 'KilogramsCO2Gas').closeTo(74323.12035187425, delta);
            });

            it('should convert from "KilogramsCO2Gas" to "KilogramsCO2Oil"', () => {
                expectConversion(0, 'KilogramsCO2Gas', 'KilogramsCO2Oil').closeTo(0, delta);
                expectConversion(10, 'KilogramsCO2Gas', 'KilogramsCO2Oil').closeTo(22.397476, 0.0000005);
            });

            it('should convert from "KilogramsCO2Oil" to "KilowattHours"', () => {
                expectConversion(0, 'KilogramsCO2Oil', 'KilowattHours').closeTo(0, delta);
                expectConversion(1000000, 'KilogramsCO2Oil', 'KilowattHours').closeTo(1760563.3802816903, delta);
            });

            it('should convert from "KilowattHours" to "MegaBtus"', () => {
                expectConversion(0, 'KilowattHours', 'MegaBtus').closeTo(0, delta);
                expectConversion(1000000, 'KilowattHours', 'MegaBtus').closeTo(3412.128, delta);
            });

            it('should convert from "MegaBtus" to "MegawattHours"', () => {
                expectConversion(0, 'MegaBtus', 'MegawattHours').closeTo(0, delta);
                expectConversion(1, 'MegaBtus', 'MegawattHours').closeTo(0.293072241, delta);
            });

            it('should convert from "MegawattHours" to "TonsCO2Gas"', () => {
                expectConversion(0, 'MegawattHours', 'TonsCO2Gas').closeTo(0, delta);
                expectConversion(1000000, 'MegawattHours', 'TonsCO2Gas').closeTo(253600, delta);
            });

            it('should convert from "TonsCO2Gas" to "TonsCO2Oil"', () => {
                expectConversion(0, 'TonsCO2Gas', 'TonsCO2Oil').closeTo(0, delta);
                expectConversion(10, 'TonsCO2Gas', 'TonsCO2Oil').closeTo(22.397476, 0.0000005);
            });

            it('should convert from "TonsCO2Oil" to "WattHours"', () => {
                expectConversion(0, 'TonsCO2Oil', 'WattHours').closeTo(0, delta);
                expectConversion(10, 'TonsCO2Oil', 'WattHours').closeTo(17605633.8, 0.05);
            });

            it('should convert from "WattHours" to "Btus"', () => {
                expectConversion(0, 'WattHours', 'Btus').closeTo(0, delta);
                expectConversion(1000000, 'WattHours', 'Btus').closeTo(3412128, delta);
            });

        });

        describe('Unit Family "Power"', () => {

            it('should convert from "Kilowatts" to "Watts"', () => {
                expectConversion(0, 'Kilowatts', 'Watts').closeTo(0, delta);
                expectConversion(1000000, 'Kilowatts', 'Watts').closeTo(1000000000, delta);
            });

            it('should convert from "Watts" to "Kilowatts"', () => {
                expectConversion(0, 'Watts', 'Kilowatts').closeTo(0, delta);
                expectConversion(1000000, 'Watts', 'Kilowatts').closeTo(1000, delta);
            });

        });

        describe('Unit Family "Pressure"', () => {

            it('should convert from "Bars" to "PoundsForcePerSquareInch"', () => {
                expectConversion(0, 'Bars', 'PoundsForcePerSquareInch').closeTo(0, delta);
                expectConversion(10, 'Bars', 'PoundsForcePerSquareInch').closeTo(145.037738, delta);
            });

            it('should convert from "PoundsForcePerSquareInch" to "Bars"', () => {
                expectConversion(0, 'PoundsForcePerSquareInch', 'Bars').closeTo(0, delta);
                expectConversion(100, 'PoundsForcePerSquareInch', 'Bars').closeTo(6.89475728, delta);
            });

        });

        describe('Unit Family "Temperature"', () => {

            it('should convert from "DegreesCelsius" to "DegreesFahrenheit"', () => {
                expectConversion(0, 'DegreesCelsius', 'DegreesFahrenheit').closeTo(32, delta);
                expectConversion(100, 'DegreesCelsius', 'DegreesFahrenheit').closeTo(212, delta);
            });

            it('should convert from "DegreesFahrenheit" to "DegreesCelsius"', () => {
                expectConversion(32, 'DegreesFahrenheit', 'DegreesCelsius').closeTo(0, delta);
                expectConversion(212, 'DegreesFahrenheit', 'DegreesCelsius').closeTo(100, delta);
            });

        });

        describe('Unit Family "Time"', () => {

            it('should convert from "Days" to "Hours"', () => {
                expectConversion(0, 'Days', 'Hours').closeTo(0, delta);
                expectConversion(10, 'Days', 'Hours').closeTo(240, delta);
            });

            it('should convert from "Hours" to "Minutes"', () => {
                expectConversion(0, 'Hours', 'Minutes').closeTo(0, delta);
                expectConversion(10, 'Hours', 'Minutes').closeTo(600, delta);
            });

            it('should convert from "Minutes" to "Seconds"', () => {
                expectConversion(0, 'Minutes', 'Seconds').closeTo(0, delta);
                expectConversion(10, 'Minutes', 'Seconds').closeTo(600, delta);
            });

            it('should convert from "Seconds" to "Days"', () => {
                expectConversion(0, 'Seconds', 'Days').closeTo(0, delta);
                expectConversion(86400, 'Seconds', 'Days').closeTo(1, delta);
            });

        });

        describe('Unit Family "Volume"', () => {

            it('should convert from "CubicMeters" to "Gallons"', () => {
                expectConversion(0, 'CubicMeters', 'Gallons').closeTo(0, delta);
                expectConversion(10, 'CubicMeters', 'Gallons').closeTo(2641.72, 0.005);
            });

            it('should convert from "Gallons" to "Liters"', () => {
                expectConversion(0, 'Gallons', 'Liters').closeTo(0, delta);
                expectConversion(10, 'Gallons', 'Liters').closeTo(37.8541, 0.00005);
            });

            it('should convert from "Liters" to "CubicMeters"', () => {
                expectConversion(0, 'Liters', 'CubicMeters').closeTo(0, delta);
                expectConversion(10000, 'Liters', 'CubicMeters').closeTo(10, delta);
            });

        });

        describe('Unit Family "VolumeFlow"', () => {

            it('should convert from "CubicMetersPerHour" to "GallonsPerHour"', () => {
                expectConversion(0, 'CubicMetersPerHour', 'GallonsPerHour').closeTo(0, delta);
                expectConversion(10, 'CubicMetersPerHour', 'GallonsPerHour').closeTo(2641.72, 0.005);
            });

            it('should convert from "GallonsPerHour" to "GallonsPerMinute"', () => {
                expectConversion(0, 'GallonsPerHour', 'GallonsPerMinute').closeTo(0, delta);
                expectConversion(600, 'GallonsPerHour', 'GallonsPerMinute').closeTo(10, delta);
            });

            it('should convert from "GallonsPerMinute" to "LitersPerHour"', () => {
                expectConversion(0, 'GallonsPerMinute', 'LitersPerHour').closeTo(0, delta);
                expectConversion(10, 'GallonsPerMinute', 'LitersPerHour').closeTo(2271.2475, 0.00005);
            });

            it('should convert from "LitersPerHour" to "LitersPerMinute"', () => {
                expectConversion(0, 'LitersPerHour', 'LitersPerMinute').closeTo(0, delta);
                expectConversion(6000, 'LitersPerHour', 'LitersPerMinute').closeTo(100, delta);
            });

            it('should convert from "LitersPerMinute" to "CubicMetersPerHour"', () => {
                expectConversion(0, 'LitersPerMinute', 'CubicMetersPerHour').closeTo(0, delta);
                expectConversion(1000, 'LitersPerMinute', 'CubicMetersPerHour').closeTo(60, delta);
            });

        });

        const expectConversions = function(rawValue, conversions) {
            const spec = new Specification();

            conversions = conversions.map((conversion) => {
                const { sourceUnitCode, targetUnitCode } = conversion;

                const sourceUnit = sourceUnitCode && specData.units [sourceUnitCode];
                const targetUnit = targetUnitCode && specData.units [targetUnitCode];

                if (sourceUnitCode) {
                    expect(sourceUnit).a('object').property('unitCode').equal(sourceUnitCode);
                }
                if (targetUnitCode) {
                    expect(targetUnit).a('object').property('unitCode').equal(targetUnitCode);
                }

                return {
                    power: conversion.power,
                    factor: conversion.factor,
                    offset: conversion.offset,
                    sourceUnit,
                    targetUnit,
                };
            });

            let error, result;
            try {
                result = spec.convertRawValue(rawValue, conversions);
            } catch (ex) {
                error = ex;
            }

            expect(error).equal(undefined);
            expect(result).a('object').property('unit').equal(conversions [conversions.length - 1].targetUnit);

            return expect(result).property('rawValue').a('number');
        };

        describe('Multiple conversions in one step', () => {

            it('should return rawValue converted to rawValue / 1000', () => {
                expectConversions(1234, [{
                    sourceUnitCode: 'WattHours',
                    targetUnitCode: 'KilowattHours',
                }]).closeTo(1.234, delta);
            });

            it('should return converted rawValue plus offset', () => {
                expectConversions(1234, [{
                    sourceUnitCode: 'WattHours',
                    targetUnitCode: 'KilowattHours',
                }, {
                    offset: 123,
                }]).closeTo(124.234, delta);
            });

            it('should return rawValue * 10', () => {
                expectConversions(1234, [{
                    factor: 10,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(12340, delta);
            });

            it('should return rawValue * factor converted to rawValue / 1000 plus offset', () => {
                expectConversions(1234, [{
                    factor: 10,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }, {
                    sourceUnitCode: 'WattHours',
                    targetUnitCode: 'KilowattHours',
                }, {
                    offset: 123,
                }]).closeTo(1234 * 10 / 1000 + 123, delta);
            });

            it('should return conversion of degrees celsius to degrees fahrenheit', () => {
                expectConversions(100, [{
                    factor: 1.8,
                }, {
                    offset: 32,
                }, {
                    factor: 1,
                    sourceUnitCode: 'DegreesCelsius',
                    targetUnitCode: 'DegreesFahrenheit',
                }]).closeTo(212, delta);
            });

            it('should return conversion of degrees fahrenheit to degrees celsius', () => {
                expectConversions(212, [{
                    offset: -32,
                }, {
                    factor: 1 / 1.8,
                }, {
                    factor: 1,
                    sourceUnitCode: 'DegreesFahrenheit',
                    targetUnitCode: 'DegreesCelsius',
                }]).closeTo(100, delta);
            });

            it('should return rawValue * factor plus offset', () => {
                expectConversions(1234, [{
                    factor: 10,
                    offset: 0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(12340.5, delta);
            });

            it('pow(1234, 0) * 10 + 0.5', () => {
                expectConversions(1234, [{
                    power: 0,
                    factor: 10,
                    offset: 0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(10.5, delta);
            });

            it('pow(0, 5) * 10 - 0.5', () => {
                expectConversions(0, [{
                    power: 5,
                    factor: 10,
                    offset: -0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(-0.5, delta);
            });

            it('pow(0, -2) * 10', () => {
                expectConversions(0, [{
                    power: -2,
                    factor: 10,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(0, delta);
            });

            it('pow(1234, 1) * 10 + 0.5', () => {
                expectConversions(1234, [{
                    power: 1,
                    factor: 10,
                    offset: 0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(12340.5, delta);
            });

            it('pow(10, 2) * 10 + 1000', () => {
                expectConversions(10, [{
                    power: 2,
                    factor: 10,
                    offset: 1000,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(2000, delta);
            });

            it('pow(100, 0.5) * 5 + 50', () => {
                expectConversions(100, [{
                    power: 0.5,
                    factor: 5,
                    offset: 50,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(100, delta);
            });

            it('pow(100, -1) * 10 + 0.9', () => {
                expectConversions(100, [{
                    power: -1,
                    factor: 10,
                    offset: 0.9,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).closeTo(1, delta);
            });
        });

        describe('Units', () => {

            it('should have checked all units as source units', () => {
                expect(Array.from(checkedSourceUnitCodes.values()).sort()).eql(knownFamilyUnitCodes.sort());
            });

            it('should have checked all units as target units', () => {
                expect(Array.from(checkedTargetUnitCodes.values()).sort()).eql(knownFamilyUnitCodes.sort());
            });

        });

    });

    describe('#formatTextValueFromRawValue', () => {

        it('should be a methods', () => {
            expect(Specification.prototype.formatTextValueFromRawValue).to.be.a('function');
        });

        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8, 'DegreesCelsius');

            expect(textValue).to.equal('888.8 °C');
        });

        it('should work correctly without unit', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8);

            expect(textValue).to.equal('888.8 °C');
        });

        it('should work correctly with "None" unit', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8, 'None');

            expect(textValue).to.equal('888.8');
        });

        it('should work correctly without raw value', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, null, 'None');

            expect(textValue).to.equal('');
        });

        it('should work correctly without packet field spec', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValue(null, 888.8, 'DegreesCelsius');

            expect(textValue).to.equal('888.8 °C');
        });

    });

    describe('#formatTextValueFromRawValueInternal', () => {

        it('should be a method', () => {
            expect(Specification.prototype.formatTextValueFromRawValueInternal).to.be.a('function');
        });

        it('should work correctly for root type "Time"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(721, null, 'Time', 0, null);

            expect(textValue).to.equal('12:01');
        });

        it('should work correctly for root type "Weektime"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(3 * 1440 + 721, null, 'Weektime', 0, null);

            expect(textValue).to.equal('Th,12:01');
        });

        it('should work correctly for root type "DateTime"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(409418262, null, 'DateTime', 0, null);

            expect(textValue).to.equal('12/22/2013 15:17:42');
        });

        it('should work correctly for root type "Number" and precision "0"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 0, null);

            expect(textValue).to.equal('12346');
        });

        it('should work correctly for root type "Number" and precision "1"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 1, null);

            expect(textValue).to.equal('12345.7');
        });

        it('should work correctly for root type "Number" and precision "2"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 2, null);

            expect(textValue).to.equal('12345.68');
        });

        it('should work correctly for root type "Number" and precision "3"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 3, null);

            expect(textValue).to.equal('12345.679');
        });

        it('should work correctly for root type "Number" and precision "4"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 4, null);

            expect(textValue).to.equal('12345.6789');
        });

        it('should work correctly for root type "Number" and precision "10"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(1.23456789, null, 'Number', 10, null);

            expect(textValue).to.equal('1.2345678900');
        });

    });

    describe('#getPacketFieldsForHeaders', () => {

        const header1 = new Packet({
            channel: 1,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('b8220000', 'hex'),
        });

        const header2 = new Packet({
            channel: 2,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('000048dd', 'hex'),
        });

        const header3 = new Packet({
            channel: 3,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E31,
            command: 0x0100,
            frameCount: 4,
            frameData: Buffer.from('2211221122112211221122112211221122112211', 'hex'), // data for five frames, but only four advertised
        });

        const rawSpecificationData1 = {
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

        const rawSpecificationData2 = {
            'filteredPacketFieldSpecs': [{
                'filteredPacketFieldId': 'DemoValue3',
                'packetId': '01_0010_7722_10_0100',
                'fieldId': '002_2_0',
                'name': 'T-return',
                'type': 'Number_0_1_DegreesFahrenheit',
            }]
        };

        it('should be a method', () => {
            expect(Specification.prototype.getPacketFieldsForHeaders).to.be.a('function');
        });

        it('should work correctly with an unfiltered spec', () => {
            const spec = new Specification();

            const pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

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
            expect(pfs [0].getRoundedRawValue).to.be.a('function');
            expect(pfs [0].getRoundedRawValue()).to.equal(888.8);
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
            expect(pfs [5].getRoundedRawValue).to.be.a('function');
            expect(pfs [5].getRoundedRawValue()).to.equal(-888.8);
        });

        it('should work correctly with a filtered spec', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData1
            });

            const pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

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

        it('should work correctly with a filtered spec but empty headers', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData1
            });

            const pfs = spec.getPacketFieldsForHeaders([]);

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

        it('should work correctly with a filtered spec and conversion', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData2
            });

            const pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expect(pfs).to.be.an('array');
            expect(pfs.length).to.equal(1);
            expect(pfs [0]).to.be.an('object');
            expect(pfs [0].id).to.equal('DemoValue3');
            expect(pfs [0].packet).to.be.an('object');
            expect(pfs [0].packetSpec).to.be.an('object');
            expect(pfs [0].packetFieldSpec).to.be.an('object');
            expect(pfs [0].origPacketFieldSpec).to.be.an('object');
            expect(pfs [0].name).to.equal('T-return');
            expect(pfs [0].rawValue).to.be.closeTo(32.0, 0.05);
            expect(pfs [0].formatTextValue).to.be.a('function');
            expect(pfs [0].formatTextValue()).to.equal('32.0 °F');
        });

        it('should work correctly for partial packets', () => {
            const spec = new Specification({
            });

            const pfs = spec.getPacketFieldsForHeaders([ header3 ]);

            expect(pfs).to.be.an('array');
            expect(pfs.length).to.equal(9);
            expect(pfs [4]).to.be.an('object');
            expect(pfs [4].id).to.equal('03_0010_7E31_10_0100_016_4_0');
            expect(pfs [4].packet).to.be.an('object');
            expect(pfs [4].packetSpec).to.be.an('object');
            expect(pfs [4].packetFieldSpec).to.be.an('object');
            expect(pfs [4].origPacketFieldSpec).to.be.an('object');
            expect(pfs [4].name).to.equal('Volume in total');
            expect(pfs [4].rawValue).to.equal(null);
            expect(pfs [4].formatTextValue).to.be.a('function');
            expect(pfs [4].formatTextValue()).to.equal('');
        });
    });

    describe('#setPacketFieldRawValues', () => {

        it('should be a method', () => {
            expect(Specification.prototype.setPacketFieldRawValues).to.be.a('function');
        });

        it('should work correctly with an unfiltered spec', () => {
            const spec = new Specification();

            const header1 = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7722,
                command: 0x0100,
                frameCount: 1,
                frameData: Buffer.from('b8220000', 'hex'),
            });

            const header2 = new Packet({
                channel: 2,
                destinationAddress: 0x0010,
                sourceAddress: 0x7722,
                command: 0x0100,
                frameCount: 1,
                frameData: Buffer.from('000048dd', 'hex'),
            });

            let pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            spec.setPacketFieldRawValues(pfs, {
                '01_0010_7722_10_0100_000_2_0': 123.4,   // Flow temperature
                '01_0010_7722_10_0100_002_2_0': -234.5,  // Return temperature
                '02_0010_7722_10_0100_000_2_0': 12.3,    // Flow temperature
                '02_0010_7722_10_0100_002_2_0': -23.4,   // Return temperature
            });

            expect(header1.frameData.slice(0, 4).toString('hex')).equal('d204d7f6');
            expect(header2.frameData.slice(0, 4).toString('hex')).equal('7b0016ff');

            pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expect(pfs).an('array').lengthOf(8);

            let pf = pfs [0];
            expect(pf).an('object');
            expect(pf).property('id').equal('01_0010_7722_10_0100_000_2_0');
            expect(pf).property('rawValue').closeTo(123.4, 0.05);

            pf = pfs [1];
            expect(pf).an('object');
            expect(pf).property('id').equal('01_0010_7722_10_0100_002_2_0');
            expect(pf).property('rawValue').closeTo(-234.5, 0.05);

            pf = pfs [4];
            expect(pf).an('object');
            expect(pf).property('id').equal('02_0010_7722_10_0100_000_2_0');
            expect(pf).property('rawValue').closeTo(12.3, 0.05);

            pf = pfs [5];
            expect(pf).an('object');
            expect(pf).property('id').equal('02_0010_7722_10_0100_002_2_0');
            expect(pf).property('rawValue').closeTo(-23.4, 0.05);
        });

        xit('should work for a value with many parts', () => {
            const spec = new Specification();

            const header1 = new Packet({
                channel: 1,
                destinationAddress: 0x0000,
                sourceAddress: 0x4010,
                command: 0x0100,
                frameCount: 6,
            });

            const headers = [ header1 ];

            let pfs = spec.getPacketFieldsForHeaders(headers);

            spec.setPacketFieldRawValues(pfs, {
                '01_0000_4010_10_0100_002_2_0': 123456789,  // Heat
            });

            expect(header1.frameData.readUInt16LE(2)).equal(789);
            expect(header1.frameData.readUInt16LE(0)).equal(456);
            expect(header1.frameData.readUInt16LE(12)).equal(123);

            pfs = spec.getPacketFieldsForHeaders(headers);

            expect(pfs).an('array').lengthOf(8);

            const pf = pfs [0];
            expect(pf).an('object');
            expect(pf).property('id').equal('01_0000_4010_10_0100_002_2_0');
            expect(pf).property('rawValue').closeTo(123456789, 0.05);
        });

    });

    describe('#getFilteredPacketFieldSpecificationsForHeaders', () => {

        const header1 = new Packet({
            channel: 1,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
        });

        const header2 = new Packet({
            channel: 2,
            destinationAddress: 0x0010,
            sourceAddress: 0x7722,
            command: 0x0100,
        });

        it('should be a method', () => {
            expect(Specification.prototype.getFilteredPacketFieldSpecificationsForHeaders).to.be.a('function');
        });

        it('should work correctly', () => {
            const spec = new Specification();

            const fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([ header1, header2 ]);

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

        it('should work correctly with empty headers', () => {
            const spec = new Specification();

            const fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([]);

            expect(fpfs).to.be.an('array');
            expect(fpfs.length).to.equal(0);
        });

    });

    const nonBlockTypeHeader1 = new Packet({
        channel: 1,
        destinationAddress: 0x0010,
        sourceAddress: 0x7721,
        command: 0x0100,
        // for the purpose of this test: valid BlockType data in a non-BlockType packet should be ignored
        frameCount: 7,
        frameData: Buffer.from('0108000064000000020a0000b822b82200000000010b00000b000000', 'hex'),
    });

    const blockTypeHeader1 = new Packet({
        channel: 1,
        destinationAddress: 0x0015,
        sourceAddress: 0x7721,
        command: 0x0100,
        frameCount: 7,
        frameData: Buffer.from('0108000064000000020a0000b822b82200000000010b00000b000000', 'hex'),
    });

    const blockTypeHeader2 = new Packet({
        channel: 1,
        destinationAddress: 0x0015,
        sourceAddress: 0x7721,
        command: 0x0100,
        frameCount: 26,
        frameData: Buffer.from([
            // type 1: temperatures
            '02010000',
            '23013402',
            '4503f1d8',

            // type 5: heat quantities
            '02050000',
            '23010000',
            '34020000',

            // type 8: relay speeds
            '02080000',
            '12233445',
            '5667ffff',

            // type 10: SmartDisplay SD3
            '020a0000',
            '23013402',
            '45030000',

            // type 11: error mask
            '010b0000',
            '23010000',

            // type 12: warning mask
            '010c0000',
            '23010000',

            // type 13: status mask
            '010d0000',
            '23010000',

            // type 14: SmartDisplay SD6
            '070e0000',
            '01020304',
            '05060708',
            '090a0b0c',
            '0d0e0f10',
            '11121314',
            '15161718',
            '191a1b1c',

        ].join(''), 'hex'),
    });

    describe('#getBlockTypeSectionsForHeaders', () => {

        const sectionKeys = [
            'sectionId',
            'surrogatePacketId',
            'packet',
            'packetSpec',
            'startOffset',
            'endOffset',
            'type',
            'payloadCount',
            'frameCount',
            'frameData',
        ].sort();

        it('should be a method', () => {
            expect(Specification.prototype).property('getBlockTypeSectionsForHeaders').a('function');
        });

        it('should work correctly', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            expect(sections).an('array').lengthOf(3);

            let section = sections [0];
            expect(section).an('object');
            expectOwnPropertyNamesToEqual(section, sectionKeys);
            expect(section).property('sectionId').a('string').equal('01_0015_7721_10_0100_01_08_4');
            expect(section).property('surrogatePacketId').a('string').equal('01_8015_4CB0_10_6413');
            expect(section).property('packet').an('object');
            expect(section).property('packetSpec').an('object');
            expect(section).property('startOffset').a('number').equal(0);
            expect(section).property('endOffset').a('number').equal(8);
            expect(section).property('type').a('number').equal(8);
            expect(section).property('payloadCount').a('number').equal(4);
            expect(section).property('frameCount').a('number').equal(1);
            expect(section).property('frameData');
            testUtils.expectToBeABuffer(section.frameData);

            let { frameData } = section;
            expect(frameData).property('length').a('number').equal(8);
            expect(frameData.toString('hex')).equal('0108000064000000');

            section = sections [1];
            expect(section).an('object');
            expectOwnPropertyNamesToEqual(section, sectionKeys);
            expect(section).property('sectionId').a('string').equal('01_0015_7721_10_0100_02_0A_1');
            expect(section).property('surrogatePacketId').a('string').equal('01_8015_6659_10_49D0');
            expect(section).property('packet').an('object');
            expect(section).property('packetSpec').an('object');
            expect(section).property('startOffset').a('number').equal(8);
            expect(section).property('endOffset').a('number').equal(20);
            expect(section).property('type').a('number').equal(10);
            expect(section).property('payloadCount').a('number').equal(1);
            expect(section).property('frameCount').a('number').equal(2);
            expect(section).property('frameData');
            testUtils.expectToBeABuffer(section.frameData);

            ({ frameData } = section);
            expect(frameData).property('length').a('number').equal(12);
            expect(frameData.toString('hex')).equal('020a0000b822b82200000000');

            section = sections [2];
            expect(section).an('object');
            expectOwnPropertyNamesToEqual(section, sectionKeys);
            expect(section).property('sectionId').a('string').equal('01_0015_7721_10_0100_01_0B_1');
            expect(section).property('surrogatePacketId').a('string').equal('01_8015_C162_10_EFC8');
            expect(section).property('packet').an('object');
            expect(section).property('packetSpec').an('object');
            expect(section).property('startOffset').a('number').equal(20);
            expect(section).property('endOffset').a('number').equal(28);
            expect(section).property('type').a('number').equal(11);
            expect(section).property('payloadCount').a('number').equal(1);
            expect(section).property('frameCount').a('number').equal(1);
            expect(section).property('frameData');
            testUtils.expectToBeABuffer(section.frameData);

            ({ frameData } = section);
            expect(frameData).property('length').a('number').equal(8);
            expect(frameData.toString('hex')).equal('010b00000b000000');
        });

        it('should work correctly #2', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ blockTypeHeader2 ]);

            const expectedValues = [
                [ '01_0015_7721_10_0100_02_01_4',  '01_8015_F61F_10_D62F',  0,  12, 2,  1,  4, '02010000230134024503f1d8' ],
                [ '01_0015_7721_10_0100_02_05_2',  '01_8015_1F24_10_D610', 12,  24, 2,  5,  2, '020500002301000034020000' ],
                [ '01_0015_7721_10_0100_02_08_8',  '01_8015_9C7A_10_CD43', 24,  36, 2,  8,  8, '02080000122334455667ffff' ],
                [ '01_0015_7721_10_0100_02_0A_1',  '01_8015_6659_10_49D0', 36,  48, 2, 10,  1, '020a00002301340245030000' ],
                [ '01_0015_7721_10_0100_01_0B_1',  '01_8015_C162_10_EFC8', 48,  56, 1, 11,  1, '010b000023010000' ],
                [ '01_0015_7721_10_0100_01_0C_1',  '01_8015_ACD9_10_F865', 56,  64, 1, 12,  1, '010c000023010000' ],
                [ '01_0015_7721_10_0100_01_0D_1',  '01_8015_BC2D_10_01BC', 64,  72, 1, 13,  1, '010d000023010000' ],
                [ '01_0015_7721_10_0100_07_0E_28', '01_8015_71B3_10_F8BB', 72, 104, 7, 14, 28, '070e00000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c' ],
            ];

            expect(sections).an('array').lengthOf(expectedValues.length);

            for (let index = 0; index < sections.length; index++) {
                const section = sections [index];
                const ev = expectedValues [index];

                const sectionId = ev [0];
                const surrogatePacketId = ev [1];
                const startOffset = ev [2];
                const endOffset = ev [3];
                const frameCount = ev [4];
                const type = ev [5];
                const payloadCount = ev [6];
                const frameData = ev [7];

                expect(section).an('object');
                expectOwnPropertyNamesToEqual(section, sectionKeys);
                expect(section).property('sectionId').a('string').equal(sectionId);
                expect(section).property('surrogatePacketId').a('string').equal(surrogatePacketId);
                expect(section).property('packet').an('object');
                expect(section).property('packetSpec').an('object');
                expect(section).property('startOffset').a('number').equal(startOffset);
                expect(section).property('endOffset').a('number').equal(endOffset);
                expect(section).property('type').a('number').equal(type);
                expect(section).property('payloadCount').a('number').equal(payloadCount);
                expect(section).property('frameCount').a('number').equal(frameCount);
                expect(section).property('frameData');
                testUtils.expectToBeABuffer(section.frameData);

                expect(section.frameData.toString('hex')).equal(frameData);
            }
        });

    });

    describe('#getBlockTypePacketSpecificationsForSections', () => {

        it('should be a method', () => {
            expect(Specification.prototype).property('getBlockTypePacketSpecificationsForSections').a('function');
        });

        it('should work correctly', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            const packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            expect(packetSpecs).an('array').lengthOf(3);

            const packetSpecKeys = [
                'packetId',
                'sectionId',
                'packetFields',

                'channel',
                'destinationAddress',
                'sourceAddress',
                'protocolVersion',
                'command',
                'info',
                'fullName',
                'destinationDevice',
                'sourceDevice',
            ].sort();

            const packetFieldSpecKeys = [
                'fieldId',
                'name',
                'type',
                'factor',
                'parts',
                'getRawValue',
                'setRawValue',
            ].sort();

            let packetSpec = packetSpecs [0];
            expect(packetSpec).an('object');
            expectOwnPropertyNamesToEqual(packetSpec, packetSpecKeys);
            expect(packetSpec).property('packetId').a('string').equal('01_8015_4CB0_10_6413');
            expect(packetSpec).property('sectionId').a('string').equal('01_0015_7721_10_0100_01_08_4');
            expect(packetSpec).property('packetFields').an('array').lengthOf(4);
            expect(packetSpec).property('channel').a('number').equal(1);
            expect(packetSpec).property('destinationAddress').a('number').equal(0x0015);
            expect(packetSpec).property('sourceAddress').a('number').equal(0x7721);
            expect(packetSpec).property('protocolVersion').a('number').equal(0x10);
            expect(packetSpec).property('command').a('number').equal(0x0100);
            expect(packetSpec).property('info').a('number').equal(0);
            expect(packetSpec).property('fullName').a('string').equal('VBus #1: DeltaSol E [Regler] => Standard-Infos');
            expect(packetSpec).property('destinationDevice').an('object');
            expect(packetSpec).property('sourceDevice').an('object');

            let pfs = packetSpec.packetFields [0];
            expect(pfs).an('object');
            expectOwnPropertyNamesToEqual(pfs, packetFieldSpecKeys);
            expect(pfs).property('fieldId').a('string').equal('01_0015_7721_10_0100_01_08_4_004_1_0');
            expect(pfs).property('name').a('string').equal('Drehzahl Relais 1');
            expect(pfs).property('type').an('object').property('typeId').a('string').equal('Number_1_Percent');
            expect(pfs).property('factor').a('number').equal(1);
            expect(pfs).property('parts').an('array').lengthOf(1);
            expect(pfs).property('getRawValue').a('function');
            expect(pfs).property('setRawValue').a('function');

            let rawValue = pfs.getRawValue(sections [0].frameData, 0, sections [0].frameData.length);
            expect(rawValue).a('number').equal(100);

            packetSpec = packetSpecs [1];
            expect(packetSpec).an('object');
            expectOwnPropertyNamesToEqual(packetSpec, packetSpecKeys);
            expect(packetSpec).property('packetId').a('string').equal('01_8015_6659_10_49D0');
            expect(packetSpec).property('sectionId').a('string').equal('01_0015_7721_10_0100_02_0A_1');
            expect(packetSpec).property('packetFields').an('array').lengthOf(3);
            expect(packetSpec).property('channel').a('number').equal(1);
            expect(packetSpec).property('destinationAddress').a('number').equal(0x0015);
            expect(packetSpec).property('sourceAddress').a('number').equal(0x7721);
            expect(packetSpec).property('protocolVersion').a('number').equal(0x10);
            expect(packetSpec).property('command').a('number').equal(0x0100);
            expect(packetSpec).property('info').a('number').equal(0);
            expect(packetSpec).property('fullName').a('string').equal('VBus #1: DeltaSol E [Regler] => Standard-Infos');
            expect(packetSpec).property('destinationDevice').an('object');
            expect(packetSpec).property('sourceDevice').an('object');

            pfs = packetSpec.packetFields [0];
            expect(pfs).an('object');
            expectOwnPropertyNamesToEqual(pfs, packetFieldSpecKeys);
            expect(pfs).property('fieldId').a('string').equal('01_0015_7721_10_0100_02_0A_1_004_2_0');
            expect(pfs).property('name').a('string').equal('Temperatur Kollektor');
            expect(pfs).property('type').an('object').property('typeId').a('string').equal('Number_0_1_DegreesCelsius');
            expect(pfs).property('factor').a('number').equal(0.1);
            expect(pfs).property('parts').an('array').lengthOf(2);
            expect(pfs).property('getRawValue').a('function');
            expect(pfs).property('setRawValue').a('function');

            rawValue = pfs.getRawValue(sections [1].frameData, 0, sections [1].frameData.length);
            expect(rawValue).a('number').closeTo(888.8, 0.05);

            packetSpec = packetSpecs [2];
            expect(packetSpec).an('object');
            expectOwnPropertyNamesToEqual(packetSpec, packetSpecKeys);
            expect(packetSpec).property('packetId').a('string').equal('01_8015_C162_10_EFC8');
            expect(packetSpec).property('sectionId').a('string').equal('01_0015_7721_10_0100_01_0B_1');
            expect(packetSpec).property('packetFields').an('array').lengthOf(1);
            expect(packetSpec).property('channel').a('number').equal(1);
            expect(packetSpec).property('destinationAddress').a('number').equal(0x0015);
            expect(packetSpec).property('sourceAddress').a('number').equal(0x7721);
            expect(packetSpec).property('protocolVersion').a('number').equal(0x10);
            expect(packetSpec).property('command').a('number').equal(0x0100);
            expect(packetSpec).property('info').a('number').equal(0);
            expect(packetSpec).property('fullName').a('string').equal('VBus #1: DeltaSol E [Regler] => Standard-Infos');
            expect(packetSpec).property('destinationDevice').an('object');
            expect(packetSpec).property('sourceDevice').an('object');

            pfs = packetSpec.packetFields [0];
            expect(pfs).an('object');
            expectOwnPropertyNamesToEqual(pfs, packetFieldSpecKeys);
            expect(pfs).property('fieldId').a('string').equal('01_0015_7721_10_0100_01_0B_1_004_4_0');
            expect(pfs).property('name').a('string').equal('Fehlermaske');
            expect(pfs).property('type').an('object').property('typeId').a('string').equal('Number_1_None');
            expect(pfs).property('factor').a('number').equal(1);
            expect(pfs).property('parts').an('array').lengthOf(4);
            expect(pfs).property('getRawValue').a('function');
            expect(pfs).property('setRawValue').a('function');

            rawValue = pfs.getRawValue(sections [2].frameData, 0, sections [2].frameData.length);
            expect(rawValue).a('number').equal(11);
        });

    });

    describe('#getBlockTypeFieldsForSections', () => {

        it('should be a method', () => {
            expect(Specification.prototype).property('getBlockTypeFieldsForSections').a('function');
        });

        it('should work correctly', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            const packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            const packetFields = spec.getBlockTypeFieldsForSections(sections);

            expect(packetFields).an('array').lengthOf(8);

            const packetFieldKeys = [
                'id',
                'section',
                'packet',
                'packetSpec',
                'packetFieldSpec',
                'origPacketFieldSpec',
                'name',
                'rawValue',
                'formatTextValue',
            ].sort();

            let packetField = packetFields [0];
            expect(packetField).an('object');
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField).property('id').a('string').equal('01_8015_4CB0_10_6413_01_0015_7721_10_0100_01_08_4_004_1_0');
            expect(packetField).property('section').an('object').equal(sections [0]);
            expect(packetField).property('packet').an('object').equal(blockTypeHeader1);
            expect(packetField).property('packetSpec').an('object').equal(packetSpecs [0]);
            expect(packetField).property('packetFieldSpec').an('object').equal(packetSpecs [0].packetFields [0]);
            expect(packetField).property('origPacketFieldSpec').an('object').equal(packetSpecs [0].packetFields [0]);
            expect(packetField).property('name').a('string').equal('Pump speed relay 1');
            expect(packetField).property('rawValue').a('number').equal(100);
            expect(packetField).property('formatTextValue').a('function');

            let textValue = packetField.formatTextValue();
            expect(textValue).a('string').equal('100%');

            packetField = packetFields [1];
            expect(packetField).an('object');
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField).property('id').a('string').equal('01_8015_4CB0_10_6413_01_0015_7721_10_0100_01_08_4_005_1_0');
            expect(packetField).property('section').an('object').equal(sections [0]);
            expect(packetField).property('packet').an('object').equal(blockTypeHeader1);
            expect(packetField).property('packetSpec').an('object').equal(packetSpecs [0]);
            expect(packetField).property('packetFieldSpec').an('object').equal(packetSpecs [0].packetFields [1]);
            expect(packetField).property('origPacketFieldSpec').an('object').equal(packetSpecs [0].packetFields [1]);
            expect(packetField).property('name').a('string').equal('Pump speed relay 2');
            expect(packetField).property('rawValue').a('number').equal(0);
            expect(packetField).property('formatTextValue').a('function');

            textValue = packetField.formatTextValue();
            expect(textValue).a('string').equal('0%');

            packetField = packetFields [4];
            expect(packetField).an('object');
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField).property('id').a('string').equal('01_8015_6659_10_49D0_01_0015_7721_10_0100_02_0A_1_004_2_0');
            expect(packetField).property('section').an('object').equal(sections [1]);
            expect(packetField).property('packet').an('object').equal(blockTypeHeader1);
            expect(packetField).property('packetSpec').an('object').equal(packetSpecs [1]);
            expect(packetField).property('packetFieldSpec').an('object').equal(packetSpecs [1].packetFields [0]);
            expect(packetField).property('origPacketFieldSpec').an('object').equal(packetSpecs [1].packetFields [0]);
            expect(packetField).property('name').a('string').equal('Temperatur Kollektor');
            expect(packetField).property('rawValue').a('number').closeTo(888.8, 0.05);
            expect(packetField).property('formatTextValue').a('function');

            textValue = packetField.formatTextValue();
            expect(textValue).a('string').equal('888.8 °C');

            packetField = packetFields [6];
            expect(packetField).an('object');
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField).property('id').a('string').equal('01_8015_6659_10_49D0_01_0015_7721_10_0100_02_0A_1_008_4_0');
            expect(packetField).property('section').an('object').equal(sections [1]);
            expect(packetField).property('packet').an('object').equal(blockTypeHeader1);
            expect(packetField).property('packetSpec').an('object').equal(packetSpecs [1]);
            expect(packetField).property('packetFieldSpec').an('object').equal(packetSpecs [1].packetFields [2]);
            expect(packetField).property('origPacketFieldSpec').an('object').equal(packetSpecs [1].packetFields [2]);
            expect(packetField).property('name').a('string').equal('Heat quantity');
            expect(packetField).property('rawValue').a('number').equal(0);
            expect(packetField).property('formatTextValue').a('function');

            textValue = packetField.formatTextValue();
            expect(textValue).a('string').equal('0 Wh');

            packetField = packetFields [7];
            expect(packetField).an('object');
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField).property('id').a('string').equal('01_8015_C162_10_EFC8_01_0015_7721_10_0100_01_0B_1_004_4_0');
            expect(packetField).property('section').an('object').equal(sections [2]);
            expect(packetField).property('packet').an('object').equal(blockTypeHeader1);
            expect(packetField).property('packetSpec').an('object').equal(packetSpecs [2]);
            expect(packetField).property('packetFieldSpec').an('object').equal(packetSpecs [2].packetFields [0]);
            expect(packetField).property('origPacketFieldSpec').an('object').equal(packetSpecs [2].packetFields [0]);
            expect(packetField).property('name').a('string').equal('Error mask');
            expect(packetField).property('rawValue').a('number').equal(11);
            expect(packetField).property('formatTextValue').a('function');

            textValue = packetField.formatTextValue();
            expect(textValue).a('string').equal('11');
        });

        it('should work correctly #2', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ blockTypeHeader2 ]);

            const packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            const packetFields = spec.getBlockTypeFieldsForSections(sections);

            const expectedValues = [
                [ '01_8015_F61F_10_D62F_01_0015_7721_10_0100_02_01_4_004_2_0',  0,  0, 'Temperature sensor 1', 29.1, '29.1 °C' ],
                [ '01_8015_F61F_10_D62F_01_0015_7721_10_0100_02_01_4_006_2_0',  0,  1, 'Temperature sensor 2', 56.4, '56.4 °C' ],
                [ '01_8015_F61F_10_D62F_01_0015_7721_10_0100_02_01_4_008_2_0',  0,  2, 'Temperature sensor 3', 83.7, '83.7 °C' ],
                [ '01_8015_F61F_10_D62F_01_0015_7721_10_0100_02_01_4_010_2_0',  0,  3, 'Temperature sensor 4', -999.9, '-999.9 °C' ],
                [ '01_8015_1F24_10_D610_01_0015_7721_10_0100_02_05_2_004_4_0',  1,  0, 'Heat quantity 1', 291, '291 Wh' ],
                [ '01_8015_1F24_10_D610_01_0015_7721_10_0100_02_05_2_008_4_0',  1,  1, 'Heat quantity 2', 564, '564 Wh' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_004_1_0',  2,  0, 'Pump speed relay 1', 18, '18%' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_005_1_0',  2,  1, 'Pump speed relay 2', 35, '35%' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_006_1_0',  2,  2, 'Pump speed relay 3', 52, '52%' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_007_1_0',  2,  3, 'Pump speed relay 4', 69, '69%' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_008_1_0',  2,  4, 'Pump speed relay 5', 86, '86%' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_009_1_0',  2,  5, 'Pump speed relay 6', 103, '103%' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_010_1_0',  2,  6, 'Pump speed relay 7', 255, '255%' ],
                [ '01_8015_9C7A_10_CD43_01_0015_7721_10_0100_02_08_8_011_1_0',  2,  7, 'Pump speed relay 8', 255, '255%' ],
                [ '01_8015_6659_10_49D0_01_0015_7721_10_0100_02_0A_1_004_2_0',  3,  0, 'Temperatur Kollektor', 29.1, '29.1 °C' ],
                [ '01_8015_6659_10_49D0_01_0015_7721_10_0100_02_0A_1_006_2_0',  3,  1, 'Temperatur Speicher', 56.4, '56.4 °C' ],
                [ '01_8015_6659_10_49D0_01_0015_7721_10_0100_02_0A_1_008_4_0',  3,  2, 'Heat quantity', 837, '837 Wh' ],
                [ '01_8015_C162_10_EFC8_01_0015_7721_10_0100_01_0B_1_004_4_0',  4,  0, 'Error mask', 291, '291' ],
                [ '01_8015_ACD9_10_F865_01_0015_7721_10_0100_01_0C_1_004_4_0',  5,  0, 'Warning mask', 291, '291' ],
                [ '01_8015_BC2D_10_01BC_01_0015_7721_10_0100_01_0D_1_004_4_0',  6,  0, 'Statusmaske', 291, '291' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_004_1_0', 7,  0, 'Segmentmaske 1', 1, '1' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_005_1_0', 7,  1, 'Segmentmaske 2', 2, '2' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_006_1_0', 7,  2, 'Segmentmaske 3', 3, '3' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_007_1_0', 7,  3, 'Segmentmaske 4', 4, '4' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_008_1_0', 7,  4, 'Segmentmaske 5', 5, '5' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_009_1_0', 7,  5, 'Segmentmaske 6', 6, '6' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_010_1_0', 7,  6, 'Segmentmaske 7', 7, '7' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_011_1_0', 7,  7, 'Segmentmaske 8', 8, '8' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_012_1_0', 7,  8, 'Segmentmaske 9', 9, '9' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_013_1_0', 7,  9, 'Segmentmaske 10', 10, '10' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_014_1_0', 7, 10, 'Segmentmaske 11', 11, '11' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_015_1_0', 7, 11, 'Segmentmaske 12', 12, '12' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_016_1_0', 7, 12, 'Segmentmaske 13', 13, '13' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_017_1_0', 7, 13, 'Segmentmaske 14', 14, '14' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_018_1_0', 7, 14, 'Segmentmaske 15', 15, '15' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_019_1_0', 7, 15, 'Segmentmaske 16', 16, '16' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_020_1_0', 7, 16, 'Segmentmaske 17', 17, '17' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_021_1_0', 7, 17, 'Segmentmaske 18', 18, '18' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_022_1_0', 7, 18, 'Segmentmaske 19', 19, '19' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_023_1_0', 7, 19, 'Segmentmaske 20', 20, '20' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_024_1_0', 7, 20, 'Segmentmaske 21', 21, '21' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_025_1_0', 7, 21, 'Segmentmaske 22', 22, '22' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_026_1_0', 7, 22, 'Segmentmaske 23', 23, '23' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_027_1_0', 7, 23, 'Segmentmaske 24', 24, '24' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_028_1_0', 7, 24, 'Segmentmaske 25', 25, '25' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_029_1_0', 7, 25, 'Segmentmaske 26', 26, '26' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_030_1_0', 7, 26, 'Segmentmaske 27', 27, '27' ],
                [ '01_8015_71B3_10_F8BB_01_0015_7721_10_0100_07_0E_28_031_1_0', 7, 27, 'Segmentmaske 28', 28, '28' ],
            ];

            expect(packetFields).an('array').lengthOf(expectedValues.length);

            const packetFieldKeys = [
                'id',
                'section',
                'packet',
                'packetSpec',
                'packetFieldSpec',
                'origPacketFieldSpec',
                'name',
                'rawValue',
                'formatTextValue',
            ].sort();

            for (let index = 0; index < packetFields.length; index++) {
                const packetField = packetFields [index];
                const ev = expectedValues [index];

                const id = ev [0];
                const sectionIndex = ev [1];
                const fieldIndex = ev [2];
                const name = ev [3];
                const rawValue = ev [4];
                const textValue = ev [5];

                expect(packetField).an('object');
                expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
                expect(packetField).property('id').a('string').equal(id);
                expect(packetField).property('section').an('object').equal(sections [sectionIndex]);
                expect(packetField).property('packet').an('object').equal(blockTypeHeader2);
                expect(packetField).property('packetSpec').an('object').equal(packetSpecs [sectionIndex]);
                expect(packetField).property('packetFieldSpec').an('object').equal(packetSpecs [sectionIndex].packetFields [fieldIndex]);
                expect(packetField).property('origPacketFieldSpec').an('object').equal(packetSpecs [sectionIndex].packetFields [fieldIndex]);
                expect(packetField).property('name').a('string').equal(name);
                expect(packetField).property('rawValue').a('number').closeTo(rawValue, 0.0005);
                expect(packetField).property('formatTextValue').a('function');

                expect(packetField.formatTextValue()).a('string').equal(textValue);
            }
        });

    });

    /*

    it('should get unknown packet fields with filter', function() {
        var buffer = Buffer.from('aa10002277100001034224012701003200006401001a350201000047', 'hex');

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

    testUtils.itShouldWorkCorrectlyAfterMigratingToClass(Specification, null, {
        language: 'en',
        deviceSpecCache: null,
        packetSpecCache: null,
        blockTypePacketSpecCache: null,
        i18n: null,
        specificationData: null,
        constructor: Function,
        getUnitById: Function,
        getTypeById: Function,
        getDeviceSpecification: Function,
        getPacketSpecification: Function,
        getPacketFieldSpecification: Function,
        getRawValue: Function,
        getRoundedRawValue: Function,
        invertConversions: Function,
        setRawValue: Function,
        convertRawValue: Function,
        _convertTemperatureRawValue: Function,
        _convertVolumeRawValue: Function,
        _convertVolumeFlowRawValue: Function,
        _convertPressureRawValue: Function,
        _convertEnergyRawValue: Function,
        _convertPowerRawValue: Function,
        _convertTimeRawValue: Function,
        formatTextValueFromRawValue: Function,
        formatTextValueFromRawValueInternal: Function,
        getPacketFieldsForHeaders: Function,
        setPacketFieldRawValues: Function,
        getFilteredPacketFieldSpecificationsForHeaders: Function,
        getBlockTypeSectionsForHeaders: Function,
        _createUInt8BlockTypeFieldSpecification: Function,
        _createInt16BlockTypeFieldSpecification: Function,
        _createUInt32BlockTypeFieldSpecification: Function,
        getBlockTypePacketSpecificationsForSections: Function,
        getBlockTypeFieldsForSections: Function,
    }, {
        loadSpecificationData: Function,
        storeSpecificationData: Function,
        getDefaultSpecification: Function,
    });

});
