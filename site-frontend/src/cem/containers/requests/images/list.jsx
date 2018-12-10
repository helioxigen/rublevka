import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import ImagesRequestsActions from 'cem/actions/requests/images';

import UI from 'cem/components/ui';
const {
  Button, Icon, Heading,
  Grid: { Container, Row, Col },
} = UI;
import LaneHeader from 'cem/components/requests/images/list/laneHeader';
import Lane from 'cem/components/requests/images/list/lane';
import Filter from 'cem/components/requests/images/filter';

import s from 'cem/styles/components/header';
import sButton from 'cem/styles/buttons';
import sDeals from 'cem/styles/deals/deals';

import { lanes } from 'cem/constants/requests/images/dictionaries';

class ListContainer extends Component {
  render() {
    const { state, actions } = this.props;

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">Активные заявки на фото и планировки</Heading>
                <Button className={sButton.btnTo} size="xs" to="/requests/properties/images/archive">
                  <Icon className={s.iconArchive} icon="archive" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Filter count={0} />
            </Row>
          </div>
        </Container>
        <section className={s.scrollX}>
          <Container fluid className={s.width120}>
            <Row className={sDeals.row}>
              {Object.keys(lanes).map((key, index) => {
                const { total = 0 } = state.pagination[`imagesRequests.${key}`] || {};
                return (
                  <Col key={index} xs="5">
                    <LaneHeader laneKey={key} count={total} />
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col xs="5" className={sDeals.column}>
                <Lane laneKey="new" actions={actions} state={state} />
              </Col>
              <Col xs="5" className={sDeals.column}>
                <Lane laneKey="inProgress" actions={actions} state={state} />
              </Col>
              <Col xs="5" className={sDeals.column}>
                <Lane laneKey="managerApproval" actions={actions} state={state} />
              </Col>
              <Col xs="5" className={sDeals.column}>
                <Lane laneKey="originatorApproval" actions={actions} state={state} />
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    );
  }
}

const pickState = ({ auth, pagination, filters, users, imagesRequests }) => ({
  state: { auth, pagination, filters, users, imagesRequests },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ImagesRequestsActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, pickActions)(ListContainer);
