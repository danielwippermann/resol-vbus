/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';





const configurationData = require('./resol-deltatherm-hc-xxx-data');

const BaseConfigurationOptimizer = require('../base-configuration-optimizer');
const _ = require('../lodash');



const ResolDeltaThermHcXxxConfigurationOptimizer = BaseConfigurationOptimizer.extend({

    optimizeConfiguration($) {
        this.optimizeModuleConfiguration($);
        // TODO?
        this.optimizeAnlageWfConfiguration($);
        this.optimizeHeizungWfConfiguration($);
        this.optimizeHeizungHeizkreisConfiguration($);
        this.optimizeWmzConfiguration($);
    },

    optimizeModuleConfiguration($) {
        $(/^Modul([0-9]+)_Aktiviert$/).isFalse((value) => {
            $('^(Sensor|Relais)[^_]*_Modul' + value.md [1] + '_.*$').ignore();
        });
    },

    optimizeAnlageWfConfiguration($) {
        $(/^(Anlage_Wf[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(() => {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            const wfTypes = _.keys(value.values [0].valueTextById);

            _.forEach(wfTypes, (wfType) => {
                if ((wfType !== 'Frei') && (wfType !== 'Fehlerrelais')) {
                    value.notEql('#' + wfType, () => {
                        $(prefix + wfType + '_.*').ignore();
                    });
                }
            });
        });
    },

    optimizeHeizungWfConfiguration($) {
        $(/^(Heizung_Wf[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(() => {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            const wfTypes = _.keys(value.values [0].valueTextById);

            _.forEach(wfTypes, (wfType) => {
                if (wfType !== 'Frei') {
                    value.notEql('#' + wfType, () => {
                        $(prefix + wfType + '_.*').ignore();
                    });
                }
            });
        });
    },

    optimizeHeizungHeizkreisConfiguration($) {
        $(/^(Heizung_Heizkreis[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql('#Frei', () => {
                $(prefix + '(?!Type).*').ignore();
            });

            $(prefix + 'OSchaltuhr').isFalse(() => {
                $(prefix + 'Schaltuhr_.*').ignore();
            });

            $(prefix + '(Raumthermostat[0-9]+)_Option$').forEach((value) => {
                const rthPrefix = prefix + value.md [1] + '_';

                value.eql(0, () => {
                    $(rthPrefix + '(?!Option).*').ignore();
                });

                $(rthPrefix + 'OSchaltuhr').isFalse(() => {
                    $(rthPrefix + 'Schaltuhr_.*').ignore();
                });
            });
        });
    },

    optimizeWmzConfiguration($) {
        $(/^(Wmz[0-9]+)_Type$/).forEach((value) => {
            const prefix = '^' + value.md [1] + '_';

            value.eql(0, () => {
                $(prefix + '(?!Type).*').ignore();
            });
        });
    },

}, {

    deviceAddress: 0x5400,

    configurationData,

});



module.exports = ResolDeltaThermHcXxxConfigurationOptimizer;
