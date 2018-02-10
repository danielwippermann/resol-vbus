/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var configurationData = require('./resol-deltasol-slt-102-data');

var BaseConfigurationOptimizer = require('../base-configuration-optimizer');



var ResolDeltaSolSlt102ConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        this.optimizeSolarConfiguration($);
        this.optimizeSolarWfConfiguration($);
        this.optimizeAnlageWfConfiguration($);
        this.optimizeHeizungWfConfiguration($);
        this.optimizeWmzConfiguration($);
    },

    optimizeSolarConfiguration: function($) {
        var value = $('Solar_SystemId');

        value.isChanged(function() {
            $(/^Solar_.*/).invalidate();
            $(/^Anlage_.*/).invalidate();
            $(/^Heizung_.*/).invalidate();
        });

        var hasSecondKollektor = function(solarSystemId) {
            return (((solarSystemId / 10) & 1) !== 0);
        };

        value.lt(10, function() {
            $(/^Solar_Kol1_.*/).ignore();
            $(/^Solar_Wf1_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
        });
        value.check(hasSecondKollektor, function() {
            $(/^Solar_Kol2_.*/).ignore();
            $(/^Solar_Wf2_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
        });

        value.lt(10, function() {
            $(/^Solar_Sp1_.*/).ignore();
            $(/^Solar_Wf1_(ExtWT)_.*/).ignore();
        });
        value.lt(30, function() {
            $(/^Solar_Sp2_.*/).ignore();
            // TODO: Ladelogik
            $(/^Solar_Wf2_(ExtWT)_.*/).ignore();
        });

        value.lt(10, function() {
            $(/^Solar_Wf1_(Zieltemperatur|Bereitschaft|DrainBack)_.*/).ignore();
        });
    },

    optimizeSolarWfConfiguration: function($) {
        $(/^Solar_Wf([0-9]+)_Type$/).forEach(function(value) {
            var prefix = '^Solar_Wf' + value.md [1] + '_';

            value.in([ 0, '#Frei' ], function() {
                $(prefix + '(?!(Type|(Roehrenkollektor|Bypass|Frostschutz|ExtWT|Zieltemperatur|Bereitschaft|DrainBack)_)).*').ignore();
            });

            var wfTypes = [
                'NhUnterdrueckung',
                'Parallelrelais',
                'Zwillingspumpe',
                'Ueberwaerme',
                'Volumenstromueberwachung',
            ];

            _.forEach(wfTypes, function(wfType) {
                value.notEql('#' + wfType, function() {
                    $(prefix + wfType + '_.*').ignore();
                });
            });
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

            var wfTypes = [
                'Parallelrelais',
                'Mischer',
                'Boilerladung',
                'Waermeaustausch',
                'Feststoffkessel',
                'Zirkulation',
                'Ruecklaufanhebung',
                'Funktionsblock',
                'Strahlungsschalter',
            ];

            _.forEach(wfTypes, function(wfType) {
                value.notEql('#' + wfType, function() {
                    $(prefix + wfType + '_.*').ignore();
                });
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

            var wfTypes = [
                'ThDesinfektion',
                'ThBwErwaermung',
            ];

            _.forEach(wfTypes, function(wfType) {
                value.notEql('#' + wfType, function() {
                    $(prefix + wfType + '_.*').ignore();
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

    deviceAddress: 0x1001,

    configurationData: configurationData,

});



module.exports = ResolDeltaSolSlt102ConfigurationOptimizer;
