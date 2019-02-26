import React from 'react';

import UI from 'cem/components/ui';
const {
  Heading,
  Form: { Group, Input, Helper },
  Grid: { Row, Col },
} = UI;
import s from 'cem/styles/id/content';

const keys = {
  sale: 'Продажа',
  sale_house: 'Продажа домов',
  sale_land: 'Продажа участков',
  sale_townhouse: 'Продажа таунхаусов',
  sale_flat: 'Продажа квартир',
  rent: 'Аренда',
  rent_house: 'Аренда домов',
  rent_land: 'Аренда участков',
  rent_townhouse: 'Аренда таунхаусов',
  rent_flat: 'Аренда квартир',
};

export const metaKeys = () => {
  const result = [];
  Object.keys(keys).forEach(key => {
    ['title', 'description', 'keywords', 'h1'].forEach(column => {
      result.push('meta.' + key + '.' + column);
    });
  });
  return result;
};

export default ({ className, fields, isUpdateAllowed }) => {
  const { meta = {} } = fields;

  const rows = [];
  for (const [key, value] of Object.entries(keys)) {
    const title = (meta[key] && meta[key]['title']) || {};
    const description = (meta[key] && meta[key]['description']) || {};
    const keywords = (meta[key] && meta[key]['keywords']) || {};
    const h1 = (meta[key] && meta[key]['h1']) || {};

    rows.push(
      <Row key={key}>
        <Col xs="20">
          <Heading size="sm">{value}</Heading>
        </Col>

        <Col xs="10">
          <Group kind={title.touched && title.error && 'error'}>
            <Input
              valueClassName="floatLabel"
              placeholder="Title"
              block
              type="text"
              disabled={!isUpdateAllowed}
              {...title}
            />
            {title.touched && title.error && <Helper>{title.error}</Helper>}
          </Group>
        </Col>

        <Col xs="10">
          <Group kind={keywords.touched && keywords.error && 'error'}>
            <Input
              valueClassName="floatLabel"
              placeholder="Keywords"
              block
              type="text"
              disabled={!isUpdateAllowed}
              {...keywords}
            />
            {keywords.touched && keywords.error && (
              <Helper>{keywords.error}</Helper>
            )}
          </Group>
        </Col>

        <Col xs="20">
          <Group kind={description.touched && description.error && 'error'}>
            <Input
              valueClassName="floatLabel"
              placeholder="Description"
              block
              type="text"
              disabled={!isUpdateAllowed}
              {...description}
            />
            {description.touched && description.error && (
              <Helper>{description.error}</Helper>
            )}
          </Group>
        </Col>

        <Col xs="20">
          <Group kind={h1.touched && h1.error && 'error'}>
            <Input
              valueClassName="floatLabel"
              placeholder="H1"
              block
              type="text"
              disabled={!isUpdateAllowed}
              {...h1}
            />
            {h1.touched && h1.error && <Helper>{h1.error}</Helper>}
          </Group>
        </Col>
      </Row>,
    );
  }

  return (
    <section className={className}>
      <Row>
        <Col xs="20">
          <Heading size="md">SEO</Heading>
        </Col>
      </Row>

      {rows}
    </section>
  );
};
