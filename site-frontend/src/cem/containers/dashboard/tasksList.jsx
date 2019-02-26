import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import UI from 'cem/components/ui';
const {
  Loading,
  Button,
  Heading,
  Grid: { Row, Col },
} = UI;

import CountIndicator from 'cem/components/common/countIndicator';

import TaskCard from 'cem/components/dashboard/cards/taskCard';

import TasksActions from 'cem/actions/tasks';

import sUtils from 'cem/styles/utils';
import sCard from 'cem/styles/dashboard/taskCard';

class TasksList extends Component {
  componentWillMount() {
    const { actions, kind, limit = 5 } = this.props;

    actions.loadTasks(kind, { pagination: { limit } });
  }

  handlePaginationUpdate(offset) {
    const { actions, kind, state } = this.props;

    const pagination = state.pagination[`tasks.${kind}`] || {};

    actions.loadTasks(
      kind,
      { pagination: { offset, limit: pagination.limit } },
      true,
    );
  }

  render() {
    const { state, kind, declensionForms } = this.props;

    const pagination = state.pagination[`tasks.${kind}`] || {};

    const { ids = [], isFetching, errors = [] } = state.tasks.lists[kind];

    return (
      <Row className={sUtils.pushedBottom6}>
        <Col xs="20">
          <Heading size="sm" className={sUtils.fontSizeMd}>
            <span className={sUtils.alignMiddle}>
              <CountIndicator
                count={pagination.total}
                declensionForms={declensionForms}
              />
              {/* {title} */}
            </span>
          </Heading>
        </Col>
        <Col xs="20">
          {!isFetching && !!errors.length && (
            <ListErrorMessage errors={errors} />
          )}
          {!isFetching && !errors.length && !ids.length && (
            <Heading notFound className={sUtils.resetIndent}>
              Задач нет
            </Heading>
          )}

          {ids.map(id => (
            <TaskCard key={id} data={state.tasks[id]} state={state} />
          ))}
          {isFetching && <Loading />}
          {!isFetching &&
            pagination &&
            pagination.total > pagination.limit &&
            pagination.total > ids.length && (
              <Button
                size="md"
                className={sCard.button}
                onClick={() =>
                  this.handlePaginationUpdate(
                    pagination.offset + pagination.limit,
                  )
                }
              >
                Загрузить ещё
              </Button>
            )}
        </Col>
      </Row>
    );
  }
}

const pickState = ({ tasks, contacts, leads, pagination }) => ({
  state: { tasks, contacts, leads, pagination },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...TasksActions }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(TasksList);
