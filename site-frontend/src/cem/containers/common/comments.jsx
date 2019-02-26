import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushPath } from 'redux-simple-router';
import CommentsActions from 'cem/actions/comments';
import { pop } from 'cem/actions/toastr';

import Comments from 'cem/components/common/comments';

class CommentsContainer extends Component {
  componentWillMount() {
    const { entity, actions, isSubscriptionAvailable } = this.props;

    if (entity.key && entity.id) {
      actions.loadComments(entity.key, entity.id);
      if (isSubscriptionAvailable) {
        actions.getSubscriptionStatus(entity.key, entity.id);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { entity, actions } = this.props;

    if (
      nextProps.entity.key !== entity.key ||
      nextProps.entity.id !== entity.id
    ) {
      actions.loadComments(nextProps.entity.key, nextProps.entity.id);
    }
  }

  render() {
    return <Comments {...this.props} />;
  }
}

const pickState = ({ auth, comments, users }) => ({
  state: { auth, comments, users },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...CommentsActions, pushPath, pop }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(CommentsContainer);
