/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var Packet = require('./resol-vbus').Packet;
var HeaderSet = require('./resol-vbus').HeaderSet;



describe('HeaderSet', function() {

    describe('constructor', function() {

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
            expect(headerSet.headerList).to.eql(options.headers);
        });

    });

    describe('#addHeader', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.addHeader).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var header3 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet();

            headerSet.addHeader(header1);

            expect(headerSet.headerList).to.eql([ header1 ]);

            headerSet.addHeader(header2);

            expect(headerSet.headerList).to.eql([ header1, header2 ]);

            headerSet.addHeader(header3);

            expect(headerSet.headerList).to.eql([ header1, header3 ]);
        });

    });

    describe('#addHeaders', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.addHeaders).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var header3 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet();

            headerSet.addHeaders([ header1, header2, header3 ]);

            expect(headerSet.headerList).to.eql([ header1, header3 ]);
        });

    });

    describe('#removeAllHeaders', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.removeAllHeaders).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet({
                headers: [ header1, header2 ],
            });

            headerSet.removeAllHeaders();

            expect(headerSet.headerList).to.eql([]);
        });

    });

    describe('#removeHeadersOlderThan', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.removeHeadersOlderThan).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                timestamp: new Date(1388089665000),
                channel: 1
            });

            var header2 = new Packet({
                timestamp: new Date(1388089666000),
                channel: 2
            });

            var headerSet = new HeaderSet({
                headers: [ header1, header2 ],
            });

            headerSet.removeHeadersOlderThan(new Date(1388089665500));

            expect(headerSet.headerList).to.eql([ header2 ]);
        });

    });

    describe('#getHeaderCount', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.getHeaderCount).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var header3 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet({
                headers: [ header1, header2, header3 ]
            });

            expect(headerSet.getHeaderCount()).to.eql(2);
        });

    });

    describe('#getHeaders', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.getHeaders).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            var headers = headerSet.getHeaders();

            expect(headers).to.be.an('array');
            expect(headers.length).to.equal(2);
            expect(headers.indexOf(header1) >= 0);
            expect(headers.indexOf(header2) >= 0);
        });

    });

    describe('#getSortedHeaders', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.getSortedHeaders).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            expect(headerSet.getSortedHeaders()).to.eql([ header1, header2 ]);
        });

    });

    describe('#getId', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.getId).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            var id = headerSet.getId();

            expect(id).to.equal('01_0000_0000_10_0000,02_0000_0000_10_0000');
        });

    });

    describe('#getIdHash', function() {

        it('should be a method', function() {
            expect(HeaderSet.prototype.getIdHash).to.be.a('function');
        });

        it('should work correctly', function() {
            var header1 = new Packet({
                channel: 1
            });

            var header2 = new Packet({
                channel: 2
            });

            var headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            var id = headerSet.getIdHash();

            expect(id).to.equal('5c9c71b01aca96a35c15cffd0ec382e8a1be99b3e42eeff57ecd7836aa7f1a24');
        });

    });

});
