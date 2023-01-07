/*! resol-vbus | Copyright (c) 2023-present, Daniel Wippermann | MIT license */

function calcValueIdHash(valueId) {
    let hash = 0;
    if (valueId && (valueId.length > 0)) {
        for (let i = 0, n = valueId.length; i < n; i++) {
            const cp = valueId.charCodeAt(i);
            hash = ((hash * 0x21) + cp) & 0x7FFFFFFF;
        }
    }
    return hash;
}

function hex(value, length) {
    return value.toString(16).padStart(length, '0');
}


module.exports = {
    calcValueIdHash,
    hex,
};
