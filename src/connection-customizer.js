/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var utils = require('./utils');

var Customizer = require('./customizer');



var optionKeys = [
    'connection',
    'maxRounds',
    'triesPerValue',
    'timeoutPerValue',
    'masterTimeout',
];



var ConnectionCustomizer = Customizer.extend(/** @lends ConnectionCustomizer# */ {

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

    loadConfiguration: function() {
        var _this = this;

        var options = {
            action: 'get',
        };

        var callback = function(config, round) {
            if (round === 1) {
                return _this._getInitialConfiguration(config);
            } else {
                return _this._optimizeConfiguration(config);
            }
        };

        return this.transceiveConfiguration(options, callback);
    },

    saveConfiguration: function(configuration) {
        var _this = this;

        var options = {
            action: 'set',
            actionOptions: {
                save: true,
            },
        };

        var callback = function(config, round) {
            if (round === 1) {
                return _this._getInitialConfiguration(config);
            } else {
                return _this._optimizeConfiguration(config);
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
    transceiveConfiguration: function(options, callback) {
        var _this = this;

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
        });

        var connection = this.connection;
        var address = this.deviceAddress;

        return utils.cancelablePromise(function(resolve, reject, notify, checkCanceled) {
            var config = null;

            var state = {
                masterAddress: null,
                masterLastContacted: null,
            };

            var round = 0;

            var reportProgress = function(progress) {
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

            var nextRound = function() {
                if (round < options.maxRounds) {
                    round++;

                    Q.fcall(checkCanceled).then(function() {
                        reportProgress('OPTIMIZING_VALUES');

                        return callback(config, round);
                    }).then(checkCanceled).then(function(newConfig) {
                        config = newConfig;

                        var pendingValues = _.filter(config, function(value) {
                            return value.pending;
                        });

                        var index = 0;

                        var nextValue = function() {
                            if (index < pendingValues.length) {
                                var valueInfo = pendingValues [index++];

                                Q.fcall(checkCanceled).then(function() {
                                    return _this.transceiveValue(valueInfo.valueIndex, valueInfo.value, {
                                        triesPerValue: options.triesPerValue,
                                        timeoutPerValue: options.timeoutPerValue,
                                        action: options.action,
                                        actionOptions: options.actionOptions,
                                    }, state).progress(function(progress) {
                                        reportProgress(progress);
                                    });
                                }).then(function(datagram) {
                                    valueInfo.pending = false;
                                    valueInfo.transceived = !!datagram;

                                    if (datagram) {
                                        valueInfo.value = datagram.value;
                                    }

                                    nextValue();
                                }).done();
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
                            }).done();
                        }
                    }).fail(reject).done();
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
     * @param {number} valueIndex Value index
     * @param {number} value Value
     * @param {object} options Options
     * @param {number} options.triesPerValue {@link ConnectionCustomizer#triesPerValue}
     * @param {number} options.timeoutPerValue {@link ConnectionCustomizer#timeoutPerValue}
     * @param {number} options.masterTimeout {@link ConnectionCustomizer#masterTimeout}
     * @param {object} state State to share between multiple calls to this method.
     * @returns {object} Promise that resolves with the datagram received or `null` on timeout.
     */
    transceiveValue: function(valueIndex, value, options, state) {
        if (state === undefined) {
            state = {};
        }

        options = _.defaults({}, options, {
            triesPerValue: this.triesPerValue,
            timeoutPerValue: this.timeoutPerValue,
            masterTimeout: this.masterTimeout,
            action: null,
            actionOptions: null,
        });

        state = _.defaults(state, {
            masterAddress: this.deviceAddress,
            masterLastContacted: Date.now(),
        });

        var connection = this.connection;
        var address = this.deviceAddress;

        return utils.cancelablePromise(function(resolve, reject, notify, checkCanceled) {
            var timer;

            var done = function(err, result) {
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

            var tries = 0;

            var reportProgress = function(message) {
                notify({
                    message: message,
                    tries: tries,
                });
            };

            var nextTry = function() {
                if (tries < options.triesPerValue) {
                    tries++;

                    Q.fcall(checkCanceled).then(function() {
                        if ((tries > 1) && (state.masterLastContacted !== null)) {
                            reportProgress('RELEASING_BUS');

                            state.masterLastContacted = null;

                            return connection.releaseBus(state.masterAddress);
                        }
                    }).then(checkCanceled).then(function() {
                        if (state.masterLastContacted === null) {
                            reportProgress('WAITING_FOR_FREE_BUS');

                            return connection.waitForFreeBus().then(function(datagram) { // TODO: optional timeout?
                                if (datagram) {
                                    state.masterAddress = datagram.sourceAddress;
                                } else {
                                    state.masterAddress = null;
                                }
                            });
                        }
                    }).then(checkCanceled).then(function() {
                        var contactMaster;
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
                    }).then(checkCanceled).then(function() {
                        if (state.masterAddress === address) {
                            state.masterLastContacted = Date.now();
                        }

                        if (options.action === 'get') {
                            reportProgress('GETTING_VALUE');

                            return connection.getValueById(address, valueIndex, options.actionOptions);
                        } else if (options.action === 'set') {
                            reportProgress('SETTING_VALUE');

                            return connection.setValueById(address, valueIndex, value, options.actionOptions);
                        } else {
                            throw new Error('Unknown action "' + options.action + '"');
                        }
                    }).then(function(datagram) {
                        if (datagram) {
                            done(null, datagram);
                        } else {
                            return nextTry();
                        }
                    }).fail(function(reason) {
                        done(reason);
                    }).done();
                } else {
                    done(null, null);
                }
            };

            var onTimeout = function() {
                done(null, null);
            };

            process.nextTick(nextTry);
            timer = setTimeout(onTimeout, options.timeoutPerValue);
        });
    }
});



module.exports = ConnectionCustomizer;
