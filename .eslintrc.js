// Configuration for Volta JS file formatting
module.exports = {
    extends: ['airbnb', 'plugin:react/recommended'],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4, {SwitchCase: 1}],
        radix: ['off'],
        'no-plusplus': ['off'],
        'object-curly-spacing': ['off'],
        'no-prototype-builtins': ['off'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'func-names': ['off'],
        'arrow-body-style': ['off'],
        'no-unused-vars': [
            'error',
            {argsIgnorePattern: '^_|^element|$scope|attr'}
        ],
        'space-before-function-paren': ['error', 'always'],
        'consistent-return': ['off'],
        'no-alert': ['off'],
        'accessor-pairs': ['error', {getWithoutSet: true}],
        'array-bracket-newline': ['error', {multiline: true}],
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['/'],
                    exceptions: ['-', '+']
                },
                block: {
                    markers: ['!'],
                    exceptions: ['*'],
                    balanced: true
                }
            }
        ],
        'no-unused-vars': ['warn', {varsIgnorePattern: 'debug'}],
        'comma-dangle': ['off'], // NOTE: Rule throws errs on function call args
        yoda: ['off'],
        'no-underscore-dangle': ['off'],
        'prefer-destructuring': ['warn'],
        'import/no-named-as-default': ['off'],
        'max-len': ['warn'],
        'no-useless-constructor': ['off'],
        'import/prefer-default-export': ['off'],

        // React rules
        'react/react-in-jsx-scope': ['off'],
        'react/jsx-indent': ['off'],
        'react/jsx-indent-props': ['off'],
        'react/jsx-one-expression-per-line': ['off'],
        'react/jsx-closing-tag-location': ['off'],
        'react/destructuring-assignment': ['off'],
        'react/prop-types': ['off'],
        'react/jsx-filename-extension': ['off'],
        'react/sort-comp': ['off'],
        'react/display-name': ['off'],
        'react/no-unescaped-entities': ['off'],
        'jsx-quotes': ['off'],
        'jsx-a11y/no-static-element-interactions': ['off'],
        'jsx-a11y/click-events-have-key-events': ['off'],
        'jsx-a11y/no-noninteractive-element-interactions': ['off'],
        'jsx-a11y/label-has-for': ['off'],
        'jsx-a11y/label-has-associated-control': ['off'],
    }
};