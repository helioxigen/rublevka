import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DivisionsActions from 'cem/actions/settings/divisions';
import { pop } from 'cem/actions/toastr';

import UI from 'cem/components/ui';
const {
  Loading,
  Table,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import DivisionRecordForm from 'cem/components/settings/divisions/list/recordForm';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Divisions extends Component {
  componentWillMount() {
    this.props.actions.loadDivisions({ pagination: { limit: 256 } });
  }

  render() {
    const { actions, state, hasRight } = this.props;
    const { items = [], isFetching } = state.divisions.list;

    const isCreationAllowed = hasRight('division_create');
    const isUpdateAllowed = hasRight('division_update');

    return (
      <section className={s.section}>
        <Container fluid>
          <Row>
            <Col xs="20">
              <Heading size="md">Отделы</Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20" className={sUtils.pushedBottom3}>
              {!isFetching && (
                <Table.Container width="100%">
                  <Table.Row>
                    <Table.Heading width="50%">Название</Table.Heading>
                    <Table.Heading width="35%">Департамент</Table.Heading>
                    <Table.Heading width="15%">Действия</Table.Heading>
                  </Table.Row>
                  {isCreationAllowed && (
                    <DivisionRecordForm
                      actions={actions}
                      formKey="create"
                      isUpdateAllowed
                    />
                  )}
                  {items.map(item => (
                    <DivisionRecordForm
                      actions={actions}
                      key={item.id}
                      formKey={item.id.toString()}
                      initialValues={item}
                      isUpdateAllowed={isUpdateAllowed}
                    />
                  ))}
                </Table.Container>
              )}
              {isFetching && <Loading />}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const pickState = ({ divisions }) => ({
  state: { divisions },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...DivisionsActions, pop }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Divisions);
