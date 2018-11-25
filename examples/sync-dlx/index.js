/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    DLxRecorder,
    FileSystemRecorder,
    I18N,
} = require('../resol-vbus');


const config = require('./config.js');



const i18n = new I18N('en');


const main = async () => {
    const dlxRecorder = new DLxRecorder(config.sourceOptions);

    // const interval = 3600000;
    const interval = 300000;

    const maxTimestamp = i18n.moment().startOf('day').add({ hours: 0, minutes: 59 });
    const minTimestamp = i18n.moment(maxTimestamp).startOf('day').subtract({ days: 2, hours: 1, minutes: 0 });

    const fileRecorder = new FileSystemRecorder(config.destinationOptions);

    // console.log(minTimestamp.toString(), maxTimestamp.toString());

    await dlxRecorder.synchronizeTo(fileRecorder, {
        minTimestamp: minTimestamp.toDate(),
        // maxTimestamp: maxTimestamp.toDate(),
        interval,
    });

    // await dlxRecorder.synchronizeTo(fileRecorder, {
    //     minTimestamp: i18n.moment(minTimestamp).subtract({ days: 7 }).toDate(),
    //     interval: interval,
    // });
};



if (require.main === module) {
    main().then(() => {
        console.log('DONE');
    }, err => {
        console.log(err);
    });
} else {
    module.exports = main;
}
