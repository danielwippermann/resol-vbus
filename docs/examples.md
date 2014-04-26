---
layout: default
resol_vbus: examples
---

# Examples

This section provides a list of examples that are bundled with the resol-vbus module.


## discovery: Discover LAN-enabled devices

Source: [GitHub](https://github.com/danielwippermann/resol-vbus/blob/master/examples/discovery/index.js)

This example uses a `TcpDataSourceProvider` and its `discoverDataSources` method to continously search for LAN-enabled VBus devices. Every ten seconds it broadcasts into the network, printing the results to the console.


## [customizer: Load and Save Controller Configuration](customizer-example.html)

Source: [GitHub](https://github.com/danielwippermann/resol-vbus/tree/master/examples/customizer)

This example covers the steps to customize a controller's configuration by loading and saving it from and to a controller.

