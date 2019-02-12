import React, { Component } from 'react';

import { API } from 'core/config/sources';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Heading,
  Form: { Input },
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import FormField from 'cem/helpers/formField';

const validate = values => {
  const errors = {
    details: {},
  };

  if (!values.details.phoneNumber) errors.details.phoneNumber = `Обязательно`;

  return errors;
};

const formSettings = {
  form: `companyContactLinking`,
  fields: [`details.phoneNumber`],
  destroyOnUnmout: true,
  validate,
};

export default reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      onLinkSuccess(data) {
        const { companyId, actions, closeModal } = this.props;
        actions.pop(`success`, `Контакт (ID: ${data.id})`, `Успешно привязан`);
        actions.loadLinkedContacts(companyId);
        closeModal();
      }

      link(values) {
        const {
          companyId,
          actions,
          onNextStep,
          resetPhoneNumber,
          closeModal,
        } = this.props;

        return new Promise(resolve => {
          API.get(`/v1/contacts`, {
            filter: { 'details.phoneNumber': values.details.phoneNumber },
          }).then(({ body: { items } }) => {
            const contactData = items[0];
            if (
              contactData &&
              contactData.companyDetails &&
              contactData.companyDetails.companyId !== companyId
            ) {
              resolve(actions.updateLinkedContact(companyId, contactData));
              resetPhoneNumber();
            } else if (
              contactData &&
              contactData.companyDetails &&
              contactData.companyDetails.companyId === companyId
            ) {
              actions.pop(
                `warning`,
                `Контакт с этим номером уже привязан к данной компании`,
              );
              resetPhoneNumber();
              closeModal();
            } else if (!contactData) {
              onNextStep(values.details.phoneNumber);
            }
          });
        });
      }

      render() {
        const { fields, handleSubmit, pristine, error } = this.props;

        return (
          <Form.Container
            onSubmit={handleSubmit(::this.link, ::this.onLinkSuccess)}
          >
            <Container fluid className={s.container}>
              <Row>
                <Col xs="20">
                  <Heading size="md" className={sUtils.pushedBottom2}>
                    Добавить контакт
                  </Heading>
                  <p className={sUtils.pushedBottom3}>Введите номер телефона</p>
                </Col>
              </Row>
              <Row>
                <Col sm="20">
                  <FormField field={fields.details.phoneNumber} label="Телефон">
                    <Input
                      block
                      type="tel"
                      /* mask="+7 (111) 111-11-11" placeholder="+7 (___) ___ - __ - __" */ autoComplete="off"
                    />
                  </FormField>
                </Col>
              </Row>
            </Container>
            <Button
              type="submit"
              block
              kind="success"
              className={sButton.btnWide}
              disabled={
                (pristine && fields.details.phoneNumber === undefined) || error
              }
            >
              Привязать контакт
            </Button>
          </Form.Container>
        );
      }
    },
  ),
);
