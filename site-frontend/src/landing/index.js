/* eslint-disable react/jsx-filename-extension */

import './styles/base.css';
import 'site/config/satellites';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'landing/app';
import sbjs from 'sourcebuster';
import global from 'window-or-global';

sbjs.init({
  domain: global.config.domain,
});

ReactDOM.render(<App />, document.getElementById('app'));
