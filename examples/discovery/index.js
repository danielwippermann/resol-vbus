/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    TcpDataSourceProvider,
} = require('../resol-vbus');



const knownDataSources = new Map();


const fetchCallback = async (address) => {
    let result;
    if (knownDataSources.has(address)) {
        result = knownDataSources.get(address);
    } else {
        // console.log('QUERY: ', address);
        result = TcpDataSourceProvider.fetchDeviceInformation(address);
        result = result.then((result) => {
            // console.log('QUERY SUCCESS: ', address);
            return result;
        }, (reason) => {
            // console.log('QUERY FAILED: ', address);
            throw reason;
        });
    }
    return result;
};


const discover = async () => {
    const devices = await TcpDataSourceProvider.discoverDevices({
        broadcastAddress: '255.255.255.255',
        broadcastPort: 7053,
        tries: 3,
        timeout: 500,
        fetchCallback,
    });

    const deviceById = devices.reduce((memo, device) => {
        const id = device.__address__;
        memo.set(id, device);
        return memo;
    }, new Map());

    const addedDevices = devices.reduce((memo, device) => {
        const id = device.__address__;
        if (!knownDataSources.has(id)) {
            memo.push(device);
        }
        return memo;
    }, []);

    const removedDevices = [...knownDataSources.keys()].reduce((memo, id) => {
        if (!deviceById.has(id)) {
            memo.push(knownDataSources.get(id));
        }
        return memo;
    }, []);

    for (const device of removedDevices) {
        const id = device.__address__;
        knownDataSources.delete(id);
        console.log('REMOVED: ', id, device.name);
    }

    for (const device of addedDevices) {
        const id = device.__address__;
        knownDataSources.set(id, device);
        console.log('ADDED: ', id, device.name);
    }
};



const main = async () => {
    while (true) {
        console.log('------', new Date(), '------');

        await discover();

        await new Promise((resolve) => {
            setTimeout(resolve, 10000);
        });
    }
};



if (require.main === module) {
    main().then(null, err => {
        console.log(err);
    });
}
