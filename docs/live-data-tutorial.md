---
layout: tutorials
title: Receive And Display Live Data
---

This tutorial covers the basic steps to receive and decode live VBus data received over a serial or TCP connection.


## Preparations

- [Install the resol-vbus module](installation-tutorial.html)
- [Creating and establishing a connection](connection-tutorial.html)


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



