import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Button, Icon,
  Form: { Group, Input },
  Table: { Row, Cell },
} = UI;
import FormField from 'cem/helpers/formField';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

export default class extends Component {
  onSubmitSuccess() {
    if (this.props.formKey === `create`) this.props.resetForm();
  }

  createOrUpdate() {
    const { formKey, values, actions } = this.props;

    if (formKey === `create`) {
      return actions.create(values);
    } else {
      return actions.update(formKey, values);
    }
  }

  delete() {
    const { actions, kind, values, values: { title }, isDestroyAllowed } = this.props;
    if (isDestroyAllowed && confirm(`Вы действительно хотите удалить слово "${title}"?`)) { // eslint-disable-line no-alert
      return actions.delete({ ...values, kind });
    }
  }

  render() {
    const {
      formKey, fields, handleSubmit, pristine, error, submitting,
      isUpdateAllowed = true, isDestroyAllowed = true,
      showDestroy,
    } = this.props;

    return (
      <Row>
        <Cell>
          <FormField className={sUtils.resetIndentation} field={fields.slug} static={!isUpdateAllowed} helperClassName={s.formHelper}>
            <Input className={s.tableInput} type="text" placeholder="Введите slug" />
          </FormField>
        </Cell>
        <Cell>
          <FormField className={sUtils.resetIndentation} field={fields.title} static={!isUpdateAllowed} helperClassName={s.formHelper}>
            <Input className={s.tableInput} type="text" placeholder="Введите название" />
          </FormField>
        </Cell>
        {formKey !== `create` && (
          <Cell>
            <Group className={sUtils.resetIndentation}>
              <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)} disabled={!isUpdateAllowed || pristine || error || submitting}>
                <Icon className={s.btnIcon} icon="checkmark" />
              </Button>
              {showDestroy &&
                <Button className={sButton.btnTableAction} size="xs" disabled={!isDestroyAllowed}>
                  <Icon className={s.btnIcon} icon="delete" onClick={handleSubmit(::this.delete)} />
                </Button>
              }
            </Group>
          </Cell>
        )}
        {formKey === `create` && (
          <Cell>
            <Group className={sUtils.resetIndentation}>
              <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)} disabled={pristine || error || submitting}>
                <Icon className={s.btnIcon} icon="checkmark" />
              </Button>
            </Group>
          </Cell>
        )}
      </Row>
    );
  }
}
