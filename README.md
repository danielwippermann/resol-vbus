# resol-vbus

#### A JavaScript library for processing RESOL VBus data.

<iframe src="http://ghbtns.com/github-btn.html?user=danielwippermann&repo=resol-vbus&type=watch&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="77" height="30"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=danielwippermann&repo=resol-vbus&type=fork&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="80" height="30"></iframe>



## Features

* Connects to various RESOL VBus devices
* Processes live and recorded VBus data streams
* Discovers LAN-enabled RESOL devices on the local network
* Allows to send parameterization commands to a controller
* Synchronizes recorded VBus data from a RESOL datalogger to your local file system
* Converts recorded VBus data into human or machine readable formats, optionally allowing to filter the output



## Installation

	⌘  sudo npm install -g grunt-cli
	⌘  git clone https://github.com/danielwippermann/resol-vbus.git
	⌘  cd resol-vbus
	⌘  npm install



## Running the console examples

	⌘  node examples/<name>/index.js



## Running the node-webkit example

Currently hard-coded for developing on a Mac:

	⌘  grunt deploy:logger



## Running the tests

To start a single run of the test suite just enter the following command
into your shell:

	⌘  grunt test

In addition to that the project is configured to watch its own files for
modification and rerun the documentation generator and test suite every
time you hit save on a file. To run that just enter the following command
into your shell:

	⌘  grunt watch



## Supported Devices & Services

* [All current RESOL controllers with VBus](http://www.resol.de/index/produkte/sprache/en)
* [RESOL DL2 Datalogger](http://www.resol.de/index/produktdetail/kategorie/2/sprache/en/id/12)
* [RESOL DL3 Datalogger](http://www.resol.de/index/produktdetail/kategorie/2/sprache/en/id/86)
* [RESOL VBus/LAN interface adapter](http://www.resol.de/index/produktdetail/kategorie/2/id/76/sprache/en)
* [RESOL VBus/USB interface adapter](http://www.resol.de/index/produktdetail/kategorie/2/id/13/sprache/en)
* [RESOL VBus.net](http://www.vbus.net/)



## Technical Information & Specifications

* [RESOL VBus Google Group](https://groups.google.com/forum/#!forum/resol-vbus)
* [RESOL VBus Protocol Specification](http://goo.gl/HP6ZY)
* [RESOL VBus File Format Specification](https://docs.google.com/document/d/1qNdpl8pB409eeCmpoApXBVtR8feIn_Jz3XEk8E5r7Go)
* [RESOL VBus over TCP Specification](https://docs.google.com/document/d/1fIDqsWv2X7EfezLiP9f2P3vRdpmgbiK6kzcUUrMGoEU)



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
