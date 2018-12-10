const path = require('path');

module.exports = {
  extends: 'airbnb',
  globals: {
    google: true,
    uploadcare: true,
    NODE_ENV: true,
    APP_ENV: true,
    Bugsnag: true,
    mapboxgl: true,
    Raven: true,
    analytics: true,
    yaCounter: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    "global-require": 0,
    'react/no-multi-comp': 0,
    'id-length': [
      2,
      {
        exceptions: ['e', '_', 'i', 's', 'p'],
      },
    ],
    'react/prop-types': 0,
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: [path.join(__dirname, 'src'), 'node_modules'],
          },
        },
      },
    },
  },
};
