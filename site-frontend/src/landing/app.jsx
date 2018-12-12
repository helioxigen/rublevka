import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'landing/store';

import MainContainer from './landing';

// import { config } from 'core/config/apps';
//
// console.log(config)
const settlementId = 408;

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer id={settlementId} />
      </Provider>
    );
  }
}
