import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RequestActions from 'cem/actions/requests/remove/id';
import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

import Header from 'cem/components/requests/remove/id/header';
import About from 'cem/components/requests/remove/id/about';

class IdContainer extends Component {
  componentWillMount() {
    const { id } = this.props.params;

    if (id !== 'create') this.props.actions.loadRemovalRequest(id);
  }

  render() {
    const {
      params: { id },
      state,
      hasRight,
    } = this.props;
    const { propertyId, propertyCategory } = this.props.location.query;
    const { data } = state.removalRequests[id] || {};
    const category = data && data.propertyCategory;

    const permissionsProps = {
      isCreationAllowed: hasRight('property_removal_order_create'),
      isUpdateAllowed:
        data && hasRight('property_removal_order_update', data.createdByUserId),
      isCommentingAllowed:
        data &&
        hasRight('property_removal_order_comments', data.createdByUserId),
      isCurrentUserSupervisor: hasRight(`hub_supervisor_${category}`),
      isCurrentUserChief: hasRight(`hub_chief_${category}`),
    };

    const isStatic =
      (id === 'create' && !permissionsProps.isCreationAllowed) ||
      (id !== 'create' &&
        data &&
        ['rejected', 'finished'].indexOf(data.state) === -1 &&
        !permissionsProps.isUpdateAllowed);
    const commonProps = {
      ...this.props,
      propertyId,
      propertyCategory,
      data,
      formKey: id,
      initialValues: { ...data },
      isStatic,
    };

    return id === 'create' || data ? (
      <section>
        <Header {...commonProps} {...permissionsProps} />
        <Container fluid>
          <About {...commonProps} {...permissionsProps} />
        </Container>
      </section>
    ) : null;
  }
}

const pickState = ({ auth, removalRequests, users, comments }) => ({
  state: { auth, removalRequests, users, comments },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...RequestActions, pop, pushPath }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(IdContainer);
