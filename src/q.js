const Q = function(result) {
    return Promise.resolve(result);
};


Q.fcall = function(fn) {
    return new Promise(resolve => resolve(fn()));
};


Q.defer = function() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
};



module.exports = Q;
