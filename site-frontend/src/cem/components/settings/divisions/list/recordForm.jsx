import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/settings/divisions/form';
import validate from 'cem/validators/divisions';

import { fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  AsyncSelect,
  Table: { Row, Cell },
  Form: { Group, Input },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class DivisonRecordForm extends Component {
  onSubmitSuccess() {
    const { formKey, actions, resetForm } = this.props;

    if (formKey === `create`) {
      actions.pop(`success`, `Отдел добавлен!`);
      resetForm();
    } else {
      actions.pop(`success`, `Отдел обновлен!`);
    }
  }

  createOrUpdate(values) {
    const { formKey, actions } = this.props;

    if (formKey === `create`) {
      return actions.createDivision(values);
    } else {
      return actions.updateDivision(values.id, values);
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
              placeholder="Введите название отдела"
            />
          </FormField>
        </Cell>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.departmentId}
            helperClassName={s.formHelper}
            static={!isUpdateAllowed}
          >
            <AsyncSelect
              className={cn(sUtils.resetBorder, sUtils.resetIndent)}
              asyncOptions={fetchResource(`/v1/departments`, null, [`name`])}
              {...fields.departmentId}
              placeholder="Выберите департамент"
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
  form: `division-record`,
  fields: formFields,
  validate,
})(submitValidator()(DivisonRecordForm));
