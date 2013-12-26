/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var DataSource = require('./data-source');

var SerialConnection = require('./tcp-connection');



var optionKeys = [
    'path',
];



var SerialDataSource = DataSource.extend({

    path: null,

    constructor: function(options) {
        DataSource.call(this, options);
        
        _.extend(_.pick(options, optionKeys));
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

        return connection.connect();
    }

});



module.exports = SerialDataSource;
