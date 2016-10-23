---
layout: docs
title: VBus Specification File Format Version 1
---



## General information

This document describes the first version of the "VBus Specification File" (or short: VSF) format used to package information about known VBus-capable devices and their packet structure into a small, binary file.

Before the VSF format was designed this information was provided in form of multiple XML files. Since not all applications were able to parse XML information those files were often parsed and converted into application-specific formats (e.g. auto-generated source code).

The VSF format intends to replace those different application-specific formats with one well supported format that combines small overall size and an easy to parse structure to allow as many applications as possible to adapt it.


## The file structure

The VSF consists of "blocks", pieces of information that a structured in a certain way. The file always starts with a FILEHEADER block. This block then contains a "VSF offset" to another block of type SPECIFICATION that in turn contains other "VSF offset" values for other types of blocks. Those "VSF offset" values are absolute addresses to the start of the block they are referencing and the value must be inside to bounds of the file size.

In addition to "VSF offset" values there are two other means to reference a block from another block:

- "block index"
- "block ID"

The "block index" is simply a numerical value pointing to an entry in a table of blocks. This table is most often referenced by a "VSF offset" that is stored in a parent block (e.g. the LOCALIZEDTEXT block uses block indices to TEXT blocks whose table is referenced by the "TextTableOffset" of the SPECIFICATION block).

The "block ID" is a numerical value as well, but cannot be used for a table lookup directly. Instead one of the blocks in the corresponding table contains an identifier field that matches the "block ID" value (e.g. the PACKETTEMPLATEFIELD block uses a unit ID to reference a UNIT block that is stored in the corresponding table referenced by the "UnitTableOffset" of the SPECIFICATION block).

The important difference between "block ID" and the other means of referencing is that "block ID" values will not change between different VSF files (their respective known values are documented below), but "VSF offset" and "block index" values will change most likely between different VSF files.

All multi-byte values are stored in Little-Endian order (least significant byte first).


### The FILEHEADER block

The FILEHEADER block is the only block in the VSF structure that is located at a fixed position: the beginning of the file. The FILEHEADER block contains structural integrity information as well as the VSF offset of the SPECIFICATION block that then contains references to most other information.

| Offset | Type | Name | Description |
|--:|:--|
| 0x00000000 | U16 | `ChecksumA` | CRC16 checksum from VSF offset 0x00000004 to the one stored in `TotalLength` |
| 0x00000002 | U16 | `ChecksumB` | CRC16 checksum from VSF offset 0x00000004 to the one stored in `TotalLength` |
| 0x00000004 | I32 | `TotalLength` | Total length of the VSF in bytes |
| 0x00000008 | I32 | `DataVersion` | Data version number, must be `1` |
| 0x0000000C | I32 | `SpecificationOffset` | VSF offset of the SPECIFICATION block |


### The SPECIFICATION block

The SPECIFICATION block contains references to several other block types:

- TEXT
- LOCALIZEDTEXT
- UNIT
- DEVICETEMPLATE
- PACKETTEMPLATE

| Offset | Type | Name | Description |
|--:|:--|:--|
| Offset + 0x00 | I32 | `Datecode` | Date code (format "YYYYMMDD") of VSF creation |
| Offset + 0x04 | I32 | `TextCount` | Number of TEXT blocks starting at VSF offset `TextTableOffset` |
| Offset + 0x08 | I32 | `TextTableOffset` | VSF offset of the first TEXT block |
| Offset + 0x0c | I32 | `LocalizedTextCount` | Number of LOCALIZEDTEXT blocks starting at VSF offset `LocalizedTextTableOffset` |
| Offset + 0x10 | I32 | `LocalizedTextTableOffset` | VSF offset of the first LOCALIZEDTEXT block |
| Offset + 0x14 | I32 | `UnitCount` | Number of UNIT blocks starting at VSF offset `UnitTableOffset` |
| Offset + 0x18 | I32 | `UnitTableOffset` | VSF offset of the first UNIT block |
| Offset + 0x1c | I32 | `DeviceTemplateCount` | Number of DEVICETEMPLATE blocks starting at VSF offset `DeviceTemplateTableOffset` |
| Offset + 0x20 | I32 | `DeviceTemplateTableOffset` | VSF offset of the first DEVICETEMPLATE block |
| Offset + 0x24 | I32 | `PacketTemplateCount` | Number of PACKETTEMPLATE blocks starting at VSF offset `PacketTemplateTableOffset` |
| Offset + 0x28 | I32 | `PacketTemplateTableOffset` | VSF offset of the first PACKETTEMPLATE block |

The `...Count` and `...TableOffset` field pairs reference a table of blocks of their respective type that belong to this SPECIFICATION block.


### The TEXT block

The TEXT blocks simply contains a VSF offset referencing the start of a UTF-8 encoded, NUL-terminated sequence of characters.

| Offset | Type | Name | Description |
|--:|--:|:--|:--|
| Offset + 0x00 | I32 | `StringOffset` | VSF offset of the first character in the UTF-8 sequence for this text |

Other blocks reference TEXT blocks using a "TEXT index" ranging from `0` to `(SPECIFICATION.TextCount - 1)`. This index can be used to calculate the VSF offset of the corresponding TEXT block as follows:

	TextBlockOffset = SPECIFICATION.TextTableOffset + TextIndex * 4


### The LOCALIZEDTEXT block

The LOCALIZEDTEXT block uses three TEXT indices to provide a localized text with english, german and french translations.

| Offset | Type | Name | Description |
|--:|--:|:--|:--|
| Offset + 0x00 | I32  | `TextIndexEN` | TEXT index of the english text |
| Offset + 0x04 | I32  | `TextIndexDE` | TEXT index of the german text |
| Offset + 0x08 | I32  | `TextIndexFR` | TEXT index of the french text |

Other blocks reference LOCALIZEDTEXT blocks using a "LOCALIZEDTEXT index" ranging from `0` to `(SPECIFICATION.LocalizedTextCount - 1)`. This index can be used to calculate the VSF offset of the corresponding LOCALIZEDTEXT block as follows:

	LocalizedTextBlockOffset = Specification.LocalizedTextTableOffset + LocalizedTextIndex * 12


### The UNIT block

The UNIT block stores information about a physical unit that is used in one of the PACKETTEMPLATEFIELD blocks later on. The block combines:

| Offset | Type | Name | Description |
|--:|--:|:--|:--|
| Offset + 0x00 | I32 | `UnitId` | Unit identifier |
| Offset + 0x04 | I32 | `UnitFamilyId` | Unit family identifier |
| Offset + 0x08 | I32 | `UnitCodeTextIndex` | TEXT index of the unit's code (internal name) |
| Offset + 0x0c | I32 | `UnitTextTextIndex` | TEXT index of the unit's text |

The `UnitId` field is a unique value at identifies a given physical unit and it is constant between different VSF files.

The `UnitFamilyId` field categorizes which family of physical units this unit belongs to. The following values are currently supported:

| `UnitFamilyId` | Description |
|--:|:--|
| -1 | Unsupported or no unit family |
| 0 | Temperature: e.g. °C, °F |
| 1 | Energy: e.g. Wh, BTU |
| 2 | Volumetric Flow: e.g. l/min, gallon/h |
| 3 | Pressure: e.g. bar, psi |
| 4 | Volume: e.g. l, gallon |
| 5 | Time: e.g. s, h  |
| 6 | Power: e.g. W |

The `UnitCodeTextIndex` field references a machine readable representation for this pyhsical unit. Examples include: `"Percent"`, `"DegreesCelsius"`, `"WattsPerSquareMeter"` etc.

The `UnitTextTextIndex` field references a TEXT block containing a human readable representation for this physical unit. Examples include: `"%"`, `" °C"`, `" W/m²"` etc.

Other blocks reference UNIT blocks using a "Unit Identifier". This identifier can be used to lookup the corresponding UNIT block that uses the same value in its `UnitId` field.


### The DEVICETEMPLATE block

The DEVICETEMPLATE blocks contain information about each of the known VBus devices.

| Offset | Type | Name | Value |
|--:|--:|:--|:--|
| Offset + 0x00 | U16 | `SelfAddress` | VBus address of the device itself |
| Offset + 0x02 | U16 | `SelfMask` | Bitmask for VBus address of the device itself |
| Offset + 0x04 | U16 | `PeerAddress` | VBus address of the device's peer |
| Offset + 0x06 | U16 | `PeerMask` | Bitmask for VBus address of the device's peer|
| Offset + 0x08 | I32 | `NameLocalizedTextIndex` | LOCALIZEDTEXT index of the device name |

The `...Address` and `...Mask` field pairs can be used to determine whether a given address received over the VBus matches a DEVICETEMPLATE block:

	if (((SelfAddress ^ DEVICETEMPLATE.SelfAddress) & DEVICETEMPLATE.SelfMask) != 0) {
		// self address does not match
	} else if (((PeerAddress ^ DEVICETEMPLATE.PeerAddress) & DEVICETEMPLATE.PeerMask) != 0) {
		// peer address does not match
	} else {
		// both addresses match, DEVICETEMPLATE found!
	}

The `SelfAddress` variable in the example above is the address of the device being searched for, the `PeerAddress` variable is the address of the communication counterpart device (e.g. the destination address of a VBus version 1 packet if information about the source address is being requested).


### The PACKETTEMPLATE block

The PACKETTEMPLATE blocks contain information about each of the known VBus version 1 packets.

| Offset | Type | Name | Description |
|--:|--:|:--|:--|
| Offset + 0x00 | U16 | `DestinationAddress` | VBus address of destination device |
| Offset + 0x02 | U16 | `DestinationMask` | Bitmask for VBus address of destination device |
| Offset + 0x04 | U16 | `SourceAddress` | VBus address of source device |
| Offset + 0x06 | U16 | `SourceMask` | Bitmask for VBus address of source device |
| Offset + 0x08 | U16 | `Command` | VBus command |
| Offset + 0x0A | U16 | - | reserved, must be `0` |
| Offset + 0x0C | I32 | `FieldCount` | Number of PACKETTEMPLATEFIELD blocks starting at VSF offset `FieldTableOffset` |
| Offset + 0x10 | I32 | `FieldTableOffset` | VSF offset of the first PACKETTEMPLATEFIELD block |

The `...Address` and `...Mask` field pairs can be used to determine whether a given address received as part of a VBus version 1 packet matches a PACKETTEMPLATE block:

	if (((DestinationAddress ^ PACKETTEMPLATE.DestinationAddress) & PACKETTEMPLATE.DestinationMask) != 0) {
		// destination address does not match
	} else if (((SourceAddress ^ PACKETTEMPLATE.SourceAddress) & PACKETTEMPLATE.SourceMask) != 0) {
		// source address does not match
	} else if (Command != PACKETTEMPLATE.Command) {
		// command does not match
	} else {
		// all fields match, PACKETTEMPLATE found!
	}

The `DestinationAddress`, `SourceAddress` and `Command` variables in the example above are the corresponding values from the VBus version 1 packet.

The `FieldCount` and `FieldTableOffset` fields reference a table of PACKETTEMPLATEFIELD blocks that belong to this PACKETTEMPLATE block.


### The PACKETTEMPLATEFIELD block

The PACKETTEMPLATEFIELD blocks contain information about each of the known fields within the payload frames of a VBus version 1 packet.

| Offset | Type | Name | Description |
|--:|--:|:--|:--|
| Offset + 0x00 | I32 | `IdTextIndex` | TEXT index for the field ID |
| Offset + 0x04 | I32 | `NameLocalizedTextIndex` | LOCALIZEDTEXT index for the field name |
| Offset + 0x08 | I32 | `UnitId` | UNIT identification, matches a `UnitId` in one of the UNIT blocks |
| Offset + 0x0C | I32 | `Precision` | Number of fractional digits |
| Offset + 0x10 | I32 | `TypeId` | Type identifier (see table below) |
| Offset + 0x14 | I32 | `PartCount` | Number of PACKETTEMPLATEFIELDPART blocks starting at VSF offset `PartTableOffset` |
| Offset + 0x18 | I32 | `PartTableOffset` | VSF offset of the first PACKETTEMPLATEFIELDPART block |

The `IdTextIndex` field references a TEXT block containing an identifier string that is formated like: `"_<offset>_<size>_<bit mask>_<optional info>"`. The identifier must be unique within the table of PACKETTEMPLATEFIELD blocks references by a PACKETTEMPLATE block.

The `NameLocalizedTextIndex` field references a LOCALIZEDTEXT block containing the localized name of the VBus packet field.

The `UnitId` field references a UNIT block (by matching its `UnitId` field) containing information about the physical unit of this VBus packet field.

The `Precision` field contains the number of fractional digits the VBus packet field is transferred with.

The `TypeId` field categorizes which base type this VBus packet field is of. The following values are currently supported:

| `TypeId` | Description |
|--:|:--|
| 1 | Number (e.g. `133.7`) |
| 2 | (reserved for later use)
| 3 | Time (e.g. `13:37`) |
| 4 | WeekTime (e.g. `Wed,13:37`) |
| 5 | DateTime (e.g. `Oct 23 13:37:54 2016`) |

The `PartCount` and `PartTableOffset` fields reference a table of PACKETTEMPLATEFIELDPART blocks that belong to his PACKETTEMPLATEFIELD block.


### The PACKETTEMPLATEFIELDPART block

The PACKETTEMPLATEFIELDPART block contain information how to extract a raw value from the payload frame data of a VBus version 1 packet.

| Offset | Type | Name | Description |
|--:|--:|:--|:--|
| Offset + 0x00 | I32 | `Offset` | Offset within the frame data of the VBus packet |
| Offset + 0x04 | U8 | `BitPos` | Bit position within the frame data of the VBus packet |
| Offset + 0x05 | U8 | `Mask` | Bitmask for the frame data of the VBus packet |
| Offset + 0x06 | U8 | `IsSigned` | Indicated whether the part should be treated as signed or unsigned |
| Offset + 0x07 | U8 | - | reserved, must be `0` |
| Offset + 0x08 | I64 | `Factor` | Factor to multiply this part with |

The `Offset` field contains the byte position to extract the data from.

The `BitPos` field contains the bit position on which this value starts within the byte.

The `Mask` field contains the bit mask to remove other unwanted bits from the value.

The `IsSigned` field represents whether or not the highest order bit should be used to form a signed value.

The `Factor` field contains the value this part must be multiplied with.

The following pseudo-code demonstrated how all those fields must be used:

	I64 PartValue;
	if (PACKETTEMPLATEFIELDPART.IsSigned) {
		PartValue = (I8) Buffer [PACKETTEMPLATEFIELDPART.Offset];
	} else {
		PartValue = (U8) Buffer [PACKETTEMPLATEFIELDPART.Offset];
	}
	if (PACKETTEMPLATEFIELDPART.Mask != 0xFF) {
		PartValue = PartValue & PACKETTEMPLATEFIELDPART.Mask;
	}
	if (PACKETTEMPLATEFIELDPART.BitPos > 0) {
		PartValue = PartValue >> PACKETTEMPLATEFIELDPART.BitPos;
	}
	if (PACKETTEMPLATEFIELDPART.Factor != 1) {
		PartValue = PartValue * PACKETTEMPLATEFIELDPART.Factor;
	}
	// ...



## Example VSF file

Throughout the following section an example VSF is used to illustrate the file format on a real-world example (although a very small one). Since the various sections of the documentation only reproduce the necessary parts to support the section's explanation, the contents of the whole file is reproduced below for reference:

	00000000: 6c 64 6c 64 14 1c 00 00 01 00 00 00 e8 1b 00 00
	00000010: 00 20 42 54 55 00 20 48 7a 00 20 4b 00 20 4d 42
	00000020: 54 55 00 20 4d 4d 42 54 55 00 20 4d 57 68 00 20
	00000030: 56 00 20 57 00 20 57 2f 6d c2 b2 00 20 57 68 00
	00000040: 20 62 61 72 00 20 64 00 20 67 20 43 4f e2 82 82
	00000050: 20 28 47 61 73 29 00 20 67 20 43 4f e2 82 82 20
	00000060: 28 4f 69 6c 29 00 20 67 61 6c 00 20 67 61 6c 2f
	00000070: 68 00 20 67 61 6c 2f 6d 69 6e 00 20 68 00 20 68
	00000080: 50 61 00 20 6b 57 00 20 6b 57 68 00 20 6b 57 68
	00000090: 2f 28 6d c2 b2 2a 64 29 00 20 6b 67 20 43 4f e2
	000000a0: 82 82 20 28 47 61 73 29 00 20 6b 67 20 43 4f e2
	000000b0: 82 82 20 28 4f 69 6c 29 00 20 6b 67 2f 68 00 20
	000000c0: 6b 67 2f 6d c2 b3 00 20 6c 00 20 6c 2f 28 6d c2
	000000d0: b2 2a 64 29 00 20 6c 2f 68 00 20 6c 2f 6d 69 6e
	000000e0: 00 20 6d 2f 73 00 20 6d 41 00 20 6d 69 6e 00 20
	000000f0: 6d 73 00 20 6d c2 b2 00 20 6d c2 b3 00 20 6d c2
	00000100: b3 2f 68 00 20 70 73 69 00 20 73 00 20 74 20 43
	00000110: 4f e2 82 82 20 28 47 61 73 29 00 20 74 20 43 4f
	00000120: e2 82 82 20 28 4f 69 6c 29 00 20 c2 b0 00 20 c2
	00000130: b0 43 00 20 c2 b0 46 00 20 c2 b5 56 00 20 e2 84
	00000140: a6 00 25 00 30 30 30 5f 34 5f 30 00 30 30 34 5f
	00000150: 34 5f 30 00 30 30 38 5f 34 5f 30 00 30 31 32 5f
	00000160: 34 5f 30 00 30 31 36 5f 34 5f 30 00 30 32 30 5f
	00000170: 34 5f 30 00 30 32 34 5f 34 5f 30 00 30 32 38 5f
	00000180: 34 5f 30 00 30 33 32 5f 34 5f 30 00 30 33 36 5f
	00000190: 34 5f 30 00 30 34 30 5f 34 5f 30 00 30 34 34 5f
	000001a0: 34 5f 30 00 30 34 38 5f 34 5f 30 00 30 35 32 5f
	000001b0: 34 5f 30 00 30 35 36 5f 34 5f 30 00 30 36 30 5f
	000001c0: 34 5f 30 00 30 36 34 5f 34 5f 30 00 30 36 38 5f
	000001d0: 32 5f 30 00 35 20 6d 69 6e 20 65 72 72 6f 72 20
	000001e0: 63 6f 64 65 00 35 2d 4d 69 6e 2d 46 65 68 6c 65
	000001f0: 72 63 6f 64 65 00 42 61 72 73 00 42 74 75 73 00
	00000200: 43 68 61 6c 65 75 72 20 73 6f 6c 61 69 72 65 00
	00000210: 43 6f 64 65 20 65 72 72 65 75 72 20 35 20 6d 69
	00000220: 6e 00 43 75 62 69 63 4d 65 74 65 72 73 00 43 75
	00000230: 62 69 63 4d 65 74 65 72 73 50 65 72 48 6f 75 72
	00000240: 00 44 46 41 00 44 61 74 65 20 6d 65 61 73 75 72
	00000250: 65 64 20 76 61 6c 75 65 73 00 44 61 74 65 20 76
	00000260: 61 6c 65 75 72 73 20 64 65 20 6d 65 73 75 72 65
	00000270: 00 44 61 74 75 6d 5f 4d 65 73 73 64 61 74 65 6e
	00000280: 00 44 61 79 73 00 44 65 67 72 65 65 73 41 6e 67
	00000290: 75 6c 61 72 00 44 65 67 72 65 65 73 43 65 6c 73
	000002a0: 69 75 73 00 44 65 67 72 65 65 73 46 61 68 72 65
	000002b0: 6e 68 65 69 74 00 44 65 67 72 65 65 73 4b 65 6c
	000002c0: 76 69 6e 00 44 65 6c 74 61 53 6f 6c 20 4d 58 20
	000002d0: 5b 57 4d 5a 20 23 30 5d 00 44 65 6c 74 61 53 6f
	000002e0: 6c 20 4d 58 20 5b 57 4d 5a 20 23 31 30 5d 00 44
	000002f0: 65 6c 74 61 53 6f 6c 20 4d 58 20 5b 57 4d 5a 20
	00000300: 23 31 31 5d 00 44 65 6c 74 61 53 6f 6c 20 4d 58
	00000310: 20 5b 57 4d 5a 20 23 31 32 5d 00 44 65 6c 74 61
	00000320: 53 6f 6c 20 4d 58 20 5b 57 4d 5a 20 23 31 33 5d
	00000330: 00 44 65 6c 74 61 53 6f 6c 20 4d 58 20 5b 57 4d
	00000340: 5a 20 23 31 34 5d 00 44 65 6c 74 61 53 6f 6c 20
	00000350: 4d 58 20 5b 57 4d 5a 20 23 31 35 5d 00 44 65 6c
	00000360: 74 61 53 6f 6c 20 4d 58 20 5b 57 4d 5a 20 23 31
	00000370: 5d 00 44 65 6c 74 61 53 6f 6c 20 4d 58 20 5b 57
	00000380: 4d 5a 20 23 32 5d 00 44 65 6c 74 61 53 6f 6c 20
	00000390: 4d 58 20 5b 57 4d 5a 20 23 33 5d 00 44 65 6c 74
	000003a0: 61 53 6f 6c 20 4d 58 20 5b 57 4d 5a 20 23 34 5d
	000003b0: 00 44 65 6c 74 61 53 6f 6c 20 4d 58 20 5b 57 4d
	000003c0: 5a 20 23 35 5d 00 44 65 6c 74 61 53 6f 6c 20 4d
	000003d0: 58 20 5b 57 4d 5a 20 23 36 5d 00 44 65 6c 74 61
	000003e0: 53 6f 6c 20 4d 58 20 5b 57 4d 5a 20 23 37 5d 00
	000003f0: 44 65 6c 74 61 53 6f 6c 20 4d 58 20 5b 57 4d 5a
	00000400: 20 23 38 5d 00 44 65 6c 74 61 53 6f 6c 20 4d 58
	00000410: 20 5b 57 4d 5a 20 23 39 5d 00 44 65 6c 74 61 53
	00000420: 6f 6c 20 4d 58 20 5b 57 4d 5a 20 23 5d 00 45 69
	00000430: 6e 73 74 72 61 68 6c 75 6e 67 00 47 61 6c 6c 6f
	00000440: 6e 73 00 47 61 6c 6c 6f 6e 73 50 65 72 48 6f 75
	00000450: 72 00 47 61 6c 6c 6f 6e 73 50 65 72 4d 69 6e 75
	00000460: 74 65 00 47 65 73 61 6d 74 76 6f 6c 75 6d 65 6e
	00000470: 00 47 72 61 6d 73 43 4f 32 47 61 73 00 47 72 61
	00000480: 6d 73 43 4f 32 4f 69 6c 00 48 65 61 74 20 71 75
	00000490: 61 6e 74 69 74 79 00 48 65 61 74 20 71 75 61 6e
	000004a0: 74 69 74 79 20 31 00 48 65 61 74 20 71 75 61 6e
	000004b0: 74 69 74 79 20 32 00 48 65 61 74 20 71 75 61 6e
	000004c0: 74 69 74 79 20 74 6f 64 61 79 00 48 65 61 74 20
	000004d0: 71 75 61 6e 74 69 74 79 20 77 65 65 6b 00 48 65
	000004e0: 63 74 6f 70 61 73 63 61 6c 73 00 48 65 72 74 7a
	000004f0: 00 48 6f 75 72 73 00 49 4f 43 2d 4d 6f 64 75 6c
	00000500: 20 5b 4d 65 73 73 77 65 72 74 65 5d 00 49 6e 74
	00000510: 65 6e 73 69 74 c3 a9 20 63 6f 75 72 61 6e 74 20
	00000520: 31 00 49 6e 74 65 6e 73 69 74 c3 a9 20 63 6f 75
	00000530: 72 61 6e 74 20 32 00 49 72 72 61 64 69 61 74 69
	00000540: 6f 6e 00 4b 69 6c 6f 42 74 75 73 00 4b 69 6c 6f
	00000550: 57 61 74 74 48 6f 75 72 73 50 65 72 53 71 75 61
	00000560: 72 65 4d 65 74 65 72 50 65 72 44 61 79 00 4b 69
	00000570: 6c 6f 67 72 61 6d 73 43 4f 32 47 61 73 00 4b 69
	00000580: 6c 6f 67 72 61 6d 73 43 4f 32 4f 69 6c 00 4b 69
	00000590: 6c 6f 67 72 61 6d 73 50 65 72 43 75 62 69 63 4d
	000005a0: 65 74 65 72 00 4b 69 6c 6f 67 72 61 6d 73 50 65
	000005b0: 72 48 6f 75 72 00 4b 69 6c 6f 77 61 74 74 48 6f
	000005c0: 75 72 73 00 4b 69 6c 6f 77 61 74 74 73 00 4c 69
	000005d0: 74 65 72 73 00 4c 69 74 65 72 73 50 65 72 48 6f
	000005e0: 75 72 00 4c 69 74 65 72 73 50 65 72 4d 69 6e 75
	000005f0: 74 65 00 4c 69 74 65 72 73 50 65 72 53 71 75 61
	00000600: 72 65 4d 65 74 65 72 50 65 72 44 61 79 00 4d 65
	00000610: 67 61 42 74 75 73 00 4d 65 67 61 77 61 74 74 48
	00000620: 6f 75 72 73 00 4d 65 74 65 72 73 50 65 72 53 65
	00000630: 63 6f 6e 64 00 4d 69 63 72 6f 76 6f 6c 74 73 00
	00000640: 4d 69 6c 6c 69 61 6d 70 65 72 65 73 00 4d 69 6c
	00000650: 6c 69 73 65 63 6f 6e 64 73 00 4d 69 6e 75 74 65
	00000660: 73 00 4e 6f 6e 65 00 4e c2 b0 20 73 65 63 6f 6e
	00000670: 64 65 73 00 4f 68 6d 73 00 50 65 72 63 65 6e 74
	00000680: 00 50 6f 75 6e 64 73 46 6f 72 63 65 50 65 72 53
	00000690: 71 75 61 72 65 49 6e 63 68 00 51 75 61 6e 74 69
	000006a0: 74 c3 a9 20 64 65 20 63 68 61 6c 65 75 72 00 51
	000006b0: 75 61 6e 74 69 74 c3 a9 20 64 65 20 63 68 61 6c
	000006c0: 65 75 72 20 31 00 51 75 61 6e 74 69 74 c3 a9 20
	000006d0: 64 65 20 63 68 61 6c 65 75 72 20 32 00 51 75 61
	000006e0: 6e 74 69 74 c3 a9 20 64 65 20 63 68 61 6c 65 75
	000006f0: 72 20 61 75 6a 6f 75 72 64 27 68 75 69 00 51 75
	00000700: 61 6e 74 69 74 c3 a9 20 64 65 20 63 68 61 6c 65
	00000710: 75 72 20 73 65 6d 61 69 6e 65 00 52 61 74 65 64
	00000720: 20 63 75 72 72 65 6e 74 20 31 00 52 61 74 65 64
	00000730: 20 63 75 72 72 65 6e 74 20 32 00 53 36 00 53 37
	00000740: 00 53 65 63 6f 6e 64 73 00 53 65 63 6f 6e 64 73
	00000750: 20 6e 6f 2e 00 53 65 6b 4e 72 00 53 6f 6c 61 72
	00000760: 20 68 65 61 74 00 53 6f 6c 61 72 77 c3 a4 72 6d
	00000770: 65 00 53 71 75 61 72 65 4d 65 74 65 72 73 00 53
	00000780: 74 72 6f 6d 73 74 c3 a4 72 6b 65 20 31 00 53 74
	00000790: 72 6f 6d 73 74 c3 a4 72 6b 65 20 32 00 54 2d 20
	000007a0: 44 c3 a9 70 61 72 74 20 2f 20 53 31 00 54 2d 41
	000007b0: 6d 62 69 61 6e 63 65 00 54 2d 52 65 74 6f 75 72
	000007c0: 20 2f 53 32 00 54 2d 52 c3 bc 63 6b 6c 61 75 66
	000007d0: 2f 53 32 00 54 2d 55 6d 67 65 62 75 6e 67 00 54
	000007e0: 2d 56 6f 72 6c 61 75 66 2f 53 31 00 54 2d 61 6d
	000007f0: 62 69 65 6e 74 00 54 2d 66 6c 6f 77 20 2f 20 53
	00000800: 31 00 54 2d 72 65 74 75 72 6e 20 2f 20 53 32 00
	00000810: 54 53 4c 00 54 6d 61 78 2d 54 65 6d 70 5f 2f 53
	00000820: 35 00 54 6f 6e 73 43 4f 32 47 61 73 00 54 6f 6e
	00000830: 73 43 4f 32 4f 69 6c 00 56 6f 6c 74 73 00 56 6f
	00000840: 6c 75 6d 65 6e 20 4d 6f 6e 61 74 00 56 6f 6c 75
	00000850: 6d 65 6e 20 57 6f 63 68 65 00 56 6f 6c 75 6d 65
	00000860: 6e 20 68 65 75 74 65 00 56 6f 6c 75 6d 65 6e 73
	00000870: 74 72 5f 31 00 56 6f 6c 75 6d 65 6e 73 74 72 5f
	00000880: 32 00 57 61 74 74 48 6f 75 72 73 00 57 61 74 74
	00000890: 73 00 57 61 74 74 73 50 65 72 53 71 75 61 72 65
	000008a0: 4d 65 74 65 72 00 57 c3 a4 72 6d 65 6d 65 6e 67
	000008b0: 65 00 57 c3 a4 72 6d 65 6d 65 6e 67 65 20 31 00
	000008c0: 57 c3 a4 72 6d 65 6d 65 6e 67 65 20 32 00 57 c3
	000008d0: a4 72 6d 65 6d 65 6e 67 65 20 4d 6f 6e 61 74 00
	000008e0: 57 c3 a4 72 6d 65 6d 65 6e 67 65 20 57 6f 63 68
	000008f0: 65 00 57 c3 a4 72 6d 65 6d 65 6e 67 65 20 68 65
	00000900: 75 74 65 00 10 00 00 00 11 00 00 00 16 00 00 00
	00000910: 1a 00 00 00 1d 00 00 00 23 00 00 00 2a 00 00 00
	00000920: 2f 00 00 00 32 00 00 00 35 00 00 00 3c 00 00 00
	00000930: 40 00 00 00 45 00 00 00 48 00 00 00 57 00 00 00
	00000940: 66 00 00 00 6b 00 00 00 72 00 00 00 7b 00 00 00
	00000950: 7e 00 00 00 83 00 00 00 87 00 00 00 8c 00 00 00
	00000960: 99 00 00 00 a9 00 00 00 b9 00 00 00 bf 00 00 00
	00000970: c7 00 00 00 ca 00 00 00 d5 00 00 00 da 00 00 00
	00000980: e1 00 00 00 e6 00 00 00 ea 00 00 00 ef 00 00 00
	00000990: f3 00 00 00 f8 00 00 00 fd 00 00 00 04 01 00 00
	000009a0: 09 01 00 00 0c 01 00 00 1b 01 00 00 2a 01 00 00
	000009b0: 2e 01 00 00 33 01 00 00 38 01 00 00 3d 01 00 00
	000009c0: 42 01 00 00 44 01 00 00 4c 01 00 00 54 01 00 00
	000009d0: 5c 01 00 00 64 01 00 00 6c 01 00 00 74 01 00 00
	000009e0: 7c 01 00 00 84 01 00 00 8c 01 00 00 94 01 00 00
	000009f0: 9c 01 00 00 a4 01 00 00 ac 01 00 00 b4 01 00 00
	00000a00: bc 01 00 00 c4 01 00 00 cc 01 00 00 d4 01 00 00
	00000a10: e5 01 00 00 f6 01 00 00 fb 01 00 00 00 02 00 00
	00000a20: 10 02 00 00 22 02 00 00 2e 02 00 00 41 02 00 00
	00000a30: 45 02 00 00 5a 02 00 00 71 02 00 00 81 02 00 00
	00000a40: 86 02 00 00 95 02 00 00 a4 02 00 00 b6 02 00 00
	00000a50: c4 02 00 00 d9 02 00 00 ef 02 00 00 05 03 00 00
	00000a60: 1b 03 00 00 31 03 00 00 47 03 00 00 5d 03 00 00
	00000a70: 72 03 00 00 87 03 00 00 9c 03 00 00 b1 03 00 00
	00000a80: c6 03 00 00 db 03 00 00 f0 03 00 00 05 04 00 00
	00000a90: 1a 04 00 00 2e 04 00 00 3b 04 00 00 43 04 00 00
	00000aa0: 52 04 00 00 63 04 00 00 71 04 00 00 7d 04 00 00
	00000ab0: 89 04 00 00 97 04 00 00 a7 04 00 00 b7 04 00 00
	00000ac0: cb 04 00 00 de 04 00 00 eb 04 00 00 f1 04 00 00
	00000ad0: f7 04 00 00 0d 05 00 00 22 05 00 00 37 05 00 00
	00000ae0: 43 05 00 00 4c 05 00 00 6e 05 00 00 7e 05 00 00
	00000af0: 8e 05 00 00 a5 05 00 00 b6 05 00 00 c4 05 00 00
	00000b00: ce 05 00 00 d5 05 00 00 e3 05 00 00 f3 05 00 00
	00000b10: 0e 06 00 00 17 06 00 00 25 06 00 00 35 06 00 00
	00000b20: 40 06 00 00 4d 06 00 00 5a 06 00 00 62 06 00 00
	00000b30: 67 06 00 00 74 06 00 00 79 06 00 00 81 06 00 00
	00000b40: 9a 06 00 00 af 06 00 00 c6 06 00 00 dd 06 00 00
	00000b50: fe 06 00 00 1b 07 00 00 2b 07 00 00 3b 07 00 00
	00000b60: 3e 07 00 00 41 07 00 00 49 07 00 00 55 07 00 00
	00000b70: 5b 07 00 00 66 07 00 00 72 07 00 00 7f 07 00 00
	00000b80: 8e 07 00 00 9d 07 00 00 ad 07 00 00 b8 07 00 00
	00000b90: c5 07 00 00 d4 07 00 00 df 07 00 00 ec 07 00 00
	00000ba0: f6 07 00 00 02 08 00 00 10 08 00 00 14 08 00 00
	00000bb0: 22 08 00 00 2d 08 00 00 38 08 00 00 3e 08 00 00
	00000bc0: 4c 08 00 00 5a 08 00 00 68 08 00 00 75 08 00 00
	00000bd0: 82 08 00 00 8c 08 00 00 92 08 00 00 a6 08 00 00
	00000be0: b2 08 00 00 c0 08 00 00 ce 08 00 00 e0 08 00 00
	00000bf0: f2 08 00 00 42 00 00 00 43 00 00 00 47 00 00 00
	00000c00: 4a 00 00 00 4a 00 00 00 4a 00 00 00 4b 00 00 00
	00000c10: 4d 00 00 00 4c 00 00 00 53 00 00 00 53 00 00 00
	00000c20: 53 00 00 00 54 00 00 00 54 00 00 00 54 00 00 00
	00000c30: 55 00 00 00 55 00 00 00 55 00 00 00 56 00 00 00
	00000c40: 56 00 00 00 56 00 00 00 57 00 00 00 57 00 00 00
	00000c50: 57 00 00 00 58 00 00 00 58 00 00 00 58 00 00 00
	00000c60: 59 00 00 00 59 00 00 00 59 00 00 00 5a 00 00 00
	00000c70: 5a 00 00 00 5a 00 00 00 5b 00 00 00 5b 00 00 00
	00000c80: 5b 00 00 00 5c 00 00 00 5c 00 00 00 5c 00 00 00
	00000c90: 5d 00 00 00 5d 00 00 00 5d 00 00 00 5e 00 00 00
	00000ca0: 5e 00 00 00 5e 00 00 00 5f 00 00 00 5f 00 00 00
	00000cb0: 5f 00 00 00 60 00 00 00 60 00 00 00 60 00 00 00
	00000cc0: 61 00 00 00 61 00 00 00 61 00 00 00 62 00 00 00
	00000cd0: 62 00 00 00 62 00 00 00 63 00 00 00 63 00 00 00
	00000ce0: 63 00 00 00 76 00 00 00 64 00 00 00 76 00 00 00
	00000cf0: 68 00 00 00 68 00 00 00 68 00 00 00 73 00 00 00
	00000d00: 73 00 00 00 73 00 00 00 96 00 00 00 96 00 00 00
	00000d10: 96 00 00 00 97 00 00 00 97 00 00 00 97 00 00 00
	00000d20: 99 00 00 00 9a 00 00 00 8b 00 00 00 9b 00 00 00
	00000d30: 9c 00 00 00 46 00 00 00 94 00 00 00 9e 00 00 00
	00000d40: 74 00 00 00 95 00 00 00 9f 00 00 00 75 00 00 00
	00000d50: a8 00 00 00 a3 00 00 00 a2 00 00 00 a6 00 00 00
	00000d60: a4 00 00 00 a1 00 00 00 a7 00 00 00 a5 00 00 00
	00000d70: a0 00 00 00 a9 00 00 00 a9 00 00 00 a9 00 00 00
	00000d80: aa 00 00 00 aa 00 00 00 aa 00 00 00 ae 00 00 00
	00000d90: ae 00 00 00 ae 00 00 00 af 00 00 00 af 00 00 00
	00000da0: af 00 00 00 b0 00 00 00 b0 00 00 00 b0 00 00 00
	00000db0: b1 00 00 00 b1 00 00 00 b1 00 00 00 b2 00 00 00
	00000dc0: b2 00 00 00 b2 00 00 00 6b 00 00 00 b6 00 00 00
	00000dd0: 8f 00 00 00 6c 00 00 00 b7 00 00 00 90 00 00 00
	00000de0: 6d 00 00 00 b8 00 00 00 91 00 00 00 b9 00 00 00
	00000df0: b9 00 00 00 b9 00 00 00 6f 00 00 00 ba 00 00 00
	00000e00: 93 00 00 00 6e 00 00 00 bb 00 00 00 92 00 00 00
	00000e10: 37 00 00 00 03 00 00 00 44 00 00 00 0b 00 00 00
	00000e20: 14 00 00 00 01 00 00 00 45 00 00 00 01 00 00 00
	00000e30: 50 00 00 00 04 00 00 00 48 00 00 00 24 00 00 00
	00000e40: 87 00 00 00 02 00 00 00 49 00 00 00 25 00 00 00
	00000e50: 46 00 00 00 ff ff ff ff 4e 00 00 00 0c 00 00 00
	00000e60: 5a 00 00 00 ff ff ff ff 4f 00 00 00 2a 00 00 00
	00000e70: 3e 00 00 00 00 00 00 00 50 00 00 00 2b 00 00 00
	00000e80: 40 00 00 00 00 00 00 00 51 00 00 00 2c 00 00 00
	00000e90: 3f 00 00 00 ff ff ff ff 52 00 00 00 03 00 00 00
	00000ea0: 12 04 00 00 04 00 00 00 65 00 00 00 0f 00 00 00
	00000eb0: 11 04 00 00 02 00 00 00 66 00 00 00 10 00 00 00
	00000ec0: 10 04 00 00 02 00 00 00 67 00 00 00 11 00 00 00
	00000ed0: 0b 04 00 00 01 00 00 00 69 00 00 00 0d 00 00 00
	00000ee0: 08 04 00 00 01 00 00 00 6a 00 00 00 0e 00 00 00
	00000ef0: 85 00 00 00 ff ff ff ff 70 00 00 00 13 00 00 00
	00000f00: 1b 00 00 00 ff ff ff ff 71 00 00 00 02 00 00 00
	00000f10: 47 00 00 00 ff ff ff ff 72 00 00 00 12 00 00 00
	00000f20: 06 04 00 00 01 00 00 00 77 00 00 00 04 00 00 00
	00000f30: 00 04 00 00 ff ff ff ff 78 00 00 00 16 00 00 00
	00000f40: 0c 04 00 00 01 00 00 00 79 00 00 00 17 00 00 00
	00000f50: 09 04 00 00 01 00 00 00 7a 00 00 00 18 00 00 00
	00000f60: ba 00 00 00 ff ff ff ff 7b 00 00 00 1a 00 00 00
	00000f70: 2c 00 00 00 ff ff ff ff 7c 00 00 00 19 00 00 00
	00000f80: 13 00 00 00 01 00 00 00 7d 00 00 00 15 00 00 00
	00000f90: 30 00 00 00 ff ff ff ff 7e 00 00 00 14 00 00 00
	00000fa0: 52 00 00 00 04 00 00 00 7f 00 00 00 1b 00 00 00
	00000fb0: 88 00 00 00 02 00 00 00 80 00 00 00 1d 00 00 00
	00000fc0: 58 00 00 00 02 00 00 00 81 00 00 00 1e 00 00 00
	00000fd0: 01 04 00 00 ff ff ff ff 82 00 00 00 1c 00 00 00
	00000fe0: 07 04 00 00 01 00 00 00 83 00 00 00 05 00 00 00
	00000ff0: 92 00 00 00 01 00 00 00 84 00 00 00 06 00 00 00
	00001000: 4a 00 00 00 ff ff ff ff 85 00 00 00 1f 00 00 00
	00001010: 4c 04 00 00 ff ff ff ff 86 00 00 00 2d 00 00 00
	00001020: 02 00 00 00 ff ff ff ff 87 00 00 00 20 00 00 00
	00001030: 9f 00 00 00 ff ff ff ff 88 00 00 00 22 00 00 00
	00001040: 48 00 00 00 ff ff ff ff 89 00 00 00 21 00 00 00
	00001050: ff ff ff ff ff ff ff ff 8a 00 00 00 00 00 00 00
	00001060: 04 00 00 00 ff ff ff ff 8c 00 00 00 2e 00 00 00
	00001070: 62 00 00 00 ff ff ff ff 8d 00 00 00 2f 00 00 00
	00001080: 38 00 00 00 03 00 00 00 8e 00 00 00 26 00 00 00
	00001090: 49 00 00 00 ff ff ff ff 98 00 00 00 27 00 00 00
	000010a0: 00 00 00 00 ff ff ff ff 9d 00 00 00 23 00 00 00
	000010b0: 0d 04 00 00 01 00 00 00 ab 00 00 00 28 00 00 00
	000010c0: 0a 04 00 00 01 00 00 00 ac 00 00 00 29 00 00 00
	000010d0: 05 00 00 00 ff ff ff ff ad 00 00 00 07 00 00 00
	000010e0: 12 00 00 00 01 00 00 00 b3 00 00 00 0a 00 00 00
	000010f0: 2f 00 00 00 ff ff ff ff b4 00 00 00 08 00 00 00
	00001100: 23 00 00 00 ff ff ff ff b5 00 00 00 09 00 00 00
	00001110: 10 00 ff ff 00 00 00 00 01 00 00 00 30 7e ff ff
	00001120: 00 00 00 00 03 00 00 00 31 7e ff ff 00 00 00 00
	00001130: 0a 00 00 00 32 7e ff ff 00 00 00 00 0b 00 00 00
	00001140: 33 7e ff ff 00 00 00 00 0c 00 00 00 34 7e ff ff
	00001150: 00 00 00 00 0d 00 00 00 35 7e ff ff 00 00 00 00
	00001160: 0e 00 00 00 36 7e ff ff 00 00 00 00 0f 00 00 00
	00001170: 37 7e ff ff 00 00 00 00 10 00 00 00 38 7e ff ff
	00001180: 00 00 00 00 11 00 00 00 39 7e ff ff 00 00 00 00
	00001190: 12 00 00 00 3a 7e ff ff 00 00 00 00 04 00 00 00
	000011a0: 3b 7e ff ff 00 00 00 00 05 00 00 00 3c 7e ff ff
	000011b0: 00 00 00 00 06 00 00 00 3d 7e ff ff 00 00 00 00
	000011c0: 07 00 00 00 3e 7e ff ff 00 00 00 00 08 00 00 00
	000011d0: 3f 7e ff ff 00 00 00 00 09 00 00 00 61 7f ff ff
	000011e0: 00 00 00 00 16 00 00 00 00 00 00 00 00 ff 00 00
	000011f0: 01 00 00 00 00 00 00 00 01 00 00 00 00 ff 00 00
	00001200: 00 01 00 00 00 00 00 00 02 00 00 00 00 ff 00 00
	00001210: 00 00 01 00 00 00 00 00 03 00 00 00 00 ff 01 00
	00001220: 00 00 00 01 00 00 00 00 24 00 00 00 00 ff 00 00
	00001230: 00 ca 9a 3b 00 00 00 00 25 00 00 00 00 ff 00 00
	00001240: 00 00 ca 9a 3b 00 00 00 26 00 00 00 00 ff 00 00
	00001250: 00 00 00 ca 9a 3b 00 00 27 00 00 00 00 ff 01 00
	00001260: 00 00 00 00 ca 9a 3b 00 08 00 00 00 00 ff 00 00
	00001270: 01 00 00 00 00 00 00 00 09 00 00 00 00 ff 00 00
	00001280: 00 01 00 00 00 00 00 00 0a 00 00 00 00 ff 00 00
	00001290: 00 00 01 00 00 00 00 00 0b 00 00 00 00 ff 01 00
	000012a0: 00 00 00 01 00 00 00 00 0c 00 00 00 00 ff 00 00
	000012b0: 01 00 00 00 00 00 00 00 0d 00 00 00 00 ff 00 00
	000012c0: 00 01 00 00 00 00 00 00 0e 00 00 00 00 ff 00 00
	000012d0: 00 00 01 00 00 00 00 00 0f 00 00 00 00 ff 01 00
	000012e0: 00 00 00 01 00 00 00 00 14 00 00 00 00 ff 00 00
	000012f0: 01 00 00 00 00 00 00 00 15 00 00 00 00 ff 00 00
	00001300: 00 01 00 00 00 00 00 00 16 00 00 00 00 ff 00 00
	00001310: 00 00 01 00 00 00 00 00 17 00 00 00 00 ff 01 00
	00001320: 00 00 00 01 00 00 00 00 10 00 00 00 00 ff 00 00
	00001330: 01 00 00 00 00 00 00 00 11 00 00 00 00 ff 00 00
	00001340: 00 01 00 00 00 00 00 00 12 00 00 00 00 ff 00 00
	00001350: 00 00 01 00 00 00 00 00 13 00 00 00 00 ff 01 00
	00001360: 00 00 00 01 00 00 00 00 18 00 00 00 00 ff 00 00
	00001370: 01 00 00 00 00 00 00 00 19 00 00 00 00 ff 00 00
	00001380: 00 01 00 00 00 00 00 00 1a 00 00 00 00 ff 00 00
	00001390: 00 00 01 00 00 00 00 00 1b 00 00 00 00 ff 01 00
	000013a0: 00 00 00 01 00 00 00 00 1c 00 00 00 00 ff 00 00
	000013b0: 01 00 00 00 00 00 00 00 1d 00 00 00 00 ff 00 00
	000013c0: 00 01 00 00 00 00 00 00 1e 00 00 00 00 ff 00 00
	000013d0: 00 00 01 00 00 00 00 00 1f 00 00 00 00 ff 01 00
	000013e0: 00 00 00 01 00 00 00 00 20 00 00 00 00 ff 00 00
	000013f0: 01 00 00 00 00 00 00 00 21 00 00 00 00 ff 00 00
	00001400: 00 01 00 00 00 00 00 00 22 00 00 00 00 ff 00 00
	00001410: 00 00 01 00 00 00 00 00 23 00 00 00 00 ff 01 00
	00001420: 00 00 00 01 00 00 00 00 30 00 00 00 27 00 00 00
	00001430: 12 00 00 00 00 00 00 00 01 00 00 00 08 00 00 00
	00001440: e8 11 00 00 32 00 00 00 2c 00 00 00 12 00 00 00
	00001450: 00 00 00 00 01 00 00 00 04 00 00 00 68 12 00 00
	00001460: 33 00 00 00 2b 00 00 00 12 00 00 00 00 00 00 00
	00001470: 01 00 00 00 04 00 00 00 a8 12 00 00 35 00 00 00
	00001480: 2a 00 00 00 12 00 00 00 00 00 00 00 01 00 00 00
	00001490: 04 00 00 00 e8 12 00 00 34 00 00 00 15 00 00 00
	000014a0: 52 00 00 00 00 00 00 00 01 00 00 00 04 00 00 00
	000014b0: 28 13 00 00 36 00 00 00 24 00 00 00 52 00 00 00
	000014c0: 00 00 00 00 01 00 00 00 04 00 00 00 68 13 00 00
	000014d0: 37 00 00 00 23 00 00 00 52 00 00 00 00 00 00 00
	000014e0: 01 00 00 00 04 00 00 00 a8 13 00 00 38 00 00 00
	000014f0: 22 00 00 00 52 00 00 00 00 00 00 00 01 00 00 00
	00001500: 04 00 00 00 e8 13 00 00 00 00 00 00 00 ff 00 00
	00001510: 01 00 00 00 00 00 00 00 01 00 00 00 00 ff 00 00
	00001520: 00 01 00 00 00 00 00 00 02 00 00 00 00 ff 00 00
	00001530: 00 00 01 00 00 00 00 00 03 00 00 00 00 ff 01 00
	00001540: 00 00 00 01 00 00 00 00 04 00 00 00 00 ff 00 00
	00001550: 01 00 00 00 00 00 00 00 05 00 00 00 00 ff 00 00
	00001560: 00 01 00 00 00 00 00 00 06 00 00 00 00 ff 00 00
	00001570: 00 00 01 00 00 00 00 00 07 00 00 00 00 ff 01 00
	00001580: 00 00 00 01 00 00 00 00 08 00 00 00 00 ff 00 00
	00001590: 01 00 00 00 00 00 00 00 09 00 00 00 00 ff 00 00
	000015a0: 00 01 00 00 00 00 00 00 0a 00 00 00 00 ff 00 00
	000015b0: 00 00 01 00 00 00 00 00 0b 00 00 00 00 ff 01 00
	000015c0: 00 00 00 01 00 00 00 00 0c 00 00 00 00 ff 00 00
	000015d0: 01 00 00 00 00 00 00 00 0d 00 00 00 00 ff 00 00
	000015e0: 00 01 00 00 00 00 00 00 0e 00 00 00 00 ff 00 00
	000015f0: 00 00 01 00 00 00 00 00 0f 00 00 00 00 ff 01 00
	00001600: 00 00 00 01 00 00 00 00 10 00 00 00 00 ff 00 00
	00001610: 01 00 00 00 00 00 00 00 11 00 00 00 00 ff 00 00
	00001620: 00 01 00 00 00 00 00 00 12 00 00 00 00 ff 00 00
	00001630: 00 00 01 00 00 00 00 00 13 00 00 00 00 ff 01 00
	00001640: 00 00 00 01 00 00 00 00 14 00 00 00 00 ff 00 00
	00001650: 01 00 00 00 00 00 00 00 15 00 00 00 00 ff 00 00
	00001660: 00 01 00 00 00 00 00 00 16 00 00 00 00 ff 00 00
	00001670: 00 00 01 00 00 00 00 00 17 00 00 00 00 ff 01 00
	00001680: 00 00 00 01 00 00 00 00 18 00 00 00 00 ff 00 00
	00001690: 01 00 00 00 00 00 00 00 19 00 00 00 00 ff 00 00
	000016a0: 00 01 00 00 00 00 00 00 1a 00 00 00 00 ff 00 00
	000016b0: 00 00 01 00 00 00 00 00 1b 00 00 00 00 ff 01 00
	000016c0: 00 00 00 01 00 00 00 00 1c 00 00 00 00 ff 00 00
	000016d0: 01 00 00 00 00 00 00 00 1d 00 00 00 00 ff 00 00
	000016e0: 00 01 00 00 00 00 00 00 1e 00 00 00 00 ff 00 00
	000016f0: 00 00 01 00 00 00 00 00 1f 00 00 00 00 ff 01 00
	00001700: 00 00 00 01 00 00 00 00 20 00 00 00 00 ff 00 00
	00001710: 01 00 00 00 00 00 00 00 21 00 00 00 00 ff 00 00
	00001720: 00 01 00 00 00 00 00 00 22 00 00 00 00 ff 00 00
	00001730: 00 00 01 00 00 00 00 00 23 00 00 00 00 ff 01 00
	00001740: 00 00 00 01 00 00 00 00 24 00 00 00 00 ff 00 00
	00001750: 01 00 00 00 00 00 00 00 25 00 00 00 00 ff 00 00
	00001760: 00 01 00 00 00 00 00 00 26 00 00 00 00 ff 00 00
	00001770: 00 00 01 00 00 00 00 00 27 00 00 00 00 ff 01 00
	00001780: 00 00 00 01 00 00 00 00 28 00 00 00 00 ff 00 00
	00001790: 01 00 00 00 00 00 00 00 29 00 00 00 00 ff 00 00
	000017a0: 00 01 00 00 00 00 00 00 2a 00 00 00 00 ff 00 00
	000017b0: 00 00 01 00 00 00 00 00 2b 00 00 00 00 ff 01 00
	000017c0: 00 00 00 01 00 00 00 00 2c 00 00 00 00 ff 00 00
	000017d0: 01 00 00 00 00 00 00 00 2d 00 00 00 00 ff 00 00
	000017e0: 00 01 00 00 00 00 00 00 2e 00 00 00 00 ff 00 00
	000017f0: 00 00 01 00 00 00 00 00 2f 00 00 00 00 ff 01 00
	00001800: 00 00 00 01 00 00 00 00 30 00 00 00 00 ff 00 00
	00001810: 01 00 00 00 00 00 00 00 31 00 00 00 00 ff 00 00
	00001820: 00 01 00 00 00 00 00 00 32 00 00 00 00 ff 00 00
	00001830: 00 00 01 00 00 00 00 00 33 00 00 00 00 ff 01 00
	00001840: 00 00 00 01 00 00 00 00 34 00 00 00 00 ff 00 00
	00001850: 01 00 00 00 00 00 00 00 35 00 00 00 00 ff 00 00
	00001860: 00 01 00 00 00 00 00 00 36 00 00 00 00 ff 00 00
	00001870: 00 00 01 00 00 00 00 00 37 00 00 00 00 ff 01 00
	00001880: 00 00 00 01 00 00 00 00 38 00 00 00 00 ff 00 00
	00001890: 01 00 00 00 00 00 00 00 39 00 00 00 00 ff 00 00
	000018a0: 00 01 00 00 00 00 00 00 3a 00 00 00 00 ff 00 00
	000018b0: 00 00 01 00 00 00 00 00 3b 00 00 00 00 ff 01 00
	000018c0: 00 00 00 01 00 00 00 00 3c 00 00 00 00 ff 00 00
	000018d0: 01 00 00 00 00 00 00 00 3d 00 00 00 00 ff 00 00
	000018e0: 00 01 00 00 00 00 00 00 3e 00 00 00 00 ff 00 00
	000018f0: 00 00 01 00 00 00 00 00 3f 00 00 00 00 ff 01 00
	00001900: 00 00 00 01 00 00 00 00 44 00 00 00 00 ff 00 00
	00001910: 01 00 00 00 00 00 00 00 45 00 00 00 00 ff 01 00
	00001920: 00 01 00 00 00 00 00 00 46 00 00 00 00 ff 00 00
	00001930: e8 03 00 00 00 00 00 00 47 00 00 00 00 ff 01 00
	00001940: 00 e8 03 00 00 00 00 00 48 00 00 00 00 ff 00 00
	00001950: 40 42 0f 00 00 00 00 00 49 00 00 00 00 ff 01 00
	00001960: 00 40 42 0f 00 00 00 00 4a 00 00 00 00 ff 00 00
	00001970: 00 ca 9a 3b 00 00 00 00 4b 00 00 00 00 ff 01 00
	00001980: 00 00 ca 9a 3b 00 00 00 40 00 00 00 00 ff 00 00
	00001990: 01 00 00 00 00 00 00 00 41 00 00 00 00 ff 00 00
	000019a0: 00 01 00 00 00 00 00 00 42 00 00 00 00 ff 00 00
	000019b0: 00 00 01 00 00 00 00 00 43 00 00 00 00 ff 01 00
	000019c0: 00 00 00 01 00 00 00 00 30 00 00 00 19 00 00 00
	000019d0: 49 00 00 00 00 00 00 00 01 00 00 00 04 00 00 00
	000019e0: 08 15 00 00 31 00 00 00 1e 00 00 00 3e 00 00 00
	000019f0: 01 00 00 00 01 00 00 00 04 00 00 00 48 15 00 00
	00001a00: 32 00 00 00 1f 00 00 00 3e 00 00 00 01 00 00 00
	00001a10: 01 00 00 00 04 00 00 00 88 15 00 00 33 00 00 00
	00001a20: 1d 00 00 00 3e 00 00 00 01 00 00 00 01 00 00 00
	00001a30: 04 00 00 00 c8 15 00 00 34 00 00 00 20 00 00 00
	00001a40: 3e 00 00 00 01 00 00 00 01 00 00 00 04 00 00 00
	00001a50: 08 16 00 00 35 00 00 00 21 00 00 00 3e 00 00 00
	00001a60: 01 00 00 00 01 00 00 00 04 00 00 00 48 16 00 00
	00001a70: 36 00 00 00 14 00 00 00 23 00 00 00 01 00 00 00
	00001a80: 01 00 00 00 04 00 00 00 88 16 00 00 37 00 00 00
	00001a90: 25 00 00 00 88 00 00 00 00 00 00 00 01 00 00 00
	00001aa0: 04 00 00 00 c8 16 00 00 38 00 00 00 26 00 00 00
	00001ab0: 88 00 00 00 00 00 00 00 01 00 00 00 04 00 00 00
	00001ac0: 08 17 00 00 39 00 00 00 17 00 00 00 3e 00 00 00
	00001ad0: 01 00 00 00 01 00 00 00 04 00 00 00 48 17 00 00
	00001ae0: 3a 00 00 00 18 00 00 00 3e 00 00 00 01 00 00 00
	00001af0: 01 00 00 00 04 00 00 00 88 17 00 00 3b 00 00 00
	00001b00: 1b 00 00 00 02 00 00 00 02 00 00 00 01 00 00 00
	00001b10: 04 00 00 00 c8 17 00 00 3c 00 00 00 1c 00 00 00
	00001b20: 02 00 00 00 02 00 00 00 01 00 00 00 04 00 00 00
	00001b30: 08 18 00 00 3d 00 00 00 02 00 00 00 ff ff ff ff
	00001b40: 00 00 00 00 01 00 00 00 04 00 00 00 48 18 00 00
	00001b50: 3e 00 00 00 28 00 00 00 13 00 00 00 02 00 00 00
	00001b60: 01 00 00 00 04 00 00 00 88 18 00 00 3f 00 00 00
	00001b70: 29 00 00 00 13 00 00 00 02 00 00 00 01 00 00 00
	00001b80: 04 00 00 00 c8 18 00 00 41 00 00 00 1a 00 00 00
	00001b90: 12 00 00 00 00 00 00 00 01 00 00 00 08 00 00 00
	00001ba0: 08 19 00 00 40 00 00 00 00 00 00 00 ff ff ff ff
	00001bb0: 00 00 00 00 01 00 00 00 04 00 00 00 88 19 00 00
	00001bc0: 10 00 ff ff 30 7e f0 ff 00 01 00 00 08 00 00 00
	00001bd0: 28 14 00 00 10 00 ff ff 61 7f ff ff 00 01 00 00
	00001be0: 12 00 00 00 c8 19 00 00 ef a1 33 01 bc 00 00 00
	00001bf0: 04 09 00 00 2d 00 00 00 f4 0b 00 00 30 00 00 00
	00001c00: 10 0e 00 00 12 00 00 00 10 11 00 00 02 00 00 00
	00001c10: c0 1b 00 00                                    


### The FILEHEADER block

The FILEHEADER block is located at VSF offset 0x00000000. The block in the example VSF looks like this:

	00000000: 6c 64 6c 64 14 1c 00 00 01 00 00 00 e8 1b 00 00

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00000000 | `ChecksumA` | 0x646c |
| 0x00000002 | `ChecksumB` | 0x646c |
| 0x00000004 | `TotalLength` | 0x00001c14 (7188) |
| 0x00000008 | `DataVersion` | 0x00000001 (1) |
| 0x0000000C | `SpecificationOffset` | 0x00001be8 (7144) |


### The SPECIFICATION block

According to the `SpecificationOffset` field of the FILEHEADER block the SPECIFICATION block of the example VSF is located at VSF offset 0x00001be8. The block in the example VSF looks like this:

	00001be0:                         ef a1 33 01 bc 00 00 00
	00001bf0: 04 09 00 00 2d 00 00 00 f4 0b 00 00 30 00 00 00
	00001c00: 10 0e 00 00 12 00 00 00 10 11 00 00 02 00 00 00
	00001c10: c0 1b 00 00

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00001be8 | `Datecode` | 0x0133a1ef (20161007) |
| 0x00001bec | `TextCount` | 0x000000bc (188) |
| 0x00001bf0 | `TextTableOffset` | 0x00000904 |
| 0x00001bf4 | `LocalizedTextCount` | 0x0000002d (45) |
| 0x00001bf8 | `LocalizedTextTableOffset` | 0x00000bf4 |
| 0x00001bfc | `UnitCount` | 0x00000030 (48) |
| 0x00001c00 | `UnitTableOffset` | 0x00000e10 |
| 0x00001c04 | `DeviceTemplateCount` | 0x00000012 (18) |
| 0x00001c08 | `DeviceTemplateTableOffset` | 0x00001110 |
| 0x00001c0c | `PacketTemplateCount` | 0x00000002 (2) |
| 0x00001c10 | `PacketTemplateTableOffset` | 0x00001bc0 |


### The TEXT blocks

According to the `TextCount` and `TextTableOffset` fields of the SPECIFICATION block the table of TEXT blocks of the example VSF contains 188 blocks and starts at VSF offset 0x00000904.

Other blocks reference TEXT blocks using a "TEXT index". This index can be used to calculate the VSF offset of the corresponding TEXT block as follows:

	TextBlockOffset = SPECIFICATION.TextTableOffset + TextIndex * 4

For example: the TEXT block referenced by TEXT index 0x00000050 (80) is located at VSF offset 0x00000a44. The block in the example VSF looks like this:

	00000a40:             95 02 00 00

It contains the following value:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00000a44 | `StringOffset` | 0x00000295 |

The UTF-8 encoded, NUL-terminated sequence of characters starting at VSF offset 0x00000295 looks like this:

	00000290:                44 65 67 72 65 65 73 43 65 6c 73         DegreesCels
	000002a0: 69 75 73 00                                        ius.

The TEXT block referenced by TEXT index 0x00000050 (80) hence references the string `"DegreesCelsius"`.


### The LOCALIZEDTEXT blocks

According to the `LocalizedTextCount` and `LocalizedTextTableOffset` fields of the SPECIFICATION block the table of LOCALIZEDTEXT blocks of the example VSF contains 45 blocks and starts at VSF offset 0x00000bf4.

Other blocks reference LOCALIZEDTEXT blocks using a "LOCALIZEDTEXT index". This index can be used to calculate the VSF offset of the corresponding LOCALIZEDTEXT block as follows:

	LocalizedTextBlockOffset = SPECIFICATION.LocalizedTextTableOffset + LocalizedTextIndex * 12

For example: the LOCALIZEDTEXT block referenced by LOCALIZEDTEXT index 0x0000001a (26) is located at VSF offset 0x00000d2c. The block in the example VSF looks like this:

00000d20:                                     9b 00 00 00
00000d30: 9c 00 00 00 46 00 00 00

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00000d2c | `TextIndexEN` | 0x0000009b (155) |
| 0x00000d30 | `TextIndexDE` | 0x0000009c (156) |
| 0x00000d34 | `TextIndexFR` | 0x00000046 (70) |

The TEXT indices reference the strings `"Solar heat"`, `"Solarwärme"` and `"Chaleur solaire"` respectively.


### The UNIT blocks

According to the `UnitCount` and `UnitTableOffset` fields of the SPECIFICATION block the table of UNIT blocks of the example VSF contains 48 blocks and starts at VSF offset 0x00000e10.

Other blocks reference UNIT blocks using an "UNIT identifier". This identifier can be used to lookup a UNIT block with the same value stored in its `UnitId` field.

Each block has a size of 16 bytes. To calculate the VSF offset of a UNIT block the following formula can be used:

	UnitBlockOffset = SPECIFICATION.UnitTableOffset + UnitIndex * 16

For example: the UNIT block referenced by UNIT identifier 0x0000003e (62) is located at UNIT index 0x00000006 (6) and VSF offset 0x00000e70. The block in the example VSF looks like this:

	00000e70: 3e 00 00 00 00 00 00 00 50 00 00 00 2b 00 00 00

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00000e70 | `UnitId` | 0x0000003e (62) |
| 0x00000e74 | `UnitFamilyId` | 0x00000000 (0) |
| 0x00000e78 | `UnitCodeTextIndex` | 0x00000050 (80) |
| 0x00000e7c | `UnitTextTextIndex` | 0x0000002b (43) |

The TEXT indices reference the strings `"DegreesCelsius"` and `" °C"` respectively.


### The DEVICETEMPLATE blocks

According to the `DeviceTemplateCount` and `DeviceTemplateTableOffset` fields of the SPECIFICATION block the table of DEVICETEMPLATE blocks of the example VSF contains 18 blocks and starts at VSF offset 0x00001110.

Each block has a size of 12 bytes. To calculate the VSF offset of a DEVICETEMPLATE block the following formula can be used:

	DeviceTemplateBlockOffset = SPECIFICATION.DeviceTemplateTableOffset + DeviceTemplateIndex * 12

For example: the DEVICETEMPLATE block at DEVICETEMPLATE index 0x00000001 (1) is located at VSF offset 0x0000111c. The block in the example VSF looks like this:

	00001110:                                     30 7e ff ff
	00001120: 00 00 00 00 03 00 00 00

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x0000111c | `SelfAddress` | 0x7e30 |
| 0x0000111e | `SelfMask` | 0xffff |
| 0x00001120 | `PeerAddress` | 0x0000 |
| 0x00001122 | `PeerMask` | 0x0000 |
| 0x00001124 | `NameLocalizedTextIndex` | 0x00000003 (3) |

It matches a device with a VBus address of `0x7e30`. The LOCALIZEDTEXT index references to a set of strings that is `"DeltaSol MX [WMZ #0]"` for each language.


### The PACKETTEMPLATE blocks

According to the `PacketTemplateCount` and `PacketTemplateTableOffset` fields of the SPECIFICATION block the table of PACKETTEMPLATE blocks of the example VSF contains 2 blocks and starts at VSF offset 0x00001bc0.

Each block has a size of 20 bytes. To calculate the VSF offset of a PACKETTEMPLATE block the following formula can be used:

	PacketTemplateBlockOffst = SPECIFICATION.PacketTemplateTableOffset + PacketTemplateIndex * 20

For example: the PACKETTEMPLATE block at PACKETTEMPLATE index 0x00000001 (1) is located at VSF offset 0x00001bd4. The block in the example VSF looks like this:

	00001bd0:             10 00 ff ff 61 7f ff ff 00 01 00 00
	00001be0: 12 00 00 00 c8 19 00 00

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00001bd4 | `DestinationAddress` | 0x0010 |
| 0x00001bd6 | `DestinationMask` | 0xffff |
| 0x00001bd8 | `SourceAddress` | 0x7f61 |
| 0x00001bda | `SourceMask` | 0xffff |
| 0x00001bdc | `Command` | 0x0100 |
| 0x00001be0 | `FieldCount` | 0x00000012 (18) |
| 0x00001be4 | `FieldTableOffset` | 0x000019c8 |

It matches a packet with a VBus destination address of 0x0010, a VBus source address of 0x7f61 and a command of 0x0100.


### The PACKETTEMPLATEFIELD blocks

The following example uses the PACKETTEMPLATE block from above located at VSF offset 0x00001bd4.

According to the `FieldCount` and `FieldTableOffset` fields of that PACKETTEMPLATE block the table of PACKETTEMPLATEFIELD blocks contains 18 blocks and starts at VSF offset 0x000019c8.

Each block has a size of 28 bytes. To calculate the VSF offset of a PACKETTEMPLATEFIELD block the following formula can be used:

	PacketTemplateFieldBlockOffset = PACKETTEMPLATE.FieldTableOffset + PacketTemplateFieldIndex * 28

For example: the PACKETTEMPLATEFIELD block at PACKETTEMPLATEFIELD index 0x00000010 (16) is located at VSF offset 0x00001b88. The block in the example VSF looks like this:

	00001b80:                         41 00 00 00 1a 00 00 00
	00001b90: 12 00 00 00 00 00 00 00 01 00 00 00 08 00 00 00
	00001ba0: 08 19 00 00                                    

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00001b88 | `IdTextIndex` | 0x00000041 (65) |
| 0x00001b8c | `NameLocalizedTextIndex` | 0x0000001a (26) |
| 0x00001b90 | `UnitId` | 0x00000012 (18) |
| 0x00001b94 | `Precision` | 0x00000000 (0) |
| 0x00001b98 | `TypeId` | 0x00000001 (1) |
| 0x00001b9c | `PartCount` | 0x00000008 (8) |
| 0x00001ba0 | `PartTableOffset` | 0x00001908 |

The `IdTextIndex` field references the string `"068\_2\_0"`. The `NameLocalizedTextIndex` field references the strings `"Solar heat"`, `"Solarwärme"` and `"Chaleur solaire"`. The `UnitId` field references the unit `"WattHours"`.


### The PACKETTEMPLATEFIELDPART blocks

The following example used the PACKETTEMPLATEFIELD block from above located at VSF offset 0x00001b88.

According to the `PartCount` and `PartTableOffset` fields of that PACKETTEMPLATEFIELD block the table of PACKETTEMPLATEFIELDPART blocks contains 8 blocks and starts at VSF offset 0x00001908.

Each block has a size of 16 bytes. To calculate the VSF offset of a PACKETTEMPLATEFIELDPART block the following formula can be used:

	PacketTemplateFieldPartBlockOffset = PACKETTEMPLATEFIELD.PartTableOffset + PacketTemplateFieldPartIndex * 16

For example: the PACKETTEMPLATEFIELDPART block at index 0x00000004 (4) is located at VSF offset 0x00001948. The block in the example VSF looks like this:

	00001940:                         48 00 00 00 00 ff 00 00
	00001950: 40 42 0f 00 00 00 00 00                        

It contains the following values:

| Offset | Name | Value |
|--:|:--|:--|
| 0x00001948 | `Offset` | 0x00000048 (72) |
| 0x0000194c | `BitPos` | 0x00 |
| 0x0000194d | `Mask` | 0xff |
| 0x0000194e | `IsSigned` | 0x00 |
| 0x00001950 | `Factor` | 0x00000000000f4240 (1000000) |
