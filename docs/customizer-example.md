---
layout: default
resol_vbus: examples
---

# Customizer Example

This example application loads and saves configuration from and to a VBus enabled controller.


## General information

You can find general information about the controller customization process here:

[Load and Store Controller Configuration Tutorial](customizer-tutorial.html)


## Setup

- Install the `resol-vbus` specific dependencies

		cd <working directory>
		git clone https://github.com/danielwippermann/resol-vbus.git
		cd resol-vbus
		npm install

- Install some example app specific dependencies

		cd examples/customizer
		npm install
		cd ../..

- Create or edit the `examples/local-config.json` to setup up your connection to use

	If you want to use a TCP connection to a Datalogger or VBus/LAN adapter:

		{
			"customizerOptions": {
				"connection": {
					"class": "TcpConnection",
					"options": {
						"host": "192.168.5.156",
						"port": 7053,
						"password": "vbus"
					}
				}
			}
		}

	Change the `"host"` and `"password"` values to match your configuration.


## Command line options

### `-q`: Quiet

Reduces console output.


### `--loadAll`: Load a complete set of adjustable values

Uses the `ConfigurationOptimizer` to determine a set of adjustable values that serves as a complete configuration se and loads those values from the controller.


### `--load <file>`: Load a specific set of adjustable values from the controller

Reads a JSON file `<file>` containing a list of adjustable values to load from the controller. The resulting list of loaded values can be written to a file again using the `--out` option.


### `--save <file>`: Save a specific set of adjustable values to the controller

Reads a JSON file `<file>` containing a list of adjustable values to save to the controller.


### `--out <file>`: Write the set of adjustable values to a file

Writes the loaded or saved set of adjustable values back to the file `<file>` as a JSON object. If this option is not given, the loaded or saved set of adjustable values is printed to the console.


## Examples

To load a complete set of adjustable values from the controller and write it to a file use the following command:

	⌘  node examples/customizer/index.js --loadAll --out .../complete-config.json
	Connecting...
	Connection state changed to CONNECTING
	Connection state changed to CONNECTED
	Waiting for free bus...
	Found master with address 0x5400
	[1] Optimizing set of values for round 1
	[1] Waiting for free bus
	[1] Getting value 1/164, try 1: Language
	[1] Getting value 2/164, try 1: Bedienercode
	...
	[1] Getting value 163/164, try 1: SDKarte_Logging_Intervall
	[1] Getting value 164/164, try 1: SDKarte_Logging_Methode
	[2] Optimizing set of values for round 2
	[2] Getting value 1/80, try 1: Sensor_Regler_S1_Offset
	[2] Getting value 2/80, try 1: Sensor_Regler_S2_Offset
	...
	[2] Getting value 79/80, try 1: Heizung_Heizkreis1_TModusSchaltuhrAussen
	[2] Getting value 80/80, try 1: Heizung_Heizkreis1_RTH_HKaus
	[3] Optimizing set of values for round 3
	[3] Getting value 1/42, try 1: Heizung_Heizkreis1_Schaltuhr_Woche_TagMo_Maske0
	[3] Getting value 2/42, try 1: Heizung_Heizkreis1_Schaltuhr_Woche_TagMo_Maske1
	...
	[3] Getting value 41/42, try 1: Heizung_Heizkreis1_Schaltuhr_Woche_TagSo_Maske4
	[3] Getting value 42/42, try 1: Heizung_Heizkreis1_Schaltuhr_Woche_TagSo_Maske5
	[4] Optimizing set of values for round 4
	[4] Releasing bus
	Disconnecting...
	Connection state changed to DISCONNECTING
	Connection state changed to DISCONNECTED

	⌘  cat .../complete-config.json
	{"Language":0,"Bedienercode":0,"AutoSommerWinterzeit":1,"TemperatureHysteresisSelector":0,"FlowSelector":0,"PressureSelector":0,"EnergySelector":0,"PowerSelector":0,"Modul1_Aktiviert":0,"Modul2_Aktiviert":0,"Modul3_Aktiviert":0,"Modul4_Aktiviert":0,"Modul5_Aktiviert":0,"Sensor_Regler_S1_Offset":0,"Sensor_Regler_S2_Offset":0,"Sensor_Regler_S3_Offset":0,"Sensor_Regler_S4_Offset":0,"Sensor_Regler_S5_Offset":0,"Sensor_Regler_S6_Offset":0,"Sensor_Regler_S7_Offset":0,...

The example app connects to the `Connection` specified in `examples/local-config.json` and finds a RESOL DeltaTherm HC on that VBus. It creates a `ConfigurationOptimizer` for that controller and a `ConnectionCustomizer` that combines the `Connection` and the `ConfigurationOptimizer` into a single object that is respnsible for transfering values to and from the controller.

When the example app asks the `ConnectionCustomizer` to load a complete set of adjustable values from the controller, the `ConnectionCustomizer` in turn asks the `ConfigurationOptimizer` for that list which returns a list of over 5.700 values. The `ConnectionCustomizer` then asks the `ConfigurationOptimizer` to reduce that set to a bare minimum, resulting in a remaining list of 164 values for the first round. The `ConnectionCustomizer` starts to load those values from the controller. Once the first round of 164 values have been loaded the `ConnectionCustomizer` asks the `ConfigurationOptimizer` again for an updated list of adjustable values. Since the first round of adjustable values contained several options that enable other values the `ConfigurationOptimizer` adds 80 additional values to the list which the `ConnectionCustomizer` then starts loading as well. This continues for a third round (since some values of the second round enabled additional values), resulting in a complete set of 286 adjustable values.

Those values are then written to the file by the example app.

To save a specific adjustable value use the following command:

	⌘  cat .../hc-hk1-off.json
	{"Heizung_Heizkreis1_Aktiviert":0}

	⌘  node examples/customizer/index.js --save .../hc-hk1-off.json
	Connecting...
	Connection state changed to CONNECTING
	Connection state changed to CONNECTED
	Waiting for free bus...
	Found master with address 0x5400
	[1] Optimizing set of values for round 1
	[1] Waiting for free bus
	[1] Setting value 1/1, try 1: Heizung_Heizkreis1_Aktiviert
	[2] Optimizing set of values for round 2
	[2] Releasing bus
	{"Heizung_Heizkreis1_Aktiviert":0}
	Disconnecting...
	Connection state changed to DISCONNECTING
	Connection state changed to DISCONNECTED
