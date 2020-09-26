const SerialPort = require('serialport');


const vbus = require('../resol-vbus');

const config = require('./config');



const {
    Connection,
    TcpConnectionEndpoint,
} = vbus;


const serialPorts = [];
const connections = [];
let logging = null;


function errorLog(...args) {
    console.log(...args);
}


function debugLog(...args) {
    console.log(...args);
}


function acceptConnection(port, origin) {
    debugLog('Accepting connection');

    connections.push(origin);

    function remove() {
        const idx = connections.indexOf(origin);
        if (idx >= 0) {
            connections.splice(idx, 1);
        }
    }

    origin.on('error', err => {
        errorLog(err);

        remove();
    });

    origin.on('end', () => {
        debugLog('Closing connection');

        remove();
    });

    origin.on('readable', () => {
        let chunk;
        while ((chunk = origin.read())) {
            port.write(chunk);
        }
    });
}


async function createTcpEndpoint(serialPort) {
    debugLog('Opening TCP endpoint...');

    const channels = config.serialPorts.reduce((memo, serialPort) => {
        memo [serialPort.channel] = `VBus ${serialPort.channel}: ${serialPort.path}`;
        return memo;
    }, []);

    console.log(channels);

    const endpoint = new TcpConnectionEndpoint({
        port: config.port,
        channels,
    });

    endpoint.on('connection', connectionInfo => {
        const channel = +connectionInfo.channel;
        const serialPort = serialPorts.find(port => port.channel === channel);

        if (serialPort) {
            acceptConnection(serialPort.port, connectionInfo.socket);
        } else {
            connectionInfo.socket.end();
        }
    });

    await endpoint.start();
}


async function openSerialPort(config) {
    debugLog('Opening serial port...');

    const port = await new Promise((resolve, reject) => {
        const port = new SerialPort(config.path, {
            baudRate: config.baudrate,
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(port);
            }
        });
    });

    port.on('error', err => {
        errorLog(err);
        process.exit(1);
    });

    port.on('end', () => {
        debugLog('Serial port EOF');
        process.exit(0);
    });

    port.on('readable', () => {
        let chunk;
        while ((chunk = port.read())) {
            for (const connection of connections) {
                connection.write(chunk);
            }

            if (logging) {
                logging.write(chunk);
            }
        }
    });

    serialPorts.push({
        channel: config.channel,
        port,
    });
}


async function createLogging() {
    const connection = new Connection();

    connection.on('packet', packet => {
        // console.log(packet.getId());
    });

    return connection;
}


async function main() {
    for (const serialPortConfig of config.serialPorts) {
        await openSerialPort(serialPortConfig);
    }

    logging = await createLogging();

    await createTcpEndpoint();

    debugLog('Waiting for connections...');
}


main().then(null, err => {
    errorLog(err);
    process.exit(1);
});
