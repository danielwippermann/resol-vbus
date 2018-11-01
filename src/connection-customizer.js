/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Customizer = require('./customizer');
const _ = require('./lodash');
const Q = require('./q');



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
    constructor: function(options) {
        Customizer.apply(this, arguments);

        _.extend(this, _.pick(options, optionKeys));
    },

    /**
     * Load a set of configuration values from a device.
     *
     * See {@link Customizer#loadConfiguration} for details.
     */
    _loadConfiguration: function(configuration, options) {
        const _this = this;

        options = _.defaults({}, options, {
            action: 'get',
        });

        return Q.fcall(function() {
            const callback = function(config, round) {
                if (options.optimize) {
                    return _this._optimizeLoadConfiguration(config);
                } else {
                    if (round === 1) {
                        _.forEach(configuration, function(value) {
                            value.pending = true;
                        });

                        return configuration;
                    } else {
                        return config;
                    }
                }
            };

            return _this.transceiveConfiguration(options, callback);
        });
    },

    /**
     * Save a set of configuration values to a device.
     *
     * See {@link Customizer#saveConfiguration} for details.
     */
    _saveConfiguration: function(newConfiguration, oldConfigurstion, options) {
        const _this = this;

        options = _.defaults({}, options, {
            action: 'set',
            actionOptions: {
                save: true,
            },
        });

        return Q.fcall(function() {
            const callback = function(config, round) {
                if (options.optimize) {
                    if (round === 1) {
                        return _this._optimizeSaveConfiguration(newConfiguration, oldConfigurstion);
                    } else {
                        return _this._optimizeSaveConfiguration(newConfiguration, config);
                    }
                } else {
                    if (round === 1) {
                        _.forEach(newConfiguration, function(value) {
                            value.pending = true;
                        });

                        return newConfiguration;
                    } else {
                        return config;
                    }
                }
            };

            return _this.transceiveConfiguration(options, callback);
        });
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
    transceiveConfiguration: function(options, callback) {
        const _this = this;

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

        return new Promise(function(resolve, reject) {
            function notify(progress) {
                if (options.reportProgress) {
                    options.reportProgress(progress);
                }
            }

            async function checkCanceled() {
                if (options.checkCanceled) {
                    if (await options.checkCanceled()) {
                        reject(new Error('Canceled'));
                    }
                }
            }

            const check = function(result) {
                return Q.fcall(function() {
                    return checkCanceled();
                }).then(function() {
                    return connection.createConnectedPromise();
                }).then(function() {
                    return result;
                });
            };

            let config = null;

            const state = {
                masterAddress: null,
                masterLastContacted: null,
            };

            let round = 0;

            const reportProgress = function(progress) {
                if (_.isString(progress)) {
                    progress = {
                        message: progress,
                    };
                }

                _.extend(progress, {
                    round: round,
                });

                notify(progress);
            };

            const nextRound = function() {
                if (round < options.maxRounds) {
                    round++;

                    Q.fcall(check).then(function() {
                        reportProgress('OPTIMIZING_VALUES');

                        return callback(config, round);
                    }).then(check).then(function(newConfig) {
                        config = newConfig;

                        const pendingValues = _.filter(config, function(value) {
                            return value.pending;
                        });

                        let index = 0;

                        const nextValue = function() {
                            if (index < pendingValues.length) {
                                const valueInfo = pendingValues [index++];

                                let reportProgress;
                                if (options.reportProgress) {
                                    reportProgress = function(progress) {
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

                                Q.fcall(check).then(function() {
                                    return _this.transceiveValue(valueInfo, valueInfo.value, {
                                        triesPerValue: options.triesPerValue,
                                        timeoutPerValue: options.timeoutPerValue,
                                        action: options.action,
                                        actionOptions: options.actionOptions,
                                        reportProgress,
                                    }, state);
                                }).then(function(datagram) {
                                    valueInfo.pending = false;
                                    valueInfo.transceived = !!datagram;

                                    if (datagram) {
                                        valueInfo.value = datagram.value;
                                    }

                                    nextValue();
                                }, reject);
                            } else {
                                nextRound(config);
                            }
                        };

                        if (pendingValues.length > 0) {
                            process.nextTick(nextValue);
                        } else {
                            Q.fcall(function() {
                                if (state.masterLastContacted !== null) {
                                    reportProgress('RELEASING_BUS');

                                    return connection.releaseBus(address);
                                }
                            }).then(function() {
                                resolve(config);
                            }, reject);
                        }
                    }).then(null, reject);
                } else {
                    resolve(null);
                }
            };

            process.nextTick(nextRound);
        });
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
    transceiveValue: function(valueInfo, value, options, state) {
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

        return new Promise(function(resolve, reject) {
            function notify(progress) {
                if (options.reportProgress) {
                    options.reportProgress(progress);
                }
            }

            async function checkCanceled() {
                if (options.checkCanceled) {
                    if (await options.checkCanceled()) {
                        reject(new Error('Canceled'));
                    }
                }
            }

            let timer, onConnectionState;

            const done = function(err, result) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                if (onConnectionState) {
                    connection.removeListener('connectionState', onConnectionState);
                }

                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };

            const check = function(result) {
                return Q.fcall(function() {
                    return checkCanceled();
                }).then(function() {
                    return connection.createConnectedPromise();
                }).then(function() {
                    return result;
                });
            };

            let tries = 0;

            const reportProgress = function(message) {
                notify({
                    message: message,
                    tries: tries,
                    valueIndex: valueInfo.valueIndex,
                    valueInfo: valueInfo,
                });
            };

            const nextTry = function() {
                if (tries < options.triesPerValue) {
                    tries++;

                    Q.fcall(check).then(function() {
                        if ((tries > 1) && (state.masterLastContacted !== null)) {
                            reportProgress('RELEASING_BUS');

                            state.masterLastContacted = null;

                            return connection.releaseBus(state.masterAddress);
                        }
                    }).then(check).then(function() {
                        if ((state.masterLastContacted === null) && (options.masterTimeout !== null)) {
                            reportProgress('WAITING_FOR_FREE_BUS');

                            return connection.waitForFreeBus().then(function(datagram) { // TODO: optional timeout?
                                if (datagram) {
                                    state.masterAddress = datagram.sourceAddress;
                                } else {
                                    state.masterAddress = null;
                                }
                            });
                        }
                    }).then(check).then(function() {
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

                            return connection.getValueById(state.masterAddress, 0, {
                                timeout: 500,
                                tries: 1,
                            });
                        }
                    }).then(check).then(function() {
                        if (state.masterAddress === address) {
                            state.masterLastContacted = Date.now();
                        }

                        if (_.isNumber(valueInfo.valueIndex)) {
                            // nop
                        } else if (_.isNumber(valueInfo.valueIdHash)) {
                            reportProgress('LOOKING_UP_VALUE');

                            return Q.fcall(function() {
                                return connection.getValueIdByIdHash(address, valueInfo.valueIdHash, options.actionOptions);
                            }).then(function(datagram) {
                                if (datagram && datagram.valueId) {
                                    valueInfo.valueIndex = datagram.valueId;
                                }
                            });
                        }
                    }).then(check).then(function() {
                        if (state.masterAddress === address) {
                            state.masterLastContacted = Date.now();
                        }

                        if (!_.isNumber(valueInfo.valueIndex)) {
                            return null;
                        } else if (options.action === 'get') {
                            reportProgress('GETTING_VALUE');

                            return connection.getValueById(address, valueInfo.valueIndex, options.actionOptions);
                        } else if (options.action === 'set') {
                            reportProgress('SETTING_VALUE');

                            return connection.setValueById(address, valueInfo.valueIndex, value, options.actionOptions);
                        } else {
                            throw new Error('Unknown action "' + options.action + '"');
                        }
                    }).then(function(datagram) {
                        if (datagram) {
                            done(null, datagram);
                        } else {
                            return nextTry();
                        }
                    }).then(null, done);
                } else {
                    done(null, null);
                }
            };

            const onTimeout = function() {
                done(null, null);
            };

            process.nextTick(nextTry);
            timer = setTimeout(onTimeout, options.timeoutPerValue);
        });
    }
});



module.exports = ConnectionCustomizer;
