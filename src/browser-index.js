/*!
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 *
 * Copyright (c) 2013-2018, Daniel Wippermann.
 *
 * This Software is released under the MIT license.
 */
'use strict';



const packageInfo = require('../package.json');


const utils = require('./utils');

const I18N = require('./i18n');

const SpecificationFile = require('./specification-file');
const Specification = require('./specification');

const Header = require('./header');
const Packet = require('./packet');
const Datagram = require('./datagram');
const Telegram = require('./telegram');

const HeaderSet = require('./header-set');
const HeaderSetConsolidator = require('./header-set-consolidator');

const Connection = require('./connection');
// var SerialConnection = require('./serial-connection');
// var TcpConnection = require('./tcp-connection');

// var DataSource = require('./data-source');
// var SerialDataSource = require('./serial-data-source');
// var TcpDataSource = require('./tcp-data-source');

// var DataSourceProvider = require('./data-source-provider');
// var SerialDataSourceProvider = require('./serial-data-source-provider');
// var TcpDataSourceProvider = require('./tcp-data-source-provider');

const Converter = require('./converter');
const VBusRecordingConverter = require('./vbus-recording-converter');
const TextConverter = require('./text-converter');
const DLxJsonConverter = require('./dlx-json-converter');

const Recorder = require('./recorder');
const DLxRecorder = require('./dlx-recorder');
// var FileSystemRecorder = require('./filesystem-recorder');

// var ConfigurationOptimizer = require('./configuration-optimizer');
// var ConfigurationOptimizerFactory = require('./configuration-optimizer-factory');
// var BaseConfigurationOptimizer = require('./base-configuration-optimizer');

// var Customizer = require('./customizer');
// var ConnectionCustomizer = require('./connection-customizer');

// var TcpConnectionEndpoint = require('./tcp-connection-endpoint');



module.exports = {

    VERSION: packageInfo.version,

    utils,

    I18N,

    SpecificationFile,
    Specification,

    Header,
    Packet,
    Datagram,
    Telegram,

    HeaderSet,
    HeaderSetConsolidator,

    Connection,
    // SerialConnection: SerialConnection,
    // TcpConnection: TcpConnection,

    // DataSource: DataSource,
    // SerialDataSource: SerialDataSource,
    // TcpDataSource: TcpDataSource,

    // DataSourceProvider: DataSourceProvider,
    // SerialDataSourceProvider: SerialDataSourceProvider,
    // TcpDataSourceProvider: TcpDataSourceProvider,

    Converter,
    VBusRecordingConverter,
    TextConverter,
    DLxJsonConverter,

    Recorder,
    DLxRecorder,
    // FileSystemRecorder: FileSystemRecorder,

    // ConfigurationOptimizer: ConfigurationOptimizer,
    // ConfigurationOptimizerFactory: ConfigurationOptimizerFactory,
    // BaseConfigurationOptimizer: BaseConfigurationOptimizer,

    // Customizer: Customizer,
    // ConnectionCustomizer: ConnectionCustomizer,

    // TcpConnectionEndpoint: TcpConnectionEndpoint,

};
