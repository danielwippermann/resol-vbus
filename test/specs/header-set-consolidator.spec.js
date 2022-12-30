/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const moment = require('moment');


const {
    HeaderSet,
    HeaderSetConsolidator,
    Packet,
} = require('./resol-vbus');


const expect = require('./expect');

const {
    itShouldWorkCorrectlyAfterMigratingToClass,
} = require('./test-utils');



describe('HeaderSetConsolidator', () => {

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(HeaderSetConsolidator).to.be.a('function');
        });

        it('should have reasonable defaults', () => {
            const before = new Date();

            const hsc = new HeaderSetConsolidator();

            const after = new Date();

            expect(hsc).to.have.a.property('timestamp');
            expect(hsc.timestamp.getTime()).to.be.within(before.getTime(), after.getTime());

            expect(hsc).to.have.a.property('interval').that.is.equal(0);
            expect(hsc).to.have.a.property('timeToLive').that.is.equal(0);

            expect(hsc).to.have.a.property('minTimestamp').to.be.equal(null);
            expect(hsc).to.have.a.property('maxTimestamp').to.be.equal(null);
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

            expect(hsc.timestamp).to.equal(options.timestamp);
            expect(hsc.interval).to.equal(options.interval);
            expect(hsc.timeToLive).to.equal(options.timeToLive);
            expect(hsc.minTimestamp).to.equal(options.minTimestamp);
            expect(hsc.maxTimestamp).to.equal(options.maxTimestamp);
            expect(hsc).to.not.have.property('junk');
        });

    });

    describe('#startTimer and #stopTimer', () => {

        it('should be functions', () => {
            expect(HeaderSetConsolidator.prototype)
                .to.have.a.property('startTimer')
                .that.is.a('function');
            expect(HeaderSetConsolidator.prototype)
                .to.have.a.property('stopTimer')
                .that.is.a('function');
        });

        it('should work correctly', () => {
            const hsc = new HeaderSetConsolidator({

                interval: 1000,

            });

            let onHeaderSet;

            const before = Date.now();

            return new Promise((resolve, reject) => {
                onHeaderSet = sinon.spy(() => {
                    hsc.stopTimer();

                    resolve();
                });

                hsc.on('headerSet', onHeaderSet);

                hsc.startTimer();
            }).then(() => {
                const after = Date.now();

                expect(after - before).to.be.within(0, 1200);

                expect(onHeaderSet.callCount).to.equal(1);
                expect(onHeaderSet.firstCall.args [0].getHeaders).lengthOf(0);

                hsc.removeListener('headerSet', onHeaderSet);

                hsc.stopTimer();
            });
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

            expect(hsc.getHeaders()).to.have.lengthOf(0);

            hsc.processHeaderSet(headerSet);

            expect(hsc.getHeaders()).to.have.lengthOf(3);

            expect(onHeaderSetSpy.callCount).to.be.equal(1);

            expect(onHeaderSetSpy.firstCall.args [0].getHeaders()).to.have.lengthOf(3);
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

            expect(onHeaderSetSpy.callCount).equal(0);

            headerSet.timestamp = new Date(timestamp);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(1);

            headerSet.timestamp = new Date(timestamp + 1);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(2);
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

            expect(onHeaderSetSpy.callCount).equal(1);

            headerSet.timestamp = new Date(timestamp);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(2);

            headerSet.timestamp = new Date(timestamp + 1);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(2);
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

            expect(onHeaderSetSpy.callCount).equal(1);

            headerSet.timestamp = new Date(timestamp + 3599);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(1);

            headerSet.timestamp = new Date(timestamp + 3600);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(2);
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

            expect(onHeaderSetSpy.callCount).equal(1);
            expect(onHeaderSetSpy.firstCall.args [0].getHeaders()).lengthOf(1);

            headerSet.timestamp = new Date(timestamp + 3599);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(2);
            expect(onHeaderSetSpy.secondCall.args [0].getHeaders()).lengthOf(1);

            headerSet.timestamp = new Date(timestamp + 3601);
            hsc.processHeaderSet(headerSet);

            expect(onHeaderSetSpy.callCount).equal(3);
            expect(onHeaderSetSpy.thirdCall.args [0].getHeaders()).lengthOf(0);
        });

    });

    itShouldWorkCorrectlyAfterMigratingToClass(HeaderSetConsolidator, HeaderSet, {
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

});
