import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DealsActions from 'cem/actions/deals';

import Card from 'cem/components/deals/list/card';

import UI from 'cem/components/ui';
const {
  Button,
  Loading,
  Grid: { Container, Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

class Lane extends Component {
  componentWillMount() {
    const { actions, config, filter } = this.props;

    const queryParams = {
      filter: { ...config.filter, ...filter },
      filterNot: config.filterNot,
      pagination: {},
    };

    actions.loadLane(config.kind, queryParams, true);
  }

  componentWillReceiveProps(nextProps) {
    const { filter, actions } = this.props;
    const { filter: nextFilter, config: nextConfig } = nextProps;

    if (!isEqual(filter, nextFilter)) {
      const queryParams = {
        filter: { ...nextConfig.filter, ...nextFilter },
        filterNot: nextConfig.filterNot,
        pagination: { offset: 0 },
      };

      actions.loadLane(nextConfig.kind, queryParams, true);
    }
  }

  handlePaginationUpdate(offset) {
    const { actions, filter, config } = this.props;

    const queryParams = {
      filter: { ...config.filter, ...filter },
      filterNot: { ...config.filterNot },
      pagination: { offset },
    };

    actions.loadLane(config.kind, queryParams);
  }

  render() {
    const { config, state } = this.props;
    const { items, isFetching, pagination } = state.deals[config.kind] || {};

    return (
      <section>
        {items &&
          items.map((item, index) => {
            const contact = state.contacts[item.contactDetails.id];
            return (
              <Card data={item} key={index} linkedContact={{ data: contact }} />
            );
          })}
        <Container fluid>
          <Row xs="center">
            <Col className={sUtils.pushedTop2Bottom2}>
              {pagination &&
                pagination.total > pagination.limit &&
                pagination.total > items.length && (
                  <Button
                    size="xs"
                    kind="accent"
                    onClick={() =>
                      this.handlePaginationUpdate(
                        pagination.offset + pagination.limit,
                      )
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

const pickState = ({ deals, contacts }) => ({
  state: { deals, contacts },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ loadLane: DealsActions.loadLane }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Lane);
