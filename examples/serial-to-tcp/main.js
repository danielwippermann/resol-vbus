const dgram = require('dgram');
const http = require('http');


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
        const channel = +(connectionInfo.channel || '0');
        const serialPort = serialPorts.find(port => port.channel === channel);

        if (serialPort) {
            debugLog(`Negotiated connection for channel ${channel}...`);
            acceptConnection(serialPort.port, connectionInfo.socket);
        } else {
            debugLog(`Rejecting connection for unknown channel ${channel}...`);
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


async function startDiscoveryServices() {
    debugLog('Starting discovery web service...');

    const webReplyContent = [
        'vendor = "RESOL"',
        'product = "DL2"',
        'serial = "001E66000000"',
        'version = "2.1.0"',
        'build = "201311280853"',
        'name = "DL2-001E66000000"',
        'features = "vbus,dl2"',
    ].join('\n');

    const webServer = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(webReplyContent);
    });

    webServer.on('clientError', (err, socket) => {
        debugLog(err);
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });

    webServer.listen(3000);

    debugLog('Starting discovery broadcast service...');

    const queryString = '---RESOL-BROADCAST-QUERY---';
    const replyBuffer = Buffer.from('---RESOL-BROADCAST-REPLY---', 'utf-8');

    const discoveryServer = dgram.createSocket('udp4');

    discoveryServer.on('error', err => {
        debugLog('error', err);
    });

    discoveryServer.on('message', (msg, remote) => {
        // console.log('message', msg, remote);

        let msgString = msg.toString('utf-8');
        if (msgString === queryString) {
            discoveryServer.send(replyBuffer, remote.port, remote.address);
        }
    });

    discoveryServer.bind(7053);
}


async function main() {
    for (const serialPortConfig of config.serialPorts) {
        await openSerialPort(serialPortConfig);
    }

    logging = await createLogging();

    await createTcpEndpoint();

    await startDiscoveryServices();

    debugLog('Waiting for connections...');
}


main().then(null, err => {
    errorLog(err);
    process.exit(1);
});
