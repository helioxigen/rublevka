import React from 'react';

import CountryAbout from './country';
import CityAbout from './city';

import Properties from './properties';

import FormField from 'cem/helpers/formField';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';

import UI from 'cem/components/ui';
const {
  Select,
  Heading,
  PriceInput,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

const aboutMap = {
  city: CityAbout,
  country: CountryAbout,
};

export default ({ fields, isStatic, className, ...props }) => {
  const PropertyAbout = aboutMap[fields.requestDetails.category.value];

  return (
    <section className={className}>
      <Heading size="md">На покупку</Heading>

      <Properties fields={fields} isStatic={isStatic} {...props} className={sUtils.pushedBottom3} />

      <div className={sUtils.pushedBottom3}>
        <Heading size="sm">Запрос</Heading>
        <Row>
          <Col sm="6">
            <FormField
              label="Предложение"
              field={fields.requestDetails.offerKind}
              float
              options={dict.offerKinds}
              isStatic={isStatic}
            >
              <Select className={sUtils.fontSizeMd} options={options.offerKinds} disableReset />
            </FormField>
          </Col>

          <Col sm="6">
            <FormField
              label="Категория"
              field={fields.requestDetails.category}
              float
              options={dict.categories}
              isStatic={isStatic}
            >
              <Select
                className={sUtils.fontSizeMd}
                options={options.categories}
                labelKey="title"
                valueKey="id"
                disableReset
              />
            </FormField>
          </Col>

          <Col sm="6">
            <FormField
              label="Тип"
              field={fields.requestDetails.kind}
              float
              options={dict.kinds}
              isStatic={isStatic}
            >
              <Select
                className={sUtils.fontSizeMd}
                options={options.kinds}
                labelKey="title"
                valueKey="id"
                disableReset
              />
            </FormField>
          </Col>
        </Row>

        <Row>
          <Col sm="6">
            <FormField
              float
              field={fields.requestDetails.price.from}
              label="Цена, от"
              isStatic={isStatic}
              price
            >
              <PriceInput className={sUtils.fontSizeMd} block type="text" />
            </FormField>
          </Col>

          <Col sm="6">
            <FormField
              float
              field={fields.requestDetails.price.to}
              label="Цена, до"
              isStatic={isStatic}
              price
            >
              <PriceInput className={sUtils.fontSizeMd} block type="text" />
            </FormField>
          </Col>

          <Col sm="6">
            <FormField
              field={fields.requestDetails.currency}
              label="Валюта"
              float
              options={dict.currencies}
              isStatic={isStatic}
            >
              <Select
                className={sUtils.fontSizeMd}
                options={options.currencies}
                labelKey="title"
                valueKey="id"
                disableReset
              />
            </FormField>
          </Col>
        </Row>
      </div>

      {PropertyAbout && <PropertyAbout fields={fields.requestDetails} isStatic={isStatic} />}
    </section>
  );
};
