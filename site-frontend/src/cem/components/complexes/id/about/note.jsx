import React from 'react';

import { reduxForm } from 'redux-form';
import { formSettings } from 'cem/constants/complexes/form';

import UI from 'cem/components/ui';
const {
  Heading,
  Form: { Group, Textarea, Helper },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';

const Note = ({ className, fields, isUpdateAllowed }) => (
  <section className={className}>
    <Row>
      <Col xs="20">
        <Heading size="md">Примечание</Heading>
      </Col>
    </Row>

    <Row>
      <Col xs="20">
        <Group kind={fields.note.touched && fields.note.error && 'error'}>
          <Textarea
            className={s.textarea}
            disabled={!isUpdateAllowed}
            rows="9"
            block
            kind="primary"
            {...fields.note}
            value={fields.note.value || ''}
          />
          {fields.note.touched && fields.note.error && (
            <Helper>{fields.note.error}</Helper>
          )}
        </Group>
      </Col>
    </Row>
  </section>
);

export default reduxForm(formSettings)(Note);
