# resol-vbus

#### A JavaScript library for processing RESOL VBus data.

<iframe src="http://ghbtns.com/github-btn.html?user=danielwippermann&repo=resol-vbus&type=watch&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="77" height="30"></iframe>

[![NPM version](https://img.shields.io/npm/v/resol-vbus.svg)](https://npmjs.org/package/resol-vbus)
[![Build Status](https://img.shields.io/travis/danielwippermann/resol-vbus.svg)](https://travis-ci.org/danielwippermann/resol-vbus)
[![Coverage Status](https://img.shields.io/coveralls/danielwippermann/resol-vbus.svg)](https://coveralls.io/r/danielwippermann/resol-vbus)
[![Dependency Status](https://img.shields.io/david/danielwippermann/resol-vbus.svg)](https://david-dm.org/danielwippermann/resol-vbus)
[![devDependency Status](https://img.shields.io/david/dev/danielwippermann/resol-vbus.svg)](https://david-dm.org/danielwippermann/resol-vbus#info=devDependencies)
[![License](https://img.shields.io/npm/l/resol-vbus.svg)](http://opensource.org/licenses/MIT)



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

[http://danielwippermann.github.io/resol-vbus/jsdoc/classes.list.html](http://danielwippermann.github.io/resol-vbus/jsdoc/classes.list.html)



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

	⌘  gulp

In addition to that the project is configured to watch its own files for
modification and rerun the documentation generator and test suite every
time you hit save on a file. To run that just enter the following command
into your shell:

	⌘  gulp watch



## Supported Devices & Services

* [All current RESOL controllers with VBus](http://www.resol.de/index/produkte/sprache/en)
* [RESOL DL2 Datalogger](http://www.resol.de/index/produktdetail/kategorie/2/sprache/en/id/12)
* [RESOL DL3 Datalogger](http://www.resol.de/index/produktdetail/kategorie/2/sprache/en/id/86)
* [RESOL VBus/LAN interface adapter](http://www.resol.de/index/produktdetail/kategorie/2/id/76/sprache/en)
* [RESOL VBus/USB interface adapter](http://www.resol.de/index/produktdetail/kategorie/2/id/13/sprache/en)
* [RESOL VBus.net](http://www.vbus.net/)



## <a name="specs"></a>Technical Information & Specifications

* [RESOL VBus Google Group](https://groups.google.com/forum/#!forum/resol-vbus)
* [RESOL VBus Protocol Specification](https://drive.google.com/file/d/0B4wMTuLGRPi2RnU0Vm1tTG5wM1k/edit?usp=sharing)
* [RESOL VBus Packet List](http://danielwippermann.github.io/resol-vbus/vbus-packets.html)
* [RESOL VBus File Format Specification](http://danielwippermann.github.io/resol-vbus/vbus-recording-file-format.html)
* [RESOL VBus over TCP Specification](http://danielwippermann.github.io/resol-vbus/vbus-over-tcp.html)
* [RESOL DL2 (v1) Data Download API](https://drive.google.com/file/d/0B4wMTuLGRPi2YmM5ZTJiNDQtNjkyMi00ZWYzLTgzYzgtYTdiMjBlZmI5ODgx/edit?usp=sharing)
* [RESOL DL2 (v2) & DL3 Data Download API](http://danielwippermann.github.io/resol-vbus/dlx-data-download-api.html)



## Changelog

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



## Legal Notices

RESOL, VBus, VBus.net and others are trademarks or registered trademarks
of RESOL - Elektronische Regelungen GmbH.

All other trademarks are the property of their respective owners.



## License

The MIT License (MIT)

Copyright (c) 2013-2014, Daniel Wippermann.

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
