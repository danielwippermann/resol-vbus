module.exports = {
    root: true,
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
        'prefer-destructuring': ['error', {
            VariableDeclarator: {
                array: false,
                object: true
            },
            AssignmentExpression: {
                array: false,
                object: true
            }
        }, {
            enforceForRenamedProperties: false
        }],
    },
    env: {
        node: true,
    },
    overrides: [{
        files: [
            'test/**/*.js',
        ],
        env: {
            jest: true,
        },
        globals: {
            sinon: true,
        }
    }]
};
