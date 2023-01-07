const testUtils = require('../test-utils');


const { expect } = global;


module.exports = {

    ...testUtils,

    expectPendingValuesCountInConfigToBe(config, expectedLength) {
        testUtils.expectTypeToBe(config, 'array');
        expect(config.filter(value => value.pending)).toHaveLength(expectedLength);
    },

    markPendingValuesInConfigAsTransceived(config) {
        for (const value of config) {
            if (value.pending) {
                value.pending = false;
                value.transceived = true;
                value.value = null;
            }
        }
    },

};
