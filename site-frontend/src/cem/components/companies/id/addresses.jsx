import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Table, Tooltip, Button,
  Icon, Heading,
  Grid: { Row, Col },
  Form: { Input },
} = UI;

import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

import { reduxForm } from 'redux-form';
const formSettings = {
  form: `companyAddresses`,
  fields: [`name`],
  validate: ({ name }) => ({ name: !name && `Обязательно` }),
};

const Form = reduxForm(formSettings)(
  class extends Component {
    createOrUpdate() {
      const { formKey, values, addAddress, modifyAddress, destroyForm } = this.props;

      if (formKey === `create`) {
        addAddress(values.name);
        destroyForm();
      }
      if (formKey !== `create`) modifyAddress(Number(formKey), values.name);
    }

    render() {
      const { formKey, fields, handleSubmit, isStatic } = this.props;

      return (
        <Table.Row>
          <Table.Cell>
            <FormField className={sUtils.resetIndentation} field={fields.name} static={isStatic} sideHelper>
              <Input className={s.tableInput} type="text" placeholder="Адрес" />
            </FormField>
          </Table.Cell>
          <Table.Cell>
            {formKey === `create` &&
              <Tooltip className={sUtils.pushedRight1} title="Добавить" position="top">
                <Button className={sButton.btnTableAction} type="button" onClick={handleSubmit(::this.createOrUpdate)} disabled={isStatic}>
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Tooltip>
            }
            {formKey !== `create` &&
              <Tooltip className={sUtils.pushedRight1} title="Редактировать" position="top">
                <Button className={sButton.btnTableAction} type="button" onClick={handleSubmit(::this.createOrUpdate)} disabled={isStatic}>
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Tooltip>
            }
            {formKey !== `create` &&
              <Tooltip title="Удалить" position="top">
                <Button className={sButton.btnTableAction} type="button" onClick={() => this.props.removeAddress(Number(formKey))} disabled={isStatic}>
                  <Icon className={s.btnIcon} icon="delete" />
                </Button>
              </Tooltip>
            }
          </Table.Cell>
        </Table.Row>
      );
    }
  }
);

export default class Addresses extends Component {
  addAddress(address) {
    const { field, actions } = this.props;
    const value = [...field.value || [], address];
    actions.pop(`success`, `Адрес добавлен`);
    field.onChange(value);
    setTimeout(this.props.onChange, 10);
  }

  modifyAddress(modIndex, address) {
    const { field, actions } = this.props;
    const value = field.value.map((item, index) => index === modIndex ? address : item);
    actions.pop(`success`, `Адрес изменён`);
    field.onChange(value);
    setTimeout(this.props.onChange, 10);
  }

  removeAddress(modIndex) {
    const { field, actions } = this.props;
    const value = field.value.filter((item, index) => index !== modIndex);
    actions.pop(`success`, `Адрес удалён`);
    field.onChange(value);
    setTimeout(this.props.onChange, 10);
  }

  render() {
    const { field, isStatic } = this.props;

    return (
      <section>
        <Heading size="md">Адреса</Heading>
        {field.error && field.touched && <span className={s.textError}>{field.error}</span>}
        <Row className={sUtils.pushedBottom6}>
          <Col xs="20">
            <Table.Container width="100%">
              <Table.Row>
                <Table.Heading width="90%">Название</Table.Heading>
                <Table.Heading width="10%">Действия</Table.Heading>
              </Table.Row>
              <Form formKey="create" addAddress={::this.addAddress} isStatic={isStatic} />
              {field.value && field.value.map(
                (item, index) => <Form formKey={`${index}`} initialValues={{ name: item }} key={index} modifyAddress={::this.modifyAddress} removeAddress={::this.removeAddress} isStatic={isStatic} />
              )}
            </Table.Container>
          </Col>
        </Row>
      </section>
    );
  }
}
