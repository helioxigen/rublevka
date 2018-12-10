import React from 'react';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Heading,
  Form: { Textarea },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default ({ fields, formKey, isUpdateAllowed }) => (
  <section className={sUtils.pushedBottom3}>
    <Row>
      <Col sm="20">
        <Heading size="md">Примечание</Heading>
        <FormField field={fields.note} isStatic={formKey !== 'create' && !isUpdateAllowed}>
          <Textarea block rows="9" className={s.textarea} placeholder="Например, адрес" />
        </FormField>
      </Col>
    </Row>
  </section>
);
