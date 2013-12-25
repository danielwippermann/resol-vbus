/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var path = require('path');


var _ = require('lodash');
var moment = require('moment');
var sprintf = require('sprintf').sprintf;


var Recorder = require('./recorder');



var optionKeys = [
    'directory',
    'filePattern',
    'columnSeparator',
    'lineSeparator',
    'separateDateAndTime',
    'specification',
];



var TextFileRecorder = Recorder.extend({

    directory: '.',

    filePattern: 'YYYYMMDD[.csv]',

    columnSeparator: '\t',

    lineSeparator: '\r\n',

    separateDateAndTime: false,

    specification: null,

    lastFilePath: null,

    lastIdList: null,

    constructor: function(options) {
        Recorder.call(this);

        _.extend(this, _.pick(options, optionKeys));
    },

    recordHeaderSet: function(headerSet) {
        var _this = this;

        var spec = this.specification;

        var language = spec.language || 'en';

        var headers = headerSet.getSortedHeaders();

        var packetFields = spec.getPacketFieldsForHeaders(headers);

        var now = moment(headerSet.timestamp).lang(language);

        var filename = now.format(this.filePattern);
        var filepath = path.join(this.directory, filename);

        var idList = _.pluck(packetFields, 'id').join(',');

        var content = '', columns;

        var appendColumnsToContent = function() {
            content += columns.join(_this.columnSeparator) + _this.lineSeparator;
        };

        var needHeaderLines = false;
        if (this.lastIdList !== idList) {
            this.lastIdList = idList;
            needHeaderLines = true;
        }
        if (this.lastFilePath !== filepath) {
            this.lastFilePath = filepath;
            needHeaderLines = true;
        }

        if (needHeaderLines) {
            var lastPacketSpec = null;

            columns = [];
            if (this.separateDateAndTime) {
                columns.push('');
                columns.push('');
            } else {
                columns.push('');
            }

            _.forEach(packetFields, function(packetField) {
                var packetDesc;
                if (lastPacketSpec !== packetField.packetSpec) {
                    lastPacketSpec = packetField.packetSpec;

                    if (packetField.packet && packetField.packetSpec) {
                        packetDesc = sprintf('VBus #%d: %s => %s', packetField.packet.channel, packetField.packetSpec.sourceDevice.name, packetField.packetSpec.destinationDevice.name);
                    } else {
                        packetDesc = '';
                    }
                } else {
                    packetDesc = '';
                }
                columns.push(packetDesc);
            });
            appendColumnsToContent();

            columns = [];
            if (this.separateDateAndTime) {
                columns.push('Date');
                columns.push('Time');
            } else {
                columns.push('Date / Time');
            }

            _.forEach(packetFields, function(packetField) {
                var columnDesc;
                if (packetField.packetFieldSpec) {
                    var names = packetField.packetFieldSpec.name;
                    columnDesc = names [language] || names.en || names.de || names.ref;

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

        columns = [];
        if (this.separateDateAndTime) {
            columns.push(now.format('L'));
            columns.push(now.format('HH:mm:ss'));
        } else {
            columns.push(now.format('L HH:mm:ss'));
        }
        
        _.forEach(packetFields, function(packetField) {
            var textValue;
            if (packetField.packet && packetField.packetSpec && packetField.packetFieldSpec) {
                var rawValue = spec.getRawValue(packetField.packetFieldSpec, packetField.packet.frameData);
                textValue = spec.formatTextValueFromRawValue(packetField.packetFieldSpec, rawValue, 'None');
            } else {
                textValue = '';
            }
            columns.push(textValue);
        });
        appendColumnsToContent();

        fs.appendFile(filepath, content, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },

});



module.exports = TextFileRecorder;
