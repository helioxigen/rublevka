import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import loadStats from 'cem/actions/tasks/stats';

import List from 'cem/containers/common/list';

import Filter from 'cem/components/tasks/list/filter';
import Pagination from 'core/components/pagination';
import Card from 'cem/components/tasks/list/card';

import { listResourcer } from 'core/decorators/fetcher';

import { filterTransform } from 'cem/helpers/tasks';

import isEqual from 'lodash/isEqual';

class TasksListContainer extends Component {
  componentWillMount() {
    const { actions, filters } = this.props;

    actions.loadStats('weight', { filter: filters });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, filters } = this.props;

    if (!isEqual(filters, nextProps.filters)) {
      actions.loadStats('weight', { filter: nextProps.filters });
    }
  }

  render() {
    return (
      <List
        {...this.props} title="Задачи" notFoundCaption="Не найдено задач"
        card={<Card />}
        paginator={<Pagination />}
        filter={<Filter stats={this.props.state.tasks.stats} />}
      />
    );
  }
}

const pickState = ({ auth, tasks }) => ({
  state: { auth, tasks },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ loadStats }, dispatch),
});

export default connect(pickState, pickActions)(listResourcer({
  id: 'tasks',
  linkedResourcesSchemes: [
    {
      typeId: 'contacts',
      primaryKeyPath: ['contactDetails.contactId', 'previewDetails.contactId', 'freeDetails.contactId', 'negotiationDetails.contactId'],
    },
    {
      typeId: 'leads',
      primaryKeyPath: ['contactDetails.clientLeadId', 'previewDetails.clientLeadId', 'freeDetails.clientLeadId', 'negotiationDetails.clientLeadId'],
      apiPath: '/v1/client_leads',
    },
    {
      typeId: 'deals',
      primaryKeyPath: ['contactDetails.dealId', 'previewDetails.dealId', 'freeDetails.dealId', 'negotiationDetails.dealId'],
    },
    {
      typeId: 'users',
      primaryKeyPath: 'responsibleUser.id',
      apiPath: '/v1/users/staff',
    },
  ],
  filterTransform,
})(TasksListContainer));
