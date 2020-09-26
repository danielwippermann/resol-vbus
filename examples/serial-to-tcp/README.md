# serial-to-tcp

Allows TCP access to serial port based VBus connections.


## Overview

There are two types of VBus adapters:

- TCP based: DL2, DL3, KM2, VBus/LAN
- serial port based: VBus/USB, USB port of DeltaSol SLT and other controllers

This tool connects to one or more serial port based adapters and exposes them over TCP. This allows:

- transmitting VBus data over longer distances than USB or serial ports would normally permit
- accessing serial port based adapters from applications that only support TCP based ones


## Initial setup

```
$ cd <workspace>
$ git clone https://github.com/danielwippermann/resol-vbus
$ cd resol-vbus
$ npm install --production
$ cd examples/serial-to-tcp
$ cp config.js.example config.js
```


## Configuration

This tool needs a configuration file called `config.js`. The repository already contains a `config.js.example` file that was copied during the initial setup above as a starting point.

```javascript
module.exports = {
    // A list of serial ports to connect to
    serialPorts: [{
        channel: 1,
        path: '/dev/tty.usbmodem141301',
        baudrate: 9600,
    }, {
        channel: 2,
        path: '/dev/tty.SLAB...',
        baudrate: 9600,
    }],

    // The TCP port on which the service is listening for incoming connections
    port: 7053,
};
```

If you only want to connect to a single serial port it is recommended to configure that to use channel 0, since most applications will by default try and connect that channel 0.


## Using the tool

After adjusting the configuration, just run the `main.js`:

```
$ cd <workspace>
$ cd resol-vbus/examples/serial-to-tcp
$ node main.js
Opening serial port...
Opening TCP endpoint...
Waiting for connections...
```


## Known issues

- Selecting a non-existing channel using the `CHANNEL` command returns `+OK` instead of an error.
- Sending the `DATA` command with a non-existing channel selected returns `+OK`, but immediately closes the connection afterwards.


## License

The MIT License (MIT)

Copyright (c) 2013-2020, Daniel Wippermann.

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
