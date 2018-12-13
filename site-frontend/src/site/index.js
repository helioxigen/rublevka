/* eslint-disable react/jsx-filename-extension */
import 'core-js';
import 'site/styles/base';
import 'site/config/satellites';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'site/app';
import sbjs from 'sourcebuster';
import global from 'window-or-global';
import Sentry from '@sentry/browser';

sbjs.init({
  domain: global.config.domain,
});

try {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.APP_ENV,
  });
} catch (e) {
  console.log('sentry cannot be inited');
}

ReactDOM.render(<App />, document.getElementById('app'));
