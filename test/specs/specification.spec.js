/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Specification = require('./resol-vbus').Specification;



describe('Specification', function() {

    it('should be a constructor function', function() {
        expect(Specification).to.be.a('function');
    });

    it('should return known devices', function() {
        var spec = new Specification();

        var deviceSpec = spec.getDeviceSpecification(0, 0x0010, 0x7721);

        expect(deviceSpec).to.be.an('object');
        expect(deviceSpec.name).to.eql('DFA');
    });

    it('should return unknown devices', function() {
        var spec = new Specification();

        var deviceSpec = spec.getDeviceSpecification(0, 0x000F, 0x7721);

        expect(deviceSpec).to.be.an('object');
        expect(deviceSpec.name).to.eql('Unknown Device (0x000F)');
    });

    it('should return known packets', function() {
        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification(0, 0x0010, 0x7721, 0x0100);

        expect(packetSpec).to.be.an('object');
        expect(packetSpec.destinationDevice).to.be.an('object');
        expect(packetSpec.destinationDevice.name).to.eql('DFA');
        expect(packetSpec.sourceDevice).to.be.an('object');
        expect(packetSpec.sourceDevice.name).to.eql('DeltaSol E [Regler]');
        expect(packetSpec.packetFields).to.be.an('array');
        expect(packetSpec.packetFields.length).to.eql(37);

        var packetFieldSpec = packetSpec.packetFields [0];
        expect(packetFieldSpec).to.be.an('object');
        expect(packetFieldSpec.fieldId).to.eql('000_2_0');
        expect(packetFieldSpec.name).to.be.an('object');
        expect(packetFieldSpec.name.ref).to.eql('Temperature sensor 1');
        expect(packetFieldSpec.type).to.be.an('object');
        expect(packetFieldSpec.type.rootTypeId).to.eql('Number');
        expect(packetFieldSpec.type.unit).to.be.an('object');
        expect(packetFieldSpec.type.unit.unitCode).to.eql('DegreesCelsius');
        expect(packetFieldSpec.type.unit.unitText).to.eql(' °C');
        expect(packetFieldSpec.type.formatTextValueFromRawValue).to.be.a('function');
        expect(packetFieldSpec.type.formatTextValueFromRawValue(123.4, null)).to.eql('123.4 °C');
        expect(packetFieldSpec.getRawValue).to.be.a('function');
    });

    it('should return unknown packets', function() {
        var spec = new Specification();

        var packetSpec = spec.getPacketSpecification(0, 0x000F, 0x7721, 0x0100);

        expect(packetSpec).to.be.an('object');
        expect(packetSpec.destinationDevice).to.be.an('object');
        expect(packetSpec.destinationDevice.name).to.eql('Unknown Device (0x000F)');
        expect(packetSpec.sourceDevice).to.be.an('object');
        expect(packetSpec.sourceDevice.name).to.eql('DeltaSol E [Regler]');
        expect(packetSpec.packetFields).to.be.an('array');
        expect(packetSpec.packetFields.length).to.eql(0);
    });

});
