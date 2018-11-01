/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const extend = require('./extend');
const _ = require('./lodash');



const optionKeys = [
    'provider',
    'id',
    'name',
    'description',
    'isSupportingLiveData',
    'isSupportingRecordedData',
    'isSupportingCustomization',
];



const DataSource = extend(null, {

    provider: null,

    id: null,

    name: null,

    description: null,

    isSupportingLiveData: false,

    isSupportingRecordedData: false,

    isSupportingCustomization: false,

    constructor(options) {
        _.extend(this, _.pick(options, optionKeys));
    },

    connectLive(options) {
        if (this.isSupportingLiveData) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support live data');
        }
    },

    openRecorder(options) {
        if (this.isSupportingRecordedData) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support recorded data');
        }
    },

    createCustomizer(deviceAddress, options) {
        if (this.isSupportingCustomization) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support customization');
        }
    },

});



module.exports = DataSource;
