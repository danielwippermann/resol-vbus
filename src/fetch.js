/*! resol-vbus | Copyright (c) 2013-2021, Daniel Wippermann | MIT license */
let fetch;
if ((typeof window === 'object') && (typeof window.fetch === 'function')) {
    fetch = window.fetch;  // eslint-disable-line prefer-destructuring
} else if (typeof require === 'function') {
    fetch = require('node-fetch');
} else {
    throw new Error('Unable to detect fetch implementation');
}

module.exports = fetch;
