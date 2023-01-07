# customizer2

A simple library and command-line tool to load and save configuration from and to a RESOL controller.


## Prerequisites

- Node.js version 16 or later
- VBus/USB, VBus/LAN, DL2, DL3, KM2 or DL2Plus or any other device to interface with the VBus
- a RESOL controller that supports value ID hashing (most modern controllers do)


## Setup

```
cd $PROJECT_DIR
git clone https://github.com/danielwippermann/resol-vbus
cd resol-vbus
npm i
```


## Usage as a library

The library can be used by requiring the `examples/customizer2/src/index.js` module which
re-exports the most important features.

```
const {
    loadConfiguration,
} = require('.../resol-vbus/examples/customizer2/src/index');

const connection = createTcpOrSerialConnectionHere();

await connection.connect();

const values = {
    'Solar_SystemId': null,
};

await loadConfiguration(connection, values);

await connection.disconnect();

console.log(values.Solar_SystemId);
```


## Usage as a command-line tool

The tool part can be found under `examples/customizer2/bin/customizer2`.

It loads `examples/customizer2/src/config.js` for its configuration. Please copy the template
file and edit it before the first use:

```
cd $PROJECT_DIR/resol-vbus/examples/customizer2/src
cp config-example.js config.js
$EDITOR config.js
```

Once it is configured you can run the tool:

```
$ alias customizer2=$PROJECT_DIR/resol-vbus/examples/customizer2/bin/customizer2

$ customizer2 --help
USAGE: customizer2 [--debug] [--out <filename>] <action> <filename>

OPTIONS:
    --help               Print this help
    --debug              Print more progress information
    --out <filename>     Write result to file

ARGUMENTS:
    <action>             Either "load" or "save"
    <filename>           File containing list of values to load or save

$ cat my-job.json
{
    "Schema": null
}

$ customizer2 load my-job.json --out -
[
    {
        "valueId": "Schema",
        "value": 0
    }
]

$ customizer2 load my-job.json --out - --debug
Waiting for free bus...
Got bus offer from 0x7e11, getting changeset...
Got changeset 0x2ce921a2!
Loading value info cache from $PROJECT_DIR/resol-vbus/examples/customizer2/cache/7e11_2ce921a2.json...
Cache loaded! Cached entry count: 8888
Known values: 1, unknown values: 0
Getting value for "Schema" (0x0056)...
Got value 0 (0x00000000)!
Valid values: 1, invalid values: 0, unknown values: 0!
Releasing bus...
Bus released!
[
    {
        "valueId": "Schema",
        "value": 0
    }
]
```
