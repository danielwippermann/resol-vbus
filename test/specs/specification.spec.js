/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Packet = require('./resol-vbus').Packet;
var Specification = require('./resol-vbus').Specification;



// // Create first Specification instance outside of the tests, because otherwise
// // the first test to create an instance will be marked as 'slow'...
// try {
//     var spec = new Specification();
// } catch (ex) {
//     // eat it silently
// }



describe('Specification', function() {

    it('should be a constructor function', function() {
        expect(Specification).to.be.a('function');

        var spec = new Specification();

        expect(spec).to.be.an.instanceOf(Specification);
    });

    it('should return known devices', function() {
        var spec = new Specification();

        var deviceSpec = spec.getDeviceSpecification(0x0010, 0x7721, 0);

        expect(deviceSpec).to.be.an('object');
        expect(deviceSpec.name).to.equal('DFA');
    });

    it('should return unknown devices', function() {
        var spec = new Specification();

        var deviceSpec = spec.getDeviceSpecification(0x000F, 0x7721, 0);

        expect(deviceSpec).to.be.an('object');
        expect(deviceSpec.name).to.equal('Unknown Device (0x000F)');
    });

    it('should return known packet specs by channel, addresses and command', function() {
        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification(0, 0x0010, 0x7721, 0x0100);

        expect(packetSpec).to.be.an('object');
        expect(packetSpec.destinationDevice).to.be.an('object');
        expect(packetSpec.destinationDevice.name).to.equal('DFA');
        expect(packetSpec.sourceDevice).to.be.an('object');
        expect(packetSpec.sourceDevice.name).to.equal('DeltaSol E [Regler]');
        expect(packetSpec.packetFields).to.be.an('array');
        expect(packetSpec.packetFields.length).to.equal(37);

        var packetFieldSpec = packetSpec.packetFields [0];
        expect(packetFieldSpec).to.be.an('object');
        expect(packetFieldSpec.fieldId).to.equal('000_2_0');
        expect(packetFieldSpec.name).to.be.an('object');
        expect(packetFieldSpec.name.ref).to.equal('Temperature sensor 1');
        expect(packetFieldSpec.type).to.be.an('object');
        expect(packetFieldSpec.type.rootTypeId).to.equal('Number');
        expect(packetFieldSpec.type.precision).to.equal(1);
        expect(packetFieldSpec.type.unit).to.be.an('object');
        expect(packetFieldSpec.type.unit.unitCode).to.equal('DegreesCelsius');
        expect(packetFieldSpec.type.unit.unitText).to.equal(' °C');
        expect(packetFieldSpec.getRawValue).to.be.a('function');
    });

    it('should return known packet specs by packet', function() {
        var buffer = new Buffer('aa100021771000010046', 'hex');

        var packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification(packet);

        expect(packetSpec).to.be.an('object');
        expect(packetSpec.destinationDevice).to.be.an('object');
        expect(packetSpec.destinationDevice.name).to.equal('DFA');
        expect(packetSpec.sourceDevice).to.be.an('object');
        expect(packetSpec.sourceDevice.name).to.equal('DeltaSol E [Regler]');
        expect(packetSpec.packetFields).to.be.an('array');
        expect(packetSpec.packetFields.length).to.equal(37);

        var packetFieldSpec = packetSpec.packetFields [0];
        expect(packetFieldSpec).to.be.an('object');
        expect(packetFieldSpec.fieldId).to.equal('000_2_0');
        expect(packetFieldSpec.name).to.be.an('object');
        expect(packetFieldSpec.name.ref).to.equal('Temperature sensor 1');
        expect(packetFieldSpec.type).to.be.an('object');
        expect(packetFieldSpec.type.rootTypeId).to.equal('Number');
        expect(packetFieldSpec.type.precision).to.equal(1);
        expect(packetFieldSpec.type.unit).to.be.an('object');
        expect(packetFieldSpec.type.unit.unitCode).to.equal('DegreesCelsius');
        expect(packetFieldSpec.type.unit.unitText).to.equal(' °C');
        expect(packetFieldSpec.getRawValue).to.be.a('function');
    });

    it('should return known packet specs by packet ID', function() {
        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification('00_0010_7721_0100_10');

        expect(packetSpec).to.be.an('object');
        expect(packetSpec.packetId).to.equal('00_0010_7721_0100_10');
        expect(packetSpec.destinationDevice).to.be.an('object');
        expect(packetSpec.destinationDevice.name).to.equal('DFA');
        expect(packetSpec.sourceDevice).to.be.an('object');
        expect(packetSpec.sourceDevice.name).to.equal('DeltaSol E [Regler]');
        expect(packetSpec.packetFields).to.be.an('array');
        expect(packetSpec.packetFields.length).to.equal(37);

        var packetFieldSpec = packetSpec.packetFields [0];
        expect(packetFieldSpec).to.be.an('object');
        expect(packetFieldSpec.fieldId).to.equal('000_2_0');
        expect(packetFieldSpec.name).to.be.an('object');
        expect(packetFieldSpec.name.ref).to.equal('Temperature sensor 1');
        expect(packetFieldSpec.type).to.be.an('object');
        expect(packetFieldSpec.type.rootTypeId).to.equal('Number');
        expect(packetFieldSpec.type.precision).to.equal(1);
        expect(packetFieldSpec.type.unit).to.be.an('object');
        expect(packetFieldSpec.type.unit.unitCode).to.equal('DegreesCelsius');
        expect(packetFieldSpec.type.unit.unitText).to.equal(' °C');
        expect(packetFieldSpec.getRawValue).to.be.a('function');
    });

    it('should return unknown packet specs', function() {
        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification(0, 0x000F, 0x7721, 0x0100);

        expect(packetSpec).to.be.an('object');
        expect(packetSpec.destinationDevice).to.be.an('object');
        expect(packetSpec.destinationDevice.name).to.equal('Unknown Device (0x000F)');
        expect(packetSpec.sourceDevice).to.be.an('object');
        expect(packetSpec.sourceDevice.name).to.equal('DeltaSol E [Regler]');
        expect(packetSpec.packetFields).to.be.an('array');
        expect(packetSpec.packetFields.length).to.equal(0);
    });

    it('should return known packet field specs by field ID', function() {
        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification(0, 0x0010, 0x7721, 0x0100);

        expect(packetSpec).to.be.an('object');

        var packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_2_0');
        expect(packetFieldSpec).to.be.an('object');
        expect(packetFieldSpec.fieldId).to.equal('000_2_0');
        expect(packetFieldSpec.name).to.be.an('object');
        expect(packetFieldSpec.name.ref).to.equal('Temperature sensor 1');
        expect(packetFieldSpec.type).to.be.an('object');
        expect(packetFieldSpec.type.rootTypeId).to.equal('Number');
        expect(packetFieldSpec.type.precision).to.equal(1);
        expect(packetFieldSpec.type.unit).to.be.an('object');
        expect(packetFieldSpec.type.unit.unitCode).to.equal('DegreesCelsius');
        expect(packetFieldSpec.type.unit.unitText).to.equal(' °C');
        expect(packetFieldSpec.getRawValue).to.be.a('function');
    });

    it('should return known packet field specs by packet field ID', function() {
        var spec = new Specification();

        var packetFieldSpec = spec.getPacketFieldSpecification('00_0010_7721_0100_10_000_2_0');
        expect(packetFieldSpec).to.be.an('object');
        expect(packetFieldSpec.fieldId).to.equal('000_2_0');
        expect(packetFieldSpec.name).to.be.an('object');
        expect(packetFieldSpec.name.ref).to.equal('Temperature sensor 1');
        expect(packetFieldSpec.type).to.be.an('object');
        expect(packetFieldSpec.type.id).to.equal('Number_0_1_DegreesCelsius');
        expect(packetFieldSpec.type.rootTypeId).to.equal('Number');
        expect(packetFieldSpec.type.precision).to.equal(1);
        expect(packetFieldSpec.type.unit).to.be.an('object');
        expect(packetFieldSpec.type.unit.unitCode).to.equal('DegreesCelsius');
        expect(packetFieldSpec.type.unit.unitText).to.equal(' °C');
        expect(packetFieldSpec.getRawValue).to.be.a('function');
    });

    it('should get filtered packet field specs', function() {
        var buffer = new Buffer('aa10002277100001034224012701003200006401001a350201000047', 'hex');

        var packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

        var spec = new Specification();

        var fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([ packet ]);

        expect(fpfs).to.be.an('array');
        expect(fpfs.length).to.equal(4);
        expect(fpfs [0]).to.be.an('object');
        expect(fpfs [0].filteredPacketFieldId).to.equal('00_0010_7722_0100_10_000_2_0');
        expect(fpfs [0].packetId).to.equal('00_0010_7722_0100_10');
        expect(fpfs [0].fieldId).to.equal('000_2_0');
        expect(fpfs [0].name.ref).to.equal('Flow temperature');
        expect(fpfs [0].type.id).to.equal('Number_0_1_DegreesCelsius');
        expect(fpfs [0].getRawValue).to.be.a('function');
    });

    it('should store specification data correctly', function() {
        var buffer = new Buffer('aa10002277100001034224012701003200006401001a350201000047', 'hex');

        var packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

        var spec = new Specification();

        var fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([ packet ]);

        var rawSpecificationData = spec.storeSpecificationData({
            filteredPacketFieldSpecs: fpfs
        });

        var rawFpfs = rawSpecificationData.filteredPacketFieldSpecs;

        expect(rawFpfs).to.be.an('array');
        expect(rawFpfs.length).to.equal(4);
        expect(rawFpfs [0]).to.be.an('object');
        expect(rawFpfs [0].filteredPacketFieldId).to.equal('00_0010_7722_0100_10_000_2_0');
        expect(rawFpfs [0].packetId).to.equal('00_0010_7722_0100_10');
        expect(rawFpfs [0].fieldId).to.equal('000_2_0');
        expect(rawFpfs [0].name.ref).to.equal('Flow temperature');
        expect(rawFpfs [0].type).to.equal('Number_0_1_DegreesCelsius');
        expect(rawFpfs [0].getRawValue).to.equal('_0010_7722_0100_000_2_0');
    });

    it('should load the specification data correctly', function() {
        var rawSpecificationData = {
            'filteredPacketFieldSpecs': [{
                'fieldId': '000_2_0',
                'name': {
                    'ref': 'T-VL',
                    'en': 'Flow temperature',
                    'de': 'Temperatur Vorlauf',
                    'fr': 'Température Départ'
                },
                'type': 'Number_0_1_DegreesCelsius',
                'getRawValue': '_0010_7722_0100_000_2_0',
                'filteredPacketFieldId': '00_0010_7722_0100_10_000_2_0',
                'packetId': '00_0010_7722_0100_10'
            }]
        };

        var spec = new Specification({
            specificationData: rawSpecificationData
        });

        expect(spec).to.be.an('object');

        var fpfs = spec.specificationData.filteredPacketFieldSpecs;

        expect(fpfs).to.be.an('array');
        expect(fpfs.length).to.equal(1);
        expect(fpfs [0]).to.be.an('object');
        expect(fpfs [0].filteredPacketFieldId).to.equal('00_0010_7722_0100_10_000_2_0');
        expect(fpfs [0].packetId).to.equal('00_0010_7722_0100_10');
        expect(fpfs [0].fieldId).to.equal('000_2_0');
        expect(fpfs [0].name.ref).to.equal('T-VL');
        expect(fpfs [0].type).to.be.an('object');
        expect(fpfs [0].type.id).to.equal('Number_0_1_DegreesCelsius');
        expect(fpfs [0].type.rootTypeId).to.equal('Number');
        expect(fpfs [0].type.precision).to.equal(1);
        expect(fpfs [0].type.unit).to.be.an('object');
        expect(fpfs [0].type.unit.unitCode).to.equal('DegreesCelsius');
        expect(fpfs [0].type.unit.unitText).to.equal(' °C');
        expect(fpfs [0].getRawValue).to.be.a('function');

        var packetFieldSpec = spec.getPacketFieldSpecification('00_0010_7722_0100_10_000_2_0');

        expect(packetFieldSpec.fieldId).to.equal('000_2_0');
        expect(packetFieldSpec.name.ref).to.equal('T-VL');
        expect(packetFieldSpec.type).to.be.an('object');
        expect(packetFieldSpec.type.id).to.equal('Number_0_1_DegreesCelsius');
        expect(packetFieldSpec.type.rootTypeId).to.equal('Number');
        expect(packetFieldSpec.type.precision).to.equal(1);
        expect(packetFieldSpec.type.unit).to.be.an('object');
        expect(packetFieldSpec.type.unit.unitCode).to.equal('DegreesCelsius');
        expect(packetFieldSpec.type.unit.unitText).to.equal(' °C');
        expect(packetFieldSpec.getRawValue).to.be.a('function');

        var rawSpecificationData2 = spec.storeSpecificationData();

        expect(rawSpecificationData2).to.eql(rawSpecificationData);
    });

    it('should get packet fields without filter', function() {
        var buffer = new Buffer('aa10002277100001034224012701003200006401001a350201000047', 'hex');

        var packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification(packet);

        var packetFields = spec.getPacketFieldsForHeaders([ packet ]);

        expect(packetFields).to.be.an('array');
        expect(packetFields.length).to.equal(4);
        expect(packetFields [0].packet).to.equal(packet);
        expect(packetFields [0].packetSpec).to.equal(packetSpec);
    });

    it('should get packet fields with filter', function() {
        var buffer = new Buffer('aa10002277100001034224012701003200006401001a350201000047', 'hex');

        var packet = Packet.fromLiveBuffer(buffer, 0, buffer.length);

        var rawSpecificationData = {
            'filteredPacketFieldSpecs': [{
                'fieldId': '000_2_0',
                'name': {
                    'ref': 'T-VL',
                    'en': 'Flow temperature',
                    'de': 'Temperatur Vorlauf',
                    'fr': 'Température Départ'
                },
                'type': 'Number_0_1_DegreesCelsius',
                'getRawValue': '_0010_7722_0100_000_2_0',
                'filteredPacketFieldId': '00_0010_7722_0100_10_000_2_0',
                'packetId': '00_0010_7722_0100_10'
            }]
        };

        var spec = new Specification({
            specificationData: rawSpecificationData
        });

        var packetSpec = spec.getPacketSpecification(packet);
        var packetFieldSpec = spec.getPacketFieldSpecification('00_0010_7722_0100_10_000_2_0');

        var packetFields = spec.getPacketFieldsForHeaders([ packet ]);

        expect(packetFields).to.be.an('array');
        expect(packetFields.length).to.equal(1);
        expect(packetFields [0].id).to.equal('00_0010_7722_0100_10_000_2_0');
        expect(packetFields [0].packet).to.equal(packet);
        expect(packetFields [0].packetSpec).to.equal(packetSpec);
        expect(packetFields [0].packetFieldSpec).to.equal(packetFieldSpec);
        expect(packetFields [0].packetFieldSpec.name.ref).to.equal('T-VL');
        expect(packetFields [0].origPacketFieldSpec).to.equal(packetSpec.packetFields [0]);
    });

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

});
