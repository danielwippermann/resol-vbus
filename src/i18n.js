/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var i18next = require('i18next');
var _ = require('lodash');
var moment = require('moment');
var numeral = require('numeral');
var sprintf = require('sprintf').sprintf;


var extend = require('./extend');



var knownLanguages = {
    'de': {
        i18next: 'de',
        moment: 'de',
        numeral: 'de',
    },
    'en': {
        i18next: 'en',
        moment: 'en',
        numeral: 'en',
    },
};



var resources = {
    dev: { translation: require('./locales/dev.json') },
    de: { translation: require('./locales/de.json') },
};



numeral.language('de', require('numeral/languages/de'));



var I18N = extend(null, {

    language: null,

    languageData: null,

    i18nextT: null,

    constructor: function(language) {
        var _this = this;

        if (!language || !_.has(knownLanguages, language)) {
            language = 'en';
        }

        this.language = language;
        this.languageData = knownLanguages [language];

        i18next.init({ lng: this.languageData.i18next, resStore: resources }, function(t) {
            _this.i18nextT = t;
        });
    },

    sprintf: function() {
        return sprintf.apply(null, arguments);
    },

    vsprintf: function(fmt, argv) {
        var args = argv.slice(0);
        args.splice(0, 0, fmt);
        return sprintf.apply(null, args);
    },

    t: function(key) {
        var text = this.i18nextT(key);
        if (arguments.length > 1) {
            var args = _.toArray(arguments).slice(1);
            text = this.vsprintf(text, args);
        }
        return text;
    },

    moment: function() {
        return moment.apply(null, arguments).lang(this.languageData.moment);
    },

    numeral: function() {
        numeral.language(this.languageData.numeral);

        return numeral.apply(null, arguments);
    },

});



module.exports = I18N;
