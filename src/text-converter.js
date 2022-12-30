/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const Specification = require('./specification');
const { applyDefaultOptions } = require('./utils');


const Converter = require('./converter');



class TextConverter extends Converter {

    /**
     * Create a new TextConverter instance given the set of options.
     * @constructs
     * @augments Converter
     *
     * @classdesc
     * The TextConverter class takes header sets, converts them into text
     * representation and then publishes that on the readable stream side
     * of itself.
     *
     * It does not support parsing text content back into header sets (the
     * writable stream side).
     */
    constructor(options) {
        super(options);

        applyDefaultOptions(this, options, /** @lends TextConverter.prototype */ {

            /**
            * Column separator, defaults to tab
            * @type {string}
            */
            columnSeparator: '\t',

            /**
            * Line separator, defaults to CR+NL
            * @type {string}
            */
            lineSeparator: '\r\n',

            /**
            * Specifies whether date and time columns should be output separately
            * @type {boolean}
            */
            separateDateAndTime: false,

            /**
            * VBus specification
            * @type {Specification}
            */
            specification: null,

            /**
            * Date to string formatting for the first column. Can either be a
            * string to use in `moment(...).format()` or a function that returns
            * the formatted date string.
            * @type {string|function}
            */
            dateFormat: 'L',

            /**
            * Time to string formatting for the first column. Can either be a
            * string to use in `moment(...).format()` or a function that returns
            * the formatted time string.
            * @type {string|function}
            */
            timeFormat: 'HH:mm:ss',

        });

        if (!this.specification) {
            this.specification = new Specification({
                language: (options && options.language) || 'en'
            });
        }
    }

    /**
     * Resets the converter, resulting in a ne pair of header lines
     * generated on next header set conversion.
     */
    reset() {
        this.lastIdList = null;
    }

    /**
     * Converts a header set into text representation.
     *
     * @param {HeaderSet} headerSet
     */
    convertHeaderSet(headerSet) {
        const _this = this;

        const spec = this.specification;

        const { i18n } = spec;

        const headers = headerSet.getSortedHeaders();

        const packetFields = spec.getPacketFieldsForHeaders(headers);

        const now = i18n.moment(headerSet.timestamp);

        const idList = packetFields.map(pf => pf.id).join(',');

        let content = '', columns;

        const appendDateAndTimeColumns = function(date, time, join) {
            columns = [];
            if (_this.separateDateAndTime) {
                columns.push(date);
                columns.push(time);
            } else {
                columns.push(date + join + time);
            }
        };

        const appendColumnsToContent = function() {
            content += columns.join(_this.columnSeparator) + _this.lineSeparator;
        };

        let needHeaderLines = false;
        if (this.lastIdList !== idList) {
            this.lastIdList = idList;
            needHeaderLines = true;
        }

        if (needHeaderLines) {
            // packet spec header line
            let lastPacketSpec = null;

            appendDateAndTimeColumns('', '', '');

            for (const packetField of packetFields) {
                let packetDesc;
                if (lastPacketSpec !== packetField.packetSpec) {
                    lastPacketSpec = packetField.packetSpec;

                    if (packetField.packetSpec) {
                        packetDesc = packetField.packetSpec.fullName || '';
                    } else {
                        packetDesc = '';
                    }
                } else {
                    packetDesc = '';
                }
                columns.push(packetDesc);
            }

            appendColumnsToContent();

            // packet field spec header line
            appendDateAndTimeColumns(i18n.t('textConverter.date'), i18n.t('textConverter.time'), ' / ');

            for (const packetField of packetFields) {
                let columnDesc = packetField.name;
                if (packetField.packetFieldSpec) {
                    const { type } = packetField.packetFieldSpec;
                    if (type && type.unit && type.unit.unitText) {
                        columnDesc += ' [' + type.unit.unitText + ']';
                    }
                } else {
                    columnDesc = '';
                }
                columns.push(columnDesc);
            }

            appendColumnsToContent();
        }

        // value line
        const dateString = this.formatDateAndTime(now, this.dateFormat);
        const timeString = this.formatDateAndTime(now, this.timeFormat);
        appendDateAndTimeColumns(dateString, timeString, ' ');

        for (const packetField of packetFields) {
            const textValue = packetField.formatTextValue('None');
            columns.push(textValue);
        }

        appendColumnsToContent();

        return this.push(content);
    }

    /**
     * Format a `Date` object into a string.
     *
     * @param {Moment} now The Moment.js timestamp to format.
     * @param {string|function} format Date formatter. Can either be a
     * string to use in `moment(...).format()` or a function that returns
     * the formatted date/time string.
     * @returns {string} The formatted date/time as a string.
     */
    formatDateAndTime(now, format) {
        if (typeof format === 'string') {
            return now.format(format);
        } else if (typeof format === 'function') {
            return format(now);
        } else {
            throw new Error('Unsupported format specifier');
        }
    }

    _read() {
        // nop
    }

}


Object.assign(TextConverter.prototype, /** @lends TextConverter.prototype */ {

    /**
     * Column separator, defaults to tab
     * @type {string}
     */
    columnSeparator: '\t',

    /**
     * Line separator, defaults to CR+NL
     * @type {string}
     */
    lineSeparator: '\r\n',

    /**
     * Specifies whether date and time columns should be output separately
     * @type {boolean}
     */
    separateDateAndTime: false,

    /**
     * VBus specification
     * @type {Specification}
     */
    specification: null,

    /**
     * Date to string formatting for the first column. Can either be a
     * string to use in `moment(...).format()` or a function that returns
     * the formatted date string.
     * @type {string|function}
     */
    dateFormat: 'L',

    /**
     * Time to string formatting for the first column. Can either be a
     * string to use in `moment(...).format()` or a function that returns
     * the formatted time string.
     * @type {string|function}
     */
    timeFormat: 'HH:mm:ss',

    /**
     * List of packet IDs converted last time, enables decision whether a
     * new header line pair must be output.
     * @type {string}
     */
    lastIdList: null,

});



module.exports = TextConverter;
