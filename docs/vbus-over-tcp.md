---
layout: docs
title: VBus Over TCP
---



In addition to the built-in web pages the LAN-capable devices offered by RESOL (currently DL2, DL3, VBus/LAN and VBus.net) allow access to the VBus over a TCP connection. This document describes the protocol used for this connection.


All devices mentioned above listen for incoming connections on TCP port 7053. When this port is connected the devices send the characters “+HELLO” followed by the ASCII characters for CR and LF (decimal 13 and 10) to the remote side. The devices will then enter the command mode and wait for incoming commands (listed below), which must be terminated by CR and LF as well.

After each command the devices send an acknowledge message back to the remote side. These acknowledges either start with a "*" character (identifying result payload of the command), “+” character (command executed successfully) or a “-” character (command failed).

To get access to the VBus data itself the remote side has to send a command to switch from command to data mode. Once the connection entered data mode, it cannot go back into command mode. In order to do so the remote side has to establish another connection to the device.

A sample session (using telnet) might look like this:

	⌘  telnet vbus.net 7053
	Connected to vbus.net.
	Escape character is '^]'.
	+HELLO This is VBus.net on behalf of all its devices, welcome, stranger!
	CONNECT mydatalogger
	+OK: Connection established
	PASS wrongpw
	-ERROR: Password rejected
	PASS rightpw
	+OK: Password accepted
	CHANNELLIST
	*1:DeltaSol MX
	+OK: Now you know my fellows...
	CHANNEL 1
	+OK: Channel selected
	DATA
	+OK: Data incoming...
	<binary VBus data according to VBus protocol specification>



## Commands

- **CONNECT \<via tag>**

	(VBus.net only) Select the VBus.net connected logger by its via tag.

- **PASS \<password>**

	Submits the password needed to switch to data mode. You can configure the
	password in the web interface of the device, it defaults to “vbus”.

- **CHANNELLIST**

	(DL3 only) Sends payload back containing a list of used VBus channels
	on this DL3.

- **CHANNEL \<channel number>**

	(DL3 only) Select the VBus channel to connect to. This command is only
	supported by the DL3 which has up to six independent VBus channels.

- **QUIT**

	Disconnects the remote side.

- **DATA**

	Switches from command to data mode. After the acknowledgement line the
	remote side will receive raw VBus data according to the VBus protocol
	specification.

