# vbustouch-proxy

A simple VBus data logger and webserver, implemented to trick the iOS "VBusTouch" app into thinking it would be a datalogger.


## Installation

    $ git clone https://github.com/danielwippermann/resol-vbus
    $ cd resol-vbus
    $ npm install
    $ cd examples/vbustouch-proxy
    $ cp config.js.example config.js


## Configuration

The `config.js` file contains several configuration options that allow tweaking the proxy.

### `connectionClassName` and `connectionOptions`

See documentaion for the `Connection`, `SerialConnection` and `TcpConnection` classes for details.

### `loggingInterval`

The time interval in which VBus data is stored to the file system.

### `loggingTimeToLive`

The time interval after which a packet is discarded if it was not received over the VBus connection (e.g. due to configuration changes).

### `loggingPath`

The directory where the recorded VBus data is stored.

### `webServerPort`

The web server binds itself to this port number.


## Usage

To start the proxy application just run the `index.js` file like this:

    $ cd .../resol-vbus/examples/vbustouch-proxy
    $ node index.js
    Connecting to VBus...
    Connection state changed to CONNECTING
    Connection state changed to CONNECTED
    Connected to VBus...
    Starting web server...
    Starting HeaderSetConsolidator timer...
    Started web server at:
      - http://0.0.0.0:3000/ (internal)
      - http://127.0.0.1:3000/ (internal)
      - http://192.168.192.15:3000/

After the application started successfully, it prints out a list of URLs under which it can be accessed. URLs flagged as `(internal)` only work if accessed by the device the application is running on.


