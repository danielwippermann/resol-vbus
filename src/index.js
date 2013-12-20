/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var packageInfo = require('../package.json');


var extend = require('./extend');

var Specification = require('./specification');

var Header = require('./header');
var Packet = require('./packet');
var Datagram = require('./datagram');
// var Telegram = require('./telegram');

var HeaderSet = require('./header-set');

var Logger = require('./logger');

var Connection = require('./connection');

// var TcpDataSourceProvider = require('./tcp-data-source-provider');
var TcpConnection = require('./tcp-connection');



module.exports = {
    
    VERSION: packageInfo.version,
    
    extend: extend,
    
    Specification: Specification,

    Header: Header,
    Packet: Packet,
    Datagram: Datagram,
    // Telegram: Telegram,

    HeaderSet: HeaderSet,

    Logger: Logger,
    
    Connection: Connection,
    
    // TcpDataSourceProvider: TcpDataSourceProvider,
    TcpConnection: TcpConnection,

};
