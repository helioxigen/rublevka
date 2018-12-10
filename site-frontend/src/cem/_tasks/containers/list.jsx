import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import * as _TasksActions from 'cem/_tasks/actions';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';

// constants
import { titles, resourceName } from 'cem/_tasks/constants/defaults';

// UI
import UI from 'cem/components/ui';

// components
import Card from 'cem/_tasks/components/old_card';
import Filter from 'cem/_tasks/components/filter';
import Pagination from 'core/components/pagination';
import ListErrorMessage from 'cem/components/common/listErrorMessage';

// styles
import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

// helpers
import isEqual from 'lodash/isEqual';
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

// UI
const {
  Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;

// component
class List extends Component {
  static propTypes = {
    state: PropTypes.shape({
      _tasks: PropTypes.object.isRequired,

      filters: PropTypes.object.isRequired,
      pagination: PropTypes.object.isRequired,
      order: PropTypes.object.isRequired,
    }),
    actions: PropTypes.shape({
      loadTasks: PropTypes.func.isRequired,

      updatePagination: PropTypes.func.isRequired,

      setFilter: PropTypes.func.isRequired,
      updateFilter: PropTypes.func.isRequired,
      resetFilter: PropTypes.func.isRequired,
    }),

    hasRight: PropTypes.func.isRequired,
    hasAllRights: PropTypes.func.isRequired,
    hasAnyRight: PropTypes.func.isRequired,

    // params: PropTypes.shape({
    //   group: PropTypes.string.isRequired,
    // }),
  }

  constructor(props) {
    super(props);

    this.group = `all`;
    this.resource = `${resourceName}.${this.group}`;
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const isGroupUpdated = !isEqual(this.props.params.group, nextProps.params.group);

    if (isGroupUpdated) { // TODO: move that check to isUpdated
      this.group = nextProps.params.group;
      this.resource = `${resourceName}.${this.group}`;
    }

    if (isUpdated(this.resource, this.props, nextProps) || isGroupUpdated) {
      this.load(nextProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.state, nextProps.state);
  }

  load({ state, actions }) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
    };

    actions.loadTasks(options, this.group);
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(this.resource, { offset });
  }

  render() {
    const { state } = this.props;
    const { ids = [], isFetching, errors = [] } = state._tasks[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const hasErrors = !isFetching && !!errors.length;
    const hasItems = !!ids.length;

    const title = titles[this.group];

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  {title}
                </Heading>
              </Col>
            </Row>

            <Row>
              <Filter
                resourceName={this.resource}
                group={this.group}
                count={pagination.total}
                updatePagination={this.props.actions.updatePagination}
              />
            </Row>
          </div>
        </Container>

        {isFetching && (
          <Loading />
        )}

        {hasErrors && (
          <ListErrorMessage errors={errors} />
        )}

        {!isFetching && !ids.length && (
          <Heading notFound>Задачи не найдены</Heading>
        )}

        {hasItems && (
          ids.map(id => (
            <Card key={id} task={state._tasks[id].data} />
          ))
        )}

        {hasItems && (
          <Container fluid>
            <Row xs="center">
              <Col sm="10" className={sUtils.pushed6_0}>
                <Pagination
                  total={pagination.total}
                  limit={pagination.limit}
                  offset={pagination.offset}
                  onUpdate={::this.handlePaginationUpdate}
                />
              </Col>
            </Row>
          </Container>
        )}
      </section>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const { _tasks, _clientLeads, _contacts, _deals, _users, filters, pagination, order } = state;

  return {
    state: {
      _tasks,

      _clientLeads,
      _contacts,
      _deals,
      _users,

      filters,
      pagination,
      order,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    ..._TasksActions,
    ...FilterActions,
    ...PaginationActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(List);
