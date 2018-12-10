import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import { contactFields } from 'cem/constants/properties/form';
import { dictionaryKinds } from 'cem/constants/linked_contacts/form';

import { validateContact } from 'cem/validators/properties';

import { fetchResource, fetchDictionary } from 'cem/helpers/autocomplete';

import FormField from 'cem/helpers/formField';
import UI from 'cem/components/ui';
const {
  Table, Button, Icon,
  Form, AsyncSelect,
  Form: { Group },
  Grid: { Row },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `propertyContact`,
  fields: contactFields,
  validate: validateContact,
};

export default reduxForm(formSettings)(submitValidator()(
  class extends Component {
    update() {
      const { formKey, actions, values } = this.props;

      if (formKey !== `add`) return actions.update(formKey, values);
    }

    delete() {
      const { formKey, actions } = this.props;

      return actions.delete(formKey);
    }

    render() {
      const {
        formKey, fields, values, handleSubmit, pristine, error, submitting,
        isContactLinkingAllowed, resource,
      } = this.props;
      const dictionaryKind = dictionaryKinds[resource];

      return (
        <Table.Row>
          <Table.Cell>
            <FormField className={sUtils.resetIndentation} field={fields.linkedContactId}>
              <AsyncSelect className={sUtils.resetBorder} asyncOptions={fetchResource(`/v1/contacts`, `details.firstName`, [`details.lastName`, `details.firstName`])} {...fields.linkedContactId} disabled />
            </FormField>
          </Table.Cell>

          <Table.Cell>{values.phoneNumber}</Table.Cell>

          <Table.Cell>
            <Group className={sUtils.resetIndentation} kind={fields.kindId.touched && !!fields.kindId.error && `error`}>
              <AsyncSelect className={sUtils.resetBorder} asyncOptions={fetchDictionary(dictionaryKind)} {...fields.kindId} valueKey="id" labelKey="title" disabled={!isContactLinkingAllowed} />
              {fields.kindId.touched && fields.kindId.error && <Form.Helper>{fields.kindId.error}</Form.Helper>}
            </Group>
          </Table.Cell>

          <Table.Cell>
            <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.update)} disabled={!isContactLinkingAllowed || pristine || error || submitting}>
              <Icon className={s.btnIcon} icon="checkmark" />
            </Button>
            {formKey !== `add` && (
              <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.delete)} disabled={!isContactLinkingAllowed}>
                <Icon className={s.btnIcon} icon="delete" />
              </Button>
            )}
            {formKey !== `add` && (
              <Button to={`/contacts/${values.linkedContactId}`} className={sButton.btnTableAction} size="xs">
                <Icon className={s.btnIcon} icon="arrow-left" />
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      );
    }
  })
);
