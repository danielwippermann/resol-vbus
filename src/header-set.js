/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var crypto = require('crypto');
var EventEmitter = require('events').EventEmitter;


var _ = require('lodash');


var extend = require('./extend');



var idHashes = {};



var optionKeys = [
    'timestamp',
];



var HeaderSet = extend(EventEmitter, /** @lends HeaderSet# */ {

    /**
     * Timestamp of the youngest Header instance added to this set.
     * @type {Date}
     */
    timestamp: null,

    /**
     * Array of Header instances in this set.
     * @type {Header[]}
     */
    headerList: null,

    /**
     * Creates a new header set instance and optionally initializes its members with the given values.
     *
     * @constructs
     * @augments EventEmitter
     * @param {object} options Initialization values for this instance's members
     * @param {Date} options.timestamp {@link HeaderSet#timestamp}
     * @param {Header[]} options.headers Array of Headers to add to this instance
     */
    constructor: function(options) {
        EventEmitter.call(this);

        this.headerList = [];

        _.extend(this, _.pick(options, optionKeys));

        if (!this.timestamp) {
            this.timestamp = new Date();
        }

        if (_.has(options, 'headers')) {
            this.addHeaders(options.headers);
        }
    },

    _findIndex: function(header) {
        return _.findIndex(this.headerList, function(refHeader) {
            return (refHeader.compareTo(header) === 0);
        });
    },

    /**
     * Adds a Header instance to this set, replacing a previously added Header of same kind.
     *
     * @param {Header} header The Header instance to add to this set.
     */
    addHeader: function(header) {
        var index = this._findIndex(header);
        if (index >= 0) {
            this.headerList [index] = header;
        } else {
            this.headerList.push(header);
        }

        if (this.timestamp.getTime() < header.timestamp.getTime()) {
            this.timestamp = header.timestamp;
        }

        /**
         * This event is fired whenever a Header instance is added to this set.
         *
         * @event HeaderSet#addHeader
         * @type {Header}
         */
        this.emit('addHeader', header);
    },

    /**
     * Adds a list of Header instances to this set, replacing previously added Headers of same kind.
     *
     * @param {Header[]} headers The list of Header instances to add.
     */
    addHeaders: function(headers) {
        var _this = this;

        _.forEach(headers, function(header) {
            _this.addHeader(header);
        });
    },

    _removeHeader: function(header) {
        var index = this._findIndex(header);
        if (index >= 0) {
            /**
             * This event is fired whenever a Header is removed from this set.
             *
             * @event HeaderSet#removeHeader
             * @type {Header}
             */
            this.emit('removeHeader', this.headerList [index]);

            this.headerList.splice(index, 1);
        }
    },

    _removeHeaders: function(headers) {
        var _this = this;

        _.forEach(headers, function(header) {
            _this._removeHeader(header);
        });
    },

    /**
     * Removes all Header instances from this set.
     */
    removeAllHeaders: function() {
        this._removeHeaders(this.headerList.slice(0));
    },

    /**
     * Removes all Header instances from this set which are older than the given timestamp.
     *
     * @param {number|Date} timestamp Timestamp to compare Header instances against.
     */
    removeHeadersOlderThan: function(timestamp) {
        var _this = this;

        var time;
        if (typeof timestamp === 'number') {
            time = timestamp;
        } else {
            time = timestamp.getTime();
        }

        var headers = [];
        _.forEach(this.headerList, function(header) {
            if (header.timestamp.getTime() < time) {
                headers.push(header);
            }
        });

        this._removeHeaders(headers);
    },

    /**
     * Returns the count of Header instances currently stored in this set.
     *
     * @returns {number} Number of Header instances in this set.
     */
    getHeaderCount: function() {
        return this.headerList.length;
    },

    /**
     * Returns an unsorted list of Header instances stored in this set.
     *
     * @returns {Header[]} List of headers stored in this set.
     */
    getHeaders: function() {
        return this.headerList.slice(0);
    },

    /**
     * Returns a sorted list of Header instances stored in this set.
     *
     * @returns {Header[]} List of headers stored in this set.
     */
    getSortedHeaders: function() {
        var _this = this;

        var sortedHeaders = this.headerList.slice(0).sort(function(left, right) {
            return left.compareTo(right);
        });

        return sortedHeaders;
    },

    /**
     * Returns an ID composed of the IDs of all headers stored in this set.
     *
     * @returns {string} ID of this HeaderSet.
     */
    getId: function() {
        var sortedHeaders = this.getSortedHeaders();

        var sortedIds = _.map(sortedHeaders, function(header) {
            return header.getId();
        });

        var id = sortedIds.join(',');

        return id;
    },

    /**
     * Returns an ID hash for this HeaderSet instance.
     *
     * @returns {string} ID hash for this HeaderSet
     */
    getIdHash: function() {
        var id = this.getId();

        if (!_.has(idHashes, id)) {
            var shasum = crypto.createHash('sha256');

            shasum.update(id);

            idHashes [id] = shasum.digest('hex');
        }

        return idHashes [id];
    },

});



module.exports = HeaderSet;
