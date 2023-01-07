const fs = require('fs/promises');
const path = require('path');

const {
    Connection,
    Datagram,
    Packet,
    TcpConnection,
    TcpConnectionEndpoint,
} = require('../../../resol-vbus');
const { ArgParser } = require('../../src/arg-parser');

const logger = require('../../src/logger');
const mainModule = require('../../src/main');
const { hex } = require('../../src/utils');
const { valueInfoCacheDirname } = require('../../src/value-info-cache');

const {
    expect,
    expectObjectOwnPropertyNamesToEqual,
} = require('./test-utils');

async function runTestableConfiguration(fn) {
    try {
        await fs.unlink(path.resolve(__dirname, '../../cache/7e11_12345678.json'));
    } catch (err) {
        // ignore
    }

    const endpoint = new TcpConnectionEndpoint({

        port: 0,

    });

    const connectionInfos = [];
    const datagramLog = [];

    endpoint.on('connection', info => {
        const connection = new Connection();

        connection.on('datagram', dgram => {
            datagramLog.push(`${dgram.getId().slice(0, 20)}_${hex(dgram.valueId, 4)}_${hex(dgram.value, 8)}`);
        });

        connection._setConnectionState(Connection.STATE_CONNECTED);

        connection.pipe(info.socket);
        info.socket.pipe(connection);

        info.connection = connection;

        let aborted = false;
        info.abort = () => { aborted = true; };

        async function runner() {
            while (!aborted) {
                const packet = new Packet({
                    destinationAddress: 0x0010,
                    sourceAddress: 0x7E11,
                    command: 0x0100,
                    frameCount: 1,
                    frameData: Buffer.from('01020304', 'hex'),
                });

                await connection.transceive(packet, {
                    timeout: 100,
                    tries: 1,
                });

                let txDgram = new Datagram({
                    destinationAddress: 0x0000,
                    sourceAddress: 0x7E11,
                    command: 0x0500,
                    valueId: 0,
                    value: 0,
                });

                let rxDgram = await connection.transceive(txDgram, {
                    timeout: 100,
                    tries: 1,
                    async filterDatagram(dgram) {
                        return dgram;
                    },
                });

                while (rxDgram) {
                    txDgram = new Datagram({
                        destinationAddress: rxDgram.sourceAddress,
                        sourceAddress: rxDgram.destinationAddress,
                        command: 0x0000,
                        valueId: 0,
                        value: 0,
                    });

                    if (rxDgram.command === 0x0200) {
                        txDgram.command = 0x0100;
                        txDgram.valueId = rxDgram.valueId;
                        txDgram.value = rxDgram.value;
                    } else if (rxDgram.command === 0x0300) {
                        txDgram.command = 0x0100;
                        txDgram.valueId = rxDgram.valueId;
                        if (rxDgram.valueId === 0) {
                            txDgram.value = 0x12345678;
                        } else {
                            txDgram.value = rxDgram.valueId;
                        }
                    } else if (rxDgram.command === 0x0600) {
                        break;
                    } else if (rxDgram.command === 0x1100) {
                        txDgram.command = 0x0100;
                        txDgram.valueId = rxDgram.value & 0x7FFF;
                        txDgram.value = rxDgram.value;
                    } else {
                        txDgram = null;
                    }

                    rxDgram = await connection.transceive(txDgram, {
                        timeout: 100,
                        tries: 1,
                        async filterDatagram(dgram) {
                            return dgram;
                        },
                    });
                }
            }
        }

        info.runnerPromise = runner();

        connectionInfos.push(info);
    });

    await endpoint.start();

    const options = {
        connectionClassName: 'TcpConnection',
        connectionOptions: {
            host: '127.0.0.1',
            port: endpoint.port,
            channel: 0,
            password: 'vbus',
        },
    };

    const originalPrintUsage = ArgParser.prototype.printUsage;

    class PrintUsageLongjumpError extends Error {}

    let printUsageCall = null;
    ArgParser.prototype.printUsage = function (message, usage) {
        printUsageCall = { message, usage };
        throw new PrintUsageLongjumpError();
    };

    try {
        let result;
        try {
            result = await fn(options);
        } catch (err) {
            if (err instanceof PrintUsageLongjumpError) {
                // ignore
            } else {
                throw err;
            }
        }

        return {
            result,
            datagramLog,
            printUsageCall,
        };
    } finally {
        ArgParser.prototype.printUsage = originalPrintUsage;

        for (const info of connectionInfos) {
            info.abort();

            await info.runnerPromise;

            info.socket.destroy();
        }

        await endpoint.stop();

        try {
            await fs.unlink(path.resolve(valueInfoCacheDirname, '7e11_12345678.json'));
        } catch (err) {
            // ignore
        }
    }
}

it('should export correctly', () => {
    expectObjectOwnPropertyNamesToEqual(mainModule, [
        'connect',
        'parseJob',
        'main',
    ]);
});

describe('connect', () => {

    const { connect } = mainModule;

    it('should work correctly', async () => {
        await runTestableConfiguration(async (options) => {
            const result1 = await connect(options);

            expect(result1).toBeInstanceOf(TcpConnection);

            await result1.disconnect();
        });

        await expect(async () => {
            await connect({
                connectionClassName: 'UnknownClass',
            });
        }).rejects.toThrow('Unable to lookup Connection class: UnknownClass');

        await expect(async () => {
            await connect({
                connectionClassName: 'utils',
            });
        }).rejects.toThrow('Unexpected type of Connection class: object');

        await expect(async () => {
            await connect({
                connectionClassName: 'Converter',
            });
        }).rejects.toThrow('Not a Connection sub-class: Converter');
    });

});

describe('parseJob', () => {

    const { parseJob } = mainModule;

    it('should work correctly', async () => {
        const result1 = await parseJob(path.resolve(__dirname, '../fixtures/load-job1.json'));

        expect(result1).toHaveLength(1);

        const result2 = await parseJob(path.resolve(__dirname, '../fixtures/load-job2.json'));

        expect(result2).toHaveLength(1);

        await expect(async () => {
            await parseJob(path.resolve(__dirname, '../fixtures/invalid-job1.json'));
        }).rejects.toThrow('Unsupported job type: null');

        await expect(async () => {
            await parseJob(path.resolve(__dirname, '../fixtures/invalid-job2.json'));
        }).rejects.toThrow('Unsupported job type: string');
    });

});

describe('main', () => {

    const { main } = mainModule;

    async function runTestableMain(...argv) {
        return await runTestableConfiguration(async (options) => {
            return await main(argv.flat(), options);
        });
    }

    it('should handle --help correctly', async () => {
        const result1 = await runTestableMain('--help');

        expect(result1.printUsageCall.message).toBe(undefined);
        expect(result1.printUsageCall.usage).toEqual([
            'USAGE: customizer2 [--debug] [--out <filename>] <action> <filename>',
            '',
            'OPTIONS:',
            '    --help               Print this help',
            '    --debug              Print more progress information',
            '    --out <filename>     Write result to file',
            '',
            'ARGUMENTS:',
            '    <action>             Either \"load\" or \"save\"',
            '    <filename>           File containing list of values to load or save',
            '',
        ]);
    });

    it('should handle --debug correctly', async () => {
        expect(logger.level).toBe(4);

        const result1 = await runTestableMain([
            '--debug',
            '--help',
        ]);

        expect(logger.level).toBe(7);

        logger.level = 4;
    });

    it('should handle --out correctly', async () => {
        const filename = `tmp-${process.pid}.json`;

        const result1 = await runTestableMain([
            '--out',
            filename,
            'load',
            path.resolve(__dirname, '../fixtures/load-job1.json'),
        ]);

        expect(result1.datagramLog).toEqual([
            '00_7E11_0020_20_0300_0000_00000000',
            '00_7E11_0020_20_1100_0000_48d66991',
            '00_7E11_0020_20_0300_0000_00000000',
            '00_7E11_0020_20_0300_6991_00000000',
            '00_7E11_0020_20_0600_0000_00000000',
        ]);

        const contents1 = await fs.readFile(filename, 'utf-8');

        await fs.unlink(filename);

        expect(contents1).toBe([
            '[',
            '    {',
            '        "valueId": "Schema",',
            '        "value": 27025',
            '    }',
            ']',
        ].join('\n'));
    });

    it('should fail with multiple --out correctly', async () => {
        const result1 = await runTestableMain([
            '--out',
            'tmp.json',
            '--out',
        ]);

        expect(result1.printUsageCall.message).toBe('Must not provide --out more than once');
    });

    it('should fail --out without argument correctly', async () => {
        const result1 = await runTestableMain([
            '--out',
        ]);

        expect(result1.printUsageCall.message).toBe('Missing argument for --out <filename>');
    });

    it('should fail for unknown options', async () => {
        const result1 = await runTestableMain([
            '--unknown',
        ]);

        expect(result1.printUsageCall.message).toBe('Unknown option: --unknown');
    });

    it('should fail for unexpected arguments', async () => {
        const result1 = await runTestableMain([
            'action',
            'actionFilename',
            'unexpected',
        ]);

        expect(result1.printUsageCall.message).toBe('Unexpected argument: unexpected');
    });

    it('should fail without any action', async () => {
        const result1 = await runTestableMain([
        ]);

        expect(result1.printUsageCall.message).toBe('No action provided');
    });

    it('should fail without any action filename', async () => {
        const result1 = await runTestableMain([
            'action',
        ]);

        expect(result1.printUsageCall.message).toBe('Must provide filename for action action');
    });

    it('should handle load action correctly', async () => {
        const result1 = await runTestableMain([
            'load',
            path.resolve(__dirname, '../fixtures/load-job1.json'),
        ]);

        expect(result1.datagramLog).toEqual([
            '00_7E11_0020_20_0300_0000_00000000',
            '00_7E11_0020_20_1100_0000_48d66991',
            '00_7E11_0020_20_0300_0000_00000000',
            '00_7E11_0020_20_0300_6991_00000000',
            '00_7E11_0020_20_0600_0000_00000000',
        ]);
    });

    it('should handle save action correctly', async () => {
        const result1 = await runTestableMain([
            'save',
            path.resolve(__dirname, '../fixtures/save-job1.json'),
        ]);

        expect(result1.datagramLog).toEqual([
            '00_7E11_0020_20_0300_0000_00000000',
            '00_7E11_0020_20_1100_0000_48d66991',
            '00_7E11_0020_20_0300_0000_00000000',
            '00_7E11_0020_20_0200_6991_00000001',
            '00_7E11_0020_20_0600_0000_00000000',
        ]);
    });

    it('should fail with unknown action', async () => {
        const result1 = await runTestableMain([
            'unknown',
            'filename',
        ]);

        expect(result1.printUsageCall.message).toBe('Unknown action: unknown');
    });



});

