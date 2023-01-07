const indexModule = require('../../src/index');

const {
    expect,
    expectObjectOwnPropertyNamesToEqual,
} = require('./test-utils');

describe('index', () => {

    it('should export correctly', () => {
        expectObjectOwnPropertyNamesToEqual(indexModule, [
            'ArgParser',
            'performTransaction',
            'updateCacheForValues',
            'loadConfiguration',
            'saveConfiguration',
            'logger',
            'main',
            'utils',
            'ValueInfoCache',
        ]);
    });

});
