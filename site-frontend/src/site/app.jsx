import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, storages } from 'redux-persist';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';

import { reducer, autoRehydrate, router, logger, tracker } from 'site/store';
import Routes from 'site/routes';

// eslint-disable-next-line
const initialState = window.__PRELOADED_STATE__ || {};

delete window.__PRELOADED_STATE__; // eslint-disable-line

const store = createStore(
  reducer,
  initialState,
  compose(
    autoRehydrate(),
    applyMiddleware(thunk, logger, router, tracker),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' &&
    process.env.APP_ENV === 'development'
      ? window.devToolsExtension()
      : fn => fn,
  ),
);

const history = syncHistoryWithStore(browserHistory, store);
const routerRender = applyRouterMiddleware(
  useScroll((prevRouterProps, { routes }) => !routes.some(route => route.ignoreScrollBehavior)),
);

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} render={routerRender}>
          {Routes}
        </Router>
      </Provider>
    );
  }
}
