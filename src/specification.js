/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var extend = require('./extend');
var I18N = require('./i18n');

var createVBusSpecificationData = require('./specification-data');



var globalSpecificationData = createVBusSpecificationData();
var globalSpecification;



var optionKeys = [
    'language'
];



var numberFormatCache = {};



var Specification = extend(null, {

    language: 'en',

    deviceSpecCache: null,

    packetSpecCache: null,

    i18n: null,

    specificationData: null,

    constructor: function(options) {
        var _this = this;

        _.extend(this, _.pick(options, optionKeys));

        this.i18n = new I18N(this.language);

        this.deviceSpecCache = {};
        this.packetSpecCache = {};

        this.specificationData = Specification.loadSpecificationData(options && options.specificationData);
    },

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

            this.deviceSpecCache [deviceId] = deviceSpec;
        }

        return this.deviceSpecCache [deviceId];
    },

    getPacketSpecification: function(headerOrChannel, destinationAddress, sourceAddress, command) {
        if (typeof headerOrChannel === 'object') {
            command = headerOrChannel.command;
            sourceAddress = headerOrChannel.sourceAddress;
            destinationAddress = headerOrChannel.destinationAddress;
            headerOrChannel = headerOrChannel.channel;
        } else if (typeof headerOrChannel === 'string') {
            var md = headerOrChannel.match(/^([0-9a-f]{2})_([0-9a-f]{4})_([0-9a-f]{4})_10_([0-9a-f]{4})/i);
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
                command: command,
                destinationDevice: destinationDeviceSpec,
                sourceDevice: sourceDeviceSpec,
                fullName: fullName,
            });

            if (!_.has(packetSpec, 'packetFields')) {
                packetSpec.packetFields = [];
            }

            this.packetSpecCache [packetId] = packetSpec;
        }
        
        return this.packetSpecCache [packetId];
    },

    getPacketFieldSpecification: function(packetSpecOrId, fieldId) {
        var packetFieldSpec;
        if (typeof packetSpecOrId === 'string') {
            if (this.specificationData.filteredPacketFieldSpecs) {
                packetFieldSpec = _.find(this.specificationData.filteredPacketFieldSpecs, { filteredPacketFieldId: packetSpecOrId });
            }

            if (!packetFieldSpec) {
                var md = packetSpecOrId.match(/^([0-9a-f]{2}_[0-9a-f]{4}_[0-9a-f]{4}_10_[0-9a-f]{4})_(.*)$/i);
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
        } else {
            rawValue = null;
        }

        return rawValue;
    },

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
                textValue = this.formatTextValueFromRawValueInternal(rawValue, unit, type.rootTypeId, type.precision, type.unit);
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
        if (rootType === 'Time') {
            textValue = this.i18n.moment(rawValue * 60000).utc().format('HH:mm');
            result = textValue + unitText;
        } else if (rootType === 'Weektime') {
            textValue = this.i18n.moment((rawValue + 5760) * 60000).utc().format('dd,HH:mm');
            result = textValue + unitText;
        } else if (rootType === 'Datetime') {
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
            var names = packetField.packetFieldSpec.name;
            var name = names [language] || names.en || names.de || names.ref;

            var rawValue;
            if (packetField.packetFieldSpec && packetField.packet) {
                rawValue = _this.getRawValue(packetField.packetFieldSpec, packetField.packet.frameData);
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
                    getRawValue: resolve(rfpfs.getRawValue, 'getRawValueFunctions'),
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
                return {
                    filteredPacketFieldId: fpfs.filteredPacketFieldId,
                    packetId: fpfs.packetId,
                    fieldId: fpfs.fieldId,
                    name: fpfs.name,
                    type: link(fpfs.type, 'typeId', 'types'),
                    getRawValue: link(fpfs.getRawValue, null, 'getRawValueFunctions'),
                };
            });
        }

        var rawSpecificationData = {
            filteredPacketFieldSpecs: rawFilteredPacketFieldSpecs,
        };

        return rawSpecificationData;
    },

});



globalSpecification = new Specification();



module.exports = Specification;
