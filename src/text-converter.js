/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var _ = require('lodash');
var moment = require('moment');
var sprintf = require('sprintf').sprintf;


var Converter = require('./converter');
var Specification = require('./specification');



var optionKeys = [
    'columnSeparator',
    'lineSeparator',
    'separateDateAndTime',
    'specification',
];



var TextConverter = Converter.extend({

    columnSeparator: '\t',

    lineSeparator: '\r\n',

    separateDateAndTime: false,

    specification: null,

    lastIdList: null,

    constructor: function(options) {
        Converter.call(this, options);

        _.extend(this, _.pick(options, optionKeys));

        if (!this.specification) {
            this.specification = new Specification(options && options.language || 'en');
        }
    },

    reset: function() {
        this.lastIdList = null;
    },

    convertHeaderSet: function(headerSet) {
        var _this = this;

        var spec = this.specification;

        var i18n = spec.i18n;

        var headers = headerSet.getSortedHeaders();

        var packetFields = spec.getPacketFieldsForHeaders(headers);

        var now = i18n.moment(headerSet.timestamp);

        var idList = _.pluck(packetFields, 'id').join(',');

        var content = '', columns;

        var appendDateAndTimeColumns = function(date, time, join) {
            columns = [];
            if (_this.separateDateAndTime) {
                columns.push(date);
                columns.push(time);
            } else {
                columns.push(date + join + time);
            }
        };

        var appendColumnsToContent = function() {
            content += columns.join(_this.columnSeparator) + _this.lineSeparator;
        };

        var needHeaderLines = false;
        if (this.lastIdList !== idList) {
            this.lastIdList = idList;
            needHeaderLines = true;
        }

        if (needHeaderLines) {
            // packet spec header line
            var lastPacketSpec = null;

            appendDateAndTimeColumns('', '', '');

            _.forEach(packetFields, function(packetField) {
                var packetDesc;
                if (lastPacketSpec !== packetField.packetSpec) {
                    lastPacketSpec = packetField.packetSpec;

                    if (packetField.packetSpec) {
                        packetDesc = packetField.packetSpec.fullName || '';
                    } else {
                        packetDesc = '';
                    }
                } else {
                    packetDesc = '';
                }
                columns.push(packetDesc);
            });

            appendColumnsToContent();

            // packet field spec header line
            appendDateAndTimeColumns(i18n.t('textConverter.date'), i18n.t('textConverter.time'), ' / ');

            _.forEach(packetFields, function(packetField) {
                var columnDesc = packetField.name;
                if (packetField.packetFieldSpec) {
                    var type = packetField.packetFieldSpec.type;
                    if (type && type.unit && type.unit.unitText) {
                        columnDesc += ' [' + type.unit.unitText + ']';
                    }
                } else {
                    columnDesc = '';
                }
                columns.push(columnDesc);
            });

            appendColumnsToContent();
        }

        // value line
        appendDateAndTimeColumns(now.format('L'), now.format('HH:mm:ss'), ' ');

        _.forEach(packetFields, function(packetField) {
            var textValue = packetField.formatTextValue('None');
            columns.push(textValue);
        });

        appendColumnsToContent();

        return this.push(content);
    },

    _read: function() {
        // nop
    },

});



module.exports = TextConverter;
