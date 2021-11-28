# em-simulator

Emulates a extension module (EM) to deliver a switch state to a controller.


## Overview

Imagine you want to use your home automation system to request backup-heating
of a RESOL controller. One of the ways would be to configure a sensor input as
a switch and setup an appropriate controller function to make that switch
control a relay of your backup-heating.

This tool help you transfering the home automation info to the controller. It
simulates a EM on the VBus by answering the requests that the controller sends
over the VBus regularly. This simulated EM only has a value on sensor 1 which is
reguarly read from a file.

This tool is not a plugin to any specific home automation system, but a script
that runs alongside your home automation service.


## Setup

```
cd <working dir>
git clone https://github.com/danielwippermann/resol-vbus
cd resol-vbus
npm i
cd examples/em-simulator
cp config.js.example config.js
```

You should now edit the `config.js` to adapt it to your environment.


## Running

```
cd <working dir>/resol-vbus/examples/em-simulator
node main.js
```


## The state file

The file specified by the `stateFilename` config is expected to be a single-line
text file containing either "0", "off" or "aus" for the switch-off situation or
"1", "on" or "ein" for the switch-on situation.

The home automation should write the respective text into the state file to
control the virtual sensor input.
