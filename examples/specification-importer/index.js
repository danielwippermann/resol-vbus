/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');


var glob = require('glob');
var Handlebars = require('handlebars');
var _ = require('lodash');
var Q = require('q');
var sprintf = require('sprintf').sprintf;
var xml2js = require('xml2js');


var vbus = require('../..');


var template = require('./template.hbs');



/*
 * mkdir <tmpdir>
 * cd <tmpdir>
 * 7z x <RSC setup exe>
 * mkdir resol
 * cp -a eclipse/plugins/de.resol* resol/
 * cd resol
 * for NAME in *.jar; do DIR="$(basename $NAME .jar)"; mkdir $DIR; (cd $DIR; 7z x ../$NAME); done
 * rm ./de.resol.servicecenter.vbus.cosmo_2.0.0/VBusSpecificationCosmoMulti.xml
 * find . -iname VBus*.xml
 * pwd # that path goes in the variable below
 */



var VBusSpecModel = vbus.extend(null, {

});


var VBusSpecText = VBusSpecModel.extend({

    lang: 'ref',

    text: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);
    },

});


var VBusSpecDevice = VBusSpecModel.extend({

    selfAddress: 0,

    selfMask: 65535,

    peerAddress: 0,

    peerMask: 0,

    name: null,

    isMaster: false,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.name = [];
    },

});


var VBusSpecPacketField = VBusSpecModel.extend({

    offset: 0,

    name: null,

    bitSize: 0,

    bitPos: 0,

    factor: 1,

    unit: null,

    commonUsage: null,

    format: null,

    timeRef: 0,

    fields: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.name = [];
        this.fields = [];
    },

});


var VBusSpecPacket = VBusSpecModel.extend({

    destinationAddress: 0,

    destinationMask: 65535,

    sourceAddress: 0,

    sourceMask: 65535,

    command: 0,

    fields: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.fields = [];
    },

});


var VBusSpecification = VBusSpecModel.extend({

    devices: null,

    packets: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.devices = [];
        this.packets = [];
    },

});


var VBusSpecDeserializer = vbus.extend(null, {

    _deserializeText: function(parent, model) {
        this._filterProperties(parent, function(key, child) {
            if (key === 'lang') {
                model.lang = this._getStringValue(child);
            } else if (key === null) {
                model.text = this._getStringValue(child || '');
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusPacketField: function(parent, model) {
        this._filterProperties(parent, function(key, child) {
            if (key === 'offset') {
                model.offset = this._getIntegerValue(child);
            } else if (key === 'name') {
                model.name.push(this._deserializeText(child, new VBusSpecText()));
            } else if (key === 'bitsize') {
                model.bitSize = this._getIntegerValue(child);
            } else if (key === 'bitpos') {
                model.bitPos = this._getIntegerValue(child);
                if (model.bitSize === 0) {
                    model.bitSize = 1;
                }
            } else if (key === 'factor') {
                model.factor = this._getNumberValue(child);
            } else if (key === 'unit') {
                model.unit = this._getStringValue(child);
            } else if (key === 'commonusage') {
                model.commonUsage = this._getStringValue(child);
            } else if (key === 'format') {
                model.format = this._getStringValue(child);
            } else if (key === 'timeref') {
                model.timeRef = this._getIntegerValue(child);
            } else if (key === 'field') {
                model.fields.push(this._deserializeVBusPacketField(child, new VBusSpecPacketField()));
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusPacket: function(parent, model) {
        this._filterProperties(parent, function(key, child) {
            if (key === 'destination') {
                model.destinationAddress = this._getIntegerValue(child);
            } else if (key === 'destinationmask') {
                model.destinationMask = this._getIntegerValue(child);
            } else if (key === 'source') {
                model.sourceAddress = this._getIntegerValue(child);
            } else if (key === 'sourcemask') {
                model.sourceMask = this._getIntegerValue(child);
            } else if (key === 'command') {
                model.command = this._getIntegerValue(child);
            } else if (key === 'field') {
                model.fields.push(this._deserializeVBusPacketField(child, new VBusSpecPacketField()));
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusDevice: function(parent, model) {
        this._filterProperties(parent, function(key, child) {
            if (key === 'address') {
                model.selfAddress = this._getIntegerValue(child);
            } else if (key === 'mask') {
                model.selfMask = this._getIntegerValue(child);
            } else if (key === 'name') {
                model.name.push(this._deserializeText(child, new VBusSpecText()));
            } else if (key === 'ismaster') {
                model.isMaster = this._getBooleanValue(child);
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _deserializeVBusSpecification: function(parent, model) {
        this._filterProperties(parent, function(key, child) {
            if (key === 'device') {
                model.devices.push(this._deserializeVBusDevice(child, new VBusSpecDevice()));
            } else if (key === 'packet') {
                model.packets.push(this._deserializeVBusPacket(child, new VBusSpecPacket()));
            } else {
                this._reportUnexpectedProperty(parent, key);
            }
        });

        return model;
    },

    _getStringValue: function(child) {
        return child;
    },

    _getIntegerValue: function(child) {
        return _.parseInt(child.trim());
    },

    _getNumberValue: function(child) {
        return + child.replace(/,/g, '.');
    },

    _getBooleanValue: function(child) {
        if ((child === 'true') || (child === '1')) {
            return true;
        } else if ((child === 'false') || (child === '0')) {
            return false;
        } else {
            throw new Error('Unexpected boolean value ' + JSON.stringify(child));
        }
    },

    _filterProperties: function(parent, iterator) {
        var _this = this;

        if (_.isObject(parent)) {
            var keys = _.keys(parent);

            var count = 0;
            if (_.contains(keys, '_')) {
                count++;
            }
            if (_.contains(keys, '$')) {
                count++;
            }
            if (count === keys.length) {
                iterator.call(this, null, parent._);
            }

            _.forEach(parent.$, function(child, key) {
                iterator.call(_this, key.toLowerCase(), child);
            });

            _.forEach(parent, function(children, key) {
                if ((key !== '$') && (key !== '_')) {
                    _.forEach(children, function(child) {
                        iterator.call(_this, key.toLowerCase(), child);
                    });
                }
            });
        } else if (_.isString(parent)) {
            iterator.call(this, null, parent);
        } else {
            throw new Error('Unexpected parent ' + JSON.stringify(parent));
        }
    },

    _reportUnexpectedProperty: function(parent, key) {
        throw new Error('Unexpected property ' + JSON.stringify(key));
    },

});


var unitCodesByUnitFamily = {
    'Energy': [ 'WattHours', 'KilowattHours', 'MegawattHours', 'Btus', 'KiloBtus', 'MegaBtus' ],
    'Pressure': [ 'Bars' ],
    'Temperature': [ 'DegreesCelsius', 'DegreesFahrenheit' ],
    'Time': [ 'Seconds', 'Minutes', 'Hours', 'Days' ],
    'VolumeFlow': [ 'LitersPerMinute', 'LitersPerHour', 'CubicMetersPerHour', 'GallonsPerMinute', 'GallonsPerHour' ],
};


var unitsByUnitCode = {
    'Bars': [ ' bar', ' Bar' ],
    'Btus': [ ' BTU', ' Btu' ],
    'CubicMeters': [ ' m³' ],
    'CubicMetersPerHour': [ ' m³/h', ' qm/h' ],
    'Days': [ ' d' ],
    'DegreesAngular': [ ' °' ],
    'DegreesCelsius': [ ' °C' ],
    'DegreesFahrenheit': [ ' °F' ],
    'DegreesKelvin': [ ' K' ],
    'GallonsPerHour': [ ' gal/h' ],
    'GallonsPerMinute': [ ' gal/min' ],
    'GramsCO2Gas': [ ' g CO₂ (Gas)' ],
    'GramsCO2Oil': [ ' g CO₂ (Oil)' ],
    'Hectopascals': [ ' hPa' ],
    'Hertz': [ ' Hz' ],
    'Hours': [ ' h' ],
    'KiloBtus': [ ' MBTU' ],
    'KilogramsCO2Gas': [ ' kg CO₂ (Gas)' ],
    'KilogramsCO2Oil': [ ' kg CO₂ (Oil)' ],
    'KilogramsPerCubicMeter': [ ' kg/m³' ],
    'KilogramsPerHour': [ ' kg/h' ],
    'KilowattHours': [ ' kWh' ],
    'KiloWattHoursPerSquareMeterPerDay': [ ' kWh/(m²*d)' ],
    'Kilowatts': [ ' kW', 'kW' ],
    'Liters': [ ' l', ' L' ],
    'LitersPerHour': [' l/h' ],
    'LitersPerMinute': [ ' l/min' ],
    'LitersPerSquareMeterPerDay': [ ' l/(m²*d)' ],
    'MegaBtus': [ ' MMBTU' ],
    'MegawattHours': [ ' MWh' ],
    'MetersPerSecond': [ ' m/s' ],
    'Milliamperes': [ ' mA' ],
    'Milliseconds': [ ' ms' ],
    'Minutes': [ ' min', ' Min.' ],
    'None': [ '', ' ', null ],
    'Ohms': [ ' Ω', ' Ohm' ],
    'Percent': [ '%', ' %' ],
    'Seconds': [ ' s', ' sec' ],
    'SquareMeters': [ ' m²' ],
    'TonsCO2Gas': [ ' t CO₂ (Gas)' ],
    'TonsCO2Oil': [ ' t CO₂ (Oil)' ],
    'Volts': [ ' V' ],
    'WattHours': [ ' Wh' ],
    'Watts': [ ' W' ],
    'WattsPerSquareMeter': [ ' W/m²', ' W/qm' ],
};


var textChanges = {
    'Drehzahl Relais 1.1 ': 'Drehzahl Relais 1.1',
    'Drehzahl Relais 1.2 ': 'Drehzahl Relais 1.2',
    'Drehzahl Relais 2.1 ': 'Drehzahl Relais 2.1',
    'Drehzahl Relais 2.2 ': 'Drehzahl Relais 2.2',
    'Drehzahl Relais 3.1 ': 'Drehzahl Relais 3.1',
    'Drehzahl Relais 3.2 ': 'Drehzahl Relais 3.2',
    'Drehzahl Relais 4.1 ': 'Drehzahl Relais 4.1',
    'Drehzahl Relais 4.2 ': 'Drehzahl Relais 4.2',
    'Drehzahl Relais 5.1 ': 'Drehzahl Relais 5.1',
    'Drehzahl Relais 5.2 ': 'Drehzahl Relais 5.2',
    'Extern Reglerfreigabe': 'Externe Reglerfreigabe',
    'Füllung': 'Befüllung',
    'Manualbetrieb 1': 'Handbetrieb 1',
    'Manualbetrieb 2': 'Handbetrieb 2',
    'P1 ': 'P1',
    'P2 ': 'P2',
    'Pumpen Relais:': 'Pumpenrelais:',
    'SV Version': 'SW-Version',
    'Sensor-Benutzt-Maske #1': 'Sensorbenutzungs-Maske #1',
    'Sensor-Benutzt-Maske #2': 'Sensorbenutzungs-Maske #2',
    'Sensorbenutzungsmaske': 'Sensorbenutzungs-Maske',
    'Sensorbruchmaske': 'Sensorbruch-Maske',
    'Sensorbruchnummer': 'Sensorbruch-Nummer',
    'Sensordefektmaske': 'Sensordefekt-Maske',
    'Sensorkurzschlussmaske': 'Sensorkurzschluss-Maske',
    'Sensorkurzschlussnummer': 'Sensorkurzschluss-Nummer',
    'Speicher Leer': 'Speicher leer',
    'Speicher Maximaltemperatur': 'Speichermaximaltemperatur',
    'Speicher Nottemperatur': 'Speichernottemperatur',
    'Warmwasser Solltemperatur': 'Warmwassersolltemperatur',
    'ΔT Kolektor-Speicher': 'ΔT Kollektor-Speicher'
};


var cleanupSpec = function(spec) {
    var cleanupText = function(text) {
        if ((text.lang === 'ref') && _.has(textChanges, text.text)) {
            text.text = textChanges [text.text];
        }
    };

    _.forEach(spec.devices, function(device) {
        device.selfAddress &= device.selfMask;
        _.forEach(device.name, cleanupText);
    });

    var cleanupField = function(field, isRootField) {
        var unitCode = _.findKey(unitsByUnitCode, function(units) {
            return _.contains(units, field.unit);
        });
        if (unitCode) {
            field.unit = unitsByUnitCode [unitCode] [0];
        } else {
            throw new Error('Unknown unit code for unit ' + JSON.stringify(field.unit));
        }
    };

    _.forEach(spec.packets, function(packet) {
        packet.destinationAddress &= packet.destinationMask;
        packet.sourceAddress &= packet.sourceMask;

        _.forEach(packet.fields, function(field) {
            var fields;
            if (field.fields.length > 0) {
                fields = field.fields;
            } else {
                fields = [ field ];
            }

            _.forEach(fields, cleanupField);

            _.forEach(field.name, cleanupText);
        });
    });

    return spec;
};


var sortSpec = function(spec) {
    spec.devices.sort(function(left, right) {
        return left.selfAddress - right.selfAddress;
    });

    spec.packets.sort(function(left, right) {
        var result = left.destinationAddress - right.destinationAddress;
        if (result === 0) {
            result = left.sourceAddress - right.sourceAddress;
        }
        if (result === 0) {
            result = left.command - right.command;
        }
        return result;
    });

    return spec;
};


var isAddressOverlapping = function(addressA, maskA, addressB, maskB) {
    var startA = addressA & 0x7F7F;
    var   endA = (addressA | (~maskA)) & 0x7F7F;
    var startB = addressB & 0x7F7F;
    var   endB = (addressB | (~maskB)) & 0x7F7F;

    return ((maskA !== 0) && (maskB !== 0) && !((startA > endB) || (endA < startB)));
};


var getRefText = function(texts) {
    var result = null;
    _.forEach(texts, function(text) {
        if (text.lang === 'ref') {
            result = text.text;
        }
        return (result === null);
    });
    return result;
};


var checkSpec = function(spec) {
    _.forEach(spec.devices, function(deviceA) {
        _.forEach(spec.devices, function(deviceB) {
            var startA = deviceA.selfAddress & 0x7F7F;
            var   endA = (deviceA.selfAddress | (~deviceA.selfMask)) & 0x7F7F;
            var startB = deviceB.selfAddress & 0x7F7F;
            var   endB = (deviceB.selfAddress | (~deviceB.selfMask)) & 0x7F7F;

            if (deviceA === deviceB) {
                // nop
            } else if (isAddressOverlapping(deviceA.selfAddress, deviceA.selfMask, deviceB.selfAddress, deviceB.selfMask)) {
                console.log('Multiple devices for same address space defined:', deviceA, deviceB);
            }
        });

        if (getRefText(deviceA.name) === null) {
            console.log('No name for device ' + JSON.stringify(deviceA));
        }
    });

    var checkField = function(field) {
        if (field.fields.length > 0) {
            console.log('Field must not have sub fields');
        }

        if ((field.bitPos !== 0) && (field.bitSize > 1)) {
            console.log('Invalid bitPos ' + field.bitPos + ' for bitSize ' + field.bitSize);
        }
    };

    _.forEach(spec.packets, function(packetA) {
        var packetAId = sprintf('%04X(%04X) <- %04X(%04X), Cmd %04X', packetA.destinationAddress, packetA.destinationMask, packetA.sourceAddress, packetA.sourceMask, packetA.command);

        _.forEach(spec.packets, function(packetB) {
            var packetBId = sprintf('%04X(%04X) <- %04X(%04X), Cmd %04X', packetB.destinationAddress, packetB.destinationMask, packetB.sourceAddress, packetB.sourceMask, packetB.command);


            if (packetA === packetB) {
                // nop
            } else if (!isAddressOverlapping(packetA.destinationAddress, packetA.destinationMask, packetB.destinationAddress, packetB.destinationMask)) {
                // nop
            } else if (!isAddressOverlapping(packetA.sourceAddress, packetA.sourceMask, packetB.sourceAddress, packetB.sourceMask)) {
                // nop
            } else if (packetA.command !== packetB.command) {
                // nop
            } else {
                console.log('Multiple packets defined for same address space:', packetAId, packetBId);
            }
        });

        _.forEach(packetA.fields, function(field) {
            var fields;
            if (field.fields.length > 0) {
                fields = field.fields;
            } else {
                fields = [ field ];
            }

            if (getRefText(field.name) === null) {
                console.log('No name for field ' + JSON.stringify(field));
            }

            _.forEach(fields, checkField);
        });
    });

    return spec;
};


var generateSpecInfo = function(spec) {
    var iterateAddresses = function(addressA, maskA, addressB, maskB, callback) {
        var countA = (maskA === 0) ? 0 : ((~maskA) & 0x7F);
        var countB = (maskB === 0) ? 0 : ((~maskB) & 0x7F);

        for (var indexA = 0; indexA <= countA; indexA++) {
            var instanceA = (addressA + indexA);

            for (var indexB = 0; indexB <= countB; indexB++) {
                var instanceB = (addressB + indexB);

                callback(instanceA, instanceB);
            }
        }
    };

    var formatDeviceId = function(device) {
        return sprintf('%04X', device.selfAddress);
    };

    var formatPacketId = function(packet) {
        return sprintf('%04X_%04X_%04X', packet.destinationAddress, packet.sourceAddress, packet.command);
    };

    var deviceTemplates = {}, devices = {};
    _.forEach(spec.devices, function(device) {
        var deviceTemplateId = formatDeviceId(device);

        var deviceName = getRefText(device.name);

        if (_.has(deviceTemplates, deviceTemplateId)) {
            throw new Error('Non-unique device template ID ' + JSON.stringify(deviceTemplateId));
        }

        deviceTemplates [deviceTemplateId] = {
            deviceTemplateId: deviceTemplateId,
            selfAddress: device.selfAddress,
            selfMask: device.selfMask,
            peerAddress: device.peerAddress,
            peerMask: device.peerMask,
            name: deviceName,
        };

        iterateAddresses(device.selfAddress, device.selfMask, device.peerAddress, device.peerMask, function(selfAddress, peerAddress) {
            var deviceInstance = _.extend({}, device, {
                selfAddress: selfAddress,
                selfMask: device.selfMask && 0xFFFF,
                peerAddress: peerAddress,
                peerMask: device.peerMask && 0xFFFF,
            });

            var deviceId = formatDeviceId(deviceInstance);

            if (_.has(devices, deviceId)) {
                throw new Error('Non-unique device ID ' + JSON.stringify(deviceId) + ' for device ' + JSON.stringify(device));
            }

            devices [deviceId] = {
                deviceId: deviceId,
                deviceTemplateId: deviceTemplateId,
                selfAddress: deviceInstance.selfAddress,
                selfMask: deviceInstance.selfMask,
                peerAddress: deviceInstance.peerAddress,
                peerMask: deviceInstance.peerMask,
                name: deviceName.replace(/#/, '#' + (selfAddress - device.selfAddress)),
            };
        });
    });

    var packetTemplates = {}, packets = {}, fieldNames = {};
    _.forEach(spec.packets, function(packet) {
        var packetTemplateId = formatPacketId(packet);

        var fieldIds = [];

        var fields = _.map(packet.fields, function(field) {
            var fields;
            if (field.fields.length > 0) {
                fields = field.fields;
            } else {
                fields = [ field ];
            }

            var parts = [];
            _.forEach(fields, function(field) {
                var size = (field.bitSize + 7) >> 3;

                var factor = field.factor;

                var mask;
                if (field.bitSize === 1) {
                    mask = (1 << field.bitPos);
                } else {
                    mask = 0xFF;
                }

                for (var i = 0; i < size; i++) {
                    var isSigned = ((field.bitSize & 1) && (i === (size - 1)));

                    parts.push({
                        offset: field.offset + i,
                        mask: mask,
                        isSigned: isSigned,
                        factor: factor,
                    });

                    factor *= 256;
                }
            });

            if (parts.length === 0) {
                console.log('No parts for fields ' + JSON.stringify(fields));
            }

            var firstField = fields [0];
            var firstPart = parts [0];

            var size = (firstField.bitSize + 7) >> 3;

            var mask;
            if (firstField.bitSize === 1) {
                mask = (1 << firstField.bitPos);
            } else {
                mask = 0;
            }

            var fieldIdPrefix = sprintf('%03d_%d_%d', firstPart.offset, size, mask);
            var fieldIdVariant = 0;
            var fieldId;
            do {
                fieldId = fieldIdPrefix;
                if (fieldIdVariant > 0) {
                    fieldId += '_' + fieldIdVariant;
                }
                fieldIdVariant++;
            } while (_.contains(fieldIds, fieldId));

            fieldIds.push(fieldId);

            var origName = getRefText(field.name);
            var name = origName.replace(/\./g, '_');
            if (!_.has(fieldNames, name)) {
                fieldNames [name] = origName;
            } else if (fieldNames [name] !== origName) {
                throw new Error('Non-unique encoded field name ' + JSON.stringify(origName));
            }

            var unitCode = _.findKey(unitsByUnitCode, function(units) {
                return _.contains(units, field.unit);
            });

            if (!unitCode) {
                throw new Error('Unknown unit ' + JSON.stringify(field.unit));
            }

            var unitText = unitsByUnitCode [unitCode] [0];

            var unitFamily = _.findKey(unitCodesByUnitFamily, function(unitCodes) {
                return _.contains(unitCodes, unitCode);
            });

            var rootTypeId, precision;
            if (field.format === null) {
                rootTypeId = 'Number';
                precision = - Math.round(Math.log(firstField.factor) / Math.log(10));
            } else if (field.format.charAt(0) === 'F') {
                rootTypeId = 'Number';
                precision = + field.format.substring(1);
            } else if (field.format === 't') {
                rootTypeId = 'Time';
                precision = 0;
            } else if (field.format === 'T') {
                rootTypeId = 'Weektime';
                precision = 0;
            } else if (field.format === 'r') {
                rootTypeId = 'DateTime';
                precision = 0;
            } else {
                throw new Error('Unknown format ' + JSON.stringify(field.format));
            }

            if (_.isNaN(precision)) {
                precision = 0;
            } else if (precision === Infinity) {
                precision = 0;
            } else if (precision < 0) {
                precision = 0;
            }

            var typeId = rootTypeId + '_';
            typeId += sprintf('%.' + precision + 'f', Math.pow(10, - precision)).replace(/[^0-9]/g, '_');
            typeId += '_' + unitCode;

            return {
                fieldId: fieldId,
                name: name,
                offset: firstPart.offset,
                size: size,
                mask: mask,
                typeId: typeId,
                rootTypeId: rootTypeId,
                precision: precision,
                unitCode: unitCode,
                unitFamily: unitFamily,
                unitText: unitText,
                parts: parts,
            };
        });

        if (_.has(packetTemplates, packetTemplateId)) {
            throw new Error('Non-unique packet template ID ' + JSON.stringify(packetTemplateId));
        }

        packetTemplates [packetTemplateId] = {
            packetTemplateId: packetTemplateId,
            destinationAddress: packet.destinationAddress,
            destinationMask: packet.destinationMask,
            sourceAddress: packet.sourceAddress,
            sourceMask: packet.sourceMask,
            command: packet.command,
            fields: fields,
        };

        iterateAddresses(packet.destinationAddress, packet.destinationMask, packet.sourceAddress, packet.sourceMask, function(destinationAddress, sourceAddress) {
            var packetInstance = _.extend({}, packet, {
                destinationAddress: destinationAddress,
                destinationMask: packet.destinationMask && 0xFFFF,
                sourceAddress: sourceAddress,
                sourceMask: packet.sourceMask && 0xFFFF,
            });

            var packetId = formatPacketId(packetInstance);

            if (_.has(packets, packetId)) {
                throw new Error('Non-unique packet ID ' + JSON.stringify(packetId));
            }

            packets [packetId] = {
                packetId: packetId,
                packetTemplateId: packetTemplateId,
                destinationAddress: packetInstance.destinationAddress,
                destinationMask: packetInstance.destinationMask,
                sourceAddress: packetInstance.sourceAddress,
                sourceMask: packetInstance.sourceMask,
                command: packetInstance.command,
                fields: fields,
            };
        });
    });

    var info = {
        deviceTemplates: deviceTemplates,
        devices: devices,
        packetTemplates: packetTemplates,
        packets: packets,
    };

    return info;
};


var generateVBusSpecificationData = function(spec) {
    var info = generateSpecInfo(spec);

    // console.log(JSON.stringify(info, null, '    '));

    Handlebars.registerHelper('stringify', function(value) {
        var output = JSON.stringify(value);
        if (_.isString(value)) {
            output = '\'' + output.substring(1, output.length - 1).replace(/'/g, '\\\'') + '\'';
        }
        return new Handlebars.SafeString(output);
    });

    var sortedMap = function(obj, iterator) {
        return _.map(_.keys(obj).sort(), function(key) {
            return iterator(obj [key], key, obj);
        });
    };

    var units = sortedMap(unitsByUnitCode, function(units, unitCode) {
        return {
            unitCode: unitCode,
            unitText: units [0],
            unitFamily: _.findKey(unitCodesByUnitFamily, function(unitCodes) {
                return _.contains(unitCodes, unitCode);
            }) || null,
        };
    });

    var deviceTemplates = sortedMap(info.deviceTemplates, function(device, deviceId) {
        return {
            deviceId: deviceId,
            name: device.name,
        };
    });

    var devices = sortedMap(info.devices, function(device, deviceId) {
        var selfAddressCondition;
        if (device.selfMask === 0) {
            selfAddressCondition = 'true';
        } else if (device.selfMask === 0xFFFF) {
            selfAddressCondition = sprintf('(selfAddress === 0x%04X)', device.selfAddress);
        }

        var peerAddressCondition;
        if (device.peerMask === 0) {
            peerAddressCondition = 'true';
        } else {
            peerAddressCondition = sprintf('(peerAddress === 0x%04X)', device.peerAddress);
        }

        return {
            deviceId: deviceId,
            name: device.name,
            selfAddressCondition: selfAddressCondition,
            peerAddressCondition: peerAddressCondition,
        };
    });

    var types = {}, fieldTemplates = {};
    _.forEach(info.packetTemplates, function(packet) {
        _.forEach(packet.fields, function(field) {
            if (!_.has(types, field.typeId)) {
                types [field.typeId] = field;
            }

            var packetFieldId = packet.packetTemplateId + '_' + field.fieldId;
            if (!_.has(fieldTemplates, packetFieldId)) {
                fieldTemplates [packetFieldId] = field;
            } else {
                throw new Error('Non-unique packet field ID ' + JSON.stringify(packetFieldId));
            }
        });
    });

    types = sortedMap(types, function(type, typeId) {
        return {
            typeId: typeId,
            rootTypeId: type.rootTypeId,
            precision: type.precision,
            unitCode: type.unitCode,
        };
    });

    fieldTemplates = sortedMap(fieldTemplates, function(field, packetFieldId) {
        return {
            packetFieldId: packetFieldId,
            parts: field.parts
        };
    });

    var packetTemplates = sortedMap(info.packetTemplates, function(packet, packetId) {
        var fields = _.map(packet.fields, function(field) {
            return {
                packetFieldId: packetId + '_' + field.fieldId,
                fieldId: field.fieldId,
                name: field.name,
                typeId: field.typeId,
            };
        });

        return {
            packetId: packetId,
            fields: fields,
        };
    });

    var packets = sortedMap(info.packets, function(packet, packetId) {
        var destinationCondition;
        if (packet.destinationMask === 0) {
            destinationCondition = '(true)';  // TODO: remove braces
        } else {
            destinationCondition = sprintf('(destinationAddress === 0x%04X)', packet.destinationAddress);
        }

        var sourceCondition;
        if (packet.sourceMask === 0) {
            sourceCondition = '(true)';  // TODO: remove braces
        } else {
            sourceCondition = sprintf('(sourceAddress === 0x%04X)', packet.sourceAddress);
        }

        var commandCondition = sprintf('(command === 0x%04X)', packet.command);

        return {
            packetId: packetId,
            packetTemplateId: packet.packetTemplateId,
            destinationCondition: destinationCondition,
            sourceCondition: sourceCondition,
            commandCondition: commandCondition,
        };
    });

    var values = {
        units: units,
        types: types,
        deviceTemplates: deviceTemplates,
        devices: devices,
        fieldTemplates: fieldTemplates,
        packetTemplates: packetTemplates,
        packets: packets,
    };

    return template(values);
};


var main = function() {
    return Q.fcall(function() {
        var rscExtractPath = process.argv [2];

        return Q.nfapply(glob, [ rscExtractPath + '/**/VBus*.xml' ]);
    }).then(function(filenames) {
        var promise = Q();

        var spec = new VBusSpecification();

        var deserializer = new VBusSpecDeserializer();

        _.forEach(filenames, function(filename) {
            promise = promise.then(function() {
                return Q.npost(fs, 'readFile', [ filename ]);
            }).then(function(content) {
                return Q.npost(xml2js, 'parseString', [ content ]);
            }).then(function(xmlRoot) {
                var specRoot = xmlRoot.vbusSpecification;

                if (specRoot) {
                    deserializer._deserializeVBusSpecification(specRoot, spec);
                } else {
                    throw new Error('Unknown root element');
                }
            });
        });

        return promise.then(function() {
            return spec;
        });
    }).then(function(spec) {
        return cleanupSpec(spec);
    }).then(function(spec) {
        return sortSpec(spec);
    }).then(function(spec) {
        return checkSpec(spec);
    }).then(function(spec) {
        // console.log(JSON.stringify(spec, null, '    '));
        return spec;
    }).then(function(spec) {
        return generateVBusSpecificationData(spec);
    }).then(function(output) {
        console.log(output);
    });
};



if (require.main === module) {
    Q.fcall(main).done();
} else {
    module.exports = main;
}
