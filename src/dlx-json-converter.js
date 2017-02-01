/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var HeaderSet = require('./header-set');
var Specification = require('./specification');

var Converter = require('./converter');



var optionKeys = [
    'specification',
    'statsOnly',
];



var DLxJsonConverter = Converter.extend(/** @lends DLxJsonConverter# */ {

    /**
     * Reference to the Specification instance that is used for the binary -> text conversion.
     * @type {Specification}
     */
    specification: null,

    statsOnly: false,

    allHeaderSet: null,

    emittedStart: false,

    stats: null,

    /**
     * Creates a new DLxJsonConverter instance and optionally initializes its members with the given values.
     *
     * @constructs
     * @augments Converter
     * @param {object} options Initialization values
     * @param {object} options.specification See {@link DLxJsonConverter#specification}
     *
     * @classdesc
     * The DLxJsonConverter class takes HeaderSet instances, converts them into JSON
     * representation and then publishes that on the readable stream side
     * of itself. The format of the JSON data is similar to the one that is generated
     * by the Dataloggers DL2 and DL3.
     *
     * It does not support parsing JSON content back into HeaderSet instances (the
     * writable stream side).
     */
    constructor: function(options) {
        Converter.call(this, options);

        _.extend(this, _.pick(options, optionKeys));

        if (!this.specification) {
            this.specification = new Specification({
                language: options && options.language || 'en'
            });
        }

        this.allHeaderSet = new HeaderSet();

        this.reset();
    },

    reset: function() {
        this.allHeaderSet.removeAllHeaders();

        this.emittedStart = false;

        this.stats = {
            headerSetCount: 0,
            minTimestamp: null,
            maxTimestamp: null,
        };
    },

    finish: function() {
        this._emitEnd();

        return Converter.prototype.finish.apply(this, arguments);
    },

    convertHeaderSet: function(headerSet) {
        var headers = headerSet.getHeaders();

        this.allHeaderSet.addHeaders(headers);

        if (!this.statsOnly) {
            this._convertHeaderSetToJson(headerSet);
        }

        var spec = this.specification;

        var i18n = spec.i18n;

        var now = i18n.moment(headerSet.timestamp);

        var timestamp = now.valueOf();

        this.stats.headerSetCount++;

        if ((this.stats.minTimestamp === null) || (this.stats.minTimestamp > timestamp)) {
            this.stats.minTimestamp = timestamp;
        }
        if ((this.stats.maxTimestamp === null) || (this.stats.maxTimestamp < timestamp)) {
            this.stats.maxTimestamp = timestamp;
        }
    },

    _convertHeaderSetToJson: function(headerSet) {
        var spec = this.specification;

        var i18n = spec.i18n;

        var headers = headerSet.getHeaders();

        var packetFields = spec.getPacketFieldsForHeaders(headers);

        var now = i18n.moment(headerSet.timestamp);

        var allHeaders = this.allHeaderSet.getHeaders();

        var packetInfoList = _.map(allHeaders, function(header, headerIndex) {
            return {
                header: header,
                headerIndex: headerIndex,
                packetFields: [],
            };
        });

        _.forEach(packetFields, function(packetField) {
            var headerIndex = allHeaders.indexOf(packetField.packet);
            if (headerIndex >= 0) {
                var packetInfo = packetInfoList [headerIndex];
                packetInfo.packetFields.push(packetField);
            }
        });

        var noneUnit = spec.getUnitById('None');
        var numberType = spec.getTypeById('Number');

        var packetData = _.reduce(packetInfoList, function(memo, packetInfo) {
            if (packetInfo.packetFields.length >= 0) {
                var fieldData = _.map(packetInfo.packetFields, function(packetField, packetFieldIndex) {
                    var rawValue = packetField.rawValue;
                    var precision = packetField.packetFieldSpec.type.precision;
                    var numberValue = spec.formatTextValueFromRawValueInternal(rawValue, noneUnit, numberType, precision, noneUnit);
                    rawValue = + numberValue;

                    return {
                        field_index: packetFieldIndex,
                        raw_value: rawValue,
                        value: packetField.formatTextValue('None'),
                    };
                });

                memo.push({
                    header_index: packetInfo.headerIndex,
                    timestamp: packetInfo.header.timestamp / 1000.0,
                    field_values: fieldData,
                });
            }

            return memo;
        }, []);

        var timestamp = now.valueOf();

        var headerSetData = {
            timestamp: timestamp / 1000.0,
            packets: packetData,
        };

        this._emitStart();

        var content = [
            (this.stats.headerSetCount > 0) ? ',' : '',
            JSON.stringify(headerSetData),
        ].join('');

        this.push(content);
    },

    _emitStart: function() {
        if (!this.emittedStart) {
            this.emittedStart = true;

            this.push('{"headersets":[');
        }
    },

    _emitEnd: function() {
        var spec = this.specification;

        var allHeaders = this.allHeaderSet.getHeaders();

        var allPacketFields = spec.getPacketFieldsForHeaders(allHeaders);

        var packetInfoList = _.map(allHeaders, function(header, headerIndex) {
            return {
                header: header,
                headerIndex: headerIndex,
                packetSpec: spec.getPacketSpecification(header),
                packetFields: [],
            };
        });

        _.forEach(allPacketFields, function(packetField) {
            var headerIndex = allHeaders.indexOf(packetField.packet);
            if (headerIndex >= 0) {
                var packetInfo = packetInfoList [headerIndex];
                packetInfo.packetFields.push(packetField);
            }
        });

        var headersData = _.reduce(packetInfoList, function(memo, packetInfo, packetInfoIndex) {
            if (packetInfo.packetFields.length >= 0) {
                var fieldsData = _.map(packetInfo.packetFields, function(packetField, packetFieldIndex) {
                    return {
                        id: packetField.packetFieldSpec.fieldId,
                        filteredId: packetField.packetFieldSpec.filteredPacketFieldId,
                        name: packetField.name,
                        unit: packetField.packetFieldSpec.type.unit.unitText,
                        unit_code: packetField.packetFieldSpec.type.unit.unitCode,
                    };
                });

                var md;

                var packetSpec = packetInfo.packetSpec;
                var id = packetSpec.packetId;
                if ((md = /^(.._...._....)_10(_....)$/.exec(id)) !== null) {
                    id = md [1] + md [2];
                }

                var description = packetSpec.fullName;
                if ((md = /^(VBus )#([0-9]+:.*)$/.exec(description)) !== null) {
                    description = md[1] + md [2];
                } else {
                    description = 'VBus 0: ' + description;
                }

                memo.push({
                    id: id,
                    description: description,
                    channel: packetSpec.channel,
                    destination_address: packetSpec.destinationAddress,
                    source_address: packetSpec.sourceAddress,
                    protocol_version: packetSpec.protocolVersion,
                    command: packetSpec.command,
                    info: packetSpec.info,
                    destination_name: packetSpec.destinationDevice.name,
                    source_name: packetSpec.sourceDevice.name,
                    fields: fieldsData,
                });
            }

            return memo;
        }, []);

        var statsData = {
            headerset_count: this.stats.headerSetCount,
            min_timestamp : this.stats.minTimestamp / 1000.0,
            max_timestamp: this.stats.maxTimestamp / 1000.0,
        };

        this._emitStart();

        var content = [
            '],"headerset_stats":',
            JSON.stringify(statsData),
            ',"headers":',
            JSON.stringify(headersData),
            ',"language":"',
            spec.i18n.language,
            '"}'
        ].join('');

        this.push(content);

        this.push(null);
    },

    _read: function() {
        // nop
    },

});



module.exports = DLxJsonConverter;
