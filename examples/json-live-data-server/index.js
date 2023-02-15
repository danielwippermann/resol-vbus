/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const fs = require('fs');
const os = require('os');


const express = require('express');
const winston = require('winston');


const {
    DLxJsonConverter,
    HeaderSet,
    HeaderSetConsolidator,
    Packet,
    Specification,
    SerialConnection,
    TcpConnection,
    VBusRecordingConverter,
    utils: {
        promisify,
    },
} = require('../resol-vbus');


const config = require('./config');


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: config.logLevel || 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});


class TestableError extends Error {}


function logError(source, error) {
    /* istanbul ignore if */
    if (error && !(error instanceof TestableError)) {
        logger.error(source);
        logger.error(error);
    }
}


const connectionClassByName = {
    SerialConnection,
    TcpConnection,
};


const spec = Specification.getDefaultSpecification();


const headerSet = new HeaderSet();


const emSimulatorStates = (config.emSimulatorSubAdresses || []).map(subAddress => {
    return {
        subAddress,
        sensorValues: [ 0, 0, 0, 0, 0, 0 ],
        relayValues: [
            [ 0, 0, 0, 0, ],
            [ 0, 0, 0, 0, ],
            [ 0, 0, 0, 0, ],
            [ 0, 0, 0, 0, ],
            [ 0, 0, 0, 0, ],
        ],
    };
});


async function generateJsonDataV1() {
    const packetFields = spec.getPacketFieldsForHeaders(headerSet.getSortedHeaders());

    const data = packetFields.map((pf) => {
        let { id, name, rawValue } = pf;
        if (config.packetFieldNameMap && config.packetFieldNameMap [id]) {
            name = config.packetFieldNameMap [id];
        }

        return {
            id,
            name,
            rawValue,
        };
    });

    return JSON.stringify(data, null, 4);
}


async function generateJsonDataV2() {
    const packetFields = spec.getPacketFieldsForHeaders(headerSet.getSortedHeaders());

    const data = packetFields.map((pf) => {
        let { id, name, rawValue } = pf;
        if (config.packetFieldNameMap && config.packetFieldNameMap [id]) {
            name = config.packetFieldNameMap [id];
        }

        const { unitCode, unitFamily, unitText } = pf.packetFieldSpec.type.unit;

        return {
            id,
            name,
            rawValue,
            unitCode,
            unitFamily,
            unitText,
        };
    });

    return JSON.stringify(data, null, 4);
}


async function generatePrometheusResponse() {
    const packetFields = spec.getPacketFieldsForHeaders(headerSet.getSortedHeaders());

    const data = packetFields.map((pf) => {
        return {
            id: pf.id,
            name: pf.name,
            rawValue: pf.rawValue,
        };
    });

    let response = '';
    response = response.concat('# HELP resol Values as retreived from Resol Solar', '\n');
    response = response.concat('# TYPE resol gauge', '\n');

    for (const obj of data) {
        // logger.debug(obj.id);
        // logger.debug(obj.name);
        // logger.debug(obj.rawValue);

        response = response.concat('resol{id="', obj.id, '",name="', obj.name, '"} ', obj.rawValue, '\n');
    }

    return response;
}


/**
 * Responds to '/cgi-bin/get_resol_device_information' requests.
 * It replies with a fake DL2v2 response to trick VBusTouch to connect with it.
 */
async function generateGetResolDeviceInformationResponse() {
    const data = [
        'vendor = "RESOL"',
        'product = "DL2"',
        'serial = "001E66000000"',
        'version = "2.1.0"',
        'build = "201311280853"',
        'name = "DL2-001E66000000"',
        'features = "vbus,dl2"',
    ].join('\n');

    return {
        contentType: 'text/plain',
        data,
    };
}


async function generateDLxDownloadDownloadResponse(rawQuery) {
    const query = {
        source: rawQuery.source,
        outputType: rawQuery.outputType,
        dataLanguage: rawQuery.dataLanguage || 'en',
    };

    let outputConverter, contentType;
    if (query.outputType === 'vbus') {
        outputConverter = new VBusRecordingConverter({});
        contentType = 'application/octet-stream';
    } else if (query.outputType === 'json') {
        outputConverter = new DLxJsonConverter({
            language: query.dataLanguage,
        });
        contentType = 'application/json; charset=utf-8';
    } else {
        throw new Error('Unsupported output type ' + JSON.stringify(query.outputType));
    }

    const chunks = [];

    const onOutputConverterReadable = function() {
        let chunk;
        while ((chunk = outputConverter.read()) != null) {
            chunks.push(chunk);
        }
    };

    const onOutputConverterEnd = function() {
        // logger.debug('C2 end event received');
    };

    outputConverter.on('readable', onOutputConverterReadable);

    outputConverter.on('end', onOutputConverterEnd);

    try {
        if (query.source === 'current') {
            outputConverter.convertHeaderSet(headerSet);
        } else {
            throw new Error(`Unsupported source "${query.source}"`);
        }

        await outputConverter.finish();
    } finally {
        outputConverter.removeListener('readable', onOutputConverterReadable);
        outputConverter.removeListener('end', onOutputConverterEnd);
    }

    const buffer = Buffer.concat(chunks);

    return {
        contentType,
        data: buffer,
    };
}


async function generateDLxDownloadLiveResponse() {
    return await generateDLxDownloadDownloadResponse({
        source: 'current',
        outputType: 'json',
    });
}


async function generateCurrentPacketsVBusResponse() {
    return await generateDLxDownloadDownloadResponse({
        source: 'current',
        outputType: 'vbus',
    });
}


async function generateKM2DataGetCurrentDataResponse() {
    const { data } = await generateDLxDownloadDownloadResponse({
        source: 'current',
        outputType: 'json',
    });

    const result = JSON.parse(data.toString());

    delete result.language;

    return result;
}


async function generateKM2WebserviceResponse(requestBody) {
    const isBatchRequest = Array.isArray(requestBody);
    const requests = isBatchRequest ? requestBody : [ requestBody ];
    const replies = [];
    for (const request of requests) {
        const { jsonrpc, id, method } = request;
        try {
            let result;
            if (jsonrpc !== '2.0') {
                throw new Error(`Unsupported jsonrpc: ${jsonrpc}`);
            } else if (method === 'dataGetCurrentData') {
                result = await generateKM2DataGetCurrentDataResponse();
            } else {
                throw new Error(`Unsupported method: ${method}`);
            }
            replies.push({
                jsonrpc,
                id,
                result,
            });
        } catch (err) {
            if (id) {
                replies.push({
                    jsonrpc: '2.0',
                    id,
                    error: {
                        message: err.toString(),
                    },
                });
            }
        }
    }
    const responseBody = isBatchRequest ? replies : replies [0];
    return JSON.stringify(responseBody, null, 4);
}


function isNumberString(string) {
    return /^\d+$/.test(string);
}


function generateJsonResponse(obj) {
    return Buffer.from(JSON.stringify(obj));
}


const knownSensorConversionMap = new Map([
    [ 'resistor', function(body) {
        const { value } = body;
        if (typeof value !== 'number') {
            throw new Error(`Malformed value: ${typeof value}`);
        }
        return value;
    } ],
    [ 'temperaturePt1000', function(body) {
        const { value } = body;
        if (typeof value !== 'number') {
            throw new Error(`Malformed value`);
        }
        // Source: https://de.wikipedia.org/wiki/Widerstandsthermometer#Platin
        return 1000 * (1 + 3.9083e-3 * value - 5.775e-7 * value * value);
    } ],
    [ 'bas', function(body) {
        const { offset, mode } = body;
        if (typeof offset !== 'number') {
            throw new Error('Malformed offset');
        } else if ((offset < -30) || (offset > 30)) {
            throw new Error(`Invalid offset`)
        } else if (typeof mode !== 'string') {
            throw new Error('Malformed mode');
        }

        let modeResistor;
        switch (mode) {
        case 'auto': modeResistor = 36; break;
        case 'night': modeResistor = 620; break;
        case 'summer': modeResistor = 1200; break;
        case 'off': modeResistor = 1800; break;
        default:
            throw new Error(`Invalid mode`);
        }

        let offsetResistor;
        if (offset < -15) {
            offsetResistor = 0;
        } else if (offset > 15) {
            offsetResistor = 500;
        } else {
            offsetResistor = 250 + offset * 210 / 15;
        }

        return (modeResistor + offsetResistor);
    } ],
]);


async function generateEmSimulatorResponse() {
    return generateJsonResponse(emSimulatorStates.map(state => {
        const { subAddress } = state;
        return { subAddress };
    }));
}


async function generateEmSimulatorSensorResponse(requestParams, requestBody) {
    let { subAddress, sensorNr, sensorType } = requestParams;

    if (isNumberString(subAddress)) {
        subAddress = +subAddress;
    } else {
        throw new Error(`Malformed subAddress`);
    }

    if (isNumberString(sensorNr)) {
        sensorNr = +sensorNr;
    } else {
        throw new Error(`Malformed sensorNr`);
    }

    let convertSensorValue;
    if (knownSensorConversionMap.has(sensorType)) {
        convertSensorValue = knownSensorConversionMap.get(sensorType);
    } else {
        throw new Error(`Unknown sensorType`);
    }

    const state = emSimulatorStates.find(state => state.subAddress === subAddress);
    if (!state) {
        throw new Error(`Unknown subAddress`);
    }

    if ((sensorNr < 1) || (sensorNr > state.sensorValues.length)) {
        throw new Error(`Invalid sensorNr`);
    }

    console.log(requestBody);

    const resistor = convertSensorValue(requestBody);
    if (typeof resistor !== 'number') {
        throw new Error(`Unable to convert value to number`);
    } else if (!Number.isFinite(resistor)) {
        throw new Error(`Converted sensor is not a finite number`);
    }

    const rawResistor = Math.round(resistor * 1000);
    if ((rawResistor < 0) || (rawResistor > 0xFFFFFFFF)) {
        throw new Error(`Sensor value is out of range`);
    }

    state.sensorValues [sensorNr - 1] = rawResistor;

    return generateJsonResponse({
        resistor,
        rawResistor,
    });
}


async function generateEmSimulatorRelayResponse(requestParams) {
    let { subAddress, relayNr } = requestParams;

    if (isNumberString(subAddress)) {
        subAddress = +subAddress;
    } else {
        throw new Error(`Malformed subAddress`);
    }

    if (isNumberString(relayNr)) {
        relayNr = +relayNr;
    } else {
        throw new Error(`Malformed relayNr`);
    }

    const state = emSimulatorStates.find(state => state.subAddress === subAddress);
    if (!state) {
        throw new Error(`Unknown subAddress`);
    }

    if ((relayNr < 1) || (relayNr > state.relayValues.length)) {
        throw new Error(`Invalid relayNr`);
    }

    const [ value1, time1, value2, time2 ] = state.relayValues [relayNr - 1];

    const value = (time1 > 0) ? value1 : (time2 > 0) ? value2 : 0;

    return generateJsonResponse({
        value1,
        time1,
        value2,
        time2,
        value,
    });
}


async function writeHeaderSet(filename) {
    logger.debug('HeaderSet complete');

    const data = await generateJsonDataV1();

    await promisify(cb => fs.writeFile(filename, data, cb));
}


function wrapAsyncRequestHandler(res, fn) {
    async function runner() {
        return fn();
    }

    runner().then(result => {
        res.status(200).type(result.contentType).end(result.data);
    }, err => {
        logError('Error while wrapping async request handler:', err);
        res.status(500).type('text/plain').end(err.toString());
    });
}


function wrapAsyncJsonRequestHandler(res, fn) {
    wrapAsyncRequestHandler(res, async () => {
        const data = await fn();
        const contentType = 'application/json';
        return { data, contentType };
    });
}


function processEmSimulatorPacket(connection, rxPacket) {
    console.log(rxPacket.getId());

    if (((rxPacket.destinationAddress & 0xFFF0) === 0x6650) && (rxPacket.command === 0x0200) && (rxPacket.frameCount >= 10)) {
        const subAddress = rxPacket.destinationAddress & 0x000F;

        const state = emSimulatorStates.find(state => state.subAddress === subAddress);

        if (state) {
            const rxFrameData = rxPacket.frameData;

            const tmpBuffer = Buffer.alloc(4);

            for (let i = 0; i < 5; i++) {
                const offset = i * 8;
                const value1 = rxFrameData [offset + 0];
                rxFrameData.copy(tmpBuffer, 0, offset + 1, offset + 4);
                const time1 = tmpBuffer.readUInt32LE(0);
                const value2 = rxFrameData [offset + 4];
                rxFrameData.copy(tmpBuffer, 0, offset + 5, offset + 8);
                const time2 = tmpBuffer.readUInt32LE(0);

                state.relayValues [i] = [ value1, time1, value2, time2 ];
            }

            const txFrameData = Buffer.alloc(24);
            for (let i = 0; i < 6; i++) {
                txFrameData.writeUInt32LE(state.sensorValues [i], i * 4);
            }

            const txPacket = new Packet({
                destinationAddress: rxPacket.sourceAddress,
                sourceAddress: rxPacket.destinationAddress,
                command: 0x0100,
                frameCount: 6,
                frameData: txFrameData,
            });

            connection.send(txPacket);

            console.log('state', state);
        }
    }
}


async function main(options) {
    const { signal, onListen, onRunning } = (options || {});

    logger.debug('Starting server...');

    const app = express();

    app.get('/api/v1/live-data', (req, res) => {
        wrapAsyncJsonRequestHandler(res, () => {
            return generateJsonDataV1();
        });
    });

    app.get('/api/v2/live-data', (req, res) => {
        wrapAsyncJsonRequestHandler(res, () => {
            return generateJsonDataV2();
        });
    });

    app.get('/api/v1/monitor', (req, res) => {
        wrapAsyncJsonRequestHandler(res, () => {
            return generatePrometheusResponse();
        });
    });

    app.get('/cgi-bin/get_resol_device_information', (req, res) => {
        wrapAsyncRequestHandler(res, () => {
            return generateGetResolDeviceInformationResponse();
        });
    });

    app.get('/dlx/download/download', (req, res) => {
        wrapAsyncRequestHandler(res, () => {
            return generateDLxDownloadDownloadResponse(req.query);
        });
    });

    app.get('/dlx/download/live', (req, res) => {
        wrapAsyncRequestHandler(res, () => {
            return generateDLxDownloadLiveResponse();
        });
    });

    app.get('/current/current_packets.vbus', (req, res) => {
        wrapAsyncRequestHandler(res, () => {
            return generateCurrentPacketsVBusResponse();
        });
    });

    app.post('/cgi-bin/resol-webservice', express.json(), (req, res) => {
        wrapAsyncJsonRequestHandler(res, () => {
            return generateKM2WebserviceResponse(req.body);
        });
    });

    app.get('/api/v1/em', (req, res) => {
        wrapAsyncJsonRequestHandler(res, () => {
            return generateEmSimulatorResponse();
        });
    });

    app.post('/api/v1/em/:subAddress/sensor/:sensorNr/:sensorType', express.json(), (req, res) => {
        wrapAsyncJsonRequestHandler(res, () => {
            return generateEmSimulatorSensorResponse(req.params, req.body);
        });
    });

    app.get('/api/v1/em/:subAddress/relay/:relayNr', (req, res) => {
        wrapAsyncJsonRequestHandler(res, () => {
            return generateEmSimulatorRelayResponse(req.params);
        });
    });

    const server = await promisify(cb => {
        const server = app.listen(config.httpPort, err => cb(err, server));
    });

    /* istanbul ignore else */
    if (onListen) {
        onListen(server.address().port);
    }

    logger.debug('Connect to VBus data source...');

    const hsc = new HeaderSetConsolidator({
        interval: config.loggingInterval,
    });

    const ConnectionClass = connectionClassByName [config.connectionClassName];

    const connection = new ConnectionClass(config.connectionOptions);

    connection.on('packet', (packet) => {
        headerSet.addHeader(packet);
        hsc.addHeader(packet);
        processEmSimulatorPacket(connection, packet);
    });

    hsc.on('headerSet', (headerSet) => {
        /* istanbul ignore else */
        if (config.loggingFilename) {
            writeHeaderSet(config.loggingFilename).then(null, /* istanbul ignore next */ err => {
                logError('Error while trying to write headerset to file:', err);
            });
        }
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
        /* istanbul ignore else */
        if (signal) {
            signal.addEventListener('abort', () => {
                hsc.stopTimer();

                connection.disconnect();

                server.close(() => {
                    resolve();
                });
            }, { once: true });
        }

        /* istanbul ignore else */
        if (onRunning) {
            onRunning();
        }
    });
}


/* istanbul ignore if */
if (require.main === module) {
    main(process.argv.slice(2)).then(null, err => {
        logError('Main function returned with error:', err);
    });
} else {
    module.exports = {
        TestableError,
        config,
        headerSet,
        generateJsonDataV1,
        generateJsonDataV2,
        generatePrometheusResponse,
        generateGetResolDeviceInformationResponse,
        generateDLxDownloadDownloadResponse,
        generateDLxDownloadLiveResponse,
        generateCurrentPacketsVBusResponse,
        generateKM2DataGetCurrentDataResponse,
        generateKM2WebserviceResponse,
        writeHeaderSet,
        wrapAsyncRequestHandler,
        wrapAsyncJsonRequestHandler,
        main,
    };
}
