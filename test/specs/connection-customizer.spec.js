/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var vbus = require('./resol-vbus');
var testUtils = require('./test-utils');



var ConfigurationOptimizer = vbus.ConfigurationOptimizer;
var Connection = vbus.Connection;
var ConnectionCustomizer = vbus.ConnectionCustomizer;
var Datagram = vbus.Datagram;
var Packet = vbus.Packet;



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

    });

});
