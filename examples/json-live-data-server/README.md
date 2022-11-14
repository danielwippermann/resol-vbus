# json-live-data-server

Starts up a simple web server

  * responding with a JSON list of VBus values (`/api/v1/live-data`)
  * responding with Prometheus metrics of the VBus values (`/api/v1/monitor`)


## Installation

	$ git clone https://github.com/danielwippermann/resol-vbus.git
	$ cd resol-vbus
	$ npm install
	$ cd examples/json-live-data-server
	$ npm install
	$ cp config.js.example config.js


## Configuration

You must edit the file `config.js` to adapt it to your environment. See the file for details.

### Serial to json

	...
	 connectionClassName: 'SerialConnection',
	 
	 connectionOptions: {
        /**
         * The serial port to which the Vbus/USB device is connected. (commonly 'dev/ttyACM0')
         * @type {String}
         */
        path: '<YOUR_SERIAL_PORT>',
	
    },


## Starting

	$ cd .../resol-vbus/examples/json-live-data-server
	$ node index.js
	info: Ready to serve from the following URLs:
	info:     - http://127.0.0.1:3333/api/v1/live-data (internal)
    

### Data Returned as JSON
Accessing one of the listed URLs with a browser returns a simplified list of VBus value:

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

In addition to that the same data is written to disk into a file called `live-data.json`.

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
