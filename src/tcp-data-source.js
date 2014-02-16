/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var DataSource = require('./data-source');

var TcpConnection = require('./tcp-connection');



var optionKeys = [
    'host',
    'liveChannel',
    'livePassword',
];



var TcpDataSource = DataSource.extend(/** @lends TcpDataSource# */ {

    /**
     * The host to connect to.
     * @type {string}
     */
    host: null,

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
    constructor: function(options) {
        DataSource.call(this, options);

        _.extend(this, _.pick(options, optionKeys));

        this.options = options;
    },

    connectLive: function(options) {
        var defaultOptions = {
            channel: this.liveChannel,
            password: this.livePassword,
        };

        options = _.extend(defaultOptions, options, {
            provider: this.provider,
            dataSource: this.id,
        });

        var connection = new TcpConnection(options);

        return Q.fcall(function() {
            return connection.connect();
        }).then(function() {
            return connection;
        });
    }

});



module.exports = TcpDataSource;
