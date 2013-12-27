/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var DataSource = require('./data-source');

var TcpConnection = require('./tcp-connection');



var optionKeys = [
    'host',
    'liveChannel',
    'livePassword',
];



var TcpDataSource = DataSource.extend({

    host: null,

    liveChannel: 0,

    livePassword: 'vbus',

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

        return connection.connect();
    }

});



module.exports = TcpDataSource;
