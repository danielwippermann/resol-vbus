---
layout: docs
title: DLx Data Download API
---



This document describes the API that can be used to download data from a RESOL DataLogger.


#### Supported Devices

- RESOL Datalogger DL2 (version 2.0 or higher)
- RESOL Datalogger DL3 (version 2.0 or higher)


#### Common parameters

- **sessionAuthUsername**: user name for web interface access.
- **sessionAuthPassword**: password for web interface access.



## Get live data as JSON

	GET /dlx/download/live


#### Parameters

- **channel** (optional): only include data from given channel.
- **filter** (optional): the ID of the filter to apply on the data.
- **view** (optional): the ID of the view to apply on the data.


#### Example

	curl "http://$HOST/dlx/download/live?sessionAuthUsername=admin&sessionAuthPassword=admin"


#### Success Response

	HTTP/1.1 200 OK
	Content-Type: application/json

	{
	    "language": "de",
	    "headers": [{
	        "id": "00_0010_0053_0100",
	        "description": "VBus 0: DL3",
	        "channel": 0,
	        "destination_address": 16,
	        "source_address": 83,
	        "protocol_version": 16,
	        "command": 256,
	        "info": 0,
	        "destination_name": "DFA",
	        "source_name": "DL3",
	        "fields": [{
	            "id": "000_4_0",
	            "name": "Resistor Sensor 1",
	            "unit": " Ohm",
	            "unit_code": "Ohms"
	        }, {
	            "id": "004_4_0",
	            "name": "Resistor Sensor 2",
	            "unit": " Ohm",
	            "unit_code": "Ohms"
	        }, {
	            "id": "008_4_0",
	            "name": "Resistor Sensor 3",
	            "unit": " Ohm",
	            "unit_code": "Ohms"
	        }, {
	            "id": "012_4_0",
	            "name": "Current Sensor 4",
	            "unit": " mA",
	            "unit_code": "Milliamperes"
	        }, {
	            "id": "034_2_0",
	            "name": "Temperature Sensor 1",
	            "unit": " \u00B0C",
	            "unit_code": "DegreesCelsius"
	        }, {
	            "id": "036_2_0",
	            "name": "Temperature Sensor 2",
	            "unit": " \u00B0C",
	            "unit_code": "DegreesCelsius"
	        }, {
	            "id": "038_2_0",
	            "name": "Temperature Sensor 3",
	            "unit": " \u00B0C",
	            "unit_code": "DegreesCelsius"
	        }]
	    }],
	    "headerset_stats": {
	        "headerset_count": 1,
	        "min_timestamp": 1385490534.720000,
	        "max_timestamp": 1385490534.720000
	    },
	    "headersets": [{
	        "timestamp": 1385490534.720000,
	        "packets": [{
	            "header_index": 0,
	            "timestamp": 1385490534.606000,
	            "field_values": [{
	                "field_index": 0,
	                "raw_value": 994.973000,
	                "value": "994.973"
	            }, {
	                "field_index": 1,
	                "raw_value": 1072.768000,
	                "value": "1072.768"
	            }, {
	                "field_index": 2,
	                "raw_value": 1078.975000,
	                "value": "1078.975"
	            }, {
	                "field_index": 3,
	                "raw_value": 3.990000,
	                "value": "3.990"
	            }, {
	                "field_index": 4,
	                "raw_value": -1.200000,
	                "value": "-1.2"
	            }, {
	                "field_index": 5,
	                "raw_value": 18.600000,
	                "value": "18.6"
	            }, {
	                "field_index": 6,
	                "raw_value": 20.200000,
	                "value": "20.2"
	            }]
	        }]
	    }]
	}


#### Failure responses (HTTP status code 500)

- **InvalidFilterID**: the value of the `filter` parameter was invalid.
- **InvalidViewID**: the value of the `view` parameter was invalid.



## Download data

	GET /dlx/download/download

#### Parameters

- **source** (default `log`): source of the data (can be `log` for recorded data or `current` for live data).
- **inputType** (default `packets`): type of data to read from the source (can be `packets` for VBus v1 packets).
- **outputType** (default `text-tab-crlf`): output file format of the download. Can be:
	- **text-tab-crlf**: Tab separated text file with CR+LF line endings (Windows).
	- **text-tab-lf**: Tab separated text file with LF line endings (Linux / OSX).
	- **text-csv-crlf**: Semicolon separated text file with CR+LF line endings (Windows).
	- **text-csv-lf**: Semicolon separated text file with LF line endings (Linux / OSX).
	- **json**: JSON encoded text file.
	- **vbus**: Binary file conforming to VBus Recording File Format.
- **sieveInterval** (optional): allows filtering the data to be downloaded by specifying an interval in seconds that should be kept between two data records. For example: the DL2 could be configured to store data every 10 seconds, but you can download a file only containing hourly records by specifying `3600` here.
- **ttl** (optional): time-to-live in seconds. Records that have not been refreshed in this time are no longer included in the output.
- **startDate** (optional): start date in `MM/DD/YYYY` format.
- **endDate** (optional): end date in `MM/DD/YYYY` format.
- **dataLanguage** (optional): language code (ISO 639-1) to use for the text conversion.
- **filter** (optional): the ID of the filter to apply on the data.


#### Example

	curl "http://$HOST/dlx/download/live?sessionAuthUsername=admin&sessionAuthPassword=admin&outputType=json&source=current"


#### Sucess Response

	HTTP/1.1 200 OK
	Content-Type: application/json

	{
	    "language": "de",
	    "headers": [{
	        "id": "00_0010_0053_0100",
	        "description": "VBus 0: DL3",
	        "channel": 0,
	        "destination_address": 16,
	        "source_address": 83,
	        "protocol_version": 16,
	        "command": 256,
	        "info": 0,
	        "destination_name": "DFA",
	        "source_name": "DL3",
	        "fields": [{
	            "id": "000_4_0",
	            "name": "Resistor Sensor 1",
	            "unit": " Ohm",
	            "unit_code": "Ohms"
	        }, {
	            "id": "004_4_0",
	            "name": "Resistor Sensor 2",
	            "unit": " Ohm",
	            "unit_code": "Ohms"
	        }, {
	            "id": "008_4_0",
	            "name": "Resistor Sensor 3",
	            "unit": " Ohm",
	            "unit_code": "Ohms"
	        }, {
	            "id": "012_4_0",
	            "name": "Current Sensor 4",
	            "unit": " mA",
	            "unit_code": "Milliamperes"
	        }, {
	            "id": "034_2_0",
	            "name": "Temperature Sensor 1",
	            "unit": " \u00B0C",
	            "unit_code": "DegreesCelsius"
	        }, {
	            "id": "036_2_0",
	            "name": "Temperature Sensor 2",
	            "unit": " \u00B0C",
	            "unit_code": "DegreesCelsius"
	        }, {
	            "id": "038_2_0",
	            "name": "Temperature Sensor 3",
	            "unit": " \u00B0C",
	            "unit_code": "DegreesCelsius"
	        }]
	    }],
	    "headerset_stats": {
	        "headerset_count": 1,
	        "min_timestamp": 1385490534.720000,
	        "max_timestamp": 1385490534.720000
	    },
	    "headersets": [{
	        "timestamp": 1385490534.720000,
	        "packets": [{
	            "header_index": 0,
	            "timestamp": 1385490534.606000,
	            "field_values": [{
	                "field_index": 0,
	                "raw_value": 994.973000,
	                "value": "994.973"
	            }, {
	                "field_index": 1,
	                "raw_value": 1072.768000,
	                "value": "1072.768"
	            }, {
	                "field_index": 2,
	                "raw_value": 1078.975000,
	                "value": "1078.975"
	            }, {
	                "field_index": 3,
	                "raw_value": 3.990000,
	                "value": "3.990"
	            }, {
	                "field_index": 4,
	                "raw_value": -1.200000,
	                "value": "-1.2"
	            }, {
	                "field_index": 5,
	                "raw_value": 18.600000,
	                "value": "18.6"
	            }, {
	                "field_index": 6,
	                "raw_value": 20.200000,
	                "value": "20.2"
	            }]
	        }]
	    }]
	}


#### Failure responses (HTTP status code 500)

- **InvalidFilterID**: the value of the `filter` parameter was invalid.

