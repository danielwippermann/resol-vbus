---
layout: tutorials
title: Process recorded VBus data
---

This tutorial covers the basic steps to read and decode recorded VBus data stored in files by a datalogger or the RESOL ServiceCenter (RSC) software.


## Preparations

- [Install the resol-vbus module](installation-tutorial.html)


## General information

Dataloggers and the RSC software can store VBus data to files for later processing. The file format used by those files is described in the [VBus Recording File Format](vbus-recording-file-format.html) documentation.

The `resol-vbus` library provides a special [`Converter` sub-class](converter-class.html) called [`VBusRecordingConverter`](vbus-recording-converter-class.html) that is able to decode VBus data that is stored in this file format. This tutorial shows how to use it.



## Decode a VBus file

This section walks you through the process of using a `VBusRecordingConverter` to decode a VBus file.


### Open the file

Use the Node.js FileSystem API to create a readable stream of the file you want to decode:

	var fs = require('fs');

	// ...

	var inFilename = ...;

	var inFile = fs.createReadStream(inFilename);


### Create a converter instance

To get access to the converter's functionality you first need to instantiate one:

	var vbus = require('resol-vbus');

	// ...

   	var inConv = new vbus.VBusRecordingConverter();


### Register event handlers

For debugging purposes you can add a event handler the notifies you once a `HeaderSet` was successfully decoded:

	inConv.on('header', function(header) {
		console.log('Header decoded: ' + header.timestamp + ' -> ' + header.getId());
	});

	inConv.on('headerSet', function(headerSet) {
		console.log('HeaderSet decoded: ' + headerSet.timestamp + ' -> ' + headerSet.getId());
	});


### Pipe the file content into the converter

Use the Node.js `pipe` method to connect the readable file stream with the `Writable` part of the `VBusRecordingConverter`.

	inFile.pipe(inConv);

Node.js will now stream the file content into the converter. When the converter successfully decoded a `Header` it emits a `header` event and when it decoded a full `HeaderSet` it emits a `headerSet` event.

Running that code with the file `test/fixtures/dlx-recorder-1/20140214.vbus` as input results in 4895 lines of console output starting as follows:

	Header decoded: Fri Feb 14 2014 01:00:00 GMT+0100 (CET) -> 00_0010_0053_10_0100
	Header decoded: Fri Feb 14 2014 00:59:58 GMT+0100 (CET) -> 01_0010_7E11_10_0100
	Header decoded: Fri Feb 14 2014 01:00:00 GMT+0100 (CET) -> 01_0010_7E12_10_0100
	Header decoded: Fri Feb 14 2014 00:59:59 GMT+0100 (CET) -> 01_0010_7E21_10_0100
	Header decoded: Fri Feb 14 2014 00:59:59 GMT+0100 (CET) -> 01_0010_7E31_10_0100
	Header decoded: Fri Feb 14 2014 00:59:59 GMT+0100 (CET) -> 01_0010_7E32_10_0100
	Header decoded: Fri Feb 14 2014 00:59:59 GMT+0100 (CET) -> 01_0010_7E33_10_0100
	Header decoded: Fri Feb 14 2014 00:59:59 GMT+0100 (CET) -> 01_0010_7E34_10_0100
	Header decoded: Fri Feb 14 2014 00:59:59 GMT+0100 (CET) -> 01_0010_7E35_10_0100
	Header decoded: Fri Feb 14 2014 00:59:58 GMT+0100 (CET) -> 01_0015_7E11_10_0100
	Header decoded: Fri Feb 14 2014 01:00:00 GMT+0100 (CET) -> 01_6651_7E11_10_0200
	Header decoded: Fri Feb 14 2014 00:59:52 GMT+0100 (CET) -> 01_6652_7E11_10_0200
	Header decoded: Fri Feb 14 2014 00:59:56 GMT+0100 (CET) -> 01_6653_7E11_10_0200
	Header decoded: Fri Feb 14 2014 01:00:00 GMT+0100 (CET) -> 01_6654_7E11_10_0200
	Header decoded: Fri Feb 14 2014 00:59:42 GMT+0100 (CET) -> 01_6655_7E11_10_0200
	Header decoded: Fri Feb 14 2014 01:00:00 GMT+0100 (CET) -> 01_7E11_6651_10_0100
	HeaderSet decoded: Fri Feb 14 2014 01:00:00 GMT+0100 (CET) -> 00_0010_0053_10_0100,01_0010_7E11_10_0100,01_0010_7E12_10_0100,01_0010_7E21_10_0100,01_0010_7E31_10_0100,01_0010_7E32_10_0100,01_0010_7E33_10_0100,01_0010_7E34_10_0100,01_0010_7E35_10_0100,01_0015_7E11_10_0100,01_6651_7E11_10_0200,01_6652_7E11_10_0200,01_6653_7E11_10_0200,01_6654_7E11_10_0200,01_6655_7E11_10_0200,01_7E11_6651_10_0100
	Header decoded: Fri Feb 14 2014 01:05:00 GMT+0100 (CET) -> 00_0010_0053_10_0100
	Header decoded: Fri Feb 14 2014 01:04:58 GMT+0100 (CET) -> 01_0010_7E11_10_0100
	Header decoded: Fri Feb 14 2014 01:04:57 GMT+0100 (CET) -> 01_0010_7E12_10_0100
	Header decoded: Fri Feb 14 2014 01:04:59 GMT+0100 (CET) -> 01_0010_7E21_10_0100
	Header decoded: Fri Feb 14 2014 01:04:59 GMT+0100 (CET) -> 01_0010_7E31_10_0100
	Header decoded: Fri Feb 14 2014 01:04:59 GMT+0100 (CET) -> 01_0010_7E32_10_0100
	Header decoded: Fri Feb 14 2014 01:04:59 GMT+0100 (CET) -> 01_0010_7E33_10_0100
	Header decoded: Fri Feb 14 2014 01:04:59 GMT+0100 (CET) -> 01_0010_7E34_10_0100
	Header decoded: Fri Feb 14 2014 01:04:59 GMT+0100 (CET) -> 01_0010_7E35_10_0100
	Header decoded: Fri Feb 14 2014 01:04:59 GMT+0100 (CET) -> 01_0015_7E11_10_0100
	Header decoded: Fri Feb 14 2014 01:05:00 GMT+0100 (CET) -> 01_6651_7E11_10_0200
	Header decoded: Fri Feb 14 2014 01:04:30 GMT+0100 (CET) -> 01_6652_7E11_10_0200
	Header decoded: Fri Feb 14 2014 01:04:56 GMT+0100 (CET) -> 01_6653_7E11_10_0200
	Header decoded: Fri Feb 14 2014 01:05:00 GMT+0100 (CET) -> 01_6654_7E11_10_0200
	Header decoded: Fri Feb 14 2014 01:04:42 GMT+0100 (CET) -> 01_6655_7E11_10_0200
	Header decoded: Fri Feb 14 2014 01:05:00 GMT+0100 (CET) -> 01_7E11_6651_10_0100
	HeaderSet decoded: Fri Feb 14 2014 01:05:00 GMT+0100 (CET) -> 00_0010_0053_10_0100,01_0010_7E11_10_0100,01_0010_7E12_10_0100,01_0010_7E21_10_0100,01_0010_7E31_10_0100,01_0010_7E32_10_0100,01_0010_7E33_10_0100,01_0010_7E34_10_0100,01_0010_7E35_10_0100,01_0015_7E11_10_0100,01_6651_7E11_10_0200,01_6652_7E11_10_0200,01_6653_7E11_10_0200,01_6654_7E11_10_0200,01_6655_7E11_10_0200,01_7E11_6651_10_0100
	--- SNIP --- EVEN MORE OF THAT HERE --- SNIP ---


