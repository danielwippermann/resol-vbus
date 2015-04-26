# json-live-data-server

Starts up a simple web server responding with a JSON list of VBus values.


## Installation

	$ git clone https://github.com/danielwippermann/resol-vbus.git
	$ cd resol-vbus
	$ npm install
	$ cd examples/json-live-data-server
	$ npm install
	$ cp config.js.example config.js


## Configuration

You must edit the file `config.js` to adapt it to your environment. See the file for details.


## Starting

	$ cd .../resol-vbus/examples/json-live-data-server
	$ node index.js
	info: Ready to serve from the following URLs:
	info:     - http://127.0.0.1:3333/api/v1/live-data (internal)

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
