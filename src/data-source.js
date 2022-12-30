/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { applyDefaultOptions } = require('./utils');



class DataSource {

    constructor(options) {
        applyDefaultOptions(this, options, /** @lends DataSource.prototype */ {

            provider: null,

            id: null,

            name: null,

            description: null,

            isSupportingLiveData: false,

            isSupportingCustomization: false,

        });
    }

    connectLive(options) {
        if (this.isSupportingLiveData) {
            throw new Error('Must be implemented by sub-class');
        } else {
            throw new Error('Does not support live data');
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

    isSupportingCustomization: false,

});



module.exports = DataSource;
