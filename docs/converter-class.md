---
layout: docs
title: Converter
---


## Basics

The `Converter` sub-classes are designed to generate or decode various file formats, or both.

If a `Converter` sub-class supports generating data in a given file format it implements the [`Readable` stream API](https://nodejs.org/api/stream.html#stream_class_stream_readable) documented by the Node.js core team. Calling the `convertHeaderSet` function on this `Converter` sub-classes generates the appropriately formatted data that then flow out of the readable stream into its consumers. An example for a generating `Converter` sub-class is the [`DLxJsonConverter` class](dlx-json-converter-class.html).

If a `Converter` sub-class supports decoding data in a given file format it implements the [`Writable` stream API](https://nodejs.org/api/stream.html#stream_class_stream_writable) documented by the Node.js core team. Data written to that stream gets decoded and then emits `headerSet` events providing the decoded `HeaderSet` instance as a parameter. An example for a decoding `Converter` sub-class is the [`VBusRecordingConverter` class](vbus-recording-converter-class.html). That class also supports generating data by implementing the `Readable` stream API described above.


## Sub-classes

| Class name | File format | Readable stream? | Writable stream? |
|:--|:--|:-:|:-:|
| [`VBusRecordingConverter`](vbus-recording-converter-class.html) | [VBus Recording File Format](vbus-recording-file-format.html) | Yes | Yes |
| [`DLxJsonConverter`](dlx-json-converter-class.html) | Datalogger compatible JSON | Yes | No |
| [`TextConverter`](text-converter-class.html) | CSV and other text based formats | Yes | No |

