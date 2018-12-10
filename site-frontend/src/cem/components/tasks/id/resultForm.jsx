import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Form, Button, Heading,
  Grid: { Container, Row, Col },
  Form: { Group, Textarea, Helper },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import { prepareFormValuesForSubmit } from 'cem/helpers/tasks';

class Result extends Component {
  onSubmitSuccess() {
    const { actions, onSubmitResult, taskId } = this.props;
    onSubmitResult();
    actions.loadTask(taskId);
  }

  completeTask(values) {
    const { taskId, actions, status, isTimeline, data } = this.props;
    return actions.updateTask(taskId, isTimeline ? { ...data, result: values.result } : prepareFormValuesForSubmit(values)).then(() => actions.changeStatus(taskId, status));
  }

  render() {
    const {
      fields, handleSubmit, pristine, error, submitting,
      status,
    } = this.props;

    return (
      <Form.Container onSubmit={handleSubmit(::this.completeTask, ::this.onSubmitSuccess)}>
        <Container fluid className={s.container}>
          <Row>
            <Col xs="20">
              <Heading size="md" className={sUtils.pushedBottom2}>Результат</Heading>
              <Group kind={fields.result.touched && fields.result.error && `error`}>
                <Textarea className={s.textarea} rows="9" block kind="primary" {...fields.result} value={fields.result.value || ``} />
                {fields.result.touched && fields.result.error && <Helper>{fields.result.error}</Helper>}
              </Group>
            </Col>
          </Row>
        </Container>
        {status === `done` && <Button className={sButton.btnWide} block type="submit" kind="accent" size="lg" disabled={pristine || error || submitting}>Выполнить задачу</Button>}
        {status === `cancel` && <Button className={sButton.btnWide} block type="submit" kind="danger" size="lg" disabled={pristine || error || submitting}>Отменить задачу</Button>}
      </Form.Container>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.result) errors.result = `Укажите достигнутый результат!`;

  return errors;
}

const formSettings = {
  form: `taskResult`,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(Result));
