/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var path = require('path');


var _ = require('lodash');
var moment = require('moment');
var Q = require('q');


var vbus = require('../../src/index');


var config = require('../config.js');



var main = function() {
    var sourceOptions = _.defaults({}, config.syncDLxSourceOptions, {
        id: 'dlx-source',
        urlPrefix: 'http://my-dl2.local/',
        username: 'admin',
        password: 'admin',
    });

    var dlxRecorder = new vbus.DLxRecorder(sourceOptions);

    // var interval = 3600000;
    var interval = 300000;

    var maxTimestamp = moment().startOf('day').add({ hours: 0, minutes: 59 });
    var minTimestamp = moment(maxTimestamp).startOf('day').subtract({ days: 2, hours: 1, minutes: 0 });

    var fileRecorder = new vbus.FileSystemRecorder({
        id: 'fs-destination',
        path: path.resolve(__dirname, 'cache'),
    });

    // console.log(minTimestamp.toString(), maxTimestamp.toString());

    Q.try(function() {
        return dlxRecorder.synchronizeTo(fileRecorder, {
            minTimestamp: minTimestamp.toDate(),
            // maxTimestamp: maxTimestamp.toDate(),
            interval: interval,
        });
    // }).then(function() {
    //     return dlxRecorder.synchronizeTo(fileRecorder, {
    //         minTimestamp: moment(minTimestamp).subtract({ days: 7 }).toDate(),
    //         interval: interval,
    //     });
    }).done(function() {
        console.log('DONE');
    });

};



if (require.main === module) {
    main();
} else {
    module.exports = main;
}
