/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var moment = require('moment');
var sprintf = require('sprintf').sprintf;



var formatTextValueFromRawValueInternal = function(rawValue, unit, rootType, precision, defaultUnit) {
    var unitText = unit ? unit.unitText : defaultUnit.unitText;

    var result, textValue, format;
    if (rootType === 'Time') {
        textValue = moment(rawValue * 60000).format('LT');
        result = textValue + unitText;
    } else if (rootType === 'Weektime') {
        textValue = moment(rawValue * 60000).format('ddd,LT');
        result = textValue + unitText;
    } else if (rootType === 'Datetime') {
        textValue = moment(rawValue * 60000).format('L LT');
        result = textValue + unitText;
    } else if (precision === 0) {
        result = sprintf('%.0f%s', rawValue, unitText);
    } else if (precision === 1) {
        result = sprintf('%.1f%s', rawValue, unitText);
    } else if (precision === 2) {
        result = sprintf('%.2f%s', rawValue, unitText);
    } else if (precision === 3) {
        result = sprintf('%.3f%s', rawValue, unitText);
    } else if (precision === 4) {
        result = sprintf('%.4f%s', rawValue, unitText);
    } else {
        format = '%.' + precision + 'f%s';
        result = sprintf(format, rawValue, unitText);
    }

    return result;
};



module.exports = {
    formatTextValueFromRawValueInternal: formatTextValueFromRawValueInternal
};
