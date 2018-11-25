/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');


const express = require('express');
const kue = require('kue');
const _ = require('lodash');
const optimist = require('optimist');


const vbus = require('../resol-vbus');


const config = require('./config.js');



const i18n = new vbus.I18N('en');



let reportProgress = (message) => {
    let line;
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



const loadJsonFile = async (filename) => {
    const data = await new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    return JSON.parse(data);
};


const createConnection = function() {
    const Connection = vbus [config.connectionClassName];

    const conn = new Connection(config.connectionOptions);

    conn.on('connectionState', (state) => {
        reportProgress({
            message: 'CONNECTION_STATE',
            connectionState: state,
        });
    });

    return conn;
};


const processCustomizationJob = async (context, job) => {
    reportProgress('Waiting for free bus...');

    const datagram = await context.connection.waitForFreeBus();

    context.masterAddress = datagram.sourceAddress;

    reportProgress('Found master with address 0x' + context.masterAddress.toString(16));

    context.deviceAddress = context.masterAddress;

    const optimizer = await vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(context.deviceAddress);

    context.optimizer = optimizer;

    context.customizer = new vbus.ConnectionCustomizer({
        deviceAddress: context.deviceAddress,
        connection: context.connection,
        optimizer: context.optimizer,
    });

    const command = job.data.command;

    const config = job.data.config;
    const currentConfig = context.currentConfig;

    const options = {
        optimize: false,
        reportProgress,
    };

    if (command === 'load') {
        options.optimize = !config;

        const loadedConfig = await context.customizer.loadConfiguration(config, options);

        // console.log(config);
        const completedConfig = await context.optimizer.completeConfiguration(loadedConfig, currentConfig);

        // console.log(config);
        context.currentConfig = completedConfig;
    } else if (command === 'save') {
        const savedConfig = await context.customizer.saveConfiguration(config, currentConfig, options);

        // console.log(config);
        const completedConfig = await context.optimizer.completeConfiguration(savedConfig, currentConfig);

        // console.log(config);
        context.currentConfig = completedConfig;
    } else {
        throw new Error('Unknown command ' + JSON.stringify(command));
    }
};


const serve = async () => {
    const context = {};

    const conn = await createConnection();

    context.connection = conn;

    reportProgress('Connecting...');

    await context.connection.connect();

    const jobs = kue.createQueue();
    jobs.process('customization', (job, done) => {
        processCustomizationJob(context, job).then(() => {
            console.log('Job done!');

            done();
        }, (err) => {
            console.log('Job failed!');

            done(err);
        });
    });

    const app = express();
    app.get('/config', (req, res) => {
        const jsonConfig = _.reduce(context.currentConfig, (memo, value) => {
            if (!value.ignored) {
                memo [value.valueId] = value.value;
            }
            return memo;
        }, {});

        res.json(jsonConfig);
    });

    app.use(kue.app);
    app.listen(3000);
};


const runSingleShot = async (argv) => {
    const context = {};

    try {
        if (argv.q) {
            reportProgress = function() {};
        }

        const conn = await createConnection();

        context.connection = conn;

        let oldConfig;
        if (argv.old) {
            oldConfig = await loadJsonFile(argv.old);
        }

        context.oldConfig = oldConfig;

        let loadConfig;
        if (argv.loadAll) {
            return null;
        } else if (argv.load) {
            loadConfig = await loadJsonFile(argv.load);
        }

        context.loadConfig = loadConfig;

        let saveConfig;
        if (argv.save) {
            saveConfig = await loadJsonFile(argv.save);
        }

        context.saveConfig = saveConfig;

        reportProgress('Connecting...');

        await context.connection.connect();

        reportProgress('Waiting for free bus...');

        const datagram = await context.connection.waitForFreeBus();

        context.masterAddress = datagram.sourceAddress;

        reportProgress('Found master with address 0x' + context.masterAddress.toString(16));

        context.deviceAddress = context.masterAddress;

        const optimizer = await vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(context.deviceAddress);

        context.optimizer = optimizer;

        if (!optimizer) {
            reportProgress(i18n.sprintf('WARNING: Unable to create optimizer for master with address 0x%04X', context.masterAddress));
        }

        context.customizer = new vbus.ConnectionCustomizer({
            deviceAddress: context.deviceAddress,
            connection: context.connection,
            optimizer: context.optimizer,
        });

        let loadedConfig;
        if (context.loadConfig !== undefined) {
            const config = context.loadConfig;

            const options = {
                optimize: !config,
                reportProgress,
            };

            loadedConfig = await context.customizer.loadConfiguration(config, options);
        }

        context.loadedConfig = loadedConfig;

        let savedConfig;
        if (context.saveConfig !== undefined) {
            const saveConfig = context.saveConfig;
            const oldConfig = context.oldConfig;

            const options = {
                optimize: false,
                reportProgress,
            };

            savedConfig = await context.customizer.saveConfiguration(saveConfig, oldConfig, options);
        } else {
            savedConfig = loadedConfig;
        }

        let jsonConfig = _.reduce(savedConfig, (memo, value) => {
            if (!value.ignored) {
                memo [value.valueId] = value.value;
            }
            return memo;
        }, {});

        jsonConfig = JSON.stringify(jsonConfig);

        if (argv.out) {
            return new Promise((resolve, reject) => {
                fs.writeFile(argv.out, jsonConfig, (err) => {
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
    } finally {
        reportProgress('Disconnecting...');

        if (context.connection != null) {
            context.connection.disconnect();
        }
    }
};


const main = async () => {
    const argv = optimist.argv;

    if (argv.serve) {
        return serve();
    } else {
        return runSingleShot(argv);
    }
};



if (require.main === module) {
    main().then(null, err => {
        console.log(err);
    });
} else {
    module.exports = main;
}
