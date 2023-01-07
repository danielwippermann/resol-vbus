/*! resol-vbus | Copyright (c) 2023-present, Daniel Wippermann | MIT license */

/* istanbul ignore file */

const logger = {
    level: 4,

    log(level, message) {
        if (level <= logger.level) {
            console.log(...message);
        }
    },

    err(...message) {
        logger.log(3, message);
    },

    warning(...message) {
        logger.log(4, message);
    },

    debug(...message) {
        logger.log(7, message);
    },
};


module.exports = logger;
