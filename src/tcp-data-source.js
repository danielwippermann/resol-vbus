/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const DataSource = require('./data-source');
const { applyDefaultOptions } = require('./utils');

const TcpConnection = require('./tcp-connection');



class TcpDataSource extends DataSource {

    /**
     * Creates a new TcpDataSource instance.
     *
     * @constructs
     * @augments DataSource
     */
    constructor(options) {
        super(options);

        applyDefaultOptions(this, options,  /** @lends TcpDataSource.prototype */ {

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

        });

        this.options = options;
    }

    async connectLive(options) {
        options = {
            host: this.host,
            port: this.port,
            viaTag: this.viaTag,
            password: this.livePassword,
            channel: this.liveChannel,
            ...options,
            provider: this.provider,
            dataSource: this.id,
        };

        const connection = new TcpConnection(options);

        await connection.connect();

        return connection;
    }

}


Object.assign(TcpDataSource.prototype, /** @lends TcpDataSource.prototype */ {

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

});



module.exports = TcpDataSource;
