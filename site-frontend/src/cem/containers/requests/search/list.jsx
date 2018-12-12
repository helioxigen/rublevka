import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import SearchRequestsActions from 'cem/actions/requests/search';

import UI from 'cem/components/ui';
const {
  Button, Icon, Heading,
  Grid: { Container, Row, Col },
} = UI;
import LaneHeader from 'cem/components/requests/search/list/laneHeader';
import Lane from 'cem/components/requests/search/list/lane';
import Filter from 'cem/components/requests/search/filter';

import cn from 'classnames';
import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDeals from 'cem/styles/deals/deals';

import { lanes } from 'cem/constants/requests/search/dictionaries';

class ListContainer extends Component {
  render() {
    const { state, actions } = this.props;

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">Активные заявки на поиск объектов недвижимости</Heading>
                <Button className={sButton.btnTo} size="xs" to="/requests/properties/search/archive">
                  <Icon className={s.iconArchive} icon="archive" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Filter count={0} />
            </Row>
          </div>
        </Container>
        <section className={sUtils.scrollXMd}>
          <Container fluid className={sUtils.width122}>
            <Row className={cn(sDeals.row, sDeals.wrapper)}>
              {Object.keys(lanes).map((key, index) => {
                const { items = [] } = state.searchRequests.list[key] || {};
                return (
                  <Col key={index} xs="4">
                    <LaneHeader laneKey={key} count={items.length} />
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs="4" className={sDeals.column}>
                <Lane laneKey="new" actions={actions} state={state} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane laneKey="assigned" actions={actions} state={state} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane laneKey="inProgress" actions={actions} state={state} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane laneKey="done" actions={actions} state={state} />
              </Col>
              <Col xs="4" className={sDeals.column}>
                <Lane laneKey="approved" actions={actions} state={state} />
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    );
  }
}

const pickState = ({ auth, pagination, filters, users, searchRequests }) => ({
  state: { auth, pagination, filters, users, searchRequests },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...SearchRequestsActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, pickActions)(ListContainer);
