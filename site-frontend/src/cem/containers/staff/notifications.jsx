import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import notificationsActions from 'cem/actions/users/id/notifications';
import { pop } from 'cem/actions/toastr';

import Notifications from 'cem/components/staff/id/notifications';

class NotificationsContainer extends Component {
  componentWillMount() {
    const { actions } = this.props;

    actions.loadNotificationSettings();
  }
  render() {
    const { auth } = this.props.state;

    return <Notifications {...this.props} initialValues={auth} />;
  }
}

const pickState = ({ auth }) => ({
  state: { auth },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ ...notificationsActions, pop }, dispatch),
});

export default connect(pickState, mapDispatch)(NotificationsContainer);
