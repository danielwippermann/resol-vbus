/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Specification = require('./resol-vbus').Specification;



// Create first Specification instance outside of the tests, because otherwise
// the first test to create an instance will be marked as "slow"...
try {
    var spec = new Specification();
} catch (ex) {
    // eat it silently
}



describe('Specification', function() {

    it('should be a constructor function', function() {
        expect(Specification).to.be.a('function');

        var spec = new Specification();

        expect(spec).to.be.an.instanceOf(Specification);
    });

    it('should return known devices', function() {
        var spec = new Specification();

        var deviceSpec = spec.getDeviceSpecification(0, 0x0010, 0x7721);

        expect(deviceSpec).to.be.an('object');
        expect(deviceSpec.name).to.equal('DFA');
    });

    it('should return unknown devices', function() {
        var spec = new Specification();

        var deviceSpec = spec.getDeviceSpecification(0, 0x000F, 0x7721);

        expect(deviceSpec).to.be.an('object');
        expect(deviceSpec.name).to.equal('Unknown Device (0x000F)');
    });

    it('should return known packets', function() {
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

    it('should return unknown packets', function() {
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

});
