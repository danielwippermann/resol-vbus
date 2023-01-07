/*! resol-vbus | Copyright (c) 2023-present, Daniel Wippermann | MIT license */

/*istanbul ignore file */

const config = {

    /**
     * The name of the `Connection` subclass to use for connecting to the VBus.
     * @type {String}
     */
    connectionClassName: 'TcpConnection',

    /**
     * The options passed to the constructor of the `Connection` subclass.
     * @type {Object}
     */
    connectionOptions: {
        /**
         * The host name / IP address of the VBus/LAN or Datalogger device.
         * @type {String}
         */
        host: '192.168.180.208',

        /**
         * The password for the VBus/LAN or Datalogger device.
         * @type {String}
         */
        password: 'vbus',
    },

};


module.exports = config;
