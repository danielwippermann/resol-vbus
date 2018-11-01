/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Q = require('q');


const DataSource = require('./data-source');
const _ = require('./lodash');

const SerialConnection = require('./serial-connection');



const optionKeys = [
    'path',
];



const SerialDataSource = DataSource.extend(/** @lends SerialDataSource# */ {

    /**
     * The path to the serial port.
     */
    path: null,

    /**
     * Creates a new SerialDataSource.
     *
     * @constructs
     * @augments DataSource
     */
    constructor: function(options) {
        DataSource.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    connectLive: function(options) {
        const defaultOptions = {
            path: this.path,
        };

        options = _.extend(defaultOptions, options, {
            provider: this.provider,
            dataSource: this.id,
        });

        const connection = new SerialConnection(options);

        return Q.fcall(function() {
            return connection.connect();
        }).then(function() {
            return connection;
        });
    }

});



module.exports = SerialDataSource;
