import ashNazg from 'eslint-config-ash-nazg';

export default [
  {
    ignores: [
      'output.js',

      // Test-generated
      'sw.js',
      'sw.js.map',
      'workbox-*.js',
      'workbox-*.js.map'
    ]
  },
  {
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
    }
  },
  ...ashNazg(['sauron', 'node']),
  {
    files: ['src/optionDefinitions.js'],
    rules: {
      'n/exports-style': 'off'
    }
  },
  {
    rules: {
      'n/no-unsupported-features/node-builtins': [
        'error',
        {
          ignores: ['fetch']
        }
      ]
    }
  }
];
