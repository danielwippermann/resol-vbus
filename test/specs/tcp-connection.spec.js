/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Connection,
    TcpConnection,
    TcpConnectionEndpoint,
} = require('./resol-vbus');


const {
    expect,
    itShouldBeAClass,
    expectOwnPropertyNamesToEqual,
} = require('./test-utils');



async function testConnection(callback) {
    const endpoint = new TcpConnectionEndpoint({
        port: 0,
        channels: [ null, null, null, null, null, null, null, null, null, 'Test' ],
    });

    const infos = [];

    const onConnection = function(info) {
        infos.push(info);
    };

    endpoint.on('connection', onConnection);

    let onEpiConnection;

    const createEndpointInfoPromise = function() {
        return new Promise((resolve) => {
            if (onEpiConnection) {
                endpoint.removeListener('connection', onEpiConnection);
            }

            onEpiConnection = function(info) {
                onEpiConnection = null;

                resolve(info);
            };

            endpoint.once('connection', onEpiConnection);
        });
    };

    const connection = new TcpConnection({
        host: '127.0.0.1',
    });

    try {
        await endpoint.start();

        connection.port = endpoint.port;

        expect(connection.connectionState).toBe(TcpConnection.STATE_DISCONNECTED);

        return await callback(connection, endpoint, createEndpointInfoPromise);
    } finally {
        connection.disconnect();
        endpoint.stop();

        for (const info of infos) {
            info.socket.end();
        }

        if (onEpiConnection) {
            endpoint.removeListener('connection', onEpiConnection);
        }

        endpoint.removeListener('connection', onConnection);
    }
}



describe('TcpConnection', () => {

    itShouldBeAClass(TcpConnection, Connection, {
        host: null,
        port: null,
        viaTag: null,
        password: null,
        channelListCallback: null,
        channel: 0,
        rawVBusDataOnly: false,
        tlsOptions: null,
        reconnectTimeout: 0,
        reconnectTimeoutIncr: 10000,
        reconnectTimeoutMax: 60000,
        disableReconnect: false,
        constructor: Function,
        connect: Function,
        disconnect: Function,
        _connect: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const connection = new TcpConnection();

            expectOwnPropertyNamesToEqual(connection, [
                'host',
                'port',
                'viaTag',
                'password',
                'channelListCallback',
                'channel',
                'rawVBusDataOnly',
                'tlsOptions',
                'disableReconnect',

                'selfAddress',
            ], [
                // base class related
                '_events',
                '_eventsCount',
                '_maxListeners',
                '_readableState',
                '_writableState',
                'allowHalfOpen',
            ]);

            expect(connection.host).toBe(null);
            expect(connection.port).toBe(7053);
            expect(connection.viaTag).toBe(null);
            expect(connection.password).toBe(null);
            expect(connection.channelListCallback).toBe(null);
            expect(connection.channel).toBe(0);
            expect(connection.rawVBusDataOnly).toBe(false);
            expect(connection.tlsOptions).toBe(null);
            expect(connection.disableReconnect).toBe(false);
            expect(connection.selfAddress).toBe(0x0020);
        });

        it('should copy selected options', () => {
            const options = {
                host: 'HOST',
                port: 12345,
                viaTag: 'VIATAG',
                password: 'PASSWORD',
                channelListCallback: async () => '9',
                channel: '9',
                rawVBusDataOnly: true,
                tlsOptions: {},
                disableReconnect: true,
                selfAddress: 0x0022,
                junk: 'JUNK',
            };

            const connection = new TcpConnection(options);

            expect(connection.host).toBe(options.host);
            expect(connection.port).toBe(options.port);
            expect(connection.viaTag).toBe(options.viaTag);
            expect(connection.password).toBe(options.password);
            expect(connection.channelListCallback).toBe(options.channelListCallback);
            expect(connection.channel).toBe(options.channel);
            expect(connection.rawVBusDataOnly).toBe(options.rawVBusDataOnly);
            expect(connection.tlsOptions).toBe(options.tlsOptions);
            expect(connection.disableReconnect).toBe(options.disableReconnect);
            expect(connection.selfAddress).toBe(options.selfAddress);
            expect(connection.junk).toBe(undefined);
        });

    });

    describe('#connect', () => {

        it('should work correctly if disconnected', async () => {
            await testConnection(async (connection, endpoint, createEndpointInfoPromise) => {
                const onConnectionState = jest.fn();

                const options = {
                    viaTag: 'VIATAG',
                    password: 'PASSWORD',
                    channel: 9,
                };

                Object.assign(connection, options);

                connection.on('connectionState', onConnectionState);

                const epiPromise = createEndpointInfoPromise();

                try {
                    await connection.connect();

                    const epi = await epiPromise;

                    expect(connection.connectionState).toBe(TcpConnection.STATE_CONNECTED);
                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(TcpConnection.STATE_CONNECTED);

                    expect(epi.viaTag).toBe(options.viaTag);
                    expect(epi.password).toBe(options.password);
                    expect(epi.channel).toBe('9');
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

        it('should work correctly with sync channelListCallback and string response', async () => {
            await testConnection(async (connection, endpoint, createEndpointInfoPromise) => {
                const onConnectionState = jest.fn();

                const options = {
                    viaTag: 'VIATAG',
                    password: 'PASSWORD',
                    channelListCallback: jest.fn((channels, done) => {
                        done(null, '9:Test');
                    }),
                };

                Object.assign(connection, options);

                connection.on('connectionState', onConnectionState);

                const epiPromise = createEndpointInfoPromise();

                try {
                    await connection.connect();

                    const epi = await epiPromise;

                    expect(connection.connectionState).toBe(TcpConnection.STATE_CONNECTED);
                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(TcpConnection.STATE_CONNECTED);

                    expect(epi.viaTag).toBe(options.viaTag);
                    expect(epi.password).toBe(options.password);
                    expect(epi.channel).toBe('9');

                    expect(connection.channelListCallback.mock.calls.length).toBe(1);
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

        it('should work correctly with sync, but delayed channelListCallback', async () => {
            await testConnection(async (connection, endpoint, createEndpointInfoPromise) => {
                const onConnectionState = jest.fn();

                const options = {
                    viaTag: 'VIATAG',
                    password: 'PASSWORD',
                    channelListCallback: jest.fn((channels, done) => {
                        process.nextTick(() => {
                            done(null, '9:Test');
                        });
                    }),
                };

                Object.assign(connection, options);

                connection.on('connectionState', onConnectionState);

                const epiPromise = createEndpointInfoPromise();

                try {
                    await connection.connect();

                    const epi = await epiPromise;

                    expect(connection.connectionState).toBe(TcpConnection.STATE_CONNECTED);
                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(TcpConnection.STATE_CONNECTED);

                    expect(epi.viaTag).toBe(options.viaTag);
                    expect(epi.password).toBe(options.password);
                    expect(epi.channel).toBe('9');

                    expect(connection.channelListCallback.mock.calls.length).toBe(1);
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

        it('should work correctly with async channelListCallback and number response', async () => {
            await testConnection(async (connection, endpoint, createEndpointInfoPromise) => {
                const onConnectionState = jest.fn();

                const options = {
                    viaTag: 'VIATAG',
                    password: 'PASSWORD',
                    channelListCallback: jest.fn(async (channels) => {
                        return 9;
                    }),
                };

                Object.assign(connection, options);

                connection.on('connectionState', onConnectionState);

                const epiPromise = createEndpointInfoPromise();

                try {
                    await connection.connect();

                    const epi = await epiPromise;

                    expect(connection.connectionState).toBe(TcpConnection.STATE_CONNECTED);
                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(TcpConnection.STATE_CONNECTED);

                    expect(epi.viaTag).toBe(options.viaTag);
                    expect(epi.password).toBe(options.password);
                    expect(epi.channel).toBe('9');

                    expect(connection.channelListCallback.mock.calls.length).toBe(1);
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

        it('should work correctly with async channelListCallback and object response', async () => {
            await testConnection(async (connection, endpoint, createEndpointInfoPromise) => {
                const onConnectionState = jest.fn();

                const options = {
                    viaTag: 'VIATAG',
                    password: 'PASSWORD',
                    channelListCallback: jest.fn(async (channels) => {
                        return { channel: 0, someOtherOptionsThatWillBeIgnored: true };
                    }),
                };

                Object.assign(connection, options);

                connection.on('connectionState', onConnectionState);

                const epiPromise = createEndpointInfoPromise();

                try {
                    await connection.connect();

                    const epi = await epiPromise;

                    expect(connection.connectionState).toBe(TcpConnection.STATE_CONNECTED);
                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(TcpConnection.STATE_CONNECTED);

                    expect(epi.viaTag).toBe(options.viaTag);
                    expect(epi.password).toBe(options.password);
                    expect(epi.channel).toBe(undefined);

                    expect(connection.channelListCallback.mock.calls.length).toBe(1);
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

        it('should work correctly with async channelListCallback and error response', async () => {
            await testConnection(async (connection, endpoint, createEndpointInfoPromise) => {
                const onConnectionState = jest.fn();

                const options = {
                    viaTag: 'VIATAG',
                    password: 'PASSWORD',
                    channelListCallback: jest.fn(async (channels) => {
                        throw new Error('No suitable channel found');
                    }),
                };

                Object.assign(connection, options);

                connection.on('connectionState', onConnectionState);

                try {
                    await expect(async () => {
                        await connection.connect();
                    }).rejects.toThrow('No suitable channel found');

                    expect(connection.connectionState).toBe(TcpConnection.STATE_DISCONNECTED);
                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(TcpConnection.STATE_DISCONNECTED);

                    expect(connection.channelListCallback.mock.calls.length).toBe(1);
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

        it('should throw if not disconnected', async () => {
            await testConnection(async (connection, endpoint) => {
                await connection.connect();

                await expect(async () => {
                    await connection.connect();
                }).rejects.toThrow();
            });
        });

    });

    describe('#disconnect', () => {

        it('should work correctly if disconnected', async () => {
            return testConnection((connection) => {
                connection.disconnect();

                expect(connection.connectionState).toBe(TcpConnection.STATE_DISCONNECTED);
            });
        });

        it('should work correctly if connected', async () => {
            await testConnection(async (connection) => {
                const onConnectionState = jest.fn();

                connection.on('connectionState', onConnectionState);

                try {
                    await connection.connect();

                    await connection.disconnect();
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

    });

    describe('Automatic reconnection', () => {

        it('should reconnect when connected', async () => {
            await testConnection(async (connection, endpoint, createEndpointInfoPromise) => {
                const onConnectionState = jest.fn();

                connection.on('connectionState', onConnectionState);

                let epiPromise = createEndpointInfoPromise();

                try {
                    await connection.connect();

                    const epi = await epiPromise;

                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(TcpConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(TcpConnection.STATE_CONNECTED);

                    epiPromise = createEndpointInfoPromise();

                    epi.socket.end();

                    await epiPromise;

                    expect(onConnectionState.mock.calls.length).toBe(4);
                    expect(onConnectionState.mock.calls [2] [0]).toBe(TcpConnection.STATE_INTERRUPTED);
                    expect(onConnectionState.mock.calls [3] [0]).toBe(TcpConnection.STATE_RECONNECTING);

                    await connection.disconnect();
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });

        });

    });

});
