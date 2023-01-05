/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const fs = require('fs');
const os = require('os');


const express = require('express');
const winston = require('winston');


const {
    DLxJsonConverter,
    HeaderSet,
    HeaderSetConsolidator,
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
