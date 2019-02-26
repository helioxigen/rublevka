import React from 'react';

import { kinds } from 'cem/constants/requests/remove/options';
import * as dicts from 'cem/constants/requests/remove/dictionaries';

import { FormattedDate } from 'react-formatted';
import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Select,
  Form: { Group, Label, Static },
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';

export default ({ formKey, data, fields }) => (
  <section>
    <Row>
      <Col
        sm={formKey === 'create' ? '10' : '3'}
        smOffset={formKey === 'create' ? '5' : '1'}
        lg={formKey === 'create' ? '5' : '3'}
        lgOffset={formKey === 'create' ? '5' : '1'}
      >
        <FormField
          field={fields.kind}
          label="Тип"
          static={formKey !== 'create'}
          options={dicts.kinds}
          float
        >
          <Select className={s.input} options={kinds} />
        </FormField>
      </Col>

      {formKey !== 'create' && (
        <Col sm="6" md="6" lg="5">
          <Group>
            <Label block>Дата поступления</Label>
            <Static className={s.input}>
              <FormattedDate value={data.createdAt} mask="dd.mm.yyyy HH:MM" />
            </Static>
          </Group>
        </Col>
      )}

      {formKey !== 'create' && (
        <Col sm="10" md="10" lg="9">
          <Group>
            <Label block>Статус</Label>
            <Static className={cn(s.input, s[dicts.states[data.state].style])}>
              {dicts.states[data.state].title}
            </Static>
          </Group>
        </Col>
      )}
    </Row>
  </section>
);
