/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var moment = require('moment-timezone');
var numeral = require('numeral');
var sprintf = require('sprintf').sprintf;


var extend = require('./extend');



var knownLanguages = {
    'de': {
        moment: 'de',
        numeral: 'de',
    },
    'en': {
        moment: 'en',
        numeral: 'en',
    },
};



var resources = {
    dev: { translation: require('./locales/dev.json') },
    de: { translation: require('./locales/de.json') },
};



numeral.language('de', require('numeral/languages/de'));



var I18N = extend(null, /** @lends I18N# */ {

    language: null,

    languageData: null,

    timezone: null,

    /**
     * Creates a new I18N instance for the given language code.
     *
     * @constructs
     * @param {string} [language='en'] Language code (ISO 639-1)
     */
    constructor: function(language) {
        var _this = this;

        if (!language || !_.has(knownLanguages, language)) {
            language = 'en';
        }

        this.language = language;
        this.languageData = knownLanguages [language];
    },

    /**
     * Formats a string using a `printf(3)` compatible format string and
     * variadic arguments (comparable to `sprintf(3)`) and returns it.
     *
     * @param {string} fmt Format string
     * @param {...mixed} args Arguments to format
     * @returns {string} Formatted string
     *
     * @see http://linux.die.net/man/3/sprintf
     * @see http://www.diveintojavascript.com/projects/javascript-sprintf
     *
     * @example
     * // outputs: VBus #3: DeltaSol MX
     * console.log(i18n.sprintf('VBus #%d: %s', 3, 'DeltaSol MX'));
     *
     * // outputs: DeltaSol MX
     * console.log(i18n.sprintf('%2$s', 3, 'DeltaSol MX'));
     */
    sprintf: function() {
        return sprintf.apply(null, arguments);
    },

    /**
     * Formats a string using a `printf(3)` compatible format string and
     * a arguments array (comparable to `vsprintf(3)`) and returns it.
     *
     * @param {string} fmt Format string
     * @param {Array} argv Arguments to format
     * @returns {string} Formatted string
     *
     * @example
     * // outputs: VBus #3: DeltaSol MX
     * console.log(i18n.vsprintf('VBus #%d: %s', [ 3, 'DeltaSol MX' ]));
     *
     * // outputs: DeltaSol MX
     * console.log(i18n.vsprintf('%2$s', [ 3, 'DeltaSol MX' ]));
     */
    vsprintf: function(fmt, argv) {
        var args = argv.slice(0);
        args.splice(0, 0, fmt);
        return sprintf.apply(null, args);
    },

    /**
     * Get a translation for the given key. If more than one argument is
     * given, the translation is then used as a format string for the
     * {@link I18N#sprintf} method.
     *
     * @param {string} key Key for the translation
     * @param {...mixed} args Arguments to format
     * @return {string} Formatted string
     *
     * @example
     * var i18n = new I18N('de');
     *
     * // outputs: Unbekanntes Gerät (0x%1$04X)
     * console.log(i18n.t('specification.unknownDevice'));
     *
     * // outputs: Unbekanntes Gerät (0x7E11)
     * console.log(i18n.t('specification.unknownDevice', 0x7e11));
     */
    t: function(key) {
        var parts = key.split('.');

        var languages = [ this.language, 'dev' ];

        var value;
        for (var i = 0; i < languages.length; i++) {
            value = resources [languages [i]];
            value = value && value.translation;

            var j = 0;
            while (value && (j < parts.length)) {
                value = value [parts [j]];
                j++;
            }

            if (value) {
                break;
            }
        }
        var text = value ? value : key;
        if (arguments.length > 1) {
            var args = _.toArray(arguments).slice(1);
            text = this.vsprintf(text, args);
        }
        return text;
    },

    /**
     * Wrapper for a moment.js date object that is setup to use this
     * instance's language code.
     *
     * @param {...mixed} args Arguments to be passed to `moment()` function
     * @returns {mixed} Result of calling the `moment()` function
     *
     * @see http://momentjs.com/docs/
     */
    moment: function() {
        var m = moment.apply(null, arguments).lang(this.languageData.moment);
        if (this.timezone) {
            m = m.tz(this.timezone);
        }
        return m;
    },

    /**
     * Wrapper for a numeral.js number object that is setup to use this
     * instance's language code.
     *
     * @param {...mixed} args Arguments to be passes to `numeral()` function
     * @returns {mixes} Result of calling the `numeral()` function
     *
     * @see http://numeraljs.com/
     */
    numeral: function() {
        numeral.language(this.languageData.numeral);

        return numeral.apply(null, arguments);
    },

});



module.exports = I18N;
