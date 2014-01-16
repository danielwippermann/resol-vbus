/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;


var extend = require('./extend');



var Recorder = extend(EventEmitter, /** @lends Recorder# */ {

    /**
     * Creates a new Recorder instance.
     *
     * @constructs

     * @classdesc
     * A Recorder is a storage for HeaderSet object.
     * Each storage unit has an id (which can be a URL), an estimated date range and a hash.
     * The hash should be easily creatable from metadata and does not have to include the content itself.
     * 
     * The storage format and retrieval is implementation specific.
     * 
     */
    constructor: function() {
        EventEmitter.call(this);
    },

    getRecordingInfo: function(/* options */) {
        throw new Error('Must be implemented by sub-class');
    },


    getRecordingState: function() {

    }
});



module.exports = Recorder;
