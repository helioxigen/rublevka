import React, { Component } from 'react';

import { listResourcer } from 'core/decorators/fetcher';

import UI from 'cem/components/ui';
const {
  Table,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import ApplicationRecordForm from 'cem/components/settings/applications/list/recordForm';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Applications extends Component {
  render() {
    const { actions, items = [], hasRight } = this.props;

    const isCreationAllowed = hasRight('application_create');
    const isUpdateAllowed = hasRight('application_update');

    return (
      <section className={s.section}>
        <Container fluid>
          <Row>
            <Col xs="20">
              <Heading size="md">Приложения</Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20" className={sUtils.pushedBottom3}>
              <Table.Container width="100%">
                <Table.Row>
                  <Table.Heading width="25%">Название</Table.Heading>
                  <Table.Heading width="25%">Роль</Table.Heading>
                  <Table.Heading width="23%">
                    Ответственный пользователь
                  </Table.Heading>
                  <Table.Heading width="17%">Состояние</Table.Heading>
                  <Table.Heading width="10%">Действия</Table.Heading>
                </Table.Row>
                {isCreationAllowed && (
                  <ApplicationRecordForm
                    actions={actions}
                    formKey="create"
                    initialValues={{ state: 'disabled' }}
                    isUpdateAllowed
                  />
                )}
                {items.map(item => (
                  <ApplicationRecordForm
                    actions={actions}
                    key={item.id}
                    formKey={item.id.toString()}
                    initialValues={item}
                    isUpdateAllowed={isUpdateAllowed}
                  />
                ))}
              </Table.Container>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default listResourcer({
  id: 'applications',
  linkedResourcesSchemes: [
    {
      typeId: 'users',
      primaryKeyPath: 'responsibleUserId',
      apiPath: '/v1/users/staff',
    },
  ],
})(Applications);
