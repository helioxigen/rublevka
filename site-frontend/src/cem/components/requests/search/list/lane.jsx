import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Button,
  Loading,
  Grid: { Container, Row, Col },
} = UI;
import Card from './card';

import cn from 'classnames';
import s from 'cem/styles/deals/deals';

import isEqual from 'lodash/isEqual';

class Lane extends Component {
  componentWillMount() {
    const { actions, state, laneKey } = this.props;

    const filter = state.filters.searchRequests || {};

    actions.loadSearchRequests(laneKey, { filter });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state, laneKey } = this.props;

    const pagination = state.pagination[`searchRequests.${laneKey}`] || {};
    const nextPagination =
      nextProps.state.pagination[`searchRequests.${laneKey}`] || {};

    const filter = state.filters.searchRequests || {};
    const nextFilter = nextProps.state.filters.searchRequests || {};

    const isPaginationUpdated =
      pagination.offset && pagination.offset !== nextPagination.offset;
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      actions.loadSearchRequests(laneKey, {
        pagination: {
          offset: nextPagination.offset,
          limit: nextPagination.limit,
        },
        filter: nextFilter,
      });
    }
  }

  render() {
    const { actions, state, laneKey } = this.props;

    const { items = [], isFetching } = state.searchRequests.list[laneKey] || {};
    const pagination = state.pagination[`searchRequests.${laneKey}`] || {};

    return (
      <section>
        {items.map(item => (
          <Card
            key={item.id}
            data={item}
            creatorUserData={
              state.users[item.createdByUser.id] &&
              state.users[item.createdByUser.id].data
            }
            responsibleUserData={
              item.responsibleUser &&
              state.users[item.responsibleUser.id] &&
              state.users[item.responsibleUser.id].data
            }
          />
        ))}
        <Container fluid>
          <Row xs="center">
            <Col className={cn(s.pushedTop2, s.pushedBottom2)}>
              {!isFetching && pagination.total > pagination.limit && (
                <Button
                  size="xs"
                  kind="accent"
                  onClick={() =>
                    actions.updatePagination(`searchRequests.${laneKey}`, {
                      offset: pagination.offset + pagination.limit,
                    })
                  }
                >
                  Загрузить следующие
                </Button>
              )}
              {isFetching && <Loading />}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Lane;
