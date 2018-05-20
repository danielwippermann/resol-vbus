/*! resol-vbus | Copyright (c) 2016-2018, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var path = require('path');


var moreints = require('buffer-more-ints');
var sprintf = require('sprintf-js').sprintf;


var extend = require('./extend');
var _ = require('./lodash');
var utils = require('./utils');



var defaultSpecificationFile = null;



var Promise = utils.Promise;


var crc16Table = [
    0x0000, 0x1189, 0x2312, 0x329b, 0x4624, 0x57ad, 0x6536, 0x74bf,
    0x8c48, 0x9dc1, 0xaf5a, 0xbed3, 0xca6c, 0xdbe5, 0xe97e, 0xf8f7,
    0x1081, 0x0108, 0x3393, 0x221a, 0x56a5, 0x472c, 0x75b7, 0x643e,
    0x9cc9, 0x8d40, 0xbfdb, 0xae52, 0xdaed, 0xcb64, 0xf9ff, 0xe876,
    0x2102, 0x308b, 0x0210, 0x1399, 0x6726, 0x76af, 0x4434, 0x55bd,
    0xad4a, 0xbcc3, 0x8e58, 0x9fd1, 0xeb6e, 0xfae7, 0xc87c, 0xd9f5,
    0x3183, 0x200a, 0x1291, 0x0318, 0x77a7, 0x662e, 0x54b5, 0x453c,
    0xbdcb, 0xac42, 0x9ed9, 0x8f50, 0xfbef, 0xea66, 0xd8fd, 0xc974,
    0x4204, 0x538d, 0x6116, 0x709f, 0x0420, 0x15a9, 0x2732, 0x36bb,
    0xce4c, 0xdfc5, 0xed5e, 0xfcd7, 0x8868, 0x99e1, 0xab7a, 0xbaf3,
    0x5285, 0x430c, 0x7197, 0x601e, 0x14a1, 0x0528, 0x37b3, 0x263a,
    0xdecd, 0xcf44, 0xfddf, 0xec56, 0x98e9, 0x8960, 0xbbfb, 0xaa72,
    0x6306, 0x728f, 0x4014, 0x519d, 0x2522, 0x34ab, 0x0630, 0x17b9,
    0xef4e, 0xfec7, 0xcc5c, 0xddd5, 0xa96a, 0xb8e3, 0x8a78, 0x9bf1,
    0x7387, 0x620e, 0x5095, 0x411c, 0x35a3, 0x242a, 0x16b1, 0x0738,
    0xffcf, 0xee46, 0xdcdd, 0xcd54, 0xb9eb, 0xa862, 0x9af9, 0x8b70,
    0x8408, 0x9581, 0xa71a, 0xb693, 0xc22c, 0xd3a5, 0xe13e, 0xf0b7,
    0x0840, 0x19c9, 0x2b52, 0x3adb, 0x4e64, 0x5fed, 0x6d76, 0x7cff,
    0x9489, 0x8500, 0xb79b, 0xa612, 0xd2ad, 0xc324, 0xf1bf, 0xe036,
    0x18c1, 0x0948, 0x3bd3, 0x2a5a, 0x5ee5, 0x4f6c, 0x7df7, 0x6c7e,
    0xa50a, 0xb483, 0x8618, 0x9791, 0xe32e, 0xf2a7, 0xc03c, 0xd1b5,
    0x2942, 0x38cb, 0x0a50, 0x1bd9, 0x6f66, 0x7eef, 0x4c74, 0x5dfd,
    0xb58b, 0xa402, 0x9699, 0x8710, 0xf3af, 0xe226, 0xd0bd, 0xc134,
    0x39c3, 0x284a, 0x1ad1, 0x0b58, 0x7fe7, 0x6e6e, 0x5cf5, 0x4d7c,
    0xc60c, 0xd785, 0xe51e, 0xf497, 0x8028, 0x91a1, 0xa33a, 0xb2b3,
    0x4a44, 0x5bcd, 0x6956, 0x78df, 0x0c60, 0x1de9, 0x2f72, 0x3efb,
    0xd68d, 0xc704, 0xf59f, 0xe416, 0x90a9, 0x8120, 0xb3bb, 0xa232,
    0x5ac5, 0x4b4c, 0x79d7, 0x685e, 0x1ce1, 0x0d68, 0x3ff3, 0x2e7a,
    0xe70e, 0xf687, 0xc41c, 0xd595, 0xa12a, 0xb0a3, 0x8238, 0x93b1,
    0x6b46, 0x7acf, 0x4854, 0x59dd, 0x2d62, 0x3ceb, 0x0e70, 0x1ff9,
    0xf78f, 0xe606, 0xd49d, 0xc514, 0xb1ab, 0xa022, 0x92b9, 0x8330,
    0x7bc7, 0x6a4e, 0x58d5, 0x495c, 0x3de3, 0x2c6a, 0x1ef1, 0x0f78
];


var calcCrc16 = function(buffer, start, end) {
    var checksum = 0xFFFF;
    for (var index = start; index < end; index++) {
        checksum = ((checksum >> 8) ^ crc16Table [(checksum ^ buffer [index]) & 255]);
    }
    checksum = checksum ^ 0xFFFF;
    return checksum;
};


var types = [{
    typeId: 1,
    typeCode: 'Number',
}, {
    typeId: 2,
    typeCode: 'Float',
}, {
    typeId: 3,
    typeCode: 'Time',
}, {
    typeId: 4,
    typeCode: 'Weektime',
}, {
    typeId: 5,
    typeCode: 'DateTime',
}];


var unitFamilies = [{
    unitFamilyId: 0,
    unitFamilyCode: 'Temperature',
}, {
    unitFamilyId: 1,
    unitFamilyCode: 'Energy',
}, {
    unitFamilyId: 2,
    unitFamilyCode: 'VolumeFlow',
}, {
    unitFamilyId: 3,
    unitFamilyCode: 'Pressure',
}, {
    unitFamilyId: 4,
    unitFamilyCode: 'Volume',
}, {
    unitFamilyId: 5,
    unitFamilyCode: 'Time',
}, {
    unitFamilyId: 6,
    unitFamilyCode: 'Power',
}];


var knownUnits = [];


var SpecificationFile = extend(null, {

    constructor: function(buffer, language) {
        this.buffer = buffer;

        this.types = types;

        this.typeById = _.reduce(types, function(memo, type) {
            memo [type.typeId] = type;
            return memo;
        }, {});

        this.typeByCode = _.reduce(types, function(memo, type) {
            memo [type.typeCode] = type;
            return memo;
        }, {});

        this.unitFamilies = unitFamilies;

        this.unitFamilyById = _.reduce(unitFamilies, function(memo, unitFamily) {
            memo [unitFamily.unitFamilyId] = unitFamily;
            return memo;
        }, {});

        this.unitFamilyByCode = _.reduce(unitFamilies, function(memo, unitFamily) {
            memo [unitFamily.unitFamilyCode] = unitFamily;
            return memo;
        }, {});

        this.knownUnits = knownUnits;

        this.knownUnitsById = _.reduce(knownUnits, function(memo, unit) {
            memo [unit.unitId] = unit;
            return memo;
        }, {});

        this.knownUnitsByCode = _.reduce(knownUnits, function(memo, unit) {
            memo [unit.unitCode] = unit;
            return memo;
        }, {});

        this._parseBuffer(buffer);

        this._generateSpecificationData(language);
    },

    getSpecificationData: function() {
        return this.specificationData;
    },

    _generateSpecificationData: function(language) {
        var that = this;

        var units = _.extend({}, this.knownUnitsByCode);

        units = _.reduce(this.units, function(memo, unit) {
            memo [unit.unitCode] = {
                unitId: unit.unitCode,
                unitCode: unit.unitCode,
                unitFamily: unit.unitFamily && unit.unitFamily.unitFamilyCode,
                unitText: unit.unitText,
            };
            return memo;
        }, units);

        var types = _.reduce(this.packetTemplates, function(memo, pt) {
            return _.reduce(pt.fields, function(memo, ptf) {
                var rootTypeId = ptf.type && ptf.type.typeCode;
                var precision = ptf.precision;
                var unitCode = ptf.unit && ptf.unit.unitCode || 'None';

                var typeId = rootTypeId + '_';
                typeId += sprintf('%.' + precision + 'f', Math.pow(10, - precision)).replace(/[^0-9]/g, '_');
                typeId += '_' + unitCode;

                memo [typeId] = {
                    typeId: typeId,
                    rootTypeId: rootTypeId,
                    precision: precision,
                    unit: units [unitCode],
                };

                return memo;
            }, memo);
        }, {});

        var getRawValueFunctions = _.reduce(this.packetTemplates, function(memo, pt) {
            return _.reduce(pt.fields, function(memo, ptf) {
                var funcId = sprintf('_%04X_%04X_%04X_%s', pt.destinationAddress, pt.sourceAddress, pt.command, ptf.id);

                memo [funcId] = function(buffer, start, end) {
                    return that.getRawValue(pt, ptf, buffer, start, end);
                };

                return memo;
            }, memo);
        }, {});

        var setRawValueFunctions = _.reduce(this.packetTemplates, function(memo, pt) {
            return _.reduce(pt.fields, function(memo, ptf) {
                var funcId = sprintf('_%04X_%04X_%04X_%s', pt.destinationAddress, pt.sourceAddress, pt.command, ptf.id);

                memo [funcId] = function(newValue, buffer, start, end) {
                    return that.setRawValue(pt, ptf, newValue, buffer, start, end);
                };

                return memo;
            }, memo);
        }, {});

        var deviceSpecs = _.reduce(this.deviceTemplates, function(memo, dt) {
            var deviceId = sprintf('_%04X', dt.selfAddress);

            memo [deviceId] = {
                // FIXME(daniel): should be configurable language
                name: dt.name.de,
            };

            return memo;
        }, {});

        var deviceSpecCache = {};

        var getDeviceSpecification = function(selfAddress, peerAddress) {
            var deviceSpecId = sprintf('%04X_%04X', selfAddress, peerAddress);
            var deviceSpec;
            if (_.has(deviceSpecCache, deviceSpecId)) {
                deviceSpec = deviceSpecCache [deviceSpecId];
            } else {
                var dt = _.find(that.deviceTemplates, function(dt) {
                    if ((selfAddress & dt.selfMask) !== (dt.selfAddress & dt.selfMask)) {
                        // nop
                    } else if ((peerAddress & dt.peerMask) !== (dt.peerAddress & dt.peerMask)) {
                        // nop
                    } else {
                        return true;
                    }
                    return false;
                });

                if (!dt) {
                    deviceSpec = null;
                } else {
                    var deviceId = sprintf('_%04X', dt.selfAddress);
                    deviceSpec = deviceSpecs [deviceId];
                }
                deviceSpecCache [deviceSpecId] = deviceSpec;
            }
            return deviceSpec;
        };

        var packetFieldSpecs = _.reduce(this.packetTemplates, function(memo, pt) {
            var packetId = sprintf('_%04X_%04X_%04X', pt.destinationAddress, pt.sourceAddress, pt.command);

            memo [packetId] = _.map(pt.fields, function(ptf) {
                var rootTypeId = ptf.type && ptf.type.typeCode;
                var precision = ptf.precision;
                var unitCode = ptf.unit && ptf.unit.unitCode || 'None';

                var factor = Math.pow(10, - precision);

                var typeId = rootTypeId + '_';
                typeId += sprintf('%.' + precision + 'f', factor).replace(/[^0-9]/g, '_');
                typeId += '_' + unitCode;

                var funcId = sprintf('_%04X_%04X_%04X_%s', pt.destinationAddress, pt.sourceAddress, pt.command, ptf.id);

                var parts = _.map(ptf.parts, function(ptfp) {
                    return {
                        offset: ptfp.offset,
                        mask: ptfp.mask,
                        bitPos: ptfp.bitPos,
                        isSigned: ptfp.isSigned,
                        factor: ptfp.factor,
                    };
                });

                return {
                    fieldId: ptf.id,
                    name: ptf.name,
                    type: types [typeId],
                    factor: factor,
                    getRawValue: getRawValueFunctions [funcId],
                    setRawValue: setRawValueFunctions [funcId],
                    parts: parts,
                };
            });

            return memo;
        }, {});

        var packetSpecs = _.reduce(this.packetTemplates, function(memo, pt) {
            var packetId = sprintf('_%04X_%04X_%04X', pt.destinationAddress, pt.sourceAddress, pt.command);

            memo [packetId] = {
                packetId: packetId.slice(1),
                packetFields: packetFieldSpecs [packetId],
            };

            return memo;
        }, {});

        var packetSpecCache = {};

        var getPacketSpecification = function(destinationAddress, sourceAddress, command) {
            var packetSpecId = sprintf('%04X_%04X_%04X', destinationAddress, sourceAddress, command);
            var packetSpec;
            if (_.has(packetSpecCache, packetSpecId)) {
                packetSpec = packetSpecCache [packetSpecId];
            } else {
                var pt = _.find(that.packetTemplates, function(pt) {
                    if ((destinationAddress & pt.destinationMask) !== (pt.destinationAddress & pt.destinationMask)) {
                        // nop
                    } else if ((sourceAddress & pt.sourceMask) !== (pt.sourceAddress & pt.sourceMask)) {
                        // nop
                    } else if (command !== pt.command) {
                        // nop
                    } else {
                        return true;
                    }
                    return false;
                });

                if (!pt) {
                    packetSpec = null;
                } else {
                    var packetId = sprintf('_%04X_%04X_%04X', pt.destinationAddress, pt.sourceAddress, pt.command);
                    packetSpec = packetSpecs [packetId];
                }

                packetSpecCache [packetSpecId] = packetSpec;
            }
            return packetSpec;
        };

        this.specificationData = {
            units: units,
            types: types,
            getRawValueFunctions: getRawValueFunctions,
            deviceSpecs: deviceSpecs,
            getDeviceSpecification: getDeviceSpecification,
            packetFieldSpecs: packetFieldSpecs,
            packetSpecs: packetSpecs,
            getPacketSpecification: getPacketSpecification,
        };
    },

    _parseBuffer: function(buffer) {
        var that = this;

        var sliceBlock = function(name, offset, size) {
            if ((offset < 0) || (offset > buffer.length)) {
                throw new Error('Offset of ' + name + ' is out of range');
            } else if ((offset + size) > buffer.length) {
                throw new Error('Buffer too small to contain ' + name + ' at offset ' + offset);
            } else {
                return buffer.slice(offset, offset + size);
            }
        };

        var processBlockTable = function(blockName, tableCount, tableOffset, blockSize, cb) {
            // NOTE(daniel): just call this to make sure the table fits
            sliceBlock(blockName + ' table', tableOffset, tableCount * blockSize);

            for (var index = 0; index < tableCount; index++) {
                var blockOffset = tableOffset + index * blockSize;
                var blockBuffer = sliceBlock(blockName, blockOffset, blockSize);
                cb(blockBuffer, index, blockOffset);
            }
        };

        var fileHeaderBuffer = sliceBlock('FILEHEADER', 0, 0x10);

        var fileHeaderBlock = {
            checksumA: fileHeaderBuffer.readUInt16LE(0x00),
            checksumB: fileHeaderBuffer.readUInt16LE(0x02),
            totalLength: fileHeaderBuffer.readInt32LE(0x04),
            dataVersion: fileHeaderBuffer.readInt32LE(0x08),
            specificationOffset: fileHeaderBuffer.readInt32LE(0x0c),
        };

        if (fileHeaderBlock.checksumA !== fileHeaderBlock.checksumB) {
            throw new Error('FILEHEADER.ChecksumA and FILEHEADER.ChecksumB do not match');
        } else if (calcCrc16(buffer, 4, buffer.length) !== fileHeaderBlock.checksumA) {
            throw new Error('FILEHEADER.Checksum[AB] do not match contents');
        } else if (fileHeaderBlock.totalLength !== buffer.length) {
            throw new Error('FILEHEADER.TotalLength does not match size of buffer');
        } else if (fileHeaderBlock.dataVersion !== 1) {
            throw new Error('Unsupported FILEHEADER.DataVersion');
        }

        var specificationBuffer = sliceBlock('SPECIFICATION', fileHeaderBlock.specificationOffset, 0x2c);

        var specificationBlock = {
            datecode: specificationBuffer.readInt32LE(0x00),
            textCount: specificationBuffer.readInt32LE(0x04),
            textTableOffset: specificationBuffer.readInt32LE(0x08),
            localizedTextCount: specificationBuffer.readInt32LE(0x0c),
            localizedTextTableOffset: specificationBuffer.readInt32LE(0x10),
            unitCount: specificationBuffer.readInt32LE(0x14),
            unitTableOffset: specificationBuffer.readInt32LE(0x18),
            deviceTemplateCount: specificationBuffer.readInt32LE(0x1c),
            deviceTemplateTableOffset: specificationBuffer.readInt32LE(0x20),
            packetTemplateCount: specificationBuffer.readInt32LE(0x24),
            packetTemplateTableOffset: specificationBuffer.readInt32LE(0x28),
        };

        var texts = [];
        processBlockTable('TEXT', specificationBlock.textCount, specificationBlock.textTableOffset, 0x04, function(textBuffer) {
            var textBlock = {
                stringOffset: textBuffer.readInt32LE(0x00),
            };

            var stringStart = textBlock.stringOffset;
            var stringEnd = stringStart;
            while ((stringEnd < buffer.length) && (buffer [stringEnd] !== 0)) {
                stringEnd++;
            }

            texts.push(buffer.slice(stringStart, stringEnd).toString('utf-8'));
        });

        var localizedTexts = [];
        processBlockTable('LOCALIZEDTEXT', specificationBlock.localizedTextCount, specificationBlock.localizedTextTableOffset, 0x0c, function(locTextBuffer) {
            var locTextBlock = {
                textIndexEN: locTextBuffer.readInt32LE(0x00),
                textIndexDE: locTextBuffer.readInt32LE(0x04),
                textIndexFR: locTextBuffer.readInt32LE(0x08),
            };

            localizedTexts.push({
                en: texts [locTextBlock.textIndexEN],
                de: texts [locTextBlock.textIndexDE],
                fr: texts [locTextBlock.textIndexFR],
            });
        });

        var units = [];
        processBlockTable('UNIT', specificationBlock.unitCount, specificationBlock.unitTableOffset, 0x10, function(unitBuffer) {
            var unitBlock = {
                unitId: unitBuffer.readInt32LE(0x00),
                unitFamilyId: unitBuffer.readInt32LE(0x04),
                unitCodeTextIndex: unitBuffer.readInt32LE(0x08),
                unitTextTextIndex: unitBuffer.readInt32LE(0x0c),
            };

            units.push({
                unitId: unitBlock.unitId,
                unitFamily: that.unitFamilyById [unitBlock.unitFamilyId] || null,
                unitCode: texts [unitBlock.unitCodeTextIndex],
                unitText: texts [unitBlock.unitTextTextIndex],
            });
        });

        var unitById = _.reduce(units, function(memo, unit) {
            memo [unit.unitId] = unit;
            return memo;
        }, {});

        var unitByCode = _.reduce(units, function(memo, unit) {
            memo [unit.unitCode] = unit;
            return memo;
        }, {});

        var deviceTemplates = [];
        processBlockTable('DEVICETEMPLATE', specificationBlock.deviceTemplateCount, specificationBlock.deviceTemplateTableOffset, 0x0c, function(dtBuffer) {
            var dtBlock = {
                selfAddress: dtBuffer.readUInt16LE(0x00),
                selfMask: dtBuffer.readUInt16LE(0x02),
                peerAddress: dtBuffer.readUInt16LE(0x04),
                peerMask: dtBuffer.readUInt16LE(0x06),
                nameLocalizedTextIndex: dtBuffer.readInt32LE(0x08),
            };

            deviceTemplates.push({
                selfAddress: dtBlock.selfAddress,
                selfMask: dtBlock.selfMask,
                peerAddress: dtBlock.peerAddress,
                peerMask: dtBlock.peerMask,
                name: localizedTexts [dtBlock.nameLocalizedTextIndex],
            });
        });

        var packetTemplates = [];
        processBlockTable('PACKETTEMPLATE', specificationBlock.packetTemplateCount, specificationBlock.packetTemplateTableOffset, 0x14, function(ptBuffer) {
            var ptBlock = {
                destinationAddress: ptBuffer.readUInt16LE(0x00),
                destinationMask: ptBuffer.readUInt16LE(0x02),
                sourceAddress: ptBuffer.readUInt16LE(0x04),
                sourceMask: ptBuffer.readUInt16LE(0x06),
                command: ptBuffer.readUInt16LE(0x08),
                fieldCount: ptBuffer.readInt32LE(0x0c),
                fieldTableOffset: ptBuffer.readInt32LE(0x10),
            };

            var fields = [];
            processBlockTable('PACKETTEMPLATEFIELD', ptBlock.fieldCount, ptBlock.fieldTableOffset, 0x1c, function(ptfBuffer) {
                var ptfBlock = {
                    idTextIndex: ptfBuffer.readInt32LE(0x00),
                    nameLocalizedTextIndex: ptfBuffer.readInt32LE(0x04),
                    unitId: ptfBuffer.readInt32LE(0x08),
                    precision: ptfBuffer.readInt32LE(0x0c),
                    typeId: ptfBuffer.readInt32LE(0x10),
                    partCount: ptfBuffer.readInt32LE(0x14),
                    partTableOffset: ptfBuffer.readInt32LE(0x18),
                };

                var parts = [];
                processBlockTable('PACKETTEMPLATEFIELDPART', ptfBlock.partCount, ptfBlock.partTableOffset, 0x10, function(ptfpBuffer) {
                    var ptfpBlock = {
                        offset: ptfpBuffer.readUInt32LE(0x00),
                        bitPos: ptfpBuffer.readInt8(0x04),
                        mask: ptfpBuffer.readUInt8(0x05),
                        isSigned: ptfpBuffer.readInt8(0x06),
                        factor: moreints.readInt64LE(ptfpBuffer, 0x08),
                    };

                    parts.push({
                        offset: ptfpBlock.offset,
                        bitPos: ptfpBlock.bitPos,
                        mask: ptfpBlock.mask,
                        isSigned: !!ptfpBlock.isSigned,
                        factor: ptfpBlock.factor,
                    });
                });

                fields.push({
                    id: texts [ptfBlock.idTextIndex],
                    name: localizedTexts [ptfBlock.nameLocalizedTextIndex],
                    unit: unitById [ptfBlock.unitId],
                    precision: ptfBlock.precision,
                    type: that.typeById [ptfBlock.typeId],
                    parts: parts,
                });
            });

            packetTemplates.push({
                destinationAddress: ptBlock.destinationAddress,
                destinationMask: ptBlock.destinationMask,
                sourceAddress: ptBlock.sourceAddress,
                sourceMask: ptBlock.sourceMask,
                command: ptBlock.command,
                fields: fields,
            });
        });

        this.dataVersion = fileHeaderBlock.dataVersion;
        this.datecode = specificationBlock.datecode;
        this.texts = texts;
        this.localizedTexts = localizedTexts;
        this.units = units;
        this.unitById = unitById;
        this.unitByCode = unitByCode;
        this.deviceTemplates = deviceTemplates;
        this.packetTemplates = packetTemplates;
    },

    getRawValue: function(pt, ptf, buffer, start, end) {
        var rawValue = 0, valid = false;
        _.forEach(ptf.parts, function(part) {
            if (start + part.offset < end) {
                var partValue;
                if (part.isSigned) {
                    partValue = buffer.readInt8(start + part.offset);
                } else {
                    partValue = buffer.readUInt8(start + part.offset);
                }
                if (part.mask !== 0xFF) {
                    partValue = partValue & part.mask;
                }
                if (part.bitPos > 0) {
                    partValue = partValue >> part.bitPos;
                }
                rawValue += partValue * part.factor;
                valid = true;
            }
        });
        if (ptf.precision > 0) {
            rawValue = rawValue * Math.pow(10, -ptf.precision);
        }
        if (!valid) {
            rawValue = null;
        }
        return rawValue;
    },

    setRawValue: function(pt, ptf, newValue, buffer, start, end) {
        if (ptf.precision > 0) {
            newValue = newValue * Math.pow(10, ptf.precision);
        }
        newValue = Math.round(newValue);

        _.forEach(ptf.parts, function(part) {
            if (start + part.offset < end) {
                var partValue = Math.floor(newValue / part.factor) & 255;
                if (part.bitPos > 0) {
                    partValue = partValue << part.bitPos;
                }
                if (part.mask !== 0xFF) {
                    partValue = (partValue & part.mask) | (buffer.readUInt8(start + part.offset) & (~part.mask));
                }
                buffer.writeUInt8(partValue, start + part.offset);
            }
        });
    },

}, {

    getDefaultSpecificationFile: function() {
        return defaultSpecificationFile;
    },

    loadFromFile: function(filename) {
        return new Promise(function(resolve, reject) {
            fs.readFile(filename, function(err, contents) {
                if (err) {
                    reject(err);
                } else {
                    resolve(contents);
                }
            });
        }).then(function(contents) {
            return new SpecificationFile(contents);
        });
    },

});


var defaultSpecificationFileBuffer = null;
try {
    defaultSpecificationFileBuffer = fs.readFileSync(path.resolve(__dirname, 'vbus_specification.vsf'));
} catch (ex) {
    // nop, just eat it
}

if (defaultSpecificationFileBuffer) {
    defaultSpecificationFile = new SpecificationFile(defaultSpecificationFileBuffer);
}



module.exports = SpecificationFile;
