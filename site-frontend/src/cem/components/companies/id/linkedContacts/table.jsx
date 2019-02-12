import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Table: { Container, Row, Heading },
} = UI;

import TableRowForm from './tableRowForm';

import sUtils from 'cem/styles/utils';

class LinkedContactsTable extends Component {
  render() {
    const { companyId, items, actions, isUpdateAllowed } = this.props;

    return (
      <Container width="100%" className={sUtils.width120}>
        <Row>
          <Heading width="10%">ID</Heading>
          <Heading width="20%">ФИО</Heading>
          <Heading width="15%">Телефон</Heading>
          <Heading width="15%">E-mail</Heading>
          <Heading width="30%">Должность</Heading>
          <Heading width="10%">Действия</Heading>
        </Row>
        {items.map((item, index) => (
          <TableRowForm
            key={index}
            companyId={companyId}
            actions={actions}
            formKey={item.id.toString()}
            initialValues={item}
            data={item}
            isUpdateAllowed={isUpdateAllowed}
          />
        ))}
      </Container>
    );
  }
}

export default LinkedContactsTable;
