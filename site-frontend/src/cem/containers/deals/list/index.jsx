import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import lanesConfig from 'cem/constants/deals/lanes';
import DealsActions from 'cem/actions/deals';
import { loadContacts } from 'cem/_contacts/old_actions/list';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import Lane from './lane';
import Filter from 'cem/components/deals/list/filter';
import LaneHeader from 'cem/components/deals/list/laneHeader';

import s from 'cem/styles/components/header';
import sDeals from 'cem/styles/deals/deals';

import * as dict from 'cem/constants/deals/dictionaries';

import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';

const lanesArray = Object.keys(dict.lanes).map(key => key);

class ListContainer extends Component {
  componentWillMount() {
    const { actions, state } = this.props;
    const filters = state.filters.deals || {};

    actions.loadStats('agency_fee', {
      filter: filters,
      filterNot: {
        'stateDetails.toApprove': 'unsuccessful,successful',
      },
    });
    actions.loadStats('agency_fee', {
      filter: {
        ...filters,
        'stateDetails.toApprove': 'unsuccessful',
      },
    }, 'unsuccessful');
    actions.loadStats('agency_fee', {
      filter: {
        ...filters,
        'stateDetails.toApprove': 'successful',
      },
    }, 'successful');
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state } = this.props;

    const lanesState = Object.keys(state.deals).filter(kindKey => lanesArray.indexOf(kindKey) > -1).map(kindKey => state.deals[kindKey]);
    const nextLanesState = Object.keys(nextProps.state.deals).filter(kindKey => lanesArray.indexOf(kindKey) > -1).map(kindKey => nextProps.state.deals[kindKey]);

    const isEveryLaneStateComplete = lanesState.every(laneState => laneState.isComplete);
    const isEveryNextLaneStateComplete = nextLanesState.every(laneState => laneState.isComplete);

    if (!isEveryLaneStateComplete && isEveryNextLaneStateComplete) {
      const contactIds = uniq(nextLanesState.reduce((result, laneState) => [
        ...result,
        ...laneState.items.filter(item =>
            item.contactDetails && item.contactDetails.id && !nextProps.state.contacts[item.contactDetails.id],
          ).map(item => item.contactDetails.id),
      ], []));

      if (contactIds.length) actions.loadContacts({ filter: { id: contactIds }, pagination: { limit: 256 } });
    }

    const filters = state.filters.deals || {};
    const nextFilters = nextProps.state.filters.deals || {};

    if (!isEqual(nextFilters, filters)) {
      actions.loadStats('agency_fee', {
        filter: nextFilters,
        filterNot: {
          'stateDetails.toApprove': 'unsuccessful,successful',
        },
      });
      actions.loadStats('agency_fee', {
        filter: {
          ...nextFilters,
          'stateDetails.toApprove': 'unsuccessful',
        },
      }, 'unsuccessful');
      actions.loadStats('agency_fee', {
        filter: {
          ...nextFilters,
          'stateDetails.toApprove': 'successful',
        },
      }, 'successful');
    }
  }

  render() {
    const { state } = this.props;

    const filters = state.filters.deals || {};
    const { state: stateFilter } = filters;

    const agencyFeeStats = state.deals.stats.agency_fee;
    const dealsState = state.deals;

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">Активные сделки</Heading>
              </Col>
            </Row>
            <Row>
              <Filter />
            </Row>
          </div>
        </Container>

        <section className={s.scrollX}>
          <Container fluid className={s.width120}>
            <Row className={sDeals.row}>
              {Object.keys(dict.lanes).map((laneKey, index) => {
                const { pagination = {} } = dealsState[laneKey] || {};
                const { total = 0 } = pagination;
                return (
                  <Col key={index} xs="4">
                    <LaneHeader laneKey={laneKey} count={total} stats={agencyFeeStats} stateFilter={stateFilter} />
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs="4" className={sDeals.column}>
                <Lane config={lanesConfig.presentation} filter={filters} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane config={lanesConfig.negotiation} filter={filters} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane config={lanesConfig.deposit_paid} filter={filters} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane config={lanesConfig.agreement} filter={filters} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane config={lanesConfig.approval} filter={filters} />
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    );
  }
}

const pickState = ({ auth, filters, deals, fetcher, pagination, contacts }) => ({
  state: { auth, filters, deals, fetcher, pagination, contacts },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...DealsActions, loadContacts }, dispatch),
});

export default connect(pickState, pickActions)(ListContainer);
