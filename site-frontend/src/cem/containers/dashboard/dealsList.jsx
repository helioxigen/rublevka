import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import UI from 'cem/components/ui';
const {
  Loading, Button, Heading,
  Grid: { Row, Col },
} = UI;

import CountIndicator from 'cem/components/common/countIndicator';

import DealCard from 'cem/components/dashboard/cards/dealCard';

import DealsActions from 'cem/actions/deals';

import sUtils from 'cem/styles/utils';
import sCard from 'cem/styles/dashboard/taskCard';

class DealsList extends Component {
  componentWillMount() {
    const { actions, kind, limit = 5 } = this.props;

    actions.loadDeals(kind, { pagination: { limit } });
  }

  handlePaginationUpdate(offset) {
    const { actions, kind, state } = this.props;

    const pagination = state.pagination[`deals.${kind}`] || {};

    actions.loadDeals(kind, { pagination: { offset, limit: pagination.limit } }, true);
  }

  render() {
    const { state, declensionForms, kind } = this.props;

    const pagination = state.pagination[`deals.${kind}`] || {};

    const { ids = [], isFetching, errors = [] } = state.deals.lists[kind];

    return (
      <Row className={sUtils.pushedBottom6}>
        <Col xs="20">
          <Heading size="sm" className={sUtils.fontSizeMd}>
            <span className={sUtils.alignMiddle}>
              <CountIndicator count={pagination.total} declensionForms={declensionForms} />
            </span>
          </Heading>
        </Col>
        <Col xs="20">
          {!isFetching && !!errors.length && <ListErrorMessage errors={errors} />}
          {!isFetching && !errors.length && !ids.length && <Heading notFound className={sUtils.resetIndent}>Сделок нет</Heading>}

          {ids.map(id =>
            <DealCard key={id} data={state.deals[id].data} state={state} />,
          )}
          {isFetching && <Loading />}
          {!isFetching
            && pagination
            && pagination.total > pagination.limit
            && pagination.total > ids.length
            && (
              <Button size="md" className={sCard.button} onClick={() => this.handlePaginationUpdate(pagination.offset + pagination.limit)}>
                Загрузить ещё
              </Button>
            )
          }
        </Col>
      </Row>
    );
  }
}

const pickState = ({ deals, contacts, pagination }) => ({
  state: { deals, contacts, pagination },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...DealsActions }, dispatch),
});

export default connect(pickState, pickActions)(DealsList);
