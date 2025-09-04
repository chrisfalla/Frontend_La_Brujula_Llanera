const eslint = require('@eslint/js');
const globals = require('globals');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react': react,
      'react-native': reactNative
    },
    rules: {
      'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
