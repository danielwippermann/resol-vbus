/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const crypto = require('crypto');


const {
    Packet,
    HeaderSet,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTimestampToBeWithin,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



describe('HeaderSet', () => {

    itShouldBeAClass(HeaderSet, null, {
        timestamp: null,
        headerList: null,
        constructor: Function,
        _findIndex: Function,
        containsHeader: Function,
        addHeader: Function,
        addHeaders: Function,
        _removeHeader: Function,
        _removeHeaders: Function,
        removeAllHeaders: Function,
        removeHeadersOlderThan: Function,
        getHeaderCount: Function,
        getHeaders: Function,
        getSortedHeaders: Function,
        getSortedHeaderSet: Function,
        getId: Function,
        getIdHash: Function,
    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const before = new Date();
            const headerSet = new HeaderSet();
            const after = new Date();

            expectOwnPropertyNamesToEqual(headerSet, [
                'timestamp',
                'headerList',

                // base class related
                '_events',
                '_eventsCount',
                '_maxListeners',
            ]);

            expectTimestampToBeWithin(headerSet.timestamp, before, after);
            expect(headerSet.headerList).toHaveLength(0);
        });

        it('should copy certain options', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const options = {
                timestamp: new Date(),
                headers: [ header1, header2 ]
            };

            const headerSet = new HeaderSet(options);

            expect(headerSet.timestamp).toBe(options.timestamp);
            expect(headerSet.headerList).toEqual(options.headers);
        });

    });

    describe('#containsHeader', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const header3 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet();

            expect(headerSet.containsHeader(header1)).toBe(false);
            expect(headerSet.containsHeader(header2)).toBe(false);
            expect(headerSet.containsHeader(header3)).toBe(false);

            headerSet.addHeader(header1);

            expect(headerSet.containsHeader(header1)).toBe(true);
            expect(headerSet.containsHeader(header2)).toBe(false);
            expect(headerSet.containsHeader(header3)).toBe(false);

            headerSet.addHeader(header2);

            expect(headerSet.containsHeader(header1)).toBe(true);
            expect(headerSet.containsHeader(header2)).toBe(true);
            expect(headerSet.containsHeader(header3)).toBe(true);

            headerSet.removeAllHeaders();
            headerSet.addHeader(header3);

            expect(headerSet.containsHeader(header1)).toBe(false);
            expect(headerSet.containsHeader(header2)).toBe(true);
            expect(headerSet.containsHeader(header3)).toBe(true);
        });

    });

    describe('#addHeader', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const header3 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet();

            headerSet.addHeader(header1);

            expect(headerSet.headerList).toEqual([ header1 ]);

            headerSet.addHeader(header2);

            expect(headerSet.headerList).toEqual([ header1, header2 ]);

            headerSet.addHeader(header3);

            expect(headerSet.headerList).toEqual([ header1, header3 ]);
        });

        it('should update the timestamp', () => {
            const header1 = new Packet({
                channel: 1
            });

            const startTimestamp = new Date(0);

            const headerSet = new HeaderSet({
                timestamp: startTimestamp,
            });

            expect(headerSet.timestamp).toBe(startTimestamp);

            headerSet.addHeader(header1);

            expect(headerSet.timestamp).toBe(header1.timestamp);
        });

    });

    describe('#addHeaders', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const header3 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet();

            headerSet.addHeaders([ header1, header2, header3 ]);

            expect(headerSet.headerList).toEqual([ header1, header3 ]);
        });

    });

    describe('#_removeHeader', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header1, header2 ],
            });

            headerSet._removeHeader(header1);

            expect(headerSet.headerList).toEqual([ header2 ]);
        });

        it('should ignore unknown headers', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const header3 = new Packet({
                channel: 3
            });

            const headerSet = new HeaderSet({
                headers: [ header1, header2 ],
            });

            headerSet._removeHeader(header3);

            expect(headerSet.headerList).toEqual([ header1, header2 ]);
        });

    });

    describe('#removeAllHeaders', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header1, header2 ],
            });

            headerSet.removeAllHeaders();

            expect(headerSet.headerList).toEqual([]);
        });

    });

    describe('#removeHeadersOlderThan', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                timestamp: new Date(1388089665000),
                channel: 1
            });

            const header2 = new Packet({
                timestamp: new Date(1388089666000),
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header1, header2 ],
            });

            headerSet.removeHeadersOlderThan(new Date(1388089665500));

            expect(headerSet.headerList).toEqual([ header2 ]);
        });

    });

    describe('#getHeaderCount', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const header3 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header1, header2, header3 ]
            });

            expect(headerSet.getHeaderCount()).toBe(2);
        });

    });

    describe('#getHeaders', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            const headers = headerSet.getHeaders();

            expectTypeToBe(headers, 'array');
            expect(headers.includes(header1)).toBe(true);
            expect(headers.includes(header2)).toBe(true);
        });

    });

    describe('#getSortedHeaders', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            const array = headerSet.getSortedHeaders();
            expectTypeToBe(array, 'array');
            expect(array).toEqual([ header1, header2 ]);
        });

    });

    describe('#getSortedHeaderSet', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            const result = headerSet.getSortedHeaderSet();

            expect(result).toBeInstanceOf(HeaderSet);
            expect(result.headerList).toEqual([ header1, header2 ]);
        });

    });

    describe('#getId', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            const id = headerSet.getId();

            expect(id).toBe('01_0000_0000_10_0000,02_0000_0000_10_0000');
        });

    });

    describe('#getIdHash', () => {

        it('should work correctly', () => {
            const header1 = new Packet({
                channel: 1
            });

            const header2 = new Packet({
                channel: 2
            });

            const headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            const id = headerSet.getIdHash();

            expect(id).toBe('5c9c71b01aca96a35c15cffd0ec382e8a1be99b3e42eeff57ecd7836aa7f1a24');
        });

        it('should cache hashes and return them', () => {
            const header1 = new Packet({
                channel: 1,
                command: 0x7654,
            });

            const header2 = new Packet({
                channel: 2,
                command: 0x7654,
            });

            const headerSet = new HeaderSet({
                headers: [ header2, header1 ]
            });

            const spy = sinon.spy(crypto, 'createHash');

            let id = headerSet.getIdHash();

            expect(id).toBe('28ee1aa76e488e1d87ebd79573b08b2cf20f08f1991fae46ecca3197812cca86');
            expect(spy.callCount).toBe(1);

            id = headerSet.getIdHash();

            expect(id).toBe('28ee1aa76e488e1d87ebd79573b08b2cf20f08f1991fae46ecca3197812cca86');
            expect(spy.callCount).toBe(1);

            spy.restore();
        });

    });

});
