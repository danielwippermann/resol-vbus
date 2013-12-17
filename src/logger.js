/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var EventEmitter = require('events').EventEmitter;


var _ = require('lodash');


var extend = require('./extend');

var HeaderSet = require('./header-set');



var optionKeys = [
    'logInterval',
    'headerSet',
];



var Logger = extend(EventEmitter, {

    logInterval: 0,

    headerSet: null,

    lastLogTime: 0,

    lastIdHash: null,

    timer: null,

    constructor: function(options) {
        EventEmitter.call(this);

        _.extend(this, _.pick(options, optionKeys));

        if (!this.headerSet) {
            this.headerSet = new HeaderSet();
        }

        this.lastLogTime = Date.now();
    },

    startLogInterval: function() {
        this.stopLogInterval();

        this._handleLogInterval();
    },

    stopLogInterval: function() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },

    _handleLogInterval: function() {
        var _this = this;

        var now = Date.now();

        if (this.logInterval > 0) {
            var lastInterval = Math.floor(this.lastLogTime / this.logInterval);
            var currentInterval = Math.floor(now / this.logInterval);
            var diff = currentInterval - lastInterval;

            if ((diff < -1) || (diff > 0)) {
                var idHash = this.headerSet.getIdHash();

                var idHashDiffers = (this.lastIdHash !== idHash);

                this.headerSet.timestamp = new Date(now);

                this.emit('logInterval', {
                    headerSet: this.headerSet,
                    idHashDiffers: idHashDiffers,
                });

                this.lastLogTime = now;
                this.lastIdHash = idHash;
            }
        }

        var interval = 1000 - (now % 1000);
        this.timer = setTimeout(function() {
            _this._handleLogInterval();
        }, interval);
    }

});



module.exports = Logger;
