import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import UI from 'cem/components/ui';
const {
  Form, Button, AsyncSelect, Heading,
  Form: { Input },
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import FormField from 'cem/helpers/formField';
import { fetchDictionary } from 'cem/helpers/autocomplete';

import submitValidator from 'core/decorators/submitValidator';

const validate = values => {
  const errors = {
    details: {},
    companyDetails: {},
  };

  if (!values.details.firstName) errors.details.firstName = `Обязательно`;
  if (!values.details.phoneNumber) errors.details.phoneNumber = `Обязательно`;

  return errors;
};

const formSettings = {
  form: `companyContactCreation`,
  fields: [
    `id`,
    `details.firstName`,
    `details.lastName`,
    `details.phoneNumber`,
    `companyDetails.positionId`,
  ],
  destroyOnUnmout: true,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(
  class extends Component {
    onCreateSuccess() {
      const { companyId, actions, closeModal } = this.props;
      actions.pop(`success`, `Контакт создан и привязан`);
      actions.loadLinkedContacts(companyId);
      closeModal();
    }

    create(values) {
      const { companyId, actions } = this.props;

      return actions.createContact(companyId, values).then(() => this.props.onPreviousStep());
    }

    render() {
      const {
        fields, handleSubmit, pristine, error,
      } = this.props;

      return (
        <Form.Container onSubmit={handleSubmit(::this.create, ::this.onCreateSuccess)}>
          <Container fluid className={s.container}>
            <Row>
              <Col xs="20">
                <Heading size="md" className={sUtils.pushedBottom2}>Добавить контакт?</Heading>
                <p className={sUtils.pushedBottom3}>Контакт с номером телефона {fields.details.phoneNumber.value} не был найден, но вы можете его создать</p>
              </Col>
            </Row>
            <Row>
              <Col sm="20">
                <FormField field={fields.details.phoneNumber} label="Телефон" float>
                  <Input block type="tel" /* mask="+7 (111) 111-11-11" placeholder="+7 (___) ___ - __ - __" autoComplete="off" */ value={fields.details.phoneNumber.value} />
                </FormField>
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
            <Row className={sUtils.pushedBottom1}>
              <Col sm="20">
                <FormField field={fields.companyDetails.positionId} label="Должность" float>
                  <AsyncSelect valueKey="id" labelKey="title" asyncOptions={fetchDictionary(`contact_position`)} {...fields.companyDetails.positionId} />
                </FormField>
              </Col>
            </Row>
          </Container>
          <Button type="button" className={cn(sButton.btnWide, sUtils.btnWidth30)} onClick={() => this.props.onPreviousStep()}>Назад</Button>
          <Button type="submit" kind="success" className={cn(sButton.btnWide, sUtils.btnWidth70)} disabled={pristine || error}>Добавить новый контакт</Button>
        </Form.Container>
      );
    }
  }
));
