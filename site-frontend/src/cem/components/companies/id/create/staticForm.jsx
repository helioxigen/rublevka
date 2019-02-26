import React from 'react';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Select,
  Grid: { Row, Col },
  Form: { Input },
} = UI;

export default ({ fields }) => (
  <Row>
    <Col xs="20">
      <Row>
        <Col xs="20">
          {fields.name.value && (
            <FormField label="Наименование" field={fields.name} static>
              <Input type="text" />
            </FormField>
          )}
        </Col>
        <Col xs="20">
          {fields.name.value && (
            <FormField label="Адрес" field={fields.address} static>
              <Select multi allowCreate />
            </FormField>
          )}
        </Col>
        <Col sm="10">
          {fields.inn.value && (
            <FormField label="ИНН" field={fields.inn} static>
              <Input type="text" />
            </FormField>
          )}
        </Col>
        <Col sm="10">
          {fields.ogrn.value && (
            <FormField label="ОГРН(ИП)" field={fields.ogrn} static>
              <Input type="text" />
            </FormField>
          )}
        </Col>
        <Col sm="20">
          {fields.ceoName.value && (
            <FormField
              label={fields.ceoPosition.value || 'Генеральный директор'}
              field={fields.ceoName}
              static
            >
              <Input type="text" />
            </FormField>
          )}
        </Col>
      </Row>
    </Col>
  </Row>
);
