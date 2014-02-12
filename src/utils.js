/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var Q = require('q');



var utils = {

    /**
     * @see http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    generateGUID: function() {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        var guid = [
            s4(),
            s4(),
            '-',
            s4(),
            '-',
            s4(),
            '-',
            s4(),
            '-',
            s4(),
            s4(),
            s4(),
        ].join('');

        return guid;
    },

    promise: function(callback, thisArg) {
        var deferred = Q.defer();
        var promise = deferred.promise;

        var resolve = function(result) {
            if (deferred) {
                    deferred.resolve(result);

                deferred = null;
            }
        };

        var reject = function(reason) {
            if (deferred) {
                deferred.reject(reason);

                deferred = null;
            }
        };

        var notify = function(value) {
            if (deferred) {
                deferred.notify(value);
            }
        };

        try {
            callback.call(thisArg, resolve, reject, notify);
        } catch (ex) {
            reject(ex);
        }

        return promise;
    },

};



module.exports = utils;
