import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  Table: { Row, Cell },
  Form: { Input, Group, Helper, Static },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

export default class extends Component {
  onSubmitSuccess() {
    if (this.props.formKey === `create`) this.props.resetForm();
  }

  createOrUpdate(values) {
    const { formKey, kind, actions } = this.props;

    if (formKey === `create`) {
      return actions.create({ ...values, kind });
    } else {
      return actions.update({ ...values, kind });
    }
  }

  delete() {
    const {
      actions,
      kind,
      values,
      values: { title },
    } = this.props;
    if (confirm(`Вы действительно хотите удалить слово "${title}"?`)) {
      // eslint-disable-line no-alert
      return actions.delete({ ...values, kind });
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
      hasRight,
    } = this.props;
    const isStatic = !hasRight(`dictionary_item_update`);

    return (
      <Row>
        <Cell>
          {!isStatic && (
            <Group
              className={sUtils.resetIndentation}
              kind={fields.title.touched && fields.title.error && `error`}
            >
              <Input
                className={s.tableInput}
                type="text"
                placeholder="Введите слово"
                {...fields.title}
              />
              {fields.title.touched && fields.title.error && (
                <Helper className={s.formHelper}>{fields.title.error}</Helper>
              )}
            </Group>
          )}
          {isStatic && (
            <Group
              className={sUtils.resetIndentation}
              kind={fields.title.touched && fields.title.error && `error`}
            >
              <Static>{fields.title.value}</Static>
            </Group>
          )}
        </Cell>
        {formKey !== `create` && (
          <Cell>
            <Group className={sUtils.resetIndentation}>
              {hasRight(`dictionary_item_update`) && (
                <Button
                  className={sButton.btnTableAction}
                  size="xs"
                  onClick={handleSubmit(
                    ::this.createOrUpdate,
                    ::this.onSubmitSuccess,
                  )}
                  disabled={pristine || error || submitting}
                >
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              )}
              {hasRight(`dictionary_item_destroy`) && (
                <Button className={sButton.btnTableAction} size="xs">
                  <Icon
                    className={s.btnIcon}
                    icon="delete"
                    onClick={handleSubmit(::this.delete)}
                  />
                </Button>
              )}
            </Group>
          </Cell>
        )}
        {formKey === `create` && (
          <Cell>
            <Group className={sUtils.resetIndentation}>
              <Button
                className={sButton.btnTableAction}
                size="xs"
                onClick={handleSubmit(
                  ::this.createOrUpdate,
                  ::this.onSubmitSuccess,
                )}
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
