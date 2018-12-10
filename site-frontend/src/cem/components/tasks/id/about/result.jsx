import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
  Form: { Group, Static },
} = UI;

import sUtils from 'cem/styles/utils';

import { taskFormSettings } from 'cem/constants/tasks/form';

class About extends Component {
  render() {
    const { fields, formKey } = this.props;
    const isShown = formKey !== 'create' && fields.state.value !== 'to_do';

    if (!isShown) return null;

    return (
      <Row className={sUtils.pushedBottom3}>
        <Col xs="20">
          <Heading size="md">Результат</Heading>
          <Group>
            <Static>{fields.result.value}</Static>
          </Group>
        </Col>
      </Row>
    );
  }
}

export default reduxForm(taskFormSettings)(submitValidator()(About));
