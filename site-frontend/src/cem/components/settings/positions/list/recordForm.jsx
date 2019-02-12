import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/settings/positions/form';
import validate from 'cem/validators/positions';

import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  Table: { Row, Cell },
  Form: { Group, Input },
} = UI;

import FormField from 'cem/helpers/formField';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class RoleRecordForm extends Component {
  onSubmitSuccess() {
    if (this.props.formKey === `create`) {
      this.props.resetForm();
    }
  }

  create(values) {
    if (this.props.formKey === `create`) {
      return this.props.actions.createPosition(values);
    }
  }

  render() {
    const {
      formKey,
      fields,
      handleSubmit,
      pristine,
      error,
      submitting,
    } = this.props;

    return (
      <Row>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.name}
            helperClassName={s.formHelper}
            static={formKey !== `create`}
          >
            <Input
              className={s.tableInput}
              type="text"
              placeholder="Введите название должности"
            />
          </FormField>
        </Cell>
        {formKey !== `create` && (
          <Cell>
            <Group className={sUtils.resetIndentation}>
              <Button
                className={sButton.btnTableAction}
                to={`/settings/positions/${fields.id.value}`}
                size="xs"
              >
                <Icon className={s.btnIcon} icon="arrow-left" />
              </Button>
            </Group>
          </Cell>
        )}
        {formKey === `create` && (
          <Cell>
            <Group className={sUtils.resetIndentation}>
              <Button
                className={sButton.btnTableAction}
                size="xs"
                onClick={handleSubmit(::this.create, ::this.onSubmitSuccess)}
                disabled={pristine || error || submitting}
              >
                <Icon className={s.btnIcon} icon="checkmark" />
              </Button>
            </Group>
          </Cell>
        )}
      </Row>
    );
  }
}

export default reduxForm({
  form: `role-record`,
  fields: formFields,
  validate,
})(submitValidator()(RoleRecordForm));
