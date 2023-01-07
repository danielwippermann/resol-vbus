/*! resol-vbus | Copyright (c) 2023-present, Daniel Wippermann | MIT license */

const fs = require('fs/promises');
const path = require('path');

const vbus = require('../../resol-vbus');

const { ArgParser } = require('./arg-parser');
const logger = require('./logger');
const { loadConfiguration, saveConfiguration } = require('./customizer');


async function connect(options) {
    const Connection = vbus [options.connectionClassName];
    if (Connection == null) {
        throw new Error(`Unable to lookup Connection class: ${options.connectionClassName}`);
    } else if (typeof Connection !== 'function') {
        throw new Error(`Unexpected type of Connection class: ${typeof Connection}`);
    } else if (!(Connection.prototype instanceof vbus.Connection)) {
        throw new Error(`Not a Connection sub-class: ${options.connectionClassName}`);
    }

    const connection = new Connection(options.connectionOptions);

    await connection.connect();

    return connection;
}

async function parseJob(filename) {
    const jobString = await fs.readFile(filename, 'utf-8');
    const job = JSON.parse(jobString);

    let values;
    if (job == null) {
        throw new Error(`Unsupported job type: null`);
    } else if (typeof job !== 'object') {
        throw new Error(`Unsupported job type: ${typeof job}`);
    } else if (Array.isArray(job)) {
        values = job;
    } else {
        values = Object.getOwnPropertyNames(job).map(valueId => {
            return {
                valueId,
                value: job [valueId],
            };
        });
    }

    return values;
}

async function main(argv, options) {
    const args = new ArgParser(argv);

    function usage(message) {
        args.printUsage(message, [
            'USAGE: customizer2 [--debug] [--out <filename>] <action> <filename>',
            '',
            'OPTIONS:',
            '    --help               Print this help',
            '    --debug              Print more progress information',
            '    --out <filename>     Write result to file',
            '',
            'ARGUMENTS:',
            '    <action>             Either "load" or "save"',
            '    <filename>           File containing list of values to load or save',
            '',
        ]);
    }

    let action = null, actionFilename = null, outputFilename = null;
    for (const arg of args) {
        if (arg === '--help') {
            usage();
        } else if (arg === '--debug') {
            logger.level = 7;
        } else if (arg === '--out') {
            if (outputFilename != null) {
                usage('Must not provide --out more than once');
            }
            outputFilename = args.consumeArgument();
            if (outputFilename == null) {
                usage('Missing argument for --out <filename>');
            }
        } else if (arg.startsWith('--')) {
            usage(`Unknown option: ${arg}`);
        } else if (action == null) {
            action = arg;
        } else if (actionFilename == null) {
            actionFilename = arg;
        } else {
            usage(`Unexpected argument: ${arg}`);
        }
    }

    if (action == null) {
        usage('No action provided');
    } else if (actionFilename == null) {
        usage(`Must provide filename for action ${action}`);
    }

    const connection = await connect(options);

    try {
        let output;
        if (action === 'load') {
            const values = await parseJob(actionFilename);

            output = await loadConfiguration(connection, values);
        } else if (action === 'save') {
            const values = await parseJob(actionFilename);

            output = await saveConfiguration(connection, values);
        } else {
            usage(`Unknown action: ${action}`);
        }

        output = JSON.stringify(output, null, 4);

        /* istanbul ignore if */ if (outputFilename === '-') {
            console.log(output);
        } else if (outputFilename != null) {
            await fs.writeFile(outputFilename, output);
        }
    } finally {
        await connection.disconnect();
    }
}


module.exports = {
    connect,
    parseJob,
    main,
};
