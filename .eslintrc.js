module.exports = {
    extends: 'semistandard',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        // 'no-console': 'error',
        'indent': ['error', 4],
        'no-multiple-empty-lines': 'off',
        'space-before-function-paren': 'off',
        'padded-blocks': 'off',
        'no-whitespace-before-property': 'off',
        'no-multi-spaces': 'off',
        'comma-dangle': 'off',
        'one-var': 'off',
        'key-spacing': 'off',
        'no-undef-init': 'off',
        'prefer-arrow-callback': 'error',
        'object-shorthand': ['error', 'always'],
        'no-var': 'error',
        'prefer-const': 'error',
        'array-bracket-spacing': 'off',
        'quote-props': 'off',
    },
    env: {
        node: true,
        jest: true,
    },
    globals: {
        sinon: true
    }
};
