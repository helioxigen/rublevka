import React, { Component } from 'react';
import Routes, { history } from 'cem/routes';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { syncReduxAndRouter } from 'redux-simple-router';
import { loadCurrentUser } from 'cem/actions/users/id';

import store from 'cem/store';
import { API } from 'core/config/sources';

export default class extends Component {
  state = {}

  componentWillMount() {
    persistStore(store, { whitelist: [`auth`] }, () => {
      const { auth } = store.getState();
      syncReduxAndRouter(history, store);

      if (auth.token) {
        API.setHeader(`Authorization`, `Bearer ${auth.token}`);

        if (auth.signedAsUserDetails && auth.signedAsUserDetails.id) {
          API.setHeader(`X-Sign-As-User-Id`, auth.signedAsUserDetails.id);
        }

        store.dispatch(loadCurrentUser()).then(() => this.setState({ rehydrated: true }));
      } else {
        this.setState({ rehydrated: true });
      }
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return null;
    }

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
