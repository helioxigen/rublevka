import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TasksActions from 'cem/actions/_tasks';
import changeStatus from 'cem/actions/tasks/id/changeStatus';
import { pushPath } from 'redux-simple-router';
import { pop } from 'cem/actions/toastr';

import Pagination from 'core/containers/pagination';

import ListErrorMessage from 'cem/components/common/listErrorMessage';
import Card from './card';

import UI from 'cem/components/ui';
const {
  Button,
  Loading,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { objectToQueryString } from 'core/helpers';

import isEqual from 'lodash/isEqual';

import { resourceName } from 'cem/constants/_tasks/defaults';

const resource = group => `${resourceName}.${group}`;

class TasksTimeline extends Component {
  componentWillMount() {
    const { actions, group, filter } = this.props;

    actions.loadTasks({ filter }, group);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state, group, filter } = this.props;

    const pagination = state.pagination[resource(group)] || {};
    const nextPagination = nextProps.state.pagination[resource(group)] || {};

    const isPaginationUpdated =
      pagination !== undefined && !isEqual(pagination, nextPagination);

    if (isPaginationUpdated) {
      actions.loadTasks(
        { filter, pagination: { offset: nextPagination.offset } },
        group,
      );
    }
  }

  render() {
    const {
      state,
      actions,
      group,
      taskCreationParams,
      isTaskCreationAllowed = true,
      propertyCardHidden,
    } = this.props;

    const { ids = [], isFetching, errors = [] } = state._tasks[group] || {};

    return (
      <Row>
        <section className={s.section}>
          <Row>
            <Col xs="20" className={sUtils.pushedBottom1_5}>
              {isTaskCreationAllowed && (
                <Button
                  to={`/tasks/create?${objectToQueryString(
                    taskCreationParams,
                  )}`}
                  size="xs"
                  kind="accent"
                >
                  Добавить
                </Button>
              )}
            </Col>
            <Col xs="20">
              {!isFetching && !!errors.length && (
                <ListErrorMessage errors={errors} />
              )}
              {!isFetching && !errors.length && !ids.length && (
                <Heading notFound>Нет задач</Heading>
              )}
              {!isFetching &&
                ids.map(id => {
                  const taskData = state._tasks[id] && state._tasks[id].data;
                  const userData =
                    taskData &&
                    state.users[taskData.responsibleUser.id] &&
                    state.users[taskData.responsibleUser.id].data;

                  return (
                    <Card
                      key={id}
                      actions={actions}
                      data={taskData}
                      userData={userData}
                      propertyCardHidden={propertyCardHidden}
                    />
                  );
                })}
              {isFetching && <Loading />}
              {!isFetching && !!ids.length && (
                <Container fluid>
                  <Row xs="center">
                    <Col sm="10" className={sUtils.pushed6_0}>
                      <Pagination kind={resource(group)} />
                    </Col>
                  </Row>
                </Container>
              )}
            </Col>
          </Row>
        </section>
      </Row>
    );
  }
}

const pickState = ({ _tasks, users, pagination }) => ({
  state: { _tasks, users, pagination },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    { ...TasksActions, changeStatus, pop, pushPath },
    dispatch,
  ),
});

export default connect(
  pickState,
  pickActions,
)(TasksTimeline);
