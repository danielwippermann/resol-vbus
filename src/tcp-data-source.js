/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const DataSource = require('./data-source');
const _ = require('./lodash');
const { promisify } = require('./utils');

const TcpConnection = require('./tcp-connection');



const optionKeys = [
    'host',
    'liveChannel',
    'livePassword',
];



const TcpDataSource = DataSource.extend(/** @lends TcpDataSource# */ {

    /**
     * The host to connect to.
     * @type {string}
     */
    host: null,

    /**
     * The port to connect to.
     * @type {number}
     */
    port: 7053,

    /**
     * The channel to connect to live.
     * @type {number}
     */
    liveChannel: 0,

    /**
     * The password to connect live.
     * @type {string}
     */
    livePassword: 'vbus',

    /**
     * Creates a new TcpDataSource instance.
     *
     * @constructs
     * @augments DataSource
     */
    constructor(options) {
        DataSource.call(this, options);

        _.extend(this, _.pick(options, optionKeys));

        this.options = options;
    },

    connectLive(options) {
        const defaultOptions = {
            host: this.host,
            port: this.port,
            viaTag: this.viaTag,
            password: this.livePassword,
            channel: this.liveChannel,
        };

        options = _.extend(defaultOptions, options, {
            provider: this.provider,
            dataSource: this.id,
        });

        const connection = new TcpConnection(options);

        return promisify(() => {
            return connection.connect();
        }).then(() => {
            return connection;
        });
    }

});



module.exports = TcpDataSource;
