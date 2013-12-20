/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Header = require('./resol-vbus').Header;
var TcpConnection = require('./resol-vbus').TcpConnection;

var connectionSpec = require('./connection.spec');



var rawDataPacket = new Buffer([
    'aa100021771000011135',
    '02032e02004a',
    '760104010003',
    '7b0078000507',
    '02013822041e',
    '170116010050',
    '460500000034',
    '01000000007e',
    '646400000037',
    '00000000007f',
    '00000000007f',
    '01000000007e',
    '0e0109000067',
    '06010a00016d',
    '68010a00000c',
    '0e0109000067',
    '010e01230448',
    '5d070c0f017f'
].join(''), 'hex');



describe('TcpConnection', function() {

    it('should be a constructor function', function() {
        expect(TcpConnection).to.be.a('function');
        expect(TcpConnection.extend).to.be.a('function');
    });

});
