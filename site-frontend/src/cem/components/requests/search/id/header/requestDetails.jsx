import React from 'react';

import FormField from 'cem/helpers/formField';

import * as dicts from 'cem/constants/requests/search/dictionaries';
import * as propertyDicts from 'cem/constants/properties/dictionaries';

import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Select,
  Form: { Group, Label, Static },
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';

export default ({ formKey, data, fields }) => (
  <section>
    <Row xs="center">
      <Col sm="6">
        <FormField
          field={fields.propertyCategory}
          label="Категория"
          static
          options={propertyDicts.categories}
        >
          <Select className={sUtils.fontSizeMd} options={[]} />
        </FormField>
      </Col>
      {formKey !== 'create' && (
        <Col sm="6" smOffset="1">
          <Group>
            <Label block>Дата поступления</Label>
            <Static className={s.input}>
              <FormattedDate value={data.createdAt} mask="dd.mm.yyyy HH:MM" />
            </Static>
          </Group>
        </Col>
      )}
      {formKey !== 'create' && (
        <Col sm="7">
          <Group>
            <Label block>Стадия</Label>
            <Static
              className={cn(
                s.input,
                s[dicts.states[data.state] && dicts.states[data.state].style],
              )}
            >
              {dicts.states[data.state] && dicts.states[data.state].title}
            </Static>
          </Group>
        </Col>
      )}
    </Row>
  </section>
);
