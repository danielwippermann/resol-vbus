/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const os = require('os');

const {
    TcpDataSourceProvider,
} = require('../resol-vbus');



const knownDataSources = new Map();


async function getOrFetchInformation(key, interfaceName, address, discoveredAddress) {
    let result;
    if (knownDataSources.has(key)) {
        result = knownDataSources.get(key);
    } else {
        if (address.family === 'IPv4') {
            result = await TcpDataSourceProvider.fetchDeviceInformation({
                hostname: discoveredAddress,
                family: 4,
            });
        } else if (address.family === 'IPv6') {
            result = await TcpDataSourceProvider.fetchDeviceInformation({
                hostname: discoveredAddress,
                localAdress: `${address.address}%${interfaceName}`,
                family: 6,
            });
        }

        knownDataSources.set(key, result);
    }
    return result;
}

async function discover() {
    const interfaceMap = os.networkInterfaces();

    const interfaceNames = Object.getOwnPropertyNames(interfaceMap);

    const knownKeySet = new Set(knownDataSources.keys());
    const fetchedKeySet = new Set();

    const commonDiscoveryOptions = {
        broadcastPort: 7053,
        tries: 3,
        timeout: 500,
    };

    const promises = [];
    for (const interfaceName of interfaceNames) {
        const addresses = interfaceMap [interfaceName];

        let preferredIPv6Address = null;
        for (const address of addresses) {
            if (address.family === 'IPv4') {
                const promise = TcpDataSourceProvider.discoverDevices({
                    localAddress: address.address,
                    netmask: address.netmask,
                    ...commonDiscoveryOptions,
                    fetchCallback(discoveredAddress) {
                        const key = discoveredAddress;
                        fetchedKeySet.add(key);
                        return getOrFetchInformation(key, interfaceName, address, discoveredAddress);
                    },
                });

                promises.push(promise);
            } else if (address.family === 'IPv6') {
                if ((preferredIPv6Address == null) || (preferredIPv6Address.scopeid < address.scopeid)) {
                    preferredIPv6Address = address;
                }
            }
        }

        if (preferredIPv6Address) {
            const promise = TcpDataSourceProvider.discoverDevices({
                family: 'IPv6',
                localAddress: preferredIPv6Address.address,
                broadcastInterface: interfaceName,
                ...commonDiscoveryOptions,
                fetchCallback(discoveredAddress) {
                    const key = `${discoveredAddress}%${interfaceName}`;
                    fetchedKeySet.add(key);
                    return getOrFetchInformation(key, interfaceName, preferredIPv6Address, discoveredAddress);
                },
            });

            promises.push(promise);
        }
    }

    await Promise.all(promises);

    const addedDevices = Array.from(fetchedKeySet.values()).reduce((memo, key) => {
        if (!knownKeySet.has(key)) {
            const device = knownDataSources.get(key);
            memo.push(device);
        }
        return memo;
    }, []);

    const removedDevices = Array.from(knownKeySet.values()).reduce((memo, key) => {
        if (!fetchedKeySet.has(key)) {
            const device = knownDataSources.get(key);
            knownDataSources.delete(key);
            memo.push(device);
        }
        return memo;
    }, []);

    for (const device of removedDevices) {
        const id = device.__address__;
        console.log('REMOVED: ', id, device.name);
    }

    for (const device of addedDevices) {
        const id = device.__address__;
        console.log('ADDED: ', id, device.name);
    }
}



async function main() {
    const interval = 10000;

    while (true) {
        console.log('------', new Date(), '------');

        await discover();

        await new Promise((resolve) => {
            setTimeout(resolve, interval - (Date.now() % interval));
        });
    }
};



if (require.main === module) {
    main().then(null, err => {
        console.log(err);
    });
}
