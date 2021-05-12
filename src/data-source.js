/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



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



class DataSource {

    constructor(options) {
        _.extend(this, _.pick(options, optionKeys));
    }

    connectLive(options) {
        if (this.isSupportingLiveData) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support live data');
        }
    }

    openRecorder(options) {
        if (this.isSupportingRecordedData) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support recorded data');
        }
    }

    createCustomizer(deviceAddress, options) {
        if (this.isSupportingCustomization) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support customization');
        }
    }

}


Object.assign(DataSource.prototype, /** @lends DataSource.prototype */ {

    provider: null,

    id: null,

    name: null,

    description: null,

    isSupportingLiveData: false,

    isSupportingRecordedData: false,

    isSupportingCustomization: false,

});



module.exports = DataSource;
