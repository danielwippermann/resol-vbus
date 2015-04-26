/*! resol-vbus | Copyright (c) 2013-2015, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var os = require('os');
var path = require('path');


var express = require('express');
var _ = require('lodash');
var Q = require('q');
var winston = require('winston');


var vbus = require('./resol-vbus');


var config = require('./config');



var logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			level: 'info',
			colorize: true,
		}),
	],
});



var Promise = vbus.utils.promise;



var i18n = new vbus.I18N('en');



var spec = vbus.Specification.getDefaultSpecification();



var main = function() {
	var ctx = {
		headerSet: null,
		hsc: null,
		connection: null,
	};

	var generateJsonData = function() {
		var packetFields = spec.getPacketFieldsForHeaders(ctx.headerSet.getSortedHeaders());

		var data = _.map(packetFields, function(pf) {
			return {
				id: pf.id,
				name: pf.name,
				rawValue: pf.rawValue,
			};
		});

		return JSON.stringify(data, null, 4);
	};

	return Q.fcall(function() {
		logger.debug('Starting server...');

		var app = express();

		app.get('/api/v1/live-data', function(req, res) {
			Q.fcall(function() {
				var data = generateJsonData();

				res.status(200).type('application/json').end(data);
			}).fail(function(err) {
				logger.error(err);
				res.status(500).type('text/plain').end(err.toString());
			});
		});

		return new Promise(function(resolve, reject) {
			app.listen(config.httpPort, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}).then(function() {
		logger.debug('Connect to VBus data source...');

		ctx.headerSet = new vbus.HeaderSet();

		ctx.hsc = new vbus.HeaderSetConsolidator({
			interval: config.loggingInterval,
		});

		var ConnectionClass = vbus [config.connectionClassName];

		ctx.connection = new ConnectionClass(config.connectionOptions);

		ctx.connection.on('packet', function(packet) {
			ctx.headerSet.addHeader(packet);
			ctx.hsc.addHeader(packet);
		});

		ctx.hsc.on('headerSet', function(headerSet) {
			Q.fcall(function() {
				logger.debug('HeaderSet complete');

				var data = generateJsonData();

				return Q.npost(fs, 'writeFile', [ config.loggingFilename, data ]);
			}).done();
		});

		return ctx.connection.connect();
	}).then(function() {
		var ifaces = os.networkInterfaces();

		logger.info('Ready to serve from the following URLs:');
		_.forEach(ifaces, function(ifaceConfigs, ifaceName) {
			_.forEach(ifaceConfigs, function(ifaceConfig) {
				if (ifaceConfig.family === 'IPv4') {
					logger.info('    - http://' + ifaceConfig.address + ':' + config.httpPort + '/api/v1/live-data' + (ifaceConfig.internal ? ' (internal)' : ''));
				}
			});
		});

		ctx.hsc.startTimer();

		return new Promise(function(resolve, reject) {
			// nop, just run forever
		});
	});
};



if (require.main === module) {
	Q.fcall(function() {
		return main(process.argv.slice(2));
	}).done();
} else {
	module.exports = main;
}
