/* eslint-disable react/jsx-filename-extension */

import 'core-js/es6/object';
import 'normalize.css';
import 'cem/styles/base';
import '!style-loader!css-loader!postcss-loader!cem/styles/uploadcare';

import React from 'react';
import { render } from 'react-dom';
import App from 'cem/containers/app';

import 'cem/styles/ui/select';
import 'cem/styles/ui/daypicker';

render(<App />, document.getElementById('app'));
