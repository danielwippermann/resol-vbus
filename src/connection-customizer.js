/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Customizer = require('./customizer');
const _ = require('./lodash');


const optionKeys = [
    'connection',
    'maxRounds',
    'triesPerValue',
    'timeoutPerValue',
    'masterTimeout',
];



const ConnectionCustomizer = Customizer.extend(/** @lends ConnectionCustomizer# */ {

    /**
     * The connection to use for transfer of the configuration values.
     * @type {Connection}
     */
    connection: null,

    /**
     * Maximum number of optimization rounds for {@link transceiveConfiguration}.
     * @type {number}
     * @default 10
     */
    maxRounds: 10,

    /**
     * Amount of retries to transceive one value.
     * Between two tries the VBus is released and then re-acquired.
     * @type {number}
     * @default 2
     */
    triesPerValue: 2,

    /**
     * Timeout in milliseconds after which the transceive times out.
     * @type {number}
     * @default 30000
     */
    timeoutPerValue: 30000,

    /**
     * Interval in milliseconds in which
     * the VBus master is contacted to reissue the VBus clearance.
     * @type {number}
     * @default 8000
     */
    masterTimeout: 8000,

    /**
     * Constructs a new ConnectionCustomizer instance and optionally initializes its
     * members with the given values.
     *
     * @constructs
     * @augments Customizer
     * @param {object} [options] Initialization values for this instance's members
     * @param {number} [options.connection] {@link ConnectionCustomizer#connection}
     * @param {number} [options.maxRounds] {@link ConnectionCustomizer#maxRounds}
     * @param {number} [options.triesPerValue] {@link ConnectionCustomizer#triesPerValue}
     * @param {number} [options.timeoutPerValue] {@link ConnectionCustomizer#timeoutPerValue}
     * @param {number} [options.masterTimeout] {@link ConnectionCustomizer#masterTimeout}
     *
     * @classdesc
     * A ConnectionCustomizer uses an established connection to a device
     * to transfer sets of configuration values over it.
     */
    constructor(options) {
        Customizer.apply(this, arguments);

        _.extend(this, _.pick(options, optionKeys));
    },

    /**
     * Load a set of configuration values from a device.
     *
     * See {@link Customizer#loadConfiguration} for details.
     */
    async _loadConfiguration(configuration, options) {
        options = _.defaults({}, options, {
            action: 'get',
        });

        const callback = (config, round) => {
            if (options.optimize) {
                return this._optimizeLoadConfiguration(config);
            } else {
                if (round === 1) {
                    _.forEach(configuration, (value) => {
                        value.pending = true;
                    });

                    return configuration;
                } else {
                    return config;
                }
            }
        };

        return this.transceiveConfiguration(options, callback);
    },

    /**
     * Save a set of configuration values to a device.
     *
     * See {@link Customizer#saveConfiguration} for details.
     */
    async _saveConfiguration(newConfiguration, oldConfigurstion, options) {
        options = _.defaults({}, options, {
            action: 'set',
            actionOptions: {
                save: true,
            },
        });

        const callback = (config, round) => {
            if (options.optimize) {
                if (round === 1) {
                    return this._optimizeSaveConfiguration(newConfiguration, oldConfigurstion);
                } else {
                    return this._optimizeSaveConfiguration(newConfiguration, config);
                }
            } else {
                if (round === 1) {
                    _.forEach(newConfiguration, (value) => {
                        value.pending = true;
                    });

                    return newConfiguration;
                } else {
                    return config;
                }
            }
        };

        return this.transceiveConfiguration(options, callback);
    },

    /**
     * Transceives a controller configuration set, handling timeouts, retries etc.
     *
     * @param {object} options Options
     * @param {number} [options.maxRounds] {@link ConnectionCustomizer#maxRounds}
     * @param {number} [options.triesPerValue] {@link ConnectionCustomizer#triesPerValue}
     * @param {number} [options.timeoutPerValue] {@link ConnectionCustomizer#timeoutPerValue}
     * @param {number} [options.masterTimeout] {@link ConnectionCustomizer#masterTimeout}
     * @param {number} options.action Action to perform, can be `'get'` or `'set'`.
     * @param {number} [options.actionOptions] Options object to forward to the action to perform.
     * @return {object} Promise that resolves to the configuration or `null` on timeout.
     */
    async transceiveConfiguration(options, callback) {
        if (_.isFunction(options)) {
            callback = options;
            options = null;
        }

        options = _.defaults({}, options, {
            maxRounds: this.maxRounds,
            triesPerValue: this.triesPerValue,
            timeoutPerValue: this.timeoutPerValue,
            masterTimeout: this.masterTimeout,
            action: null,
            actionOptions: null,
            reportProgress: null,
            checkCanceled: null,
        });

        const connection = this.connection;
        const address = this.deviceAddress;

        async function check() {
            if (options.checkCanceled) {
                if (await options.checkCanceled()) {
                    throw new Error('Canceled');
                }
            }

            await connection.createConnectedPromise();
        }

        let config = null;

        const state = {
            masterAddress: null,
            masterLastContacted: null,
        };

        const reportProgress = function(progress) {
            if (options.reportProgress) {
                options.reportProgress(progress);
            }
        };

        for (let round = 1; round <= options.maxRounds; round++) {
            await check();

            reportProgress({
                message: 'OPTIMIZING_VALUES',
                round,
            });

            config = await callback(config, round);

            await check();

            const pendingValues = config.filter((value) => {
                return value.pending;
            });

            if (pendingValues.length > 0) {
                for (let index = 0; index < pendingValues.length; index++) {
                    const valueInfo = pendingValues [index++];

                    let reportProgress;
                    if (options.reportProgress) {
                        reportProgress = (progress) => {
                            progress = _.extend({}, progress, {
                                valueId: valueInfo.valueId,
                                valueIndex: valueInfo.valueIndex,
                                valueIdHash: valueInfo.valueIdHash,
                                valueNr: index,
                                valueCount: pendingValues.length,
                            });

                            return options.reportProgress(progress);
                        };
                    }

                    await check();

                    const datagram = await this.transceiveValue(valueInfo, valueInfo.value, {
                        triesPerValue: options.triesPerValue,
                        timeoutPerValue: options.timeoutPerValue,
                        action: options.action,
                        actionOptions: options.actionOptions,
                        reportProgress,
                    }, state);

                    valueInfo.pending = false;
                    valueInfo.transceived = !!datagram;

                    if (datagram) {
                        valueInfo.value = datagram.value;
                    }
                }
            } else {
                break;
            }
        }

        if (state.masterLastContacted !== null) {
            reportProgress({
                message: 'RELEASING_BUS',
            });

            await connection.releaseBus(address);
        }

        return config;
    },

    /**
     * Transceive a controller value over this connection, handling
     * timeouts, retries etc.
     *
     * @param {object|number} valueInfoOrIndex Value info object or value index
     * @param {number} valueInfo.valueIndex Value index
     * @param {number} valueInfo.valueIdHash Value ID hash
     * @param {number} value Value
     * @param {object} options Options
     * @param {number} options.triesPerValue {@link ConnectionCustomizer#triesPerValue}
     * @param {number} options.timeoutPerValue {@link ConnectionCustomizer#timeoutPerValue}
     * @param {number} options.masterTimeout {@link ConnectionCustomizer#masterTimeout}
     * @param {object} state State to share between multiple calls to this method.
     * @returns {object} Promise that resolves with the datagram received or `null` on timeout.
     */
    async transceiveValue(valueInfo, value, options, state) {
        const doWork = async (resolve, reject) => {
            let timer;

            const done = function(err, result) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };

            if (!_.isObject(valueInfo)) {
                valueInfo = {
                    valueIndex: valueInfo,
                };
            }

            if (state === undefined) {
                state = {};
            }

            options = _.defaults({}, options, {
                triesPerValue: this.triesPerValue,
                timeoutPerValue: this.timeoutPerValue,
                masterTimeout: this.masterTimeout,
                action: null,
                actionOptions: null,
                reportProgress: null,
                checkCanceled: null,
            });

            state = _.defaults(state, {
                masterAddress: this.deviceAddress,
                masterLastContacted: Date.now(),
            });

            const connection = this.connection;
            const address = this.deviceAddress;

            async function check() {
                if (options.checkCanceled) {
                    if (await options.checkCanceled()) {
                        reject(new Error('Canceled'));
                    }
                }

                await connection.createConnectedPromise();
            }

            const onTimeout = function() {
                done(null, null);
            };

            timer = setTimeout(onTimeout, options.timeoutPerValue);

            let result;
            for (let tries = 1; tries <= options.triesPerValue; tries++) {
                const reportProgress = function(message) {
                    if (options.reportProgress) {
                        options.reportProgress({
                            message,
                            tries,
                            valueIndex: valueInfo.valueIndex,
                            valueInfo,
                        });
                    }
                };

                await check();

                if ((tries > 1) && (state.masterLastContacted !== null)) {
                    reportProgress('RELEASING_BUS');

                    state.masterLastContacted = null;

                    await connection.releaseBus(state.masterAddress);
                }

                await check();

                if ((state.masterLastContacted === null) && (options.masterTimeout !== null)) {
                    reportProgress('WAITING_FOR_FREE_BUS');

                    const datagram = await connection.waitForFreeBus();  // TODO: optional timeout?

                    if (datagram) {
                        state.masterAddress = datagram.sourceAddress;
                    } else {
                        state.masterAddress = null;
                    }
                }

                await check();

                let contactMaster;
                if (state.masterAddress === null) {
                    contactMaster = false;
                } else if (state.masterAddress === address) {
                    contactMaster = false;
                } else if (state.masterLastContacted === null) {
                    contactMaster = true;
                } else if ((Date.now() - state.masterLastContacted) >= options.masterTimeout) {
                    contactMaster = true;
                } else {
                    contactMaster = false;
                }
                if (contactMaster) {
                    reportProgress('CONTACTING_MASTER');

                    state.masterLastContacted = Date.now();

                    await connection.getValueById(state.masterAddress, 0, {
                        timeout: 500,
                        tries: 1,
                    });
                }

                await check();

                if (state.masterAddress === address) {
                    state.masterLastContacted = Date.now();
                }

                if (_.isNumber(valueInfo.valueIndex)) {
                    // nop
                } else if (_.isNumber(valueInfo.valueIdHash)) {
                    reportProgress('LOOKING_UP_VALUE');

                    const datagram = await connection.getValueIdByIdHash(address, valueInfo.valueIdHash, options.actionOptions);

                    if (datagram && datagram.valueId) {
                        valueInfo.valueIndex = datagram.valueId;
                    }
                }

                await check();

                if (state.masterAddress === address) {
                    state.masterLastContacted = Date.now();
                }

                if (!_.isNumber(valueInfo.valueIndex)) {
                    result = null;
                } else if (options.action === 'get') {
                    reportProgress('GETTING_VALUE');

                    result = await connection.getValueById(address, valueInfo.valueIndex, options.actionOptions);
                } else if (options.action === 'set') {
                    reportProgress('SETTING_VALUE');

                    result = await connection.setValueById(address, valueInfo.valueIndex, value, options.actionOptions);
                } else {
                    throw new Error('Unknown action "' + options.action + '"');
                }

                if (result) {
                    break;
                }
            }

            return result;
        };

        return new Promise((resolve, reject) => {
            doWork(resolve, reject).then(resolve, reject);
        });
    }
});



module.exports = ConnectionCustomizer;
