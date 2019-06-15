/*! resol-vbus | Copyright (c) 2013-2019, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');



let useDevelopmentSource;
try {
    fs.accessSync('src/index.js');
    useDevelopmentSource = true;
} catch (ex) {
    useDevelopmentSource = false;
}

let vbus;
if (useDevelopmentSource) {
    vbus = require('./src/index.js');
} else {
    vbus = require('./dist/index.js');
}



module.exports = vbus;
