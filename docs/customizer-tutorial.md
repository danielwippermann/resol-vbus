---
layout: tutorials
title: Load and Store Controller Configuration
---

This tutorial covers the steps to load and store configuration from a controller.


## Preparations

- [Install the resol-vbus module](installation-tutorial.html)
- [Creating and establishing a connection](connection-tutorial.html)


## Find out the master controller on the VBus

The customization process requires a VBus controller's device address where the configuration should be loaded from or saved to.

Instead of hard-coding this device address into the source code this tutorial code uses the `waitForFreeBus` method to find out the device address of the master controller attached to the connection.

If the device address of the controller is known in advance this step can be skipped.

		// ...
	}).then(function() {
		return connection.waitForFreeBus();
	}).then(function(datagram) {
		if (datagram) {
			return datagram.sourceAddress;
		} else {
			throw new Error('Search for controller on VBus timed out');
		}
	}).then(function(deviceAddress) {
		context.deviceAddress = deviceAddress;
	}).then(function() {
		// ...


## Get configuration optimizer for controller

Once the controller's device address is known a corresponding `ConfigurationOptimizer` instance can be created by calling `ConfigurationOptimizerFactor.createOptimizerByDeviceAddress`:

		// ...
	}).then(function() {
		return vbus.ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(context.deviceAddress);
	}).then(function(optimizer) {
		if (optimizer) {
			context.optimizer = optimizer;
		} else {
			throw new Error('Unable to find optimizer for device');
		}
	}).then(function() {
		// ...


## Create a ConnectionCustomizer

The sub-classes of the `Customizer` base class handle all the timing details to load and save configurations from and to a controller. This example uses the `ConnectionCustomizer` sub-class that in turn uses a `Connection` instance to get access to a live VBus channel to perform the customization.

		// ...
	}).then(function(optimizer) {
		context.optimizer = optimizer;
		return new vbus.ConnectionCustomizer({
            deviceAddress: context.deviceAddress,
            connection: connection,
            optimizer: context.optimizer,
        });
	}).then(function(customizer) {
		context.customizer = customizer;
	}).then(function() {
		// ...


## Load parts of the configuration

Both load and save operations on the `Customizer` instance take a list of values that shall be transfered. This list of values can be either an array of objects with a `valueId` or `valueIndex` key or a object that uses the value IDs as keys and `null` as values.

	var configArray = [
		{ valueId: 'Relais_Regler_R1_Handbetrieb' },
		{ valueId: 'Relais_Regler_R2_Handbetrieb' },
		// ...
	];

	var configObject = {
		Relais_Regler_R1_Handbetrieb: null,
		Relais_Regler_R2_Handbetrieb: null,
		// ...
	};

The `loadConfiguration` method takes one of these value lists as the first parameter:

		// ...
	}).then(function(configuration) {
		return context.customizer.loadConfiguration(configuration);
	}).then(function(loadedConfiguration) {
		// ...

Once the transfer is complete the Promise resolves with an array of transfered values objects. Those objects contain several keys:

- `valueId`: the value ID
- `valueIndex`: the value index
- `value`: the value received or `null` if the value failed to transfer


## Load the complete configuration

To load the complete configuration of the controller a list of all known values must be created. The `completeConfiguration` method of the `ConfigurationOptimizer` instance can be used for that. If that method is called without arguments it returns such a list.

Since some controllers know several thousand adjustable values the list can be quiet large. By passing the `optimize` option to `loadConfiguration` the `Customizer` and the `ConfigurationOptimizer` instances work together to find the minimal set of values really necessary (e.g. by first loading options and then in a later round ignoring additional values that belong to deactivated options):

		// ...
	}).then(function() {
		return context.optimizer.completeConfiguration();
	}).then(function(completeConfiguration) {
		return context.customizer.loadConfiguration(completeConfiguration, { optimize: true });
	}).then(function(loadedConfiguration) {
		// ...

Alternatively calling `loadConfiguration` without parameters loads the optimized complete configuration as well. That means that the following block of code works exactly like the one above:

		// ...
	}).then(function() {
		return context.customizer.loadConfiguration();
	}).then(function(loadedConfiguration) {
		// ...


## Save the configuration

The `saveConfiguration` method also takes a list of values to save (just like the value lists for `loadConfiguration`, but with additional information about what to store). The two possible forms look like this:

	var configArray = [
		{ valueId: 'Relais_Regler_R1_Handbetrieb', value: 2 },
		{ valueId: 'Relais_Regler_R2_Handbetrieb', value: 2 },
		// ...
	];

	var configObject = {
		Relais_Regler_R1_Handbetrieb: 2,
		Relais_Regler_R2_Handbetrieb: 2,
		// ...
	};


The `saveConfiguration` method takes one of these value lists as the first parameter:

		// ..
	}).then(function(configuration) {
		return context.customizer.saveConfiguration(configuration);
	}).then(function(savedConfiguration) {
		// ...

Once the transfer is complete the Promise resolves with an array of transfered values objects. Those objects contain several keys:

- `valueId`: the value ID
- `valueIndex`: the value index
- `value`: the value received as a confirmation or `null` if the value failed to transfer


