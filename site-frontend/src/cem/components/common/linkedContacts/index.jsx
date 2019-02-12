import React, { Component } from 'react';

import ContactForm from './form.jsx';
import ContactCreationModal from 'cem/containers/common/linkedContacts/modal.jsx';

import UI from 'cem/components/ui';
const {
  Table,
  Heading,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

export default class Contacts extends Component {
  render() {
    const { items = [], actions, isContactLinkingAllowed = true } = this.props;

    return (
      <section className={sUtils.pushedBottom6}>
        <Row>
          <Col xs="20">
            <Heading size="md">
              Контакты
              {isContactLinkingAllowed && (
                <ContactCreationModal
                  callback={actions.create}
                  resource={this.props.resource}
                />
              )}
            </Heading>

            {!!items.length && (
              <div className={sUtils.scrollX}>
                <Table.Container width="100%" className={sUtils.width120}>
                  <Table.Row>
                    <Table.Heading width="30%">Контакт</Table.Heading>
                    <Table.Heading width="30%">Телефон</Table.Heading>
                    <Table.Heading width="30%">Роль</Table.Heading>
                    <Table.Heading width="10%">Действия</Table.Heading>
                  </Table.Row>

                  {items.map((item, index) => (
                    <ContactForm
                      key={index}
                      actions={actions}
                      formKey={item.linkedContactId}
                      initialValues={item}
                      resource={this.props.resource}
                      isContactLinkingAllowed={isContactLinkingAllowed}
                    />
                  ))}
                </Table.Container>
              </div>
            )}
            {!items.length && (
              <Heading notFound>Нет связанных контактов</Heading>
            )}
          </Col>
        </Row>
      </section>
    );
  }
}
