/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */


const configurationData = require('./resol-deltasol-mx-2xx-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');



class ResolDeltaSolMx2xxConfigurationOptimizer extends BaseConfigurationOptimizer {

    optimizeConfiguration($) {
        this.optimizeAktorConfiguration($);
        this.optimizeModuleConfiguration($);
        this.optimizeSolarConfiguration($);
        this.optimizeSolarWfConfiguration($);
        this.optimizeAnlageWfConfiguration($);
        this.optimizeHeizungWfConfiguration($);
        this.optimizeHeizungHeizkreisConfiguration($);
        this.optimizeHeizungRelaisConfiguration($);
        this.optimizeWmzConfiguration($);
        this.optimizeWsuConfiguration($);
    }

    optimizeAktorConfiguration($) {
        $(/^(Aktor[0-9]+)_Funktion$/).forEach((value) => {
            value.eql(0, () => {
                $(`^${value.md [1]}_(?!Funktion).*`).ignore();
            });
        });
    }

    optimizeModuleConfiguration($) {
        $(/^Modul([0-9]+)_Aktiviert$/).isFalse((value) => {
            $('^(Sensor|Relais)[^_]*_Modul' + value.md [1] + '_.*$').ignore();
        });
    }

    optimizeSolarConfiguration($) {
        const value = $('Solar_SystemId');

        value.isChanged(() => {
            $(/^Solar_.*/).invalidate();
            $(/^Anlage_.*/).invalidate();
            $(/^Heizung_.*/).invalidate();
        });

        const hasMinKollektorCount = function (minCount) {
            return function(solarSystemId) {
                return (((solarSystemId / 10000) % 10) >= minCount);
            };
        };
        const hasMinSpeicherCount = function (minCount) {
            return function(solarSystemId) {
                return (((solarSystemId / 100) % 10) >= minCount);
            };
        };

        value.check(hasMinKollektorCount(1), () => {
            $(/^Solar_Kol1_.*/).ignore();
            $(/^Solar_Wf1_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
        });
        value.check(hasMinKollektorCount(2), () => {
            $(/^Solar_Kol2_.*/).ignore();
            $(/^Solar_Wf2_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
        });
        value.check(hasMinKollektorCount(3), () => {
            $(/^Solar_Kol3_.*/).ignore();
            $(/^Solar_Wf3_(Roehrenkollektor|Bypass|Frostschutz)_.*/).ignore();
        });

        value.check(hasMinSpeicherCount(1), () => {
            $(/^Solar_Sp1_.*/).ignore();
            $(/^Solar_Wf1_(ExtWT)_.*/).ignore();
            $(/^Solar_Wf1_(Zieltemperatur|Bereitschaft|DrainBack)_.*/).ignore();
        });
        value.check(hasMinSpeicherCount(2), () => {
            $(/^Solar_Sp2_.*/).ignore();
            // TODO: Ladelogik
            $(/^Solar_Wf2_(ExtWT)_.*/).ignore();
        });
        value.check(hasMinSpeicherCount(3), () => {
            $(/^Solar_Sp3_.*/).ignore();
            $(/^Solar_Wf3_(ExtWT)_.*/).ignore();
        });
        value.check(hasMinSpeicherCount(4), () => {
            $(/^Solar_Sp4_.*/).ignore();
            $(/^Solar_Wf4_(ExtWT)_.*/).ignore();
        });
        value.check(hasMinSpeicherCount(5), () => {
            $(/^Solar_Sp5_.*/).ignore();
            $(/^Solar_Wf5_(ExtWT)_.*/).ignore();
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

            for (const wfType of wfTypes) {
                value.notEql('#' + wfType, () => {
                    $(prefix + wfType + '_.*').ignore();
                });
            }
        });
    }

    optimizeAnlageWfConfiguration($) {
        $(/^(Anlage_Wf[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            // $(prefix + 'OSchaltuhr').isFalse(() => {
            //     $(prefix + 'Schaltuhr_.*').ignore();
            // });

            const wfTypes = [
                'Parallelrelais',
                'Mischer',
                'Boilerladung',
                'Waermeaustausch',
                'Feststoffkessel',
                // 'Zirkulation',
                'Ruecklaufanhebung',
                'Funktionsblock',
                'Strahlungsschalter',
            ];

            for (const wfType of wfTypes) {
                value.notEql('#' + wfType, () => {
                    $(prefix + wfType + '_.*').ignore();
                });
            }
        });
    }

    optimizeHeizungWfConfiguration($) {
        $(/^(Heizung_Wf[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            // $(prefix + 'OSchaltuhr').isFalse(() => {
            //     $(prefix + 'Schaltuhr_.*').ignore();
            // });

            const wfTypes = [
                'ThDesinfektion',
                'ThBwErwaermung',
            ];

            for (const wfType of wfTypes) {
                value.notEql('#' + wfType, () => {
                    $(prefix + wfType + '_.*').ignore();
                });
            }
        });
    }

    optimizeHeizungHeizkreisConfiguration($) {
        $(/^(Heizung_Heizkreis[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            // $(prefix + 'OSchaltuhr').isFalse(() => {
            //     $(prefix + 'Schaltuhr_.*').ignore();
            // });

            $(prefix + '(Raumthermostat[0-9]+)_Typ$').forEach((value) => {
                const rthPrefix = prefix + value.md [1] + '_';

                value.eql(0, () => {
                    $(rthPrefix + '(?!Typ).*').ignore();
                });

                $(rthPrefix + 'OSchaltuhr').isFalse(() => {
                    $(rthPrefix + 'Schaltuhr_.*').ignore();
                });
            });
        });
    }

    optimizeHeizungRelaisConfiguration($) {
        $(/^(Heizung_Relais(Anforderung|Pumpe|Ventil)[0-9]+)_Type$/).forEach((value) => {
            const prefix = `^${value.md [1]}_`;

            value.eql(0, () => {
                $(prefix + '(?!Type).*').ignore();
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

    optimizeWsuConfiguration($) {
        $(/^(Wsu[0-9]+)_Belegt$/).forEach((value) => {
            const prefix = `^${value.md [1]}_`;
            value.eql(0, () => {
                $(prefix + '(?!Belegt).*').ignore();
            });
        });
    }

    static async matchOptimizer(options) {
        let match;

        if (options.deviceAddress !== 0x7E11) {
            match = 0;
        } else if (options.deviceMajorVersion !== 2) {
            match = 0.5;
        } else {
            match = 1;
        }

        return {
            match,
            Optimizer: this,
            options: null,
        };

    }
}


Object.assign(ResolDeltaSolMx2xxConfigurationOptimizer, /** @lends ResolDeltaSolMx2xxConfigurationOptimizer */ {

    deviceAddress: 0x7E11,

    deviceMajorVersion: 2,

    configurationData,

});



module.exports = ResolDeltaSolMx2xxConfigurationOptimizer;
