import React, { Component } from 'react';

import { connect } from 'react-redux';
import { dispatch } from 'cem/store';

// actions
import loadTasks from 'cem/_tasks/actions/loadList';

// components
import Pagination from 'core/containers/pagination';
import Card from './card';

// import ListErrorMessage from 'cem/components/common/listErrorMessage';

// ui
import UI from 'cem/components/ui';
const {
  Button,
  Loading,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

// helpers
import { objectToQueryString } from 'core/helpers';
import isUpdated from 'core/helpers/isUpdated';

// constants
import { resourceName } from 'cem/_tasks/constants/defaults';

class TasksTimeline extends Component {
  constructor(props) {
    super(props);

    this.group = props.group;
    this.resource = `${resourceName}.${this.group}`;
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(this.resource, this.props, nextProps)) {
      this.load(nextProps);
    }
  }

  load({ filters, pagination, pk, id }) {
    const queryParams = {
      filter: {
        ...filters[this.resource],
        [pk]: id,
      },
      pagination: pagination[this.resource],
    };

    dispatch(loadTasks(queryParams, this.group));
  }

  render() {
    const {
      isTaskCreationAllowed,
      propertyCardHidden,
      taskCreationParams,

      _tasks,
    } = this.props;

    const { ids = [], isFetching } = _tasks[this.group] || {};
    const hasItems = !!ids.length;

    return (
      <Row>
        <section className={s.section}>
          <div className={sUtils.pushedBottom1_5}>
            <Heading size="md">
              Задачи
              {isTaskCreationAllowed && hasItems && (
                <Button
                  className={sUtils.pushedLeftSm2}
                  to={`/tasks/create?${objectToQueryString(
                    taskCreationParams,
                  )}`}
                  kind="primary"
                >
                  Поставить
                </Button>
              )}
            </Heading>
          </div>
          <div>
            {!isFetching && !hasItems && (
              <div className={sUtils.textCenter}>
                <Heading notFound className={sUtils.pushedBottom1_5}>
                  Нет задач 😟
                </Heading>

                {isTaskCreationAllowed && (
                  <Button
                    to={`/tasks/create?${objectToQueryString(
                      taskCreationParams,
                    )}`}
                    kind="primary"
                  >
                    Поставить
                  </Button>
                )}
              </div>
            )}
            {isFetching && <Loading />}
            {ids.map(id => (
              <Card
                key={id}
                taskId={id}
                propertyCardHidden={propertyCardHidden}
              />
            ))}
            {hasItems && (
              <Container fluid>
                <Row xs="center" className={sUtils.textCenter}>
                  <Col sm="10" className={sUtils.pushed6_0}>
                    <Pagination resource={this.resource} isScrollToTop />
                  </Col>
                </Row>
              </Container>
            )}
          </div>
        </section>
      </Row>
    );
  }
}
const pickState = ({ _tasks, filters, pagination, order }) => ({
  _tasks,
  filters,
  pagination,
  order,
});

export default connect(pickState)(TasksTimeline);
