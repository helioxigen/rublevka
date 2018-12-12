import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PositionsActions from 'cem/actions/settings/positions';

import UI from 'cem/components/ui';
const {
  Loading, Table, Heading,
  Grid: { Container, Row, Col },
} = UI;

import PositionRecordForm from 'cem/components/settings/positions/list/recordForm';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Positions extends Component {
  componentWillMount() {
    this.props.actions.loadPositions({ pagination: { limit: 256 } });
  }

  render() {
    const { actions, state, hasRight } = this.props;
    const { items = [], isFetching } = state.positions.list;

    const isCreationAllowed = hasRight('role_create');

    const createFormInitialValues = {
      // TODO This value must be defined based on current user's right for admins creation
      isAdmin: false,

      permissions: {},
    };

    return (
      <section className={s.section}>
        <Container fluid>
          <Row>
            <Col xs="20">
              <Heading size="md">Должности</Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20" className={sUtils.pushedBottom3}>
              {!isFetching &&
                <Table.Container width="100%">
                  <Table.Row>
                    <Table.Heading width="85%">Название</Table.Heading>
                    <Table.Heading width="15%">Действия</Table.Heading>
                  </Table.Row>
                  {isCreationAllowed && <PositionRecordForm actions={actions} formKey="create" initialValues={createFormInitialValues} />}
                  {items.map(item =>
                    <PositionRecordForm actions={actions} key={item.id} formKey={item.id.toString()} initialValues={item} />,
                  )}
                </Table.Container>
              }
              {isFetching && <Loading />}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const pickState = ({ positions }) => ({
  state: { positions },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...PositionsActions }, dispatch),
});

export default connect(pickState, pickActions)(Positions);
