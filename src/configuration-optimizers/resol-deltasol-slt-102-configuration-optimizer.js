/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';





const configurationData = require('./resol-deltasol-slt-102-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');
const _ = require('../lodash');



class ResolDeltaSolSlt102ConfigurationOptimizer extends BaseConfigurationOptimizer {

    optimizeConfiguration($) {
        this.optimizeSolarConfiguration($);
        this.optimizeSolarWfConfiguration($);
        this.optimizeAnlageWfConfiguration($);
        this.optimizeHeizungWfConfiguration($);
        this.optimizeWmzConfiguration($);
    }

    optimizeSolarConfiguration($) {
        const value = $('Solar_SystemId');

        value.isChanged(() => {
            $(/^Solar_.*/).invalidate();
            $(/^Anlage_.*/).invalidate();
            $(/^Heizung_.*/).invalidate();
        });

        const hasSecondKollektor = function(solarSystemId) {
            return (((solarSystemId / 10) & 1) !== 0);
        };

        value.lt(10, () => {
            $(/^Solar_Kol1_.*/).ignore();
            $(/^Solar_Wf1_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
        });
        value.check(hasSecondKollektor, () => {
            $(/^Solar_Kol2_.*/).ignore();
            $(/^Solar_Wf2_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
        });

        value.lt(10, () => {
            $(/^Solar_Sp1_.*/).ignore();
            $(/^Solar_Wf1_(ExtWT)_.*/).ignore();
        });
        value.lt(30, () => {
            $(/^Solar_Sp2_.*/).ignore();
            // TODO: Ladelogik
            $(/^Solar_Wf2_(ExtWT)_.*/).ignore();
        });

        value.lt(10, () => {
            $(/^Solar_Wf1_(Zieltemperatur|Bereitschaft|DrainBack)_.*/).ignore();
        });
    }

    optimizeSolarWfConfiguration($) {
        $(/^Solar_Wf([0-9]+)_Type$/).forEach((value) => {
            const prefix = '^Solar_Wf' + value.md [1] + '_';

            value.in([ 0, '#Frei' ], () => {
                $(prefix + '(?!(Type|(Roehrenkollektor|Bypass|Frostschutz|ExtWT|Zieltemperatur|Bereitschaft|DrainBack)_)).*').ignore();
            });

            const wfTypes = [
                'NhUnterdrueckung',
                'Parallelrelais',
                'Zwillingspumpe',
                'Ueberwaerme',
                'Volumenstromueberwachung',
            ];

            _.forEach(wfTypes, (wfType) => {
                value.notEql('#' + wfType, () => {
                    $(prefix + wfType + '_.*').ignore();
                });
            });
        });
    }

    optimizeAnlageWfConfiguration($) {
        $(/^(Anlage_Wf[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(() => {
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

            _.forEach(wfTypes, (wfType) => {
                value.notEql('#' + wfType, () => {
                    $(prefix + wfType + '_.*').ignore();
                });
            });
        });
    }

    optimizeHeizungWfConfiguration($) {
        $(/^(Heizung_Wf[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(() => {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            const wfTypes = [
                'ThDesinfektion',
                'ThBwErwaermung',
            ];

            _.forEach(wfTypes, (wfType) => {
                value.notEql('#' + wfType, () => {
                    $(prefix + wfType + '_.*').ignore();
                });
            });
        });
    }

    optimizeWmzConfiguration($) {
        $(/^(Wmz[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql(0, () => {
                $(prefix + '(?!Type).*').ignore();
            });
        });
    }

}


Object.assign(ResolDeltaSolSlt102ConfigurationOptimizer, {

    deviceAddress: 0x1001,

    configurationData,

});



module.exports = ResolDeltaSolSlt102ConfigurationOptimizer;
