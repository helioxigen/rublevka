import React from 'react';
import { Link } from 'react-router';

import { fetchDictionary } from 'cem/helpers/autocomplete';

import FormField from 'cem/helpers/formField';
import UI from 'cem/components/ui';
const {
  AsyncSelect, Icon, Heading,
  Grid: { Row, Col },
  Form: { Group, Label, Static },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default ({ id, details = {}, additionalDetails = {}, kindIdField, isStatic }) => (
  <section>
    <Heading size="md">
      Информация о клиенте
      <Link className={s.linkIcon} to={`/contacts/${id}`}><Icon className={s.icon} icon="arrow" /></Link>
    </Heading>
    <Row>
      <Col sm="10">
        <Group>
          <Label block>Клиент</Label>
          <Static>{details.firstName} {details.lastName}</Static>
        </Group>
      </Col>
      <Col sm="10">
        <FormField label="Кем является" field={kindIdField}>
          <AsyncSelect className={cn(isStatic && sUtils.resetBorder)} asyncOptions={fetchDictionary('deal_contact_type')} labelKey="title" valueKey="id" disabled={isStatic} />
        </FormField>
      </Col>
    </Row>

    <Row>
      <Col sm="10">
        <Group>
          <Label block>Основной телефон</Label>
          <Static>{details.phoneNumber || '—'}</Static>
        </Group>
      </Col>
      <Col sm="10">
        <Group>
          <Label block>Доп. телефон</Label>
          <Static>{additionalDetails.additionalPhoneNumber || '—'}</Static>
        </Group>
      </Col>
    </Row>

    <Row>
      <Col sm="10">
        <Group>
          <Label block>Основной email</Label>
          <Static>{details.email || '—'}</Static>
        </Group>
      </Col>
      <Col sm="10">
        <Group>
          <Label block>Доп. email</Label>
          <Static>{additionalDetails.additionalEmail || '—'}</Static>
        </Group>
      </Col>
    </Row>
  </section>
);
