import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
  Form: { Textarea },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { taskFormSettings } from 'cem/constants/tasks/form';

class About extends Component {
  render() {
    const {
      fields, formKey,
      data, isUpdateAllowed,
    } = this.props;

    const isFree = formKey === 'create' ? fields.kind.value === 'free' : data.kind === 'free';
    const isPreview = formKey === 'create' ? fields.kind.value === 'preview' : data.kind === 'preview';
    const isNegotiation = formKey === 'create' ? fields.kind.value === 'negotiation' : data.kind === 'negotiation';

    const isFieldStatic = formKey !== 'create' && (fields.state.value !== 'to_do' || !isUpdateAllowed);

    if (isPreview || isNegotiation) return null;

    const detailsFields = isFree ? fields.freeDetails : fields.contactDetails;

    return (
      <Row className={sUtils.pushedBottom3}>
        <Col xs="20">
          <Heading size="md">Цель</Heading>
          <FormField field={detailsFields.goal} static={isFieldStatic}>
            <Textarea className={cn(!isFieldStatic && s.textarea)} rows="9" block kind="primary" {...detailsFields.goal} value={detailsFields.goal.value || ''} />
          </FormField>
        </Col>
      </Row>
    );
  }
}

export default reduxForm(taskFormSettings)(submitValidator()(About));
