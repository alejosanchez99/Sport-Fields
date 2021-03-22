module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    plugins: [
        'react',
        'react-native',
        'react-hooks'
    ],
    parser: 'babel-eslint',
    env: {
        jest: true,
        'react-native/react-native': true,
    },
    rules: {
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1, 
        "react/jsx-uses-vars": 2,
        "no-undef": 2,
        "react/prop-types": 2,
        "react/jsx-no-duplicate-props": 2      
    },
    globals: {
        "GLOBAL": false,
        "it": false,
        "expect": false,
        "describe": false
    }
};