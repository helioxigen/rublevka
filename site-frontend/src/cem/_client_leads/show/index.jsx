import React, { Component } from 'react';

import AboutForms from 'cem/_client_leads/show/about';
import Tabs from 'cem/components/common/tabs';
import Tasks from 'cem/_client_leads/show/tasks';

import * as UsersActions from 'cem/actions/users/id';
import LeadsActions from 'cem/actions/leads';
import PropertyActions from 'cem/actions/properties';
import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

class Id extends Component {
  componentWillMount() {
    const {
      actions,
      params: { id },
    } = this.props;

    if (id !== 'create') {
      actions.loadLead(id);
    }
  }

  render() {
    const {
      hasRight,
      params: { id, leadKind, tab },
    } = this.props;
    const { data = { requestDetails: {}, responsibleUser: {} } } = this.props.state.leads[id] || {};

    const queryParams = this.props.location.query;
    const originRequestKind = data && data.requestDetails && data.requestDetails.requestKind;
    const requestKind = originRequestKind || queryParams.requestKind;

    const initialValues = {
      ...data,
      kind: leadKind,
      requestDetails: {
        properties: (data.requestDetails && data.requestDetails.properties) || [],
        ...data.requestDetails,
        requestKind,
      },
    };

    if (data.state || id === 'create') {
      const { Header, About } = !requestKind
        ? AboutForms.withoutRequestKind
        : AboutForms[requestKind] || AboutForms[leadKind];

      const commonSectionProps = {
        formKey: id,
        id,
        data,
        requestKind,
        initialValues,
      };

      const tabs = [
        {
          url: `/client_leads/${data.kind}/${data.id}/about`,
          title: 'Информация',
          isShown: true,
        },
        {
          url: `/client_leads/${data.kind}/${data.id}/tasks`,
          title: 'Задачи',
          isShown: data.state !== 'spam',
        },
      ];

      const finalStates = ['rejected', 'spam', 'processed'];
      const isStateFinal = finalStates.indexOf(data.state) > -1;
      const hasStateToApproveFinal =
        data.stateDetails && finalStates.indexOf(data.stateDetails.toApprove) > -1;

      const isTaskCreationAllowed =
        hasRight('task_create') && !isStateFinal && !hasStateToApproveFinal;

      const permissionsProps = {
        isUpdateAllowed: hasRight(
          'client_lead_update',
          data.responsibleUser.id,
          data.responsibleUser.departmentId,
          data.responsibleUser.divisionId,
        ),
        isSensitiveDataVisible: hasRight(
          'client_lead_sensitive_data',
          data.responsibleUser.id,
          data.responsibleUser.departmentId,
          data.responsibleUser.divisionId,
        ),
      };

      return (
        <section>
          <Header
            {...this.props}
            formKey={id}
            id={id}
            data={data}
            initialValues={initialValues}
            requestKind={originRequestKind}
            leadKind={leadKind}
            {...permissionsProps}
          />
          {id !== 'create' && <Tabs options={tabs} />}
          <Container fluid>
            {tab === 'about' && (
              <About {...this.props} {...commonSectionProps} {...permissionsProps} />
            )}
            {tab === 'tasks' && (
              <Tasks id={id} data={data} isTaskCreationAllowed={isTaskCreationAllowed} />
            )}
          </Container>
        </section>
      );
    }

    return null;
  }
}

const pickState = ({ leads, users, auth, properties }) => ({
  state: { leads, users, auth, properties },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(
    { ...LeadsActions, ...UsersActions, ...PropertyActions, pop, pushPath },
    dispatch,
  ),
});

export default connect(
  pickState,
  mapDispatch,
)(Id);
