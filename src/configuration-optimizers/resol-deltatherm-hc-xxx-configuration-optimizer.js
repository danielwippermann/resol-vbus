/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';





var configurationData = require('./resol-deltatherm-hc-xxx-data');

var BaseConfigurationOptimizer = require('../base-configuration-optimizer');
var _ = require('../lodash');



var ResolDeltaThermHcXxxConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        this.optimizeModuleConfiguration($);
        // TODO?
        this.optimizeAnlageWfConfiguration($);
        this.optimizeHeizungWfConfiguration($);
        this.optimizeHeizungHeizkreisConfiguration($);
        this.optimizeWmzConfiguration($);
    },

    optimizeModuleConfiguration: function($) {
        $(/^Modul([0-9]+)_Aktiviert$/).isFalse(function(value) {
            $('^(Sensor|Relais)[^_]*_Modul' + value.md [1] + '_.*$').ignore();
        });
    },

    optimizeAnlageWfConfiguration: function($) {
        $(/^(Anlage_Wf[0-9]+)_Type$/).forEach(function(value) {
            var prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', function() {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(function() {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            var wfTypes = _.keys(value.values [0].valueTextById);

            _.forEach(wfTypes, function(wfType) {
                if ((wfType !== 'Frei') && (wfType !== 'Fehlerrelais')) {
                    value.notEql('#' + wfType, function() {
                        $(prefix + wfType + '_.*').ignore();
                    });
                }
            });
        });
    },

    optimizeHeizungWfConfiguration: function($) {
        $(/^(Heizung_Wf[0-9]+)_Type$/).forEach(function(value) {
            var prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', function() {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(function() {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            var wfTypes = _.keys(value.values [0].valueTextById);

            _.forEach(wfTypes, function(wfType) {
                if (wfType !== 'Frei') {
                    value.notEql('#' + wfType, function() {
                        $(prefix + wfType + '_.*').ignore();
                    });
                }
            });
        });
    },

    optimizeHeizungHeizkreisConfiguration: function($) {
        $(/^(Heizung_Heizkreis[0-9]+)_Type$/).forEach(function(value) {
            var prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', function() {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(function() {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            $(prefix + '(Raumthermostat[0-9]+)_Option$').forEach(function(value) {
                var rthPrefix = prefix + value.md [1] + '_';

                value.eql(0, function() {
                    $(rthPrefix + '(?!Option).*').ignore();
                });

                $(rthPrefix + 'OSchaltuhr').isFalse(function() {
                    $(rthPrefix + 'Schaltuhr_.*').ignore();
                });
            });
        });
    },

    optimizeWmzConfiguration: function($) {
        $(/^(Wmz[0-9]+)_Type$/).forEach(function(value) {
            var prefix = '^' + value.md [1] + '_';

            value.eql(0, function() {
                $(prefix + '(?!Type).*').ignore();
            });
        });
    },

}, {

    deviceAddress: 0x5400,

    configurationData: configurationData,

});



module.exports = ResolDeltaThermHcXxxConfigurationOptimizer;
