import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/settings/applications/form';
import validate from 'cem/validators/applications';

import { fetchResource } from 'cem/helpers/autocomplete';
import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  AsyncSelect,
  Table: { Row, Cell },
  Form: { Group, Input, Label },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class ApplicationRecordForm extends Component {
  onSubmitSuccess() {
    if (this.props.formKey === `create`) {
      this.props.resetForm();
    }
  }

  createOrUpdate(values) {
    if (this.props.formKey === `create`) {
      return this.props.actions.create(values);
    } else {
      return this.props.actions.update(values.id, values);
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
            static={!isUpdateAllowed}
          >
            <Input
              className={s.tableInput}
              type="text"
              placeholder="Введите название приложения"
            />
          </FormField>
        </Cell>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.roleId}
            helperClassName={s.formHelper}
            static={!isUpdateAllowed}
          >
            <AsyncSelect
              className={cn(sUtils.resetBorder, sUtils.resetIndent)}
              asyncOptions={fetchResource(`/v1/roles`, `name`, [`name`])}
              {...fields.roleId}
              placeholder="Выберите роль"
            />
          </FormField>
        </Cell>
        <Cell>
          <FormField
            className={sUtils.resetIndentation}
            field={fields.responsibleUserId}
            helperClassName={s.formHelper}
            static={!isUpdateAllowed}
          >
            <AsyncSelect
              className={cn(sUtils.resetBorder, sUtils.resetIndent)}
              asyncOptions={fetchResource(
                `/v1/users/staff`,
                `lastName,firstName`,
                [`firstName`, `lastName`],
              )}
              {...fields.responsibleUserId}
              placeholder="Выберите ответственного"
            />
          </FormField>
        </Cell>
        <Cell>
          <Group className={sUtils.resetIndentation}>
            <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
              <Input
                type="radio"
                checked={fields.state.value === `enabled`}
                onChange={() => fields.state.onChange(`enabled`)}
                disabled={!isUpdateAllowed}
              />{' '}
              Вкл.
            </Label>
            <Label className={sUtils.fontRegular}>
              <Input
                type="radio"
                checked={fields.state.value === `disabled`}
                onChange={() => fields.state.onChange(`disabled`)}
                disabled={!isUpdateAllowed}
              />{' '}
              Выкл.
            </Label>
          </Group>
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
  form: `applicationRecord`,
  fields: formFields,
  validate,
})(submitValidator()(ApplicationRecordForm));
