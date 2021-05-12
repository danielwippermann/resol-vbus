/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const DataSource = require('./data-source');
const _ = require('./lodash');

const SerialConnection = require('./serial-connection');



const optionKeys = [
    'path',
];



class SerialDataSource extends DataSource {

    /**
     * Creates a new SerialDataSource.
     *
     * @constructs
     * @augments DataSource
     */
    constructor(options) {
        super(options);

        _.extend(this, _.pick(options, optionKeys));
    }

    async connectLive(options) {
        const defaultOptions = {
            path: this.path,
        };

        options = _.extend(defaultOptions, options, {
            provider: this.provider,
            dataSource: this.id,
        });

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
