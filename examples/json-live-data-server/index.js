/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const os = require('os');


const express = require('express');
const winston = require('winston');


const {
    HeaderSet,
    HeaderSetConsolidator,
    Specification,
    SerialConnection,
    TcpConnection,
} = require('../resol-vbus');


const config = require('./config');



const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});


const connectionClassByName = {
    SerialConnection,
    TcpConnection,
};


const spec = Specification.getDefaultSpecification();


const headerSet = new HeaderSet();


const generateJsonData = async function() {
    const packetFields = spec.getPacketFieldsForHeaders(headerSet.getSortedHeaders());

    const data = packetFields.map((pf) => {
        return {
            id: pf.id,
            name: pf.name,
            rawValue: pf.rawValue,
        };
    });

    return JSON.stringify(data, null, 4);
};


const writeHeaderSet = async (filename) => {
    logger.debug('HeaderSet complete');

    const data = await generateJsonData();

    await new Promise((resolve, reject) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};


const main = async () => {
    logger.debug('Starting server...');

    const app = express();

    app.get('/api/v1/live-data', (req, res) => {
        generateJsonData().then(data => {
            res.status(200).type('application/json').end(data);
        }).then(null, (err) => {
            logger.error(err);
            res.status(500).type('text/plain').end(err.toString());
        });
    });

    await new Promise((resolve, reject) => {
        app.listen(config.httpPort, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    logger.debug('Connect to VBus data source...');

    const hsc = new HeaderSetConsolidator({
        interval: config.loggingInterval,
    });

    const ConnectionClass = connectionClassByName [config.connectionClassName];

    const connection = new ConnectionClass(config.connectionOptions);

    connection.on('packet', (packet) => {
        headerSet.addHeader(packet);
        hsc.addHeader(packet);
    });

    hsc.on('headerSet', (headerSet) => {
        writeHeaderSet(config.loggingFilename).then(null, err => {
            logger.error(err);
        });
    });

    await connection.connect();

    logger.info('Ready to serve from the following URLs:');
    for (const iface of Object.values(os.networkInterfaces())) {
        for (const ifaceConfig of iface) {
            if (ifaceConfig.family === 'IPv4') {
                logger.info('    - http://' + ifaceConfig.address + ':' + config.httpPort + '/api/v1/live-data' + (ifaceConfig.internal ? ' (internal)' : ''));
            }
        }
    }

    hsc.startTimer();

    return new Promise((resolve, reject) => {
        // nop, just run forever
    });
};



if (require.main === module) {
    main(process.argv.slice(2)).then(null, err => {
        logger.error(err);
    });
} else {
    module.exports = main;
}
