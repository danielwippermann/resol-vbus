/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const moment = require('moment');


const {
    HeaderSet,
    HeaderSetConsolidator,
    Packet,
} = require('./resol-vbus');


const {
    expect,
    expectElapsedTimeToBeWithin,
    expectOwnPropertyNamesToEqual,
    expectTimestampToBeWithin,
    itShouldBeAClass,
} = require('./test-utils');



describe('HeaderSetConsolidator', () => {

    itShouldBeAClass(HeaderSetConsolidator, HeaderSet, {
        interval: 0,
        timeToLive: 0,
        minTimestamp: null,
        maxTimestamp: null,
        lastIntervalTime: 0,
        timer: null,
        constructor: Function,
        startTimer: Function,
        stopTimer: Function,
        processHeaderSet: Function,
        _handleInterval: Function,
        _processHeaderSet: Function,
    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const before = new Date();

            const hsc = new HeaderSetConsolidator();

            const after = new Date();

            expectOwnPropertyNamesToEqual(hsc, [
                'interval',
                'timeToLive',
                'minTimestamp',
                'maxTimestamp',

                // base class related
                'timestamp',
                'headerList',

                '_events',
                '_eventsCount',
                '_maxListeners',
            ]);

            expectTimestampToBeWithin(hsc.timestamp, before, after);
            expect(hsc.interval).toBe(0);
            expect(hsc.timeToLive).toBe(0);
            expect(hsc.minTimestamp).toBe(null);
            expect(hsc.maxTimestamp).toBe(null);
        });

        it('should copy selected options', () => {
            const options = {
                timestamp: new Date(1234567890),
                interval: 1234,
                timeToLive: 1337,
                minTimestamp: new Date(0),
                maxTimestamp: new Date(86400000),
                junk: 'DO NOT COPY ME!',
            };

            const hsc = new HeaderSetConsolidator(options);

            expect(hsc.timestamp).toBe(options.timestamp);
            expect(hsc.interval).toBe(options.interval);
            expect(hsc.timeToLive).toBe(options.timeToLive);
            expect(hsc.minTimestamp).toBe(options.minTimestamp);
            expect(hsc.maxTimestamp).toBe(options.maxTimestamp);
            expect(hsc.junk).toBe(undefined);
        });

    });

    describe('#startTimer and #stopTimer', () => {

        it('should work correctly', async () => {
            const hsc = new HeaderSetConsolidator({

                interval: 1000,

            });

            let onHeaderSet, startTimestamp;

            const onHeaderSetPromise = new Promise(resolve => {
                onHeaderSet = sinon.spy(() => {
                    if (startTimestamp == null) {
                        startTimestamp = Date.now();
                    } else {
                        resolve();
                    }
                });

                hsc.on('headerSet', onHeaderSet);
            });

            hsc.startTimer();

            await onHeaderSetPromise;

            hsc.stopTimer();

            expectElapsedTimeToBeWithin(startTimestamp, 1000, 1200);

            expect(onHeaderSet.callCount).toBe(2);
            expect(onHeaderSet.firstCall.args).toHaveLength(1);
            expect(onHeaderSet.firstCall.args [0]).toBe(hsc);

            hsc.removeListener('headerSet', onHeaderSet);
        });

    });

    describe('#processHeaderSet', () => {

        it('should work correctly without options', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const header3 = new Packet({
                channel: 3
            });

            const headerSet = new HeaderSet();
            headerSet.addHeaders([ header1, header2, header3 ]);

            const hsc = new HeaderSetConsolidator();

            const onHeaderSetSpy = sinon.spy();

            hsc.on('headerSet', onHeaderSetSpy);

            expect(hsc.getHeaders()).toHaveLength(0);

            hsc.processHeaderSet(headerSet);

            expect(hsc.getHeaders()).toHaveLength(3);

            expect(onHeaderSetSpy.callCount).toBe(1);
            expect(onHeaderSetSpy.firstCall.args).toHaveLength(1);
            expect(onHeaderSetSpy.firstCall.args [0]).toBe(hsc);

            hsc.removeListener('headerSet', onHeaderSetSpy);
        });

        it('should work correctly with minTimestamp', () => {
            const header1 = new Packet({
                channel: 1
            });

            const headerSet = new HeaderSet({
                headers: [ header1 ],
            });

            const timestamp = moment.utc([ 2014, 3, 1 ]).valueOf();

            const hsc = new HeaderSetConsolidator({
                minTimestamp: new Date(timestamp),
            });

            const onHeaderSetSpy = sinon.spy();

            hsc.on('headerSet', onHeaderSetSpy);

            headerSet.timestamp = new Date(timestamp - 1);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(0);

            headerSet.timestamp = new Date(timestamp);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(1);

            headerSet.timestamp = new Date(timestamp + 1);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(2);

            hsc.removeListener('headerSet', onHeaderSetSpy);
        });

        it('should work correctly with maxTimestamp', () => {
            const header1 = new Packet({
                channel: 1
            });

            const headerSet = new HeaderSet({
                headers: [ header1 ],
            });

            const timestamp = moment.utc([ 2014, 3, 1 ]).valueOf();

            const hsc = new HeaderSetConsolidator({
                maxTimestamp: new Date(timestamp),
            });

            const onHeaderSetSpy = sinon.spy();

            hsc.on('headerSet', onHeaderSetSpy);

            headerSet.timestamp = new Date(timestamp - 1);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(1);

            headerSet.timestamp = new Date(timestamp);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(2);

            headerSet.timestamp = new Date(timestamp + 1);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(2);

            hsc.removeListener('headerSet', onHeaderSetSpy);
        });

        it('should work correctly with interval', () => {
            const header1 = new Packet({
                channel: 1
            });

            const headerSet = new HeaderSet({
                headers: [ header1 ],
            });

            const timestamp = moment.utc([ 2014, 3, 1 ]).valueOf();

            const hsc = new HeaderSetConsolidator({
                interval: 3600,
            });

            const onHeaderSetSpy = sinon.spy();

            hsc.on('headerSet', onHeaderSetSpy);

            headerSet.timestamp = new Date(timestamp);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(1);

            headerSet.timestamp = new Date(timestamp + 3599);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(1);

            headerSet.timestamp = new Date(timestamp + 3600);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(2);

            hsc.removeListener('headerSet', onHeaderSetSpy);
        });

        it('should work correctly with timeToLive', () => {
            const timestamp = moment.utc([ 2014, 3, 1 ]).valueOf();

            const header1 = new Packet({
                timestamp: new Date(timestamp),
                channel: 1,
            });

            const headerSet = new HeaderSet({
                headers: [ header1 ],
            });

            const hsc = new HeaderSetConsolidator({
                timeToLive: 3600,
            });

            const onHeaderSetSpy = sinon.spy();

            hsc.on('headerSet', onHeaderSetSpy);

            headerSet.timestamp = new Date(timestamp);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(1);
            expect(hsc.getHeaderCount()).toBe(1);

            headerSet.timestamp = new Date(timestamp + 3599);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(2);
            expect(hsc.getHeaderCount()).toBe(1);

            headerSet.timestamp = new Date(timestamp + 3601);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).toBe(3);
            expect(hsc.getHeaderCount()).toBe(0);

            hsc.removeListener('headerSet', onHeaderSetSpy);
        });

    });

});
