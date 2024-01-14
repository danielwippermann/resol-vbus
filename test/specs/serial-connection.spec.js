/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const { Duplex } = require('stream');


const {
    Connection,
    SerialConnection,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    ifHasSerialPortIt,
    itShouldBeAClass,
    serialPortPath,
} = require('./test-utils');



class SerialPortStub extends Duplex {

    constructor(path, options, onCompletion) {
        super();

        process.nextTick(() => {
            this.emit('open');

            onCompletion(null);
        });
    }

    close() {
        // nop
    }

    _read() {
        // nop
    }

}



class TestableSerialConnection extends SerialConnection {

    createSerialPort(path, options, onCompletion) {
        return new SerialPortStub(path, options, onCompletion);
    }

}



const testConnection = async function(fn) {
    const connection = new TestableSerialConnection({
        path: serialPortPath,
    });

    try {
        expect(connection.connectionState).toBe(SerialConnection.STATE_DISCONNECTED);

        await fn(connection);
    } finally {
        connection.disconnect();
    }
};



describe('SerialConnection', () => {

    itShouldBeAClass(SerialConnection, Connection, {
        path: null,
        baudrate: 9600,
        reconnectTimeout: 0,
        reconnectTimeoutIncr: 10000,
        reconnectTimeoutMax: 60000,
        serialPort: null,
        constructor: Function,
        connect: Function,
        disconnect: Function,
        _connect: Function,
        _createSerialPort: Function,
    }, {
        hasSerialPortSupport: expect.any(Boolean),
    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const connection = new SerialConnection();

            expectOwnPropertyNamesToEqual(connection, [
                'path',
                'baudrate',

                // base class related
                'channel',
                'selfAddress',
            ], [
                '_events',
                '_eventsCount',
                '_maxListeners',
                '_readableState',
                '_writableState',
                'allowHalfOpen',
            ]);

            expect(connection.path).toBe(null);
            expect(connection.baudrate).toBe(9600);
            expect(connection.channel).toBe(0);
            expect(connection.selfAddress).toBe(0x0020);
        });

    });

    describe('#connect', () => {

        ifHasSerialPortIt('should work correctly if disconnected', async () => {
            await testConnection(async (connection) => {
                const onConnectionState = jest.fn();

                connection.on('connectionState', onConnectionState);

                try {
                    await connection.connect();

                    expect(connection.connectionState).toBe(SerialConnection.STATE_CONNECTED);
                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(SerialConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(SerialConnection.STATE_CONNECTED);
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });
        });

        ifHasSerialPortIt('should throw if not disconnected', async () => {
            await testConnection(async (connection) => {
                await connection.connect();

                await expect(async () => {
                    await connection.connect();
                }).rejects.toThrow();
            });
        });

    });

    describe('#disconnect', () => {

        ifHasSerialPortIt('should work correctly if disconnected', async () => {
            await testConnection((connection) => {
                connection.disconnect();

                expect(connection.connectionState).toBe(SerialConnection.STATE_DISCONNECTED);
            });
        });

        ifHasSerialPortIt('should work correctly if connected', async () => {
            await testConnection(async (connection) => {
                const onConnectionState = jest.fn();

                connection.on('connectionState', onConnectionState);

                try {
                    await connection.connect();

                    onConnectionState.reset();

                    connection.disconnect();
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }

                expect(onConnectionState.mock.calls.length).toBe(2);
                expect(onConnectionState.mock.calls [0] [0]).toBe(SerialConnection.STATE_DISCONNECTING);
                expect(onConnectionState.mock.calls [1] [0]).toBe(SerialConnection.STATE_DISCONNECTED);
            });
        });

    });

    describe('Automatic reconnection', () => {

        ifHasSerialPortIt('should reconnect when connected', async () => {
            await testConnection(async (connection) => {
                const onConnectionState = jest.fn();

                connection.on('connectionState', onConnectionState);

                try {
                    await connection.connect();

                    await connection.createConnectedPromise();

                    expect(onConnectionState.mock.calls.length).toBe(2);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(SerialConnection.STATE_CONNECTING);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(SerialConnection.STATE_CONNECTED);

                    onConnectionState.mockClear();

                    connection.serialPort.emit('error');

                    await connection.createConnectedPromise();

                    expect(onConnectionState.mock.calls.length).toBe(3);
                    expect(onConnectionState.mock.calls [0] [0]).toBe(SerialConnection.STATE_INTERRUPTED);
                    expect(onConnectionState.mock.calls [1] [0]).toBe(SerialConnection.STATE_RECONNECTING);
                    expect(onConnectionState.mock.calls [2] [0]).toBe(SerialConnection.STATE_CONNECTED);
                } finally {
                    connection.removeListener('connectionState', onConnectionState);
                }
            });

        });

    });

});
