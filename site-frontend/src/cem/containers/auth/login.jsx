import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

import * as AuthActions from 'cem/actions/auth';
import Login from 'cem/components/auth/login';

class LoginContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const { state, actions } = this.props;

    if (nextProps.state.auth.token && state.auth.token !== nextProps.state.auth.token) {
      actions.pushPath('/');
    }
  }

  render() {
    const { state, actions } = this.props;

    return (
      <Login state={state} actions={actions} />
    );
  }
}

const pickState = ({ auth }) => ({
  state: { auth },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...AuthActions, pushPath }, dispatch),
});

export default connect(pickState, pickActions)(LoginContainer);
