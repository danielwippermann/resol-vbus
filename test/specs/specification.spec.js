/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


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
                'getRawValue': '_0010_7722_0100_000_2_0',
                'setRawValue': '_0010_7722_0100_000_2_0'
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

    describe('#getUnitById', function() {

        it('should be a method', function() {
            expect(Specification.prototype.getUnitById).to.be.a('function');
        });

        it('should work correctly for known units', function() {
            var spec = new Specification();

            var unit = spec.getUnitById('None');

            expect(unit).to.be.an('object');
        });

        it('should work correctly for unknown units', function() {
            var spec = new Specification();

            var unit = spec.getUnitById('Unknown');

            expect(unit).to.equal(undefined);
        });

    });

    describe('#getTypeById', function() {

        it('should be a method', function() {
            expect(Specification.prototype.getTypeById).to.be.a('function');
        });

        it('should work correctly for known types', function() {
            var spec = new Specification();

            var unit = spec.getTypeById('Number_1_None');

            expect(unit).to.be.an('object');
        });

        it('should work correctly for unknown types', function() {
            var spec = new Specification();

            var unit = spec.getTypeById('Unknown');

            expect(unit).to.equal(undefined);
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
            expect(deviceSpec.channel).to.equal(0);
            expect(deviceSpec.selfAddress).to.equal(0x7721);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
            expect(deviceSpec.name).to.equal('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).to.equal('DeltaSol E [Regler]');
        });

        it('should work correctly with a number triple', function() {
            var spec = new Specification();

            var deviceSpec = spec.getDeviceSpecification(0x7721, 0x0010, 1);

            expect(deviceSpec).to.be.an('object');
            expect(deviceSpec.deviceId).to.be.a('string');
            expect(deviceSpec.channel).to.equal(1);
            expect(deviceSpec.selfAddress).to.equal(0x7721);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
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
            expect(deviceSpec.channel).to.equal(1);
            expect(deviceSpec.selfAddress).to.equal(0x7721);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
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
            expect(deviceSpec.channel).to.equal(1);
            expect(deviceSpec.selfAddress).to.equal(0x772F);
            expect(deviceSpec.peerAddress).to.equal(0x0010);
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

        it('should work correctly with a packet ID string with protocol version', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification('01_0010_7721_10_0100');

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

        it('should work correctly with a packet ID string without protocol version', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification('01_0010_7721_0100');

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

        it('should work correctly with a packet field ID string', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification('01_0010_7721_10_0100_000_2_0');

            expect(packetSpec).to.be.an('object');
            expect(packetSpec.packetId).to.be.a('string');
            expect(packetSpec.destinationDevice).to.be.an('object');
            expect(packetSpec.sourceDevice).to.be.an('object');
            expect(packetSpec.packetFields).to.be.an('array');
            expect(packetSpec.packetFields.length).to.be.above(0);
        });

    });

    describe('#getPacketFieldSpecification', function() {

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

        it('should be a method', function() {
            expect(Specification.prototype.getPacketFieldSpecification).to.be.a('function');
        });

        it('should work correctly with a packet spec and a field ID', function() {
            var spec = new Specification();

            var packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            var packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.a('string');
            expect(packetFieldSpec.type).to.be.an('object');
            expect(packetFieldSpec.type.typeId).to.be.a('string');
            expect(packetFieldSpec.type.rootTypeId).to.be.a('string');
            expect(packetFieldSpec.type.precision).to.be.a('number');
            expect(packetFieldSpec.type.unit).to.be.an('object');
            expect(packetFieldSpec.type.unit.unitCode).to.be.a('string');
            expect(packetFieldSpec.type.unit.unitText).to.be.a('string');
        });

        it('should work correctly with a packet field ID string with protocol version', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.a('string');
            expect(packetFieldSpec.type).to.be.an('object');
            expect(packetFieldSpec.type.typeId).to.be.a('string');
            expect(packetFieldSpec.type.rootTypeId).to.be.a('string');
            expect(packetFieldSpec.type.precision).to.be.a('number');
            expect(packetFieldSpec.type.unit).to.be.an('object');
            expect(packetFieldSpec.type.unit.unitCode).to.be.a('string');
            expect(packetFieldSpec.type.unit.unitText).to.be.a('string');
        });

        it('should work correctly with a packet field ID string without protocol version', function() {
            var spec = new Specification();

            var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_0100_000_2_0');

            expect(packetFieldSpec).to.be.an('object');
            expect(packetFieldSpec.fieldId).to.be.a('string');
            expect(packetFieldSpec.name).to.be.a('string');
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

        it('should work correctly with a filtered spec and a custom ID string', function() {
            var spec = new Specification({
                specificationData: rawSpecificationData1
            });

            var packetFieldSpec = spec.getPacketFieldSpecification('DemoValue1');

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

        it('should work correctly with a filtered spec and conversion', function() {
            var rawSpecificationData1 = {
                'filteredPacketFieldSpecs': [{
                    'filteredPacketFieldId': 'DemoValue1',
                    'packetId': '01_0010_7721_10_0100',
                    'fieldId': '000_2_0',
                    'name': 'T1',
                    'type': 'Number_0_1_DegreesFahrenheit',
                }]
            };
            var spec = new Specification({
                specificationData: rawSpecificationData1,
            });

            var packetFieldSpec = spec.getPacketFieldSpecification('DemoValue1');

            var buffer = new Buffer('0000', 'hex');

            var rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).to.be.closeTo(32.0, 0.05);
        });

    });

    describe('#convertRawValue', function() {

        var specData = Specification.loadSpecificationData();

        var unitsByFamily = {};

        var knownFamilyUnitCodes = [];

        _.forEach(specData.units, function(unit) {
            var uf = unit.unitFamily;
            if (uf) {
                if (!_.has(unitsByFamily, uf)) {
                    unitsByFamily [uf] = [];
                }

                unitsByFamily [uf].push(unit);
                knownFamilyUnitCodes.push(unit.unitCode);
            }
        });

        var content = [];
        _.forEach(_.keys(unitsByFamily).sort(), function(uf) {
            var units = unitsByFamily [uf];

            content.push('describe(\'Unit Family ' + JSON.stringify(uf) + '\', function() {');
            content.push('');
            // content.push('var units = unitsByFamily [\'' + uf + '\'];');
            // content.push('');

            _.forEach(units, function(sourceUnit, index) {
                var targetUnit = units [index + 1] || units [0];

                content.push('it(\'should convert from ' + JSON.stringify(sourceUnit.unitCode) + ' to ' + JSON.stringify(targetUnit.unitCode) + '\', function() {');
                content.push('expectConversion(0, \'' + sourceUnit.unitCode + '\', \'' + targetUnit.unitCode + '\').closeTo(undefined, delta);');
                content.push('expectConversion(1000000, \'' + sourceUnit.unitCode + '\', \'' + targetUnit.unitCode + '\').closeTo(undefined, delta);');
                content.push('});');
                content.push('');
            });

            content.push('});');
            content.push('');
        });

        // console.log(content.join('\n'));

        it('should be a method', function() {
            expect(Specification.prototype).property('convertRawValue').a('function');
        });

        var checkedSourceUnitCodes = [];
        var checkedTargetUnitCodes = [];

        var expectConversion = function(rawValue, sourceUnitCode, targetUnitCode) {
            checkedSourceUnitCodes.push(sourceUnitCode);
            checkedTargetUnitCodes.push(targetUnitCode);

            var spec = new Specification();

            var sourceUnit = specData.units [sourceUnitCode];
            var targetUnit = specData.units [targetUnitCode];

            expect(sourceUnit).a('object').property('unitCode').equal(sourceUnitCode);
            expect(targetUnit).a('object').property('unitCode').equal(targetUnitCode);

            var error, result;
            try {
                result = spec.convertRawValue(rawValue, sourceUnit, targetUnit);
            } catch (ex) {
                error = ex;
            }

            expect(error).equal(undefined);
            expect(result).a('object').property('unit').equal(targetUnit);

            return expect(result).property('rawValue').a('number');
        };

        var delta = 0.000000001;

        describe('Unit Family "Energy"', function() {

            it('should convert from "Btus" to "GramsCO2Gas"', function() {
                expectConversion(0, 'Btus', 'GramsCO2Gas').closeTo(0, delta);
                expectConversion(1000000, 'Btus', 'GramsCO2Gas').closeTo(74323.12035187425, delta);
            });

            it('should convert from "GramsCO2Gas" to "GramsCO2Oil"', function() {
                expectConversion(0, 'GramsCO2Gas', 'GramsCO2Oil').closeTo(0, delta);
                expectConversion(10, 'GramsCO2Gas', 'GramsCO2Oil').closeTo(22.397476, 0.0000005);
            });

            it('should convert from "GramsCO2Oil" to "KiloBtus"', function() {
                expectConversion(0, 'GramsCO2Oil', 'KiloBtus').closeTo(0, delta);
                expectConversion(1000000, 'GramsCO2Oil', 'KiloBtus').closeTo(6007.267605633803, delta);
            });

            it('should convert from "KiloBtus" to "KilogramsCO2Gas"', function() {
                expectConversion(0, 'KiloBtus', 'KilogramsCO2Gas').closeTo(0, delta);
                expectConversion(1000000, 'KiloBtus', 'KilogramsCO2Gas').closeTo(74323.12035187425, delta);
            });

            it('should convert from "KilogramsCO2Gas" to "KilogramsCO2Oil"', function() {
                expectConversion(0, 'KilogramsCO2Gas', 'KilogramsCO2Oil').closeTo(0, delta);
                expectConversion(10, 'KilogramsCO2Gas', 'KilogramsCO2Oil').closeTo(22.397476, 0.0000005);
            });

            it('should convert from "KilogramsCO2Oil" to "KilowattHours"', function() {
                expectConversion(0, 'KilogramsCO2Oil', 'KilowattHours').closeTo(0, delta);
                expectConversion(1000000, 'KilogramsCO2Oil', 'KilowattHours').closeTo(1760563.3802816903, delta);
            });

            it('should convert from "KilowattHours" to "MegaBtus"', function() {
                expectConversion(0, 'KilowattHours', 'MegaBtus').closeTo(0, delta);
                expectConversion(1000000, 'KilowattHours', 'MegaBtus').closeTo(3412.128, delta);
            });

            it('should convert from "MegaBtus" to "MegawattHours"', function() {
                expectConversion(0, 'MegaBtus', 'MegawattHours').closeTo(0, delta);
                expectConversion(1, 'MegaBtus', 'MegawattHours').closeTo(0.293072241, delta);
            });

            it('should convert from "MegawattHours" to "TonsCO2Gas"', function() {
                expectConversion(0, 'MegawattHours', 'TonsCO2Gas').closeTo(0, delta);
                expectConversion(1000000, 'MegawattHours', 'TonsCO2Gas').closeTo(253600, delta);
            });

            it('should convert from "TonsCO2Gas" to "TonsCO2Oil"', function() {
                expectConversion(0, 'TonsCO2Gas', 'TonsCO2Oil').closeTo(0, delta);
                expectConversion(10, 'TonsCO2Gas', 'TonsCO2Oil').closeTo(22.397476, 0.0000005);
            });

            it('should convert from "TonsCO2Oil" to "WattHours"', function() {
                expectConversion(0, 'TonsCO2Oil', 'WattHours').closeTo(0, delta);
                expectConversion(10, 'TonsCO2Oil', 'WattHours').closeTo(17605633.8, 0.05);
            });

            it('should convert from "WattHours" to "Btus"', function() {
                expectConversion(0, 'WattHours', 'Btus').closeTo(0, delta);
                expectConversion(1000000, 'WattHours', 'Btus').closeTo(3412128, delta);
            });

        });

        describe('Unit Family "Pressure"', function() {

            it('should convert from "Bars" to "PoundsForcePerSquareInch"', function() {
                expectConversion(0, 'Bars', 'PoundsForcePerSquareInch').closeTo(0, delta);
                expectConversion(10, 'Bars', 'PoundsForcePerSquareInch').closeTo(145.037738, delta);
            });

            it('should convert from "PoundsForcePerSquareInch" to "Bars"', function() {
                expectConversion(0, 'PoundsForcePerSquareInch', 'Bars').closeTo(0, delta);
                expectConversion(100, 'PoundsForcePerSquareInch', 'Bars').closeTo(6.89475728, delta);
            });

        });

        describe('Unit Family "Temperature"', function() {

            it('should convert from "DegreesCelsius" to "DegreesFahrenheit"', function() {
                expectConversion(0, 'DegreesCelsius', 'DegreesFahrenheit').closeTo(32, delta);
                expectConversion(100, 'DegreesCelsius', 'DegreesFahrenheit').closeTo(212, delta);
            });

            it('should convert from "DegreesFahrenheit" to "DegreesCelsius"', function() {
                expectConversion(32, 'DegreesFahrenheit', 'DegreesCelsius').closeTo(0, delta);
                expectConversion(212, 'DegreesFahrenheit', 'DegreesCelsius').closeTo(100, delta);
            });

        });

        describe('Unit Family "Time"', function() {

            it('should convert from "Days" to "Hours"', function() {
                expectConversion(0, 'Days', 'Hours').closeTo(0, delta);
                expectConversion(10, 'Days', 'Hours').closeTo(240, delta);
            });

            it('should convert from "Hours" to "Minutes"', function() {
                expectConversion(0, 'Hours', 'Minutes').closeTo(0, delta);
                expectConversion(10, 'Hours', 'Minutes').closeTo(600, delta);
            });

            it('should convert from "Minutes" to "Seconds"', function() {
                expectConversion(0, 'Minutes', 'Seconds').closeTo(0, delta);
                expectConversion(10, 'Minutes', 'Seconds').closeTo(600, delta);
            });

            it('should convert from "Seconds" to "Days"', function() {
                expectConversion(0, 'Seconds', 'Days').closeTo(0, delta);
                expectConversion(86400, 'Seconds', 'Days').closeTo(1, delta);
            });

        });

        describe('Unit Family "Volume"', function() {

            it('should convert from "CubicMeters" to "Gallons"', function() {
                expectConversion(0, 'CubicMeters', 'Gallons').closeTo(0, delta);
                expectConversion(10, 'CubicMeters', 'Gallons').closeTo(2641.72, 0.005);
            });

            it('should convert from "Gallons" to "Liters"', function() {
                expectConversion(0, 'Gallons', 'Liters').closeTo(0, delta);
                expectConversion(10, 'Gallons', 'Liters').closeTo(37.8541, 0.00005);
            });

            it('should convert from "Liters" to "CubicMeters"', function() {
                expectConversion(0, 'Liters', 'CubicMeters').closeTo(0, delta);
                expectConversion(10000, 'Liters', 'CubicMeters').closeTo(10, delta);
            });

        });

        describe('Unit Family "VolumeFlow"', function() {

            it('should convert from "CubicMetersPerHour" to "GallonsPerHour"', function() {
                expectConversion(0, 'CubicMetersPerHour', 'GallonsPerHour').closeTo(0, delta);
                expectConversion(10, 'CubicMetersPerHour', 'GallonsPerHour').closeTo(2641.72, 0.005);
            });

            it('should convert from "GallonsPerHour" to "GallonsPerMinute"', function() {
                expectConversion(0, 'GallonsPerHour', 'GallonsPerMinute').closeTo(0, delta);
                expectConversion(600, 'GallonsPerHour', 'GallonsPerMinute').closeTo(10, delta);
            });

            it('should convert from "GallonsPerMinute" to "LitersPerHour"', function() {
                expectConversion(0, 'GallonsPerMinute', 'LitersPerHour').closeTo(0, delta);
                expectConversion(10, 'GallonsPerMinute', 'LitersPerHour').closeTo(2271.2475, 0.00005);
            });

            it('should convert from "LitersPerHour" to "LitersPerMinute"', function() {
                expectConversion(0, 'LitersPerHour', 'LitersPerMinute').closeTo(0, delta);
                expectConversion(6000, 'LitersPerHour', 'LitersPerMinute').closeTo(100, delta);
            });

            it('should convert from "LitersPerMinute" to "CubicMetersPerHour"', function() {
                expectConversion(0, 'LitersPerMinute', 'CubicMetersPerHour').closeTo(0, delta);
                expectConversion(1000, 'LitersPerMinute', 'CubicMetersPerHour').closeTo(60, delta);
            });

        });

        describe('Units', function() {

            it('should have checked all units as source units', function() {
                expect(_.uniq(checkedSourceUnitCodes).sort()).eql(knownFamilyUnitCodes.sort());
            });

            it('should have checked all units as target units', function() {
                expect(_.uniq(checkedTargetUnitCodes).sort()).eql(knownFamilyUnitCodes.sort());
            });

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

    describe('#formatTextValueFromRawValueInternal', function() {

        it('should be a method', function() {
            expect(Specification.prototype.formatTextValueFromRawValueInternal).to.be.a('function');
        });

        it('should work correctly for root type "Time"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(721, null, 'Time', 0, null);

            expect(textValue).to.equal('12:01');
        });

        it('should work correctly for root type "Weektime"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(3 * 1440 + 721, null, 'Weektime', 0, null);

            expect(textValue).to.equal('Th,12:01');
        });

        it('should work correctly for root type "DateTime"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(409418262, null, 'DateTime', 0, null);

            expect(textValue).to.equal('12/22/2013 15:17:42');
        });

        it('should work correctly for root type "Number" and precision "0"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 0, null);

            expect(textValue).to.equal('12346');
        });

        it('should work correctly for root type "Number" and precision "1"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 1, null);

            expect(textValue).to.equal('12345.7');
        });

        it('should work correctly for root type "Number" and precision "2"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 2, null);

            expect(textValue).to.equal('12345.68');
        });

        it('should work correctly for root type "Number" and precision "3"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 3, null);

            expect(textValue).to.equal('12345.679');
        });

        it('should work correctly for root type "Number" and precision "4"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 4, null);

            expect(textValue).to.equal('12345.6789');
        });

        it('should work correctly for root type "Number" and precision "10"', function() {
            var spec = new Specification();

            var textValue = spec.formatTextValueFromRawValueInternal(1.23456789, null, 'Number', 10, null);

            expect(textValue).to.equal('1.2345678900');
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

        var header3 = new Packet({
            channel: 3,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E31,
            command: 0x0100,
            frameCount: 4,
            frameData: new Buffer('2211221122112211221122112211221122112211', 'hex'), // data for five frames, but only four advertised
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

        var rawSpecificationData2 = {
            'filteredPacketFieldSpecs': [{
                'filteredPacketFieldId': 'DemoValue3',
                'packetId': '01_0010_7722_10_0100',
                'fieldId': '002_2_0',
                'name': 'T-return',
                'type': 'Number_0_1_DegreesFahrenheit',
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
            expect(pfs [5].rawValue).to.be.closeTo( -888.8, 0.05);
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
            expect(pfs [1].rawValue).to.be.closeTo( -888.8, 0.05);
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

        it('should work correctly with a filtered spec and conversion', function() {
            var spec = new Specification({
                specificationData: rawSpecificationData2
            });

            var pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

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

        it('should work correctly for partial packets', function() {
            var spec = new Specification({
            });

            var pfs = spec.getPacketFieldsForHeaders([ header3 ]);

            expect(pfs).to.be.an('array');
            expect(pfs.length).to.equal(4);
            expect(pfs [3]).to.be.an('object');
            expect(pfs [3].id).to.equal('03_0010_7E31_10_0100_016_4_0');
            expect(pfs [3].packet).to.be.an('object');
            expect(pfs [3].packetSpec).to.be.an('object');
            expect(pfs [3].packetFieldSpec).to.be.an('object');
            expect(pfs [3].origPacketFieldSpec).to.be.an('object');
            expect(pfs [3].name).to.equal('Gesamtvolumen');
            expect(pfs [3].rawValue).to.equal(null);
            expect(pfs [3].formatTextValue).to.be.a('function');
            expect(pfs [3].formatTextValue()).to.equal('');
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

    var nonBlockTypeHeader1 = new Packet({
        channel: 1,
        destinationAddress: 0x0010,
        sourceAddress: 0x7721,
        command: 0x0100,
        // for the purpose of this test: valid BlockType data in a non-BlockType packet should be ignored
        frameCount: 7,
        frameData: new Buffer('0108000064000000020a0000b822b82200000000010b00000b000000', 'hex'),
    });

    var blockTypeHeader1 = new Packet({
        channel: 1,
        destinationAddress: 0x0015,
        sourceAddress: 0x7721,
        command: 0x0100,
        frameCount: 7,
        frameData: new Buffer('0108000064000000020a0000b822b82200000000010b00000b000000', 'hex'),
    });

    var blockTypeHeader2 = new Packet({
        channel: 1,
        destinationAddress: 0x0015,
        sourceAddress: 0x7721,
        command: 0x0100,
        frameCount: 26,
        frameData: new Buffer([
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

    describe('#getBlockTypeSectionsForHeaders', function() {

        var sectionKeys = [
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

        it('should be a method', function() {
            expect(Specification.prototype).property('getBlockTypeSectionsForHeaders').a('function');
        });

        it('should work correctly', function() {
            var spec = new Specification();

            var sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            expect(sections).an('array').lengthOf(3);

            var section = sections [0];
            expect(section).an('object');
            expect(_.keys(section).sort()).eql(sectionKeys);
            expect(section).property('sectionId').a('string').equal('01_0015_7721_10_0100_01_08_4');
            expect(section).property('surrogatePacketId').a('string').equal('01_8015_4CB0_10_6413');
            expect(section).property('packet').an('object');
            expect(section).property('packetSpec').an('object');
            expect(section).property('startOffset').a('number').equal(0);
            expect(section).property('endOffset').a('number').equal(8);
            expect(section).property('type').a('number').equal(8);
            expect(section).property('payloadCount').a('number').equal(4);
            expect(section).property('frameCount').a('number').equal(1);
            expect(section).property('frameData').an('object');

            var frameData = section.frameData;
            expect(frameData).property('length').a('number').equal(8);
            expect(frameData.toString('hex')).equal('0108000064000000');

            section = sections [1];
            expect(section).an('object');
            expect(_.keys(section).sort()).eql(sectionKeys);
            expect(section).property('sectionId').a('string').equal('01_0015_7721_10_0100_02_0A_1');
            expect(section).property('surrogatePacketId').a('string').equal('01_8015_6659_10_49D0');
            expect(section).property('packet').an('object');
            expect(section).property('packetSpec').an('object');
            expect(section).property('startOffset').a('number').equal(8);
            expect(section).property('endOffset').a('number').equal(20);
            expect(section).property('type').a('number').equal(10);
            expect(section).property('payloadCount').a('number').equal(1);
            expect(section).property('frameCount').a('number').equal(2);
            expect(section).property('frameData').an('object');

            frameData = section.frameData;
            expect(frameData).property('length').a('number').equal(12);
            expect(frameData.toString('hex')).equal('020a0000b822b82200000000');

            section = sections [2];
            expect(section).an('object');
            expect(_.keys(section).sort()).eql(sectionKeys);
            expect(section).property('sectionId').a('string').equal('01_0015_7721_10_0100_01_0B_1');
            expect(section).property('surrogatePacketId').a('string').equal('01_8015_C162_10_EFC8');
            expect(section).property('packet').an('object');
            expect(section).property('packetSpec').an('object');
            expect(section).property('startOffset').a('number').equal(20);
            expect(section).property('endOffset').a('number').equal(28);
            expect(section).property('type').a('number').equal(11);
            expect(section).property('payloadCount').a('number').equal(1);
            expect(section).property('frameCount').a('number').equal(1);
            expect(section).property('frameData').an('object');

            frameData = section.frameData;
            expect(frameData).property('length').a('number').equal(8);
            expect(frameData.toString('hex')).equal('010b00000b000000');
        });

        it('should work correctly #2', function() {
            var spec = new Specification();

            var sections = spec.getBlockTypeSectionsForHeaders([ blockTypeHeader2 ]);

            var expectedValues = [
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

            _.forEach(sections, function(section, index) {
                var ev = expectedValues [index];

                var sectionId = ev [0];
                var surrogatePacketId = ev [1];
                var startOffset = ev [2];
                var endOffset = ev [3];
                var frameCount = ev [4];
                var type = ev [5];
                var payloadCount = ev [6];
                var frameData = ev [7];

                expect(section).an('object');
                expect(_.keys(section).sort()).eql(sectionKeys);
                expect(section).property('sectionId').a('string').equal(sectionId);
                expect(section).property('surrogatePacketId').a('string').equal(surrogatePacketId);
                expect(section).property('packet').an('object');
                expect(section).property('packetSpec').an('object');
                expect(section).property('startOffset').a('number').equal(startOffset);
                expect(section).property('endOffset').a('number').equal(endOffset);
                expect(section).property('type').a('number').equal(type);
                expect(section).property('payloadCount').a('number').equal(payloadCount);
                expect(section).property('frameCount').a('number').equal(frameCount);
                expect(section).property('frameData').an('object');

                expect(section.frameData.toString('hex')).equal(frameData);
            });
        });

    });

    describe('#getBlockTypePacketSpecificationsForSections', function() {

        it('should be a method', function() {
            expect(Specification.prototype).property('getBlockTypePacketSpecificationsForSections').a('function');
        });

        it('should work correctly', function() {
            var spec = new Specification();

            var sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            var packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            expect(packetSpecs).an('array').lengthOf(3);

            var packetSpecKeys = [
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

            var packetFieldSpecKeys = [
                'fieldId',
                'name',
                'type',
                'factor',
                'parts',
                'getRawValue',
                'setRawValue',
            ].sort();

            var packetSpec = packetSpecs [0];
            expect(packetSpec).an('object');
            expect(_.keys(packetSpec).sort()).eql(packetSpecKeys);
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

            var pfs = packetSpec.packetFields [0];
            expect(pfs).an('object');
            expect(_.keys(pfs).sort()).eql(packetFieldSpecKeys);
            expect(pfs).property('fieldId').a('string').equal('01_0015_7721_10_0100_01_08_4_004_1_0');
            expect(pfs).property('name').a('string').equal('Drehzahl Relais 1');
            expect(pfs).property('type').an('object').property('typeId').a('string').equal('Number_1_Percent');
            expect(pfs).property('factor').a('number').equal(1);
            expect(pfs).property('parts').an('array').lengthOf(1);
            expect(pfs).property('getRawValue').a('function');
            expect(pfs).property('setRawValue').a('function');

            var rawValue = pfs.getRawValue(sections [0].frameData, 0, sections [0].frameData.length);
            expect(rawValue).a('number').equal(100);

            packetSpec = packetSpecs [1];
            expect(packetSpec).an('object');
            expect(_.keys(packetSpec).sort()).eql(packetSpecKeys);
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
            expect(_.keys(pfs).sort()).eql(packetFieldSpecKeys);
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
            expect(_.keys(packetSpec).sort()).eql(packetSpecKeys);
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
            expect(_.keys(pfs).sort()).eql(packetFieldSpecKeys);
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

    describe('#getBlockTypeFieldsForSections', function() {

        it('should be a method', function() {
            expect(Specification.prototype).property('getBlockTypeFieldsForSections').a('function');
        });

        it('should work correctly', function() {
            var spec = new Specification();

            var sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            var packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            var packetFields = spec.getBlockTypeFieldsForSections(sections);

            expect(packetFields).an('array').lengthOf(8);

            var packetFieldKeys = [
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

            var packetField = packetFields [0];
            expect(packetField).an('object');
            expect(_.keys(packetField).sort()).eql(packetFieldKeys);
            expect(packetField).property('id').a('string').equal('01_8015_4CB0_10_6413_01_0015_7721_10_0100_01_08_4_004_1_0');
            expect(packetField).property('section').an('object').equal(sections [0]);
            expect(packetField).property('packet').an('object').equal(blockTypeHeader1);
            expect(packetField).property('packetSpec').an('object').equal(packetSpecs [0]);
            expect(packetField).property('packetFieldSpec').an('object').equal(packetSpecs [0].packetFields [0]);
            expect(packetField).property('origPacketFieldSpec').an('object').equal(packetSpecs [0].packetFields [0]);
            expect(packetField).property('name').a('string').equal('Pump speed relay 1');
            expect(packetField).property('rawValue').a('number').equal(100);
            expect(packetField).property('formatTextValue').a('function');

            var textValue = packetField.formatTextValue();
            expect(textValue).a('string').equal('100%');

            packetField = packetFields [1];
            expect(packetField).an('object');
            expect(_.keys(packetField).sort()).eql(packetFieldKeys);
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
            expect(_.keys(packetField).sort()).eql(packetFieldKeys);
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
            expect(_.keys(packetField).sort()).eql(packetFieldKeys);
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
            expect(_.keys(packetField).sort()).eql(packetFieldKeys);
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

        it('should work correctly #2', function() {
            var spec = new Specification();

            var sections = spec.getBlockTypeSectionsForHeaders([ blockTypeHeader2 ]);

            var packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            var packetFields = spec.getBlockTypeFieldsForSections(sections);

            var expectedValues = [
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

            var packetFieldKeys = [
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

            _.forEach(packetFields, function(packetField, index) {
                var ev = expectedValues [index];

                var id = ev [0];
                var sectionIndex = ev [1];
                var fieldIndex = ev [2];
                var name = ev [3];
                var rawValue = ev [4];
                var textValue = ev [5];

                expect(packetField).an('object');
                expect(_.keys(packetField).sort()).eql(packetFieldKeys);
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
            });
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
