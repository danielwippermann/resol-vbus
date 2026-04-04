module.exports = {
    testMatch: [
        '<rootDir>/test/specs/**/*.spec.js',
    ],
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/configuration-optimizers/*-data.js',
        'test/specs/test-utils.js',
    ],
};
