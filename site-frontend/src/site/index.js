/* eslint-disable react/jsx-filename-extension */
import 'core-js';
import 'site/styles/base';
import 'site/config/satellites';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'site/app';
import sbjs from 'sourcebuster';
import global from 'window-or-global';
import Raven from 'raven-js';

sbjs.init({
  domain: global.config.domain,
});

try {
  Raven.config(process.env.REACT_APP_SENTRY_DSN).install();
} catch (e) {
  console.log('sentry cannot be installed');
}

ReactDOM.render(<App />, document.getElementById('app'));
