/**
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 *
 * Copyright (c) 2013, Daniel Wippermann.
 *
 * This Software is released under the MIT license.
 */
'use strict';



var packageInfo = require('../package.json');


var extend = require('./extend');

var I18N = require('./i18n');

var Specification = require('./specification');

var Header = require('./header');
var Packet = require('./packet');
var Datagram = require('./datagram');
var Telegram = require('./telegram');

var HeaderSet = require('./header-set');

var Logger = require('./logger');

var Connection = require('./connection');

// var TcpDataSourceProvider = require('./tcp-data-source-provider');
var TcpConnection = require('./tcp-connection');

var Converter = require('./converter');
var VBusRecordingConverter = require('./vbus-recording-converter');
var TextConverter = require('./text-converter');

var TextFileRecorder = require('./text-file-recorder');



module.exports = {
    
    VERSION: packageInfo.version,
    
    extend: extend,
    
    I18N: I18N,
    
    Specification: Specification,

    Header: Header,
    Packet: Packet,
    Datagram: Datagram,
    Telegram: Telegram,

    HeaderSet: HeaderSet,

    Logger: Logger,
    
    Connection: Connection,
    
    // TcpDataSourceProvider: TcpDataSourceProvider,
    TcpConnection: TcpConnection,
    
    Converter: Converter,
    VBusRecordingConverter: VBusRecordingConverter,
    TextConverter: TextConverter,

    TextFileRecorder: TextFileRecorder,
};
