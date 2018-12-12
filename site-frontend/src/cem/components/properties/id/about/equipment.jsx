import React from 'react';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Checklist, Heading,
  Form: { Label, Input },
  Grid: { Col, Row },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default ({ className, options, fields, values, isUpdateAllowed }) => (
  <section className={className}>
    {values.kind !== 'land' &&
      <Row>
        <Col xs="20">
          <Heading size="md">Оснащение</Heading>
        </Col>
      </Row>
    }
    {values.kind !== 'land' &&
      <Row>
        {options.equipment.map((item, index) => (
          <Col sm="6" key={index}>
            <Label className={cn(s.checkboxLabel, sUtils.pushedBottom2_5)}>
              <Checklist {...fields.equipment} option={item.id} checkbox={<Input type="checkbox" disabled={!isUpdateAllowed} />} /> {item.title}
            </Label>
          </Col>
        ))}
      </Row>
    }
  </section>
);
