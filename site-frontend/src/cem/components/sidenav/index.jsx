import React, { Component } from 'react';

import UI from 'cem/components/ui';
const { Button } = UI;

import User from './user';
import Menu from './menu';

import cn from 'classnames';
import s from 'cem/styles/components/sidebar';

class Sidenav extends Component {
  state = {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { state, actions, hasAnyRight } = this.props;
    const isSignedAsUser = !!(state.auth.signedAsUserDetails && state.auth.signedAsUserDetails.id);

    const { data: userData = {} } = state.users[state.auth.id] || {};
    const signedAsUserData = state.auth.signedAsUserDetails;

    return (
      <div className={cn(s.sidebar, this.state.isOpen && s.sidebarXs)}>
        <Button className={cn(s.btn, this.state.isOpen && s.activeMenu)} onClick={() => this.toggle()}>»</Button>
        <ul className={cn(s.list, this.state.isOpen && s.listXs)}>
          <User actions={actions} isSignedAsUser={isSignedAsUser} data={isSignedAsUser ? signedAsUserData : userData} />
          <Menu hasAnyRight={hasAnyRight} state={state} />
        </ul>
      </div>
    );
  }
}

export default Sidenav;
