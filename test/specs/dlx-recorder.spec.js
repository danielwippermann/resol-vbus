/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var fs = require('fs');
var path = require('path');
var Duplex = require('stream').Duplex;


var Q = require('q');


var vbus = require('./resol-vbus');

var TestRecorder = require('./test-recorder');
var testUtils = require('./test-utils');



var DLxRecorder = vbus.DLxRecorder;



var createRequestStub = function(recorder, response, data) {
    var stub = sinon.spy(function(url, options) {
        var stream = new Duplex();

        stream._read = function() {
            // nop;
        };

        process.nextTick(function() {
            stream.emit('response', response);
            if (data) {
                stream.push(data);
            }
            stream.push(null);
        });

        return stream;
    });

    recorder._request = stub;

    return stub;
};



var recordingFileListHtml = new Buffer([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
    '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">',
    '<head>',
    '<title>Index of /log/</title>',
    '<style type="text/css">',
    'a, a:active {text-decoration: none; color: blue;}',
    'a:visited {color: #48468F;}',
    'a:hover, a:focus {text-decoration: underline; color: red;}',
    'body {background-color: #F5F5F5;}',
    'h2 {margin-bottom: 12px;}',
    'table {margin-left: 12px;}',
    'th, td { font: 90% monospace; text-align: left;}',
    'th { font-weight: bold; padding-right: 14px; padding-bottom: 3px;}',
    'td {padding-right: 14px;}',
    'td.s, th.s {text-align: right;}',
    'div.list { background-color: white; border-top: 1px solid #646464; border-bottom: 1px solid #646464; padding-top: 10px; padding-bottom: 14px;}',
    'div.foot { font: 90% monospace; color: #787878; padding-top: 4px;}',
    '</style>',
    '</head>',
    '<body>',
    '<h2>Index of /log/</h2>',
    '<div class="list">',
    '<table summary="Directory Listing" cellpadding="0" cellspacing="0">',
    '<thead><tr><th class="n">Name</th><th class="m">Last Modified</th><th class="s">Size</th><th class="t">Type</th></tr></thead>',
    '<tbody>',
    '<tr><td class="n"><a href="../">Parent Directory</a>/</td><td class="m">&nbsp;</td><td class="s">- &nbsp;</td><td class="t">Directory</td></tr>',
    '<tr><td class="n"><a href="20140210_packets.vbus">20140210_packets.vbus</a></td><td class="m">2014-Feb-10 23:55:02</td><td class="s">303.1K</td><td class="t">application/octet-stream</td></tr>',
    '<tr><td class="n"><a href="20140211_packets.vbus">20140211_packets.vbus</a></td><td class="m">2014-Feb-11 23:55:02</td><td class="s">303.1K</td><td class="t">application/octet-stream</td></tr>',
    '<tr><td class="n"><a href="20140212_packets.vbus">20140212_packets.vbus</a></td><td class="m">2014-Feb-12 23:55:02</td><td class="s">303.1K</td><td class="t">application/octet-stream</td></tr>',
    '<tr><td class="n"><a href="20140213_packets.vbus">20140213_packets.vbus</a></td><td class="m">2014-Feb-13 23:55:02</td><td class="s">303.1K</td><td class="t">application/octet-stream</td></tr>',
    '<tr><td class="n"><a href="20140214_packets.vbus">20140214_packets.vbus</a></td><td class="m">2014-Feb-14 23:55:02</td><td class="s">303.1K</td><td class="t">application/octet-stream</td></tr>',
    '<tr><td class="n"><a href="20140215_packets.vbus">20140215_packets.vbus</a></td><td class="m">2014-Feb-15 02:20:02</td><td class="s">30.5K</td><td class="t">application/octet-stream</td></tr>',
    '</tbody>',
    '</table>',
    '</div>',
    '<div class="foot">lighttpd/1.4.28</div>',
    '</body>',
    '</html>',
].join('\n'));



describe('DLxRecorder', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(DLxRecorder)
                .to.be.a('function')
                .that.has.a.property('extend')
                    .that.is.a('function');
        });

        it('should have reasonable defaults', function() {
            var recorder = new DLxRecorder();

            expect(recorder)
                .to.have.a.property('id')
                    .that.is.a('string');
            expect(recorder)
                .to.have.a.property('minTimestamp')
                    .that.is.instanceOf(Date);
            expect(recorder.minTimestamp.toISOString())
                .to.equal('2001-01-01T00:00:00.000Z');
            expect(recorder)
                .to.have.a.property('maxTimestamp')
                    .that.is.instanceOf(Date);
            expect(recorder.maxTimestamp.toISOString())
                .to.equal('2038-01-01T00:00:00.000Z');
            expect(recorder)
                .to.have.a.property('urlPrefix')
                    .that.equals(null);
            expect(recorder)
                .to.have.a.property('username')
                    .that.equals('admin');
            expect(recorder)
                .to.have.a.property('password')
                    .that.equals('admin');
        });

        it('should copy selected options', function() {
            var options = {
                id: 'ID',
                minTimestamp: new Date(Date.UTC(2013, 0, 1)),
                maxTimestamp: new Date(Date.UTC(2014, 0, 1)),
                urlPrefix: 'URLPREFIX',
                username: 'USERNAME',
                password: 'PASSWORD',
                junk: 'JUNK',
            };

            var recorder = new DLxRecorder(options);

            expect(recorder)
                .to.have.a.property('id')
                    .that.is.equal(options.id);
            expect(recorder)
                .to.have.a.property('minTimestamp')
                    .that.is.equal(options.minTimestamp);
            expect(recorder)
                .to.have.a.property('maxTimestamp')
                    .that.is.equal(options.maxTimestamp);
            expect(recorder)
                .to.have.a.property('urlPrefix')
                    .that.equals(options.urlPrefix);
            expect(recorder)
                .to.have.a.property('username')
                    .that.equals(options.username);
            expect(recorder)
                .to.have.a.property('password')
                    .that.equals(options.password);
            expect(recorder)
                .to.not.have.a.property('junk');
        });

    });

    describe('#getLazyRecordingRanges', function() {

        it('should be a method', function() {
            expect(DLxRecorder.prototype)
                .to.have.a.property('getLazyRecordingRanges')
                    .that.is.a('function');
        });

        it('should work correctly', function(done) {
            var recorder = new DLxRecorder({
                urlPrefix: 'URLPREFIX',
                username: 'USERNAME',
                password: 'PASSWORD',
            });

            var response = {};

            var data = recordingFileListHtml;

            var stub = createRequestStub(recorder, response, data);

            testUtils.performAsyncTest(done, function() {
                var promise = recorder.getLazyRecordingRanges();

                return testUtils.expectPromise(promise).then(function(result) {
                    expect(stub)
                        .to.have.a.property('callCount')
                            .that.is.equal(1);

                    expect(stub.firstCall.args [0]).to.equal('URLPREFIX/log/');
                    expect(stub.firstCall.args [1]).to.eql({
                        auth: {
                            username: 'USERNAME',
                            password: 'PASSWORD',
                        },
                    });

                    expect(result)
                        .to.be.an('array')
                            .that.has.lengthOf(1);
                    expect(result [0])
                        .to.have.a.property('minTimestamp')
                            .that.is.instanceOf(Date);
                    expect(result [0].minTimestamp.toISOString()).is.equal('2014-02-10T00:00:00.000Z');
                    expect(result [0])
                        .to.have.a.property('maxTimestamp')
                            .that.is.instanceOf(Date);
                    expect(result [0].maxTimestamp.toISOString()).is.equal('2014-02-16T00:00:00.000Z');
                });
            });
        });

    });

    describe('#getRecordingFilenames', function() {

        it('should be a method', function() {
            expect(DLxRecorder.prototype)
                .to.have.a.property('getRecordingFilenames')
                    .that.is.a('function');
        });

        it('should work correctly', function(done) {
            var recorder = new DLxRecorder({
                urlPrefix: 'URLPREFIX',
                username: 'USERNAME',
                password: 'PASSWORD',
            });

            var response = {};

            var data = recordingFileListHtml;

            var stub = createRequestStub(recorder, response, data);

            testUtils.performAsyncTest(done, function() {
                var promise = recorder.getRecordingFilenames();

                return testUtils.expectPromise(promise).then(function(result) {
                    expect(stub)
                        .to.have.a.property('callCount')
                            .that.is.equal(1);

                    expect(stub.firstCall.args [0]).to.equal('URLPREFIX/log/');
                    expect(stub.firstCall.args [1]).to.eql({
                        auth: {
                            username: 'USERNAME',
                            password: 'PASSWORD',
                        },
                    });

                    expect(result)
                        .to.be.an('array')
                            .that.has.lengthOf(6);
                    expect(result).to.eql([
                        '/log/20140210_packets.vbus',
                        '/log/20140211_packets.vbus',
                        '/log/20140212_packets.vbus',
                        '/log/20140213_packets.vbus',
                        '/log/20140214_packets.vbus',
                        '/log/20140215_packets.vbus',
                    ]);
                });
            });
        });

    });

    describe('#getRecordingInfo', function() {

        it('should be a method', function() {
            expect(DLxRecorder.prototype)
                .to.have.a.property('getRecordingInfo')
                    .that.is.a('function');
        });

        it('should work correctly', function(done) {
            var recorder = new DLxRecorder({
                urlPrefix: 'URLPREFIX',
                username: 'USERNAME',
                password: 'PASSWORD',
            });

            var response = {
                headers: {
                    'content-length': '1234',
                    etag: 'ETAG',
                },
            };

            var data = null;

            var stub = createRequestStub(recorder, response, data);

            var filename = '/FILENAME';

            testUtils.performAsyncTest(done, function() {
                var promise = recorder.getRecordingInfo(filename);

                return testUtils.expectPromise(promise).then(function(result) {
                    expect(stub)
                        .to.have.a.property('callCount')
                            .that.is.equal(1);

                    expect(stub.firstCall.args [0]).to.equal('URLPREFIX/FILENAME');
                    expect(stub.firstCall.args [1]).to.eql({
                        method: 'HEAD',
                        auth: {
                            username: 'USERNAME',
                            password: 'PASSWORD',
                        },
                    });

                    expect(result)
                        .to.have.a.property('size')
                            .that.is.equal(1234);
                    expect(result)
                        .to.have.a.property('etag')
                            .that.is.equal('ETAG');
                });
            });
        });
    });

    describe('#downloadToStream', function() {

        it('should be a method', function() {
            expect(DLxRecorder.prototype)
                .to.have.a.property('downloadToStream')
                    .that.is.a('function');
        });

        it('should work correctly', function(done) {
            var recorder = new DLxRecorder();

            var response = null;

            var data = new Buffer('11223344556677889900', 'hex');

            var stub = createRequestStub(recorder, response, data);

            var urlString = 'URLPREFIX/FILENAME';

            var urlOptions = {};

            var stream = new Duplex();

            stream._write = sinon.spy(function(chunk, enc, callback) {
                callback();
            });

            testUtils.performAsyncTest(done, function() {
                var promise = recorder.downloadToStream(urlString, urlOptions, stream);

                return testUtils.expectPromise(promise).then(function() {
                    expect(stub.callCount).to.equal(1);
                    expect(stub.firstCall.args [0]).to.equal(urlString);
                    expect(stub.firstCall.args [1]).to.equal(urlOptions);

                    expect(stream._write.callCount).to.equal(1);

                    var chunk = stream._write.firstCall.args [0];
                    testUtils.expectToBeABuffer(chunk);
                    expect(chunk.toString('hex')).equal(data.toString('hex'));
                });
            });
        });

    });

    describe('synchronization source', function() {

        var fixturesPath = path.join(__dirname, '../fixtures/dlx-recorder-1');

        promiseIt('should work correctly', function() {
            this.timeout(testUtils.adaptTimeout(3000));

            var options = {
                id: 'DLx',
                interval: 300000,
                urlPrefix: '',
            };

            var sourceRecorder = new DLxRecorder(options);

            sourceRecorder._request = sinon.spy(function(url, options) {
                var stream = new Duplex();

                stream._read = function() {
                    // nop
                };

                stream._write = function(chunk, encoding, callback) {
                    this.push(chunk, encoding);
                    callback();
                };

                stream.once('finish', function() {
                    stream.push(null);
                });

                process.nextTick(function() {
                    var response, bodyStream, bodyData;
                    if (url === '/log/') {
                        bodyStream = fs.createReadStream(path.join(fixturesPath, 'index.html'));
                    } else if (url === '/log/20140214_packets.vbus') {
                        bodyStream = fs.createReadStream(path.join(fixturesPath, '20140214_packets.vbus'));
                    } else if (url === '/log/20140215_packets.vbus') {
                        bodyStream = fs.createReadStream(path.join(fixturesPath, '20140215_packets.vbus'));
                    } else if (url === '/log/20140216_packets.vbus') {
                        bodyStream = fs.createReadStream(path.join(fixturesPath, '20140216_packets.vbus'));
                    } else {
                        global.console.log(url);
                    }

                    stream.emit('response', response);
                    if (bodyStream) {
                        bodyStream.pipe(stream);
                    } else {
                        if (bodyData) {
                            stream.push(bodyData);
                        }
                        stream.push(null);
                    }
                });

                return stream;
            });


            var targetRecorder = new TestRecorder({
                id: 'Test',
                interval: 300000,
            });

            return Q.fcall(function() {
                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(function(ranges) {
                expect(ranges).a('array').lengthOf(1);
                expect(ranges [0]).property('minTimestamp').instanceOf(Date);
                expect(ranges [0].minTimestamp.toISOString()).equal('2014-02-14T00:00:00.983Z');
                expect(ranges [0]).property('maxTimestamp').instanceOf(Date);
                expect(ranges [0].maxTimestamp.toISOString()).equal('2014-02-16T23:55:00.805Z');

                return sourceRecorder.synchronizeTo(targetRecorder);
            }).then(function(ranges) {
                expect(ranges).a('array').lengthOf(0);

            });
        });

    });

});
