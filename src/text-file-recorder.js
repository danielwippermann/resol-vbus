/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
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
    'specification',
];



var TextFileRecorder = Recorder.extend({

    directory: '.',

    filePattern: 'YYYYMMDD[.csv]',

    columnSeparator: '\t',

    lineSeparator: '\r\n',

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

        var headers = headerSet.getSortedHeaders();

        var packetFields = spec.getPacketFieldsForHeaders(headers);

        var filename = moment().lang(spec.language).format(this.filePattern);
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

            columns = [ '' ];
            _.forEach(packetFields, function(packetField) {
                if (lastPacketSpec !== packetField.packetSpec) {
                    lastPacketSpec = packetField.packetSpec;

                    var packetDesc;
                    if (packetField.packet && packetField.packetSpec) {
                        packetDesc = sprintf('VBus #%d: %s => %s', packetField.packet.channel, packetField.packetSpec.sourceDevice.name, packetField.packetSpec.destinationDevice.name);
                    } else {
                        packetDesc = '';
                    }
                    columns.push(packetDesc);
                } else {
                    columns.push('');
                }
            });
            appendColumnsToContent();

            columns = [ 'Date / Time' ];
            _.forEach(packetFields, function(packetField) {
                var columnDesc;
                if (packetField.packetFieldSpec) {
                    columnDesc = packetField.packetFieldSpec.name.ref;
                } else {
                    columnDesc = '';
                }
                columns.push(columnDesc);
            });
            appendColumnsToContent();
        }

        columns = [ moment(headerSet.timestamp).lang(spec.language).format('L HH:mm:ss') ];
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
