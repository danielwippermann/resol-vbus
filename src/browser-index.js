/*!
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 *
 * Copyright (c) 2013-2015, Daniel Wippermann.
 *
 * This Software is released under the MIT license.
 */
'use strict';



var packageInfo = require('../package.json');


var utils = require('./utils');
var extend = require('./extend');

var I18N = require('./i18n');

var Specification = require('./specification');

var Header = require('./header');
var Packet = require('./packet');
var Datagram = require('./datagram');
var Telegram = require('./telegram');

var HeaderSet = require('./header-set');
var HeaderSetConsolidator = require('./header-set-consolidator');

var Connection = require('./connection');
// var SerialConnection = require('./serial-connection');
// var TcpConnection = require('./tcp-connection');

// var DataSource = require('./data-source');
// var SerialDataSource = require('./serial-data-source');
// var TcpDataSource = require('./tcp-data-source');

// var DataSourceProvider = require('./data-source-provider');
// var SerialDataSourceProvider = require('./serial-data-source-provider');
// var TcpDataSourceProvider = require('./tcp-data-source-provider');

var Converter = require('./converter');
var VBusRecordingConverter = require('./vbus-recording-converter');
var TextConverter = require('./text-converter');
var DLxJsonConverter = require('./dlx-json-converter');

var Recorder = require('./recorder');
var DLxRecorder = require('./dlx-recorder');
// var FileSystemRecorder = require('./filesystem-recorder');

// var ConfigurationOptimizer = require('./configuration-optimizer');
// var ConfigurationOptimizerFactory = require('./configuration-optimizer-factory');
// var BaseConfigurationOptimizer = require('./base-configuration-optimizer');

// var Customizer = require('./customizer');
// var ConnectionCustomizer = require('./connection-customizer');

// var TcpConnectionEndpoint = require('./tcp-connection-endpoint');



module.exports = {

    VERSION: packageInfo.version,

    utils: utils,
    extend: extend,

    I18N: I18N,

    Specification: Specification,

    Header: Header,
    Packet: Packet,
    Datagram: Datagram,
    Telegram: Telegram,

    HeaderSet: HeaderSet,
    HeaderSetConsolidator: HeaderSetConsolidator,

    // Connection: Connection,
    // SerialConnection: SerialConnection,
    // TcpConnection: TcpConnection,

    // DataSource: DataSource,
    // SerialDataSource: SerialDataSource,
    // TcpDataSource: TcpDataSource,

    // DataSourceProvider: DataSourceProvider,
    // SerialDataSourceProvider: SerialDataSourceProvider,
    // TcpDataSourceProvider: TcpDataSourceProvider,

    Converter: Converter,
    VBusRecordingConverter: VBusRecordingConverter,
    TextConverter: TextConverter,
    DLxJsonConverter: DLxJsonConverter,

    // Recorder: Recorder,
    // DLxRecorder: DLxRecorder,
    // FileSystemRecorder: FileSystemRecorder,

    // ConfigurationOptimizer: ConfigurationOptimizer,
    // ConfigurationOptimizerFactory: ConfigurationOptimizerFactory,
    // BaseConfigurationOptimizer: BaseConfigurationOptimizer,

    // Customizer: Customizer,
    // ConnectionCustomizer: ConnectionCustomizer,

    // TcpConnectionEndpoint: TcpConnectionEndpoint,

};
