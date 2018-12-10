import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchRequestActions from 'cem/actions/requests/search/id';
import CommentsActions from 'cem/actions/comments';
import { pushPath } from 'redux-simple-router';
import { loadUser } from 'cem/actions/users/id';
import { pop } from 'cem/actions/toastr';
import sendAnalytics from 'core/actions/analytics';

import Header from 'cem/components/requests/search/id/header';
import About from 'cem/components/requests/search/id/about';

import { REQUESTS_SEARCH_BY_CATEGORY_OPENED } from 'cem/constants/analytics';

class IdContainer extends Component {
  componentWillMount() {
    const { actions, params: { id } } = this.props;
    const { propertyCategory } = this.props.location.query;

    if (id !== 'create') {
      this.props.actions.loadSearchRequest(id);
    }
    if (id === 'create') {
      const eventName = REQUESTS_SEARCH_BY_CATEGORY_OPENED(propertyCategory);

      actions.sendAnalytics(eventName, {
        propertyCategory,
      });
    }
  }

  render() {
    const { params: { id }, state, hasRight } = this.props;
    const { propertyCategory } = this.props.location.query;
    const { data = {} /* , isUploading */ } = state.searchRequests[id] || {};
    const createdByUser = data.createdByUser || {};
    const responsibleUser = data.responsibleUser || {};
    const initialValues = id === 'create' ? { ...data, propertyCategory } : data;

    const permissionsProps = {
      isUpdateAllowed: hasRight('property_search_order_update', responsibleUser.id || createdByUser.id),
      isAnswersPreviewAllowed: hasRight('property_search_order_answers', responsibleUser.id || createdByUser.id),
      isCommentingAllowed: hasRight('property_search_order_comments', responsibleUser.id || createdByUser.id),
      isCurrentUserChief: hasRight(`hub_chief_${data.propertyCategory}`),
      isCurrentUserSupervisor: hasRight(`hub_supervisor_${data.propertyCategory}`),
      isCurrentUserManager: state.auth.details.isManager,
      isCurrentUserCreator: state.auth.id === createdByUser.id,
      isCurrentUserResponsible: state.auth.id === responsibleUser.id,
    };

    return data || id === 'create' ? (
      <section>
        <Header {...this.props} formKey={id} initialValues={initialValues} data={data} {...permissionsProps} />
        <About {...this.props} formKey={id} initialValues={initialValues} data={data} {...permissionsProps} />
      </section>
    ) : <div />;
  }
}

const pickState = ({ auth, comments, searchRequests, users }) => ({
  state: { auth, comments, searchRequests, users },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...SearchRequestActions, ...CommentsActions, pushPath, loadUser, pop, sendAnalytics }, dispatch),
});

export default connect(pickState, pickActions)(IdContainer);
