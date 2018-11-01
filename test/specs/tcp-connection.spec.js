/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const _ = require('./lodash');
const Q = require('./q');
const vbus = require('./resol-vbus');



const TcpConnection = vbus.TcpConnection;
const TcpConnectionEndpoint = vbus.TcpConnectionEndpoint;



const testConnection = function(callback) {
    const endpoint = new TcpConnectionEndpoint({
        port: 0,
    });

    const infos = [];

    const onConnection = function(info) {
        infos.push(info);
    };

    endpoint.on('connection', onConnection);

    let onEpiConnection;

    const createEndpointInfoPromise = function() {
        const deferred = Q.defer();

        if (onEpiConnection) {
            endpoint.removeListener('connection', onEpiConnection);
        }

        onEpiConnection = function(info) {
            onEpiConnection = null;

            deferred.resolve(info);
        };

        endpoint.once('connection', onEpiConnection);

        return deferred.promise;
    };

    const connection = new TcpConnection({
        host: '127.0.0.1',
    });

    const promise = Q.fcall(function() {
        return endpoint.start();
    }).then(function() {
        connection.port = endpoint.port;

        expect(connection.connectionState).to.equal(TcpConnection.STATE_DISCONNECTED);

        return callback(connection, endpoint, createEndpointInfoPromise);
    });
    
    return vbus.utils.promiseFinally(promise, function() {
        connection.disconnect();
        endpoint.stop();

        _.forEach(infos, function(info) {
            info.socket.end();
        });

        if (onEpiConnection) {
            endpoint.removeListener('connection', onEpiConnection);
        }

        endpoint.removeListener('connection', onConnection);
    });
};



describe('TcpConnection', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(TcpConnection).to.be.a('function');
            expect(TcpConnection.extend).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            const connection = new TcpConnection();

            expect(connection.host).to.equal(null);
            expect(connection.port).to.equal(7053);
            expect(connection.viaTag).to.equal(null);
            expect(connection.password).to.equal(null);
            expect(connection.rawVBusDataOnly).to.equal(false);
        });

        it('should copy selected options', function() {
            const options = {
                host: 'HOST',
                port: 12345,
                viaTag: 'VIATAG',
                password: 'PASSWORD',
                rawVBusDataOnly: true,
                junk: 'JUNK',
            };

            const connection = new TcpConnection(options);

            expect(connection.host).to.equal(options.host);
            expect(connection.port).to.equal(options.port);
            expect(connection.viaTag).to.equal(options.viaTag);
            expect(connection.password).to.equal(options.password);
            expect(connection.rawVBusDataOnly).to.equal(options.rawVBusDataOnly);
            expect(connection.junk).to.equal(undefined);
        });

    });

    describe('#connect', function() {

        it('should be a method', function() {
            expect(TcpConnection.prototype).to.have.a.property('connect').that.is.a('function');
        });

        it('should work correctly if disconnected', function() {
            return testConnection(function(connection, endpoint, createEndpointInfoPromise) {
                const onConnectionState = sinon.spy();

                const options = {
                    viaTag: 'VIATAG',
                    password: 'PASSWORD',
                };

                _.extend(connection, options);
                connection.channelListCallback = sinon.spy(function(channels, done) {
                    done(null, '9:Test');
                });

                connection.on('connectionState', onConnectionState);

                const epiPromise = createEndpointInfoPromise();

                const promise = Q.fcall(function() {
                    return connection.connect();
                }).then(function() {
                    return epiPromise;
                }).then(function(epi) {
                    expect(connection.connectionState).to.equal(TcpConnection.STATE_CONNECTED);
                    expect(onConnectionState.callCount).to.equal(2);
                    expect(onConnectionState.firstCall.args [0]).to.equal(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.secondCall.args [0]).to.equal(TcpConnection.STATE_CONNECTED);

                    expect(epi.viaTag).to.equal(options.viaTag);
                    expect(epi.password).to.equal(options.password);
                    expect(epi.channel).to.equal('9');

                    expect(connection.channelListCallback.callCount).to.equal(1);
                });
                
                return vbus.utils.promiseFinally(promise, function() {
                    connection.removeListener('connectionState', onConnectionState);
                });
            });
        });

        it('should throw if not disconnected', function() {
            return testConnection(function(connection, endpoint) {
                return Q.fcall(function() {
                    return connection.connect();
                }).then(function() {
                    expect(function() {
                        connection.connect();
                    }).to.throw();
                });
            });
        });

    });

    describe('#disconnect', function() {

        it('should be a method', function() {
            expect(TcpConnection.prototype).to.have.a.property('disconnect').that.is.a('function');
        });

        it('should work correctly if disconnected', function() {
            return testConnection(function(connection) {
                connection.disconnect();

                expect(connection.connectionState).to.equal(TcpConnection.STATE_DISCONNECTED);
            });
        });

        it('should work correctly if connected', function() {
            return testConnection(function(connection) {
                const onConnectionState = sinon.spy();

                connection.on('connectionState', onConnectionState);

                const promise = Q.fcall(function() {
                    return connection.connect();
                }).then(function() {
                    return connection.disconnect();
                });
                
                return vbus.utils.promiseFinally(promise, function() {
                    connection.removeListener('connectionState', onConnectionState);
                });
            });
        });

    });

    describe('Automatic reconnection', function() {

        it('should reconnect when connected', function() {
            return testConnection(function(connection, endpoint, createEndpointInfoPromise) {
                const onConnectionState = sinon.spy();

                connection.on('connectionState', onConnectionState);

                let epiPromise = createEndpointInfoPromise();

                const promise = Q.fcall(function() {
                    return connection.connect();
                }).then(function() {
                    return epiPromise;
                }).then(function(epi) {
                    expect(onConnectionState.callCount).to.equal(2);
                    expect(onConnectionState.firstCall.args [0]).to.equal(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.secondCall.args [0]).to.equal(TcpConnection.STATE_CONNECTED);

                    epiPromise = createEndpointInfoPromise();

                    epi.socket.end();
                }).then(function() {
                    return epiPromise;
                }).then(function() {
                    expect(onConnectionState.callCount).to.equal(4);
                    expect(onConnectionState.getCall(2).args [0]).to.equal(TcpConnection.STATE_INTERRUPTED);
                    expect(onConnectionState.getCall(3).args [0]).to.equal(TcpConnection.STATE_RECONNECTING);

                    return connection.disconnect();
                });
                
                return vbus.utils.promiseFinally(promise, function() {
                    connection.removeListener('connectionState', onConnectionState);
                });
            });

        });

    });

});
