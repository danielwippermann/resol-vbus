/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var os = require('os');
var path = require('path');


var express = require('express');
var _ = require('lodash');
var morgan = require('morgan');
var Q = require('q');
var Qs = require('qs');
var XivelyClient = require('xively');


var vbus = require('./resol-vbus');


var config = require('./config');



var specification = vbus.Specification.getDefaultSpecification();



var debugEnabled = true;

var debugLog = function() {
    if (debugEnabled) {
        console.log.apply(console, arguments);
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


/**
 * Connect to the VBus and store the packets into the global HeaderSetConsolidator.
 */
var connectToVBus = function() {
    var ConnectionClass = vbus [config.connectionClassName];
    var connection = new ConnectionClass(config.connectionOptions);

    connection.on('connectionState', function(connectionState) {
        debugLog('Connection state changed to ' + connectionState);
    });

    connection.on('packet', function(packet) {
        // debugLog('Packet received...', packet);

        headerSetConsolidator.addHeader(packet);
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
 */
var rewriteHeaderSet = function(headerSet) {
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
            headerSet = rewriteHeaderSet(headerSet);

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
        console.log(err, err.toString(), err.stack);

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
        return startRecorder();
    });
};



if (require.main === module) {
    Q.fcall(function() {
        return main(process.argv.slice(2));
    }).done(function() {
        console.log('DONE!');
    });
} else {
    module.exports = main;
}
