import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { expire } from 'cem/actions/toastr';

import s from 'cem/styles/components/toastr';

import NotificationBox from './notificationBox';

class Toastr extends Component {
  render() {
    return (
      <section className={s.container}>
        {this.props.state.toastr.notifications.map(notification => (
          <NotificationBox
            key={notification.id}
            {...notification}
            onExpire={::this.props.actions.expire}
          />
        ))}
      </section>
    );
  }
}

const pickState = ({ toastr }) => ({
  state: { toastr },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ expire }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Toastr);
