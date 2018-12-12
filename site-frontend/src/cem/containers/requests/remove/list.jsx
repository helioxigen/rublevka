import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import RemovalRequestsActions from 'cem/actions/requests/remove';

import UI from 'cem/components/ui';
const {
  Button, Icon, Heading,
  Grid: { Container, Row, Col },
} = UI;
import LaneHeader from 'cem/components/requests/remove/list/laneHeader';
import Lane from 'cem/components/requests/remove/list/lane';
import Filter from 'cem/components/requests/remove/filter';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDeals from 'cem/styles/deals/deals';

import { lanes } from 'cem/constants/requests/remove/dictionaries';

class ListContainer extends Component {
  render() {
    const { state, actions } = this.props;

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">Активные заявки на удаление объекта</Heading>
                <Button className={sButton.btnTo} size="xs" to="/requests/properties/to_remove/archive"><Icon className={s.iconArchive} icon="archive" /></Button>
              </Col>
            </Row>
            <Row>
              <Filter count={0} />
            </Row>
          </div>
        </Container>
        <section className={sUtils.scrollX}>
          <Container fluid className={sUtils.width60}>
            <Row className={sDeals.row}>
              {Object.keys(lanes).map((key, index) => {
                const { total = 0 } = state.pagination[`removalRequests.${key}`] || {};
                return (
                  <Col key={index} xs="10">
                    <LaneHeader laneKey={key} count={total} />
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs="10" className={sDeals.column}>
                <Lane laneKey="managerApproval" actions={actions} state={state} />
              </Col>
              <Col xs="10" className={sDeals.column}>
                <Lane laneKey="hubManagerApproval" actions={actions} state={state} />
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    );
  }
}

const pickState = ({ auth, pagination, filters, users, removalRequests }) => ({
  state: { auth, pagination, filters, users, removalRequests },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...RemovalRequestsActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, pickActions)(ListContainer);
