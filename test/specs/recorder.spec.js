/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');
var moment = require('moment');


var vbus = require('./resol-vbus');

var Recorder = vbus.Recorder;



describe('Recorder', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(Recorder).to.be.a('function');
        });

        it('should have reasonable defaults', function() {
            var recorder = new Recorder();

            expect(recorder.id).to.be.a('string');
            expect(recorder.minTimestamp.toISOString()).to.equal('2001-01-01T00:00:00.000Z');
            expect(recorder.maxTimestamp.toISOString()).to.equal('2038-01-01T00:00:00.000Z');
            expect(recorder.interval).to.equal(0);
        });

        it('should copy selected options', function() {
            var options = {
                id: 'myId',
                minTimestamp: new Date(2013, 0),
                maxTimestamp: new Date(2014, 0),
                interval: 600,
                junk: 'JUNK',
            };

            var recorder = new Recorder(options);

            expect(recorder.id).to.equal(options.id);
            expect(recorder.minTimestamp.toISOString()).to.equal(options.minTimestamp.toISOString());
            expect(recorder.maxTimestamp.toISOString()).to.equal(options.maxTimestamp.toISOString());
            expect(recorder.interval).to.equal(options.interval);
            expect(recorder.junk).to.equal(undefined);
        });

    });

    describe('#playback', function() {

        it('should be a method', function() {
            expect(Recorder.prototype.playback).to.be.a('function');
        });

        it('should copy defaults from the recorder', function(done) {
            var options = {
                id: 'myId',
                minTimestamp: new Date(2013, 0),
                maxTimestamp: new Date(2014, 0),
                interval: 600,
            };

            var converter = new vbus.VBusRecordingConverter({
                objectMode: true,
            });

            var onConverterHeaderSet = sinon.spy();

            converter.on('headerSet', onConverterHeaderSet);

            var recorder = new Recorder(options);

            var demoHeaderSet = new vbus.HeaderSet({
                timestamp: new Date(2013, 5)
            });

            recorder._playback = sinon.spy(function(headerSetConsolidator) {
                headerSetConsolidator.processHeaderSet(demoHeaderSet);
            });

            recorder.playback(converter).done(function(ranges) {
                expect(recorder._playback.callCount).to.equal(1);

                var call = recorder._playback.getCall(0);

                expect(call.args [0]).to.be.an.instanceOf(vbus.HeaderSetConsolidator);
                expect(call.args [1].id).to.eql(options.id);
                expect(call.args [1].minTimestamp).to.eql(options.minTimestamp);
                expect(call.args [1].maxTimestamp).to.eql(options.maxTimestamp);
                expect(call.args [1].interval).to.eql(options.interval);
                expect(call.args [1].end).to.eql(true);

                expect(onConverterHeaderSet.callCount).to.equal(1);

                call = onConverterHeaderSet.getCall(0);

                expect(call.args [0].timestamp.toISOString()).to.equal(demoHeaderSet.timestamp.toISOString());

                done();
            });
        });

    });

    describe('#record', function() {

        it('should be a method', function() {
            expect(Recorder.prototype.record).a('function');
        });

        promiseIt('should copy defaults from the recorder', function() {
            var options = {
                id: 'myId',
                minTimestamp: new Date(2013, 0),
                maxTimestamp: new Date(2014, 0),
                interval: 600,
            };

            var converter = new vbus.Converter({
                objectMode: true,
            });

            var recorder = new Recorder(options);

            var demoHeaderSet = new vbus.HeaderSet({
                timestamp: new Date(2013, 5)
            });

            var onHeaderSet = sinon.spy();

            recorder._startRecording = sinon.spy(function(hsc) {
                hsc.on('headerSet', onHeaderSet);

                converter.convertHeaderSet(demoHeaderSet);
                converter.finish();
            });

            recorder._endRecording = sinon.spy(function(hsc) {
                hsc.removeListener('headerSet', onHeaderSet);
            });

            return recorder.record(converter, options).then(function() {
                expect(recorder._startRecording.callCount).equal(1);
                expect(recorder._endRecording.callCount).equal(1);

                var hsc = recorder._startRecording.firstCall.args [0];
                var recordingJob = recorder._startRecording.firstCall.args [1];

                expect(recorder._endRecording.firstCall.args [0]).equal(hsc);
                expect(recorder._endRecording.firstCall.args [1]).equal(recordingJob);

                expect(hsc).to.be.an.instanceOf(vbus.HeaderSetConsolidator);
                expect(recordingJob.id).to.eql(options.id);
                expect(recordingJob.minTimestamp).to.eql(options.minTimestamp);
                expect(recordingJob.maxTimestamp).to.eql(options.maxTimestamp);
                expect(recordingJob.interval).to.eql(options.interval);
            });
        });

    });

    describe('#synchronizeTo', function() {

        it('should be a method', function() {
            expect(Recorder.prototype.synchronizeTo).to.be.a('function');
        });

        it('should copy defaults from the recorder', function(done) {
            var options = {
                id: 'myId',
                minTimestamp: new Date(2013, 0),
                maxTimestamp: new Date(2014, 0),
                interval: 600,
                timeToLive: 3600,
            };

            var recorder = new Recorder(options);

            recorder._getCurrentSyncState = sinon.spy(function() {
                return {};
            });

            recorder._getSyncJob = sinon.spy(recorder._getSyncJob);

            recorder._recordSyncJob = sinon.spy();

            recorder.synchronizeTo(recorder).done(function(ranges) {
                expect(recorder._getCurrentSyncState.callCount).to.equal(1);

                var call = recorder._getCurrentSyncState.getCall(0);

                expect(call.args [0].id).to.eql(options.id);
                expect(call.args [0].minTimestamp).to.eql(options.minTimestamp);
                expect(call.args [0].maxTimestamp).to.eql(options.maxTimestamp);
                expect(call.args [0].interval).to.eql(options.interval);
                expect(call.args [0].timeToLive).to.eql(options.timeToLive);

                expect(recorder._getSyncJob.callCount).to.equal(1);

                call = recorder._getSyncJob.getCall(0);

                var syncState = call.args [0];
                expect(syncState.sourceSyncState).to.be.an('object');
                expect(syncState.sourceSyncState.Recorder).to.be.an('object');
                expect(syncState.destinationSyncState).to.be.an('object');

                expect(call.args [1].id).to.eql(options.id);
                expect(call.args [1].minTimestamp).to.eql(options.minTimestamp);
                expect(call.args [1].maxTimestamp).to.eql(options.maxTimestamp);
                expect(call.args [1].interval).to.eql(options.interval);

                done();
            });
        });

    });

    describe('#_getSyncJob', function() {

        it('should be a method', function() {
            expect(Recorder.prototype._getSyncJob).to.be.a('function');
        });

        xit('should work correctly for empty oldSyncState', function(done) {
            var recorder = new Recorder();

            var oldSyncState = null;

            var options = {
                minTimestamp: new Date(2008, 0),
                maxTimestamp: new Date(2036, 0),
            };

            var promise = recorder._getSyncJob(oldSyncState, options);

            expect(promise).to.be.an('object');
            expect(promise.then).to.be.a('function');

            promise.then(function(syncJob) {
                done();
            });
        });

    });

    describe('.performRangeSetOperation', function() {

        var rangeOffset = moment().startOf('day');

        var createRange = function(hoursA, minutesA, hoursB, minutesB, addMilliA, subtractMilliB) {
            return {
                minTimestamp: moment(rangeOffset).add({ hours: hoursA, minutes: minutesA, milliseconds: (addMilliA ? 1 : 0) }).toDate(),
                maxTimestamp: moment(rangeOffset).add({ hours: hoursB, minutes: minutesB, milliseconds: (subtractMilliB ? -1 : 0) }).toDate(),
            };
        };

        it('should be a function', function() {
            expect(Recorder.performRangeSetOperation).to.be.a('function');
        });

        it('should work correctly with union of empty ranges', function() {
            var rangesA = [];

            var rangesB = [];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql([]);
        });

        it('should work correctly with union of empty A ranges', function() {
            var rangesA = [];

            var rangesB = [
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql(rangesB);
        });

        it('should work correctly with union of empty B ranges', function() {
            var rangesA = [
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
            ];

            var rangesB = [];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql(rangesA);
        });

        it('should work correctly with union of equal ranges', function() {
            var rangesA = [
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
            ];

            var rangesB = _.clone(rangesA);

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql(rangesA);
            expect(newRanges).to.eql(rangesB);
        });

        it('should work correctly with union of non-overlapping ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(10, 34, 12, 26),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql([
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(10, 34, 12, 26),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ]);
        });

        it('should work correctly with union of partially overlapping ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(10, 0, 11, 0),
                createRange(12, 0, 13, 0),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql([
                createRange(4, 30, 6, 30),
                createRange(8, 30, 11, 0),
                createRange(12, 0, 14, 30),
                createRange(16, 30, 18, 30),
            ]);
        });

        it('should work correctly with union of adjacent ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(10, 32, 12, 28),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql([
                createRange(4, 30, 6, 30),
                createRange(8, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ]);
        });

        it('should work correctly with union of overlapping multiple ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(7, 32, 15, 28),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'union');

            expect(newRanges).to.eql([
                createRange(4, 30, 6, 30),
                createRange(7, 32, 15, 28),
                createRange(16, 30, 18, 30),
            ]);
        });

        it('should work correctly with difference of empty ranges', function() {
            var rangesA = [
            ];

            var rangesB = [
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'difference');

            expect(newRanges).to.eql([
            ]);
        });

        it('should work correctly with difference of empty A ranges', function() {
            var rangesA = [
            ];

            var rangesB = [
                createRange(7, 32, 15, 28),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'difference');

            expect(newRanges).to.eql([
            ]);
        });

        it('should work correctly with difference of empty B ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'difference');

            expect(newRanges).to.eql(rangesA);
        });

        it('should work correctly with difference of non-overlapping ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(0, 0, 4, 0),
                createRange(11, 0, 12, 0),
                createRange(15, 0, 16, 0),
                createRange(19, 0, 24, 0),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'difference');

            expect(newRanges).to.eql(rangesA);
        });

        it('should work correctly with difference of partially overlapping ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(0, 0, 5, 0),
                createRange(6, 0, 7, 0),
                createRange(14, 0, 15, 0),
                createRange(16, 0, 17, 0),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'difference');

            expect(newRanges).to.eql([
                createRange(5, 0, 6, 0, true, true),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 0, false, true),
                createRange(17, 0, 18, 30, true, false),
            ]);
        });

        it('should work correctly with difference of overlapping multiple ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(0, 0, 13, 0),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'difference');

            expect(newRanges).to.eql([
                createRange(13, 0, 14, 30, true, false),
                createRange(16, 30, 18, 30),
            ]);
        });

        it('should work correctly with difference of large overlapping ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(0, 0, 24, 0),
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'difference');

            expect(newRanges).to.eql([
            ]);
        });

        it('should work correctly with intersection of empty ranges', function() {
            var rangesA = [
            ];

            var rangesB = [
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'intersection');

            expect(newRanges).to.eql([
            ]);
        });

        it('should work correctly with intersection of overlapping multiple ranges', function() {
            var rangesA = [
                createRange(4, 30, 6, 30),
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
                createRange(16, 30, 18, 30),
            ];

            var rangesB = [
                createRange(7, 0, 16, 0)
            ];

            var newRanges = Recorder.performRangeSetOperation(rangesA, rangesB, 120000, 'intersection');

            expect(newRanges).to.eql([
                createRange(8, 30, 10, 32),
                createRange(12, 30, 14, 32),
            ]);

            newRanges = Recorder.performRangeSetOperation(rangesB, rangesA, 120000, 'intersection');

            expect(newRanges).to.eql([
                createRange(8, 30, 10, 30),
                createRange(12, 30, 14, 30),
            ]);
        });

    });

});
