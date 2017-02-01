/*! resol-vbus | Copyright (c) 2013-2015, Daniel Wippermann | MIT license */
'use strict';



var crypto = require('crypto');


var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var extend = require('./extend');
var I18N = require('./i18n');
var utils = require('./utils');

// var createVBusSpecificationData = require('./specification-data');

var SpecificationFile = require('./specification-file');



// var globalSpecificationData = utils.deepFreezeObjectTree(createVBusSpecificationData());
var globalSpecificationFile = SpecificationFile.getDefaultSpecificationFile()
var globalSpecificationData = null;
if (globalSpecificationFile) {
    globalSpecificationData = utils.deepFreezeObjectTree(globalSpecificationFile.getSpecificationData());
}

var globalSpecification;



var conversionFactors = {
    BtusPerWattHour: 3.412128,
    GramsCO2OilPerWattHour: 0.568,
    GramsCO2GasPerWattHour: 0.2536,

    GallonsPerLiter: 0.264172,

    PoundsForcePerSquareInchPerBar: 14.5037738,
};



var optionKeys = [
    'language'
];



var numberFormatCache = {};



/**
 * @typedef UnitSpecification
 * @type {object}
 * @property {String} unitId Unit identifier
 * @property {String} unitCode Unit code
 * @property {String} unitFamily Unit family
 * @property {String} unitText Unit text
 */

/**
 * @typedef TypeSpecification
 * @type {object}
 * @property {String} typeId Type identifier
 * @property {String} rootTypeId Root type identifier
 * @property {number} precision Precision for numeral values
 * @property {UnitSpecification} unit Unit object
 */

/**
 * @typedef DeviceSpecification
 * @type {object}
 * @property {string} deviceId Device identifier
 * @property {number} channel VBus channel
 * @property {number} selfAddress VBus address of the device itself
 * @property {number} peerAddress VBus address of the device's peer
 * @property {string} name Name of the device
 * @property {string} fullName Name of the device optionally prefixed with VBus channel (if it is not 0)
 */

/**
 * @typedef PacketSpecification
 * @type {object}
 * @property {string} packetId Packet identifier
 * @property {number} channel VBus channel
 * @property {number} destinationAddress VBus address of the destination device
 * @property {number} sourceAddress VBus address of the source device
 * @property {number} protocolVersion VBus protocol version
 * @property {number} command VBus command
 * @property {number} info Additional info for sorting purposes
 * @property {DeviceSpecification} destinationDevice DeviceSpecification object of the destination device
 * @property {DeviceSpecification} sourceDevice DeviceSpecification object of the source device
 * @property {PacketFieldSpecification[]} packetFields Array of PacketFieldSpecification objects
 */

/**
 * @typedef packetFieldGetRawValue
 * @type {function}
 * @param {Buffer} buffer Buffer object
 * @param {number} start Start index in the buffer
 * @param {number} end End index in the buffer
 */

/**
 * @typedef PacketFieldSpecification
 * @type {object}
 * @property {string} fieldId Field identifier
 * @property {object} name Object containing names by language code
 * @property {TypeSpecification} type TypeSpecification object
 * @property {packetFieldGetRawValue} getRawValue Function to get raw value from a buffer
 */

/**
 * @typedef PacketField
 * @type {object}
 * @property {string} id Packet field identifier
 * @property {Packet} packet Packet
 * @property {PacketSpecification} packetSpec
 * @property {PacketFieldSpecification} packetFieldSpec
 * @property {PacketFieldSpecification} origPacketFieldSpec
 * @property {string} name
 * @property {number} rawValue Raw value
 * @property {function} formatTextValue Function to format this packet field's raw value into textual form
 */

/**
 * @typedef FilteredPacketFieldSpecification
 * @type {object}
 * @property {string} filteredPacketFieldId
 * @property {string} packetId
 * @property {string} fieldId
 * @property {string} name
 * @property {string} type
 * @property {string} getRawValue
 */

/**
 * @typedef BlockTypeSection
 * @type {object}
 * @property {string} sectionId Section identifier
 * @property {string} surrogatePacketId Surrogate packet identifier
 * @property {Packet} packet Packet object
 * @property {PacketSpecification} packetSpec PacketSpecification object
 * @property {number} startOffset Offset of section start within Packet frame data
 * @property {number} endOffset Offset of section end within Packet frame data
 * @property {number} type Section type
 * @property {number} payloadCount Count of payload elements
 * @property {number} frameCount Count of frames
 * @property {Buffer} frameData Frame data
 */



var Specification = extend(null, /** @lends Specification# */ {

    /**
     * Language code (ISO 639-1)
     * @type {string}
     */
    language: 'en',

    deviceSpecCache: null,

    packetSpecCache: null,

    blockTypePacketSpecCache: null,

    /**
     * I18N instance
     * @type {I18N}
     */
    i18n: null,

    /**
     * Custom specification data to be mixed-in to built-in specification.
     * @type {object}
     */
    specificationData: null,

    /**
     * Creates a new Specification instance and optionally initializes its members with the given values.
     *
     * @constructs
     * @param {object} options Initialization values for this instance's members
     * @param {string} options.language {@link Specification#language}
     * @param {string} options.specificationData {@link Specification#specificationData}
     */
    constructor: function(options) {
        _.extend(this, _.pick(options, optionKeys));

        this.i18n = new I18N(this.language);

        this.deviceSpecCache = {};
        this.packetSpecCache = {};
        this.blockTypePacketSpecCache = {};

        var specificationData;
        if (!options) {
            // nop
        } else if (options.specificationData) {
            specificationData = options.specificationData;
        } else if (options.specificationFile) {
            specificationData = {
                specificationData: options.specificationFile.getSpecificationData(),
            };
        }
        this.specificationData = Specification.loadSpecificationData(specificationData);
    },

    /**
     * Gets the UnitSpecification object matching the given identifier.
     *
     * @param {string} id Unit identifier
     * @returns {UnitSpecification} Unit object
     *
     * @example
     * > console.log(spec.getUnitById('DegreesCelsius'));
     * { unitId: 'DegreesCelsius',
     *   unitCode: 'DegreesCelsius',
     *   unitText: ' °C' }
     * undefined
     * >
     */
    getUnitById: function(id) {
        return this.specificationData.units [id];
    },

    /**
     * Gets the TypeSpecification object matching the given identifier.
     *
     * @param {string} id Type identifier
     * @returns {TypeSpecification} Type object
     *
     * @example
     * > console.log(spec.getTypeById('Number_0_1_DegreesCelsius'));
     * { typeId: 'Number_0_1_DegreesCelsius',
     *   rootTypeId: 'Number',
     *   precision: 1,
     *   unit:
     *    { unitId: 'DegreesCelsius',
     *      unitCode: 'DegreesCelsius',
     *      unitText: ' °C' } }
     * undefined
     * >
     */
    getTypeById: function(id) {
        return this.specificationData.types [id];
    },

    /**
     * Gets the DeviceSpecification object matching the given arguments.
     *
     * @memberof Specification#
     * @name getDeviceSpecification
     * @method
     *
     * @param {number} selfAddress VBus address of the device itself
     * @param {number} peerAddress VBus address of the device's peer
     * @param {number} [channel=0] VBus channel of the device
     * @returns {DeviceSpecification} DeviceSpecification object
     *
     * @example
     * > console.log(spec.getDeviceSpecification(0x7E11, 0x0000, 1));
     * { name: 'DeltaSol MX [Regler]',
     *   deviceId: '01_7E11_0000',
     *   channel: 1,
     *   selfAddress: 32273,
     *   peerAddress: 0,
     *   fullName: 'VBus #1: DeltaSol MX [Regler]' }
     * undefined
     * >
     */

    /**
     * Gets the DeviceSpecification object matching the given header and direction.
     *
     * @param {Header} header Header instance
     * @param {string} which Either `'source'` or `'destination'`
     * @returns {DeviceSpecification} DeviceSpecification object
     */
    getDeviceSpecification: function(selfAddress, peerAddress, channel) {
        if (typeof selfAddress === 'object') {
            if (peerAddress === 'source') {
                channel = selfAddress.channel;
                peerAddress = selfAddress.destinationAddress;
                selfAddress = selfAddress.sourceAddress;
            } else if (peerAddress === 'destination') {
                channel = selfAddress.channel;
                peerAddress = selfAddress.sourceAddress;
                selfAddress = selfAddress.destinationAddress;
            } else {
                throw new Error('Invalid arguments');
            }
        } else if (typeof selfAddress === 'string') {
            var md = selfAddress.match(/^(?:([0-9a-f]{2})_)?([0-9a-f]{4})(?:_([0-9a-f]{4})(?:_.*)?)?$/i);
            if (!md) {
                throw new Error('Invalid device ID');
            }

            selfAddress = parseInt(md [2], 16);
            peerAddress = parseInt(md [3], 16);
            channel = parseInt(md [1], 16);
        }

        if (channel === undefined) {
            channel = 0;
        }

        var deviceId = sprintf('%02X_%04X_%04X', channel, selfAddress, peerAddress);

        if (!_.has(this.deviceSpecCache, deviceId)) {
            var origDeviceSpec;
            if (!origDeviceSpec && this.specificationData.getDeviceSpecification) {
                origDeviceSpec = this.specificationData.getDeviceSpecification(selfAddress, peerAddress);
            }
            if (!origDeviceSpec && this.specificationData.deviceSpecs) {
                origDeviceSpec = this.specificationData.deviceSpecs ['_' + deviceId];
            }

            var deviceSpec = _.extend({}, origDeviceSpec, {
                deviceId: deviceId,
                channel: channel,
                selfAddress: selfAddress,
                peerAddress: peerAddress,
            });

            if (!_.has(deviceSpec, 'name')) {
                deviceSpec.name = this.i18n.t('specification.unknownDevice', selfAddress);
            }

            if (!_.has(deviceSpec, 'fullName')) {
                var fullNameFormatter;
                if (channel) {
                    fullNameFormatter = 'specification.fullNameWithChannel';
                } else {
                    fullNameFormatter = 'specification.fullNameWithoutChannel';
                }
                deviceSpec.fullName = this.i18n.t(fullNameFormatter, channel, deviceSpec.name);
            }

            this.deviceSpecCache [deviceId] = Object.freeze(deviceSpec);
        }

        return this.deviceSpecCache [deviceId];
    },

    /**
     * Gets the PacketSpecification object matching the given arguments.
     *
     * @memberof Specification#
     * @name getPacketSpecification
     * @method
     *
     * @param {number} channel VBus channel
     * @param {number} destinationAddress VBus address of destination device
     * @param {number} sourceAddress VBus address of source device
     * @param {number} command VBus command
     * @returns {PacketSpecification} PacketSpecification object
     *
     * @example
     * > console.log(spec.getPacketSpecification(1, 0x0010, 0x7E21, 0x0100));
     * { packetId: '01_0010_7E21_10_0100',
     *   packetFields:
     *    [ { fieldId: '000_2_0',
     *        name: [Object],
     *        type: [Object],
     *        getRawValue: [Function] },
     *      { fieldId: '002_1_0',
     *        name: [Object],
     *        type: [Object],
     *        getRawValue: [Function] } ],
     *   channel: 1,
     *   destinationAddress: 16,
     *   sourceAddress: 32289,
     *   protocolVersion: 16,
     *   command: 256,
     *   info: 0,
     *   destinationDevice:
     *    { name: 'DFA',
     *      deviceId: '01_0010_7E21',
     *      channel: 1,
     *      selfAddress: 16,
     *      peerAddress: 32289,
     *      fullName: 'VBus #1: DFA' },
     *   sourceDevice:
     *    { name: 'DeltaSol MX [Heizkreis #1]',
     *      deviceId: '01_7E21_0010',
     *      channel: 1,
     *      selfAddress: 32289,
     *      peerAddress: 16,
     *      fullName: 'VBus #1: DeltaSol MX [Heizkreis #1]' },
     *   fullName: 'VBus #1: DeltaSol MX [Heizkreis #1]' }
     * undefined
     * >
     */

    /**
     * Gets the PacketSpecification object matching the given arguments.
     *
     * @memberof Specification#
     * @name getPacketSpecification
     * @method
     *
     * @param {string} packetSpecId PacketSpecification identifier
     * @returns {PacketSpecification} PacketSpecification object
     *
     * @example
     * > console.log(spec.getPacketSpecification('01_0010_7E21_10_0100'));
     * { packetId: '01_0010_7E21_10_0100',
     *   packetFields:
     *    [ { fieldId: '000_2_0',
     *        name: [Object],
     *        type: [Object],
     *        getRawValue: [Function] },
     *      { fieldId: '002_1_0',
     *        name: [Object],
     *        type: [Object],
     *        getRawValue: [Function] } ],
     *   channel: 1,
     *   destinationAddress: 16,
     *   sourceAddress: 32289,
     *   protocolVersion: 16,
     *   command: 256,
     *   info: 0,
     *   destinationDevice:
     *    { name: 'DFA',
     *      deviceId: '01_0010_7E21',
     *      channel: 1,
     *      selfAddress: 16,
     *      peerAddress: 32289,
     *      fullName: 'VBus #1: DFA' },
     *   sourceDevice:
     *    { name: 'DeltaSol MX [Heizkreis #1]',
     *      deviceId: '01_7E21_0010',
     *      channel: 1,
     *      selfAddress: 32289,
     *      peerAddress: 16,
     *      fullName: 'VBus #1: DeltaSol MX [Heizkreis #1]' },
     *   fullName: 'VBus #1: DeltaSol MX [Heizkreis #1]' }
     * undefined
     * >
     */

    /**
     * Gets the PacketSpecification object matching the given packet.
     *
     * @param {Packet} packet VBus packet
     * @returns {PacketSpecification} PacketSpecification object
     */
    getPacketSpecification: function(headerOrChannel, destinationAddress, sourceAddress, command) {
        if (typeof headerOrChannel === 'object') {
            command = headerOrChannel.command;
            sourceAddress = headerOrChannel.sourceAddress;
            destinationAddress = headerOrChannel.destinationAddress;
            headerOrChannel = headerOrChannel.channel;
        } else if (typeof headerOrChannel === 'string') {
            var md = headerOrChannel.match(/^([0-9a-f]{2})_([0-9a-f]{4})_([0-9a-f]{4})(?:_10)?_([0-9a-f]{4})/i);
            if (!md) {
                throw new Error('Invalid packet ID');
            }

            command = parseInt(md [4], 16);
            sourceAddress = parseInt(md [3], 16);
            destinationAddress = parseInt(md [2], 16);
            headerOrChannel = parseInt(md [1], 16);
        }

        var packetId = sprintf('%02X_%04X_%04X_10_%04X', headerOrChannel, destinationAddress, sourceAddress, command);

        if (!_.has(this.packetSpecCache, packetId)) {
            var origPacketSpec;
            if (!origPacketSpec && this.specificationData.getPacketSpecification) {
                origPacketSpec = this.specificationData.getPacketSpecification(destinationAddress, sourceAddress, command);
            }
            if (!origPacketSpec && this.specificationData.packetSpecs) {
                origPacketSpec = this.specificationData.packetSpecs ['_' + packetId];
            }

            var destinationDeviceSpec = this.getDeviceSpecification(destinationAddress, sourceAddress, headerOrChannel);
            var sourceDeviceSpec = this.getDeviceSpecification(sourceAddress, destinationAddress, headerOrChannel);

            var fullName = sourceDeviceSpec.fullName;
            if (destinationAddress !== 0x0010) {
                fullName += ' => ' + destinationDeviceSpec.name;
            }

            var packetSpec = _.extend({}, origPacketSpec, {
                packetId: packetId,
                channel: headerOrChannel,
                destinationAddress: destinationAddress,
                sourceAddress: sourceAddress,
                protocolVersion: 0x10,
                command: command,
                info: 0,
                destinationDevice: destinationDeviceSpec,
                sourceDevice: sourceDeviceSpec,
                fullName: fullName,
            });

            if (!_.has(packetSpec, 'packetFields')) {
                packetSpec.packetFields = [];
            }

            this.packetSpecCache [packetId] = Object.freeze(packetSpec);
        }

        return this.packetSpecCache [packetId];
    },

    /**
     * Gets the PacketFieldSpecification object matching the given arguments.
     *
     * @memberof Specification#
     * @name getPacketFieldSpecification
     * @method
     *
     * @param {PacketSpecification} packetSpec PacketSpecification object
     * @param {string} fieldId Field identifier
     * @returns {PacketFieldSpecification} PacketFieldSpecification object
     *
     * @example
     * > var packetSpec = spec.getPacketSpecification('01_0010_7E21_10_0100');
     * undefined
     * > console.log(spec.getPacketFieldSpecification(packetSpec, '000_2_0'));
     * { fieldId: '000_2_0',
     *   name:
     *    { ref: 'Flow set temperature',
     *      en: 'Flow set temperature',
     *      de: 'Vorlauf-Soll-Temperatur',
     *      fr: 'Température nominale départ' },
     *   type:
     *    { typeId: 'Number_0_1_DegreesCelsius',
     *      rootTypeId: 'Number',
     *      precision: 1,
     *      unit:
     *       { unitId: 'DegreesCelsius',
     *         unitCode: 'DegreesCelsius',
     *         unitText: ' °C' } },
     *   getRawValue: [Function] }
     * undefined
     * >
     */

    /**
     * Gets the PacketFieldSpecification object matching the given arguments.
     *
     * @param {string} packetFieldId Packet field identifier
     * @returns {PacketFieldSpecification} PacketFieldSpecification object
     *
     * @example
     * > console.log(spec.getPacketFieldSpecification('01_0010_7E21_10_0100_000_2_0'));
     * { fieldId: '000_2_0',
     *   name:
     *    { ref: 'Flow set temperature',
     *      en: 'Flow set temperature',
     *      de: 'Vorlauf-Soll-Temperatur',
     *      fr: 'Température nominale départ' },
     *   type:
     *    { typeId: 'Number_0_1_DegreesCelsius',
     *      rootTypeId: 'Number',
     *      precision: 1,
     *      unit:
     *       { unitId: 'DegreesCelsius',
     *         unitCode: 'DegreesCelsius',
     *         unitText: ' °C' } },
     *   getRawValue: [Function] }
     * undefined
     * >
     */
    getPacketFieldSpecification: function(packetSpecOrId, fieldId) {
        var packetFieldSpec;
        if (typeof packetSpecOrId === 'string') {
            if (this.specificationData.filteredPacketFieldSpecs) {
                packetFieldSpec = _.find(this.specificationData.filteredPacketFieldSpecs, { filteredPacketFieldId: packetSpecOrId });
            }

            if (!packetFieldSpec) {
                var md = packetSpecOrId.match(/^([0-9a-f]{2}_[0-9a-f]{4}_[0-9a-f]{4}(?:_10)?_[0-9a-f]{4})_(.*)$/i);
                if (!md) {
                    throw new Error('Invalid packet field ID');
                }

                fieldId = md [2];
                packetSpecOrId = this.getPacketSpecification(md [1]);
            }
        }

        if (!packetFieldSpec && packetSpecOrId) {
            packetFieldSpec = _.find(packetSpecOrId.packetFields, { fieldId: fieldId });
        }

        return packetFieldSpec;
    },

    /**
     * Gets the raw value of a packet field from a buffer.
     *
     * @param {PacketFieldSpecification} packetField PacketFieldSpecification object
     * @param {Buffer} buffer Buffer object
     * @param {number} [start=0] Start index in the buffer
     * @param {number} [end=buffer.length] End index in the buffer
     * @returns {number} Raw value
     *
     * @example
     * > var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');
     * undefined
     * > var buffer = new Buffer('b822', 'hex');
     * undefined
     * > console.log(spec.getRawValue(packetFieldSpec, buffer));
     * 888.8000000000001
     * undefined
     * >
     */
    getRawValue: function(packetField, buffer, start, end) {
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            end = buffer ? buffer.length : 0;
        }

        var rawValue;
        if (packetField && packetField.getRawValue) {
            rawValue = packetField.getRawValue(buffer, start, end);
        } else if (packetField && packetField.packetFieldSpec) {
            rawValue = this.getRawValue(packetField.packetFieldSpec, buffer, start, end);

            if (_.isNumber(rawValue)) {
                if (packetField.conversions) {
                    rawValue = this.convertRawValue(rawValue, packetField.conversions).rawValue;
                } else {
                    rawValue = this.convertRawValue(rawValue, packetField.packetFieldSpec.type.unit, packetField.type.unit).rawValue;
                }
            }
        } else {
            rawValue = null;
        }

        return rawValue;
    },

    getRoundedRawValue: function(packetField, buffer, start, end) {
        var rawValue = this.getRawValue(packetField, buffer, start, end);

        var precision = packetField && packetField.type && packetField.type.precision || 0;

        var roundedRawValue = utils.roundNumber(rawValue, -precision);

        return roundedRawValue;
    },

    invertConversions: function(conversions) {
        if (!_.isArray(conversions)) {
            return conversions;
        }

        return _.map(conversions.reverse(), function(conversion) {
            var invertedConversion = {};
            if (_.isNumber(conversion.offset)) {
                invertedConversion.offset = conversion.offset  * -1;
            }
            if (_.isNumber(conversion.factor)) {
                invertedConversion.factor = 1 / conversion.factor;
            }
            if (_.isNumber(conversion.power)) {
                if (conversion.power !== 0) {
                    invertedConversion.power = 1 / conversion.power;
                } else {
                    invertedConversion.power = conversion.power;
                }
            }
            if (conversion.sourceUnit) {
                invertedConversion.targetUnit = conversion.sourceUnit;
            }
            if (conversion.targetUnit) {
                invertedConversion.sourceUnit = conversion.targetUnit;
            }
            return invertedConversion;
        });
    },

    setRawValue: function(packetField, rawValue, buffer, start, end) {
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            end = buffer ? buffer.length : 0;
        }

        if (packetField && packetField.setRawValue) {
            packetField.setRawValue(rawValue, buffer, start, end);
        } else if (packetField && packetField.packetFieldSpec) {
            if (_.isNumber(rawValue)) {
                if (packetField.conversions) {
                    rawValue = this.convertRawValue(rawValue, this.invertConversions(packetField.conversions)).rawValue;
                } else {
                    rawValue = this.convertRawValue(rawValue, packetField.type.unit, packetField.packetFieldSpec.type.unit).rawValue;
                }
            }

            this.setRawValue(packetField.packetFieldSpec, rawValue, buffer, start, end);
        }
    },

    /**
     * Converts a raw number value from one unit to another. The units must be in the same unit family.
     *
     * @param {number} rawValue Raw number value to convert from
     * @param {Unit} sourceUnit Unit to convert from
     * @param {Unit} targetUnit Unit to convert to
     * @return {object} Result containing a `rawValue` property with the conversion result and a `unit` property with the associated unit.
     */
    convertRawValue: function(rawValue_, sourceUnit_, targetUnit_) {
        var that = this;

        var conversions;
        if (_.isArray(sourceUnit_)) {
            conversions = sourceUnit_;
        } else {
            conversions = [{
                power: null,
                factor: null,
                offset: null,
                sourceUnit: sourceUnit_,
                targetUnit: targetUnit_,
            }];
        }

        var result = _.reduce(conversions, function(valueInfo, conversion) {
            var rawValue = valueInfo.rawValue;
            var sourceUnit = conversion.sourceUnit;
            var targetUnit = conversion.targetUnit;
            var unitFamily = sourceUnit && sourceUnit.unitFamily;

            var hasPower = _.isNumber(conversion.power);
            var hasFactor = _.isNumber(conversion.factor);
            var hasOffset = _.isNumber(conversion.offset);
            var autoConvert = !hasFactor && !hasOffset && !hasPower;

            if (hasPower) {
                if (rawValue === 0 && conversion.power < 0) {
                    rawValue = 0; // Infinity
                } else {
                    rawValue = Math.pow(rawValue, conversion.power);
                }
            }
            if (hasFactor) {
                rawValue = rawValue * conversion.factor;
            }
            if (hasOffset) {
                rawValue = rawValue + conversion.offset;
            }

            if (autoConvert && !sourceUnit) {
                throw new Error('Must provide a source unit');
            } else if (!targetUnit) {
                // nop, no conversion requested
            } else if (sourceUnit.unitCode === targetUnit.unitCode) {
                // nop, no conversion for same unit
            } else if (targetUnit.unitCode === 'None') {
                // nop, just ignore the unit suffix
            } else if (!autoConvert) {
                // nop, already multiplied by factor above and allows to change unit family
            } else if (unitFamily !== targetUnit.unitFamily) {
                throw new Error('Unit families of source and target unit must match');
            } else if (!unitFamily) {
                // nop, no conversion for unknown unit family
            } else if (unitFamily === 'Temperature') {
                rawValue = that._convertTemperatureRawValue(rawValue, sourceUnit.unitCode, targetUnit.unitCode);
            } else if (unitFamily === 'Volume') {
                rawValue = that._convertVolumeRawValue(rawValue, sourceUnit.unitCode, targetUnit.unitCode);
            } else if (unitFamily === 'VolumeFlow') {
                rawValue = that._convertVolumeFlowRawValue(rawValue, sourceUnit.unitCode, targetUnit.unitCode);
            } else if (unitFamily === 'Pressure') {
                rawValue = that._convertPressureRawValue(rawValue, sourceUnit.unitCode, targetUnit.unitCode);
            } else if (unitFamily === 'Energy') {
                rawValue = that._convertEnergyRawValue(rawValue, sourceUnit.unitCode, targetUnit.unitCode);
            } else if (unitFamily === 'Power') {
                rawValue = that._convertPowerRawValue(rawValue, sourceUnit.unitCode, targetUnit.unitCode);
            } else if (unitFamily === 'Time') {
                rawValue = that._convertTimeRawValue(rawValue, sourceUnit.unitCode, targetUnit.unitCode);
            } else {
                throw new Error('Unsupported unit family ' + JSON.stringify(sourceUnit.unitFamily));
            }

            return {
                rawValue: rawValue,
                unit: targetUnit || sourceUnit,
            };
        }, {
            rawValue: rawValue_,
            unit: sourceUnit_,
        });

        return result;
    },

    _convertTemperatureRawValue: function(rawValue, sourceUnitCode, targetUnitCode) {
        switch (sourceUnitCode) {
        case 'DegreesCelsius':
            // nop
            break;
        case 'DegreesFahrenheit':
            rawValue = (rawValue - 32) / 1.8;
            break;
        default:
            throw new Error('Unsupported source unit ' + JSON.stringify(sourceUnitCode));
        }

        switch (targetUnitCode) {
        case 'DegreesCelsius':
            // nop
            break;
        case 'DegreesFahrenheit':
            rawValue = (rawValue * 1.8) + 32;
            break;
        default:
            throw new Error('Unsupported target unit ' + JSON.stringify(targetUnitCode));
        }

        return rawValue;
    },

    _convertVolumeRawValue: function(rawValue, sourceUnitCode, targetUnitCode) {
        switch (sourceUnitCode) {
        case 'Liters':
            // nop
            break;
        case 'CubicMeters':
            rawValue = rawValue * 1000;
            break;
        case 'Gallons':
            rawValue = rawValue / conversionFactors.GallonsPerLiter;
            break;
        default:
            throw new Error('Unsupported source unit ' + JSON.stringify(sourceUnitCode));
        }

        switch (targetUnitCode) {
        case 'Liters':
            // nop
            break;
        case 'CubicMeters':
            rawValue = rawValue / 1000;
            break;
        case 'Gallons':
            rawValue = rawValue * conversionFactors.GallonsPerLiter;
            break;
        default:
            throw new Error('Unsupported target unit ' + JSON.stringify(targetUnitCode));
        }

        return rawValue;
    },

    _convertVolumeFlowRawValue: function(rawValue, sourceUnitCode, targetUnitCode) {
        switch (sourceUnitCode) {
        case 'LitersPerHour':
            // nop
            break;
        case 'LitersPerMinute':
            rawValue = rawValue * 60;
            break;
        case 'CubicMetersPerHour':
            rawValue = rawValue * 1000;
            break;
        case 'GallonsPerHour':
            rawValue = rawValue / conversionFactors.GallonsPerLiter;
            break;
        case 'GallonsPerMinute':
            rawValue = rawValue * 60 / conversionFactors.GallonsPerLiter;
            break;
        default:
            throw new Error('Unsupported source unit ' + JSON.stringify(sourceUnitCode));
        }

        switch (targetUnitCode) {
        case 'LitersPerHour':
            // nop
            break;
        case 'LitersPerMinute':
            rawValue = rawValue / 60;
            break;
        case 'CubicMetersPerHour':
            rawValue = rawValue / 1000;
            break;
        case 'GallonsPerHour':
            rawValue = rawValue * conversionFactors.GallonsPerLiter;
            break;
        case 'GallonsPerMinute':
            rawValue = rawValue / 60 * conversionFactors.GallonsPerLiter;
            break;
        default:
            throw new Error('Unsupported target unit ' + JSON.stringify(targetUnitCode));
        }

        return rawValue;
    },

    _convertPressureRawValue: function(rawValue, sourceUnitCode, targetUnitCode) {
        switch (sourceUnitCode) {
        case 'Bars':
            // nop
            break;
        case 'PoundsForcePerSquareInch':
            rawValue = rawValue / conversionFactors.PoundsForcePerSquareInchPerBar;
            break;
        default:
            throw new Error('Unsupported source unit ' + JSON.stringify(sourceUnitCode));
        }

        switch (targetUnitCode) {
        case 'Bars':
            // nop
            break;
        case 'PoundsForcePerSquareInch':
            rawValue = rawValue * conversionFactors.PoundsForcePerSquareInchPerBar;
            break;
        default:
            throw new Error('Unsupported target unit ' + JSON.stringify(targetUnitCode));
        }

        return rawValue;
    },

    _convertEnergyRawValue: function(rawValue, sourceUnitCode, targetUnitCode) {
        switch (sourceUnitCode) {
        case 'WattHours':
            // nop
            break;
        case 'KilowattHours':
            rawValue = rawValue * 1000;
            break;
        case 'MegawattHours':
            rawValue = rawValue * 1000000;
            break;
        case 'Btus':
            rawValue = rawValue / conversionFactors.BtusPerWattHour;
            break;
        case 'KiloBtus':
            rawValue = rawValue * 1000 / conversionFactors.BtusPerWattHour;
            break;
        case 'MegaBtus':
            rawValue = rawValue * 1000000 / conversionFactors.BtusPerWattHour;
            break;
        case 'GramsCO2Gas':
            rawValue = rawValue / conversionFactors.GramsCO2GasPerWattHour;
            break;
        case 'KilogramsCO2Gas':
            rawValue = rawValue * 1000 / conversionFactors.GramsCO2GasPerWattHour;
            break;
        case 'TonsCO2Gas':
            rawValue = rawValue * 1000000 / conversionFactors.GramsCO2GasPerWattHour;
            break;
        case 'GramsCO2Oil':
            rawValue = rawValue / conversionFactors.GramsCO2OilPerWattHour;
            break;
        case 'KilogramsCO2Oil':
            rawValue = rawValue * 1000 / conversionFactors.GramsCO2OilPerWattHour;
            break;
        case 'TonsCO2Oil':
            rawValue = rawValue * 1000000 / conversionFactors.GramsCO2OilPerWattHour;
            break;
        default:
            throw new Error('Unsupported source unit ' + JSON.stringify(sourceUnitCode));
        }

        switch (targetUnitCode) {
        case 'WattHours':
            // nop
            break;
        case 'KilowattHours':
            rawValue = rawValue / 1000;
            break;
        case 'MegawattHours':
            rawValue = rawValue / 1000000;
            break;
        case 'Btus':
            rawValue = rawValue * conversionFactors.BtusPerWattHour;
            break;
        case 'KiloBtus':
            rawValue = rawValue / 1000 * conversionFactors.BtusPerWattHour;
            break;
        case 'MegaBtus':
            rawValue = rawValue / 1000000 * conversionFactors.BtusPerWattHour;
            break;
        case 'GramsCO2Gas':
            rawValue = rawValue * conversionFactors.GramsCO2GasPerWattHour;
            break;
        case 'KilogramsCO2Gas':
            rawValue = rawValue / 1000 * conversionFactors.GramsCO2GasPerWattHour;
            break;
        case 'TonsCO2Gas':
            rawValue = rawValue / 1000000 * conversionFactors.GramsCO2GasPerWattHour;
            break;
        case 'GramsCO2Oil':
            rawValue = rawValue * conversionFactors.GramsCO2OilPerWattHour;
            break;
        case 'KilogramsCO2Oil':
            rawValue = rawValue / 1000 * conversionFactors.GramsCO2OilPerWattHour;
            break;
        case 'TonsCO2Oil':
            rawValue = rawValue / 1000000 * conversionFactors.GramsCO2OilPerWattHour;
            break;
        default:
            throw new Error('Unsupported target unit ' + JSON.stringify(targetUnitCode));
        }

        return rawValue;
    },

    _convertPowerRawValue: function(rawValue, sourceUnitCode, targetUnitCode) {
        switch (sourceUnitCode) {
        case 'Watts':
            // nop
            break;
        case 'Kilowatts':
            rawValue = rawValue * 1000;
            break;
        default:
            throw new Error('Unsupported source unit ' + JSON.stringify(sourceUnitCode));
        }

        switch (targetUnitCode) {
        case 'Watts':
            // nop
            break;
        case 'Kilowatts':
            rawValue = rawValue / 1000;
            break;
        default:
            throw new Error('Unsupported target unit ' + JSON.stringify(targetUnitCode));
        }

        return rawValue;
    },

    _convertTimeRawValue: function(rawValue, sourceUnitCode, targetUnitCode) {
        switch (sourceUnitCode) {
        case 'Seconds':
            // nop
            break;
        case 'Minutes':
            rawValue = rawValue * 60;
            break;
        case 'Hours':
            rawValue = rawValue * 3600;
            break;
        case 'Days':
            rawValue = rawValue * 86400;
            break;
        default:
            throw new Error('Unsupported source unit ' + JSON.stringify(sourceUnitCode));
        }

        switch (targetUnitCode) {
        case 'Seconds':
            // nop
            break;
        case 'Minutes':
            rawValue = rawValue / 60;
            break;
        case 'Hours':
            rawValue = rawValue / 3600;
            break;
        case 'Days':
            rawValue = rawValue / 86400;
            break;
        default:
            throw new Error('Unsupported target unit ' + JSON.stringify(targetUnitCode));
        }

        return rawValue;
    },

    /**
     * Formats a raw value into its textual representation.
     *
     * @param {PacketFieldSpecification} packetField PacketFieldSpecification object
     * @param {number} rawValue Raw value
     * @param {string|UnitSpecification|null} [unit] Unit to format to
     * @returns {string} Textual representation of the raw value
     *
     * @example
     * > var packetFieldSpec = spec.getPacketFieldSpecification('01_0010_7721_10_0100_000_2_0');
     * undefined
     * > var rawValue = 888.8000000000001;
     * undefined
     * > console.log(spec.formatTextValueFromRawValue(packetFieldSpec, rawValue, 'DegreesCelsius'));
     * 888.8 °C
     * undefined
     * >
     */
    formatTextValueFromRawValue: function(packetField, rawValue, unit) {
        var textValue;

        if ((rawValue !== undefined) && (rawValue !== null)) {
            if (typeof unit === 'string') {
                if (_.has(this.specificationData.units, unit)) {
                    unit = this.specificationData.units [unit];
                } else {
                    throw new Error('Unknown unit named "' + unit + '"');
                }
            }

            if (packetField && packetField.type) {
                var type = packetField.type;
                if (type.formatTextValue) {
                    textValue = type.formatTextValue(rawValue, unit);
                } else {
                    textValue = this.formatTextValueFromRawValueInternal(rawValue, unit, type.rootTypeId, type.precision, type.unit);
                }
            } else {
                textValue = rawValue.toString();
                if (unit && unit.unitText) {
                    textValue += unit.unitText;
                }
            }
        } else {
            textValue = '';
        }

        return textValue;
    },

    formatTextValueFromRawValueInternal: function(rawValue, unit, rootType, precision, defaultUnit) {
        var unitText = unit ? unit.unitText : defaultUnit ? defaultUnit.unitText : '';

        var result, textValue, format;
        if ((rawValue === undefined) || (rawValue === null)) {
            result = '';
        } else if (rootType === 'Time') {
            textValue = this.i18n.moment(rawValue * 60000).utc().format('HH:mm');
            result = textValue + unitText;
        } else if (rootType === 'Weektime') {
            textValue = this.i18n.moment((rawValue + 5760) * 60000).utc().format('dd,HH:mm');
            result = textValue + unitText;
        } else if (rootType === 'DateTime') {
            textValue = this.i18n.moment((rawValue + 978307200) * 1000).utc().format('L HH:mm:ss');
            result = textValue + unitText;
        } else if (precision === 0) {
            textValue = this.i18n.numeral(rawValue).format('0');
            result = textValue + unitText;
        } else if (precision === 1) {
            textValue = this.i18n.numeral(rawValue).format('0.0');
            result = textValue + unitText;
        } else if (precision === 2) {
            textValue = this.i18n.numeral(rawValue).format('0.00');
            result = textValue + unitText;
        } else if (precision === 3) {
            textValue = this.i18n.numeral(rawValue).format('0.000');
            result = textValue + unitText;
        } else if (precision === 4) {
            textValue = this.i18n.numeral(rawValue).format('0.0000');
            result = textValue + unitText;
        } else {
            if (!_.has(numberFormatCache, precision)) {
                format = '0.';
                for (var i = 0; i < precision; i++) {
                    format = format + '0';
                }
                numberFormatCache [precision] = format;
            }

            textValue = this.i18n.numeral(rawValue).format(numberFormatCache [precision]);
            result = textValue + unitText;
        }

        return result;
    },

    /**
     * Gets an array of PacketField objects for the provided Packet objects.
     *
     * @param {Header[]} headers Array of Header objects
     * @returns {PacketField[]} Array of PacketField objects
     */
    getPacketFieldsForHeaders: function(headers) {
        var _this = this;

        // filter out all packets
        var packets = _.reduce(headers, function(memo, header) {
            if ((header.getProtocolVersion() & 0xF0) === 0x10) {
                memo.push(header);
            }
            return memo;
        }, []);

        var packetFields = [];

        var filteredPacketFieldSpecs = this.specificationData.filteredPacketFieldSpecs;
        if (filteredPacketFieldSpecs) {
            var packetById = _.reduce(packets, function(memo, packet) {
                var packetSpec = _this.getPacketSpecification(packet);
                memo [packetSpec.packetId] = packet;
                return memo;
            }, {});

            _.forEach(filteredPacketFieldSpecs, function(fpfs) {
                var packetField = _.extend({}, {
                    id: fpfs.filteredPacketFieldId,
                    packet: packetById [fpfs.packetId],
                    packetSpec: fpfs.packetSpec,
                    packetFieldSpec: fpfs,
                    origPacketFieldSpec: fpfs.packetFieldSpec,
                });
                packetFields.push(packetField);
            });
        } else {
            _.forEach(packets, function(packet) {
                var packetSpec = _this.getPacketSpecification(packet);
                if (packetSpec) {
                    _.forEach(packetSpec.packetFields, function(packetFieldSpec) {
                        var packetField = {
                            id: packetSpec.packetId + '_' + packetFieldSpec.fieldId,
                            packet: packet,
                            packetSpec: packetSpec,
                            packetFieldSpec: packetFieldSpec,
                            origPacketFieldSpec: packetFieldSpec,
                        };
                        packetFields.push(packetField);
                    });
                }
            });
        }

        var language = this.language;

        _.forEach(packetFields, function(packetField) {
            var pfsName = packetField.packetFieldSpec.name;
            var name;
            if (_.isString(pfsName)) {
                    name = pfsName;
            } else if (_.isObject(pfsName)) {
                name = pfsName [language] || pfsName.en || pfsName.de || pfsName.ref;
            }

            var rawValue;
            if (packetField.packetFieldSpec && packetField.packet) {
                var frameData = packetField.packet.frameData.slice(0, packetField.packet.frameCount * 4);
                rawValue = _this.getRawValue(packetField.packetFieldSpec, frameData);
            }

            var precision;
            if (packetField.packetFieldSpec && packetField.packetFieldSpec.type) {
                precision = packetField.packetFieldSpec.type.precision || 0;
            }

            _.extend(packetField, {

                name: name,

                rawValue: rawValue,

                formatTextValue: function(unit) {
                    return _this.formatTextValueFromRawValue(packetField.packetFieldSpec, rawValue, unit);
                },

                getRoundedRawValue: function() {
                    return utils.roundNumber(rawValue, -precision);
                },

            });
        });

        return packetFields;
    },

    setPacketFieldRawValues: function(packetFields, rawValues) {
        var _this = this;

        var packetFieldById = _.reduce(packetFields, function(memo, packetField) {
            memo [packetField.id] = packetField;
            var fieldId = packetField.packetFieldSpec.fieldId;
            if (memo [fieldId] === undefined) {
                memo [fieldId] = packetField;
            } else {
                memo [fieldId] = null;
            }
            return memo;
        }, {});

        _.forEach(rawValues, function(rawValue, key) {
            var packetField = packetFieldById [key];
            if (packetField === undefined) {
                throw new Error('Unknown raw value ID ' + JSON.stringify(key));
            } else if (packetField === null) {
                throw new Error('Non-unique raw value ID ' + JSON.stringify(key));
            } else {
                var frameData = packetField.packet.frameData.slice(0, packetField.packet.frameCount * 4);
                _this.setRawValue(packetField.packetFieldSpec, rawValue, frameData);
            }
        });
    },

    getFilteredPacketFieldSpecificationsForHeaders: function(headers) {
        var filteredPacketFieldSpecs = [];

        var packetFields = this.getPacketFieldsForHeaders(headers);

        _.forEach(packetFields, function(packetField) {
            var packetSpec = packetField.packetSpec;
            var packetFieldSpec = packetField.packetFieldSpec;

            if (packetSpec && packetFieldSpec) {
                var filteredPacketFieldSpec = _.extend({}, packetFieldSpec, {
                    filteredPacketFieldId: packetSpec.packetId + '_' + packetFieldSpec.fieldId,
                    packetId: packetSpec.packetId,
                    name: packetField.name,
                });

                filteredPacketFieldSpecs.push(filteredPacketFieldSpec);
            }
        });

        return filteredPacketFieldSpecs;
    },

    /**
     * Gets an array of BlockType sections from a collection of headers.
     *
     * @param  {Header[]} headers Array of Header objects
     * @return {BlockTypeSection[]} Array of BlockTypeSection objects
     */
    getBlockTypeSectionsForHeaders: function(headers) {
        var _this = this;

        return _.reduce(headers, function(memo, header) {
            if (((header.getProtocolVersion() & 0xF0) === 0x10) && (header.destinationAddress === 0x0015) && (header.command === 0x0100)) {
                var packetSpec = _this.getPacketSpecification(header);

                var startOffset = 0, length = header.frameCount * 4, frameData = header.frameData;
                while (startOffset + 4 <= length) {
                    var frameCount = frameData [startOffset] & 255;
                    var endOffset = startOffset + 4 + 4 * frameCount;

                    if (endOffset <= length) {
                        var type = frameData [startOffset + 1] & 255;

                        var payloadSize = null, payloadCount = null;
                        // TODO(daniel): refine the payload count based on the type
                        if (type === 1) {
                            payloadSize = 2;
                        } else if (type === 5) {
                            payloadSize = 4;
                        } else if (type === 8) {
                            payloadSize = 1;
                        } else if (type === 10) {
                            payloadSize = 8;
                        } else if (type === 11) {
                            payloadSize = 4;
                        } else if (type === 12) {
                            payloadSize = 4;
                        } else if (type === 13) {
                            payloadSize = 4;
                        } else if (type === 14) {
                            payloadSize = 1;
                        } else {
                            payloadSize = 1;
                        }

                        if (!payloadCount && payloadSize) {
                            payloadCount = Math.floor((endOffset - startOffset - 4) / payloadSize);
                        }

                        var sectionId = sprintf('%s_%02X_%02X_%d', packetSpec.packetId, frameCount, type, payloadCount);

                        var shasum = crypto.createHash('sha1');
                        shasum.update(new Buffer(sectionId, 'utf8'));
                        var surrogatePacketIdHash = shasum.digest('hex').toUpperCase();

                        var surrogatePacketIdHashPart1 = surrogatePacketIdHash.slice(0, 4);
                        var surrogatePacketIdHashPart2 = surrogatePacketIdHash.slice(4, 8);

                        var surrogatePacketId = sprintf('%02X_%04X_%s_%02X_%s', header.channel, header.destinationAddress | 0x8000, surrogatePacketIdHashPart1, 0x10, surrogatePacketIdHashPart2);

                        memo.push({
                            sectionId: sectionId,
                            surrogatePacketId: surrogatePacketId,
                            packet: header,
                            packetSpec: packetSpec,
                            startOffset: startOffset,
                            endOffset: endOffset,
                            type: type,
                            payloadCount: payloadCount,
                            frameCount: frameCount,
                            frameData: frameData.slice(startOffset, endOffset),
                        });
                    }

                    startOffset = endOffset;
                }

                if (startOffset !== length) {
                    throw new Error('Malformed block type packet, ending prematurely at offset ' + startOffset);
                }
            }
            return memo;
        }, []);
    },

    _createUInt8BlockTypeFieldSpecification: function(fieldIdPrefix, offset, name, typeId, factor) {
        return {
            fieldId: sprintf('%s_%03d_1_0', fieldIdPrefix, offset),
            name: name,
            type: this.getTypeById(typeId),
            factor: factor,
            parts: [{
                offset: offset,
                mask: 255,
                isSigned: false,
                factor: 1,
            }],

            getRawValue: function(buffer, start, end) {
                var rawValue = 0, valid = false;
                if (start + offset < end) {
                    rawValue += buffer.readUInt8(start + offset);
                    valid = true;
                }
                if (valid) {
                    rawValue = rawValue * factor;
                } else {
                    rawValue = null;
                }
                return rawValue;
            },

            setRawValue: function(newValue, buffer, start, end) {
                newValue = Math.round(newValue / factor);
                var rawValue;
                if (start + offset < end) {
                    rawValue = newValue & 255;
                    buffer.writeUInt8(rawValue, start + offset);
                }
            },
        };
    },

    _createInt16BlockTypeFieldSpecification: function(fieldIdPrefix, offset, name, typeId, factor) {
        return {
            fieldId: sprintf('%s_%03d_2_0', fieldIdPrefix, offset),
            name: name,
            type: this.getTypeById(typeId),
            factor: factor,
            parts: [{
                offset: offset,
                mask: 255,
                isSigned: false,
                factor: 1,
            }, {
                offset: offset + 1,
                mask: 255,
                isSigned: true,
                factor: 256,
            }],

            getRawValue: function(buffer, start, end) {
                var rawValue = 0, valid = false;
                if (start + offset < end) {
                    rawValue += buffer.readUInt8(start + offset);
                    valid = true;
                }
                if (start + offset + 1 < end) {
                    rawValue += buffer.readInt8(start + offset + 1) * 256;
                    valid = true;
                }
                if (valid) {
                    rawValue = rawValue * factor;
                } else {
                    rawValue = null;
                }
                return rawValue;
            },

            setRawValue: function(newValue, buffer, start, end) {
                newValue = Math.round(newValue / factor);
                var rawValue;
                if (start + offset < end) {
                    rawValue = newValue & 255;
                    buffer.writeUInt8(rawValue, start + offset);
                }
                if (start + offset + 1 < end) {
                    rawValue = (newValue / 256) & 255;
                    buffer.writeUInt8(rawValue, start + offset + 1);
                }
            },
        };
    },

    _createUInt32BlockTypeFieldSpecification: function(fieldIdPrefix, offset, name, typeId, factor) {
        return {
            fieldId: sprintf('%s_%03d_4_0', fieldIdPrefix, offset),
            name: name,
            type: this.getTypeById(typeId),
            factor: factor,
            parts: [{
                offset: offset,
                mask: 255,
                isSigned: false,
                factor: 1,
            }, {
                offset: offset + 1,
                mask: 255,
                isSigned: false,
                factor: 256,
            }, {
                offset: offset + 2,
                mask: 255,
                isSigned: false,
                factor: 65536,
            }, {
                offset: offset + 3,
                mask: 255,
                isSigned: false,
                factor: 16777216,
            }],

            getRawValue: function(buffer, start, end) {
                var rawValue = 0, valid = false;
                if (start + offset < end) {
                    rawValue += buffer.readUInt8(start + offset);
                    valid = true;
                }
                if (start + offset + 1 < end) {
                    rawValue += buffer.readUInt8(start + offset + 1) * 256;
                    valid = true;
                }
                if (start + offset + 2 < end) {
                    rawValue += buffer.readUInt8(start + offset + 2) * 65536;
                    valid = true;
                }
                if (start + offset + 3 < end) {
                    rawValue += buffer.readUInt8(start + offset + 3) * 16777216;
                    valid = true;
                }
                if (valid) {
                    rawValue = rawValue * factor;
                } else {
                    rawValue = null;
                }
                return rawValue;
            },

            setRawValue: function(newValue, buffer, start, end) {
                newValue = Math.round(newValue / factor);
                var rawValue;
                if (start + offset < end) {
                    rawValue = newValue & 255;
                    buffer.writeUInt8(rawValue, start + offset);
                }
                if (start + offset + 1 < end) {
                    rawValue = (newValue / 256) & 255;
                    buffer.writeUInt8(rawValue, start + offset + 1);
                }
                if (start + offset + 2 < end) {
                    rawValue = (newValue / 65536) & 255;
                    buffer.writeUInt8(rawValue, start + offset + 2);
                }
                if (start + offset + 3 < end) {
                    rawValue = (newValue / 16777216) & 255;
                    buffer.writeUInt8(rawValue, start + offset + 3);
                }
            },
        };
    },

    /**
     * Gets the PacketSpecification objects matching the given BlockTypeSection objects.
     *
     * @param  {BlockTypeSection[]} sections Array of BlockTypeSection objects
     * @return {PacketSpecification[]} Array of PacketSpecificationObjects
     */
    getBlockTypePacketSpecificationsForSections: function(sections) {
        var _this = this;

        return _.reduce(sections, function(memo, section) {
            var sectionId = section.sectionId;

            if (!_.has(_this.blockTypePacketSpecCache, sectionId)) {
                var fieldIdPrefix = section.sectionId;

                var forEachPayload = function(iterator) {
                    var count = section.payloadCount;
                    for (var i = 0; i < count; i++) {
                        var suffix = (count > 1) ? (' ' + (i + 1)) : '';
                        iterator(i, suffix);
                    }
                };

                var packetFieldSpecs = [];

                if (section.type === 1) {
                    // temperatures
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createInt16BlockTypeFieldSpecification(fieldIdPrefix, 4 + index * 2, 'Temperatur Sensor' + suffix, 'Number_0_1_DegreesCelsius', 0.1));
                    });
                } else if (section.type === 5) {
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createUInt32BlockTypeFieldSpecification(fieldIdPrefix, 4 + index * 4, 'Wärmemenge' + suffix, 'Number_1_WattHours', 1));
                    });
                } else if (section.type === 8) {
                    // Relais speeds
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createUInt8BlockTypeFieldSpecification(fieldIdPrefix, 4 + index, 'Drehzahl Relais' + suffix, 'Number_1_Percent', 1));
                    });
                } else if (section.type === 10) {
                    // SmartDisplay
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createInt16BlockTypeFieldSpecification(fieldIdPrefix, 4 + index * 8, 'Temperatur Kollektor' + suffix, 'Number_0_1_DegreesCelsius', 0.1));
                        packetFieldSpecs.push(_this._createInt16BlockTypeFieldSpecification(fieldIdPrefix, 6 + index * 8, 'Temperatur Speicher' + suffix, 'Number_0_1_DegreesCelsius', 0.1));
                        packetFieldSpecs.push(_this._createUInt32BlockTypeFieldSpecification(fieldIdPrefix, 8 + index * 8, 'Wärmemenge' + suffix, 'Number_1_WattHours', 1));
                    });
                } else if (section.type === 11) {
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createUInt32BlockTypeFieldSpecification(fieldIdPrefix, 4 + index * 4, 'Fehlermaske' + suffix, 'Number_1_None', 1));
                    });
                } else if (section.type === 12) {
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createUInt32BlockTypeFieldSpecification(fieldIdPrefix, 4 + index * 4, 'Warnungsmaske' + suffix, 'Number_1_None', 1));
                    });
                } else if (section.type === 13) {
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createUInt32BlockTypeFieldSpecification(fieldIdPrefix, 4 + index * 4, 'Statusmaske' + suffix, 'Number_1_None', 1));
                    });
                } else if (section.type === 14) {
                    forEachPayload(function(index, suffix) {
                        packetFieldSpecs.push(_this._createUInt8BlockTypeFieldSpecification(fieldIdPrefix, 4 + index, 'Segmentmaske' + suffix, 'Number_1_None', 1));
                    });
                }

                _this.blockTypePacketSpecCache [sectionId] = _.extend({}, section.packetSpec, {
                    packetId: section.surrogatePacketId,
                    sectionId: sectionId,
                    packetFields: packetFieldSpecs,
                });
            }

            var packetSpec = _this.blockTypePacketSpecCache [sectionId];
            memo.push(packetSpec);

            return memo;
        }, []);
    },

    /**
     * Gets an array of PacketField objects for the provided BlockTypeSection objects.
     *
     * @param  {BlockTypeSection[]} sections Array of BlockTypeSection objects.
     * @return {PacketField[]} Array of PacketField objects
     */
    getBlockTypeFieldsForSections: function(sections) {
        var _this = this;

        var sectionByBlockTypeId = _.reduce(sections, function(memo, section) {
            memo [section.sectionId] = section;
            return memo;
        }, {});

        var packetSpecs = this.getBlockTypePacketSpecificationsForSections(sections);

        var packetFields = [];
        _.forEach(packetSpecs, function(packetSpec) {
            _.forEach(packetSpec.packetFields, function(packetFieldSpec) {
                var section = sectionByBlockTypeId [packetSpec.sectionId];

                var packetField = {
                    id: packetSpec.packetId + '_' + packetFieldSpec.fieldId,
                    section: section,
                    packet: section.packet,
                    packetSpec: packetSpec,
                    packetFieldSpec: packetFieldSpec,
                    origPacketFieldSpec: packetFieldSpec,
                };
                packetFields.push(packetField);
            });
        });

        var language = this.language;

        _.forEach(packetFields, function(packetField) {
            var pfsName = packetField.packetFieldSpec.name;
            var name;
            if (_.isString(pfsName)) {
                var key = 'specificationData.packetFieldName.' + pfsName;
                name = _this.i18n.t(key);
                if (name === key) {
                    name = pfsName;
                }
            } else if (_.isObject(pfsName)) {
                name = pfsName [language] || pfsName.en || pfsName.de || pfsName.ref;
            }

            var rawValue;
            if (packetField.packetFieldSpec && packetField.section) {
                var frameData = packetField.section.frameData;
                rawValue = _this.getRawValue(packetField.packetFieldSpec, frameData);
            }

            _.extend(packetField, {

                name: name,

                rawValue: rawValue,

                formatTextValue: function(unit) {
                    return _this.formatTextValueFromRawValue(packetField.packetFieldSpec, rawValue, unit);
                },

            });
        });

        return packetFields;
    },

}, {

    loadSpecificationData: function(rawSpecificationData, options) {
        if (rawSpecificationData === undefined) {
            rawSpecificationData = {};
        }
        if (options === undefined) {
            options = {};
        }

        var rawFilteredPacketFieldSpecs = rawSpecificationData.filteredPacketFieldSpecs;
        var specification = options.specification || globalSpecification || {};
        var specificationData = options.specificationData || specification.specificationData || globalSpecificationData || {};

        var filteredPacketFieldSpecs;
        if (rawFilteredPacketFieldSpecs) {
            var resolve = function(value, collectionKey) {
                var collection = specificationData [collectionKey];

                if (_.has(collection, value)) {
                    value = collection [value];
                }

                return value;
            };

            filteredPacketFieldSpecs = _.map(rawFilteredPacketFieldSpecs, function(rfpfs) {
                var packetSpec = specification.getPacketSpecification(rfpfs.packetId);
                var packetFieldSpec = specification.getPacketFieldSpecification(packetSpec, rfpfs.fieldId);

                var name = rfpfs.name;
                if (typeof name === 'string') {
                    name = { ref: name };
                }

                return _.extend({}, rfpfs, {
                    packetSpec: packetSpec,
                    packetFieldSpec: packetFieldSpec,
                    name: name,
                    type: resolve(rfpfs.type, 'types'),
                    conversions: rfpfs.conversions && _.map(rfpfs.conversions, function(rawConversion) {
                        return {
                            factor: rawConversion.factor,
                            offset: rawConversion.offset,
                            sourceUnit: rawConversion.sourceUnit && resolve(rawConversion.sourceUnit, 'units'),
                            targetUnit: rawConversion.targetUnit && resolve(rawConversion.targetUnit, 'units'),
                        };
                    }),
                    getRawValue: resolve(rfpfs.getRawValue, 'getRawValueFunctions'),
                    setRawValue: resolve(rfpfs.setRawValue, 'setRawValueFunctions'),
                });
            });
        }

        var result = _.extend({}, specificationData, {
            filteredPacketFieldSpecs: filteredPacketFieldSpecs,
        });

        return result;
    },

    storeSpecificationData: function(options) {
        if (options === undefined) {
            options = {};
        }
        if (options instanceof Specification) {
            options = { specification: options };
        }

        var specification = options.specification || globalSpecification || {};
        var specificationData = options.specificationData || specification.specificationData || globalSpecificationData || {};
        var filteredPacketFieldSpecs = options.filteredPacketFieldSpecs || specificationData.filteredPacketFieldSpecs;

        var rawFilteredPacketFieldSpecs;
        if (filteredPacketFieldSpecs) {
            var link = function(value, valueIdKey, collectionKey) {
                var collection = specificationData [collectionKey];

                var valueId;
                if (valueIdKey) {
                    valueId = value [valueIdKey];
                }
                if (!valueId) {
                    valueId = _.findKey(collection, function(refValue) {
                        return (value === refValue);
                    });
                }
                if (valueId && _.has(collection, valueId) && (collection [valueId] === value)) {
                    value = valueId;
                }

                return value;
            };

            rawFilteredPacketFieldSpecs = _.map(filteredPacketFieldSpecs, function(fpfs) {
                var rfpfs = {
                    filteredPacketFieldId: fpfs.filteredPacketFieldId,
                    packetId: fpfs.packetId,
                    fieldId: fpfs.fieldId,
                    name: fpfs.name,
                    type: link(fpfs.type, 'typeId', 'types'),
                    getRawValue: link(fpfs.getRawValue, null, 'getRawValueFunctions'),
                    setRawValue: link(fpfs.setRawValue, null, 'setRawValueFunctions'),
                };

                if (fpfs.conversions) {
                    rfpfs.conversions = _.map(fpfs.conversions, function(conversion) {
                        var rawConversion = {};
                        if (_.isNumber(conversion.factor)) {
                            rawConversion.factor = conversion.factor;
                        }
                        if (_.isNumber(conversion.offset)) {
                            rawConversion.offset = conversion.offset;
                        }
                        if (conversion.sourceUnit) {
                            rawConversion.sourceUnit = link(conversion.sourceUnit, 'unitId', 'units');
                        }
                        if (conversion.targetUnit) {
                            rawConversion.targetUnit = link(conversion.targetUnit, 'unitId', 'units');
                        }
                        return rawConversion;
                    });
                }

                return rfpfs;
            });
        }

        var rawSpecificationData = {
            filteredPacketFieldSpecs: rawFilteredPacketFieldSpecs,
        };

        return rawSpecificationData;
    },

    getDefaultSpecification: function() {
        return globalSpecification;
    },

});



globalSpecification = new Specification();



module.exports = Specification;
