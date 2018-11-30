/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const fs = require('fs');
const os = require('os');
const path = require('path');


const express = require('express');
const morgan = require('morgan');
const request = require('request');
const winston = require('winston');
const mqtt = require('mqtt');


const {
    Converter,
    DLxJsonConverter,
    FileSystemRecorder,
    HeaderSet,
    HeaderSetConsolidator,
    Packet,
    SerialConnection,
    Specification,
    TcpConnection,
    TextConverter,
    VBusRecordingConverter,
} = require('../resol-vbus');


const config = require('./config');



const specification = Specification.getDefaultSpecification();



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


const headerSetConsolidator = new HeaderSetConsolidator({
    interval: config.loggingInterval,
    timeToLive: config.loggingTimeToLive,
});


const fsRecorder = new FileSystemRecorder({
    id: 'fs-destination',
    path: config.loggingPath,
});


const textHeaderSetConsolidator = new HeaderSetConsolidator({
    timeToLive: config.textLoggingTimeToLive,
});


/**
 * This function is called once the header set is considered "settled".
 * That means that the amount of unique packets in the header set has
 * been stable for a certain amount of time.
 *
 * @param {HeaderSet} headerSet
 */
const headerSetHasSettled = function(headerSet) {
    const packetFields = specification.getPacketFieldsForHeaders(headerSet.getHeaders());

    logger.debug(packetFields.map((packetField) => {
        return packetField.id + ': ' + packetField.name;
    }).join('\n'));
};


/**
 * Connect to the VBus and store the packets into the global HeaderSetConsolidator.
 */
const connectToVBus = async () => {
    const ConnectionClass = connectionClassByName [config.connectionClassName];
    const connection = new ConnectionClass(config.connectionOptions);

    connection.on('connectionState', (connectionState) => {
        logger.debug('Connection state changed to ' + connectionState);
    });

    let hasSettled = false;
    let headerSet = new HeaderSet();
    let settledCountdown = 0;

    connection.on('packet', (packet) => {
        // logger.debug('Packet received...', packet);

        if (!hasSettled) {
            const headerCountBefore = headerSet.getHeaderCount();
            headerSet.addHeader(packet);
            const headerCountAfter = headerSet.getHeaderCount();

            if (headerCountBefore !== headerCountAfter) {
                settledCountdown = headerCountAfter * 2;
            } else if (settledCountdown > 0) {
                settledCountdown -= 1;
            } else {
                hasSettled = true;

                headerSetHasSettled(headerSet);
                headerSet = null;
            }
        }

        headerSetConsolidator.addHeader(packet);
        textHeaderSetConsolidator.addHeader(packet);
    });

    logger.debug('Connecting to VBus...');

    await connection.connect();

    logger.debug('Connected to VBus...');
};


/**
 * Responds to '/cgi-bin/get_resol_device_information' requests.
 * It replies with a fake DL2v2 response to trick VBusTouch to connect with it.
 */
const processGetResolDeviceInformationRequest = function(req, res) {
    const content = [
        'vendor = "RESOL"',
        'product = "DL2"',
        'serial = "001E66000000"',
        'version = "2.1.0"',
        'build = "201311280853"',
        'name = "DL2-001E66000000"',
        'features = "vbus,dl2"',
    ].join('\n');

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(content);
};


/**
 * Allows rewriting a HeaderSet read from the file system before it is send over the network.
 *
 * The example below converts the information from a DeltaSol MX to a Vitosolic 200.
 *
 * @param headerSet A `HeaderSet` instance containing the received `Packet` instances.
 * @returns A `HeaderSet` instance containing the forged `Packet` instances.
 */
const rewriteWebHeaderSet = function(headerSet) {
    const timestamp = headerSet.timestamp;

    /*
     * Get list of packet fields in the received packets.
     */
    let packetFields = specification.getPacketFieldsForHeaders(headerSet.getHeaders());

    /*
     * Map all existing packet fields into an object for easier access.
     */
    const origRawValueById = packetFields.reduce((memo, packetField) => {
        memo [packetField.id] = packetField.rawValue;
        return memo;
    }, {});

    /*
     * Pick the interesting fields from the raw values.
     */
    const tempCollector = origRawValueById ['00_0010_7E11_10_0100_000_2_0'];
    const tempStoreBottom = origRawValueById ['00_0010_7E11_10_0100_002_2_0'];
    const tempStoreTop = origRawValueById ['00_0010_7E11_10_0100_004_2_0'];
    const pumpSpeed = origRawValueById ['00_0010_7E11_10_0100_076_1_0'];
    const info1 = origRawValueById ['00_0010_7E11_10_0100_077_1_0'];
    const info2 = origRawValueById ['00_0010_7E11_10_0100_078_1_0'];
    const errorMask = origRawValueById ['00_0010_7E11_10_0100_096_4_0'];
    const tempFlow = origRawValueById ['00_0010_7E11_10_0100_006_2_0'];
    const tempReturn = origRawValueById ['00_0010_7E11_10_0100_008_2_0'];
    const flow = origRawValueById ['00_0010_7E11_10_0100_040_4_0'];
    const heat = origRawValueById ['00_0010_7E31_10_0100_000_4_0'];

    /*
     * Create an empty packet of the supported Vitosolic 200.
     */
    const supportedPacket1 = new Packet({
        timestamp,
        channel: 0,
        destinationAddress: 0x0010,  // DFA
        sourceAddress: 0x7321,  // Vitosolic 200 [Regler]
        command: 0x0100,
        frameCount: 20,
    });

    /*
     * Create an empty packet for the heat quantity information.
     */
    const supportedPacket2 = new Packet({
        timestamp,
        channel: 0,
        destinationAddress: 0x0010,  // DFA
        sourceAddress: 0x7326,  // Vitosolic 200 [WMZ1]
        command: 0x0100,
        frameCount: 3,
    });

    /*
     * Create a new header set and add the forged packets to it.
     */
    headerSet = new HeaderSet({
        timestamp,
    });
    headerSet.addHeader(supportedPacket1);
    headerSet.addHeader(supportedPacket2);

    /*
     * Get list of packet fields in the forged packets.
     */
    packetFields = specification.getPacketFieldsForHeaders(headerSet.getHeaders());

    /*
     * Transfered the information picked from the received packets into the forged ones.
     */
    specification.setPacketFieldRawValues(packetFields, {
        '00_0010_7321_10_0100_000_2_0': tempCollector,
        '00_0010_7321_10_0100_002_2_0': tempStoreBottom,
        '00_0010_7321_10_0100_004_2_0': tempStoreTop,
        '00_0010_7321_10_0100_044_1_0': pumpSpeed,
        '00_0010_7321_10_0100_045_1_0': info1,
        '00_0010_7321_10_0100_046_1_0': info2,
        '00_0010_7321_10_0100_060_2_0': errorMask,
        '00_0010_7326_10_0100_000_2_0': tempFlow,
        '00_0010_7326_10_0100_002_2_0': tempReturn,
        '00_0010_7326_10_0100_004_2_0': flow,
    });

    supportedPacket2.frameData.writeUInt16LE(heat % 1000, 6);
    supportedPacket2.frameData.writeUInt16LE((heat / 1000) % 1000, 8);
    supportedPacket2.frameData.writeUInt16LE((heat / 1000000) % 1000, 10);

    /*
     * Return the forged header set.
     */
    return headerSet;
};


/**
 * Responds to '/dlx/download/download' requests.
 * It only implements the parts of the endpoint that are necessary for VBusTouch to work.
 */
const processDownloadDownloadRequest = async (req, res) => {
    try {
        const i18n = specification.i18n;

        const startDate = req.query.startDate ? i18n.momentUtc(req.query.startDate, 'MM/DD/YYYY') : i18n.moment();
        const endDate = req.query.endDate ? i18n.momentUtc(req.query.endDate, 'MM/DD/YYYY') : i18n.moment();

        const query = {
            source: req.query.source,
            outputType: req.query.outputType,
            dataLanguage: req.query.dataLanguage || 'en',
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            sieveInterval: req.query.sieveInterval | 0,
            ttl: req.query.ttl | 0,
        };

        // logger.debug(req.query, query);

        const converter1 = new Converter({ objectMode: true });

        const hsc = new HeaderSetConsolidator({
            timestamp: query.startDate,
            interval: query.sieveInterval * 1000,
            timeToLive: query.ttl * 1000,
        });

        let converter2, contentType;
        if (query.outputType === 'vbus') {
            converter2 = new VBusRecordingConverter({});
            contentType = 'application/octet-stream';
        } else if (query.outputType === 'json') {
            converter2 = new DLxJsonConverter({});
            contentType = 'application/json; charset=utf-8';
        } else {
            throw new Error('Unsupported output type ' + JSON.stringify(query.outputType));
        }

        const onC1HeaderSet = function(headerSet) {
            // logger.debug('C1 headerSet event received', headerSet.timestamp);

            hsc.processHeaderSet(headerSet);
        };

        const onC1Finish = function() {
            // logger.debug('C1 finish event received');
        };

        converter1.on('headerSet', onC1HeaderSet);

        converter1.on('finish', onC1Finish);

        const onHscHeaderSet = function(headerSet) {
            if (config.rewriteWebHeaderSets) {
                headerSet = rewriteWebHeaderSet(headerSet);
            }

            converter2.convertHeaderSet(headerSet);
        };

        hsc.on('headerSet', onHscHeaderSet);

        const chunks = [];

        const onC2Data = function(chunk) {
            // logger.debug('C2 data event received');

            chunks.push(chunk);
        };

        const onC2End = function() {
            // logger.debug('C2 end event received');
        };

        converter2.on('data', onC2Data);

        converter2.on('end', onC2End);

        try {
            if (query.source === 'current') {
                converter1.write(headerSetConsolidator);
            } else {
                const playerOptions = {
                    id: 'fs-destination',
                    interval: config.loggingInterval,
                    path: config.loggingPath,
                };

                const playbackOptions = {
                    minTimestamp: query.startDate,
                    maxTimestamp: query.endDate,
                };

                const player = new FileSystemRecorder(playerOptions);

                await player.playback(converter1, playbackOptions);
            }

            await converter2.finish();
        } finally {
            converter1.removeListener('headerSet', onC1HeaderSet);
            converter1.removeListener('finish', onC1Finish);
            hsc.removeListener('headerSet', onHscHeaderSet);
            converter2.removeListener('data', onC2Data);
            converter2.removeListener('end', onC2End);
        }

        const buffer = Buffer.concat(chunks);

        res.status(200);
        res.set('content-type', contentType);
        res.send(buffer);
    } catch (err) {
        global.console.log(err, err.toString(), err.stack);

        res.status(500);
        res.set('content-type', 'text/plain');
        res.send(err.toString());
    }
};


/**
 * Start the web server.
 */
const startWebServer = async () => {
    logger.debug('Starting web server...');

    const app = express();

    app.use(morgan('dev'));
    app.use(express.query());

    app.get('/cgi-bin/get_resol_device_information', processGetResolDeviceInformationRequest);
    app.get('/dlx/download/download', processDownloadDownloadRequest);

    app.listen(3000, () => {
        logger.debug('Started web server at: ');
        logger.debug('  - http://0.0.0.0:' + config.webServerPort + '/ (internal)');
        for (const iface of Object.values(os.networkInterfaces())) {
            for (const ifaceConfig of iface) {
                if (ifaceConfig.family === 'IPv4') {
                    logger.debug('  - http://' + ifaceConfig.address + ':' + config.webServerPort + '/' + (ifaceConfig.internal ? ' (internal)' : ''));
                }
            }
        }
    });
};


const startHeaderSetConsolidatorTimer = async () => {
    logger.debug('Starting HeaderSetConsolidator timer...');

    headerSetConsolidator.startTimer();
};


const startMqttLogging = async () => {
    const onHeaderSet = async (headerSet, client) => {
        const headers = headerSet.getSortedHeaders();
        const packetFields = specification.getPacketFieldsForHeaders(headers);

        const valuesById = packetFields.reduce((memo, pf) => {
            const precision = pf.packetFieldSpec.type.precision;

            const roundedRawValue = pf.rawValue.toFixed(precision);

            //logger.debug('ID = ' + JSON.stringify(pf.id) + ', Name = ' + JSON.stringify(pf.name) + ', Value = ' + pf.rawValue + ', RoundedValue = ' + roundedRawValue);

            memo [pf.id] = roundedRawValue;
            return memo;
        }, {});

        const params = Object.keys(config.mqttPacketFieldMap).reduce((memo, key) => {
            const packetFieldId = config.mqttPacketFieldMap [key];

            let value;
            if (typeof packetFieldId === 'function') {
                value = packetFieldId(valuesById);
            } else {
                value = valuesById [packetFieldId];
            }
            if (typeof value === 'number') {
                value = value.toString();
            }
            if (typeof value === 'string') {
                memo [key] = value;
            }
            return memo;
        }, {});

        client.publish(config.mqttTopic, JSON.stringify(params));
    };

    if (config.mqttInterval) {
        logger.debug('Starting MQTT logging');
        const client  = mqtt.connect(config.mqttConnect)

        client.on('connect', function () {
            const hsc = new HeaderSetConsolidator({
                interval: config.mqttInterval,
            });

            hsc.on('headerSet', () => {
                onHeaderSet(headerSetConsolidator, client).then(null, err => {
                    logger.error(err);
                });
            });

            hsc.startTimer();
        });
    }
};

const startPvOutputOrgLogging = async () => {
    const onHeaderSet = async (headerSet) => {
        const headers = headerSet.getSortedHeaders();
        const packetFields = specification.getPacketFieldsForHeaders(headers);

        const valuesById = packetFields.reduce((memo, pf) => {
            const precision = pf.packetFieldSpec.type.precision;

            const roundedRawValue = pf.rawValue.toFixed(precision);

            // logger.debug('ID = ' + JSON.stringify(pf.id) + ', Name = ' + JSON.stringify(pf.name) + ', Value = ' + pf.rawValue + ', RoundedValue = ' + roundedRawValue);

            memo [pf.id] = roundedRawValue;
            return memo;
        }, {});

        const timestamp = specification.i18n.moment(headerSet.timestamp);

        const params = Object.keys(config.pvOutputOrgPacketFieldMap).reduce((memo, key) => {
            const packetFieldId = config.pvOutputOrgPacketFieldMap [key];

            let value;
            if (typeof packetFieldId === 'function') {
                value = packetFieldId(valuesById);
            } else {
                value = valuesById [packetFieldId];
            }
            if (typeof value === 'number') {
                value = value.toString();
            }
            if (typeof value === 'string') {
                memo [key] = value;
            }
            return memo;
        }, {
            key: config.pvOutputOrgApiKey,
            sid: config.pvOutputOrgSystemId,
            d: timestamp.format('YYYYMMDD'),
            t: timestamp.format('HH:mm'),
        });

        request({
            url: 'http://pvoutput.org/service/r2/addstatus.jsp',
            qs: params,
        }, (error, response, body) => {
            logger.debug(error, response, body);
        });
    };

    if (config.pvOutputOrgInterval) {
        logger.debug('Starting PvOutput.org logging');

        const hsc = new HeaderSetConsolidator({
            interval: config.pvOutputOrgInterval,
        });

        hsc.on('headerSet', () => {
            onHeaderSet(headerSetConsolidator).then(null, err => {
                logger.error(err);
            });
        });

        hsc.startTimer();
    }
};


const startTextLogging = async () => {
    let currentDatecode = null;

    let currentConverter = null;

    const onHeaderSet = async (headerSet) => {
        const datecode = specification.i18n.moment(headerSet.timestamp).format('YYYYMMDD');
        if (currentDatecode !== datecode) {
            currentDatecode = datecode;

            if (currentConverter) {
                currentConverter.finish();
                currentConverter = null;
            }

            const filename = path.resolve(config.textLoggingPath, datecode + '.csv');

            const file = fs.createWriteStream(filename, { flags: 'a' });

            const options = Object.assign({}, config.textLoggingOptions, {
                specification,
            });

            const converter = new TextConverter(options);
            converter.pipe(file);

            currentConverter = converter;
        }

        if (currentConverter) {
            currentConverter.convertHeaderSet(headerSet);
        }
    };

    if (config.textLoggingInterval) {
        logger.debug('Starting text logging');

        const hsc = new HeaderSetConsolidator({
            interval: config.textLoggingInterval,
        });

        hsc.on('headerSet', () => {
            onHeaderSet(textHeaderSetConsolidator);
        });

        hsc.startTimer();
    }
};


const startRecorder = async () => {
    const converter = new Converter({ objectMode: true });

    const onHeaderSet = function(headerSet) {
        // logger.debug('HeaderSet consolidated...');

        converter.convertHeaderSet(headerSet);
    };

    try {
        headerSetConsolidator.on('headerSet', onHeaderSet);

        await fsRecorder.record(converter, {
            interval: config.loggingInterval,
            timeToLive: config.loggingTimeToLive,
        });
    } finally {
        headerSetConsolidator.removeListener('headerSet', onHeaderSet);
    }
};


const main = async () => {
    await connectToVBus();

    await startWebServer();

    await startHeaderSetConsolidatorTimer();

    await startMqttLogging();

    await startPvOutputOrgLogging();

    await startTextLogging();

    await startRecorder();
};



if (require.main === module) {
    main(process.argv.slice(2)).then(() => {
        logger.info('DONE!');
    }, err => {
        logger.error(err);
    });
} else {
    module.exports = main;
}
