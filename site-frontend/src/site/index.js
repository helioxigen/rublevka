import React from 'react';
import ReactDOM from 'react-dom';
import sbjs from 'sourcebuster';
import global from 'window-or-global';
import Sentry from '@sentry/browser';

import 'core-js';
import './styles/base.css';
import './config/satellites';

import App from './App';

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
