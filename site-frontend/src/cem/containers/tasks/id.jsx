import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushPath } from 'redux-simple-router';
import TaskActions from 'cem/actions/tasks';
import * as ContactActions from 'cem/_contacts/old_actions';
import LeadsActions from 'cem/actions/leads';
import PropertiesActions from 'cem/actions/properties';
import { loadLinkedContacts as loadContactsForProperty } from 'cem/actions/properties/contacts';
import { pop } from 'cem/actions/toastr';
import transfer from 'cem/actions/transfer';

import { prepareInitialValues } from 'cem/helpers/tasks';

import { fields } from 'cem/constants/tasks/form';

import Header from 'cem/components/tasks/id/header';
import About from 'cem/components/tasks/id/about';

class TaskContainer extends Component {
  componentWillMount() {
    const {
      actions,
      params: { id },
      location: {
        query: { propertyId, propertyCategory },
      },
    } = this.props;
    if (id !== 'create') {
      actions.loadTask(id);
    }

    if (id === 'create' && !!propertyId && !!propertyCategory) {
      actions.loadContactsForProperty(propertyId, propertyCategory);
    }
  }

  render() {
    const {
      actions,
      state,
      params: { id },
      location,
      hasRight,
    } = this.props;
    const { data, data: { responsibleUser = {}, reportedByUserId } = {} } =
      state.tasks[id] || {};
    const stateDetails = data && data.stateDetails;

    if (id === 'create' || data) {
      const formProps = {
        id,
        actions,
        state,
        formKey: id,
        data,
        initialValues: prepareInitialValues(id, {
          data,
          currentUserId: state.auth.id,
          queryParams: location.query,
        }),
        fields,
        queryParams: location.query,
      };

      const permissionProps = {
        isUpdateAllowed:
          hasRight(
            'task_update',
            responsibleUser.id,
            responsibleUser.departmentId,
            responsibleUser.divisionId,
          ) || hasRight('task_update', reportedByUserId),
        isDocumentsUploadAllowed:
          hasRight(
            'task_documents',
            responsibleUser.id,
            responsibleUser.departmentId,
            responsibleUser.divisionId,
          ) || hasRight('task_update', reportedByUserId),
        isCommentingAllowed:
          hasRight(
            'task_comments',
            responsibleUser.id,
            responsibleUser.departmentId,
            responsibleUser.divisionId,
          ) || hasRight('task_update', reportedByUserId),
        isUserTransferAllowed:
          hasRight(
            'task_transfer',
            responsibleUser.id,
            responsibleUser.departmentId,
            responsibleUser.divisionId,
          ) || hasRight('task_update', reportedByUserId),
      };

      return (
        <section>
          <Header
            {...formProps}
            createdAt={data && data.createdAt}
            auth={state.auth}
            queryParams={location.query}
            stateDetails={stateDetails}
            {...permissionProps}
          />
          <About {...formProps} {...permissionProps} />
        </section>
      );
    }

    return null;
  }
}

const pickState = ({
  auth,
  tasks,
  users,
  contacts,
  properties,
  contactsByPropertyId,
  leads,
}) => ({
  state: {
    auth,
    tasks,
    users,
    contacts,
    properties,
    contactsByPropertyId,
    leads,
  },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    {
      ...TaskActions,
      ...ContactActions,
      ...PropertiesActions,
      ...LeadsActions,
      loadContactsForProperty,
      pushPath,
      pop,
      transfer,
    },
    dispatch,
  ),
});

export default connect(
  pickState,
  pickActions,
)(TaskContainer);
