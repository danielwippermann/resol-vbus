/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var extend = require('./extend');



var optionKeys = [
    'provider',
    'id',
    'name',
    'description',
    'isSupportingLiveData',
    'isSupportingRecordedData',
];



var DataSource = extend(null, {

    provider: null,

    id: null,

    name: null,

    description: null,

    isSupportingLiveData: false,

    isSupportingRecordedData: false,

    constructor: function(options) {
        _.extend(this, _.pick(options, optionKeys));
    },

    connectLive: function(options) {
        if (this.isSupportingLiveData) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support live data');
        }
    },

    openRecorder: function(options) {
        if (this.isSupportingRecordedData) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support recorded data');
        }
    }

});



module.exports = DataSource;
