import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import 'normalize.css';
import './index.css';
// import * as serviceWorker from './serviceWorker';

if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_DRONE_COMMIT
) {
  Sentry.init({
    dsn: process.env.REACT_APP_STAFF_SENTRY_DSN,
    environment: process.env.REACT_APP_ENV,
    release: process.env.DRONE_COMMIT,
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

// serviceWorker.unregister();
