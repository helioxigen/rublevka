import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Button, Loading,
  Grid: { Container, Row, Col },
} = UI;
import Card from './card';

import sUtils from 'cem/styles/utils';

import isEqual from 'lodash/isEqual';

class Lane extends Component {
  componentWillMount() {
    const { actions, state, laneKey } = this.props;

    const filter = state.filters.imagesRequests || {};

    actions.loadImagesRequests(laneKey, { filter });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state, laneKey } = this.props;

    const pagination = state.pagination[`imagesRequests.${laneKey}`] || {};
    const nextPagination = nextProps.state.pagination[`imagesRequests.${laneKey}`] || {};

    const filter = state.filters.imagesRequests || {};
    const nextFilter = nextProps.state.filters.imagesRequests || {};

    const isPaginationUpdated = pagination.offset !== undefined && pagination.offset !== nextPagination.offset;
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      const isResultAppended = isPaginationUpdated && !isFilterUpdated && laneKey !== 'archive';
      actions.loadImagesRequests(laneKey, { pagination: { offset: isFilterUpdated ? 0 : nextPagination.offset, limit: nextPagination.limit }, filter: nextFilter }, isResultAppended);
    }
  }

  render() {
    const { actions, state, laneKey } = this.props;

    const { items = [], isFetching } = state.imagesRequests.list[laneKey] || {};
    const pagination = state.pagination[`imagesRequests.${laneKey}`] || {};

    return (
      <section>
        {items.map((item, index) =>
          <Card key={index} data={item} creatorUserData={state.users[item.createdByUserId] && state.users[item.createdByUserId].data} responsibleUserData={item.responsibleUserId && state.users[item.responsibleUserId] && state.users[item.responsibleUserId].data} />,
        )}
        <Container fluid>
          <Row xs="center">
            <Col className={sUtils.pushedTop2Bottom2}>
              {!isFetching && pagination.total > pagination.limit && pagination.total > items.length &&
                <Button size="xs" kind="accent" onClick={() => actions.updatePagination(`imagesRequests.${laneKey}`, { offset: pagination.offset + pagination.limit })}>
                  Загрузить следующие
                </Button>
              }
              {isFetching && <Loading />}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Lane;
