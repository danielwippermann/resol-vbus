/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    Converter,
    Datagram,
    HeaderSet,
    Packet,
    Telegram,
    VBusRecordingConverter,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectPromise,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



describe('VBusRecordingConverter', () => {

    itShouldBeAClass(VBusRecordingConverter, Converter, {
        topologyScanOnly: false,
        rxBuffer: null,
        headerSet: null,
        headerSetTimestamp: null,
        currentChannel: 0,
        knownHeaderIds: null,
        constructor: Function,
        reset: Function,
        end: Function,
        convertRawData: Function,
        convertComment: Function,
        convertHeader: Function,
        convertHeaderSet: Function,
        _convertHeaders: Function,
        _read: Function,
        _write: Function,
        _processBuffer: Function,
        _processRecord: Function,
        _processType3Record: Function,
        _emitHeaderSet: Function,
        _processRecordForTopologyScan: Function,
        _constructTopologyHeaderSet: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const converter = new VBusRecordingConverter();

            expectOwnPropertyNamesToEqual(converter, [
                'topologyScanOnly',
                'knownHeaderIds',

                // base class related
                'objectMode',
                'finishedPromise',

                '_events',
                '_eventsCount',
                '_maxListeners',
                '_readableState',
                '_writableState',
                'allowHalfOpen',
            ]);

            expect(converter.topologyScanOnly).toBe(false);
            expect(converter.knownHeaderIds).toEqual({});
            expect(converter.objectMode).toBe(false);
            expectPromise(converter.finishedPromise);
        });

        it('should copy selected options', () => {
            const options = {
                topologyScanOnly: true,
                objectMode: true,
                junk: 'JUNK',
            };

            const converter = new VBusRecordingConverter(options);

            expect(converter.topologyScanOnly).toBe(options.topologyScanOnly);
            expect(converter.objectMode).toBe(options.objectMode);
            expect(converter.junk).toBe(undefined);
        });

    });

    describe('#reset', () => {

        it('should work correctly', () => {
            const converter = new VBusRecordingConverter();

            converter.write(Buffer.from('A5', 'hex'));

            expect(converter.rxBuffer.length).toBe(1);

            converter.reset();

            expect(converter.rxBuffer).toBe(null);
        });

    });

    describe('writable stream', () => {

        const rawVBusRecordingHexDump = [
            'a5440e000e00eda1de2443010000a566',
            '46004600baa1de244301000010005300',
            '100000012c00000020051000f23d1000',
            'c0571000861000000000000000000000',
            '000000000000000000007f00a500b600',
            '11000000a57710001000000000000000',
            '00000100a5667e007e00bba1de244301',
            '00001000117e1000000164000000a300',
            'b300d30045021d025b02b000c8007c00',
            '20016aff02015d0248dd0f274605e800',
            'd2000f270f2700000000000000000000',
            '00000000000000000000000000000000',
            '00000f27fe000f270f27000000640000',
            '00000000646400000000fbd769180000',
            '0000a566560056009a9ade2443010000',
            '1000127e100000013c000000a501d400',
            'df0070012701b8220f270f270f270f27',
            '0f270f270f270f270f270f270f270f27',
            '0f270f270f270f270f270f270f270f27',
            '0f270f270f270f27a5661e001e002794',
            'de24430100001000217e100000010400',
            '000000000b00a5662a002a00be94de24',
            '430100001000317e1000000110000000',
            '05774a000000000000000000130d0000',
            'a5662a002a005995de24430100001000',
            '327e1000000110000000d7126d000000',
            '0000000000006f180000a5662a002a00',
            '5a95de24430100001000337e10000001',
            '10000000e277c700000000003c270000',
            '88840000a5662a002a000396de244301',
            '00001000347e10000001100000007535',
            '0400000000004527000045270000a566',
            '2a002a007a96de24430100001000357e',
            '10000001100000009bd0bd0000000000',
            '00000000845d0000a56642004200a293',
            'de24430100001500117e100000012800',
            '0000020a0000a300b30005774a00010b',
            '00000000000004080000000000640000',
            '00000000646400000000a56652005200',
            '8197de24430100005166117e10000002',
            '38000000000100000000000000010000',
            '00000000000100000000000000010000',
            '00000000640100006400000000000000',
            '000000000000000000000000a5665200',
            '5200127ade24430100005266117e1000',
            '00023800000000010000000000000001',
            '00000000000000010000000000000001',
            '00000000000000010000000000000000',
            '0000000000000000000000000000a566',
            '520052007e89de24430100005366117e',
            '10000002380000000001000000000000',
            '00010000000000000001000000000000',
            '00010000000000000001000000000000',
            '00000000000000000000000000000000',
            'a566520052007699de24430100005466',
            '117e1000000238000000000100000000',
            '00000001000000000000000100000000',
            '00000001000000000000000100000000',
            '00000000000000000000000000000000',
            '0000a566520052003753de2443010000',
            '5566117e100000023800000000010000',
            '00000000000100000000000000010000',
            '00000000000100000000000000010000',
            '00000000000000000000000000000000',
            '00000000a566320032004298de244301',
            '0000117e516610000001180000004ac2',
            '11007585100079961000ad711100cc02',
            '11001c969800',
        ].join('');

        it('should work correctly', async () => {
            const buffer = Buffer.from(rawVBusRecordingHexDump, 'hex');

            const converter = new VBusRecordingConverter();

            const onHeader = sinon.spy();
            converter.on('header', onHeader);

            const onHeaderSet = sinon.spy();
            converter.on('headerSet', onHeaderSet);

            const onFinishPromise = new Promise(resolve => {
                converter.once('finish', () => {
                    resolve();
                });
            });

            converter.write(buffer);
            converter.end();

            await onFinishPromise;

            expect(onHeader.callCount).toBe(16);
            expect(onHeaderSet.callCount).toBe(1);

            const headerSet = onHeaderSet.firstCall.args [0];
            expect(headerSet).toBeInstanceOf(HeaderSet);
            expect(headerSet.timestamp.getTime()).toBe(1387893006829);

            const headers = headerSet.getSortedHeaders();

            expect(headers.length).toBe(16);

            const headerIds = headers.map((header) => {
                return header.getId();
            });

            expect(headerIds).toEqual([
                '00_0010_0053_10_0100',
                '01_0010_7E11_10_0100',
                '01_0010_7E12_10_0100',
                '01_0010_7E21_10_0100',
                '01_0010_7E31_10_0100',
                '01_0010_7E32_10_0100',
                '01_0010_7E33_10_0100',
                '01_0010_7E34_10_0100',
                '01_0010_7E35_10_0100',
                '01_0015_7E11_10_0100',
                '01_6651_7E11_10_0200',
                '01_6652_7E11_10_0200',
                '01_6653_7E11_10_0200',
                '01_6654_7E11_10_0200',
                '01_6655_7E11_10_0200',
                '01_7E11_6651_10_0100'
            ]);
        });

        it('should work correctly in object mode', async () => {
            const converter = new VBusRecordingConverter({
                objectMode: true,
            });

            const refHeaderSet = new HeaderSet();

            const onHeaderSet = sinon.spy();
            converter.on('headerSet', onHeaderSet);

            const onFinishPromise = new Promise(resolve => {
                converter.once('finish', () => {
                    resolve();
                });
            });

            converter.write(refHeaderSet);
            converter.end();

            await onFinishPromise;

            expect(onHeaderSet.callCount).toBe(1);

            const headerSet = onHeaderSet.firstCall.args [0];
            expect(headerSet).toBeInstanceOf(HeaderSet);
            expect(headerSet).toBe(refHeaderSet);
        });

        it('should work correctly with raw data', async () => {
            const rawDataHexDump = [
                'a5771000100000000000000000000100',
                'a58826002600',
                '1794de2443010000',
                '2794de2443010000',
                'aa1000217e100001013e00000b000074',
            ].join('');

            const buffer = Buffer.from(rawDataHexDump, 'hex');

            const converter = new VBusRecordingConverter({
            });

            const onRawData = sinon.spy();
            converter.on('rawData', onRawData);

            const onFinishPromise = new Promise((resolve) => {
                converter.once('finish', () => {
                    resolve();
                });
            });

            converter.write(buffer);
            converter.end();

            await onFinishPromise;

            expect(onRawData.callCount).toBe(1);

            const info = onRawData.firstCall.args [0];

            expectOwnPropertyNamesToEqual(info, [
                'channel',
                'startTimestamp',
                'endTimestamp',
                'buffer',
            ]);

            expect(info.channel).toBe(1);
            expect(info.startTimestamp).toBeInstanceOf(Date);
            expect(info.startTimestamp.valueOf()).toBe(1387893003287);
            expect(info.endTimestamp).toBeInstanceOf(Date);
            expect(info.endTimestamp.valueOf()).toBe(1387893003303);
            expect(info.buffer.toString('hex')).toBe('aa1000217e100001013e00000b000074');
        });

        it('should parse comment records', async () => {
            const rawDataHexDump = [
                'a5993b003b00',
                '1794de2443010000',
                '436f6d6d656e7420',
                '73657269616c697a',
                '656420746f205642',
                '75732066696c6520',
                '666f726d61742072',
                '65636f7264',
            ].join('');

            const buffer = Buffer.from(rawDataHexDump, 'hex');

            const converter = new VBusRecordingConverter({
            });

            const onComment = sinon.spy();
            converter.on('comment', onComment);

            const onFinishPromise = new Promise((resolve) => {
                converter.once('finish', () => {
                    resolve();
                });
            });

            converter.write(buffer);
            converter.end();

            await onFinishPromise;

            converter.removeListener('comment', onComment);

            expect(onComment.callCount).toBe(1);

            const info = onComment.firstCall.args [0];

            expectOwnPropertyNamesToEqual(info, [
                'timestamp',
                'comment',
            ]);

            expect(info.timestamp).toBeInstanceOf(Date);
            expect(info.timestamp.valueOf()).toBe(1387893003287);
            expect(info.comment).toBe('Comment serialized to VBus file format record');
        });

        it('should support topology scan only', async () => {
            const buffer = Buffer.from(rawVBusRecordingHexDump, 'hex');

            const converter = new VBusRecordingConverter({
                topologyScanOnly: true,
            });

            const onHeader = sinon.spy();
            converter.on('header', onHeader);

            const onHeaderSet = sinon.spy();
            converter.on('headerSet', onHeaderSet);

            const onFinishPromise = new Promise((resolve) => {
                converter.on('finish', () => {
                    resolve();
                });
            });

            converter.write(buffer);
            converter.write(buffer);
            converter.write(buffer);
            converter.end();

            await onFinishPromise;

            expect(onHeader.callCount).toBe(0, '"header" events triggered');
            expect(onHeaderSet.callCount).toBe(1, '"headerSet" events triggered');

            const headerSet = onHeaderSet.firstCall.args [0];
            expect(headerSet).toBeInstanceOf(HeaderSet);
            expect(headerSet.timestamp.getTime()).toBe(0);

            const headers = headerSet.getSortedHeaders();

            expect(headers.length).toBe(16);

            for (const header of headers) {
                expect(header.frameCount).toBe(0);
            }

            const headerIds = headers.map((header) => {
                return header.getId();
            });

            expect(headerIds).toEqual([
                '00_0010_0053_10_0100',
                '01_0010_7E11_10_0100',
                '01_0010_7E12_10_0100',
                '01_0010_7E21_10_0100',
                '01_0010_7E31_10_0100',
                '01_0010_7E32_10_0100',
                '01_0010_7E33_10_0100',
                '01_0010_7E34_10_0100',
                '01_0010_7E35_10_0100',
                '01_0015_7E11_10_0100',
                '01_6651_7E11_10_0200',
                '01_6652_7E11_10_0200',
                '01_6653_7E11_10_0200',
                '01_6654_7E11_10_0200',
                '01_6655_7E11_10_0200',
                '01_7E11_6651_10_0100'
            ]);
        });

        it('should ignore junk data correctly', async () => {
            const buffer = Buffer.from([
                '00000000',
                'a5a5',
                'a50000000100',
                'a50000000001',

                // must be last
                'a50010001000',
            ].join(''), 'hex');

            const converter = new VBusRecordingConverter({
            });

            const onHeader = jest.fn();
            converter.on('header', onHeader);

            const onHeaderSet = jest.fn();
            converter.on('headerSet', onHeaderSet);

            const onRawData = jest.fn();
            converter.on('rawData', onRawData);

            const onComment = jest.fn();
            converter.on('comment', onComment);

            const onFinishPromise = new Promise((resolve) => {
                converter.on('finish', () => {
                    resolve();
                });
            });

            converter.write(buffer);
            converter.end();

            await onFinishPromise;

            converter.removeListener('header', onHeader);
            converter.removeListener('headerSet', onHeaderSet);
            converter.removeListener('rawData', onRawData);
            converter.removeListener('comment', onComment);

            expect(onHeader).toHaveBeenCalledTimes(0);
            expect(onHeaderSet).toHaveBeenCalledTimes(0);
            expect(onRawData).toHaveBeenCalledTimes(0);
            expect(onComment).toHaveBeenCalledTimes(0);
        });

        it('should parse legacy type 3 records correctly', async () => {
            const buffer = Buffer.from([
                'a5331e001e00eda1de2443010000',
                '100033221000000104000000',
                '77665544',

                'a5331e001e00eda1de2443010000',
                '443333221000000104000000',
                '77665544',

                'a5331e001e00eda1de2443010000',
                '100033221000000104000000',
                '77665544',

                'a5331e001e00eda1de2443010000',
                '443333221000000104000000',
                '77665544',

                'a5331e001e00eda1de2443010000',
                '443333221000000104000000',
                '77665544',

                'a5331a001a00eda1de2443010000',
                '443333221000000104000000',
            ].join(''), 'hex');

            const converter = new VBusRecordingConverter({
            });

            const onHeader = jest.fn();
            converter.on('header', onHeader);

            const onHeaderSet = jest.fn();
            converter.on('headerSet', onHeaderSet);

            const onFinishPromise = new Promise((resolve) => {
                converter.on('finish', () => {
                    resolve();
                });
            });

            converter.write(buffer);
            converter.end();

            await onFinishPromise;

            converter.removeListener('header', onHeader);
            converter.removeListener('headerSet', onHeaderSet);

            expect(onHeader).toHaveBeenCalledTimes(5);
            expect(onHeaderSet).toHaveBeenCalledTimes(3);

            function expectLiveBufferToBe(call, hexDump) {
                expect(call [0].toLiveBuffer().toString('hex')).toBe(hexDump);
            }

            expectLiveBufferToBe(onHeader.mock.calls [0], 'aa100033221000010108776655440009');
            expectLiveBufferToBe(onHeader.mock.calls [1], 'aa443333221000010121776655440009');
            expectLiveBufferToBe(onHeader.mock.calls [2], 'aa100033221000010108776655440009');
            expectLiveBufferToBe(onHeader.mock.calls [3], 'aa443333221000010121776655440009');
            expectLiveBufferToBe(onHeader.mock.calls [4], 'aa443333221000010121776655440009');
        });

        it('should support raw data in topology scan only', async () => {
            const buffer = Buffer.from([
                'a5771000100000000000000000000100',
                'a58826002600',
                '1794de2443010000',
                '2794de2443010000',
                'aa1000217e100001013e00000b000074',
            ].join(''), 'hex');

            const converter = new VBusRecordingConverter({
                topologyScanOnly: true,
            });

            const onHeader = jest.fn();
            converter.on('header', onHeader);

            const onHeaderSet = jest.fn();
            converter.on('headerSet', onHeaderSet);

            const onRawData = jest.fn();
            converter.on('rawData', onRawData);

            const onFinishPromise = new Promise((resolve) => {
                converter.on('finish', () => {
                    resolve();
                });
            });

            converter.write(buffer);
            converter.write(buffer);
            converter.write(buffer);
            converter.end();

            await onFinishPromise;

            converter.removeListener('header', onHeader);
            converter.removeListener('headerSet', onHeaderSet);
            converter.removeListener('rawData', onRawData);

            expect(onHeader).toHaveBeenCalledTimes(0);
            expect(onHeaderSet).toHaveBeenCalledTimes(1);
            expect(onRawData).toHaveBeenCalledTimes(3);

            const headerSet = onHeaderSet.mock.calls [0] [0];
            expect(headerSet.timestamp.getTime()).toBe(0);

            const headers = headerSet.getSortedHeaders();
            expect(headers).toHaveLength(0);

            const call0 = onRawData.mock.calls [0];
            expect(call0).toHaveLength(1);
            expect(call0 [0].startTimestamp.getTime()).toBe(1387893003287);
            expect(call0 [0].endTimestamp.getTime()).toBe(1387893003303);
            expect(call0 [0].channel).toBe(1);
            expect(call0 [0].buffer.toString('hex')).toBe('aa1000217e100001013e00000b000074');
        });

        async function runTests(options, fn) {
            const converter = new VBusRecordingConverter(options);

            const stats = {
                headerCount: 0,
                headerSetCount: 0,

                onHeader: jest.fn(() => {
                    stats.headerCount += 1;
                }),

                onHeaderSet: jest.fn(() => {
                    stats.headerSetCount += 1;
                }),
            };

            converter.on('header', stats.onHeader);
            converter.on('headerSet', stats.onHeaderSet);

            let onFinish;

            await new Promise((resolve) => {
                onFinish = () => {
                    resolve();
                };

                converter.on('finish', onFinish);

                fn(converter);
            });

            converter.removeListener('header', stats.onHeader);
            converter.removeListener('headerSet', stats.onHeaderSet);
            converter.removeListener('finish', onFinish);

            return stats;
        }

        it('should work with datagrams correctly', async () => {
            const stats = await runTests({}, converter => {
                const buffer = Buffer.from([
                    'a566200020007c87ef5a5a0100000000117e2000000906000000f8182a000000',
                ].join(''), 'hex');

                converter.write(buffer);
                converter.end();
            });

            expect(stats.headerCount).toEqual(1);
            expect(stats.headerSetCount).toEqual(0);

            const header = stats.onHeader.mock.calls [0] [0];
            expect(header).toBeInstanceOf(Datagram);
            expect(header.timestamp.getTime()).toEqual(1487584331644);
            expect(header.channel).toEqual(0);
            expect(header.destinationAddress).toEqual(0x0000);
            expect(header.sourceAddress).toEqual(0x7E11);
            expect(header.minorVersion).toEqual(0x00);
            expect(header.command).toEqual(0x0900);
            expect(header.valueId).toEqual(6392);
            expect(header.value).toEqual(42);
        });

        it('should work with telegrams correctly', async () => {
            const stats = await runTests({}, converter => {
                const buffer = Buffer.from([
                    'a56628002800880af6e95901000013121514300057000e0000000000000000000000000000000000',
                ].join(''), 'hex');

                converter.write(buffer);
                converter.end();
            });

            expect(stats.headerCount).toEqual(1);
            expect(stats.headerSetCount).toEqual(0);

            const header = stats.onHeader.mock.calls [0] [0];
            expect(header).toBeInstanceOf(Telegram);
            expect(header.timestamp.getTime()).toEqual(1485688933000);
            expect(header.channel).toEqual(0);
            expect(header.destinationAddress).toEqual(0x1213);
            expect(header.sourceAddress).toEqual(0x1415);
            expect(header.minorVersion).toEqual(0x00);
            expect(header.command).toEqual(0x57);
            expect(header.frameData.slice(0, 14).toString('hex')).toEqual('0000000000000000000000000000');
        });

    });

    describe('readable stream', () => {

        const rawPacket1 = 'aa100053001000010b0020051000004a723d1000013f40571000015706100000016800000000007f00000000007f00000000007f00000000007f00007f00000025003600051f11000000006e';
        const rawPacket2 = 'aa1000217e100001013e00000b000074';
        const rawPacket3 = 'aa1000317e100001042b05774a00003900000000007f00000000007f130d0000005f';

        const rawVBusRecordingHexDump = [
            'a5440e000e00eda1de2443010000a566',
            '46004600baa1de244301000010005300',
            '100000012c00000020051000f23d1000',
            'c0571000861000000000000000000000',
            '000000000000000000007f00a500b600',
            '11000000a57710001000000000000000',
            '00000100a5661e001e002794',
            'de24430100001000217e100000010400',
            '000000000b00a5662a002a00be94de24',
            '430100001000317e1000000110000000',
            '05774a000000000000000000130d0000',
        ].join('');

        it('should work correctly', async () => {
            const buffer1 = Buffer.from(rawPacket1, 'hex');
            const packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            const buffer2 = Buffer.from(rawPacket2, 'hex');
            const packet2 = Packet.fromLiveBuffer(buffer2, 0, buffer2.length);
            packet2.timestamp = new Date(1387893003303);
            packet2.channel = 1;

            const buffer3 = Buffer.from(rawPacket3, 'hex');
            const packet3 = Packet.fromLiveBuffer(buffer3, 0, buffer3.length);
            packet3.timestamp = new Date(1387893003454);
            packet3.channel = 1;

            const headerSet = new HeaderSet({
                timestamp: new Date(1387893006829),
                headers: [ packet1, packet2, packet3 ]
            });

            const converter = new VBusRecordingConverter();

            const onData = sinon.spy();
            converter.on('data', onData);

            converter.convertHeaderSet(headerSet);

            await converter.finish();

            converter.removeListener('data', onData);

            expect(onData.callCount).toBe(1);

            const chunk = onData.firstCall.args [0];

            expectTypeToBe(chunk, 'buffer');
            expect(chunk.length).toBe(172);

            const hexDump = chunk.toString('hex');
            let index = 0;
            while ((index < hexDump.length) && (index < rawVBusRecordingHexDump.length)) {
                expect(hexDump.slice(index, index + 2)).toBe(rawVBusRecordingHexDump.slice(index, index + 2), index / 2);
                index += 2;
            }

            expect(hexDump).toBe(rawVBusRecordingHexDump);
        });

        it('should work correctly in object mode', async () => {
            const refHeaderSet = new HeaderSet();

            const rawData = Buffer.alloc(0);

            const { timestamp } = refHeaderSet;

            const comment = 'This is a comment';

            const refHeader = new Packet();

            const converter = new VBusRecordingConverter({
                objectMode: true,
            });

            const onData = jest.fn();
            converter.on('data', onData);

            converter.convertHeaderSet(refHeaderSet);

            converter.convertRawData(rawData);

            converter.convertComment(timestamp, comment);

            converter.convertHeader(refHeader);

            await converter.finish();

            converter.removeListener('data', onData);

            expect(onData).toHaveBeenCalledTimes(4);

            const call0 = onData.mock.calls [0];
            expect(call0).toHaveLength(1);
            expect(call0 [0]).toBe(refHeaderSet);

            const call1 = onData.mock.calls [1];
            expect(call1).toHaveLength(1);
            expect(call1 [0]).toBe(rawData);

            const call2 = onData.mock.calls [2];
            expect(call2).toHaveLength(1);
            expect(call2 [0].timestamp).toBe(timestamp);
            expect(call2 [0].comment).toBe(comment);

            const call3 = onData.mock.calls [3];
            expect(call3).toHaveLength(1);
            expect(call3 [0]).toBe(refHeader);
        });

        it('should work correctly with raw data', async () => {
            const rawData = {
                channel: 1,
                startTimestamp: new Date(1387893003287),
                endTimestamp: new Date(1387893003303),
                buffer: Buffer.from('aa1000217e100001013e00000b000074', 'hex'),
            };

            const rawDataHexDump = [
                'a5771000100000000000000000000100',
                'a58826002600',
                '1794de2443010000',
                '2794de2443010000',
                'aa1000217e100001013e00000b000074',
            ].join('');

            const converter = new VBusRecordingConverter({
            });

            const onData = sinon.spy();
            converter.on('data', onData);

            converter.convertRawData(rawData);

            await converter.finish();

            converter.removeListener('data', onData);

            expect(onData.callCount).toBe(1, '"data" events triggered');

            const chunk = onData.firstCall.args [0];
            expectTypeToBe(chunk, 'buffer');
            expect(chunk.length).toBe(54);

            expect(chunk.toString('hex')).toBe(rawDataHexDump);
        });

        it('should work correctly with comment data', async () => {
            const timestamp = new Date(1387893003287);
            const comment = 'Comment serialized to VBus file format record';

            const rawDataHexDump = [
                'a5993b003b00',
                '1794de2443010000',
                '436f6d6d656e7420',
                '73657269616c697a',
                '656420746f205642',
                '75732066696c6520',
                '666f726d61742072',
                '65636f7264',
            ].join('');

            const converter = new VBusRecordingConverter({
            });

            const onData = sinon.spy();
            converter.on('data', onData);

            converter.convertComment(timestamp, comment);

            await converter.finish();

            converter.removeListener('data', onData);

            expect(onData.callCount).toBe(1);

            const chunk = onData.firstCall.args [0];
            expectTypeToBe(chunk, 'buffer');
            expect(chunk.length).toBe(59);

            expect(chunk.toString('hex')).toBe(rawDataHexDump);
        });

        it('should work correctly with Packet data', async () => {
            const buffer1 = Buffer.from(rawPacket1, 'hex');
            const packet1 = Packet.fromLiveBuffer(buffer1, 0, buffer1.length);
            packet1.timestamp = new Date(1387893006778);
            packet1.channel = 0;

            const rawDataHexDump = [
                'a5440e000e00baa1de2443010000',
                'a56646004600baa1de2443010000',
                '10005300100000012c000000',
                '20051000f23d1000c0571000861000000000000000000000000000000000000000007f00a500b60011000000',
            ].join('');

            const converter = new VBusRecordingConverter();

            const onData = jest.fn();
            converter.on('data', onData);

            converter.convertHeader(packet1);

            await converter.finish();

            converter.removeListener('data', onData);

            expect(onData).toHaveBeenCalledTimes(1);

            const call0 = onData.mock.calls [0];

            expect(call0).toHaveLength(1);
            expectTypeToBe(call0 [0], 'buffer');
            expect(call0 [0].length).toBe(84);

            const hexDump = call0 [0].toString('hex');
            expect(hexDump).toBe(rawDataHexDump);
        });

        async function runTests(options, fn) {
            const converter = new VBusRecordingConverter(options);

            const stats = {
                readableCounter: 0,
                readChunks: [],
                readData: null,

                onReadable: jest.fn(() => {
                    let chunk;
                    while ((chunk = converter.read()) != null) {
                        stats.readChunks.push(chunk);
                    }
                }),
            };

            converter.on('readable', stats.onReadable);

            let onEnd;

            await new Promise((resolve) => {
                onEnd = () => {
                    resolve();
                };

                converter.on('end', onEnd);

                fn(converter);
            });

            converter.removeListener('readable', stats.onReadable);
            converter.removeListener('end', onEnd);

            stats.readData = Buffer.concat(stats.readChunks);

            return stats;
        }

        it('should work with datagrams correctly', async () => {
            const stats = await runTests({}, converter => {
                const timestamp = new Date(1387893003287);

                const dgram = new Datagram({
                    timestamp,
                    channel: 0x11,
                    destinationAddress: 0x1213,
                    sourceAddress: 0x1415,
                    protocolVersion: 0x20,
                    command: 0x1617,
                    valueId: 0x2122,
                    value: 0x31323334,
                });

                converter.convertHeader(dgram);
                converter.finish();
            });

            expect(stats.readData.toString('hex')).toEqual([
                'a5440e000e00',
                '1794de2443010000',
                'a57710001000',
                '0000000000000000',
                '1100',
                'a56620002000',
                '1794de2443010000',
                '131215142000171606000000',
                '2221',
                '34333231',
            ].join(''));
        });

        it('should work with telegrams correctly', async () => {
            const stats = await runTests({}, converter => {
                const timestamp = new Date(1387893003287);

                const tgram = new Telegram({
                    timestamp,
                    channel: 0x11,
                    destinationAddress: 0x1213,
                    sourceAddress: 0x1415,
                    protocolVersion: 0x30,
                    command: 0x57,
                    frameData: Buffer.from('2122232425262731323334353637', 'hex'),
                });

                converter.convertHeader(tgram);
                converter.finish();
            });

            expect(stats.readData.toString('hex')).toEqual([
                'a5440e000e00',
                '1794de2443010000',
                'a57710001000',
                '0000000000000000',
                '1100',
                'a56628002800',
                '1794de2443010000',
                '13121514300057000e000000',
                '21222324252627',
                '31323334353637',
            ].join(''));
        });
    });

});
