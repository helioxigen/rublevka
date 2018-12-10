import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { dictionaryKinds } from 'cem/constants/linked_contacts/form';

import UI from 'cem/components/ui';
const {
  Form, Button, AsyncSelect, Heading,
  Form: { Input },
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import FormField from 'cem/helpers/formField';
import { fetchDictionary } from 'cem/helpers/autocomplete';

import submitValidator from 'core/decorators/submitValidator';

const validate = values => {
  const errors = { details: {} };

  if (!values.details.firstName) errors.details.firstName = `Обязательно`;
  if (!values.details.phoneNumber) errors.details.phoneNumber = `Укажите номер телефона`;
  if (!values.kindId) errors.kindId = `Укажите роль`;

  return errors;
};

const formSettings = {
  form: `contactCreation`,
  fields: [`details.firstName`, `details.lastName`, `details.phoneNumber`, `kindId`],
  destroyOnUnmout: true,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(
  class extends Component {
    createAndLink(values) {
      const { actions, callback } = this.props;
      const { kindId, ...otherValues } = values;

      return actions.createContact(otherValues)
        .then(contactId => callback({ linkedContactId: contactId, kindId }))
        .then(() => this.props.closeModal())
        .catch(errors => Promise.resolve({ errors }));
    }

    render() {
      const {
        fields, handleSubmit,
        pristine, error, submitting,
        resource,
      } = this.props;

      const dictionaryKind = dictionaryKinds[resource];

      return (
        <Form.Container onSubmit={handleSubmit(::this.createAndLink)}>
          <Container fluid className={s.container}>
            <Row className={sUtils.pushedBottom3}>
              <Col xs="20">
                <Heading size="md">Привязка нового контакта</Heading>
              </Col>
            </Row>
            <Row>
              <Col sm="20">
                <FormField field={fields.details.firstName} label="Имя" float>
                  <Input block type="text" />
                </FormField>
              </Col>
            </Row>
            <Row>
              <Col sm="20">
                <FormField field={fields.details.lastName} label="Фамилия" float>
                  <Input block type="text" />
                </FormField>
              </Col>
            </Row>
            <Row>
              <Col sm="20">
                <FormField field={fields.details.phoneNumber} label="Телефон" float>
                  <Input block type="tel" mask="+7 (111) 111-11-11" placeholder="+7 (___) ___ - __ - __" autoComplete="off" />
                </FormField>
              </Col>
            </Row>
            <Row className={sUtils.pushedBottom1}>
              <Col sm="20">
                <FormField field={fields.kindId} label="Роль" float>
                  <AsyncSelect asyncOptions={fetchDictionary(dictionaryKind)} {...fields.kindId} valueKey="id" labelKey="title" />
                </FormField>
              </Col>
            </Row>
          </Container>
          <Button type="submit" block kind="success" className={sButton.btnWide} disabled={pristine || error || submitting}>Привязать контакт</Button>
        </Form.Container>
      );
    }
  }
));
