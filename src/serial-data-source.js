/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var Q = require('q');


var DataSource = require('./data-source');
var _ = require('./lodash');

var SerialConnection = require('./serial-connection');



var optionKeys = [
    'path',
];



var SerialDataSource = DataSource.extend(/** @lends SerialDataSource# */ {

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
        var defaultOptions = {
            path: this.path,
        };

        options = _.extend(defaultOptions, options, {
            provider: this.provider,
            dataSource: this.id,
        });

        var connection = new SerialConnection(options);

        return Q.fcall(function() {
            return connection.connect();
        }).then(function() {
            return connection;
        });
    }

});



module.exports = SerialDataSource;
