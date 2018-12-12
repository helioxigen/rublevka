import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushPath } from 'redux-simple-router';

import { logoutAsUser } from 'cem/actions/auth';
import { pop } from 'cem/actions/toastr';

import permissionResolver from 'core/decorators/permissionResolver';

import Toastr from 'cem/components/toastr';
import Sidenav from 'cem/components/sidenav';

import s from 'cem/styles/components/sidebar';

class RootContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.state.auth.token) {
      this.props.actions.pushPath('/login');
    }
  }

  render() {
    const { children, ...propsWithoutChildren } = this.props;

    return (
      <section className={s.pushRight}>
        <Toastr />
        <Sidenav {...propsWithoutChildren} />

        {React.cloneElement(children, { ...propsWithoutChildren })}
      </section>
    );
  }
}

const pickState = ({ auth, users }) => ({
  state: { auth, users },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ pushPath, logoutAsUser, pop }, dispatch),
});

export default connect(pickState, pickActions)(permissionResolver()(RootContainer));
