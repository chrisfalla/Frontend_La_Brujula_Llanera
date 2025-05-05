import eslint from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';

export default [
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
