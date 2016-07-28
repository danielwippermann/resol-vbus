module.exports = {
    extends: 'eslint:recommended',
    rules: {
        'no-unused-vars': ['error', { args: 'none' }]
    },
    env: {
        node: true,
        mocha: true
    },
    globals: {
        expect: true,
        sinon: true,
        promiseIt: true,
        xpromiseIt: true
    }
};
