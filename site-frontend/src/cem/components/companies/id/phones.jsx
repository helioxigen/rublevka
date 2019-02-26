import React, { Component } from 'react';
import omit from 'lodash/omit';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Table,
  Tooltip,
  Button,
  Icon,
  Heading,
  Grid: { Row, Col },
  Form: { Input },
} = UI;

import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

import { reduxForm } from 'redux-form';
const formSettings = {
  form: `companyPhones`,
  fields: [`name`, `phone`],
  validate: ({ name, phone }) => ({
    name: !name && `Обязательно`,
    phone: !phone && `Обязательно`,
  }),
};

const Form = reduxForm(formSettings)(
  class extends Component {
    createOrUpdate() {
      const {
        formKey,
        values,
        addPhone,
        modifyPhone,
        destroyForm,
      } = this.props;

      if (formKey === `create`) {
        addPhone(values.name, values.phone);
        destroyForm();
      }
      if (formKey !== `create`) modifyPhone(formKey, values.name, values.phone);
    }

    render() {
      const {
        formKey,
        fields,
        handleSubmit,
        removePhone,
        isStatic,
      } = this.props;

      return (
        <Table.Row>
          <Table.Cell>
            <FormField
              className={sUtils.resetIndentation}
              field={fields.name}
              sideHelper
            >
              <Input
                className={s.tableInput}
                type="text"
                placeholder="Название"
              />
            </FormField>
          </Table.Cell>
          <Table.Cell>
            <FormField
              className={sUtils.resetIndentation}
              field={fields.phone}
              sideHelper
            >
              <Input
                className={s.tableInput}
                type="text"
                placeholder="Телефон"
              />
            </FormField>
          </Table.Cell>
          <Table.Cell>
            {formKey === `create` && (
              <Tooltip
                className={sUtils.pushedRight1}
                title="Добавить"
                position="top"
              >
                <Button
                  className={sButton.btnTableAction}
                  type="button"
                  onClick={handleSubmit(::this.createOrUpdate)}
                  disabled={isStatic}
                >
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Tooltip>
            )}
            {formKey !== `create` && (
              <Tooltip
                className={sUtils.pushedRight1}
                title="Редактировать"
                position="top"
              >
                <Button
                  className={sButton.btnTableAction}
                  onClick={handleSubmit(::this.createOrUpdate)}
                  disabled={isStatic}
                >
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Tooltip>
            )}
            {formKey !== `create` && (
              <Tooltip title="Удалить" position="top">
                <Button
                  className={sButton.btnTableAction}
                  type="button"
                  onClick={() => removePhone(formKey)}
                  disabled={isStatic}
                >
                  <Icon className={s.btnIcon} icon="delete" />
                </Button>
              </Tooltip>
            )}
          </Table.Cell>
        </Table.Row>
      );
    }
  },
);

export default class Phones extends Component {
  addPhone(name, phone) {
    const { field, actions } = this.props;
    const value = { ...field.value, [name]: phone };
    actions.pop(`success`, `Телефон добавлен`);
    field.onChange(value);
    setTimeout(this.props.onChange, 10);
  }

  modifyPhone(name, newName, phone) {
    const { field, actions } = this.props;
    const value = { ...omit(field.value, name), [newName]: phone };
    actions.pop(`success`, `Телефон изменён`);
    field.onChange(value);
    setTimeout(this.props.onChange, 10);
  }

  removePhone(name) {
    const { field, actions } = this.props;
    const value = omit(field.value, name);
    actions.pop(`success`, `Телефон удалён`);
    field.onChange(value);
    setTimeout(this.props.onChange, 10);
  }

  render() {
    const { field, isStatic } = this.props;

    return (
      <section>
        <Heading size="md">Телефоны</Heading>
        {field.error && field.touched && (
          <span className={s.textError}>{field.error}</span>
        )}
        <Row className={sUtils.pushedBottom6}>
          <Col xs="20">
            <Table.Container width="100%">
              <Table.Row>
                <Table.Heading width="45%">Название</Table.Heading>
                <Table.Heading width="45%">Номер</Table.Heading>
                <Table.Heading width="10%">Действия</Table.Heading>
              </Table.Row>
              <Form
                formKey="create"
                addPhone={::this.addPhone}
                isStatic={isStatic}
              />
              {field.value &&
                Object.keys(field.value).map((key, index) => (
                  <Form
                    formKey={key}
                    initialValues={{ name: key, phone: field.value[key] }}
                    key={index}
                    modifyPhone={::this.modifyPhone}
                    removePhone={::this.removePhone}
                    isStatic={isStatic}
                  />
                ))}
            </Table.Container>
          </Col>
        </Row>
      </section>
    );
  }
}
