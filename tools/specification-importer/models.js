/*! resol-vbus | Copyright (c) 2013-2017, Daniel Wippermann | MIT license */
'use strict';



var extend = require('../../src/extend');



var VBusSpecModel = extend(null, {

});


var VBusSpecText = VBusSpecModel.extend({

    lang: 'ref',

    text: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);
    },

});


var VBusSpecDevice = VBusSpecModel.extend({

    selfAddress: 0,

    selfMask: 65535,

    peerAddress: 0,

    peerMask: 0,

    name: null,

    isMaster: false,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.name = [];
    },

});


var VBusSpecPacketField = VBusSpecModel.extend({

    offset: 0,

    name: null,

    bitSize: 0,

    bitPos: 0,

    factor: 1,

    unit: null,

    commonUsage: null,

    format: null,

    timeRef: 0,

    fields: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.name = [];
        this.fields = [];
    },

});


var VBusSpecPacket = VBusSpecModel.extend({

    destinationAddress: 0,

    destinationMask: 65535,

    sourceAddress: 0,

    sourceMask: 65535,

    command: 0,

    fields: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.fields = [];
    },

});


var VBusSpecification = VBusSpecModel.extend({

    devices: null,

    packets: null,

    constructor: function() {
        VBusSpecModel.apply(this, arguments);

        this.devices = [];
        this.packets = [];
    },

});



module.exports = {

    VBusSpecText: VBusSpecText,
    VBusSpecDevice: VBusSpecDevice,
    VBusSpecPacketField: VBusSpecPacketField,
    VBusSpecPacket: VBusSpecPacket,
    VBusSpecification: VBusSpecification,

};
