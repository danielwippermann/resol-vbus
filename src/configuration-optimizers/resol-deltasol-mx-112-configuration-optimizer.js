/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';





const configurationData = require('./resol-deltasol-mx-112-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');
const _ = require('../lodash');



const ResolDeltaSolMx112ConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration: function($) {
        this.optimizeModuleConfiguration($);
        this.optimizeSolarConfiguration($);
        this.optimizeSolarWfConfiguration($);
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

    optimizeSolarConfiguration: function($) {
        const value = $('Solar_SystemId');

        value.isChanged(function() {
            $(/^Solar_.*/).invalidate();
            $(/^Anlage_.*/).invalidate();
            $(/^Heizung_.*/).invalidate();
        });

        const hasSecondKollektor = function(solarSystemId) {
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
        $('^Solar_OKollektor3$').isFalse(function() {
            $(/^Solar_Kol3_.*/).ignore();
            $(/^Solar_Wf3_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
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
        value.lt(50, function() {
            $(/^Solar_Sp3_.*/).ignore();
            $(/^Solar_Wf3_(ExtWT)_.*/).ignore();
        });
        value.lt(70, function() {
            $(/^Solar_Sp4_.*/).ignore();
            $(/^Solar_Wf4_(ExtWT)_.*/).ignore();
        });
        value.lt(90, function() {
            $(/^Solar_Sp5_.*/).ignore();
            $(/^Solar_Wf5_(ExtWT)_.*/).ignore();
        });

        value.lt(10, function() {
            $(/^Solar_Wf1_(Zieltemperatur|Bereitschaft|DrainBack)_.*/).ignore();
        });
    },

    optimizeSolarWfConfiguration: function($) {
        $(/^Solar_Wf([0-9]+)_Type$/).forEach(function(value) {
            const prefix = '^Solar_Wf' + value.md [1] + '_';

            value.in([ 0, '#Frei' ], function() {
                $(prefix + '(?!(Type|(Roehrenkollektor|Bypass|Frostschutz|ExtWT|Zieltemperatur|Bereitschaft|DrainBack)_)).*').ignore();
            });

            const wfTypes = [
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
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', function() {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(function() {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            const wfTypes = [
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
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', function() {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(function() {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            const wfTypes = [
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

    optimizeHeizungHeizkreisConfiguration: function($) {
        $(/^(Heizung_Heizkreis[0-9]+)_Type$/).forEach(function(value) {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', function() {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(function() {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            $(prefix + '(Raumthermostat[0-9]+)_Typ$').forEach(function(value) {
                const rthPrefix = prefix + value.md [1] + '_';

                value.eql(0, function() {
                    $(rthPrefix + '(?!Typ).*').ignore();
                });

                $(rthPrefix + 'OSchaltuhr').isFalse(function() {
                    $(rthPrefix + 'Schaltuhr_.*').ignore();
                });
            });
        });
    },

    optimizeWmzConfiguration: function($) {
        $(/^(Wmz[0-9]+)_Type$/).forEach(function(value) {
            const prefix = '^' + value.md [1] + '_';

            value.eql(0, function() {
                $(prefix + '(?!Type).*').ignore();
            });
        });
    },

}, {

    deviceAddress: 0x7E11,

    configurationData: configurationData,

});



module.exports = ResolDeltaSolMx112ConfigurationOptimizer;
