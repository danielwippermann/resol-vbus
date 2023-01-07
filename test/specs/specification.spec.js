/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Packet,
    Specification,
    utils: { hasOwnProperty },
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



describe('Specification', () => {

    itShouldBeAClass(Specification, null, {
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

    describe('constructor', () => {

        it('should have resonable defaults', () => {
            const spec = new Specification();

            expectOwnPropertyNamesToEqual(spec, [
                'language',
                'i18n',
                'deviceSpecCache',
                'packetSpecCache',
                'blockTypePacketSpecCache',
                'specificationData',
            ]);

            expect(spec.language).toBe('en');
        });

        it('should copy selected options', () => {
            const options = {
                language: 'de',
                junk: 'JUNK'
            };

            const spec = new Specification(options);

            expect(spec.language).toBe(options.language);
            expect(spec.junk).toBe(undefined);
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

        function checkSpecificationData1(specData) {
            expectTypeToBe(specData, 'object');

            const fpfs = specData.filteredPacketFieldSpecs;

            expect(fpfs).toHaveLength(2);
            expect(fpfs [0].filteredPacketFieldId).toBe('DemoValue1');
            expect(fpfs [0].packetId).toBe('00_0010_7722_10_0100');
            expect(fpfs [0].fieldId).toBe('000_2_0');
            expect(fpfs [0].name.de).toBe('T-VL');
            expectTypeToBe(fpfs [0].type, 'object');
            expectTypeToBe(fpfs [0].getRawValue, 'function');
            expectTypeToBe(fpfs [0].packetSpec, 'object');
            expectTypeToBe(fpfs [0].packetFieldSpec, 'object');
            expect(fpfs [1].filteredPacketFieldId).toBe('DemoValue2');
            expect(fpfs [1].packetId).toBe('00_0010_7722_10_0100');
            expect(fpfs [1].fieldId).toBe('000_2_0');
            expect(fpfs [1].name.de).toBe('T-VL');
            expectTypeToBe(fpfs [1].type, 'object');
            expect(fpfs [1].conversions).toHaveLength(2);
            expectTypeToBe(fpfs [1].conversions [0].factor, 'number');
            expectTypeToBe(fpfs [1].conversions [0].sourceUnit, 'object');
            expectTypeToBe(fpfs [1].conversions [0].targetUnit, 'object');
            expectTypeToBe(fpfs [1].conversions [1].offset, 'number');
            expectTypeToBe(fpfs [1].conversions [1].sourceUnit, 'object');
            expectTypeToBe(fpfs [1].conversions [1].targetUnit, 'object');
            expectTypeToBe(fpfs [1].getRawValue, 'function');
            expectTypeToBe(fpfs [1].packetSpec, 'object');
            expectTypeToBe(fpfs [1].packetFieldSpec, 'object');
        }

        it('should work correctly without arguments', () => {
            const specData = Specification.loadSpecificationData();

            expectOwnPropertyNamesToEqual(specData, [
                'units',
                'types',
                'deviceSpecs',
                'getDeviceSpecification',
                'getRawValueFunctions',
                'setRawValueFunctions',
                'packetFieldSpecs',
                'packetSpecs',
                'getPacketSpecification',
                'filteredPacketFieldSpecs',
            ]);
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

        it('should work correctly without arguments', () => {
            const rawSpecData = Specification.storeSpecificationData();

            expectOwnPropertyNamesToEqual(rawSpecData, [
                'filteredPacketFieldSpecs',
            ]);

            expect(rawSpecData.filteredPacketFieldSpecs).toBe(undefined);
        });

        it('should work correctly with an unfiltered spec', () => {
            const spec = new Specification();

            const rawSpecData = Specification.storeSpecificationData(spec);

            expectOwnPropertyNamesToEqual(rawSpecData, [
                'filteredPacketFieldSpecs',
            ]);

            expect(rawSpecData.filteredPacketFieldSpecs).toBe(undefined);
        });

        it('should work correctly with a filtered spec', () => {
            const rawSpecDataInput = rawSpecificationData1;

            const spec = new Specification({
                specificationData: rawSpecDataInput
            });

            const rawSpecData = Specification.storeSpecificationData(spec);

            expect(rawSpecData).toEqual(rawSpecDataInput);
        });

    });

    describe('#getUnitById', () => {

        it('should work correctly for known units', () => {
            const spec = new Specification();

            const unit = spec.getUnitById('None');

            expectTypeToBe(unit, 'object');
        });

        it('should work correctly for unknown units', () => {
            const spec = new Specification();

            const unit = spec.getUnitById('Unknown');

            expect(unit).toBe(undefined);
        });

    });

    describe('#getTypeById', () => {

        it('should work correctly for known types', () => {
            const spec = new Specification();

            const type = spec.getTypeById('Number_1_None');

            expectTypeToBe(type, 'object');
        });

        it('should work correctly for unknown types', () => {
            const spec = new Specification();

            const type = spec.getTypeById('Unknown');

            expect(type).toBe(undefined);
        });

    });

    describe('#getDeviceSpecification', () => {

        it('should work correctly with a number pair', () => {
            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(0x7721, 0x0010);

            expect(deviceSpec.deviceId).toBe('00_7721_0010');
            expect(deviceSpec.channel).toBe(0);
            expect(deviceSpec.selfAddress).toBe(0x7721);
            expect(deviceSpec.peerAddress).toBe(0x0010);
            expect(deviceSpec.name).toBe('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).toBe('DeltaSol E [Regler]');
        });

        it('should work correctly with a number triple', () => {
            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(0x7721, 0x0010, 1);

            expect(deviceSpec.deviceId).toBe('01_7721_0010');
            expect(deviceSpec.channel).toBe(1);
            expect(deviceSpec.selfAddress).toBe(0x7721);
            expect(deviceSpec.peerAddress).toBe(0x0010);
            expect(deviceSpec.name).toBe('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).toBe('VBus #1: DeltaSol E [Regler]');
        });

        it('should work correctly with a header and "source"', () => {
            const header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
            });

            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(header, 'source');

            expect(deviceSpec.deviceId).toBe('01_7721_0010');
            expect(deviceSpec.channel).toBe(1);
            expect(deviceSpec.selfAddress).toBe(0x7721);
            expect(deviceSpec.peerAddress).toBe(0x0010);
            expect(deviceSpec.name).toBe('DeltaSol E [Regler]');
            expect(deviceSpec.fullName).toBe('VBus #1: DeltaSol E [Regler]');
        });

        it('should work correctly with a header and "destination"', () => {
            const header = new Packet({
                channel: 1,
                destinationAddress: 0x0010,
                sourceAddress: 0x7721,
            });

            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(header, 'destination');

            expect(deviceSpec.deviceId).toBe('01_0010_7721');
            expect(deviceSpec.name).toBe('DFA');
            expect(deviceSpec.fullName).toBe('VBus #1: DFA');
        });

        it('should work correctly for an unknown device', () => {
            const spec = new Specification();

            const deviceSpec = spec.getDeviceSpecification(0x772F, 0x0010, 1);

            expect(deviceSpec.deviceId).toBe('01_772F_0010');
            expect(deviceSpec.channel).toBe(1);
            expect(deviceSpec.selfAddress).toBe(0x772F);
            expect(deviceSpec.peerAddress).toBe(0x0010);
            expect(deviceSpec.name).toBe('Unknown Device (0x772F)');
            expect(deviceSpec.fullName).toBe('VBus #1: Unknown Device (0x772F)');
        });

    });

    describe('#getPacketSpecification', () => {

        it('should work correctly with a number quadruple', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            expect(packetSpec.packetId).toBe('01_0010_7721_10_0100');
            expect(packetSpec.channel).toBe(1);
            expect(packetSpec.destinationAddress).toBe(0x0010);
            expect(packetSpec.sourceAddress).toBe(0x7721);
            expect(packetSpec.command).toBe(0x0100);
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');
            expect(packetSpec.fullName).toBe('VBus #1: DeltaSol E [Regler]');
            expectTypeToBe(packetSpec.packetFields, 'array');
            expect(packetSpec.packetFields.length).toBeGreaterThan(0);
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

            expect(packetSpec.packetId).toBe('01_0010_7721_10_0100');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');
            expectTypeToBe(packetSpec.packetFields, 'array');
            expect(packetSpec.packetFields.length).toBeGreaterThan(0);
        });

        it('should work correctly with a packet ID string with protocol version', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification('01_0010_7721_10_0100');

            expect(packetSpec.packetId).toBe('01_0010_7721_10_0100');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');
            expectTypeToBe(packetSpec.packetFields, 'array');
            expect(packetSpec.packetFields.length).toBeGreaterThan(0);
        });

        it('should work correctly with a packet ID string without protocol version', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification('01_0010_7721_0100');

            expect(packetSpec.packetId).toBe('01_0010_7721_10_0100');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');
            expectTypeToBe(packetSpec.packetFields, 'array');
            expect(packetSpec.packetFields.length).toBeGreaterThan(0);
        });

        it('should work correctly for an unknown packet', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x772F, 0x0100);

            expect(packetSpec.packetId).toBe('01_0010_772F_10_0100');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');
            expectTypeToBe(packetSpec.packetFields, 'array');
            expect(packetSpec.packetFields.length).toBe(0);
        });

        it('should work correctly with a packet field ID string', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification('01_0010_7721_10_0100_000_2_0');

            expect(packetSpec.packetId).toBe('01_0010_7721_10_0100');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');
            expectTypeToBe(packetSpec.packetFields, 'array');
            expect(packetSpec.packetFields.length).toBeGreaterThan(0);
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

        it('should work correctly with a packet spec and a field ID', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            const packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_2_0');

            expect(packetFieldSpec).toEqual({
                fieldId: expect.any(String),
                name: {
                    en: expect.any(String),
                    de: expect.any(String),
                    fr: expect.any(String),
                },
                type: {
                    typeId: expect.any(String),
                    rootTypeId: expect.any(String),
                    precision: expect.any(Number),
                    unit: {
                        unitId: expect.any(String),
                        unitCode: expect.any(String),
                        unitFamily: expect.any(String),
                        unitText: expect.any(String),
                    },
                },
                getRawValue: expect.any(Function),
                setRawValue: expect.any(Function),
                factor: expect.any(Number),
                parts: expect.any(Array),
            });
        });

        it('should work correctly with a packet field ID string with protocol version', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            expect(packetFieldSpec).toEqual({
                fieldId: expect.any(String),
                name: {
                    en: expect.any(String),
                    de: expect.any(String),
                    fr: expect.any(String),
                },
                type: {
                    typeId: expect.any(String),
                    rootTypeId: expect.any(String),
                    precision: expect.any(Number),
                    unit: {
                        unitId: expect.any(String),
                        unitCode: expect.any(String),
                        unitFamily: expect.any(String),
                        unitText: expect.any(String),
                    },
                },
                getRawValue: expect.any(Function),
                setRawValue: expect.any(Function),
                factor: expect.any(Number),
                parts: expect.any(Array),
            });
        });

        it('should work correctly with a packet field ID string without protocol version', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_0100_000_2_0');

            expect(packetFieldSpec).toEqual({
                fieldId: expect.any(String),
                name: {
                    en: expect.any(String),
                    de: expect.any(String),
                    fr: expect.any(String),
                },
                type: {
                    typeId: expect.any(String),
                    rootTypeId: expect.any(String),
                    precision: expect.any(Number),
                    unit: {
                        unitId: expect.any(String),
                        unitCode: expect.any(String),
                        unitFamily: expect.any(String),
                        unitText: expect.any(String),
                    },
                },
                getRawValue: expect.any(Function),
                setRawValue: expect.any(Function),
                factor: expect.any(Number),
                parts: expect.any(Array),
            });
        });

        it('should work correctly for a missing packet spec', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification(null, '000_2_0');

            expect(packetFieldSpec).toBe(undefined);
        });

        it('should work correctly for a missing field ID', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            const packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, null);

            expect(packetFieldSpec).toBe(undefined);
        });

        it('should work correctly for an unknown field ID', () => {
            const spec = new Specification();

            const packetSpec = spec.getPacketSpecification(1, 0x0010, 0x7721, 0x0100);

            const packetFieldSpec = spec.getPacketFieldSpecification(packetSpec, '000_0_0');

            expect(packetFieldSpec).toBe(undefined);
        });

        it('should work correctly with a filtered spec and a custom ID string', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData1
            });

            const packetFieldSpec = spec.getPacketFieldSpecification('DemoValue1');

            expect(packetFieldSpec).toEqual({
                fieldId: expect.any(String),
                name: {
                    ref: expect.any(String),
                    en: expect.any(String),
                    de: expect.any(String),
                    fr: expect.any(String),
                },
                type: {
                    typeId: expect.any(String),
                    rootTypeId: expect.any(String),
                    precision: expect.any(Number),
                    unit: {
                        unitId: expect.any(String),
                        unitCode: expect.any(String),
                        unitFamily: expect.any(String),
                        unitText: expect.any(String),
                    },
                },
                packetId: '00_0010_7722_10_0100',
                packetSpec: expect.any(Object),
                packetFieldSpec: expect.any(Object),
                conversions: undefined,
                filteredPacketFieldId: 'DemoValue1',
                getRawValue: expect.any(Function),
                setRawValue: undefined,
            });
        });

    });

    describe('#setRawValue', () => {

        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const setRawValue = 20.5;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBeCloseTo(20.5, 2);
        });

        it('should work correctly without start and end arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const setRawValue = 999.9;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer);

            expect(rawValue).toBeCloseTo(999.9, 2);
        });

        it('should work correctly with a too small buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('', 'hex');

            const setRawValue = 12.3;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBe(null);
        });

        it('should work correctly with a partial buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const setRawValue = 12.3;

            spec.setRawValue(packetFieldSpec, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBeCloseTo(12.3, 2);
        });

        it('should work correctly for an unknown packet field spec', () => {
            const spec = new Specification();

            const buffer = Buffer.from('b822', 'hex');

            const setRawValue = 12.3;

            spec.setRawValue(null, setRawValue, buffer, 0, buffer.length);

            const rawValue = spec.getRawValue(null, buffer, 0, buffer.length);

            expect(rawValue).toBe(null);
        });

        it('should work correctly without a buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const setRawValue = 12.3;

            spec.setRawValue(packetFieldSpec, setRawValue);

            const rawValue = spec.getRawValue(packetFieldSpec);

            expect(rawValue).toBe(null);
        });

    });


    describe('#getRawValue', () => {

        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBeCloseTo(888.8, 2);
        });

        it('should work correctly without start and end arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer);

            expect(rawValue).toBeCloseTo(888.8, 2);
        });

        it('should work correctly with a too small buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBe(null);
        });

        it('should work correctly with a partial buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const rawValue = spec.getRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBeCloseTo(18.4, 2);
        });

        it('should work correctly for an unknown packet field spec', () => {
            const spec = new Specification();

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRawValue(null, buffer, 0, buffer.length);

            expect(rawValue).toBe(null);
        });

        it('should work correctly without a buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const rawValue = spec.getRawValue(packetFieldSpec);

            expect(rawValue).toBe(null);
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

            expect(rawValue).toBeCloseTo(32.0, 2);
        });

    });

    describe('#getRoundedRawValue', () => {

        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBe(888.8);
        });

        it('should work correctly without start and end arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer);

            expect(rawValue).toBe(888.8);
        });

        it('should work correctly with a too small buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBe(0);
        });

        it('should work correctly with a partial buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const buffer = Buffer.from('b8', 'hex');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec, buffer, 0, buffer.length);

            expect(rawValue).toBe(18.4);
        });

        it('should work correctly for an unknown packet field spec', () => {
            const spec = new Specification();

            const buffer = Buffer.from('b822', 'hex');

            const rawValue = spec.getRoundedRawValue(null, buffer, 0, buffer.length);

            expect(rawValue).toBe(null);
        });

        it('should work correctly without a buffer', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const rawValue = spec.getRoundedRawValue(packetFieldSpec);

            expect(rawValue).toBe(0);
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

            expect(rawValue).toBe(32);
        });

    });

    describe('#invertConversions', () => {

        it('should work correctly without conversion', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions();

            expect(invertedConversions).toBe(undefined);
        });

        it('should work correctly with conversions are not an array', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions('string');

            expect(invertedConversions).toBe('string');
        });

        it('should work correctly with empty conversions', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([]);

            expect(invertedConversions).toHaveLength(0);
        });

        it('should work correctly with one conversion and a factor greater 1', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 2
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].factor).toBe(0.5);
        });

        it('should work correctly with one conversion and a factor smaller 1', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 0.5
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].factor).toBe(2);
        });

        it('should work correctly with one conversion and a factor of 0', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 0
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].factor).toBe(Infinity);
        });

        it('should work correctly with one conversion and a power of 0', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: 0
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].power).toBe(0);
        });

        it('should work correctly with one conversion and a power of 2', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: 2
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].power).toBe(0.5);
        });

        it('should work correctly with one conversion and a power of 0.5', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: 0.5
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].power).toBe(2);
        });

        it('should work correctly with one conversion and a power of -2', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                power: -2
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].power).toBe(-0.5);
        });

        it('should work correctly with one conversion and an offset 1000', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                offset: 1000
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].offset).toBe(-1000);
        });

        it('should work correctly with one conversion and an offset -500', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                offset: -500
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].offset).toBe(500);
        });

        it('should work correctly with one conversion and an unit change', () => {
            const spec = new Specification();

            const celsiusUnit = spec.getUnitById('DegreesCelsius');
            const fahrenheitUnit = spec.getUnitById('DegreesFahrenheit');

            const invertedConversions = spec.invertConversions([{
                sourceUnit: celsiusUnit,
                targetUnit: fahrenheitUnit,
            }]);

            expect(invertedConversions).toHaveLength(1);
            expect(invertedConversions[0].sourceUnit).toBe(fahrenheitUnit);
            expect(invertedConversions[0].targetUnit).toBe(celsiusUnit);
        });

        it('should work correctly with multiple conversions using a factor of 2 and an offset -10', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                factor: 2
            }, {
                offset: -10
            }]);

            expect(invertedConversions).toHaveLength(2);
            expect(invertedConversions[0].offset).toBe(10);
            expect(invertedConversions[1].factor).toBe(0.5);
        });

        it('should work correctly with multiple conversions using an offset 10 and a factor of 0.5', () => {
            const spec = new Specification();

            const invertedConversions = spec.invertConversions([{
                offset: 10
            }, {
                factor: 0.5
            }]);

            expect(invertedConversions).toHaveLength(2);
            expect(invertedConversions[0].factor).toBe(2);
            expect(invertedConversions[1].offset).toBe(-10);
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

            expect(invertedConversions).toHaveLength(2);
            expect(invertedConversions [0].offset).toBe(-32);
            expect(invertedConversions [0].sourceUnit).toBe(fahrenheitUnit);
            expect(invertedConversions [0].targetUnit).toBe(noneUnit);
            expect(invertedConversions [1].factor).toBe(5 / 9);
            expect(invertedConversions [1].sourceUnit).toBe(noneUnit);
            expect(invertedConversions [1].targetUnit).toBe(celsiusUnit);
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

        const checkedSourceUnitCodes = new Set();
        const checkedTargetUnitCodes = new Set();

        const expectConversion = function(rawValue, sourceUnitCode, targetUnitCode) {
            checkedSourceUnitCodes.add(sourceUnitCode);
            checkedTargetUnitCodes.add(targetUnitCode);

            const spec = new Specification();

            const sourceUnit = specData.units [sourceUnitCode];
            const targetUnit = specData.units [targetUnitCode];

            expect(sourceUnit.unitCode).toBe(sourceUnitCode);
            expect(targetUnit.unitCode).toBe(targetUnitCode);

            const result = spec.convertRawValue(rawValue, sourceUnit, targetUnit);

            expect(result.unit).toBe(targetUnit);

            return expect(result.rawValue);
        };

        const delta = 9;

        describe('Unit Family "Energy"', () => {

            it('should convert from "Btus" to "GramsCO2Gas"', () => {
                expectConversion(0, 'Btus', 'GramsCO2Gas').toBeCloseTo(0, delta);
                expectConversion(1000000, 'Btus', 'GramsCO2Gas').toBeCloseTo(74323.12035187425, delta);
            });

            it('should convert from "GramsCO2Gas" to "GramsCO2Oil"', () => {
                expectConversion(0, 'GramsCO2Gas', 'GramsCO2Oil').toBeCloseTo(0, delta);
                expectConversion(10, 'GramsCO2Gas', 'GramsCO2Oil').toBeCloseTo(22.397476, 6);
            });

            it('should convert from "GramsCO2Oil" to "KiloBtus"', () => {
                expectConversion(0, 'GramsCO2Oil', 'KiloBtus').toBeCloseTo(0, delta);
                expectConversion(1000000, 'GramsCO2Oil', 'KiloBtus').toBeCloseTo(6007.267605633803, delta);
            });

            it('should convert from "KiloBtus" to "KilogramsCO2Gas"', () => {
                expectConversion(0, 'KiloBtus', 'KilogramsCO2Gas').toBeCloseTo(0, delta);
                expectConversion(1000000, 'KiloBtus', 'KilogramsCO2Gas').toBeCloseTo(74323.12035187425, delta);
            });

            it('should convert from "KilogramsCO2Gas" to "KilogramsCO2Oil"', () => {
                expectConversion(0, 'KilogramsCO2Gas', 'KilogramsCO2Oil').toBeCloseTo(0, delta);
                expectConversion(10, 'KilogramsCO2Gas', 'KilogramsCO2Oil').toBeCloseTo(22.397476, 6);
            });

            it('should convert from "KilogramsCO2Oil" to "KilowattHours"', () => {
                expectConversion(0, 'KilogramsCO2Oil', 'KilowattHours').toBeCloseTo(0, delta);
                expectConversion(1000000, 'KilogramsCO2Oil', 'KilowattHours').toBeCloseTo(1760563.3802816903, delta);
            });

            it('should convert from "KilowattHours" to "MegaBtus"', () => {
                expectConversion(0, 'KilowattHours', 'MegaBtus').toBeCloseTo(0, delta);
                expectConversion(1000000, 'KilowattHours', 'MegaBtus').toBeCloseTo(3412.128, delta);
            });

            it('should convert from "MegaBtus" to "MegawattHours"', () => {
                expectConversion(0, 'MegaBtus', 'MegawattHours').toBeCloseTo(0, delta);
                expectConversion(1, 'MegaBtus', 'MegawattHours').toBeCloseTo(0.293072241, delta);
            });

            it('should convert from "MegawattHours" to "TonsCO2Gas"', () => {
                expectConversion(0, 'MegawattHours', 'TonsCO2Gas').toBeCloseTo(0, delta);
                expectConversion(1000000, 'MegawattHours', 'TonsCO2Gas').toBeCloseTo(253600, delta);
            });

            it('should convert from "TonsCO2Gas" to "TonsCO2Oil"', () => {
                expectConversion(0, 'TonsCO2Gas', 'TonsCO2Oil').toBeCloseTo(0, delta);
                expectConversion(10, 'TonsCO2Gas', 'TonsCO2Oil').toBeCloseTo(22.397476, 6);
            });

            it('should convert from "TonsCO2Oil" to "WattHours"', () => {
                expectConversion(0, 'TonsCO2Oil', 'WattHours').toBeCloseTo(0, delta);
                expectConversion(10, 'TonsCO2Oil', 'WattHours').toBeCloseTo(17605633.8, 2);
            });

            it('should convert from "WattHours" to "Btus"', () => {
                expectConversion(0, 'WattHours', 'Btus').toBeCloseTo(0, delta);
                expectConversion(1000000, 'WattHours', 'Btus').toBeCloseTo(3412128, delta);
            });

        });

        describe('Unit Family "Power"', () => {

            it('should convert from "Kilowatts" to "Watts"', () => {
                expectConversion(0, 'Kilowatts', 'Watts').toBeCloseTo(0, delta);
                expectConversion(1000000, 'Kilowatts', 'Watts').toBeCloseTo(1000000000, delta);
            });

            it('should convert from "Watts" to "Kilowatts"', () => {
                expectConversion(0, 'Watts', 'Kilowatts').toBeCloseTo(0, delta);
                expectConversion(1000000, 'Watts', 'Kilowatts').toBeCloseTo(1000, delta);
            });

        });

        describe('Unit Family "Pressure"', () => {

            it('should convert from "Bars" to "PoundsForcePerSquareInch"', () => {
                expectConversion(0, 'Bars', 'PoundsForcePerSquareInch').toBeCloseTo(0, delta);
                expectConversion(10, 'Bars', 'PoundsForcePerSquareInch').toBeCloseTo(145.037738, delta);
            });

            it('should convert from "PoundsForcePerSquareInch" to "Bars"', () => {
                expectConversion(0, 'PoundsForcePerSquareInch', 'Bars').toBeCloseTo(0, delta);
                expectConversion(100, 'PoundsForcePerSquareInch', 'Bars').toBeCloseTo(6.89475728, delta);
            });

        });

        describe('Unit Family "Temperature"', () => {

            it('should convert from "DegreesCelsius" to "DegreesFahrenheit"', () => {
                expectConversion(0, 'DegreesCelsius', 'DegreesFahrenheit').toBeCloseTo(32, delta);
                expectConversion(100, 'DegreesCelsius', 'DegreesFahrenheit').toBeCloseTo(212, delta);
            });

            it('should convert from "DegreesFahrenheit" to "DegreesCelsius"', () => {
                expectConversion(32, 'DegreesFahrenheit', 'DegreesCelsius').toBeCloseTo(0, delta);
                expectConversion(212, 'DegreesFahrenheit', 'DegreesCelsius').toBeCloseTo(100, delta);
            });

        });

        describe('Unit Family "Time"', () => {

            it('should convert from "Days" to "Hours"', () => {
                expectConversion(0, 'Days', 'Hours').toBeCloseTo(0, delta);
                expectConversion(10, 'Days', 'Hours').toBeCloseTo(240, delta);
            });

            it('should convert from "Hours" to "Minutes"', () => {
                expectConversion(0, 'Hours', 'Minutes').toBeCloseTo(0, delta);
                expectConversion(10, 'Hours', 'Minutes').toBeCloseTo(600, delta);
            });

            it('should convert from "Minutes" to "Seconds"', () => {
                expectConversion(0, 'Minutes', 'Seconds').toBeCloseTo(0, delta);
                expectConversion(10, 'Minutes', 'Seconds').toBeCloseTo(600, delta);
            });

            it('should convert from "Seconds" to "Days"', () => {
                expectConversion(0, 'Seconds', 'Days').toBeCloseTo(0, delta);
                expectConversion(86400, 'Seconds', 'Days').toBeCloseTo(1, delta);
            });

        });

        describe('Unit Family "Volume"', () => {

            it('should convert from "CubicMeters" to "Gallons"', () => {
                expectConversion(0, 'CubicMeters', 'Gallons').toBeCloseTo(0, delta);
                expectConversion(10, 'CubicMeters', 'Gallons').toBeCloseTo(2641.72, 0.005);
            });

            it('should convert from "Gallons" to "Liters"', () => {
                expectConversion(0, 'Gallons', 'Liters').toBeCloseTo(0, delta);
                expectConversion(10, 'Gallons', 'Liters').toBeCloseTo(37.8541, 0.00005);
            });

            it('should convert from "Liters" to "CubicMeters"', () => {
                expectConversion(0, 'Liters', 'CubicMeters').toBeCloseTo(0, delta);
                expectConversion(10000, 'Liters', 'CubicMeters').toBeCloseTo(10, delta);
            });

        });

        describe('Unit Family "VolumeFlow"', () => {

            it('should convert from "CubicMetersPerHour" to "GallonsPerHour"', () => {
                expectConversion(0, 'CubicMetersPerHour', 'GallonsPerHour').toBeCloseTo(0, delta);
                expectConversion(10, 'CubicMetersPerHour', 'GallonsPerHour').toBeCloseTo(2641.72, 0.005);
            });

            it('should convert from "GallonsPerHour" to "GallonsPerMinute"', () => {
                expectConversion(0, 'GallonsPerHour', 'GallonsPerMinute').toBeCloseTo(0, delta);
                expectConversion(600, 'GallonsPerHour', 'GallonsPerMinute').toBeCloseTo(10, delta);
            });

            it('should convert from "GallonsPerMinute" to "LitersPerHour"', () => {
                expectConversion(0, 'GallonsPerMinute', 'LitersPerHour').toBeCloseTo(0, delta);
                expectConversion(10, 'GallonsPerMinute', 'LitersPerHour').toBeCloseTo(2271.2475, 0.00005);
            });

            it('should convert from "LitersPerHour" to "LitersPerMinute"', () => {
                expectConversion(0, 'LitersPerHour', 'LitersPerMinute').toBeCloseTo(0, delta);
                expectConversion(6000, 'LitersPerHour', 'LitersPerMinute').toBeCloseTo(100, delta);
            });

            it('should convert from "LitersPerMinute" to "CubicMetersPerHour"', () => {
                expectConversion(0, 'LitersPerMinute', 'CubicMetersPerHour').toBeCloseTo(0, delta);
                expectConversion(1000, 'LitersPerMinute', 'CubicMetersPerHour').toBeCloseTo(60, delta);
            });

        });

        const expectConversions = function(rawValue, conversions) {
            const spec = new Specification();

            conversions = conversions.map((conversion) => {
                const { sourceUnitCode, targetUnitCode } = conversion;

                const sourceUnit = sourceUnitCode && specData.units [sourceUnitCode];
                const targetUnit = targetUnitCode && specData.units [targetUnitCode];

                if (sourceUnitCode) {
                    expect(sourceUnit.unitCode).toBe(sourceUnitCode);
                }
                if (targetUnitCode) {
                    expect(targetUnit.unitCode).toBe(targetUnitCode);
                }

                return {
                    power: conversion.power,
                    factor: conversion.factor,
                    offset: conversion.offset,
                    sourceUnit,
                    targetUnit,
                };
            });

            const result = spec.convertRawValue(rawValue, conversions);

            expect(result.unit).toBe(conversions [conversions.length - 1].targetUnit);

            return expect(result.rawValue);
        };

        describe('Multiple conversions in one step', () => {

            it('should return rawValue converted to rawValue / 1000', () => {
                expectConversions(1234, [{
                    sourceUnitCode: 'WattHours',
                    targetUnitCode: 'KilowattHours',
                }]).toBeCloseTo(1.234, delta);
            });

            it('should return converted rawValue plus offset', () => {
                expectConversions(1234, [{
                    sourceUnitCode: 'WattHours',
                    targetUnitCode: 'KilowattHours',
                }, {
                    offset: 123,
                }]).toBeCloseTo(124.234, delta);
            });

            it('should return rawValue * 10', () => {
                expectConversions(1234, [{
                    factor: 10,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(12340, delta);
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
                }]).toBeCloseTo(1234 * 10 / 1000 + 123, delta);
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
                }]).toBeCloseTo(212, delta);
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
                }]).toBeCloseTo(100, delta);
            });

            it('should return rawValue * factor plus offset', () => {
                expectConversions(1234, [{
                    factor: 10,
                    offset: 0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(12340.5, delta);
            });

            it('pow(1234, 0) * 10 + 0.5', () => {
                expectConversions(1234, [{
                    power: 0,
                    factor: 10,
                    offset: 0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(10.5, delta);
            });

            it('pow(0, 5) * 10 - 0.5', () => {
                expectConversions(0, [{
                    power: 5,
                    factor: 10,
                    offset: -0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(-0.5, delta);
            });

            it('pow(0, -2) * 10', () => {
                expectConversions(0, [{
                    power: -2,
                    factor: 10,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(0, delta);
            });

            it('pow(1234, 1) * 10 + 0.5', () => {
                expectConversions(1234, [{
                    power: 1,
                    factor: 10,
                    offset: 0.5,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(12340.5, delta);
            });

            it('pow(10, 2) * 10 + 1000', () => {
                expectConversions(10, [{
                    power: 2,
                    factor: 10,
                    offset: 1000,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(2000, delta);
            });

            it('pow(100, 0.5) * 5 + 50', () => {
                expectConversions(100, [{
                    power: 0.5,
                    factor: 5,
                    offset: 50,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(100, delta);
            });

            it('pow(100, -1) * 10 + 0.9', () => {
                expectConversions(100, [{
                    power: -1,
                    factor: 10,
                    offset: 0.9,
                    sourceUnitCode: 'None',
                    targetUnitCode: 'WattHours',
                }]).toBeCloseTo(1, delta);
            });
        });

        describe('Units', () => {

            it('should have checked all units as source units', () => {
                expect(Array.from(checkedSourceUnitCodes.values()).sort()).toEqual(knownFamilyUnitCodes.sort());
            });

            it('should have checked all units as target units', () => {
                expect(Array.from(checkedTargetUnitCodes.values()).sort()).toEqual(knownFamilyUnitCodes.sort());
            });

        });

    });

    describe('#formatTextValueFromRawValue', () => {

        it('should work correctly with all arguments', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8, 'DegreesCelsius');

            expect(textValue).toBe('888.8 °C');
        });

        it('should work correctly without unit', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8);

            expect(textValue).toBe('888.8 °C');
        });

        it('should work correctly with "None" unit', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, 888.8, 'None');

            expect(textValue).toBe('888.8');
        });

        it('should work correctly without raw value', () => {
            const spec = new Specification();

            const packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');

            const textValue = spec.formatTextValueFromRawValue(packetFieldSpec, null, 'None');

            expect(textValue).toBe('');
        });

        it('should work correctly without packet field spec', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValue(null, 888.8, 'DegreesCelsius');

            expect(textValue).toBe('888.8 °C');
        });

    });

    describe('#formatTextValueFromRawValueInternal', () => {

        it('should work correctly for root type "Time"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(721, null, 'Time', 0, null);

            expect(textValue).toBe('12:01');
        });

        it('should work correctly for root type "Weektime"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(3 * 1440 + 721, null, 'Weektime', 0, null);

            expect(textValue).toBe('Th,12:01');
        });

        it('should work correctly for root type "DateTime"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(409418262, null, 'DateTime', 0, null);

            expect(textValue).toBe('12/22/2013 15:17:42');
        });

        it('should work correctly for root type "Number" and precision "0"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 0, null);

            expect(textValue).toBe('12346');
        });

        it('should work correctly for root type "Number" and precision "1"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 1, null);

            expect(textValue).toBe('12345.7');
        });

        it('should work correctly for root type "Number" and precision "2"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 2, null);

            expect(textValue).toBe('12345.68');
        });

        it('should work correctly for root type "Number" and precision "3"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 3, null);

            expect(textValue).toBe('12345.679');
        });

        it('should work correctly for root type "Number" and precision "4"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(12345.6789, null, 'Number', 4, null);

            expect(textValue).toBe('12345.6789');
        });

        it('should work correctly for root type "Number" and precision "10"', () => {
            const spec = new Specification();

            const textValue = spec.formatTextValueFromRawValueInternal(1.23456789, null, 'Number', 10, null);

            expect(textValue).toBe('1.2345678900');
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

        it('should work correctly with an unfiltered spec', () => {
            const spec = new Specification();

            const pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expect(pfs.length).toBe(8);
            expectTypeToBe(pfs [0], 'object');
            expect(pfs [0].id).toBe('01_0010_7722_10_0100_000_2_0');
            expectTypeToBe(pfs [0].packet, 'object');
            expectTypeToBe(pfs [0].packetSpec, 'object');
            expectTypeToBe(pfs [0].packetFieldSpec, 'object');
            expectTypeToBe(pfs [0].origPacketFieldSpec, 'object');
            expect(pfs [0].name).toBe('Flow temperature');
            expect(pfs [0].rawValue).toBeCloseTo(888.8, 2);
            expectTypeToBe(pfs [0].formatTextValue, 'function');
            expect(pfs [0].formatTextValue()).toBe('888.8 °C');
            expectTypeToBe(pfs [0].getRoundedRawValue, 'function');
            expect(pfs [0].getRoundedRawValue()).toBe(888.8);
            expectTypeToBe(pfs [5], 'object');
            expect(pfs [5].id).toBe('02_0010_7722_10_0100_002_2_0');
            expectTypeToBe(pfs [5].packet, 'object');
            expectTypeToBe(pfs [5].packetSpec, 'object');
            expectTypeToBe(pfs [5].packetFieldSpec, 'object');
            expectTypeToBe(pfs [5].origPacketFieldSpec, 'object');
            expect(pfs [5].name).toBe('Return temperature');
            expect(pfs [5].rawValue).toBeCloseTo(-888.8, 2);
            expectTypeToBe(pfs [5].formatTextValue, 'function');
            expect(pfs [5].formatTextValue()).toBe('-888.8 °C');
            expectTypeToBe(pfs [5].getRoundedRawValue, 'function');
            expect(pfs [5].getRoundedRawValue()).toBe(-888.8);
        });

        it('should work correctly with a filtered spec', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData1
            });

            const pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expectTypeToBe(pfs, 'array');
            expect(pfs.length).toBe(2);
            expectTypeToBe(pfs [0], 'object');
            expect(pfs [0].id).toBe('DemoValue1');
            expectTypeToBe(pfs [0].packet, 'object');
            expectTypeToBe(pfs [0].packetSpec, 'object');
            expectTypeToBe(pfs [0].packetFieldSpec, 'object');
            expectTypeToBe(pfs [0].origPacketFieldSpec, 'object');
            expect(pfs [0].name).toBe('T-flow');
            expect(pfs [0].rawValue).toBeCloseTo(888.8, 2);
            expectTypeToBe(pfs [0].formatTextValue, 'function');
            expect(pfs [0].formatTextValue()).toBe('888.8 °C');
            expectTypeToBe(pfs [1], 'object');
            expect(pfs [1].id).toBe('DemoValue2');
            expectTypeToBe(pfs [1].packet, 'object');
            expectTypeToBe(pfs [1].packetSpec, 'object');
            expectTypeToBe(pfs [1].packetFieldSpec, 'object');
            expectTypeToBe(pfs [1].origPacketFieldSpec, 'object');
            expect(pfs [1].name).toBe('T-return');
            expect(pfs [1].rawValue).toBeCloseTo(-888.8, 2);
            expectTypeToBe(pfs [1].formatTextValue, 'function');
            expect(pfs [1].formatTextValue()).toBe('-888.8 °C');
        });

        it('should work correctly with a filtered spec but empty headers', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData1
            });

            const pfs = spec.getPacketFieldsForHeaders([]);

            expectTypeToBe(pfs, 'array');
            expect(pfs.length).toBe(2);
            expectTypeToBe(pfs [0], 'object');
            expect(pfs [0].id).toBe('DemoValue1');
            expectTypeToBe(pfs [0].packet, 'undefined');
            expectTypeToBe(pfs [0].packetSpec, 'object');
            expectTypeToBe(pfs [0].packetFieldSpec, 'object');
            expectTypeToBe(pfs [0].origPacketFieldSpec, 'object');
            expect(pfs [0].name).toBe('T-flow');
            expect(pfs [0].rawValue).toBe(undefined);
            expectTypeToBe(pfs [0].formatTextValue, 'function');
            expect(pfs [0].formatTextValue()).toBe('');
            expectTypeToBe(pfs [1], 'object');
            expect(pfs [1].id).toBe('DemoValue2');
            expectTypeToBe(pfs [1].packet, 'undefined');
            expectTypeToBe(pfs [1].packetSpec, 'object');
            expectTypeToBe(pfs [1].packetFieldSpec, 'object');
            expectTypeToBe(pfs [1].origPacketFieldSpec, 'object');
            expect(pfs [1].name).toBe('T-return');
            expect(pfs [1].rawValue).toBe(undefined);
            expectTypeToBe(pfs [1].formatTextValue, 'function');
            expect(pfs [1].formatTextValue()).toBe('');
        });

        it('should work correctly with a filtered spec and conversion', () => {
            const spec = new Specification({
                specificationData: rawSpecificationData2
            });

            const pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expectTypeToBe(pfs, 'array');
            expect(pfs.length).toBe(1);
            expectTypeToBe(pfs [0], 'object');
            expect(pfs [0].id).toBe('DemoValue3');
            expectTypeToBe(pfs [0].packet, 'object');
            expectTypeToBe(pfs [0].packetSpec, 'object');
            expectTypeToBe(pfs [0].packetFieldSpec, 'object');
            expectTypeToBe(pfs [0].origPacketFieldSpec, 'object');
            expect(pfs [0].name).toBe('T-return');
            expect(pfs [0].rawValue).toBeCloseTo(32.0, 2);
            expectTypeToBe(pfs [0].formatTextValue, 'function');
            expect(pfs [0].formatTextValue()).toBe('32.0 °F');
        });

        it('should work correctly for partial packets', () => {
            const spec = new Specification({
            });

            const pfs = spec.getPacketFieldsForHeaders([ header3 ]);

            expectTypeToBe(pfs, 'array');
            expect(pfs.length).toBe(9);
            expectTypeToBe(pfs [4], 'object');
            expect(pfs [4].id).toBe('03_0010_7E31_10_0100_016_4_0');
            expectTypeToBe(pfs [4].packet, 'object');
            expectTypeToBe(pfs [4].packetSpec, 'object');
            expectTypeToBe(pfs [4].packetFieldSpec, 'object');
            expectTypeToBe(pfs [4].origPacketFieldSpec, 'object');
            expect(pfs [4].name).toBe('Volume in total');
            expect(pfs [4].rawValue).toBe(null);
            expectTypeToBe(pfs [4].formatTextValue, 'function');
            expect(pfs [4].formatTextValue()).toBe('');
        });
    });

    describe('#setPacketFieldRawValues', () => {

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

            expect(header1.frameData.slice(0, 4).toString('hex')).toBe('d204d7f6');
            expect(header2.frameData.slice(0, 4).toString('hex')).toBe('7b0016ff');

            pfs = spec.getPacketFieldsForHeaders([ header1, header2 ]);

            expectTypeToBe(pfs, 'array');
            expect(pfs).toHaveLength(8);

            let pf = pfs [0];
            expectTypeToBe(pf, 'object');
            expect(pf.id).toBe('01_0010_7722_10_0100_000_2_0');
            expect(pf.rawValue).toBeCloseTo(123.4, 2);

            pf = pfs [1];
            expectTypeToBe(pf, 'object');
            expect(pf.id).toBe('01_0010_7722_10_0100_002_2_0');
            expect(pf.rawValue).toBeCloseTo(-234.5, 2);

            pf = pfs [4];
            expectTypeToBe(pf, 'object');
            expect(pf.id).toBe('02_0010_7722_10_0100_000_2_0');
            expect(pf.rawValue).toBeCloseTo(12.3, 2);

            pf = pfs [5];
            expectTypeToBe(pf, 'object');
            expect(pf.id).toBe('02_0010_7722_10_0100_002_2_0');
            expect(pf.rawValue).toBeCloseTo(-23.4, 2);
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

            expect(header1.frameData.readUInt16LE(2)).toBe(789);
            expect(header1.frameData.readUInt16LE(0)).toBe(456);
            expect(header1.frameData.readUInt16LE(12)).toBe(123);

            pfs = spec.getPacketFieldsForHeaders(headers);

            expect(pfs).toHaveLength(8);

            const pf = pfs [0];
            expectTypeToBe(pf, 'object');
            expect(pf.id).toBe('01_0000_4010_10_0100_002_2_0');
            expect(pf.rawValue).toBeCloseTo(123456789, 2);
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

        it('should work correctly', () => {
            const spec = new Specification();

            const fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([ header1, header2 ]);

            expectTypeToBe(fpfs, 'array');
            expect(fpfs.length).toBe(8);
            expectTypeToBe(fpfs [0], 'object');
            expect(fpfs [0].filteredPacketFieldId).toBe('01_0010_7722_10_0100_000_2_0');
            expect(fpfs [0].packetId).toBe('01_0010_7722_10_0100');
            expect(fpfs [0].fieldId).toBe('000_2_0');
            expect(fpfs [0].name).toBe('Flow temperature');
            expect(fpfs [0].type.typeId).toBe('Number_0_1_DegreesCelsius');
            expectTypeToBe(fpfs [0].getRawValue, 'function');
            expectTypeToBe(fpfs [4], 'object');
            expect(fpfs [4].filteredPacketFieldId).toBe('02_0010_7722_10_0100_000_2_0');
            expect(fpfs [4].packetId).toBe('02_0010_7722_10_0100');
            expect(fpfs [4].fieldId).toBe('000_2_0');
            expect(fpfs [4].name).toBe('Flow temperature');
            expect(fpfs [4].type.typeId).toBe('Number_0_1_DegreesCelsius');
            expectTypeToBe(fpfs [4].getRawValue, 'function');
        });

        it('should work correctly with empty headers', () => {
            const spec = new Specification();

            const fpfs = spec.getFilteredPacketFieldSpecificationsForHeaders([]);

            expectTypeToBe(fpfs, 'array');
            expect(fpfs.length).toBe(0);
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

        it('should work correctly', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            expect(sections).toHaveLength(3);

            let section = sections [0];
            expectOwnPropertyNamesToEqual(section, sectionKeys);
            expect(section.sectionId).toBe('01_0015_7721_10_0100_01_08_4');
            expect(section.surrogatePacketId).toBe('01_8015_4CB0_10_6413');
            expectTypeToBe(section.packet, 'object');
            expectTypeToBe(section.packetSpec, 'object');
            expect(section.startOffset).toBe(0);
            expect(section.endOffset).toBe(8);
            expect(section.type).toBe(8);
            expect(section.payloadCount).toBe(4);
            expect(section.frameCount).toBe(1);
            expect(section.frameData);
            expectTypeToBe(section.frameData, 'buffer');

            let { frameData } = section;
            expect(frameData.length).toBe(8);
            expect(frameData.toString('hex')).toBe('0108000064000000');

            section = sections [1];
            expectOwnPropertyNamesToEqual(section, sectionKeys);
            expect(section.sectionId).toBe('01_0015_7721_10_0100_02_0A_1');
            expect(section.surrogatePacketId).toBe('01_8015_6659_10_49D0');
            expectTypeToBe(section.packet, 'object');
            expectTypeToBe(section.packetSpec, 'object');
            expect(section.startOffset).toBe(8);
            expect(section.endOffset).toBe(20);
            expect(section.type).toBe(10);
            expect(section.payloadCount).toBe(1);
            expect(section.frameCount).toBe(2);
            expect(section.frameData);
            expectTypeToBe(section.frameData, 'buffer');

            ({ frameData } = section);
            expect(frameData.length).toBe(12);
            expect(frameData.toString('hex')).toBe('020a0000b822b82200000000');

            section = sections [2];
            expectOwnPropertyNamesToEqual(section, sectionKeys);
            expect(section.sectionId).toBe('01_0015_7721_10_0100_01_0B_1');
            expect(section.surrogatePacketId).toBe('01_8015_C162_10_EFC8');
            expectTypeToBe(section.packet, 'object');
            expectTypeToBe(section.packetSpec, 'object');
            expect(section.startOffset).toBe(20);
            expect(section.endOffset).toBe(28);
            expect(section.type).toBe(11);
            expect(section.payloadCount).toBe(1);
            expect(section.frameCount).toBe(1);
            expect(section.frameData);
            expectTypeToBe(section.frameData, 'buffer');

            ({ frameData } = section);
            expect(frameData.length).toBe(8);
            expect(frameData.toString('hex')).toBe('010b00000b000000');
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

            expect(sections).toHaveLength(expectedValues.length);

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

                expectOwnPropertyNamesToEqual(section, sectionKeys);
                expect(section.sectionId).toBe(sectionId);
                expect(section.surrogatePacketId).toBe(surrogatePacketId);
                expectTypeToBe(section.packet, 'object');
                expectTypeToBe(section.packetSpec, 'object');
                expect(section.startOffset).toBe(startOffset);
                expect(section.endOffset).toBe(endOffset);
                expect(section.type).toBe(type);
                expect(section.payloadCount).toBe(payloadCount);
                expect(section.frameCount).toBe(frameCount);
                expect(section.frameData);
                expectTypeToBe(section.frameData, 'buffer');

                expect(section.frameData.toString('hex')).toBe(frameData);
            }
        });

    });

    describe('#getBlockTypePacketSpecificationsForSections', () => {

        it('should work correctly', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            const packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            expect(packetSpecs).toHaveLength(3);

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

            expectOwnPropertyNamesToEqual(packetSpec, packetSpecKeys);
            expect(packetSpec.packetId).toBe('01_8015_4CB0_10_6413');
            expect(packetSpec.sectionId).toBe('01_0015_7721_10_0100_01_08_4');
            expect(packetSpec.packetFields).toHaveLength(4);
            expect(packetSpec.channel).toBe(1);
            expect(packetSpec.destinationAddress).toBe(0x0015);
            expect(packetSpec.sourceAddress).toBe(0x7721);
            expect(packetSpec.protocolVersion).toBe(0x10);
            expect(packetSpec.command).toBe(0x0100);
            expect(packetSpec.info).toBe(0);
            expect(packetSpec.fullName).toBe('VBus #1: DeltaSol E [Regler] => Standard-Infos');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');

            let pfs = packetSpec.packetFields [0];
            expectOwnPropertyNamesToEqual(pfs, packetFieldSpecKeys);
            expect(pfs.fieldId).toBe('01_0015_7721_10_0100_01_08_4_004_1_0');
            expect(pfs.name).toBe('Drehzahl Relais 1');
            expect(pfs.type.typeId).toBe('Number_1_Percent');
            expect(pfs.factor).toBe(1);
            expect(pfs.parts).toHaveLength(1);
            expectTypeToBe(pfs.getRawValue, 'function');
            expectTypeToBe(pfs.setRawValue, 'function');

            let rawValue = pfs.getRawValue(sections [0].frameData, 0, sections [0].frameData.length);
            expect(rawValue).toBe(100);

            packetSpec = packetSpecs [1];
            expectOwnPropertyNamesToEqual(packetSpec, packetSpecKeys);
            expect(packetSpec.packetId).toBe('01_8015_6659_10_49D0');
            expect(packetSpec.sectionId).toBe('01_0015_7721_10_0100_02_0A_1');
            expect(packetSpec.packetFields).toHaveLength(3);
            expect(packetSpec.channel).toBe(1);
            expect(packetSpec.destinationAddress).toBe(0x0015);
            expect(packetSpec.sourceAddress).toBe(0x7721);
            expect(packetSpec.protocolVersion).toBe(0x10);
            expect(packetSpec.command).toBe(0x0100);
            expect(packetSpec.info).toBe(0);
            expect(packetSpec.fullName).toBe('VBus #1: DeltaSol E [Regler] => Standard-Infos');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');

            pfs = packetSpec.packetFields [0];
            expectOwnPropertyNamesToEqual(pfs, packetFieldSpecKeys);
            expect(pfs.fieldId).toBe('01_0015_7721_10_0100_02_0A_1_004_2_0');
            expect(pfs.name).toBe('Temperatur Kollektor');
            expect(pfs.type.typeId).toBe('Number_0_1_DegreesCelsius');
            expect(pfs.factor).toBe(0.1);
            expect(pfs.parts).toHaveLength(2);
            expectTypeToBe(pfs.getRawValue, 'function');
            expectTypeToBe(pfs.setRawValue, 'function');

            rawValue = pfs.getRawValue(sections [1].frameData, 0, sections [1].frameData.length);
            expect(rawValue).toBeCloseTo(888.8, 2);

            packetSpec = packetSpecs [2];
            expectOwnPropertyNamesToEqual(packetSpec, packetSpecKeys);
            expect(packetSpec.packetId).toBe('01_8015_C162_10_EFC8');
            expect(packetSpec.sectionId).toBe('01_0015_7721_10_0100_01_0B_1');
            expect(packetSpec.packetFields).toHaveLength(1);
            expect(packetSpec.channel).toBe(1);
            expect(packetSpec.destinationAddress).toBe(0x0015);
            expect(packetSpec.sourceAddress).toBe(0x7721);
            expect(packetSpec.protocolVersion).toBe(0x10);
            expect(packetSpec.command).toBe(0x0100);
            expect(packetSpec.info).toBe(0);
            expect(packetSpec.fullName).toBe('VBus #1: DeltaSol E [Regler] => Standard-Infos');
            expectTypeToBe(packetSpec.destinationDevice, 'object');
            expectTypeToBe(packetSpec.sourceDevice, 'object');

            pfs = packetSpec.packetFields [0];
            expectOwnPropertyNamesToEqual(pfs, packetFieldSpecKeys);
            expect(pfs.fieldId).toBe('01_0015_7721_10_0100_01_0B_1_004_4_0');
            expect(pfs.name).toBe('Fehlermaske');
            expect(pfs.type.typeId).toBe('Number_1_None');
            expect(pfs.factor).toBe(1);
            expect(pfs.parts).toHaveLength(4);
            expectTypeToBe(pfs.getRawValue, 'function');
            expectTypeToBe(pfs.setRawValue, 'function');

            rawValue = pfs.getRawValue(sections [2].frameData, 0, sections [2].frameData.length);
            expect(rawValue).toBe(11);
        });

    });

    describe('#getBlockTypeFieldsForSections', () => {

        it('should work correctly', () => {
            const spec = new Specification();

            const sections = spec.getBlockTypeSectionsForHeaders([ nonBlockTypeHeader1, blockTypeHeader1 ]);

            const packetSpecs = spec.getBlockTypePacketSpecificationsForSections(sections);

            const packetFields = spec.getBlockTypeFieldsForSections(sections);

            expect(packetFields).toHaveLength(8);

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
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField.id).toBe('01_8015_4CB0_10_6413_01_0015_7721_10_0100_01_08_4_004_1_0');
            expect(packetField.section).toBe(sections [0]);
            expect(packetField.packet).toBe(blockTypeHeader1);
            expect(packetField.packetSpec).toBe(packetSpecs [0]);
            expect(packetField.packetFieldSpec).toBe(packetSpecs [0].packetFields [0]);
            expect(packetField.origPacketFieldSpec).toBe(packetSpecs [0].packetFields [0]);
            expect(packetField.name).toBe('Pump speed relay 1');
            expect(packetField.rawValue).toBe(100);
            expectTypeToBe(packetField.formatTextValue, 'function');

            let textValue = packetField.formatTextValue();
            expect(textValue).toBe('100%');

            packetField = packetFields [1];
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField.id).toBe('01_8015_4CB0_10_6413_01_0015_7721_10_0100_01_08_4_005_1_0');
            expect(packetField.section).toBe(sections [0]);
            expect(packetField.packet).toBe(blockTypeHeader1);
            expect(packetField.packetSpec).toBe(packetSpecs [0]);
            expect(packetField.packetFieldSpec).toBe(packetSpecs [0].packetFields [1]);
            expect(packetField.origPacketFieldSpec).toBe(packetSpecs [0].packetFields [1]);
            expect(packetField.name).toBe('Pump speed relay 2');
            expect(packetField.rawValue).toBe(0);
            expectTypeToBe(packetField.formatTextValue, 'function');

            textValue = packetField.formatTextValue();
            expect(textValue).toBe('0%');

            packetField = packetFields [4];
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField.id).toBe('01_8015_6659_10_49D0_01_0015_7721_10_0100_02_0A_1_004_2_0');
            expect(packetField.section).toBe(sections [1]);
            expect(packetField.packet).toBe(blockTypeHeader1);
            expect(packetField.packetSpec).toBe(packetSpecs [1]);
            expect(packetField.packetFieldSpec).toBe(packetSpecs [1].packetFields [0]);
            expect(packetField.origPacketFieldSpec).toBe(packetSpecs [1].packetFields [0]);
            expect(packetField.name).toBe('Temperatur Kollektor');
            expect(packetField.rawValue).toBeCloseTo(888.8, 2);
            expectTypeToBe(packetField.formatTextValue, 'function');

            textValue = packetField.formatTextValue();
            expect(textValue).toBe('888.8 °C');

            packetField = packetFields [6];
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField.id).toBe('01_8015_6659_10_49D0_01_0015_7721_10_0100_02_0A_1_008_4_0');
            expect(packetField.section).toBe(sections [1]);
            expect(packetField.packet).toBe(blockTypeHeader1);
            expect(packetField.packetSpec).toBe(packetSpecs [1]);
            expect(packetField.packetFieldSpec).toBe(packetSpecs [1].packetFields [2]);
            expect(packetField.origPacketFieldSpec).toBe(packetSpecs [1].packetFields [2]);
            expect(packetField.name).toBe('Heat quantity');
            expect(packetField.rawValue).toBe(0);
            expectTypeToBe(packetField.formatTextValue, 'function');

            textValue = packetField.formatTextValue();
            expect(textValue).toBe('0 Wh');

            packetField = packetFields [7];
            expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
            expect(packetField.id).toBe('01_8015_C162_10_EFC8_01_0015_7721_10_0100_01_0B_1_004_4_0');
            expect(packetField.section).toBe(sections [2]);
            expect(packetField.packet).toBe(blockTypeHeader1);
            expect(packetField.packetSpec).toBe(packetSpecs [2]);
            expect(packetField.packetFieldSpec).toBe(packetSpecs [2].packetFields [0]);
            expect(packetField.origPacketFieldSpec).toBe(packetSpecs [2].packetFields [0]);
            expect(packetField.name).toBe('Error mask');
            expect(packetField.rawValue).toBe(11);
            expectTypeToBe(packetField.formatTextValue, 'function');

            textValue = packetField.formatTextValue();
            expect(textValue).toBe('11');
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

            expect(packetFields).toHaveLength(expectedValues.length);

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

                expectOwnPropertyNamesToEqual(packetField, packetFieldKeys);
                expect(packetField.id).toBe(id);
                expect(packetField.section).toBe(sections [sectionIndex]);
                expect(packetField.packet).toBe(blockTypeHeader2);
                expect(packetField.packetSpec).toBe(packetSpecs [sectionIndex]);
                expect(packetField.packetFieldSpec).toBe(packetSpecs [sectionIndex].packetFields [fieldIndex]);
                expect(packetField.origPacketFieldSpec).toBe(packetSpecs [sectionIndex].packetFields [fieldIndex]);
                expect(packetField.name).toBe(name);
                expect(packetField.rawValue).toBeCloseTo(rawValue, 4);
                expectTypeToBe(packetField.formatTextValue, 'function');

                expect(packetField.formatTextValue()).toBe(textValue);
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

        expect(packetFields).toHaveLength(1);
        expect(packetFields [0].id).toBe('00_0010_772F_0100_10_000_2_0');
        expect(packetFields [0].packet).toBe(undefined);
        expect(packetFields [0].packetSpec).toBe(undefined);
        expect(packetFields [0].packetFieldSpec).toBe(packetFieldSpec);
        expect(packetFields [0].origPacketFieldSpec).toBe(undefined);
    });

    */

});
