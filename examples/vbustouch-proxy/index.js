/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var os = require('os');
var path = require('path');


var express = require('express');
var _ = require('lodash');
var morgan = require('morgan');
var Q = require('q');
var request = require('request');
var XivelyClient = require('xively');


var vbus = require('./resol-vbus');


var config = require('./config');



var specification = vbus.Specification.getDefaultSpecification();



var debugEnabled = true;

var debugLog = function() {
    if (debugEnabled) {
        global.console.log.apply(global.console, arguments);
    }
};


var headerSetConsolidator = new vbus.HeaderSetConsolidator({
    interval: config.loggingInterval,
    timeToLive: config.loggingTimeToLive,
});


var fsRecorder = new vbus.FileSystemRecorder({
    id: 'fs-destination',
    path: config.loggingPath,
});


var textHeaderSetConsolidator = new vbus.HeaderSetConsolidator({
    timeToLive: config.textLoggingTimeToLive,
});


/**
 * This function is called once the header set is considered "settled".
 * That means that the amount of unique packets in the header set has
 * been stable for a certain amount of time.
 * 
 * @param {HeaderSet} headerSet 
 */
var headerSetHasSettled = function(headerSet) {
    const packetFields = specification.getPacketFieldsForHeaders(headerSet.getHeaders());

    debugLog(_.map(packetFields, function(packetField) {
        return packetField.id + ': ' + packetField.name;
    }).join('\n'));
};


/**
 * Connect to the VBus and store the packets into the global HeaderSetConsolidator.
 */
var connectToVBus = function() {
    var ConnectionClass = vbus [config.connectionClassName];
    var connection = new ConnectionClass(config.connectionOptions);

    connection.on('connectionState', function(connectionState) {
        debugLog('Connection state changed to ' + connectionState);
    });

    var hasSettled = false;
    var headerSet = new vbus.HeaderSet();
    var settledCountdown = 0;

    connection.on('packet', function(packet) {
        // debugLog('Packet received...', packet);

        if (!hasSettled) {
            var headerCountBefore = headerSet.getHeaderCount();
            headerSet.addHeader(packet);
            var headerCountAfter = headerSet.getHeaderCount();

            if (headerCountBefore != headerCountAfter) {
                settledCountdown = headerCountAfter * 2;
            } else if (settledCountdown > 0) {
                settledCountdown -= 1;
            } else {
                hasSettled = true;

                headerSetHasSettled(headerSet);
                headerSet = null;
            }
        }

        headerSetConsolidator.addHeader(packet);
        textHeaderSetConsolidator.addHeader(packet);
    });

    return Q.fcall(function() {
        debugLog('Connecting to VBus...');

        return connection.connect();
    }).then(function() {
        debugLog('Connected to VBus...');
    });
};


/**
 * Responds to '/cgi-bin/get_resol_device_information' requests.
 * It replies with a fake DL2v2 response to trick VBusTouch to connect with it.
 */
var processGetResolDeviceInformationRequest = function(req, res) {
    var content = [
        'vendor = "RESOL"',
        'product = "DL2"',
        'serial = "001E66000000"',
        'version = "2.1.0"',
        'build = "201311280853"',
        'name = "DL2-001E66000000"',
        'features = "vbus,dl2"',
    ].join('\n');

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(content);
};


/**
 * Allows rewriting a HeaderSet read from the file system before it is send over the network.
 * 
 * The example below converts the information from a DeltaSol MX to a Vitosolic 200.
 * 
 * @param headerSet A `HeaderSet` instance containing the received `Packet` instances.
 * @returns A `HeaderSet` instance containing the forged `Packet` instances.
 */
var rewriteWebHeaderSet = function(headerSet) {
    var timestamp = headerSet.timestamp;

    /*
     * Get list of packet fields in the received packets.
     */
    var packetFields = specification.getPacketFieldsForHeaders(headerSet.getHeaders());

    /*
     * Map all existing packet fields into an object for easier access.
     */
    var origRawValueById = _.reduce(packetFields, function(memo, packetField) {
        memo [packetField.id] = packetField.rawValue;
        return memo;
    }, {});

    /*
     * Pick the interesting fields from the raw values.
     */
    var tempCollector = origRawValueById ['00_0010_7E11_10_0100_000_2_0'];
    var tempStoreBottom = origRawValueById ['00_0010_7E11_10_0100_002_2_0'];
    var tempStoreTop = origRawValueById ['00_0010_7E11_10_0100_004_2_0'];
    var pumpSpeed = origRawValueById ['00_0010_7E11_10_0100_076_1_0'];
    var info1 = origRawValueById ['00_0010_7E11_10_0100_077_1_0'];
    var info2 = origRawValueById ['00_0010_7E11_10_0100_078_1_0'];
    var errorMask = origRawValueById ['00_0010_7E11_10_0100_096_4_0'];
    var tempFlow = origRawValueById ['00_0010_7E11_10_0100_006_2_0'];
    var tempReturn = origRawValueById ['00_0010_7E11_10_0100_008_2_0'];
    var flow = origRawValueById ['00_0010_7E11_10_0100_040_4_0'];
    var heat = origRawValueById ['00_0010_7E31_10_0100_000_4_0'];

    /*
     * Create an empty packet of the supported Vitosolic 200.
     */
    var supportedPacket1 = new vbus.Packet({
        timestamp: timestamp,
        channel: 0,
        destinationAddress: 0x0010,  // DFA
        sourceAddress: 0x1060,  // Vitosolic 200 [Regler]
        command: 0x0100,
        frameCount: 20,
    });

    /*
     * Create an empty packet for the heat quantity information.
     */
    var supportedPacket2 = new vbus.Packet({
        timestamp: timestamp,
        channel: 0,
        destinationAddress: 0x0010,  // DFA
        sourceAddress: 0x1064,  // Vitosolic 200 [WMZ1]
        command: 0x0100,
        frameCount: 3,
    });

    /*
     * Create a new header set and add the forged packets to it.
     */
    headerSet = new vbus.HeaderSet({
        timestamp: timestamp,
    });
    headerSet.addHeader(supportedPacket1);
    headerSet.addHeader(supportedPacket2);

    /*
     * Get list of packet fields in the forged packets.
     */
    packetFields = specification.getPacketFieldsForHeaders(headerSet.getHeaders());

    /*
     * Transfered the information picked from the received packets into the forged ones.
     */
    specification.setPacketFieldRawValues(packetFields, {
        '00_0010_1060_10_0100_000_2_0': tempCollector,
        '00_0010_1060_10_0100_002_2_0': tempStoreBottom,
        '00_0010_1060_10_0100_004_2_0': tempStoreTop,
        '00_0010_1060_10_0100_044_1_0': pumpSpeed,
        '00_0010_1060_10_0100_045_1_0': info1,
        '00_0010_1060_10_0100_046_1_0': info2,
        '00_0010_1060_10_0100_060_2_0': errorMask,
        '00_0010_1064_10_0100_000_2_0': tempFlow,
        '00_0010_1064_10_0100_002_2_0': tempReturn,
        '00_0010_1064_10_0100_004_2_0': flow,
        '00_0010_1064_10_0100_006_2_0': heat % 1000,
        '00_0010_1064_10_0100_008_2_0': (heat / 1000) % 1000,
        '00_0010_1064_10_0100_010_2_0': heat / 1000000,
    });

    /*
     * Return the forged header set.
     */
    return headerSet;
};


/**
 * Responds to '/dlx/download/download' requests.
 * It only implements the parts of the endpoint that are necessary for VBusTouch to work.
 */
var processDownloadDownloadRequest = function(req, res) {
    var i18n = specification.i18n;

    var startDate = req.query.startDate ? i18n.momentUtc(req.query.startDate, 'MM/DD/YYYY') : i18n.moment();
    var endDate = req.query.endDate ? i18n.momentUtc(req.query.endDate, 'MM/DD/YYYY') : i18n.moment();

    var query = {
        source: req.query.source,
        outputType: req.query.outputType,
        dataLanguage: req.query.dataLanguage || 'en',
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
        sieveInterval: req.query.sieveInterval | 0,
        ttl: req.query.ttl | 0,
    };

    // debugLog(req.query, query);

    var converter1 = new vbus.Converter({ objectMode: true });

    var hsc = new vbus.HeaderSetConsolidator({
        timestamp: query.startDate,
        interval: query.sieveInterval * 1000,
        timeToLive: query.ttl * 1000,
    });

    var converter2, contentType;

    return Q.fcall(function() {
        if (query.outputType === 'vbus') {
            converter2 = new vbus.VBusRecordingConverter({});
            contentType = 'application/octet-stream';
        } else if (query.outputType === 'json') {
            converter2 = new vbus.DLxJsonConverter({});
            contentType = 'application/json; charset=utf-8';
        } else {
            throw new Error('Unsupported output type ' + JSON.stringify(query.outputType));
        }

        var onC1HeaderSet = function(headerSet) {
            // debugLog('C1 headerSet event received', headerSet.timestamp);

            hsc.processHeaderSet(headerSet);
        };

        var onC1Finish = function() {
            // debugLog('C1 finish event received');
        };

        converter1.on('headerSet', onC1HeaderSet);

        converter1.on('finish', onC1Finish);

        var onHscHeaderSet = function(headerSet) {
            if (config.rewriteWebHeaderSets) {
                headerSet = rewriteWebHeaderSet(headerSet);
            }

            converter2.convertHeaderSet(headerSet);
        };

        hsc.on('headerSet', onHscHeaderSet);

        var buffer = new Buffer(0);

        var onC2Data = function(chunk) {
            // debugLog('C2 data event received');

            buffer = Buffer.concat([ buffer, chunk ]);
        };

        var onC2End = function() {
            // debugLog('C2 end event received');
        };

        converter2.on('data', onC2Data);

        converter2.on('end', onC2End);

        var promise;
        if (query.source === 'current') {
            promise = Q.fcall(function() {
                converter1.write(headerSetConsolidator);
            });
        } else {
            promise = Q.fcall(function() {
                var playerOptions = {
                    id: 'fs-destination',
                    interval: config.loggingInterval,
                    path: config.loggingPath,
                };

                var playbackOptions = {
                    minTimestamp: query.startDate,
                    maxTimestamp: query.endDate,
                };

                var player = new vbus.FileSystemRecorder(playerOptions);

                return player.playback(converter1, playbackOptions);
            });
        }

        return promise.then(function() {
            // debugLog('Finishing C2');

            return converter2.finish();
        }).then(function() {
            // debugLog('Finished C2');

            return buffer;
        }).finally(function() {
            converter1.removeListener('headerSet', onC1HeaderSet);
            converter1.removeListener('finish', onC1Finish);
            hsc.removeListener('headerSet', onHscHeaderSet);
            converter2.removeListener('data', onC2Data);
            converter2.removeListener('end', onC2End);
        });
    }).then(function(buffer) {
        // debugLog('Buffer length=', buffer.length);

        res.status(200);
        res.set('content-type', contentType);
        res.send(buffer);
    }).catch(function(err) {
        global.console.log(err, err.toString(), err.stack);

        res.status(500);
        res.set('content-type', 'text/plain');
        res.send(err.toString());
    });
};


/**
 * Start the web server.
 */
var startWebServer = function() {
    return Q.fcall(function() {
        debugLog('Starting web server...');

        var app = express();

        app.use(morgan('dev'));
        app.use(express.query());

        app.get('/cgi-bin/get_resol_device_information', processGetResolDeviceInformationRequest);
        app.get('/dlx/download/download', processDownloadDownloadRequest);

        app.listen(3000, function() {
            debugLog('Started web server at: ');
            debugLog('  - http://0.0.0.0:' + config.webServerPort + '/ (internal)');
            _.forEach(os.networkInterfaces(), function(iface) {
                _.forEach(iface, function(ifaceConfig) {
                    if (ifaceConfig.family === 'IPv4') {
                        debugLog('  - http://' + ifaceConfig.address + ':' + config.webServerPort + '/' + (ifaceConfig.internal ? ' (internal)' : ''));
                    }
                });
            });
        });
    });
};


var startHeaderSetConsolidatorTimer = function() {
    return Q.fcall(function() {
        debugLog('Starting HeaderSetConsolidator timer...');

        headerSetConsolidator.startTimer();
    });
};


var startXivelyClient = function() {
    var onHeaderSet = function(headerSet) {
        return Q.fcall(function() {
            // debugLog('Updating Xively feed...');

            var x = new XivelyClient();

            x.setKey(config.xivelyApiKey);

            var headers = headerSet.getSortedHeaders();
            var packetFields = specification.getPacketFieldsForHeaders(headers);

            var valuesById = _.reduce(packetFields, function(memo, pf) {
                var precision = pf.packetFieldSpec.type.precision;

                var roundedRawValue = vbus.utils.roundNumber(pf.rawValue, -precision);

                // debugLog('ID = ' + JSON.stringify(pf.id) + ', Name = ' + JSON.stringify(pf.name) + ', Value = ' + pf.rawValue + ', RoundedValue = ' + roundedRawValue);

                memo [pf.id] = roundedRawValue;
                return memo;
            }, {});

            var dataStreams = _.map(config.xivelyPacketFieldMap, function(packetFieldId, dataPointId) {
                return {
                    id: dataPointId,
                    current_value: valuesById [packetFieldId],
                };
            });

            // debugLog(dataStreams);

            var dp = {
                version: '1.0.0',
                datastreams: dataStreams,
            };

            x.feed.new(config.xivelyFeedId, {
                data_point: dp,
                callback: function(err) {
                    if (err) {
                        // debugLog('Failed updating Xively feed...', err);
                    } else {
                        // debugLog('Done updating Xively feed...');
                    }
                },
            });
        });
    };

    return Q.fcall(function() {
        if (config.xivelyInterval) {
            debugLog('Starting Xively client');

            var hsc = new vbus.HeaderSetConsolidator({
                interval: config.xivelyInterval,
            });

            hsc.on('headerSet', function() {
                onHeaderSet(headerSetConsolidator);
            });

            hsc.startTimer();
        }
    });
};


var startPvOutputOrgLogging = function() {
    var onHeaderSet = function(headerSet) {
        return Q.fcall(function() {
            var headers = headerSet.getSortedHeaders();
            var packetFields = specification.getPacketFieldsForHeaders(headers);

            var valuesById = _.reduce(packetFields, function(memo, pf) {
                var precision = pf.packetFieldSpec.type.precision;

                var roundedRawValue = pf.rawValue.toFixed(precision);

                // debugLog('ID = ' + JSON.stringify(pf.id) + ', Name = ' + JSON.stringify(pf.name) + ', Value = ' + pf.rawValue + ', RoundedValue = ' + roundedRawValue);

                memo [pf.id] = roundedRawValue;
                return memo;
            }, {});

            var timestamp = specification.i18n.moment(headerSet.timestamp);

            var params = _.reduce(config.pvOutputOrgPacketFieldMap, function(memo, packetFieldId, key) {
                var value;
                if (typeof packetFieldId === 'function') {
                    value = packetFieldId(valuesById);
                } else {
                    value = valuesById [packetFieldId];
                }
                if (typeof value === 'number') {
                    value = value.toString();
                }
                if (typeof value === 'string') {
                    memo [key] = value;
                }
                return memo;
            }, {
                key: config.pvOutputOrgApiKey,
                sid: config.pvOutputOrgSystemId,
                d: timestamp.format('YYYYMMDD'),
                t: timestamp.format('HH:mm'),
            });

            request({
                url: 'http://pvoutput.org/service/r2/addstatus.jsp',
                qs: params,
            }, function(error, response, body) {
                debugLog(error, response, body);
            });
        });
    };

    return Q.fcall(function() {
        if (config.pvOutputOrgInterval) {
            debugLog('Starting PvOutput.org logging');

            var hsc = new vbus.HeaderSetConsolidator({
                interval: config.pvOutputOrgInterval,
            });

            hsc.on('headerSet', function() {
                onHeaderSet(headerSetConsolidator);
            });

            hsc.startTimer();
        }
    });
};


var startTextLogging = function() {
    var currentDatecode = null;

    var currentConverter = null;

    var onHeaderSet = function(headerSet) {
        return Q.fcall(function() {
            var datecode = specification.i18n.moment(headerSet.timestamp).format('YYYYMMDD');
            if (currentDatecode !== datecode) {
                currentDatecode = datecode;

                if (currentConverter) {
                    currentConverter.finish();
                    currentConverter = null;
                }

                var filename = path.resolve(config.textLoggingPath, datecode + '.csv');

                var file = fs.createWriteStream(filename, { flags: 'a' });

                var options = _.extend({}, config.textLoggingOptions, {
                    specification: specification,
                });

                var converter = new vbus.TextConverter(options);
                converter.pipe(file);

                currentConverter = converter;
            }

            if (currentConverter) {
                currentConverter.convertHeaderSet(headerSet);
            }
        });
    };

    return Q.fcall(function() {
        if (config.textLoggingInterval) {
            debugLog('Starting text logging');

            var hsc = new vbus.HeaderSetConsolidator({
                interval: config.textLoggingInterval,
            });

            hsc.on('headerSet', function() {
                onHeaderSet(textHeaderSetConsolidator);
            });

            hsc.startTimer();
        }
    });
};


var startRecorder = function() {
    var converter = new vbus.Converter({ objectMode: true });

    var onHeaderSet = function(headerSet) {
        // debugLog('HeaderSet consolidated...');

        converter.convertHeaderSet(headerSet);
    };

    return Q.fcall(function() {
        headerSetConsolidator.on('headerSet', onHeaderSet);

        return fsRecorder.record(converter, {
            interval: config.loggingInterval,
            timeToLive: config.loggingTimeToLive,
        });
    }).finally(function() {
        headerSetConsolidator.removeListener('headerSet', onHeaderSet);
    });
};


var main = function() {
    return Q.fcall(function() {
        return connectToVBus();
    }).then(function() {
        return startWebServer();
    }).then(function() {
        return startHeaderSetConsolidatorTimer();
    }).then(function() {
        return startXivelyClient();
    }).then(function() {
        return startPvOutputOrgLogging();
    }).then(function() {
        return startTextLogging();
    }).then(function() {
        return startRecorder();
    });
};



if (require.main === module) {
    Q.fcall(function() {
        return main(process.argv.slice(2));
    }).done(function() {
        global.console.log('DONE!');
    });
} else {
    module.exports = main;
}
