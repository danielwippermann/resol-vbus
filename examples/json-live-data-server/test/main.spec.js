const fs = require('fs/promises');
const path = require('path');


const fetch = require('node-fetch');


const {
    Packet,
    TcpConnectionEndpoint,
    utils: {
        promisify,
    },
} = require('../../resol-vbus');

const mutableConfig = require('../config.js');

mutableConfig.logLevel = 'crit';

const jsonLiveDataServer = require('../index.js');

const {
    TestableError,
    config,
    headerSet,
    generateJsonDataV1,
    generateJsonDataV2,
    generatePrometheusResponse,
    generateGetResolDeviceInformationResponse,
    generateDLxDownloadDownloadResponse,
    writeHeaderSet,
    wrapAsyncRequestHandler,
    wrapAsyncJsonRequestHandler,
    main,
} = jsonLiveDataServer;


const { expect } = global;


config.packetFieldNameMap = {
    '00_0010_7E21_10_0100_000_2_0': 'Flow set temperature (mapped)',
};


it('should export correctly', () => {
    expect(Object.getOwnPropertyNames(jsonLiveDataServer).sort()).toEqual([
        'TestableError',
        'config',
        'headerSet',
        'generateJsonDataV1',
        'generateJsonDataV2',
        'generatePrometheusResponse',
        'generateGetResolDeviceInformationResponse',
        'generateDLxDownloadDownloadResponse',
        'writeHeaderSet',
        'wrapAsyncRequestHandler',
        'wrapAsyncJsonRequestHandler',
        'main',
    ].sort());

    expect(jsonLiveDataServer.config).toBe(mutableConfig);
});


describe('generateJsonDataV1', () => {

    it('should work correctly', async () => {
        headerSet.removeAllHeaders();

        headerSet.addHeader(new Packet({
            timestamp: new Date(),
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        const result = await generateJsonDataV1();

        expect(result).toBe([
            '[',
            '    {',
            '        "id": "00_0010_7E21_10_0100_000_2_0",',
            '        "name": "Flow set temperature (mapped)",',
            '        "rawValue": 51.300000000000004',
            '    },',
            '    {',
            '        "id": "00_0010_7E21_10_0100_002_1_0",',
            '        "name": "Operating state",',
            '        "rawValue": 3',
            '    }',
            ']',
        ].join('\n'));
    });

});

describe('generateJsonDataV2', () => {

    it('should work correctly', async () => {
        headerSet.removeAllHeaders();

        headerSet.addHeader(new Packet({
            timestamp: new Date(),
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        const result = await generateJsonDataV2();

        expect(result).toBe([
            '[',
            '    {',
            '        "id": "00_0010_7E21_10_0100_000_2_0",',
            '        "name": "Flow set temperature (mapped)",',
            '        "rawValue": 51.300000000000004,',
            '        "unitCode": "DegreesCelsius",',
            '        "unitFamily": "Temperature",',
            '        "unitText": " °C"',
            '    },',
            '    {',
            '        "id": "00_0010_7E21_10_0100_002_1_0",',
            '        "name": "Operating state",',
            '        "rawValue": 3,',
            '        "unitCode": "None",',
            '        "unitFamily": null,',
            '        "unitText": ""',
            '    }',
            ']',
        ].join('\n'));
    });

});

describe('generatePrometheusResponse', () => {

    it('should work correctly', async () => {
        headerSet.removeAllHeaders();

        headerSet.addHeader(new Packet({
            timestamp: new Date(),
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        const result = await generatePrometheusResponse();

        expect(result).toBe([
            '# HELP resol Values as retreived from Resol Solar',
            '# TYPE resol gauge',
            'resol{id="00_0010_7E21_10_0100_000_2_0",name="Flow set temperature"} 51.300000000000004',
            'resol{id="00_0010_7E21_10_0100_002_1_0",name="Operating state"} 3',
            '',
        ].join('\n'));
    });

});

describe('generateGetResolDeviceInformationResponse', () => {

    it('should work correctly', async () => {
        const result = await generateGetResolDeviceInformationResponse();

        expect(result.contentType).toBe('text/plain');
        expect(result.data).toBe([
            'vendor = "RESOL"',
            'product = "DL2"',
            'serial = "001E66000000"',
            'version = "2.1.0"',
            'build = "201311280853"',
            'name = "DL2-001E66000000"',
            'features = "vbus,dl2"',
        ].join('\n'));
    });

});

describe('generateDLxDownloadDownloadResponse', () => {

    it('should work correctly', async () => {
        headerSet.removeAllHeaders();

        const timestamp = new Date(1672896988004);

        headerSet.addHeader(new Packet({
            timestamp,
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        headerSet.timestamp = timestamp;

        const query = {
            source: 'current',
            outputType: 'json',
        };

        const result = await generateDLxDownloadDownloadResponse(query);

        expect(result.contentType).toBe('application/json; charset=utf-8');
        expect(result.data.toString()).toBe([
            /**/ '{',
            /**/     '"headersets":[{',
            /**/        '"timestamp":1672896988.004,',
            /**/         '"packets":[{',
            /**/             '"header_index":0,',
            /**/             '"timestamp":1672896988.004,',
            /**/             '"field_values":[{',
            /**/                 '"field_index":0,',
            /**/                 '"raw_value":51.3,',
            /**/                 '"value":"51.3"',
            /**/             '},{',
            /**/                 '"field_index":1,',
            /**/                 '"raw_value":3,',
            /**/                 '"value":"3"',
            /**/             '}]',
            /**/         '}]',
            /**/     '}],',
            /**/     '"headerset_stats":{',
            /**/         '"headerset_count":1,',
            /**/         '"min_timestamp":1672896988.004,',
            /**/         '"max_timestamp":1672896988.004',
            /**/     '},',
            /**/     '"headers":[{',
            /**/         '"id":"00_0010_7E21_0100",',
            /**/         '"description":"VBus 0: DeltaSol MX [Heizkreis #1]",',
            /**/         '"channel":0,',
            /**/         '"destination_address":16,',
            /**/         '"source_address":32289,',
            /**/         '"protocol_version":16,',
            /**/         '"command":256,',
            /**/         '"info":0,',
            /**/         '"destination_name":"DFA",',
            /**/         '"source_name":"DeltaSol MX [Heizkreis #1]",',
            /**/         '"fields":[{',
            /**/             '"id":"000_2_0",',
            /**/             '"name":"Flow set temperature",',
            /**/             '"unit":" °C",',
            /**/             '"unit_code":"DegreesCelsius"',
            /**/         '},{',
            /**/             '"id":"002_1_0",',
            /**/             '"name":"Operating state",',
            /**/             '"unit":"",',
            /**/             '"unit_code":"None"',
            /**/         '}]',
            /**/     '}],',
            /**/     '"language":"en"',
            /**/ '}',
        ].join(''));
    });

    it('should work correctly for "outputType" of "vbus"', async () => {
        headerSet.removeAllHeaders();

        const timestamp = new Date(1672896988004);

        headerSet.addHeader(new Packet({
            timestamp,
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        headerSet.timestamp = timestamp;

        const query = {
            source: 'current',
            outputType: 'vbus',
        };

        const result = await generateDLxDownloadDownloadResponse(query);

        expect(result.contentType).toBe('application/octet-stream');
        expect(result.data.length).toBe(44);
        expect(result.data.toString('hex')).toBe([
            'a5440e000e00',
            '64436e8085010000',
            'a5661e001e00',
            '64436e8085010000',
            '1000',
            '217e',
            '1000',
            '0001',
            '0400',
            '0000',
            '01020304',
        ].join(''));
    });

    it('should fail correctly for unknown "outputType" values', async () => {
        headerSet.removeAllHeaders();

        const timestamp = new Date(1672896988004);

        headerSet.addHeader(new Packet({
            timestamp,
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        headerSet.timestamp = timestamp;

        const query = {
            source: 'current',
            outputType: 'unknown',
        };

        await expect(async () => {
            await generateDLxDownloadDownloadResponse(query);
        }).rejects.toThrow('Unsupported output type "unknown"');
    });

    it('should fail correctly for unknown "source" values', async () => {
        headerSet.removeAllHeaders();

        const timestamp = new Date(1672896988004);

        headerSet.addHeader(new Packet({
            timestamp,
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        headerSet.timestamp = timestamp;

        const query = {
            source: 'unknown',
            outputType: 'json',
        };

        await expect(async () => {
            await generateDLxDownloadDownloadResponse(query);
        }).rejects.toThrow('Unsupported source "unknown"');
    });

    it('should respect the "dataLanguage" query parameter correctly', async () => {
        headerSet.removeAllHeaders();

        const timestamp = new Date(1672896988004);

        headerSet.addHeader(new Packet({
            timestamp,
            channel: 0,
            destinationAddress: 0x0010,
            sourceAddress: 0x7E21,
            command: 0x0100,
            frameCount: 1,
            frameData: Buffer.from('01020304', 'hex'),
        }));

        headerSet.timestamp = timestamp;

        const query = {
            source: 'current',
            outputType: 'json',
            dataLanguage: 'de',
        };

        const result = await generateDLxDownloadDownloadResponse(query);

        expect(result.contentType).toBe('application/json; charset=utf-8');
        expect(result.data.toString()).toBe([
            /**/ '{',
            /**/     '"headersets":[{',
            /**/        '"timestamp":1672896988.004,',
            /**/         '"packets":[{',
            /**/             '"header_index":0,',
            /**/             '"timestamp":1672896988.004,',
            /**/             '"field_values":[{',
            /**/                 '"field_index":0,',
            /**/                 '"raw_value":51.3,',
            /**/                 '"value":"51,3"',
            /**/             '},{',
            /**/                 '"field_index":1,',
            /**/                 '"raw_value":3,',
            /**/                 '"value":"3"',
            /**/             '}]',
            /**/         '}]',
            /**/     '}],',
            /**/     '"headerset_stats":{',
            /**/         '"headerset_count":1,',
            /**/         '"min_timestamp":1672896988.004,',
            /**/         '"max_timestamp":1672896988.004',
            /**/     '},',
            /**/     '"headers":[{',
            /**/         '"id":"00_0010_7E21_0100",',
            /**/         '"description":"VBus 0: DeltaSol MX [Heizkreis #1]",',
            /**/         '"channel":0,',
            /**/         '"destination_address":16,',
            /**/         '"source_address":32289,',
            /**/         '"protocol_version":16,',
            /**/         '"command":256,',
            /**/         '"info":0,',
            /**/         '"destination_name":"DFA",',
            /**/         '"source_name":"DeltaSol MX [Heizkreis #1]",',
            /**/         '"fields":[{',
            /**/             '"id":"000_2_0",',
            /**/             '"name":"Vorlauf-Soll-Temperatur",',
            /**/             '"unit":" °C",',
            /**/             '"unit_code":"DegreesCelsius"',
            /**/         '},{',
            /**/             '"id":"002_1_0",',
            /**/             '"name":"Betriebsstatus",',
            /**/             '"unit":"",',
            /**/             '"unit_code":"None"',
            /**/         '}]',
            /**/     '}],',
            /**/     '"language":"de"',
            /**/ '}',
        ].join(''));
    });

});

describe('writeHeaderSet', () => {

    it('should work correctly', async () => {
        const filename = path.resolve(__dirname, `tmp-${process.pid}.json`);

        try {
            headerSet.removeAllHeaders();

            headerSet.addHeader(new Packet({
                timestamp: new Date(),
                channel: 0,
                destinationAddress: 0x0010,
                sourceAddress: 0x7E21,
                command: 0x0100,
                frameCount: 1,
                frameData: Buffer.from('01020304', 'hex'),
            }));

            await writeHeaderSet(filename);

            const contents = await fs.readFile(filename, 'utf-8');

            expect(contents).toBe([
                '[',
                '    {',
                '        "id": "00_0010_7E21_10_0100_000_2_0",',
                '        "name": "Flow set temperature (mapped)",',
                '        "rawValue": 51.300000000000004',
                '    },',
                '    {',
                '        "id": "00_0010_7E21_10_0100_002_1_0",',
                '        "name": "Operating state",',
                '        "rawValue": 3',
                '    }',
                ']',
            ].join('\n'));
        } finally {
            try {
                await fs.unlink(filename);
            } catch (err) {
                // ignore
            }
        }
    });

});

describe('wrapAsyncRequestHandler', () => {

    it('should work correctly', async () => {
        const result = {
            contentType: 'application/octet-stream',
            data: Buffer.from('ResponseData', 'utf-8'),
        };

        const res1 = await new Promise(resolve => {
            const res = {
                status: jest.fn(() => res),
                type: jest.fn(() => res),
                end: jest.fn(() => resolve(res)),
            };

            wrapAsyncRequestHandler(res, async () => {
                return result;
            });
        });

        expect(res1.status.mock.calls).toHaveLength(1);
        expect(res1.status.mock.calls [0]).toHaveLength(1);
        expect(res1.status.mock.calls [0] [0]).toBe(200);

        expect(res1.type.mock.calls).toHaveLength(1);
        expect(res1.type.mock.calls [0]).toHaveLength(1);
        expect(res1.type.mock.calls [0] [0]).toBe(result.contentType);

        expect(res1.end.mock.calls).toHaveLength(1);
        expect(res1.end.mock.calls [0]).toHaveLength(1);
        expect(res1.end.mock.calls [0] [0]).toBe(result.data);

        const res2 = await new Promise(resolve => {
            const res = {
                status: jest.fn(() => res),
                type: jest.fn(() => res),
                end: jest.fn(() => resolve(res)),
            };

            wrapAsyncRequestHandler(res, async () => {
                throw new TestableError('Test error');
            });
        });

        expect(res2.status.mock.calls).toHaveLength(1);
        expect(res2.status.mock.calls [0]).toHaveLength(1);
        expect(res2.status.mock.calls [0] [0]).toBe(500);

        expect(res2.type.mock.calls).toHaveLength(1);
        expect(res2.type.mock.calls [0]).toHaveLength(1);
        expect(res2.type.mock.calls [0] [0]).toBe('text/plain');

        expect(res2.end.mock.calls).toHaveLength(1);
        expect(res2.end.mock.calls [0]).toHaveLength(1);
        expect(res2.end.mock.calls [0] [0]).toBe('Error: Test error');
    });

});

describe('wrapAsyncJsonRequestHandler', () => {

    it('should work correctly', async () => {
        const result = '{"response":"data"}';

        const res1 = await new Promise(resolve => {
            const res = {
                status: jest.fn(() => res),
                type: jest.fn(() => res),
                end: jest.fn(() => resolve(res)),
            };

            wrapAsyncJsonRequestHandler(res, async () => {
                return result;
            });
        });

        expect(res1.status.mock.calls).toHaveLength(1);
        expect(res1.status.mock.calls [0]).toHaveLength(1);
        expect(res1.status.mock.calls [0] [0]).toBe(200);

        expect(res1.type.mock.calls).toHaveLength(1);
        expect(res1.type.mock.calls [0]).toHaveLength(1);
        expect(res1.type.mock.calls [0] [0]).toBe('application/json');

        expect(res1.end.mock.calls).toHaveLength(1);
        expect(res1.end.mock.calls [0]).toHaveLength(1);
        expect(res1.end.mock.calls [0] [0]).toBe(result);
    });

});

describe('main', () => {

    it('should work correctly', async () => {
        // console.log('Starting endpoint...');

        const endpoint = new TcpConnectionEndpoint({
            port: 0,
        });

        const connectionInfos = [];
        endpoint.on('connection', info => {
            connectionInfos.push(info);
        });

        function send(data) {
            for (const info of connectionInfos) {
                info.socket.write(data);
            }
        }

        await endpoint.start();

        // console.log(`Endpoint started on port ${endpoint.port}`);

        const originalConfig = Object.assign({}, config);

        Object.assign(config, {
            logLevel: 'error',
            httpPort: 0,
            loggingInterval: 1000,
            loggingFilename: path.resolve(__dirname, `tmp/logging-${process.pid}.vbus`),
            connectionClassName: 'TcpConnection',
            connectionOptions: {
                host: '127.0.0.1',
                port: endpoint.port,
                channel: 0,
                password: 'vbus',
            },
        });

        const ac = new AbortController();

        let onListenResolve;
        const onListenPromise = new Promise(resolve => { onListenResolve = resolve; });

        let onRunningResolve;
        const onRunningPromise = new Promise(resolve => { onRunningResolve = resolve; });

        // console.log('Running main...');

        const mainPromise = main({
            signal: ac.signal,
            onListen(port) {
                onListenResolve(port);
            },
            onRunning() {
                onRunningResolve();
            },
        });

        // console.log('Waiting for onListen...');

        const port = await onListenPromise;

        // console.log(`onListen called with port ${port}...`);

        // console.log('Waiting for onRunning...');

        await onRunningPromise;

        try {
            const startTimestamp = Date.now();

            // console.log('onRunning called');

            headerSet.removeAllHeaders();

            let onAddHeaderResolve;
            const onAddHeaderPromise = new Promise(resolve => { onAddHeaderResolve = resolve; });

            headerSet.once('addHeader', header => onAddHeaderResolve(header));

            const packet1 = new Packet({
                timestamp: new Date(),
                channel: 0,
                destinationAddress: 0x0010,
                sourceAddress: 0x7E21,
                command: 0x0100,
                frameCount: 1,
                frameData: Buffer.from('01020304', 'hex'),
            });

            send(packet1.toLiveBuffer());

            await onAddHeaderPromise;

            const headers = headerSet.getSortedHeaders();

            expect(headers).toHaveLength(1);

            const timestamp = new Date(1672896988004);
            headers [0].timestamp = timestamp;
            headerSet.timestamp = timestamp;

            const urlPrefix = `http://127.0.0.1:${port}`;

            const httpResponse1 = await fetch(`${urlPrefix}/cgi-bin/get_resol_device_information`);

            expect(httpResponse1.ok).toBe(true);

            const response1 = await httpResponse1.text();

            expect(response1).toBe([
                'vendor = "RESOL"',
                'product = "DL2"',
                'serial = "001E66000000"',
                'version = "2.1.0"',
                'build = "201311280853"',
                'name = "DL2-001E66000000"',
                'features = "vbus,dl2"',
            ].join('\n'));

            const httpResponse2 = await fetch(`${urlPrefix}/api/v1/live-data`);

            expect(httpResponse2.ok).toBe(true);

            const response2 = await httpResponse2.text();

            expect(response2).toBe([
                '[',
                '    {',
                '        "id": "00_0010_7E21_10_0100_000_2_0",',
                '        "name": "Flow set temperature (mapped)",',
                '        "rawValue": 51.300000000000004',
                '    },',
                '    {',
                '        "id": "00_0010_7E21_10_0100_002_1_0",',
                '        "name": "Operating state",',
                '        "rawValue": 3',
                '    }',
                ']',
            ].join('\n'));

            const httpResponse3 = await fetch(`${urlPrefix}/api/v2/live-data`);

            expect(httpResponse3.ok).toBe(true);

            const response3 = await httpResponse3.text();

            expect(response3).toBe([
                '[',
                '    {',
                '        "id": "00_0010_7E21_10_0100_000_2_0",',
                '        "name": "Flow set temperature (mapped)",',
                '        "rawValue": 51.300000000000004,',
                '        "unitCode": "DegreesCelsius",',
                '        "unitFamily": "Temperature",',
                '        "unitText": " °C"',
                '    },',
                '    {',
                '        "id": "00_0010_7E21_10_0100_002_1_0",',
                '        "name": "Operating state",',
                '        "rawValue": 3,',
                '        "unitCode": "None",',
                '        "unitFamily": null,',
                '        "unitText": ""',
                '    }',
                ']',
            ].join('\n'));

            const httpResponse4 = await fetch(`${urlPrefix}/api/v1/monitor`);

            expect(httpResponse4.ok).toBe(true);

            const response4 = await httpResponse4.text();

            expect(response4).toBe([
                '# HELP resol Values as retreived from Resol Solar',
                '# TYPE resol gauge',
                'resol{id="00_0010_7E21_10_0100_000_2_0",name="Flow set temperature"} 51.300000000000004',
                'resol{id="00_0010_7E21_10_0100_002_1_0",name="Operating state"} 3',
                '',
            ].join('\n'));

            const httpResponse5 = await fetch(`${urlPrefix}/dlx/download/download?source=current&outputType=vbus`);

            expect(httpResponse5.ok).toBe(true);

            const response5 = await httpResponse5.arrayBuffer();

            const buffer5 = Buffer.from(response5);

            expect(buffer5.length).toBe(44);
            expect(buffer5.toString('hex')).toBe([
                'a5440e000e00',
                '64436e8085010000',
                'a5661e001e00',
                '64436e8085010000',
                '1000',
                '217e',
                '1000',
                '0001',
                '0400',
                '0000',
                '01020304',
            ].join(''));

            // wait for headerset to be written to file after a second
            const delay = 1200 - (Date.now() - startTimestamp);
            if (delay > 0) {
                await promisify(cb => setTimeout(() => cb(), delay));
            }
        } finally {
            // console.log('Aborting main...');

            ac.abort();

            await mainPromise;

            // console.log('main promise resolved');

            endpoint.stop();

            try {
                await fs.unlink(config.loggingFilename);
            } catch (err) {
                // ignore
            }

            Object.assign(config, originalConfig);
        }
    });

});
