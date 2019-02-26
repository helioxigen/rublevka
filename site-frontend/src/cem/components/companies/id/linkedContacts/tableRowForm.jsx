import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import FormField from 'cem/helpers/formField';
import UI from 'cem/components/ui';
const {
  Table,
  Button,
  Icon,
  AsyncSelect,
  Form: { Group, Static, Input },
  Table: { Row, Cell },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import { fetchResource, fetchDictionary } from 'cem/helpers/autocomplete';

class LinkedContactsTableRow extends Component {
  onUpdateSuccess() {
    const { companyId, values, actions } = this.props;

    actions.pop(`success`, `Контакт (ID: ${values.id})`, `Успешно обновлён`);
    actions.loadLinkedContacts(companyId);
  }

  onUnlinkSuccess() {
    const { companyId, values, actions } = this.props;

    actions.pop(
      `success`,
      `Контакт (ID: ${values.id})`,
      `Откреплён от компании`,
    );
    actions.loadLinkedContacts(companyId);
  }

  update() {
    const { companyId, values, actions, data } = this.props;

    return actions.updateLinkedContact(companyId, {
      ...data,
      ...values,
      details: { ...data.details, ...values.details },
      companyDetails: { ...data.companyDetails, ...values.companyDetails },
    });
  }

  unlink() {
    const { companyId, values, actions, data } = this.props;

    return actions.unlinkContact(companyId, {
      ...data,
      ...values,
      details: { ...data.details, ...values.details },
      companyDetails: { ...data.companyDetails, ...values.companyDetails },
    });
  }

  render() {
    const {
      data,
      fields,
      values,
      handleSubmit,
      pristine,
      error,
      submitting,
      isUpdateAllowed,
    } = this.props;

    return (
      <Table.Row>
        <Cell>
          <Group className={sUtils.resetIndentation}>
            <Static>{data.id}</Static>
          </Group>
        </Cell>
        <Cell>
          <Group className={sUtils.resetIndentation}>
            <AsyncSelect
              className={sUtils.resetBorder}
              asyncOptions={fetchResource(`/v1/contacts`, `id`, [
                `details.lastName`,
                `details.firstName`,
                `details.middleName`,
              ])}
              value={data.id}
              disabled
            />
          </Group>
        </Cell>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.details.phoneNumber}
            static={!isUpdateAllowed}
          >
            <Input className={sUtils.resetBorder} block type="text" />
          </FormField>
        </Cell>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.details.email}
            static={!isUpdateAllowed}
          >
            <Input className={sUtils.resetBorder} block type="text" />
          </FormField>
        </Cell>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.companyDetails.positionId}
            static={!isUpdateAllowed}
          >
            <AsyncSelect
              className={sUtils.resetBorder}
              block
              type="text"
              valueKey="id"
              labelKey="title"
              asyncOptions={fetchDictionary(`contact_position`)}
            />
          </FormField>
        </Cell>
        <Cell>
          <Button
            className={sButton.btnTableAction}
            size="xs"
            onClick={handleSubmit(::this.update, ::this.onUpdateSuccess)}
            disabled={!isUpdateAllowed || pristine || error || submitting}
          >
            <Icon className={s.btnIcon} icon="checkmark" />
          </Button>
          <Button
            className={sButton.btnTableAction}
            size="xs"
            onClick={handleSubmit(::this.unlink, ::this.onUnlinkSuccess)}
            disabled={!isUpdateAllowed || error || submitting}
          >
            <Icon className={s.btnIcon} icon="delete" />
          </Button>
          <Button
            to={`/contacts/${values.id}`}
            className={sButton.btnTableAction}
            size="xs"
          >
            <Icon className={s.btnIcon} icon="arrow-left" />
          </Button>
        </Cell>
      </Table.Row>
    );
  }
}

const validate = values => {
  const errors = {
    details: {},
  };

  if (!values.details.phoneNumber) errors.details.phoneNumber = `Обязательно`;

  return errors;
};

const formSettings = {
  form: `companyContact`,
  fields: [
    `id`,
    `details.phoneNumber`,
    `details.email`,
    `companyDetails.positionId`,
  ],
  validate,
};

export default reduxForm(formSettings)(
  submitValidator()(LinkedContactsTableRow),
);
