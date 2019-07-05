/*! resol-vbus | Copyright (c) 2013-2019, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const path = require('path');



let useDevelopmentSource;
try {
    fs.accessSync(path.join(__dirname, 'src/index.js'));
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
