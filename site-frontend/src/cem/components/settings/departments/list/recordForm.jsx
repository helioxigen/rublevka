import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/settings/departments/form';
import validate from 'cem/validators/departments';

import UI from 'cem/components/ui';
const {
  Table: { Row, Cell },
  Form: { Group, Input },
  Button,
  Icon,
} = UI;

import FormField from 'cem/helpers/formField';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class DepartmentRecordForm extends Component {
  onSubmitSuccess() {
    if (this.props.formKey === `create`) {
      this.props.resetForm();
    }
  }

  createOrUpdate(values) {
    const { formKey, actions } = this.props;

    if (formKey === `create`) {
      return actions.createDepartment(values);
    } else {
      return actions.updateDepartment(values.id, values);
    }
  }

  render() {
    const {
      fields,
      handleSubmit,
      pristine,
      error,
      submitting,
      isUpdateAllowed,
    } = this.props;

    return (
      <Row>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.name}
            helperClassName={s.formHelper}
            static={!isUpdateAllowed}
          >
            <Input
              className={s.tableInput}
              type="text"
              placeholder="Введите название департамента"
            />
          </FormField>
        </Cell>
        <Cell>
          <Group className={sUtils.resetIndentation}>
            <Button
              className={sButton.btnTableAction}
              size="xs"
              onClick={handleSubmit(
                ::this.createOrUpdate,
                ::this.onSubmitSuccess,
              )}
              disabled={!isUpdateAllowed || pristine || error || submitting}
            >
              <Icon className={s.btnIcon} icon="checkmark" />
            </Button>
          </Group>
        </Cell>
      </Row>
    );
  }
}

export default reduxForm({
  form: `department-record`,
  fields: formFields,
  validate,
})(submitValidator()(DepartmentRecordForm));
