/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var extend = require('./extend');
var _ = require('./lodash');



var optionKeys = [
    'provider',
    'id',
    'name',
    'description',
    'isSupportingLiveData',
    'isSupportingRecordedData',
    'isSupportingCustomization',
];



var DataSource = extend(null, {

    provider: null,

    id: null,

    name: null,

    description: null,

    isSupportingLiveData: false,

    isSupportingRecordedData: false,

    isSupportingCustomization: false,

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
    },

    createCustomizer: function(deviceAddress, options) {
        if (this.isSupportingCustomization) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support customization');
        }
    },

});



module.exports = DataSource;
