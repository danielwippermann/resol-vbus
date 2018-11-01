/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const extend = require('./extend');



const DataSourceProvider = extend(null, {

    id: null,

    name: null,

    description: null,

    discoverDataSources() {
        throw new Error('Must be implemented by sub-class');
    },

    createDataSource(options) {
        throw new Error('Must be implemented by sub-class');
    }

});



module.exports = DataSourceProvider;
