import React from 'react';

import UI from 'cem/components/ui';
const {
  Form: { Group, Label, Static },
  Grid: { Row, Col },
} = UI;
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/id/header';

import { states } from 'cem/constants/deals/dictionaries';
import { offerKinds } from 'cem/constants/properties/dictionaries';

export default ({ data, state }) => (
  <section>
    <Row>
      <Col sm="4">
        <Group>
          <Label block>Тип сделки</Label>
          <Static className={s.input}>{offerKinds[data.details && data.details.offerKind]}</Static>
        </Group>
      </Col>
      <Col sm="6" smOffset="2">
        <Group>
          <Label block>Дата начала сделки</Label>
          <Static className={s.input}><FormattedDate mask="dd.mm.yy HH:MM" value={data.createdAt} /></Static>
        </Group>
      </Col>
      <Col sm="8">
        <Group>
          <Label block>Стадия</Label>
          <Static className={cn(s.input, s[states[state] && states[state].style])}>{states[state] && states[state].title}</Static>
        </Group>
      </Col>
    </Row>
  </section>
);
