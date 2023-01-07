const utils = require('../../src/utils');

const {
    expect,
    expectObjectOwnPropertyNamesToEqual,
} = require('./test-utils');

describe('utils', () => {

    it('should export correctly', () => {
        expectObjectOwnPropertyNamesToEqual(utils, [
            'calcValueIdHash',
            'hex',
        ]);
    });

    describe('calcValueIdHash', () => {

        const { calcValueIdHash } = utils;

        it('should work correctly', async () => {
            expect(calcValueIdHash('')).toBe(0x00000000);
            expect(calcValueIdHash('Schema')).toBe(0x48D66991);
        });

    });

    describe('hex', () => {

        const { hex } = utils;

        it('should work correctly', async () => {
            expect(hex(0x12345, 8)).toBe('00012345');
        });

    });

});
