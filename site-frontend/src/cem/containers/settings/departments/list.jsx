import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DepartmentsActions from 'cem/actions/settings/departments';

import UI from 'cem/components/ui';
const {
  Loading, Table, Heading,
  Grid: { Container, Row, Col },
} = UI;

import DepartmentRecordForm from 'cem/components/settings/departments/list/recordForm';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Departments extends Component {
  componentWillMount() {
    this.props.actions.loadDepartments({ pagination: { limit: 256 } });
  }

  render() {
    const { actions, state, hasRight } = this.props;
    const { items = [], isFetching } = state.departments.list;

    const isCreationAllowed = hasRight('department_create');
    const isUpdateAllowed = hasRight('department_update');

    return (
      <section className={s.section}>
        <Container fluid>
          <Row>
            <Col xs="20">
              <Heading size="md">Департаменты</Heading>
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
                  {isCreationAllowed && <DepartmentRecordForm actions={actions} formKey="create" isUpdateAllowed />}
                  {items.map(item =>
                    <DepartmentRecordForm actions={actions} key={item.id} formKey={item.id.toString()} initialValues={item} isUpdateAllowed={isUpdateAllowed} />,
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

const pickState = ({ departments }) => ({
  state: { departments },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...DepartmentsActions }, dispatch),
});

export default connect(pickState, pickActions)(Departments);
