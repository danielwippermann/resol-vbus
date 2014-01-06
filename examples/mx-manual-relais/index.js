/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var Q = require('q');


var vbus = require('../../src/index');



var options = {
    host: '192.168.14.110',
    port: 7053,
    channel: 1,
    password: 'vbus',
};



var relaisValueIndices = [
    null,
    1285,
    1297,
    1309,
    1321,
    1333,
    1345,
    1357,
    1369,
    1381,
    1393,
    1405,
    1417,
    1429,
    1441,
    1453,
    1465,
    1477,
    1489,
    1501,
    1517,
    1529,
    1541,
    1553,
    1565,
    1581,
    1593,
    1605,
    1617,
    1629,
    1645,
    1657,
    1669,
    1681,
    1693,
    1709,
    1721,
    1733,
    1745,
    1757
];

var generateRelaisValueIndices = function() {
    var relaisValueIndices = [];

    for (var i = 1; i < 40; i++) {
        var modul, relais;

        if (i <= 14) {
            modul = 0;
            relais = i;
        } else {
            modul = Math.floor((i - 15) / 5) + 1;
            relais = (i - 10 - (modul * 5)) + 1;
        }

        var valueIndex = 1285 + ((relais - 1) * 12);
        if (modul > 0) {
            valueIndex += 14 * 12 + (modul - 1) * 5 * 12;
            if (modul > 1) {
                valueIndex += (modul - 1) * 4;
            }
        }

        relaisValueIndices [i] = valueIndex;
    }

    console.log(JSON.stringify(relaisValueIndices, null, '    '));
};



var debugLog = function() {
    // console.log.apply(console, arguments);
};



var transceive = function(conn, address, valueIndex, value, options) {
    options = _.defaults({}, options, {
        tries: 2,
        timeout: 30000,
    });

    var deferred = Q.defer();
    var promise = deferred.promise;

    var timer;

    var done = function(err, result) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (deferred) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
            deferred = null;
        }
    };

    var tries = options.tries, timeout = options.timeout, firstTry = true;

    var nextTry = function() {
        if (tries > 0) {
            tries--;

            var innerPromise = Q(address);

            if (!firstTry) {
                innerPromise = innerPromise.then(function() {
                    debugLog('  Releasing bus...');
                    return conn.releaseBus(address);
                }).then(function() {
                    debugLog('  Waiting for free bus (again)...');
                    return conn.waitForFreeBus(address);
                }).then(function(datagram) {
                    return datagram.sourceAddress;
                });
            } else {
                firstTry = false;
            }

            innerPromise = innerPromise.then(function(refAddress) {
                debugLog('  Transceiving...');
                if (address === refAddress) {
                    // TODO: use setValueById here!
                    return conn.getValueById(address, valueIndex);
                }
            }).then(function(datagram) {
                if (datagram) {
                    done(null, datagram);
                } else {
                    return nextTry();
                }
            });

            return innerPromise;
        } else {
            done(null, null);
        }
    };

    var onTimeout = function() {
        done(null, null);
    };

    process.nextTick(nextTry);
    timer = setTimeout(onTimeout, options.timeout);

    return promise;
};



var main = function(relaisNrList) {
    var handAus = 0, handEin = 3;

    var relaisNrs = relaisNrList.split(',');

    var values = [], value;
    for (var i = 1; i <= 19; i++) {
        if (relaisNrs.indexOf('' + i) >= 0) {
            value = handEin;
        } else {
            value = handAus;
        }
        values.push({ index: relaisValueIndices [i], value: value });
    }

    var conn = new vbus.TcpConnection(options);
    return Q.try(function() {
        debugLog('Connecting...');
        return conn.connect();
    }).then(function() {
        debugLog('Waiting for free bus...');
        return conn.waitForFreeBus();
    }).then(function(datagram) {
        var promise = Q();
        if (datagram) {
            var address = datagram.sourceAddress;

            debugLog('Free bus offer recevied from ' + address + '...');

            _.forEach(values, function(valueInfo) {
                promise = promise.then(function() {
                    debugLog('Getting value index ' + valueInfo.index);

                    return transceive(conn, address, valueInfo.index, valueInfo.value);
                }).then(function(datagram) {
                    debugLog('  Value: ' + datagram.value);
                });
            });

            promise = promise.then(function() {
                debugLog('Releasing bus...');
                return conn.releaseBus(address);
            });
        } else {
            debugLog('Did not get free bus offer');
        }
        return promise;
    }).finally(function() {
        debugLog('Disconnecting...');
        return conn.disconnect();
    }).done(function() {
        debugLog('DONE!');
    });
};



if (require.main === module) {
    main(process.argv [2] || '');
}



module.exports = main;
