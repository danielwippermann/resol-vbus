# json-live-data-server

Starts up a simple web server to provide VBus live data (received over either
a TCP or serial connection) in different formats:

  * responding with a JSON list of VBus values (`/api/v1/live-data`)
  * responding with Prometheus metrics of the VBus values (`/api/v1/monitor`)
  * responding to DLx-Download-API requests (`/cgi-bin/get_resol_device_information` and `/dlx/download/download`)


## Installation

```
$ git clone https://github.com/danielwippermann/resol-vbus.git
$ cd resol-vbus
$ npm install
$ cd examples/json-live-data-server
$ npm install
$ cp config.js.example config.js
```


## Configuration

You must edit the file `config.js` to adapt it to your environment. See the file for details.


### Serial to json

To receive VBus data from a VBus/USB adapter, the configuration must be changed appropriately:

```
connectionClassName: 'SerialConnection',

connectionOptions: {
    path: '<YOUR_SERIAL_PORT>',
},
```


## Starting

```
$ cd .../resol-vbus/examples/json-live-data-server
$ node index.js
info: Ready to serve from the following URLs:
info:     - http://127.0.0.1:3333/api/v1/live-data (internal)
```


### Data Returned as JSON (version 1, without units)

Accessing one of the listed URLs with a browser returns a simplified list of VBus value:

```
$ curl -s http://127.0.0.1:3333/api/v1/live-data | head -n 20
[
    {
        "id": "00_0010_4221_10_0100_000_2_0",
        "name": "Temperature sensor 1",
        "rawValue": 21.700000000000003
    },
    {
        "id": "00_0010_4221_10_0100_002_2_0",
        "name": "Temperature sensor 2",
        "rawValue": 15.9
    },
    {
        "id": "00_0010_4221_10_0100_004_2_0",
        "name": "Temperature sensor 3",
        "rawValue": 22.200000000000003
    },
    {
        "id": "00_0010_4221_10_0100_006_2_0",
        "name": "Temperature sensor 4",
        "rawValue": 21.5
```

In addition to that the same data is written to disk into a file called `live-data.json`.


### Data Returned as JSON (version 2, with units)

Accessing one of the listed URLs with a browser returns a simplified list of VBus value:

```
$ curl -s http://127.0.0.1:3333/api/v2/live-data | head -n 20
[
    {
        "id": "00_0010_7E21_10_0100_000_2_0",
        "name": "Flow set temperature (mapped)",
        "rawValue": 51.300000000000004,
        "unitCode": "DegreesCelsius",
        "unitFamily": "Temperature",
        "unitText": " °C"
    },
    {
        "id": "00_0010_7E21_10_0100_002_1_0",
        "name": "Operating state",
        "rawValue": 3,
        "unitCode": "None",
        "unitFamily": null,
        "unitText": ""
    }
]
```


### Data Returned as Prometheus Compatible Metric

```
$ curl http://127.0.0.1:3333/api/v1/monitor
# HELP resol Values as retreived from Resol Solar
# TYPE resol gauge
resol{id="00_0010_1001_10_0100_000_4_0",name="System date"} 616147995
resol{id="00_0010_1001_10_0100_004_2_0",name="Temperature sensor 1"} 21.1
resol{id="00_0010_1001_10_0100_006_2_0",name="Temperature sensor 2"} 51.900000000000006
resol{id="00_0010_1001_10_0100_008_2_0",name="Temperature sensor 3"} 54.400000000000006
resol{id="00_0010_1001_10_0100_010_2_0",name="Temperature sensor 4"} 888.8000000000001
resol{id="00_0010_1001_10_0100_012_2_0",name="Temperature sensor 5"} 999.9000000000001
resol{id="00_0010_1001_10_0100_014_2_0",name="Temperature VFS/RPS (S6)"} 999.9000000000001
resol{id="00_0010_1001_10_0100_016_4_0",name="Flow rate V40"} 0
resol{id="00_0010_1001_10_0100_020_4_0",name="Flow rate VFS (S6)"} 0
resol{id="00_0010_1001_10_0100_024_4_0",name="Flow rate Flowrotor (S7)"} 0
resol{id="00_0010_1001_10_0100_028_2_0",name="Pressure RPS (S6)"} 99.99000000000001
resol{id="00_0010_1001_10_0100_030_1_0",name="Pump speed relay 1"} 0
resol{id="00_0010_1001_10_0100_031_1_0",name="Pump speed relay 2"} 0
resol{id="00_0010_1001_10_0100_032_1_0",name="Pump speed relay 3"} 0
resol{id="00_0010_1001_10_0100_033_1_0",name="Pump speed relay 4"} 0
resol{id="00_0010_1001_10_0100_034_1_0",name="PWM A"} 0
resol{id="00_0010_1001_10_0100_035_1_0",name="PWM B"} 0
resol{id="00_0010_1001_10_0100_036_4_0",name="Error mask"} 0
resol{id="00_0010_1001_10_0100_036_1_1",name="Error: Sensor line broken"} 0
resol{id="00_0010_1001_10_0100_036_1_2",name="Error: Sensor line short-circuited"} 0
resol{id="00_0010_1001_10_0100_036_1_32",name="Error: Flow rate monitoring"} 0
resol{id="00_0010_1001_10_0100_036_1_64",name="Error: Overpressure"} 0
resol{id="00_0010_1001_10_0100_036_1_128",name="Error: Low pressure"} 0
resol{id="00_0010_1001_10_0100_036_1_512",name="Error: Data memory"} 0
resol{id="00_0010_1001_10_0100_036_1_1024",name="Error: Real-time clock"} 0
resol{id="00_0010_1001_10_0100_036_1_4096",name="Error: Twin pump"} 0
resol{id="00_0010_1001_10_0100_040_4_0",name="Warning mask"} 0
resol{id="00_0010_1001_10_0100_040_1_4",name="Warning: ΔT too high"} 0
resol{id="00_0010_1001_10_0100_040_1_8",name="Warning: Night circulation"} 0
resol{id="00_0010_1001_10_0100_040_1_16",name="Warning: Flow/Return interchanged"} 0
resol{id="00_0010_1001_10_0100_040_1_1024",name="Warning: Maximum store temperature"} 0
resol{id="00_0010_1001_10_0100_040_1_2048",name="Error: SD card"} 0
```


### Data Returned in DL2/DL3/KM1 compatible format

```
$ curl http://127.0.0.1:3333/dlx/download/download?source=current&outputType=json | head -n 20
{
    "headersets":[{
        "timestamp":1672896988.004,
        "packets":[{
            "header_index":0,
            "timestamp":1672896988.004,
            "field_values":[{
                "field_index":0,
                "raw_value":51.3,
                "value":"51.3"
            },{
                "field_index":1,
                "raw_value":3,
                "value":"3"
            }]
        }]
    }],
    "headerset_stats":{
        "headerset_count":1,
        "min_timestamp":1672896988.004,
        "max_timestamp":1672896988.004
    },
    "headers":[{
        "id":"00_0010_7E21_0100",
        "description":"VBus 0: DeltaSol MX [Heizkreis #1]",
        "channel":0,
        "destination_address":16,
        "source_address":32289,
        "protocol_version":16,
        "command":256,
        "info":0,
        "destination_name":"DFA",
        "source_name":"DeltaSol MX [Heizkreis #1]",
        "fields":[{
            "id":"000_2_0",
            "name":"Flow set temperature",
            "unit":" °C",
            "unit_code":"DegreesCelsius"
        },{
            "id":"002_1_0",
            "name":"Operating state",
            "unit":"",
            "unit_code":"None"
        }]
    }],
    "language":"en"
}
```


### Dummy `/cgi-bin/get_resol_device_information` for device detection / discovery support

```
$ curl http://127.0.0.1:3333/cgi-bin/get_resol_device_information
vendor = "RESOL"
product = "DL2"
serial = "001E66000000"
version = "2.1.0"
build = "201311280853"
name = "DL2-001E66000000"
features = "vbus,dl2"
```
