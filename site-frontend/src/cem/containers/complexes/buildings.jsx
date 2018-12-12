import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComplexBuildingsActions from 'cem/actions/complexBuildings';
import { pop } from 'cem/actions/toastr';

import Pagination from 'core/containers/pagination';

import UI from 'cem/components/ui';
const {
  Loading, Button, Heading,
  Grid: { Container, Row, Col },
} = UI;

import Card from 'cem/components/complexes/id/about/buildings/card';
import CountIndicator from 'cem/components/common/countIndicator';

import sUtils from 'cem/styles/utils';

class Buildings extends Component {
  componentWillMount() {
    const { actions, params: { id } } = this.props;

    actions.loadComplexBuildings(id, { filter: { complexId: id } });
  }

  handlePaginationUpdate({ offset }) {
    const { actions, params: { id } } = this.props;

    actions.loadComplexBuildings(id, { pagination: { offset }, filter: { complexId: id } });
  }

  render() {
    const { state, params: { id }, isBuildingCreationAllowed } = this.props;
    const { items = [], isFetching } = state.complexBuildingsByComplexId[id] || {};

    return (
      <div>
        <Heading size="md" className={sUtils.pushedBottom3}>
          {!isFetching && !!items.length && <CountIndicator count={items.length} declensionForms={[`корпус`, `корпуса`, `корпусов`]} />}
          {isBuildingCreationAllowed && <Button className={sUtils.pushedLeftSm2} kind="accent" size="xs" to={`/places/complexes/buildings/create?complexId=${id}`}>добавить</Button>}
        </Heading>
        {!isFetching && !!items.length &&
          items.map(item =>
            <Card key={item.id} data={item} isUpdateAllowed={false} />
          )
        }
        {isFetching && <Loading />}
        {!isFetching && !items.length && <Heading notFound>Нет связанных корпусов</Heading>}
        {!isFetching && !!items.length &&
          <Container fluid>
            <Row xs="center">
              <Col xs="20" className={sUtils.pushedTop6}>
                <Pagination kind="complexBuildingsByComplexId" onUpdate={::this.handlePaginationUpdate} />
              </Col>
            </Row>
          </Container>
        }
      </div>
    );
  }
}

const pickState = ({ auth, complexBuildingsByComplexId }) => ({
  state: { auth, complexBuildingsByComplexId },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ ...ComplexBuildingsActions, pop }, dispatch),
});

export default connect(pickState, pickActions)(Buildings);
