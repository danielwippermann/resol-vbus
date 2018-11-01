/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const Q = require('q');


const _ = require('./lodash');



const utils = {

    /**
     * @see http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    generateGUID: function() {
        const s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        const guid = [
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

    cancelablePromise: function(callback, thisArg) {
        let cancelDeferred = Q.defer();
        const cancelPromise = cancelDeferred.promise;
        let isCanceled = false;

        const cancel = function(reason) {
            if (!isCanceled) {
                cancelPromise.then(function(result) {
                    result.cancel(reason);
                });

                isCanceled = true;
            }
        };

        const checkCanceled = function(result) {
            if (!isCanceled) {
                return result;
            } else {
                throw new Error('Canceled');
            }
        };

        const promise = utils.promise(function(resolve, reject, notify) {
            if (cancelDeferred) {
                cancelDeferred.resolve({ cancel: reject });

                cancelDeferred = null;
            }

            return Q.fcall(function() {
                return cancelPromise;
            }).then(function() {
                return callback.call(thisArg, resolve, reject, notify, checkCanceled);
            });
        });

        promise.cancel = cancel;

        return promise;
    },

    roundNumber: function(value, exp) {
        if ((value === undefined) || (exp === undefined) || (+exp === 0)) {
            return value;
        }

        value = +value;
        exp = +exp;

        if (_.isNaN(value) || (exp % 1 !== 0)) {
            return NaN;
        }

        let valueParts = value.toString().split('e');
        let baseExp = valueParts [1] ? +valueParts [1] : 0;

        value = Math.round(+(valueParts [0] + 'e' + (baseExp - exp)));

        valueParts = value.toString().split('e');
        baseExp = valueParts [1] ? +valueParts [1] : 0;

        value = +(valueParts [0] + 'e' + (baseExp + exp));

        return value;
    },

    deepFreezeObjectTree: function(root) {
        const freezingObjects = [];

        const deepFreezeObject = function(obj) {
            if (Object.isFrozen(obj)) {
                return obj;
            }

            if (freezingObjects.indexOf(obj) >= 0) {
                throw new Error('Circular reference while deep freezing');
            }

            freezingObjects.push(obj);

            const keys = Object.getOwnPropertyNames(obj);
            keys.forEach(function(key) {
                const value = obj [key];

                if ((typeof value === 'object') && (value !== null)) {
                    deepFreezeObject(value);
                }
            });

            freezingObjects.pop();

            return Object.freeze(obj);
        };

        return deepFreezeObject(root);
    },

};



const Promise = function(callback, thisArg) {
    let deferred = Q.defer();
    const promise = deferred.promise;

    const resolve = function(result) {
        if (deferred) {
            deferred.resolve(result);

            deferred = null;
        }
    };

    const reject = function(reason) {
        if (deferred) {
            deferred.reject(reason);

            deferred = null;
        }
    };

    const notify = function(value) {
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
};


Promise.resolve = function(value) {
    return new Promise(function(resolve) {
        resolve(value);
    });
};


Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
        reject(reason);
    });
};


utils.Promise = Promise;

// NOTE(daniel): Legacy naming
utils.promise = Promise;



module.exports = utils;
