---
layout: docs
title: VBus Recording File Format
---



One thing to keep in mind is that the encoding mechanisms described in the official VBus protocol specification (e.g. no MSBs allowed except in the SYNC byte and so on) do NOT apply to the file format itself.

The file's content is a stream of records. Each record consists of a header and optional payload data. The header looks like this:

	Offset 0x00: Start-Of-Record marker (always 0xA5)
	Offset 0x01: Record type (will come to that later)
	Offset 0x02: Length (Bits 0-7)
	Offset 0x03: Length (Bits 8-15)
	Offset 0x04: Length (Bits 0-7)
	Offset 0x05: Length (Bits 8-15)
	Offset 0x06: Timestamp (Bits 0-7)
	Offset 0x07: Timestamp (Bits 8-15)
	Offset 0x08: Timestamp (Bits 16-23)
	Offset 0x09: Timestamp (Bits 24-31)
	Offset 0x0A: Timestamp (Bits 32-39)
	Offset 0x0B: Timestamp (Bits 40-47)
	Offset 0x0C: Timestamp (Bits 48-55)
	Offset 0x0D: Timestamp (Bits 56-63)

That header is followed by the payload data for the record (beginning at offset 0x0E). The structure of the payload varies depending on the "Record type" field of the header.

The field "Length" appears in the header twice. Both fields must contain the same value. In addition to that the "Start-Of-Record marker" of the next record must be located according to the formula:

	Offset next "S-O-R marker" = (Offset current "S-O-R marker" + "Length" field)

The field "Timestamp" contains the time in milliseconds since January 1st, 1970 00:00:00 GMT.

The DL2 outputs records of two different record types: 0x44 and 0x66. The DL3 outputs an additional record type: 0x77.

Record type 0x44 is a "Start-Of-Header-Set marker". It is followed by zero or more records of type 0x66 containing "VBus data" in the record payload.

Whenever the DL2 is instructed to write the current VBus packets to file it will output one "S-O-H-S marker" record followed by a number of "VBus data" records - one for each current VBus packet received.

The "S-O-H-S marker" record itself has no payload (its length is always 14), it is only used to group the records following this marker as belonging to the same point in time.

The "VBus data" record contains a minimum payload of 12 bytes which contain a slightly modified representation of a VBus packet header.

	Offset 0x0E: VBus destination address (Bits 0-7)
	Offset 0x0F: VBus destination address (Bits 8-15)
	Offset 0x10: VBus source address (Bits 0-7)
	Offset 0x11: VBus source address (Bits 8-15)
	Offset 0x12: VBus protocol version (Bits 0-7)
	Offset 0x13: VBus protocol version (Bits 8-15)
	Offset 0x14: VBus command (Bits 0-7)
	Offset 0x15: VBus command (Bits 8-15)
	Offset 0x16: VBus frame data length (Bits 0-7)
	Offset 0x17: VBus frame data length (Bits 8-15)
	Offset 0x18: VBus additional info (Bits 0-7)
	Offset 0x19: VBus additional info (Bits 8-15)
	Offset 0x1A and following: optional VBus frame data

For a description of the fields "VBus destination address" , "VBus source address", "VBus protocol version", "VBus command" and the "VBus frame data" please consult the official VBus protocol specification document.

The field "VBus frame data length" contains the number of bytes that follow from offset 0x1A to the end of the record's payload. This area contains the VBus packet's frame data (already decoded so that every VBus packet's frame takes up 4 bytes).

The field "VBus additional info" is an internally used value and contains zero most of the time.

With this knowledge let's take a look on a beginning of a sample file's hexdump:

	Offset 0x00: A5 44 0E 00 0E 00 00 63 D6 CA 27 01 00 00 A5 66
	Offset 0x10: 36 00 36 00 18 5F D6 CA 27 01 00 00 10 00 21 42
	Offset 0x20: 10 00 00 01 1C 00 00 00 2D 00 40 01 93 01 31 00
	Offset 0x30: 00 00 00 00 03 00 03 00 5A 0F 81 06 00 00 00 00
	Offset 0x40: 00 00 64 00 A5 44 0E 00 0E 00 E0 F6 DA CA 27 01
	Offset 0x50: 00 00 A5 66 36 00 36 00 F8 F2 DA CA 27 01 00 00
	<file goes on after here...>

Beginning at offset 0x00 and applying the formula to calculate "Start-Of-Record markers" we can identify the following records:

	Offset 0x00: Type 0x44, Length 0x000E, Timestamp 0x00000127CAD66300

	Offset 0x0E: Type 0x66, Length 0x0036, Timestamp 0x00000127CAD65F18
		VBus destination address = 0x0010 (DFA)
	VBus source address = 0x4221 (DeltaSol BS Plus)
		VBus protocol version = 0x0010
	VBus command = 0x0100
		VBus frame data length = 0x001C
	VBus addition information = 0x0000
		VBus frame data = 
	2D 00 40 01 93 01 31 00 00 00 00 00 03 00 03 00 
	5A 0F 81 06 00 00 00 00 00 00 64 00 

	Offset 0x44: Type 0x44, Length 0x000E, Timestamp 0x00000127CADAF6E0

	Offset 0x52: Type 0x66, Length 0x0036, Timestamp 0x00000127CADAF2F8
	<record payload was behind the truncation...>

And we would expect the next record to start at offset 0x88.

The payload of the record at offset 0x0E contains a VBus version 1.0 packet sent from a "DeltaSol BS Plus" to a "DFA" including 28 bytes of frame data. Looking at the official VBus protocol specification dated May 2009 this packet's content is described in chapter H.9.


## Additions for the DL3

The DL3 outputs an additional record type: 0x77, which is treated as a “VBus channel marker”. The reason for this record is the fact that the DL3 is equipped with up to six independent VBus channels.

Whenever the DL3 is instructed to write the current VBus packets to file it will output one "S-O-H-S marker" record followed by a “VBus channel marker” and a number of "VBus data" records - one for each current VBus packet received on that channel. The sequence of “VBus channel marker” and the corresponding “VBus data” records is repeated for every VBus channel that has current data available.

If the DL3 received two packets on channel 1 and one packet on channel 3 the sequence written to file would be similar to:

	S-O-H-S marker
	VBus channel marker [channel 1]
	VBus data [packet on channel 1]
	VBus data [packet on channel 1]
	VBus channel marker [channel 3]
	VBus data [packet on channel 3]

The "VBus channel marker" record contains a payload of 2 bytes.

	Offset 0x0E: VBus channel (Bits 0-7)
	Offset 0x0F: VBus channel (Bits 8-15)

The field “VBus channel” contains a numeric identifier for the VBus channel. On the DL3 the range between 1 and 6 is used to distinguish the six independent VBus terminals.



