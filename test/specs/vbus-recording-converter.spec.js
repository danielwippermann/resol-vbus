/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    HeaderSet,
    Packet,
    VBusRecordingConverter,
} = require('./resol-vbus');


const expect = require('./expect');
const _ = require('./lodash');
const testUtils = require('./test-utils');



describe('VBusRecordingConverter', () => {

    testUtils.itShouldBeAClass(VBusRecordingConverter);

    describe('constructor', () => {

        it('should be a constructor function', () => {
            expect(VBusRecordingConverter).to.be.a('function');
        });

        it('should have reasonable defaults', () => {
            const converter = new VBusRecordingConverter();

            expect(converter).property('objectMode').equal(false);
        });

        it('should copy selected options', () => {
            const options = {
                objectMode: true,
                junk: 'JUNK',
            };

            const converter = new VBusRecordingConverter(options);

            expect(converter).property('objectMode').equal(options.objectMode);
            expect(converter).not.property('junk');
        });

    });

    describe('#reset', () => {

        it('should be a method', () => {
            expect(typeof VBusRecordingConverter.prototype.reset).equal('function');
        });

        it('should work correctly', () => {
            const converter = new VBusRecordingConverter();

            converter.write(Buffer.from('A5', 'hex'));

            expect(converter.rxBuffer.length).equal(1);

            converter.reset();

            expect(converter.rxBuffer).equal(null);
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

        it('should work correctly', (done) => {
            const buffer = Buffer.from(rawVBusRecordingHexDump, 'hex');

            const converter = new VBusRecordingConverter();

            const onHeader = sinon.spy();
            converter.on('header', onHeader);

            const onHeaderSet = sinon.spy();
            converter.on('headerSet', onHeaderSet);

            converter.on('finish', () => {
                expect(onHeader.callCount).to.equal(16, '"header" events triggered');
                expect(onHeaderSet.callCount).to.equal(1, '"headerSet" events triggered');

                const headerSet = onHeaderSet.firstCall.args [0];
                expect(headerSet).to.be.an('object');
                expect(headerSet.timestamp.getTime()).to.equal(1387893006829);

                const headers = headerSet.getSortedHeaders();

                expect(headers.length).to.equal(16);

                const headerIds = _.map(headers, (header) => {
                    return header.getId();
                });

                expect(headerIds).to.eql([
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

                done();
            });

            converter.write(buffer);
            converter.end();
        });

        it('should work correctly in object mode', (done) => {
            const converter = new VBusRecordingConverter({
                objectMode: true,
            });

            const refHeaderSet = new HeaderSet();

            const onHeaderSet = sinon.spy();
            converter.on('headerSet', onHeaderSet);

            converter.on('finish', () => {
                try {
                    expect(onHeaderSet.callCount).to.equal(1, '"headerSet" events triggered');

                    const headerSet = onHeaderSet.firstCall.args [0];
                    expect(headerSet).to.be.an('object');
                    expect(headerSet).equal(refHeaderSet);

                    done();
                } catch (ex) {
                    done(ex);
                }
            });

            converter.write(refHeaderSet);
            converter.end();
        });

        it('should work correctly with raw data', () => {
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

            return new Promise((resolve) => {
                converter.once('finish', () => {
                    resolve();
                });

                converter.write(buffer);
                converter.end();
            }).then(() => {
                converter.on('rawData', onRawData);

                expect(onRawData.callCount).to.equal(1, '"rawData" events triggered');

                const info = onRawData.firstCall.args [0];
                expect(info).an('object');
                expect(info).property('channel').equal(1);
                expect(info).property('startTimestamp').instanceOf(Date);
                expect(info.startTimestamp.valueOf()).equal(1387893003287);
                expect(info).property('endTimestamp').instanceOf(Date);
                expect(info.endTimestamp.valueOf()).equal(1387893003303);
                expect(info.buffer.toString('hex')).equal('aa1000217e100001013e00000b000074');
            });
        });

        it('should parse comment records', () => {
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

            return new Promise((resolve) => {
                converter.once('finish', () => {
                    resolve();
                });

                converter.write(buffer);
                converter.end();
            }).then(() => {
                converter.removeListener('comment', onComment);

                expect(onComment.callCount).to.equal(1, '"comment" events triggered');

                const info = onComment.firstCall.args [0];
                expect(info).an('object');
                expect(info).property('timestamp').instanceOf(Date);
                expect(info.timestamp.valueOf()).equal(1387893003287);
                expect(info).property('comment').equal('Comment serialized to VBus file format record');
            });
        });

        it('should support topology scan only', () => {
            const buffer = Buffer.from(rawVBusRecordingHexDump, 'hex');

            const converter = new VBusRecordingConverter({
                topologyScanOnly: true,
            });

            const onHeader = sinon.spy();
            converter.on('header', onHeader);

            const onHeaderSet = sinon.spy();
            converter.on('headerSet', onHeaderSet);

            return new Promise((resolve) => {
                converter.on('finish', () => {
                    resolve();
                });

                converter.write(buffer);
                converter.write(buffer);
                converter.write(buffer);
                converter.end();
            }).then(() => {
                expect(onHeader.callCount).to.equal(0, '"header" events triggered');
                expect(onHeaderSet.callCount).to.equal(1, '"headerSet" events triggered');

                const headerSet = onHeaderSet.firstCall.args [0];
                expect(headerSet).to.be.an('object');
                expect(headerSet.timestamp.getTime()).to.equal(0);

                const headers = headerSet.getSortedHeaders();

                expect(headers.length).to.equal(16);

                _.forEach(headers, (header) => {
                    expect(header.frameCount).equal(0);
                });

                const headerIds = _.map(headers, (header) => {
                    return header.getId();
                });

                expect(headerIds).to.eql([
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

        it('should work correctly', () => {
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

            return converter.finish().then(() => {
                converter.removeListener('data', onData);

                expect(onData.callCount).to.equal(1);

                const chunk = onData.firstCall.args [0];

                testUtils.expectToBeABuffer(chunk);
                expect(chunk.length).to.equal(172);

                const hexDump = chunk.toString('hex');
                let index = 0;
                while ((index < hexDump.length) && (index < rawVBusRecordingHexDump.length)) {
                    expect(hexDump.slice(index, index + 2)).to.equal(rawVBusRecordingHexDump.slice(index, index + 2), index / 2);
                    index += 2;
                }

                expect(hexDump).to.equal(rawVBusRecordingHexDump);
            });
        });

        it('should work correctly in object mode', () => {
            const refHeaderSet = new HeaderSet();

            const converter = new VBusRecordingConverter({
                objectMode: true,
            });

            const onData = sinon.spy();
            converter.on('data', onData);

            converter.convertHeaderSet(refHeaderSet);

            return converter.finish().then(() => {
                converter.removeListener('data', onData);

                expect(onData.callCount).to.equal(1, '"data" events triggered');

                const headerSet = onData.firstCall.args [0];
                expect(headerSet).to.be.an('object');
                expect(headerSet).equal(refHeaderSet);
            });
        });

        it('should work correctly with raw data', () => {
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

            return converter.finish().then(() => {
                converter.removeListener('data', onData);

                expect(onData.callCount).to.equal(1, '"data" events triggered');

                const chunk = onData.firstCall.args [0];
                testUtils.expectToBeABuffer(chunk);
                expect(chunk.length).to.equal(54);

                expect(chunk.toString('hex')).equal(rawDataHexDump);
            });
        });

        it('should work correctly with comment data', () => {
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

            return converter.finish().then(() => {
                converter.removeListener('data', onData);

                expect(onData.callCount).to.equal(1, '"data" events triggered');

                const chunk = onData.firstCall.args [0];
                testUtils.expectToBeABuffer(chunk);
                expect(chunk.length).to.equal(59);

                expect(chunk.toString('hex')).equal(rawDataHexDump);
            });
        });

    });

});
