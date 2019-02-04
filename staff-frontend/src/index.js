import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  React.createElement(Provider, { store }, React.createElement(App, null)),
  document.getElementById('root'),
);

serviceWorker.unregister();
