# Migration to `resol-vbus-core*`

The active development of the `resol-vbus` library has ended in March 2025. See [this issue](https://github.com/danielwippermann/resol-vbus/issues/110) for reasoning and details.

It is superceeded by the `resol-vbus-core*` suite of libraries. Since they are not API-compatible replacements, this document hightlights challenges and tips to help during the migration.


## Library API

### `I18N`

`resol-vbus-core*` does not support i18n out of the box. If you need that, use one of the many third-party libraries for that.

A limited number formatting functionality is provided by the `utils.Formatter` class and `utils.formatAndJoin` function of `resol-vbus-core`.


### `SpecificationFile` and `Specification`

`resol-vbus-core` comes with support to parse and use a VBus Specification File (VSF) out-of-the-box, although the API has changed slightly. One major change is that the core library does not ship a default VSF file anymore. This is now available in a separate package `resol-vbus-core-vsf`.

There is currently no support for Block Type Packets.


### `Header`, `Packet`, `Datagram` and `Telegram`

`resol-vbus-core` has classes with the same name and similar functionality.

`Datagram` now has properties `param16` and `param32` instead of `valueIndex` and `value`.


### `HeaderSet` and `HeaderSetConsolidator`

`resol-vbus-core` has a `HeaderSet` class as well.

There is currently no direct replacement for the `HeaderSetConsolidator` class. But the `startTimer`/`stopTimer` functionality is now provided as part of the `TimestampInterval` in `resol-vbus-core`.


### `DataSourceProvider`, `DataSource` and its sub-classes

The `DataSourceProvider` and `DataSource` infrastructure has not been reimplemented in the `resol-vbus-core*` libraries. Only select functionality has been ported:

- The network-based discovery mechanism from `TcpDataSourceProvider` has been reimplemented in the `netDiscover` and `fetchDeviceInformation` functions in the `resol-vbus-core-nodejs` package.


### `Connection` and its sub-classes

Although there is no direct replacement for the `Connection` class, most of its functionality has been split into multiple parts:

- The decoding of live VBus data has been factored out into the `LiveDecoder` class in `resol-vbus-core`.
- The encoding of live VBus data has been factored out into the `LiveEncoder` class in `resol-vbus-core`.
- The ability to send commands and wait for their responses has been factored out into the `LiveTransceiver` class (which internally uses both a `LiveDecoder` and `LiveEncoder`) in `resol-vbus-core`.
- The VBus-over-TCP handshake from `TcpConnection` is now provided by `NetLiveTransceiver` in `resol-vbus-core-nodejs`.
- There is no out-of-the-box support for serial ports


### `TcpConnectionEndpoint`

The VBus-over-TCP server-side functionality of `TcpConnectionEndpoint` is provided by the `NetLiveTransceiverEndpoint` in `resol-vbus-core-nodejs`.


### `Converter` and its sub-classes

The `VBusRecordingConverter` has been split into two classes in `resol-vbus-core`: `RecordingDecoder` and `RecordingEncoder`.

All other converters have not been ported.


### All classes around `ConfigurationOptimizer` and `Customizer`

There will be no direct replacement for all those classes because the underlying API idea proved to be to error-prone and resulted in very large library artifacts.

`resol-vbus-core` provides support for the new "Configuration Optimizer File" standard used in RESOL' Parameterization Tool (RPT) in the `ConfigurationOptimizer` class.


## Examples

### `customizer` and `customizer2`

There will be no direct replacement for the `customizer` examples since the underlying `Customizer` class is not available in `resol-vbus-core*`.

But the `resol-vbus-core` documentation includes a guide about "VBus Parameterization" that details how to perform similar steps using `resol-vbus-core`.

In addition to that there is a `parameterization` toolbox script that provides a service to read/write values from/to a controller.


### `discovery`

Is provided by:

- the `examples/net-discover.ts` standalone example
- the `discovery-client` toolbox script


### `em-simulator`

Is provided by the `em-simulator` toolbox script.


### `json-live-data-server`

This example contained many features and will not be ported over as one solution. Instead the composability of `resol-vbus-core-toolbox` can be used to provide some of the features of the original:

- Webserver: is provided by the `webserver` toolbox script
    - `/api/v*/live-data`: no replacement provided
    - `/api/v1/monitor`: no replacement provided
    - `/cgi-bin/get_resol_device_information`: is provided by the `webserver/get-device-information-api` toolbox script
    - `/dlx/download/*`: is provided by the `webserver/dlx-download-api` toolbox script
    - `/current/current_packets.vbus`: is provided by the `webserver/current-packets-vbus-api` toolbox script
    - `/cgi-bin/resol-webservice`: is provided by the `webserver/dl2plus-jsonrpc-api` toolbox script
    - `/api/v1/em*`: no replacement provided
- JSON logging: no replacement provided
- Text logging: is provided by the `csv-writer` toolbox script


### `serial-to-tcp`

This can be achieved using the `vbus-over-tcp-endpoint` toolbox script.

```shell
cd .../resol-vbus-core/packages/resol-vbus-core-toolbox
bin/resol-vbus-core-toolbox.ts --path <serial port path> --script scripts/vbus-over-tcp-endpoint.ts
```


### `vbustouch-proxy`

Although many features of this example could be composed out of multiple `resol-vbus-core-toolbox` script, the main features are not provided yet: short-term data logging including access using the webserver, optionally rewriting an unsupported controller into a supported one.

Although this can be provided in a `resol-vbus-core-toolbox` script, none is provided out of the box.


## `resol-vbus-toolbox` scripts

This sections summarizes migrating from `resol-vbus-toolbox` to `resol-vbus-core-toolbox`.


### `custom-controller-mx`

Is no longer provided out-of-the-box.


### `discovery-client`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `discovery-service`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `dump-config-file`

Is no longer supported under `resol-vbus-core-toolbox`.


### `dump-packet-fields`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `dump-packet-ids`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `dump-replay-script`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `em-simulator`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `get-changeset-id`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `load-monitor`

The new `timing-analyzer` script also displays the load percentage as part of its web-based visualization, but there is no text UI load monitor anymore.


### `mqtt-publisher`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `text-logger`

Is provided by the `csv-writer` script of the `resol-vbus-core-toolbox`.


### `timing-analyzer`

Is provided by the `resol-vbus-core-toolbox` script of the same name.


### `vbus-logger`

Is provided by the `recording-writer` script of the `resol-vbus-core-toolbox`.


### `webserver`

There is a `resol-vbus-core-toolbox` script of the same name offering similar services, but it uses the "Hono web server framework" under the hood instead of the "server.js" solution used by `resol-vbus-toolbox`.
