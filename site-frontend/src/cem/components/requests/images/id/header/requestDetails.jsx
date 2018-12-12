import React from 'react';

import * as dicts from 'cem/constants/requests/images/dictionaries';
import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Form: { Group, Label, Static },
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';

export default ({ formKey, data, values, location: { query: { objectKlass, kind } } }) => (
  <section>
    <Row xs="center">
      <Col sm="5">
        <Group>
          <Label block>Тип заявки</Label>
          <Static className={s.input}>{dicts.kinds[values.kind || kind]}</Static>
        </Group>
      </Col>
      <Col sm="5">
        <Group>
          <Label block>Категория</Label>
          <Static className={s.input}>{dicts.categories[values.objectKlass || objectKlass || 'city_property'].label}</Static>
        </Group>
      </Col>
      {formKey !== 'create' &&
        <Col sm="5">
          <Group>
            <Label block>Дата поступления</Label>
            <Static className={s.input}>
              <FormattedDate value={data.createdAt} mask="dd.mm.yyyy HH:MM" />
            </Static>
          </Group>
        </Col>
      }
      {formKey !== 'create' &&
        <Col sm="5">
          <Group>
            <Label block>Стадия</Label>
            <Static className={cn(s.input, s[dicts.states[data.state] && dicts.states[data.state].style])}>{dicts.states[data.state] && dicts.states[data.state].title}</Static>
          </Group>
        </Col>
      }
    </Row>
  </section>
);
