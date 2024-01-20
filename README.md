# resol-vbus

#### A JavaScript library for processing RESOL VBus data.

[![NPM version](https://img.shields.io/npm/v/resol-vbus.svg)](https://npmjs.org/package/resol-vbus)
[![Node.js CI](https://github.com/danielwippermann/resol-vbus/actions/workflows/node.js.yml/badge.svg)](https://github.com/danielwippermann/resol-vbus/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/github/danielwippermann/resol-vbus/branch/master/graph/badge.svg?token=SEJoNC9Viy)](https://codecov.io/github/danielwippermann/resol-vbus)
[![License](https://img.shields.io/npm/l/resol-vbus.svg)](http://opensource.org/licenses/MIT)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdanielwippermann%2Fresol-vbus.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdanielwippermann%2Fresol-vbus?ref=badge_shield)



## Features

* Connects to various RESOL VBus devices
* Processes live and recorded VBus data streams
* Discovers LAN-enabled RESOL devices on the local network
* Allows to send parameterization commands to a controller
* Synchronizes recorded VBus data from a RESOL datalogger to your local file system
* Converts recorded VBus data into human or machine readable formats, optionally allowing to filter the output



## Documentation

You can find the work-in-progress documentation for this project here:

[http://danielwippermann.github.io/resol-vbus/](http://danielwippermann.github.io/resol-vbus/)

The JSDoc-generated documentation is located here:

[http://danielwippermann.github.io/resol-vbus/#/jsdoc](http://danielwippermann.github.io/resol-vbus/#/jsdoc)



## Installation

If you want to use this module in your own application, you can just install it from the npm registry:

	⌘  npm install --save resol-vbus

If you want to contribute to it you might want to check out the latest version from GitHub:

	⌘  git clone https://github.com/danielwippermann/resol-vbus.git
	⌘  cd resol-vbus
	⌘  npm install



## Running the console examples

	⌘  node examples/<name>/index.js



## Running the tests

To start a single run of the test suite just enter the following command
into your shell:

	⌘  npm test

To run the tests after each change to the source just enter the
following command into your shell:

	⌘  npm test -- --watch



## Supported Devices & Services

* [All current RESOL controllers with VBus](http://www.resol.de/index/produkte/sprache/en)
* [RESOL DL2 Datalogger](http://www.resol.de/index/produktdetail/kategorie/2/sprache/en/id/12)
* [RESOL DL3 Datalogger](http://www.resol.de/index/produktdetail/kategorie/2/sprache/en/id/86)
* [RESOL KM2 Communication module](http://www.resol.de/index/produktdetail/kategorie/2/id/209/sprache/en)
* [RESOL VBus/LAN interface adapter](http://www.resol.de/index/produktdetail/kategorie/2/id/76/sprache/en)
* [RESOL VBus/USB interface adapter](http://www.resol.de/index/produktdetail/kategorie/2/id/13/sprache/en)
* [RESOL VBus.net](http://www.vbus.net/)



## <a name="specs"></a>Technical Information & Specifications

* [RESOL VBus Google Group](https://groups.google.com/forum/#!forum/resol-vbus)
* [RESOL VBus Protocol Specification](http://danielwippermann.github.io/resol-vbus/#/md/docs/vbus-specification)
* [RESOL VBus Packet List](http://danielwippermann.github.io/resol-vbus/#/vsf)
* [RESOL VBus Recording File Format](http://danielwippermann.github.io/resol-vbus/#/md/docs/vbus-recording-file-format)
* [RESOL VBus Specification File Format v1](http://danielwippermann.github.io/resol-vbus/#/md/docs/vbus-specification-file-format-v1)
* [RESOL VBus over TCP Specification](http://danielwippermann.github.io/resol-vbus/#/md/docs/vbus-over-tcp)
* [RESOL DL2 (v2) & DL3 Data Download API](http://danielwippermann.github.io/resol-vbus/#/md/docs/dlx-data-download-api)



## Known issues

- The `ConfigurationOptimizers` do not yet detect the firmware version running on the controller to be configured.
  That sometimes causes configuration loads and saves to fail because unknown values are read from or written to
  (e.g. using the "customizer" example on a DeltaSol MX with firmware version 1.11 or below).



## Short-term plans

- Remove current `ConfigurationOptimizer` constructs in favor of RESOL's official support.


## Projects using `resol-vbus`

- https://github.com/BenniG82/vbus-to-homie


## Changelog

## Work in progress

- [BREAKING CHANGE] Changed IPv6 device discovery support activation.
    Previously the `options` object passed into `TcpDataSourceProvider#discoverDevices`
    needed an `ipv6` boolean value set to `true`. That option was removed in favor of a
    `family` string value which defaults to `"IPv4"` but can be set to `"IPv6"` to
    perform a IPv6 device discovery. In that case the two other options `localAddress`
    and `broadcastInterface` are required as well. See the documentation for more details.


## Version 0.28.0 (2024-01-06)

- Add `extendFieldData` option to `DLxJsonConverter`.
- Add `SpecificationFile#getPacketTemplate`.
- Add password and channel checks to TCP endpoint. (#93)
- Add `TcpConnection#disableReconnect`.
- Correctly propagate errors during `TcpConnection` reconnect.


## Version 0.27.0 (2022-03-09)

- Fix bugs in `SerialConnection` and `SerialDataSourceProvider`


## Version 0.26.0 (2022-12-18, never released publicly)

- [BREAKING CHANGE] Removed `Recorder`, `DLxRecorder` and `FileSystemRecorder`
    The `Recorder` style of interfaces was not well thought out and unreliable. This
    version removes it, with no replacement!
- [BREAKING CHANGE] Removed `lodash` dependency
    Although this removal was done with great caution and a lot of test coverage, there
    might be side effects we have not thought of.


## Version 0.25.0 (2022-04-12)

- Update several dependencies to fix security issues.
- Update VBus specification file to 20220206.
- Add support for CRC7 in protocols using minor version 1.
- Add `Datagram` and `Telegram` support to `VBusRecordingConverter`.


## Version 0.24.0 (2021-09-12)

- [BREAKING CHANGE] Replaced the deprecated "request" dependency with Fetch API impl
    Since the "request" dependency that was used in the `DLxRecorder` class has
    been deprecated, the code was refactored to use a Fetch API implementation instead.
    But since the method `DLxRecorder#downloadToStream` expected "request"-specific options,
    it had to be changed, too. This method was renamed to `DLxRecorder#_downloadToStream` to
    indicate that it is a class-private method and its signature was changed to accept
    Fetch API specific options.


## Version 0.23.0 (2021-05-14)

- [BREAKING CHANGE] Replacing custom inheritance code with `class` syntax
    Up to this version inheritance was established using a custom `extend` function.
    Since only modern ECMAscript runtimes are supported since the last release the code was
    refactored to use the ECMAscript `class` syntax instead. In that process the `extend`
    function was removed, both the standalone one and the static class function that was
    added to every "class".
- [BREAKING CHANGE] Returning a `Promise` from `channelListCallback` callback
    The `TcpConnection` accepts a `channelListCallback`. This callback gets called with the
    list of channels returned from the `CHANNELLIST` command and a `done` callback.

    Up to this version the return value of the `channelListCallback` was ignored. Starting
    with this version this behaviour is changed if the return value of the callback is
    a `Promise`:
    - if the `Promise` reject, the `done` callback is automatically called with `done(reason)`
    - if the `Promise` resolves, the `done` callback is automatically called with
      `done(null, result)`

    This allows the `channelListCallback` to be `async`.
- Errors thrown by `TcpConnection#connect` now have a `vbusPhase` member describing on which
  VBus-over-TCP command the error occurred


## Version 0.22.0 (2021-05-10)

- [BREAKING CHANGE] Dropping support for Node.js versions < 12


## Version 0.21.0 (2020-05-02)

- [BREAKING CHANGE] Returning a `Promise` from `filterPacket` or `filterDatagram` callbacks
    The `Connection#transceive` method and many of the helper methods that use it
    accept a `filterPacket` and/or `filterDatagram` callback. Those callbacks get called
    with the data to filter and a `done` callback.

    Up to this version the return value of the filter callbacks was ignored. Starting with
    this version this behaviour is changed if the return value of the filter callbacks is
    a `Promise`:
    - if the `Promise` rejects, the `done` callback is automatically called with `done(reason)`
    - if the `Promise` resolves with `null` or `undefined`, the `done` callback is not called
    - if the `Promise` resolves with any other result, the `done` callback is automatically
      called with `done(null, result)`

    This allows `async` filter callbacks!
- Add `SerialConnection#baudrate` option.
- Stop running Travis tests under Node 6.
    Some dependency of `jest` does not work under Node 6 making tests break
    for that target. The `resol-vbus` library itself might still work under
    Node 6, but there is no guarantee...


## Version 0.20.0 (2019-06-15)

- This version contains several breaking changes! You have been warned...
	- Refactor code to make use of ES2018 features (using Babel to back-support up to Node.js 6)
	- Remove custom `Promise` implementation in favor of built-in, native one.
	- `Promise` return values no longer provide the `finally` and `done` methods.
	- Remove `utils.promise`, `utils.Promise` and `utils.cancelablePromise`.
	- Add `reportProgress` and `checkCanceled` options to `ConnectionCustomizer#transceive{Configuration,Value}` as a replacement to the previously used `cancelablePromise` solution.
- Add RESOL DeltaSol C configuration optimizer.
- Add support for VBus-over-TCP wrapped in TLS.


## Version 0.17.0 (2018-02-10)

- Add `Buffer` support to `Connection#(get|set)ValueById` for values larger than 32-bit.
- Add `Connection#getCaps1`.
- Add bulk value transaction support to `Connection` class.
- Add support to generate and parse "type 9" comment records using `VBusRecordingConverter`.
- Make it easier to create a `Specification` from a `SpecificationFile`.
- Extend `vbustouch-proxy` example with text data logging feature.
- Update dependencies.
- Some minor bug fixes.


### Version 0.16.0 (2017-02-01)

- Use VSF binary file to load VBus specification data
- Add support to read and write raw data in VBus recordings
- Extend `VBusRecordingConverter` to support fast topology-only scan
- Code clean up
- Several minor bug fixes


### Version 0.15.0 (2016-03-30)

- Update VBus specification data
- Several minor bug fixes


### Version 0.14.0 (2015-10-29)

- Improve configuration optimizers and their discovery
- Update VBus specification data


### Version 0.13.0 (2015-05-14)

- Add configuration optimizers for RESOL DeltaSol SLT
- Add BlockType support


### Version 0.12.2 (2015-05-05)

- Update VBus specification data


### Version 0.12.1 (2015-04-27)

- Add configuration optimizers for RESOL DeltaSol MX and BS/4 v2
- Add a simple JSON live data server example
- Add some documentation
- Several bug fixes


### Version 0.12.0 (2015-02-28)

- Add `vbustouch-proxy` example
- Add support for rounding floating point numbers


### Version 0.11.1 (2014-11-04)

- Fix a floating point bug caused by `setRawValue`


### Version 0.11.0 (2014-10-29)

- Added support for setting packet field values
- Several bug fixes


### Version 0.10.0 (2014-04-26)

- Finalized support for customizing controller configuration.
- Several bug fixes.


### Version 0.9.0 (2014-03-16)

- Completed Recorder class by adding support for recording
- Added unit conversion to VBus specification
- Several bug fixes.


### Version 0.8.0 (2014-03-03)

- Extended Converter and VBusRecordingConverter to support object mode in stream (for performance reason)
- Fixed several bugs
- Increased test coverage and completed documentation.


### Version 0.7.0 (2014-02-17)

First release to the NPM registry.



## Contributors

* Thorsten Müller
* Paul Hanna
* Sabine Käß
* Andrew Thompson (@thompsa)
* @t9zx
* @SurfGargano



## Legal Notices

RESOL, VBus, VBus.net and others are trademarks or registered trademarks
of RESOL - Elektronische Regelungen GmbH.

All other trademarks are the property of their respective owners.



## License

The MIT License (MIT)

Copyright (c) 2013-present, Daniel Wippermann.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdanielwippermann%2Fresol-vbus.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdanielwippermann%2Fresol-vbus?ref=badge_large)
