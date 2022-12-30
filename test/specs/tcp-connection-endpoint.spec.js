/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { EventEmitter } = require('events');


const {
    TcpConnectionEndpoint,
} = require('./resol-vbus');


const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('TcpConnectionEndpoint', () => {

    itShouldWorkCorrectlyAfterMigratingToClass(TcpConnectionEndpoint, EventEmitter, {
        port: 7053,
        channels: null,
        server: null,
        constructor: Function,
        start: Function,
        stop: Function,
        _onConnection: Function,
    }, {

    });

});
