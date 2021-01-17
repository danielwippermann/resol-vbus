const fs = require('fs');

const vbus = require('../resol-vbus');

const config = require('./config');


const {
    Packet,
} = vbus;


function promisify(fn) {
    return new Promise((resolve, reject) => {
        fn((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


async function watchFile(filename, state) {
    while (true) {
        const content = await promisify(cb => fs.readFile(filename, 'utf8', cb));

        const firstLine = content.split(/\r?\n/g) [0];

        state.state = firstLine.toLowerCase();

        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}


async function handleVBus(connection, selfAddress, state) {
    let lastResistor = -1;

    while (true) {
        const rxPacket = await connection.transceive(null, {
            async filterPacket(packet) {
                if (packet.destinationAddress === selfAddress) {
                    return packet;
                }
            }
        });
    
        if (!rxPacket) {
            continue;
        }
    
        console.log(rxPacket.getId());

        let resistor;
        switch (state.state) {
        case '0':
        case 'off':
        case 'aus':
        case '???':
            resistor = 4000;
            break;
        case '1':
        case 'on':
        case 'ein':
            resistor = 0;
            break;
        default:
            console.log(`Unexpected state value "${state.state}"`);
            resistor = 4000;
            break;
        }

        if (lastResistor !== resistor) {
            lastResistor = resistor;
            console.log(`Sending changed resistor value of "${resistor}"`);
        }

        const frameData = Buffer.alloc(24);
        frameData.writeInt32LE(resistor * 1000, 0);
    
        const txPacket = new Packet({
            destinationAddress: rxPacket.sourceAddress,
            sourceAddress: selfAddress,
            command: 0x0100,
            frameCount: 6,
            frameData,
        });

        connection.send(txPacket);
    }
}


async function main() {
    const Connection = vbus [config.connectionClassName];

    const connection = new Connection(config.connectionOptions);

    await connection.connect();

    const selfAddress = 0x6650 + config.emSubAdress;

    const state = {
        state: '???',
    };

    const fileWatcherPromise = watchFile(config.stateFilename, state);

    const vbusHandlerPromise = handleVBus(connection, selfAddress, state);

    await fileWatcherPromise;
}


main().then(null, err => {
    console.log(err);
    process.exit(1);
});
