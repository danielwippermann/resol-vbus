/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Duplex = require('stream').Duplex;


const expect = require('./expect');
const Q = require('./q');
const vbus = require('./resol-vbus');
const testUtils = require('./test-utils');



const SerialConnection = vbus.SerialConnection;



const SerialPortStub = vbus.extend(Duplex, {

    constructor(path, options, onCompletion) {
        const _this = this;

        Duplex.call(this);

        process.nextTick(() => {
            _this.emit('open');

            onCompletion(null);
        });
    },

    close() {
        // nop
    },

    _read() {
        // nop
    },

});



const TestableSerialConnection = SerialConnection.extend({

    createSerialPort(path, options, onCompletion) {
        return new SerialPortStub(path, options, onCompletion);
    }

});



const testConnection = function(done, callback) {
    const connection = new TestableSerialConnection({
        path: testUtils.serialPortPath,
    });

    Q.fcall(() => {
        expect(connection.connectionState).to.equal(SerialConnection.STATE_DISCONNECTED);

        return callback(connection);
    }).finally(() => {
        connection.disconnect();
    }).then(() => {
        done();
    }, (err) => {
        done(err);
    });
};



const ifHasSerialPortIt = testUtils.ifHasSerialPortIt;



describe('SerialConnection', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(SerialConnection)
                .to.be.a('function')
                .that.has.a.property('extend')
                .that.is.a('function');
        });

        it('should have reasonable defaults', () => {
            const connection = new SerialConnection();

            expect(connection)
                .to.have.a.property('channel')
                .that.is.equal(0);
            expect(connection)
                .to.have.a.property('selfAddress')
                .that.is.equal(0x0020);
            expect(connection)
                .to.have.a.property('path')
                .that.is.equal(null);
        });

    });

    describe('#connect', () => {

        it('should be a method', () => {
            expect(SerialConnection.prototype).to.have.a.property('connect').that.is.a('function');
        });

        ifHasSerialPortIt('should work correctly if disconnected', (done) => {
            testConnection(done, (connection, endpoint) => {
                const onConnectionState = sinon.spy();

                connection.on('connectionState', onConnectionState);

                return Q.fcall(() => {
                    return connection.connect();
                }).then(() => {
                    expect(connection.connectionState).to.equal(SerialConnection.STATE_CONNECTED);
                    expect(onConnectionState.callCount).to.equal(2);
                    expect(onConnectionState.firstCall.args [0]).to.equal(SerialConnection.STATE_CONNECTING);
                    expect(onConnectionState.secondCall.args [0]).to.equal(SerialConnection.STATE_CONNECTED);
                }).finally(() => {
                    connection.removeListener('connectionState', onConnectionState);
                });
            });
        });

        ifHasSerialPortIt('should throw if not disconnected', (done) => {
            testConnection(done, (connection, endpoint) => {
                return Q.fcall(() => {
                    return connection.connect();
                }).then(() => {
                    expect(() => {
                        connection.connect();
                    }).to.throw();
                });
            });
        });

    });

    describe('#disconnect', () => {

        it('should be a method', () => {
            expect(SerialConnection.prototype).to.have.a.property('disconnect').that.is.a('function');
        });

        ifHasSerialPortIt('should work correctly if disconnected', (done) => {
            testConnection(done, (connection) => {
                connection.disconnect();

                expect(connection.connectionState).to.equal(SerialConnection.STATE_DISCONNECTED);
            });
        });

        ifHasSerialPortIt('should work correctly if connected', (done) => {
            testConnection(done, (connection) => {
                const onConnectionState = sinon.spy();

                connection.on('connectionState', onConnectionState);

                return Q.fcall(() => {
                    return connection.connect();
                }).then(() => {
                    return connection.disconnect();
                }).finally(() => {
                    connection.removeListener('connectionState', onConnectionState);
                });
            });
        });

    });

    describe('Automatic reconnection', () => {

        ifHasSerialPortIt('should reconnect when connected', (done) => {
            testConnection(done, (connection) => {
                const onConnectionState = sinon.spy();

                connection.on('connectionState', onConnectionState);

                return Q.fcall(() => {
                    return connection.connect();
                }).then(() => {
                    return connection.createConnectedPromise();
                }).then((socket) => {
                    expect(onConnectionState.callCount).to.equal(2);
                    expect(onConnectionState.firstCall.args [0]).to.equal(SerialConnection.STATE_CONNECTING);
                    expect(onConnectionState.secondCall.args [0]).to.equal(SerialConnection.STATE_CONNECTED);

                    onConnectionState.reset();

                    connection.serialPort.emit('error');
                }).then(() => {
                    return connection.createConnectedPromise();
                }).then(() => {
                    expect(onConnectionState.callCount).to.equal(3);
                    expect(onConnectionState.firstCall.args [0]).to.equal(SerialConnection.STATE_INTERRUPTED);
                    expect(onConnectionState.secondCall.args [0]).to.equal(SerialConnection.STATE_RECONNECTING);
                    expect(onConnectionState.thirdCall.args [0]).to.equal(SerialConnection.STATE_CONNECTED);
                }).finally(() => {
                    connection.removeListener('connectionState', onConnectionState);
                });
            });

        });

    });

});
