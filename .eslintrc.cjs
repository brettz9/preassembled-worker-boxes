'use strict';

module.exports = {
  root: true,
  extends: ['ash-nazg/sauron-node-overrides'],
  settings: {
    polyfills: [
      'console',
      'Error',
      'fetch',
      'JSON',
      'Object.entries',
      'Promise.all',
      'Set',
      'URL'
    ]
  },
  overrides: [
    {
      files: '*.md/*.js',
      rules: {
        strict: 'off'
      }
    },
    {
      files: 'src/optionDefinitions.js',
      rules: {
        'node/exports-style': 'off'
      }
    },
    {
      files: 'test/fixtures/**',
      extends: ['ash-nazg/sauron-node-overrides']
    },
    {
      files: ['test/fixtures/queryModule.js', 'test/fixtures/config.js'],
      extends: ['ash-nazg/sauron-node-overrides']
    }
  ],
  env: {
    es6: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
  }
};
