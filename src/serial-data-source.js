/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const DataSource = require('./data-source');
const SerialConnection = require('./serial-connection');
const { applyDefaultOptions } = require('./utils');



class SerialDataSource extends DataSource {

    /**
     * Creates a new SerialDataSource.
     *
     * @constructs
     * @augments DataSource
     */
    constructor(options) {
        super(options);

        applyDefaultOptions(this, options, /** @lends SerialDataSource.prototype */ {

            /**
            * The path to the serial port.
            */
            path: null,

        });
    }

    async connectLive(options) {
        options = {
            path: this.path,
            ...options,
            provider: this.provider,
            dataSource: this.id,
        };

        const connection = new SerialConnection(options);

        await connection.connect();

        return connection;
    }

}


Object.assign(SerialDataSource.prototype, /** @lends SerialDataSource.prototype */ {

    /**
     * The path to the serial port.
     */
    path: null,

});



module.exports = SerialDataSource;
