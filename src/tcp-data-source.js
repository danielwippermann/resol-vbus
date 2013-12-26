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

    livePassword: 0,

    constructor: function(options) {
        DataSource.call(this, options);

        _.extend(_.pick(options, optionKeys));
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
