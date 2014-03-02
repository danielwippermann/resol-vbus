/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;


var _ = require('lodash');


var HeaderSet = require('./header-set');



var optionKeys = [
    'interval',
    'timeToLive',
    'minTimestamp',
    'maxTimestamp',
];



var HeaderSetConsolidator = HeaderSet.extend(/** @lends HeaderSetConsolidator# */ {

    /**
     * The interval in which the `headerSet` event should be emitted.
     * @type {number}
     */
    interval: 0,

    /**
     * Header instances that are older then this duration are removed from the set.
     * @type {number}
     */
    timeToLive: 0,

    /**
     * HeaderSet instances from a time before this Date are ignored.
     * @type {Date}
     */
    minTimestamp: null,

    /**
     * HeaderSet instances from a time after this Date are ignored.
     * @type {Date}
     */
    maxTimestamp: null,

    lastIntervalTime: 0,

    timer: null,

    /**
     * Creates a new instances and optionally initializes its members to the given values.
     *
     * @constructs
     * @augments HeaderSet
     *
     * @param {object} options
     * @param {number} options.interval See {@link HeaderSetConsolidator#interval}
     * @param {number} options.timeToLive See {@link HeaderSetConsolidator#timeToLive}
     * @param {number} options.minTimestamp See {@link HeaderSetConsolidator#minTimestamp}
     * @param {number} options.maxTimestamp See {@link HeaderSetConsolidator#maxTimestamp}
     *
     * @classdesc
     * The HeaderSetConsolidator extends the functionality of the HeaderSet class
     * by allowing to filter and organize the Header instances added to it.
     *
     * There are two common use cases for this class:
     *
     * The first use case is in combination with a Connection. As live Header instances
     * are reported by their corresponding event they are aded to the HeaderSetConsolidator
     * instance using `addHeader` or `addHeaders` methods. The `startTimer` method
     * is used to start a background timer that fires a `headerSet` event every
     * time the given interval has passed.
     *
     * The second use case is in combination with Recorders. In that case no timer
     * has to be started because the data is not received in real time. As recorded HeaderSet
     * instances are played back they are can be handed over to the `processHeaderSet`
     * method. This method will fire a `headerSet` event every time the recorded data
     * belong to a different interval.
     *
     * @example
     *
     * // --- use case 1: live data ---
     * var connection = createConnection();
     *
     * // create a HeaderSetConsolidator that fires a headerSet event every minute
     * var hsc = new HeaderSetConsolidator({ interval: 1 * 60 * 1000 });
     *
     * // add an event handlers to the connection that adds incoming headers to the consolidator
     * var onHeader = function(header) {
     *     hsc.addHeader(header);
     * };
     *
     * connection.on('packet', onHeader);
     * connection.on('datagram', onHeader);
     * connection.on('telegram', onHeader);
     *
     * // add an event handler to the consolidator
     * hsc.on('headerSet', function(headerSet) {
     *     console.log(headerSet);
     * });
     *
     * // start the timer
     * hsc.startTimer();
     *
     *
     *
     * // --- use case 2: recorded data ---
     * var stream = getRecordedDataStream();
     *
     * var converter = new VBusRecordingConverter();
     *
     * // create a HeaderSetConsolidator that sieves incoming headers
     * var hsc = new HeaderSetConsolidator({ interval: 60 * 60 * 1000 });
     *
     * // add an event handler to the converter that processes incoming header sets in the consolidator
     * converter.on('headerSet', function(headerSet) {
     *     hsc.processHeaderSet(headerSet);
     * });
     *
     * // add an event handler to the consolidator
     * hsc.on('headerSet', function(headerSet) {
     *     console.log(headerSet);
     * });
     *
     * // start the conversion
     * stream.pipe(converter);
     */
    constructor: function(options) {
        HeaderSet.call(this, options);

        _.extend(this, _.pick(options, optionKeys));
    },

    /**
     * Starts a timer that processes live HeaderSets automatically.
     */
    startTimer: function() {
        this.stopTimer();

        this.lastIntervalTime = Date.now();

        this._handleInterval();
    },

    /**
     * Stops the timer that was started by `startTimer`.
     */
    stopTimer: function() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },

    /**
     * Process the given HeaderSet instance. The Header instances in it are
     * added to the HeaderSetConsolidator.
     *
     * @param {HeaderSet} headerSet The HeaderSet instance to process.
     */
    processHeaderSet: function(headerSet) {
        var _this = this;

        var now = headerSet.timestamp.getTime();

        this.addHeaders(headerSet.getHeaders());

        this._processHeaderSet(now);
    },

    _handleInterval: function() {
        var _this = this;

        var now = Date.now();

        this._processHeaderSet(now);

        var interval = 1000 - (now % 1000);
        this.timer = setTimeout(function() {
            _this._handleInterval();
        }, interval);
    },

    _processHeaderSet: function(now) {
        var include = true;

        if (this.minTimestamp) {
            if (now < this.minTimestamp) {
                include = false;
            }
        }

        if (this.maxTimestamp) {
            if (now > this.maxTimestamp) {
                include = false;
            }
        }

        if (this.interval > 0) {
            var lastInterval = Math.floor(this.lastIntervalTime / this.interval);
            var currentInterval = Math.floor(now / this.interval);
            var diff = currentInterval - lastInterval;

            if ((diff >= -1) && (diff <= 0)) {
                include = false;
            }
        }

        if (include) {
            if (this.timeToLive > 0) {
                this.removeHeadersOlderThan(now - this.timeToLive);
            }

            this.timestamp = new Date(now);

            this.emit('headerSet', this);

            this.lastIntervalTime = now;
        }
    },

});



module.exports = HeaderSetConsolidator;
