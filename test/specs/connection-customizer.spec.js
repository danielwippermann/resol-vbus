/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    Connection,
    ConnectionCustomizer,
    ConfigurationOptimizerFactory,
    Datagram,
    Packet,
    utils: { promisify },
} = require('./resol-vbus');


const jestExpect = global.expect;
const expect = require('./expect');
const _ = require('./lodash');
const {
    expectPromiseToReject
} = require('./test-utils');



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);



const promiseTestContext = function(options, callback) {
    return promisify(() => {
        return optimizerPromise;
    }).then((optimizer) => {
        const context = {};

        const TestableOptimizer = function() {
        };

        TestableOptimizer.prototype = optimizer;

        optimizer = new TestableOptimizer();

        optimizer.completeConfiguration = sinon.spy(optimizer.completeConfiguration);
        optimizer.optimizeLoadConfiguration = sinon.spy(optimizer.optimizeLoadConfiguration);
        optimizer.optimizeSaveConfiguration = sinon.spy(optimizer.optimizeSaveConfiguration);

        const TestableConnectionCustomizer = ConnectionCustomizer.extend({

            transceiveValue(inValueInfo, value, options, state) {
                const _this = this;

                return promisify(() => {
                    const valueIndex = inValueInfo.valueIndex;

                    const valueInfo = context.testConfigValueByIndex [valueIndex];

                    if ((value !== undefined) && valueInfo) {
                        valueInfo.value = value;
                    }

                    const dgram = new Datagram({
                        destinationAddress: 0x0020,
                        sourceAddress: _this.deviceAddress,
                        command: 0x0100,
                        valueIndex,
                        value: valueInfo && valueInfo.value,
                    });

                    return dgram;
                });
            },

        });

        const connection = new Connection();

        connection._setConnectionState(Connection.STATE_CONNECTED);

        options = _.defaults({}, options, {
            deviceAddress: 0x7E11,
            connection,
        });

        if (options.optimizer === true) {
            options.optimizer = optimizer;
        }

        const customizer = new TestableConnectionCustomizer(options);

        customizer.transceiveValue = sinon.spy(customizer.transceiveValue);

        _.extend(context, {
            optimizer,
            connection,
            customizer,
        });

        return promisify(() => {
            return optimizer.completeConfiguration(options.testConfig);
        }).then((testConfig) => {
            _.forEach(testConfig, (valueInfo) => {
                if (valueInfo.value === undefined) {
                    valueInfo.value = null;
                }
            });

            context.testConfig = testConfig;

            context.testConfigValueByIndex = _.reduce(testConfig, (memo, valueInfo) => {
                memo [valueInfo.valueIndex] = valueInfo;
                return memo;
            }, {});

            return callback(customizer, optimizer, context);
        }).then(() => {
            // cleanup
        });
    });
};



describe('ConnectionCustomizer', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(ConnectionCustomizer)
                .to.be.a('function')
                .that.has.a.property('extend')
                .that.is.a('function');
        });

        it('should have reasonable defaults', () => {
            const customizer = new ConnectionCustomizer();

            expect(customizer)
                .to.have.a.property('id')
                .that.is.equal(null);
            expect(customizer)
                .to.have.a.property('deviceAddress')
                .that.is.equal(0);
            expect(customizer)
                .to.have.a.property('optimizer')
                .that.is.equal(null);
            expect(customizer)
                .to.have.a.property('connection')
                .that.is.equal(null);
            expect(customizer)
                .to.have.a.property('maxRounds')
                .that.is.equal(10);
            expect(customizer)
                .to.have.a.property('triesPerValue')
                .that.is.equal(2);
            expect(customizer)
                .to.have.a.property('timeoutPerValue')
                .that.is.equal(30000);
            expect(customizer)
                .to.have.a.property('masterTimeout')
                .that.is.equal(8000);
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

            expect(customizer)
                .to.have.a.property('id')
                .that.is.equal(options.id);
            expect(customizer)
                .to.have.a.property('deviceAddress')
                .that.is.equal(options.deviceAddress);
            expect(customizer)
                .to.have.a.property('optimizer')
                .that.is.equal(options.optimizer);
            expect(customizer)
                .to.have.a.property('connection')
                .that.is.equal(options.connection);
            expect(customizer)
                .to.have.a.property('maxRounds')
                .that.is.equal(options.maxRounds);
            expect(customizer)
                .to.have.a.property('triesPerValue')
                .that.is.equal(options.triesPerValue);
            expect(customizer)
                .to.have.a.property('timeoutPerValue')
                .that.is.equal(options.timeoutPerValue);
            expect(customizer)
                .to.have.a.property('masterTimeout')
                .that.is.equal(options.masterTimeout);
        });

    });

    describe('#loadConfiguration', () => {

        it('should be a method', () => {
            expect(ConnectionCustomizer.prototype).property('loadConfiguration').a('function');
        });

        it('should work correctly without optimizer and optimization', () => {
            const options = {
                optimizer: null,
                testConfig: {
                    'Relais_Regler_R1_Handbetrieb': -1285,
                    'Relais_Regler_R2_Handbetrieb': -1297,
                },
            };

            return promiseTestContext(options, (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                }];

                return promisify(() => {
                    // manually complete configuration, don't let the customizer do it...
                    return optimizer.completeConfiguration(refConfig);
                }).then((config) => {
                    let value;
                    expect(config).an('array').lengthOf(2);

                    value = config [0];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1285);

                    value = config [1];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1297);

                    return customizer.loadConfiguration(config, {
                        optimize: false,
                    });
                }).then((config) => {
                    let value;
                    expect(config).an('array').lengthOf(2);

                    value = config [0];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1285);
                    expect(value).property('value').equal(-1285);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    value = config [1];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1297);
                    expect(value).property('value').equal(-1297);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    expect(customizer.transceiveValue).property('callCount').equal(2);
                });

            });
        });

        it('should work correctly with optimizer and without optimization', () => {
            const options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
                testConfig: {
                    'Relais_Regler_R1_Handbetrieb': -1285,
                    'Relais_Regler_R2_Handbetrieb': -1297,
                },
            };

            return promiseTestContext(options, (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                }];

                return promisify(() => {
                    return customizer.loadConfiguration(refConfig, {
                        optimize: false,
                    });
                }).then((config) => {
                    let value;
                    expect(config).an('array').lengthOf(2);

                    value = config [0];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1285);
                    expect(value).property('value').equal(-1285);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    value = config [1];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1297);
                    expect(value).property('value').equal(-1297);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    expect(customizer.transceiveValue).property('callCount').equal(2);
                });

            });
        });

        it('should work correctly with optimization', () => {
            const options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
            };

            return promiseTestContext(options, (customizer, optimizer, context) => {
                return promisify(() => {
                    return customizer.loadConfiguration(null, {
                        optimize: true,
                    });
                }).then((config) => {
                    let value;
                    expect(config).an('array').lengthOf(6291);

                    value = config [64];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1285);
                    expect(value).property('value').equal(null);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    value = config [71];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1297);
                    expect(value).property('value').equal(null);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    expect(customizer.transceiveValue).property('callCount').equal(263);
                });

            });
        });

    });

    describe('#saveConfiguration', () => {

        it('should be a method', () => {
            expect(ConnectionCustomizer.prototype).property('saveConfiguration').a('function');
        });

        it('should work correctly without optimizer and optimization', () => {
            const options = {
                optimizer: null,
            };

            return promiseTestContext(options, (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                    value: 1,
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                    value: 3,
                }];

                return promisify(() => {
                    // manually complete configuration, don't let the customizer do it...
                    return optimizer.completeConfiguration(refConfig);
                }).then((config) => {
                    let value;
                    expect(config).an('array').lengthOf(2);

                    value = config [0];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1285);
                    expect(value).property('value').equal(1);

                    value = config [1];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1297);
                    expect(value).property('value').equal(3);

                    return customizer.saveConfiguration(config, null, {
                        optimize: false,
                    });
                }).then((config) => {
                    let value;
                    expect(config).an('array').lengthOf(2);

                    value = config [0];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1285);
                    expect(value).property('value').equal(1);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    value = config [1];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1297);
                    expect(value).property('value').equal(3);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);
                });

            });
        });

        it('should work correctly with optimizer and without optimization', () => {
            const options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
            };

            return promiseTestContext(options, (customizer, optimizer, context) => {
                const refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                    value: 1,
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                    value: 3,
                }];

                return promisify(() => {
                    return customizer.saveConfiguration(refConfig, null, {
                        optimize: false,
                    });
                }).then((config) => {
                    let value;
                    expect(config).an('array').lengthOf(2);

                    value = config [0];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1285);
                    expect(value).property('value').equal(1);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    value = config [1];
                    expect(value).an('object');
                    expect(value).property('valueIndex').equal(1297);
                    expect(value).property('value').equal(3);
                    expect(value).property('pending').equal(false);
                    expect(value).property('transceived').equal(true);

                    expect(customizer.transceiveValue).property('callCount').equal(2);
                });

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

        it('should be a method', () => {
            expect(ConnectionCustomizer.prototype)
                .to.have.a.property('transceiveConfiguration')
                .that.is.a('function');
        });

        it('should get values correctly', () => {
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

            const callback = sinon.spy((config, round) => {
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

            return customizer.transceiveConfiguration(options, callback).then((config) => {
                expect(config)
                    .to.be.an('array')
                    .that.has.lengthOf(1);
            });
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

            const callback = sinon.spy((config, round) => {
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

            jestExpect(reportProgress).toHaveBeenCalledTimes(5);
            jestExpect(reportProgress).toHaveBeenNthCalledWith(1, {
                message: 'OPTIMIZING_VALUES',
                round: 1,
            });
            jestExpect(reportProgress).toHaveBeenNthCalledWith(2, {
                message: 'WAITING_FOR_FREE_BUS',
                tries: 1,
                valueInfo: config [0],
                valueId: undefined,
                valueIndex,
                valueIdHash: undefined,
                valueNr: 1,
                valueCount: 1,
            });
            jestExpect(reportProgress).toHaveBeenNthCalledWith(3, {
                message: 'GETTING_VALUE',
                tries: 1,
                valueInfo: config [0],
                valueId: undefined,
                valueIndex,
                valueIdHash: undefined,
                valueNr: 1,
                valueCount: 1,
            });
            jestExpect(reportProgress).toHaveBeenNthCalledWith(4, {
                message: 'OPTIMIZING_VALUES',
                round: 2,
            });
            jestExpect(reportProgress).toHaveBeenNthCalledWith(5, {
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

            const callback = sinon.spy((config, round) => {
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

            const promise = customizer.transceiveConfiguration(options, callback);

            await expectPromiseToReject(promise, 'Canceled');
        });

    });

    describe('#transceiveValue', () => {

        it('should be a method', () => {
            expect(ConnectionCustomizer.prototype)
                .has.a.property('transceiveValue')
                .that.is.a('function');
        });

        it('should get value correctly', () => {
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

            return customizer.transceiveValue(valueId, 0, options).then((datagram) => {
                expect(datagram.toLiveBuffer()).to.eql(response.toLiveBuffer());

                expect(request).to.be.instanceOf(Datagram);
                expect(request.getId())
                    .to.equal('00_1111_0020_20_0300_0000');
                expect(request)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(request)
                    .to.have.a.property('value')
                    .that.is.equal(0);

                expect(response).to.be.instanceOf(Datagram);
                expect(response.getId())
                    .to.equal('00_0020_1111_20_0100_0000');
                expect(response)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(response)
                    .to.have.a.property('value')
                    .that.is.equal(value);
            });
        });

        it('should set value correctly', () => {
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

            return customizer.transceiveValue(valueId, value, options).then((datagram) => {
                expect(datagram.toLiveBuffer()).to.eql(response.toLiveBuffer());

                expect(request).to.be.instanceOf(Datagram);
                expect(request.getId())
                    .to.equal('00_1111_0020_20_0200_0000');
                expect(request)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(request)
                    .to.have.a.property('value')
                    .that.is.equal(value);

                expect(response).to.be.instanceOf(Datagram);
                expect(response.getId())
                    .to.equal('00_0020_1111_20_0100_0000');
                expect(response)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(response)
                    .to.have.a.property('value')
                    .that.is.equal(value);
            });
        });

        it('should contact the master regularly', () => {
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

            return customizer.transceiveValue(valueId, 0, options, state).then((datagram) => {
                expect(datagram.toLiveBuffer()).to.eql(response.toLiveBuffer());

                expect(request).to.be.instanceOf(Datagram);
                expect(request.getId())
                    .to.equal('00_1111_0020_20_0300_0000');
                expect(request)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(request)
                    .to.have.a.property('value')
                    .that.is.equal(0);

                expect(response).to.be.instanceOf(Datagram);
                expect(response.getId())
                    .to.equal('00_0020_1111_20_0100_0000');
                expect(response)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(response)
                    .to.have.a.property('value')
                    .that.is.equal(value);
            });
        });

        it('should release and claim the VBus on timeout', () => {
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

            return customizer.transceiveValue(valueId, 0, options).then((datagram) => {
                expect(datagram.toLiveBuffer()).to.eql(response.toLiveBuffer());

                expect(request).to.be.instanceOf(Datagram);
                expect(request.getId())
                    .to.equal('00_1111_0020_20_0300_0000');
                expect(request)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(request)
                    .to.have.a.property('value')
                    .that.is.equal(0);

                expect(response).to.be.instanceOf(Datagram);
                expect(response.getId())
                    .to.equal('00_0020_1111_20_0100_0000');
                expect(response)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(response)
                    .to.have.a.property('value')
                    .that.is.equal(value);
            });
        });

        it('should fail if disconnected', () => {
            const connection = new Connection();

            const customizer = new ConnectionCustomizer({
                deviceAddress: 0x1111,
                connection,
            });

            return customizer.transceiveValue(0x2222, 0).then(() => {
                throw new Error('Expected to throw');
            }, () => {
                // nop, expected error
            });
        });

        it('should suspend while (re)connecting', () => {
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

            return customizer.transceiveValue(valueId, 0, options).then((datagram) => {
                const timeDiff = Date.now() - startTime;

                expect(timeDiff)
                    .to.be.within(100, 120);

                expect(datagram.toLiveBuffer()).to.eql(response.toLiveBuffer());

                expect(request).to.be.instanceOf(Datagram);
                expect(request.getId())
                    .to.equal('00_1111_0020_20_0300_0000');
                expect(request)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(request)
                    .to.have.a.property('value')
                    .that.is.equal(0);

                expect(response).to.be.instanceOf(Datagram);
                expect(response.getId())
                    .to.equal('00_0020_1111_20_0100_0000');
                expect(response)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(response)
                    .to.have.a.property('value')
                    .that.is.equal(value);
            });
        });

        it('should get a value with a value ID hash', () => {
            const deviceAddress = 0x1111;
            const valueId = 0x2222;
            const value = 0x12345678;

            const connection = new Connection();

            connection.pipe(connection);

            let request, response;
            const onDatagram = sinon.spy((datagram) => {
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

            return customizer.transceiveValue(valueInfo, 0, options).then((datagram) => {
                expect(onDatagram).property('callCount').equal(4);

                expect(datagram.toLiveBuffer()).to.eql(response.toLiveBuffer());

                expect(request).to.be.instanceOf(Datagram);
                expect(request.getId())
                    .to.equal('00_1111_0020_20_0300_0000');
                expect(request)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(request)
                    .to.have.a.property('value')
                    .that.is.equal(0);

                expect(response).to.be.instanceOf(Datagram);
                expect(response.getId())
                    .to.equal('00_0020_1111_20_0100_0000');
                expect(response)
                    .to.have.a.property('valueId')
                    .that.is.equal(valueId);
                expect(response)
                    .to.have.a.property('value')
                    .that.is.equal(value);
            });
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

            jestExpect(reportProgress).toHaveBeenCalledTimes(1);
            jestExpect(reportProgress).toHaveBeenCalledWith({
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

            const promise = customizer.transceiveValue(valueId, 0, options);

            await expectPromiseToReject(promise, 'Canceled');

            jestExpect(checkCanceled).toHaveBeenCalledTimes(6);
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

            const promise = customizer.transceiveValue(valueId, 0, options);

            await expectPromiseToReject(promise, 'My own cancel exception');

            jestExpect(checkCanceled).toHaveBeenCalledTimes(6);
        });

    });

});
