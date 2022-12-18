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
const SerialConnection = require('./serial-connection');
const TcpConnection = require('./tcp-connection');

const DataSource = require('./data-source');
const SerialDataSource = require('./serial-data-source');
const TcpDataSource = require('./tcp-data-source');

const DataSourceProvider = require('./data-source-provider');
const SerialDataSourceProvider = require('./serial-data-source-provider');
const TcpDataSourceProvider = require('./tcp-data-source-provider');

const Converter = require('./converter');
const VBusRecordingConverter = require('./vbus-recording-converter');
const TextConverter = require('./text-converter');
const DLxJsonConverter = require('./dlx-json-converter');

const ConfigurationOptimizer = require('./configuration-optimizer');
const ConfigurationOptimizerFactory = require('./configuration-optimizer-factory');
const BaseConfigurationOptimizer = require('./base-configuration-optimizer');

const Customizer = require('./customizer');
const ConnectionCustomizer = require('./connection-customizer');

const TcpConnectionEndpoint = require('./tcp-connection-endpoint');



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
    SerialConnection,
    TcpConnection,

    DataSource,
    SerialDataSource,
    TcpDataSource,

    DataSourceProvider,
    SerialDataSourceProvider,
    TcpDataSourceProvider,

    Converter,
    VBusRecordingConverter,
    TextConverter,
    DLxJsonConverter,

    ConfigurationOptimizer,
    ConfigurationOptimizerFactory,
    BaseConfigurationOptimizer,

    Customizer,
    ConnectionCustomizer,

    TcpConnectionEndpoint,

};
