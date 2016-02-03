/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var vbus = require('./resol-vbus');
var testUtils = require('./test-utils');



var ConfigurationOptimizer = vbus.ConfigurationOptimizer;
var Connection = vbus.Connection;
var ConnectionCustomizer = vbus.ConnectionCustomizer;
var Datagram = vbus.Datagram;
var Packet = vbus.Packet;



var optimizerPromise = vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);



var promiseTestContext = function(options, callback) {
    return Q.fcall(function() {
        return optimizerPromise;
    }).then(function(optimizer) {
        var context = {};

        var TestableOptimizer = function() {
        };

        TestableOptimizer.prototype = optimizer;

        optimizer = new TestableOptimizer();

        optimizer.completeConfiguration = sinon.spy(optimizer.completeConfiguration);
        optimizer.optimizeLoadConfiguration = sinon.spy(optimizer.optimizeLoadConfiguration);
        optimizer.optimizeSaveConfiguration = sinon.spy(optimizer.optimizeSaveConfiguration);

        var TestableConnectionCustomizer = ConnectionCustomizer.extend({

            transceiveValue: function(inValueInfo, value, options, state) {
                var _this = this;

                return Q.fcall(function() {
                    var valueIndex = inValueInfo.valueIndex;

                    var valueInfo = context.testConfigValueByIndex [valueIndex];

                    if ((value !== undefined) && valueInfo) {
                        valueInfo.value = value;
                    }

                    var dgram = new Datagram({
                        destinationAddress: 0x0020,
                        sourceAddress: _this.deviceAddress,
                        command: 0x0100,
                        valueIndex: valueIndex,
                        value: valueInfo && valueInfo.value,
                    });

                    return dgram;
                });
            },

        });

        var connection = new Connection();

        connection._setConnectionState(Connection.STATE_CONNECTED);

        options = _.defaults({}, options, {
            deviceAddress: 0x7E11,
            connection: connection,
        });

        if (options.optimizer === true) {
            options.optimizer = optimizer;
        }

        var customizer = new TestableConnectionCustomizer(options);

        customizer.transceiveValue = sinon.spy(customizer.transceiveValue);

        _.extend(context, {
            optimizer: optimizer,
            connection: connection,
            customizer: customizer,
        });

        return Q.fcall(function() {
            return optimizer.completeConfiguration(options.testConfig);
        }).then(function(testConfig) {
            _.forEach(testConfig, function(valueInfo) {
                if (valueInfo.value === undefined) {
                    valueInfo.value = null;
                }
            });

            context.testConfig = testConfig;

            context.testConfigValueByIndex = _.reduce(testConfig, function(memo, valueInfo) {
                memo [valueInfo.valueIndex] = valueInfo;
                return memo;
            }, {});

            return callback(customizer, optimizer, context);
        }).then(function() {
            // cleanup
        });
    });
};



describe('ConnectionCustomizer', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(ConnectionCustomizer)
                .to.be.a('function')
                .that.has.a.property('extend')
                    .that.is.a('function');
        });

        it('should have reasonable defaults', function() {
            var customizer = new ConnectionCustomizer();

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

        it('should copy selected properties', function() {
            var options = {
                id: 'ID',
                deviceAddress: 0x1234,
                optimizer: {},
                connection: {},
                maxRounds: 111,
                triesPerValue: 222,
                timeoutPerValue: 333,
                masterTimeout: 444,
            };

            var customizer = new ConnectionCustomizer(options);

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

    describe('#loadConfiguration', function() {

        it('should be a method', function() {
            expect(ConnectionCustomizer.prototype).property('loadConfiguration').a('function');
        });

        promiseIt('should work correctly without optimizer and optimization', function() {
            var options = {
                optimizer: null,
                testConfig: {
                    'Relais_Regler_R1_Handbetrieb': -1285,
                    'Relais_Regler_R2_Handbetrieb': -1297,
                },
            };

            return promiseTestContext(options, function(customizer, optimizer, context) {
                var refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                }];

                return Q.fcall(function() {
                    // manually complete configuration, don't let the customizer do it...
                    return optimizer.completeConfiguration(refConfig);
                }).then(function(config) {
                    var value;
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
                }).then(function(config) {
                    var value;
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

        promiseIt('should work correctly with optimizer and without optimization', function() {
            var options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
                testConfig: {
                    'Relais_Regler_R1_Handbetrieb': -1285,
                    'Relais_Regler_R2_Handbetrieb': -1297,
                },
            };

            return promiseTestContext(options, function(customizer, optimizer, context) {
                var refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                }];

                return Q.fcall(function() {
                    return customizer.loadConfiguration(refConfig, {
                        optimize: false,
                    });
                }).then(function(config) {
                    var value;
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

        promiseIt('should work correctly with optimization', function() {
            this.timeout(testUtils.adaptTimeout(2000));

            var options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
            };

            return promiseTestContext(options, function(customizer, optimizer, context) {
                return Q.fcall(function() {
                    return customizer.loadConfiguration(null, {
                        optimize: true,
                    });
                }).then(function(config) {
                    var value;
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

    describe('#saveConfiguration', function() {

        it('should be a method', function() {
            expect(ConnectionCustomizer.prototype).property('saveConfiguration').a('function');
        });

        promiseIt('should work correctly without optimizer and optimization', function() {
            var options = {
                optimizer: null,
            };

            return promiseTestContext(options, function(customizer, optimizer, context) {
                var refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                    value: 1,
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                    value: 3,
                }];

                return Q.fcall(function() {
                    // manually complete configuration, don't let the customizer do it...
                    return optimizer.completeConfiguration(refConfig);
                }).then(function(config) {
                    var value;
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
                }).then(function(config) {
                    var value;
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

        promiseIt('should work correctly with optimizer and without optimization', function() {
            var options = {
                optimizer: true,  // will be replaced with an object by `promiseTestContext`
            };

            return promiseTestContext(options, function(customizer, optimizer, context) {
                var refConfig = [{
                    id: 'Relais_Regler_R1_Handbetrieb',
                    value: 1,
                }, {
                    id: 'Relais_Regler_R2_Handbetrieb',
                    value: 3,
                }];

                return Q.fcall(function() {
                    return customizer.saveConfiguration(refConfig, null, {
                        optimize: false,
                    });
                }).then(function(config) {
                    var value;
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

        xpromiseIt('should work correctly with optimization but without old config (NYI)', function() {
            throw new Error('NYI');
        });

        xpromiseIt('should work correctly with optimization and old config (NYI)', function() {
            throw new Error('NYI');
        });

    });

    describe('#transceiveConfiguration', function() {

        it('should be a method', function() {
            expect(ConnectionCustomizer.prototype)
                .to.have.a.property('transceiveConfiguration')
                    .that.is.a('function');
        });

        it('should get values correctly', function(done) {
            var deviceAddress = 0x1111;
            var valueId = 0x2222;
            var value = 0x12345678;

            var connection = new Connection();

            connection.pipe(connection);

            var request, response;
            connection.on('datagram', function(datagram) {
                if (datagram.command === 0x0600) {
                    var packet = new Packet({
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
                        value: value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            var customizer = new ConnectionCustomizer({
                deviceAddress: deviceAddress,
                connection: connection,
            });

            var options = {
                action: 'get',
            };

            var callback = sinon.spy(function(config, round) {
                if (round === 1) {
                    config = [
                        { valueIndex: 0x1234, pending: true },
                    ];
                }
                return config;
            });

            setTimeout(function() {
                var datagram = new Datagram({
                    channel: 0,
                    destinationAddress: 0,
                    sourceAddress: deviceAddress,
                    command: 0x0500,
                    valueId: 0,
                    value: 0,
                });

                connection.send(datagram);
            }, 10);

            testUtils.performAsyncTest(done, function() {
                return customizer.transceiveConfiguration(options, callback).then(function(config) {
                    expect(config)
                        .to.be.an('array')
                        .that.has.lengthOf(1);
                });
            });
        });
    });

    describe('#transceiveValue', function() {

        it('should be a method', function() {
            expect(ConnectionCustomizer.prototype)
                .has.a.property('transceiveValue')
                    .that.is.a('function');
        });

        it('should get value correctly', function(done) {
            var deviceAddress = 0x1111;
            var valueId = 0x2222;
            var value = 0x12345678;

            var connection = new Connection();

            connection.pipe(connection);

            var request, response;
            connection.on('datagram', function(datagram) {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value: value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            var customizer = new ConnectionCustomizer({
                deviceAddress: deviceAddress,
                connection: connection,
            });

            var options = {
                action: 'get',
            };

            testUtils.performAsyncTest(done, function() {
                return customizer.transceiveValue(valueId, 0, options).then(function(datagram) {
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
        });

        it('should set value correctly', function(done) {
            var deviceAddress = 0x1111;
            var valueId = 0x2222;
            var value = 0x12345678;

            var connection = new Connection();

            connection.pipe(connection);

            var request, response;
            connection.on('datagram', function(datagram) {
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

            var customizer = new ConnectionCustomizer({
                deviceAddress: deviceAddress,
                connection: connection,
            });

            var options = {
                action: 'set',
            };

            testUtils.performAsyncTest(done, function() {
                return customizer.transceiveValue(valueId, value, options).then(function(datagram) {
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
        });

        it('should contact the master regularly', function(done) {
            var deviceAddress = 0x1111;
            var valueId = 0x2222;
            var value = 0x12345678;

            var connection = new Connection();

            connection.pipe(connection);

            var request, response;
            connection.on('datagram', function(datagram) {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value: value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            var customizer = new ConnectionCustomizer({
                deviceAddress: deviceAddress,
                connection: connection,
            });

            var options = {
                action: 'get',
            };

            var state = {
                masterAddress: 0x4444,
                masterLastContacted: Date.now() - 10000,
            };

            testUtils.performAsyncTest(done, function() {
                return customizer.transceiveValue(valueId, 0, options, state).then(function(datagram) {
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
        });

        it('should release and claim the VBus on timeout', function(done) {
            var deviceAddress = 0x1111;
            var valueId = 0x2222;
            var value = 0x12345678;

            var connection = new Connection();

            connection.pipe(connection);

            var request, response, reclaimed;
            connection.on('datagram', function(datagram) {
                if (datagram.command === 0x0600) {
                    reclaimed = true;

                    var packet = new Packet({
                        channel: 0,
                        destinationAddress: 0x0010,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        frameCount: 0,
                    });

                    connection.send(packet);

                    setTimeout(function() {
                        var busOffer = new Datagram({
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
                            value: value,
                        });

                        connection.send(response);
                    }
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTED);

            var customizer = new ConnectionCustomizer({
                deviceAddress: deviceAddress,
                connection: connection,
            });

            var options = {
                action: 'get',
                actionOptions: {
                    tries: 1,
                    timeout: 100,
                }
            };

            testUtils.performAsyncTest(done, function() {
                return customizer.transceiveValue(valueId, 0, options).then(function(datagram) {
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
        });

        it('should fail if disconnected', function(done) {
            var connection = new Connection();

            var customizer = new ConnectionCustomizer({
                deviceAddress: 0x1111,
                connection: connection,
            });

            var callback = function(err) {
                if (err) {
                    done();
                } else {
                    done(new Error('Expected to throw'));
                }
            };

            testUtils.performAsyncTest(callback, function() {
                return customizer.transceiveValue(0x2222, 0);
            });
        });

        it('should suspend while (re)connecting', function(done) {
            var deviceAddress = 0x1111;
            var valueId = 0x2222;
            var value = 0x12345678;

            var connection = new Connection();

            connection.pipe(connection);

            var request, response;
            connection.on('datagram', function(datagram) {
                if (datagram.destinationAddress === deviceAddress) {
                    request = datagram;

                    response = new Datagram({
                        channel: request.channel,
                        destinationAddress: request.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: request.valueId,
                        value: value,
                    });

                    connection.send(response);
                }
            });

            connection._setConnectionState(Connection.STATE_CONNECTING);

            var customizer = new ConnectionCustomizer({
                deviceAddress: deviceAddress,
                connection: connection,
            });

            var options = {
                action: 'get',
                triesPerValue: 1,
                timeoutPerValue: 200,
            };

            testUtils.performAsyncTest(done, function() {
                var startTime = Date.now();

                setTimeout(function() {
                    connection._setConnectionState(Connection.STATE_CONNECTED);
                }, 100);

                return customizer.transceiveValue(valueId, 0, options).then(function(datagram) {
                    var timeDiff = Date.now() - startTime;

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
        });

        promiseIt('should get a value with a value ID hash', function() {
            var deviceAddress = 0x1111;
            var valueId = 0x2222;
            var value = 0x12345678;

            var connection = new Connection();

            connection.pipe(connection);

            var request, response;
            var onDatagram = sinon.spy(function(datagram) {
                if (datagram.destinationAddress !== deviceAddress) {
                    // nop, ignore
                } else if (datagram.command === 0x1100) {
                    var txDatagram = new Datagram({
                        channel: datagram.channel,
                        destinationAddress: datagram.sourceAddress,
                        sourceAddress: deviceAddress,
                        command: 0x0100,
                        valueId: valueId,
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
                        value: value,
                    });

                    connection.send(response);
                }
            });

            connection.on('datagram', onDatagram);

            connection._setConnectionState(Connection.STATE_CONNECTED);

            var customizer = new ConnectionCustomizer({
                deviceAddress: deviceAddress,
                connection: connection,
            });

            var valueInfo = {
                valueIdHash: 0x76543210,
            };

            var options = {
                action: 'get',
            };

            return customizer.transceiveValue(valueInfo, 0, options).then(function(datagram) {
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

    });

});
