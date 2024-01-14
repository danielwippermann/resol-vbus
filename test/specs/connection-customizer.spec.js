/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Connection,
    ConnectionCustomizer,
    ConfigurationOptimizerFactory,
    Customizer,
    Datagram,
    Packet,
} = require('./resol-vbus');


const {
    expect,
    expectElapsedTimeToBeWithin,
    expectOwnPropertyNamesToEqual,
    itShouldBeAClass,
} = require('./test-utils');



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);



const promiseTestContext = async function(options, callback) {
    const baseOptimizer = await optimizerPromise;

    const context = {};

    const optimizer = Object.create(baseOptimizer, {

        // completeConfiguration: jest.fn(baseOptimizer.completeConfiguration),

        // optimizeLoadConfiguration: jest.fn(baseOptimizer.optimizeLoadConfiguration),

        // optimizeSaveConfiguration: jest.fn(baseOptimizer.optimizeSaveConfiguration),

    });

    class TestableConnectionCustomizer extends ConnectionCustomizer {

        async transceiveValue(inValueInfo, value, options, state) {
            const { valueIndex } = inValueInfo;

            const valueInfo = context.testConfigValueByIndex [valueIndex];

            if ((value !== undefined) && valueInfo) {
                valueInfo.value = value;
            }

            const dgram = new Datagram({
                destinationAddress: 0x0020,
                sourceAddress: this.deviceAddress,
                command: 0x0100,
                valueIndex,
                value: valueInfo && valueInfo.value,
            });

            return dgram;
        }

    }

    const connection = new Connection();

    connection._setConnectionState(Connection.STATE_CONNECTED);

    options = {
        deviceAddress: 0x7E11,
        connection,
        ...options,
    };

    if (options.optimizer === true) {
        options.optimizer = optimizer;
    }

    const customizer = new TestableConnectionCustomizer(options);

    customizer.transceiveValue = jest.fn(customizer.transceiveValue);

    Object.assign(context, {
        optimizer,
        connection,
        customizer,
    });

    const testConfig = await optimizer.completeConfiguration(options.testConfig);

    for (const valueInfo of testConfig) {
        if (valueInfo.value === undefined) {
            valueInfo.value = null;
        }
    }

    context.testConfig = testConfig;

    context.testConfigValueByIndex = testConfig.reduce((memo, valueInfo) => {
        memo [valueInfo.valueIndex] = valueInfo;
        return memo;
    }, {});

    return await callback(customizer, optimizer, context);
};



describe('ConnectionCustomizer', () => {

    itShouldBeAClass(ConnectionCustomizer, Customizer, {
        connection: null,
        maxRounds: 10,
        triesPerValue: 2,
        timeoutPerValue: 30000,
        masterTimeout: 8000,
        constructor: Function,
        _loadConfiguration: Function,
        _saveConfiguration: Function,
        transceiveConfiguration: Function,
        transceiveValue: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const customizer = new ConnectionCustomizer();

            expectOwnPropertyNamesToEqual(customizer, [
                'id',
                'deviceAddress',
                'optimizer',
                'connection',
                'maxRounds',
                'triesPerValue',
                'timeoutPerValue',
                'masterTimeout',

                // EventEmitter
                '_events',
                '_eventsCount',
                '_maxListeners',
            ]);

            expect(customizer.id).toBe(null);
            expect(customizer.deviceAddress).toBe(0);
            expect(customizer.optimizer).toBe(null);
            expect(customizer.connection).toBe(null);
            expect(customizer.maxRounds).toBe(10);
            expect(customizer.triesPerValue).toBe(2);
            expect(customizer.timeoutPerValue).toBe(30000);
            expect(customizer.masterTimeout).toBe(8000);
        });

        it('should copy selected properties', () => {
            const options = {
                id: 'ID',
                deviceAddress: 0x1234,
                optimizer: {},
                connection: {},
                maxRounds: 111,
                triesPerValue: 222,
                timeoutPerValue: 333,
                masterTimeout: 444,
            };

            const customizer = new ConnectionCustomizer(options);

            expect(customizer.id).toBe(options.id);
            expect(customizer.deviceAddress).toBe(options.deviceAddress);
            expect(customizer.optimizer).toBe(options.optimizer);
            expect(customizer.connection).toBe(options.connection);
            expect(customizer.maxRounds).toBe(options.maxRounds);
            expect(customizer.triesPerValue).toBe(options.triesPerValue);
            expect(customizer.timeoutPerValue).toBe(options.timeoutPerValue);
            expect(customizer.masterTimeout).toBe(options.masterTimeout);
        });

    });

    describe('#loadConfiguration', () => {

        it('should work correctly without optimizer and optimization', async () => {
            const options = {
                optimizer: null,
                testConfig: {
                    'Relais_Regler_R1_Handbetrieb': -1285,
                    'Relais_Regler_R2_Handbetrieb': -1297,
                },
            };

            return await promiseTestContext(options, async (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                }];

                // manually complete configuration, don't let the customizer do it...
                const config1 = await optimizer.completeConfiguration(refConfig);

                let value;
                expect(config1).toHaveLength(2);

                value = config1 [0];
                expect(value.valueIndex).toBe(1285);

                value = config1 [1];
                expect(value.valueIndex).toBe(1297);

                const config2 = await customizer.loadConfiguration(config1, {
                    optimize: false,
                });

                expect(config2).toHaveLength(2);

                value = config2 [0];
                expect(value.valueIndex).toBe(1285);
                expect(value.value).toBe(-1285);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                value = config2 [1];
                expect(value.valueIndex).toBe(1297);
                expect(value.value).toBe(-1297);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                expect(customizer.transceiveValue.mock.calls.length).toBe(2);
            });
        });

        it('should work correctly with optimizer and without optimization', async () => {
            const options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
                testConfig: {
                    'Relais_Regler_R1_Handbetrieb': -1285,
                    'Relais_Regler_R2_Handbetrieb': -1297,
                },
            };

            return await promiseTestContext(options, async (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                }];

                const config1 = await customizer.loadConfiguration(refConfig, {
                    optimize: false,
                });

                let value;
                expect(config1).toHaveLength(2);

                value = config1 [0];
                expect(value.valueIndex).toBe(1285);
                expect(value.value).toBe(-1285);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                value = config1 [1];
                expect(value.valueIndex).toBe(1297);
                expect(value.value).toBe(-1297);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                expect(customizer.transceiveValue.mock.calls.length).toBe(2);
            });
        });

        it('should work correctly with optimization', async () => {
            const options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
            };

            return await promiseTestContext(options, async (customizer, optimizer, context) => {
                const config1 = await customizer.loadConfiguration(null, {
                    optimize: true,
                });

                let value;
                expect(config1).toHaveLength(6291);

                value = config1 [64];
                expect(value.valueIndex).toBe(1285);
                expect(value.value).toBe(null);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                value = config1 [71];
                expect(value.valueIndex).toBe(1297);
                expect(value.value).toBe(null);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                expect(customizer.transceiveValue.mock.calls.length).toBe(263);
            });
        });

    });

    describe('#saveConfiguration', () => {

        it('should work correctly without optimizer and optimization', async () => {
            const options = {
                optimizer: null,
            };

            return await promiseTestContext(options, async (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                    value: 1,
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                    value: 3,
                }];

                // manually complete configuration, don't let the customizer do it...
                const config1 = await optimizer.completeConfiguration(refConfig);

                let value;
                expect(config1).toHaveLength(2);

                value = config1 [0];
                expect(value.valueIndex).toBe(1285);
                expect(value.value).toBe(1);

                value = config1 [1];
                expect(value.valueIndex).toBe(1297);
                expect(value.value).toBe(3);

                const config2 = await customizer.saveConfiguration(config1, null, {
                    optimize: false,
                });

                expect(config2).toHaveLength(2);

                value = config2 [0];
                expect(value.valueIndex).toBe(1285);
                expect(value.value).toBe(1);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                value = config2 [1];
                expect(value.valueIndex).toBe(1297);
                expect(value.value).toBe(3);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);
            });
        });

        it('should work correctly with optimizer and without optimization', async () => {
            const options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
            };

            return await promiseTestContext(options, async (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                    value: 1,
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                    value: 3,
                }];

                const config1 = await customizer.saveConfiguration(refConfig, null, {
                    optimize: false,
                });

                let value;
                expect(config1).toHaveLength(2);

                value = config1 [0];
                expect(value.valueIndex).toBe(1285);
                expect(value.value).toBe(1);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                value = config1 [1];
                expect(value.valueIndex).toBe(1297);
                expect(value.value).toBe(3);
                expect(value.pending).toBe(false);
                expect(value.transceived).toBe(true);

                expect(customizer.transceiveValue.mock.calls.length).toBe(2);
            });
        });

        xit('should work correctly with optimization but without old config (NYI)', () => {
            throw new Error('NYI');
        });

        xit('should work correctly with optimization and old config (NYI)', () => {
            throw new Error('NYI');
        });

    });

    describe('#transceiveConfiguration', () => {

        it('should get values correctly', async () => {
            const deviceAddress = 0x1111;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            connection.on('datagram', (datagram) => {
                if (datagram.command === 0x0600) {
                    const packet = new Packet({
                        channel: 0,
                        destinationAddress: 0x0010,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        frameCount: 0,
                    });

                    connection.send(packet);
                } else if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const options = {
                action: 'get',
            };

            const callback = jest.fn((config, round) => {
                if (round === 1) {
                    config = [
                        { valueIndex: 0x1234, pending: true },
                    ];
                }
                return config;
            });

            setTimeout(() => {
                const datagram = new Datagram({
                    channel: 0,
                    destinationAddress: 0,
                    sourceAddress: deviceAddress,
                    command: 0x0500,
                    valueId: 0,
                    value: 0,
                });

                connection.send(datagram);
            }, 10);

            const config = await customizer.transceiveConfiguration(options, callback);

            expect(config).toHaveLength(1);
        });

        it('should report progress correctly', async () => {
            const deviceAddress = 0x1111;
            const valueIndex = 0x1234;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            connection.on('datagram', (datagram) => {
                if (datagram.command === 0x0600) {
                    const packet = new Packet({
                        channel: 0,
                        destinationAddress: 0x0010,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        frameCount: 0,
                    });

                    connection.send(packet);
                } else if (datagram.destinationAddress === deviceAddress) {
                    const response = new Datagram({
                        channel: datagram.channel,
                        destinationAddress: datagram.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: datagram.valueId,
                        value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const reportProgress = jest.fn();

            const options = {
                action: 'get',
                reportProgress,
            };

            const callback = jest.fn((config, round) => {
                if (round === 1) {
                    config = [
                        { valueIndex, pending: true },
                    ];
                }
                return config;
            });

            setTimeout(() => {
                const datagram = new Datagram({
                    channel: 0,
                    destinationAddress: 0,
                    sourceAddress: deviceAddress,
                    command: 0x0500,
                    valueId: 0,
                    value: 0,
                });

                connection.send(datagram);
            }, 10);

            const config = await customizer.transceiveConfiguration(options, callback);

            expect(reportProgress).toHaveBeenCalledTimes(5);
            expect(reportProgress).toHaveBeenNthCalledWith(1, {
                message: 'OPTIMIZING_VALUES',
                round: 1,
            });
            expect(reportProgress).toHaveBeenNthCalledWith(2, {
                message: 'WAITING_FOR_FREE_BUS',
                tries: 1,
                valueInfo: config [0],
                valueId: undefined,
                valueIndex,
                valueIdHash: undefined,
                valueNr: 1,
                valueCount: 1,
            });
            expect(reportProgress).toHaveBeenNthCalledWith(3, {
                message: 'GETTING_VALUE',
                tries: 1,
                valueInfo: config [0],
                valueId: undefined,
                valueIndex,
                valueIdHash: undefined,
                valueNr: 1,
                valueCount: 1,
            });
            expect(reportProgress).toHaveBeenNthCalledWith(4, {
                message: 'OPTIMIZING_VALUES',
                round: 2,
            });
            expect(reportProgress).toHaveBeenNthCalledWith(5, {
                message: 'RELEASING_BUS',
            });
        });

        it('should cancel correctly', async () => {
            const deviceAddress = 0x1111;
            const valueIndex = 0x1234;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let isCanceled = false;

            connection.on('datagram', (datagram) => {
                if (datagram.command === 0x0600) {
                    const packet = new Packet({
                        channel: 0,
                        destinationAddress: 0x0010,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        frameCount: 0,
                    });

                    connection.send(packet);
                } else if (datagram.destinationAddress === deviceAddress) {
                    const response = new Datagram({
                        channel: datagram.channel,
                        destinationAddress: datagram.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: datagram.valueId,
                        value,
                    });

                    connection.send(response);

                    isCanceled = true;
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const checkCanceled = jest.fn(() => isCanceled);

            const options = {
                action: 'get',
                checkCanceled,
            };

            const callback = jest.fn((config, round) => {
                if (round === 1) {
                    config = [
                        { valueIndex, pending: true },
                    ];
                }
                return config;
            });

            setTimeout(() => {
                const datagram = new Datagram({
                    channel: 0,
                    destinationAddress: 0,
                    sourceAddress: deviceAddress,
                    command: 0x0500,
                    valueId: 0,
                    value: 0,
                });

                connection.send(datagram);
            }, 10);

            await expect(async () => {
                await customizer.transceiveConfiguration(options, callback);
            }).rejects.toThrow('Canceled');
        });

    });

    describe('#transceiveValue', () => {

        it('should get value correctly', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            connection.on('datagram', (datagram) => {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const options = {
                action: 'get',
            };

            const datagram = await customizer.transceiveValue(valueId, 0, options);

            expect(datagram.toLiveBuffer()).toEqual(response.toLiveBuffer());

            expect(request).toBeInstanceOf(Datagram);
            expect(request.getId()).toBe('00_1111_0020_20_0300_0000');
            expect(request.valueId).toBe(valueId);
            expect(request.value).toBe(0);

            expect(response).toBeInstanceOf(Datagram);
            expect(response.getId()).toBe('00_0020_1111_20_0100_0000');
            expect(response.valueId).toBe(valueId);
            expect(response.value).toBe(value);
        });

        it('should set value correctly', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            connection.on('datagram', (datagram) => {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value: request.value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const options = {
                action: 'set',
            };

            const datagram = await customizer.transceiveValue(valueId, value, options);

            expect(datagram.toLiveBuffer()).toEqual(response.toLiveBuffer());

            expect(request).toBeInstanceOf(Datagram);
            expect(request.getId()).toBe('00_1111_0020_20_0200_0000');
            expect(request.valueId).toBe(valueId);
            expect(request.value).toBe(value);

            expect(response).toBeInstanceOf(Datagram);
            expect(response.getId()).toBe('00_0020_1111_20_0100_0000');
            expect(response.valueId).toBe(valueId);
            expect(response.value).toBe(value);
        });

        it('should contact the master regularly', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            connection.on('datagram', (datagram) => {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const options = {
                action: 'get',
            };

            const state = {
                masterAddress: 0x4444,
                masterLastContacted: Date.now() - 10000,
            };

            const datagram = await customizer.transceiveValue(valueId, 0, options, state);

            expect(datagram.toLiveBuffer()).toEqual(response.toLiveBuffer());

            expect(request).toBeInstanceOf(Datagram);
            expect(request.getId()).toBe('00_1111_0020_20_0300_0000');
            expect(request.valueId).toBe(valueId);
            expect(request.value).toBe(0);

            expect(response).toBeInstanceOf(Datagram);
            expect(response.getId()).toBe('00_0020_1111_20_0100_0000');
            expect(response.valueId).toBe(valueId);
            expect(response.value).toBe(value);
        });

        it('should release and claim the VBus on timeout', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response, reclaimed;
            connection.on('datagram', (datagram) => {
                if (datagram.command === 0x0600) {
                    reclaimed = true;

                    const packet = new Packet({
                        channel: 0,
                        destinationAddress: 0x0010,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        frameCount: 0,
                    });

                    connection.send(packet);

                    setTimeout(() => {
                        const busOffer = new Datagram({
                            channel: 0,
                            destinationAddress: 0x0000,
                            sourceAddress: deviceAddress,
                            command: 0x0500,
                            valueId: 0,
                            value: 0,
                        });

                        connection.send(busOffer);
                    }, 10);
                } else if (datagram.destinationAddress === deviceAddress) {
                    if (!reclaimed) {
                        // nop
                    } else {
                        request = datagram;

                        response = new Datagram({
                            channel: request.channel,
                            destinationAddress: request.sourceAddress,
                            sourceAddress: deviceAddress,
                            command: 0x0100,
                            valueId: request.valueId,
                            value,
                        });

                        connection.send(response);
                    }
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const options = {
                action: 'get',
                actionOptions: {
                    tries: 1,
                    timeout: 100,
                }
            };

            const datagram = await customizer.transceiveValue(valueId, 0, options);

            expect(datagram.toLiveBuffer()).toEqual(response.toLiveBuffer());

            expect(request).toBeInstanceOf(Datagram);
            expect(request.getId()).toBe('00_1111_0020_20_0300_0000');
            expect(request.valueId).toBe(valueId);
            expect(request.value).toBe(0);

            expect(response).toBeInstanceOf(Datagram);
            expect(response.getId()).toBe('00_0020_1111_20_0100_0000');
            expect(response.valueId).toBe(valueId);
            expect(response.value).toBe(value);
        });

        it('should fail if disconnected', async () => {
            const connection = new Connection();

            const customizer = new ConnectionCustomizer({
                deviceAddress: 0x1111,
                connection,
            });

            await expect(async () => {
                await customizer.transceiveValue(0x2222, 0);
            }).rejects.toThrow();
        });

        it('should suspend while (re)connecting', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            connection.on('datagram', (datagram) => {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTING);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const options = {
                action: 'get',
                triesPerValue: 1,
                timeoutPerValue: 200,
            };

            const startTime = Date.now();

            setTimeout(() => {
                connection._setConnectionState(Connection.STATE_CONNECTED);
            }, 100);

            const datagram = await customizer.transceiveValue(valueId, 0, options);

            expectElapsedTimeToBeWithin(startTime, 100, 120);

            expect(datagram.toLiveBuffer()).toEqual(response.toLiveBuffer());

            expect(request).toBeInstanceOf(Datagram);
            expect(request.getId()).toBe('00_1111_0020_20_0300_0000');
            expect(request.valueId).toBe(valueId);
            expect(request.value).toBe(0);

            expect(response).toBeInstanceOf(Datagram);
            expect(response.getId()).toBe('00_0020_1111_20_0100_0000');
            expect(response.valueId).toBe(valueId);
            expect(response.value).toBe(value);
        });

        it('should get a value with a value ID hash', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            const onDatagram = jest.fn((datagram) => {
                if (datagram.destinationAddress !== deviceAddress) {
                    // nop, ignore
                } else if (datagram.command === 0x1100) {
                    const txDatagram = new Datagram({
                        channel: datagram.channel,
                        destinationAddress: datagram.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId,
                        value: datagram.value,
                    });

                    connection.send(txDatagram);
                } else if (datagram.command === 0x0300) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value,
                    });

                    connection.send(response);
                }
            });

            connection.on('datagram', onDatagram);

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const valueInfo = {
                valueIdHash: 0x76543210,
            };

            const options = {
                action: 'get',
            };

            const datagram = await customizer.transceiveValue(valueInfo, 0, options);

            expect(onDatagram.mock.calls.length).toBe(4);

            expect(datagram.toLiveBuffer()).toEqual(response.toLiveBuffer());

            expect(request).toBeInstanceOf(Datagram);
            expect(request.getId()).toBe('00_1111_0020_20_0300_0000');
            expect(request.valueId).toBe(valueId);
            expect(request.value).toBe(0);

            expect(response).toBeInstanceOf(Datagram);
            expect(response.getId()).toBe('00_0020_1111_20_0100_0000');
            expect(response.valueId).toBe(valueId);
            expect(response.value).toBe(value);
        });

        it('should report progress', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            connection.on('datagram', (datagram) => {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const reportProgress = jest.fn();

            const options = {
                action: 'get',
                reportProgress,
            };

            await customizer.transceiveValue(valueId, 0, options);

            expect(reportProgress).toHaveBeenCalledTimes(1);
            expect(reportProgress).toHaveBeenCalledWith({
                message: 'GETTING_VALUE',
                tries: 1,
                valueIndex: valueId,
                valueInfo: {
                    valueIndex: valueId,
                }
            });
        });

        it('should be cancelable', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;

            const connection = new Connection();

            connection.pipe(connection);

            let counter = 0, isCanceled = false;
            connection.on('datagram', (datagram) => {
                if (datagram.destinationAddress === deviceAddress) {
                    counter += 1;
                    if (counter >= 2) {
                        isCanceled = true;
                    }
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const checkCanceled = jest.fn(() => {
                return isCanceled;
            });

            const options = {
                action: 'get',
                checkCanceled,
            };

            await expect(async () => {
                await customizer.transceiveValue(valueId, 0, options);
            }).rejects.toThrow('Canceled');

            expect(checkCanceled).toHaveBeenCalledTimes(6);
        });

        it('should be cancelable with own exception', async () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;

            const connection = new Connection();

            connection.pipe(connection);

            let counter = 0, cancelException = null;
            connection.on('datagram', (datagram) => {
                if (datagram.destinationAddress === deviceAddress) {
                    counter += 1;
                    if (counter >= 2) {
                        cancelException = new Error('My own cancel exception');
                    }
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            const customizer = new ConnectionCustomizer({
                deviceAddress,
                connection,
            });

            const checkCanceled = jest.fn(() => {
                if (cancelException) {
                    throw cancelException;
                }
                return false;
            });

            const options = {
                action: 'get',
                checkCanceled,
            };

            await expect(async () => {
                await customizer.transceiveValue(valueId, 0, options);
            }).rejects.toThrow('My own cancel exception');

            expect(checkCanceled).toHaveBeenCalledTimes(6);
        });

    });

});
