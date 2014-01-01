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



var HeaderSet = extend(EventEmitter, {

    timestamp: null,

    headerList: null,

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

        this.emit('addHeader', header);
    },

    addHeaders: function(headers) {
        var _this = this;

        _.forEach(headers, function(header) {
            _this.addHeader(header);
        });
    },

    _removeHeader: function(header) {
        var index = this._findIndex(header);
        if (index >= 0) {
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

    removeAllHeaders: function() {
        this._removeHeaders(this.headerList.slice(0));
    },

    removeHeadersOlderThan: function(timestamp) {
        var _this = this;

        var time = timestamp.getTime();

        var headers = [];
        _.forEach(this.headerList, function(header) {
            if (header.timestamp.getTime() < time) {
                headers.push(header);
            }
        });

        this._removeHeaders(headers);
    },

    getHeaderCount: function() {
        return this.headerList.length;
    },

    getHeaders: function() {
        return this.headerList.slice(0);
    },

    getSortedHeaders: function() {
        var _this = this;

        var sortedHeaders = this.headerList.slice(0).sort(function(left, right) {
            return left.compareTo(right);
        });

        return sortedHeaders;
    },

    getId: function() {
        var sortedHeaders = this.getSortedHeaders();

        var sortedIds = _.map(sortedHeaders, function(header) {
            return header.getId();
        });

        var id = sortedIds.join(',');

        return id;
    },

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
