import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { persistStore } from 'redux-persist';

import { reducer, autoRehydrate, router, logger, tracker } from './store';
import Routes from './Routes';

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

export const history = syncHistoryWithStore(browserHistory, store);
const routerRender = applyRouterMiddleware(
  useScroll(
    (prevRouterProps, { routes }) =>
      !routes.some(route => route.ignoreScrollBehavior),
  ),
);

class App extends Component {
  static childContextTypes = {
    rehydrated: React.PropTypes.bool,
  };

  constructor() {
    super();

    this.state = { rehydrated: false };
  }

  getChildContext() {
    return { rehydrated: this.state.rehydrated };
  }

  componentDidMount() {
    persistStore(store, { whitelist: ['favorites', 'displayOptions'] }, () => {
      this.setState({ rehydrated: true });
    });
  }

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

export default App;
