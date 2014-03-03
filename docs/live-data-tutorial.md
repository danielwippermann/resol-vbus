---
layout: tutorials
title: Receive And Display Live Data
---

This tutorial covers the basic steps to receive and decode live VBus data received over a serial or TCP connection.


## Install the resol-vbus module

Use `npm` to install the resol-vbus module:

	npm install --save resol-vbus


## Load the resol-vbus module in your project

	var vbus = require('resol-vbus');


## Create a connection

The resol-vbus module uses `Connection` instances to receive and transmit live VBus data. Several implementations exist for different connection types:


### Using a serial port

If you want to receive data from a serial port (or a device that acts like one, e.g. the VBus/USB interface adapter), you can use the `SerialConnection` class to do so:

	var connection = new vbus.SerialConnection({
		path: '/dev/tty.usbserial'
	});

The `path` option is used to specify the serial port to use. On Windows you can use something like 'COM3'.


### Using a TCP connection

If you want to receive data from a TCP enabled data source (e.g. VBus/LAN interface adapter or one of the dataloggers), you can use the `TcpConnection` class to do so:

	var connection = new vbus.TcpConnection({
		host: 'mydl3.via.vbus.net',
		viaTag: 'mydl3',             // only necessary if connected using VBus.net
		password: 'secret',
		channel: 1,                  // only necessary if connected to a DL3
	});


## Establish the connection

The newly created `Connection` instances start in `DISCONNECTED` state (see `Connection#connectionState` for details). To establish the connection you have to call the `connect` method:

	var connectPromise = connection.connect();

The call to the `connect` method returns a promise that resolves when the connection is established. If you want to attach a callback to get notified when the connection is established, you can use the promise's `then` method to do so:

	connectPromise.then(function() {
		console.log('Connected!');
	}, function() {
		console.log('Connection failed');
	});


## Add event listeners for incoming live data

`Connection` instances decode the incoming data stream and emit events whenever a valid block of information was decoded. The information you are most likely interested in is contained in a `Packet` instance and the connection emits `packet` events for each received `Packet` instance. You can add a listener for those events:

	var onPacket = function(packet) {
		console.log('Packet received: ' + packet.getId());
	};

	connection.on('packet', onPacket);

This adds an event listener to the `connection` that just prints out the ID of the `Packet` instance to the console.


## Decode the payload in the `Packet` instance

`Packet` instances carry optional payload data in them but only provide access to the binary buffer. The get a list of the values contained in this `Packet` you can use a `Specification` instance which is able to decode the binary data into human- or machine readable representation. First you need to get a `Specification` instance.

	var spec = Specification.getDefaultSpecification();

The default specification is the unmodified `Specification` instances provided by the resol-vbus module. You can later create your own `Specification` instance allowing you to filter and / or convert values.

Using this `Specification` instance you can query a list of values that are contained in a `Packet` instance:

	var onPacket = function(packet) {
		console.log('Packet received: ' + packet.getId());

		var packetFields = spec.getPacketFieldsForHeaders([ packet ]);
		console.log(packetFields);
	};


## Done!


## Further reading



