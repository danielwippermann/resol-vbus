/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
// var util = require('util');


var express = require('express');
var kue = require('kue');
var _ = require('lodash');
var optimist = require('optimist');
var Q = require('q');


var vbus = require('../../src/index');


var config = require('../config.js');



var promise = vbus.utils.promise;



var i18n = new vbus.I18N('en');



var reportProgress = function(message) {
    var line;
    if (_.isString(message)) {
        line = message;
    } else if (message.message === 'OPTIMIZING_VALUES') {
        line = i18n.sprintf('Optimizing set of values for round %d', message.round);
    } else if (message.message === 'GETTING_VALUE') {
        line = i18n.sprintf('Getting value %d/%d, try %d: %s', message.valueNr, message.valueCount, message.tries, message.valueId);
    } else if (message.message === 'SETTING_VALUE') {
        line = i18n.sprintf('Setting value %d/%d, try %d: %s', message.valueNr, message.valueCount, message.tries, message.valueId);
    } else if (message.message === 'CONNECTION_STATE') {
        line = i18n.sprintf('Connection state changed to %s', message.connectionState);
    } else if (message.message === 'WAITING_FOR_FREE_BUS') {
        line = i18n.sprintf('Waiting for free bus');
    } else if (message.message === 'RELEASING_BUS') {
        line = i18n.sprintf('Releasing bus');
    } else {
        line = i18n.sprintf('%s: %s', message.message, JSON.stringify(message));
    }

    if (_.isNumber(message.round)) {
        line = i18n.sprintf('[%d] %s', message.round, line);
    }

    console.log(line);
};



var loadJsonFile = function(filename) {
    return promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }).then(function(data) {
        return JSON.parse(data);
    });
};


var createConnection = function() {
    var connectionConfig = config.customizerOptions.connection;

    var Connection = vbus [connectionConfig.class];

    var conn = new Connection(connectionConfig.options);

    conn.on('connectionState', function(state) {
        reportProgress({
            message: 'CONNECTION_STATE',
            connectionState: state,
        });
    });

    return conn;
};


var processCustomizationJob = function(context, job) {
    return Q.fcall(function() {
        reportProgress('Waiting for free bus...');

        return context.connection.waitForFreeBus();
    }).then(function(datagram) {
        context.masterAddress = datagram.sourceAddress;

        reportProgress('Found master with address 0x' + context.masterAddress.toString(16));

        context.deviceAddress = context.masterAddress;

        return vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(context.deviceAddress);
    }).then(function(optimizer) {
        context.optimizer = optimizer;

        context.customizer = new vbus.ConnectionCustomizer({
            deviceAddress: context.deviceAddress,
            connection: context.connection,
            optimizer: context.optimizer,
        });
    }).then(function() {
        var onProgress = function(progress) {
            reportProgress(progress);
        };

        var command = job.data.command;

        var config = job.data.config;
        var currentConfig = context.currentConfig;

        var options = {
            optimize: false,
        };

        if (command === 'load') {
            options.optimize = !config;

            return Q.fcall(function() {
                return context.customizer.loadConfiguration(config, options).progress(onProgress);
            }).then(function(config) {
                // console.log(config);
                return context.optimizer.completeConfiguration(config, currentConfig);
            }).then(function(config) {
                // console.log(config);
                context.currentConfig = config;
            });
        } else if (command === 'save') {
            return Q.fcall(function() {
                return context.customizer.saveConfiguration(config, currentConfig, options).progress(onProgress);
            }).then(function(config) {
                // console.log(config);
                return context.optimizer.completeConfiguration(config, currentConfig);
            }).then(function(config) {
                // console.log(config);
                context.currentConfig = config;
            });
        } else {
            throw new Error('Unknown command ' + JSON.stringify(command));
        }
    });
};


var serve = function() {
    var context = {};

    return Q.fcall(function() {
        return createConnection();
    }).then(function(conn) {
        context.connection = conn;

        reportProgress('Connecting...');

        return context.connection.connect();
    }).then(function() {
        var jobs = kue.createQueue();
        jobs.process('customization', function(job, done) {
            Q.fcall(function() {
                return processCustomizationJob(context, job);
            }).done(function() {
                console.log('Job done!');

                done();
            }, function(err) {
                console.log('Job failed!');

                done(err);
            });
        });
    }).then(function() {
        var app = express();
        app.get('/config', function(req, res) {
            var jsonConfig = _.reduce(context.currentConfig, function(memo, value) {
                if (!value.ignored) {
                    memo [value.valueId] = value.value;
                }
                return memo;
            }, {});

            res.json(jsonConfig);
        });
        app.use(kue.app);
        app.listen(3000);
    });
};


var runSingleShot = function(argv) {
    var context = {};

    if (argv.q) {
        reportProgress = function() {};
    }

    return Q.fcall(function() {
        return createConnection();
    }).then(function(conn) {
        context.connection = conn;

        if (argv.old) {
            return loadJsonFile(argv.old);
        }
    }).then(function(oldConfig) {
        context.oldConfig = oldConfig;

        if (argv.loadAll) {
            return null;
        } else if (argv.load) {
            return loadJsonFile(argv.load);
        }
    }).then(function(loadConfig) {
        context.loadConfig = loadConfig;

        if (argv.save) {
            return loadJsonFile(argv.save);
        }
    }).then(function(saveConfig) {
        context.saveConfig = saveConfig;

        reportProgress('Connecting...');

        return context.connection.connect();
    }).then(function() {
        reportProgress('Waiting for free bus...');

        return context.connection.waitForFreeBus();
    }).then(function(datagram) {
        context.masterAddress = datagram.sourceAddress;

        reportProgress('Found master with address 0x' + context.masterAddress.toString(16));

        context.deviceAddress = context.masterAddress;

        return vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(context.deviceAddress);
    }).then(function(optimizer) {
        context.optimizer = optimizer;

        if (!optimizer) {
            reportProgress(i18n.sprintf('WARNING: Unable to create optimizer for master with address 0x%04X', context.masterAddress));
        }

        context.customizer = new vbus.ConnectionCustomizer({
            deviceAddress: context.deviceAddress,
            connection: context.connection,
            optimizer: context.optimizer,
        });
    }).then(function() {
        if (context.loadConfig !== undefined) {
            var onProgress = function(progress) {
                reportProgress(progress);
            };

            var config = context.loadConfig;

            var options = {
                optimize: !config,
            };

            return context.customizer.loadConfiguration(config, options).progress(onProgress);
        }
    }).then(function(config) {
        context.loadedConfig = config;

        if (context.saveConfig !== undefined) {
            var onProgress = function(progress) {
                reportProgress(progress);
            };

            var saveConfig = context.saveConfig;
            var oldConfig = context.oldConfig;

            var options = {
                optimize: false,
            };

            return context.customizer.saveConfiguration(saveConfig, oldConfig, options).progress(onProgress);
        } else {
            return config;
        }
    }).then(function(config) {
        var jsonConfig = _.reduce(config, function(memo, value) {
            if (!value.ignored) {
                memo [value.valueId] = value.value;
            }
            return memo;
        }, {});

        jsonConfig = JSON.stringify(jsonConfig);

        if (argv.out) {
            return vbus.utils.promise(function(resolve, reject) {
                fs.writeFile(argv.out, jsonConfig, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        } else {
            console.log(jsonConfig);
        }
    }).finally(function() {
        reportProgress('Disconnecting...');

        if (context.connection != null) {
            context.connection.disconnect();
        }
    });
};


var main = function() {
    var argv = optimist.argv;

    if (argv.serve) {
        return serve();
    } else {
        return runSingleShot(argv);
    }
};



if (require.main === module) {
    Q.fcall(main).done();
} else {
    module.exports = main;
}
