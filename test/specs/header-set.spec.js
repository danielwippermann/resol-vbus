/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var Packet = require('./resol-vbus').Packet;
var HeaderSet = require('./resol-vbus').HeaderSet;



describe('HeaderSet', function() {

    it('should be a constructor function', function() {
        expect(HeaderSet).to.be.a('function');
        expect(HeaderSet.extend).to.be.a('function');
    });

    it('should have reasonable defaults', function() {
        var before = new Date();
        var headerSet = new HeaderSet();
        var after = new Date();

        expect(headerSet).to.be.an('object');
        expect(headerSet.timestamp).to.be.an.instanceOf(Date);
        expect(headerSet.timestamp.getTime()).to.be.within(before.getTime(), after.getTime());
    });

    it('should copy certain options', function() {
        var header1 = new Packet({
            channel: 1
        });

        var header2 = new Packet({
            channel: 2
        });

        var options = {
            timestamp: new Date(),
            headers: [ header1, header2 ]
        };

        var headerSet = new HeaderSet(options);

        expect(headerSet).to.be.an('object');
        expect(headerSet.timestamp).to.equal(options.timestamp);
    });

    it('should have a getId method', function() {
        var header1 = new Packet({
            channel: 1
        });

        var header2 = new Packet({
            channel: 2
        });

        var options = {
            timestamp: new Date(),
            headers: [ header1, header2 ]
        };

        var headerSet = new HeaderSet(options);

        expect(headerSet).to.be.an('object');
        expect(headerSet.getId).to.be.a('function');
        expect(headerSet.getId()).to.equal('01_0000_0000_10_0000,02_0000_0000_10_0000');
    });

    it('should have a getIdHash method', function() {
        var header1 = new Packet({
            channel: 1
        });

        var header2 = new Packet({
            channel: 2
        });

        var options = {
            timestamp: new Date(),
            headers: [ header1, header2 ]
        };

        var headerSet = new HeaderSet(options);

        expect(headerSet).to.be.an('object');
        expect(headerSet.getIdHash).to.be.a('function');
        expect(headerSet.getIdHash()).to.equal('5c9c71b01aca96a35c15cffd0ec382e8a1be99b3e42eeff57ecd7836aa7f1a24');
    });


});
