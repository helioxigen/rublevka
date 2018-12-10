import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Button, Icon,
  Select,
  Form: { Input },
  Table: { Container, Row, Heading, Cell },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import * as options from 'cem/constants/settings/csi/options';
import * as dict from 'cem/constants/settings/csi/dictionaries';

const formSettings = {
  form: `csiQuestion`,
  fields: [`text`, `kind`],
  validate: ({ text, kind }) => ({
    text: !text && `Обязательно`,
    kind: !kind && `Обязательно`,
  }),
};

const Form = reduxForm(formSettings)(
  class extends Component {
    createOrUpdate() {
      const { formKey, values, actions, resetForm } = this.props;

      if (formKey === `create`) {
        actions.createQuestion(values).then(() => {
          actions.loadQuestions(`all`);
          resetForm();
        });
      } else {
        actions.updateQuestion(formKey, values).then(() => actions.loadQuestions(`all`));
      }
    }

    render() {
      const {
        formKey, fields, handleSubmit, pristine, error, submitting,
        isUpdateAllowed,
      } = this.props;
      return (
        <Row>
          <Cell>
            {formKey !== `create` && formKey}
          </Cell>
          <Cell>
            <FormField className={sUtils.resetIndentation} field={fields.text} sideHelper static={!isUpdateAllowed}>
              <Input className={s.tableInput} type="text" placeholder="Введите текст" />
            </FormField>
          </Cell>
          <Cell>
            <FormField className={sUtils.resetIndentation} field={fields.kind} options={dict.kinds} sideHelper static={!isUpdateAllowed}>
              <Select className={cn(sUtils.resetIndent, sUtils.resetBorder)} type="text" placeholder="Выберите тип" options={options.kinds} />
            </FormField>
          </Cell>
          <Cell>
            <Button type="button" className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.createOrUpdate)} disabled={!isUpdateAllowed || pristine || error || submitting}>
              <Icon className={s.btnIcon} icon="checkmark" />
            </Button>
          </Cell>
        </Row>
      );
    }
  }
);

class Table extends Component {
  render() {
    const { items, isCreateAllowed, isUpdateAllowed } = this.props;

    return (
      <Container>
        <Row width="100%">
          <Heading width="3%">ID</Heading>
          <Heading width="62%">Текст вопроса</Heading>
          <Heading width="20%">Тип</Heading>
          <Heading width="15%">Действия</Heading>
        </Row>
        {isCreateAllowed && <Form {...this.props} formKey="create" isUpdateAllowed />}
        {items.map(item => <Form {...this.props} formKey={item.id} initialValues={item} isUpdateAllowed={isUpdateAllowed} />)}
      </Container>
    );
  }
}

export default Table;
