import React from 'react';
import { Link } from 'react-router';

import FormField from 'cem/helpers/formField';
import UI from 'cem/components/ui';
const {
  Icon,
  Heading,
  Grid: { Row, Col },
  Form: { Input },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default ({ fields = {}, isStatic, isPhoneStatic, data = {} }) => (
  <section>
    <Heading size="md">
      Контактные данные клиента
      {data.contactId && (
        <Link className={s.linkIcon} to={`/contacts/${data.contactId}`}>
          <Icon className={s.icon} icon="arrow" />
        </Link>
      )}
    </Heading>

    <Row className={sUtils.pushedBottom3}>
      <Col sm="10">
        <FormField float label="Имя" field={fields.firstName} static={isStatic}>
          <Input
            valueClassName="floatLabel"
            block
            type="text"
            placeholder="Имя"
          />
        </FormField>

        <FormField
          float
          label="Фамилия"
          field={fields.lastName}
          static={isStatic}
        >
          <Input
            valueClassName="floatLabel"
            block
            type="text"
            placeholder="Фамилия"
          />
        </FormField>
      </Col>

      <Col sm="10">
        <FormField
          float
          label="Основной телефон"
          field={fields.phoneNumber}
          static={isPhoneStatic}
        >
          <Input
            valueClassName="floatLabel"
            block
            type="text"
            placeholder="Основной телефон"
          />
        </FormField>

        <FormField float label="Email" field={fields.email} static={isStatic}>
          <Input
            valueClassName="floatLabel"
            block
            type="text"
            placeholder="Email"
          />
        </FormField>
      </Col>
    </Row>
  </section>
);
