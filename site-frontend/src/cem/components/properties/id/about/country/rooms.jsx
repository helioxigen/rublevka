import React from 'react';

import UI from 'cem/components/ui';
const {
  Heading,
  Form: { Input },
  Grid: { Col, Row },
} = UI;

import FormField from 'cem/helpers/formField';


import * as options from 'cem/constants/properties/options';

const Rooms = ({ className, fields, isUpdateAllowed }) => (
  <section className={className}>
    <Row>
      <Col xs="20">
        <Heading size="md">Перечень и количество помещений</Heading>
      </Col>
    </Row>
    {options.layoutItems.map(layoutsRow => (
      <Row>
        {layoutsRow.map((item, index) => (
          <Col sm="4" key={index}>
            <FormField field={fields.specification.layouts[item.value]} label={item.label} float static={!isUpdateAllowed}>
              <Input block type="text" />
            </FormField>
          </Col>
        ))}
      </Row>
    ))}
  </section>
);

export default Rooms;
