'use strict';



var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');


var _ = require('lodash');
var moment = require('moment');
var sprintf = require('sprintf').sprintf;


var vbus = require('resol-vbus');


var packageInfo = require('./package.json');



var defaultConfig = {

    configVersion: 2,

    language: 'de',

    // host: host to connect to (IP address or host name)
    host: '',

    // port: port to connect to (defaults to 7053)
    port: 7053,

    // password: remote access password (defaults to 'vbus')
    password: '',

    // logInterval: log interval in seconds
    logInterval: 10,

    textLogDirectory: '',

    textLogFilePattern: 'YYYYMMDD[.csv]',

    textLogColumSeparator: '\t',

    textLogLineSeparator: '\r\n',

};

var storedConfig = JSON.parse(window.localStorage.getItem('config') || '{}');
if (!_.has(storedConfig, 'configVersion')) {
    storedConfig.configVersion = 1;
}

var config = _.extend({}, defaultConfig, storedConfig);

if (config.configVersion === 1) {
    config.configVersion = 2;

    config.textLogFilePattern = 'YYYYMMDD[.csv]';
}


var state = {

    appVersion: packageInfo.version,

    resolVBusVersion: vbus.VERSION,
    
    connectionState: vbus.TcpConnection.STATE_DISCONNECTED,

    packetCount: 0,

    uniquePacketCount: 0,

    lastFilePath: null,

};



var logToTextFile = function(headerSet, idHashDiffers, spec) {
    var headers = headerSet.getSortedHeaders();

    var packetInfos = _.reduce(headers, function(memo, header) {
        if (header.getProtocolVersion() === 0x10) {
            var packetSpec = spec.getPacketSpecification(header);
            if (packetSpec && (packetSpec.packetFields.length > 0)) {
                memo.push({
                    packet: header,
                    packetSpec: packetSpec,
                });
            }
        }
        return memo;
    }, []);

    var content = '', columns;

    var appendColumnsToContent = function() {
        content += columns.join(config.textLogColumSeparator) + config.textLogLineSeparator;
    };

    if (idHashDiffers) {
        // output header lines first
        columns = [ '' ];

        _.forEach(packetInfos, function(packetInfo) {
            var packetDesc = sprintf('VBus #%d: %s => %s', packetInfo.packet.channel, packetInfo.packetSpec.sourceDevice.name, packetInfo.packetSpec.destinationDevice.name);
            columns.push(packetDesc);

            var packetFields = packetInfo.packetSpec.packetFields;
            for (var i = 1; i < packetFields.length; i++) {
                columns.push('');
            }
        });
        appendColumnsToContent();

        columns = [ 'Date / Time' ];
        _.forEach(packetInfos, function(packetInfo) {
            var packetFields = packetInfo.packetSpec.packetFields;
            for (var i = 0; i < packetFields.length; i++) {
                var columnDesc = packetFields [i].name.ref;
                columns.push(columnDesc);
            }
        });
        appendColumnsToContent();
    }

    columns = [ moment(headerSet.timestamp).lang(config.language).format('L HH:mm:ss') ];
    _.forEach(packetInfos, function(packetInfo) {
        var packetFrameData = packetInfo.packet.frameData;
        var packetFields = packetInfo.packetSpec.packetFields;
        for (var i = 0; i < packetFields.length; i++) {
            var packetField = packetFields [i];

            // console.log(packetField);
            var rawValue = spec.getRawValue(packetField, packetFrameData);
            var textValue = spec.formatTextValueFromRawValue(packetField, rawValue, 'None');
            columns.push(textValue);
        }
    });
    appendColumnsToContent();

    var filename = moment().format(config.textLogFilePattern);
    var filepath = path.join(config.textLogDirectory, filename);

    fs.appendFile(filepath, content, function (err) {
        if (err) {
            console.log(err);
        } else {
            state.lastFilePath = filepath;
        }
    });

};



var App = vbus.extend(EventEmitter, {

    config: config,

    state: state,

    connection: null,

    logger: null,

    headerSet: null,

    spec: null,

    constructor: function() {
        var _this = this;

        EventEmitter.call(this);

        this.logger = new vbus.Logger({
            logInterval: config.logInterval * 1000
        });

        this.logger.on('logInterval', function(event) {
            if (state.connectionState === vbus.TcpConnection.STATE_CONNECTED) {
                logToTextFile(_this.headerSet, event.idHashDiffers, _this.spec);
            }
        });

        this.logger.startLogInterval();

        this.headerSet = this.logger.headerSet;

        this.spec = new vbus.Specification({
            language: config.language
        });
    },

    saveConfig: function() {
        window.localStorage.setItem('config', JSON.stringify(this.config));
    },

    connect: function() {
        var _this = this;

        this.connection = new vbus.TcpConnection({
            host: config.host,
            port: config.port,
            password: config.password,
        });

        this.connection.on('connectionState', function() {
            _this._onConnectionState();
        });

        this.connection.on('packet', function(packet) {
            state.packetCount++;
            _this.headerSet.addHeader(packet);
        });

        this.connection.connect();

        this.logger.logInterval = config.logInterval * 1000;
    },

    disconnect: function() {
        if (this.connection) {
            this.connection.disconnect();
        }
    },

    _onConnectionState: function() {
        if (this.connection) {
            state.connectionState = this.connection.connectionState;
        } else {
            state.connectionState = vbus.TcpConnection.STATE_DISCONNECTED;
        }

        if (state.connectionState === vbus.TcpConnection.STATE_DISCONNECTED) {
            this.connection.removeAllListeners();

            this.connection = null;
        }

        this.emit('connectionState');
    }

});



module.exports = new App();
