---
layout: tutorials
title: Create and establish a connection
---

## Preparations

- [Install the resol-vbus module](installation-tutorial.html)


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
		host: 'mydl3.vbus.io',
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
