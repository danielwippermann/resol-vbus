/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



class DataSourceProvider {

    discoverDataSources() {
        throw new Error('Must be implemented by sub-class');
    }

    createDataSource(options) {
        throw new Error('Must be implemented by sub-class');
    }

}


Object.assign(DataSourceProvider.prototype, /** @lends DataSourceProvider.prototype */ {

    id: null,

    name: null,

    description: null,

});



module.exports = DataSourceProvider;
