---
layout: docs
title: Documentation
---

Welcome to the documentation of the resol-vbus project. The resol-vbus Node.js module allows you to connect to RESOL VBus-enabled devices, get their live or recorded data, filter them and then store them in many different formats.


## Connections

Connections are used to get live data from a RESOL VBus-enabled device. Connections know how to decode the incoming binary data stream according to the VBus Protocol Specification. One a valid piece of information was decoded the Connection emits an event.


## VBus Models

Currently VBus has three different protocol version, each specialized for its use case. Each of these three different kinds of models has an associated class which inherits from the abstract Header class.


### Header

This Header class provides uniform access to properties and methods that are applicable for all sub-classes. Each Header sub-class knows how to generate a Header ID from its properties. Header IDs include information about the source and the destination of the Header as well as other information that identifies that Header.


### Packet

The version 1 Packets are sent by the RESOL VBus-enabled device in regular intervals and carry payload data like sensor temperatures, relais speeds, date and time. Those Packets have a predefined structure which is documented in the Appendix H of the VBus Protocol Specification.


### Datagram

The version 2 Datagrams allow remote access to device values that are part of the device's display menu interface. Each of these values has an unique index that can be used to read or write the value using a datagram.


### Telegram

The version 3 Telegrams are mostly used to communicate with external sensors and actors in a very efficient way.


### HeaderSet

In addition to those model classes there is a HeaderSet class which works like an intelligent array. Adding an instance of one of the Header sub-classes to a HeaderSet automatically replaces an older version of this instance with the same Header ID if present.


## Specification

Instances of the Packet class carry optional binary payload in them. The Specification class is capable of enumerating and converting the information within that payload to a human- or machine-readable format. It basically is a JavaScript implementation of Appendix H of the VBus Protocol Specification.


## Converters

Converters take instances of the Header and HeaderSet classes and converts them to a different format. There are several