// const _ = require('lodash');


// function ProxyHolder() {
//     // nop
// }

// const knownProps = [];

// ProxyHolder.prototype = new Proxy(_, {

//     get(target, prop, receiver) {
//         if (knownProps.indexOf(prop) < 0) {
//             global.console.log(`_.${prop}`);
//             knownProps.push(prop);
//             global.console.log(knownProps);
//         }
//         return _ [prop];
//     }

// });

// module.exports = new ProxyHolder();


// function wrapMethod(methodName) {
//     module.exports [methodName] = function() {
//         return _ [methodName].apply(_, arguments);
//     };
// }


// wrapMethod('clone');
// wrapMethod('cloneDeep');
// wrapMethod('defaults');
// wrapMethod('extend');
// wrapMethod('filter');
// wrapMethod('find');
// wrapMethod('findIndex');
// wrapMethod('findKey');
// wrapMethod('forEach');
// wrapMethod('forEachRight');
// wrapMethod('has');
// wrapMethod('isArray');
// wrapMethod('isFunction');
// wrapMethod('isNaN');
// wrapMethod('isNumber');
// wrapMethod('isObject');
// wrapMethod('isString');
// wrapMethod('keys');
// wrapMethod('map');
// wrapMethod('pick');
// wrapMethod('reduce');
// wrapMethod('toArray');
// wrapMethod('uniq');


module.exports = require('lodash');
