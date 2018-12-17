import React from 'react';

import CountryAbout from './country';
import CityAbout from './city';

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

export default ({ fields, isStatic }) => {
  const PropertyAbout = aboutMap[fields.requestDetails.category.value];

  return (
    <div>
      <Row className={sUtils.pushedBottom3}>
        <Col md="18">
          <Heading size="md">Запрос</Heading>
          <Row>
            <Col sm="6">
              <FormField
                label="Тип предложения"
                field={fields.requestDetails.offerKind}
                float
                options={dict.offerKinds}
                static={isStatic}
              >
                <Select className={sUtils.fontSizeMd} options={options.offerKinds} />
              </FormField>
            </Col>

            <Col sm="6" smOffset="1">
              <FormField
                label="Категория"
                field={fields.requestDetails.category}
                float
                options={dict.categories}
                static={isStatic}
              >
                <Select
                  className={sUtils.fontSizeMd}
                  options={options.categories}
                  labelKey="title"
                  valueKey="id"
                />
              </FormField>
            </Col>

            <Col sm="6" smOffset="1">
              <FormField
                label="Тип"
                field={fields.requestDetails.kind}
                float
                options={dict.kinds}
                static={isStatic}
              >
                <Select
                  className={sUtils.fontSizeMd}
                  options={options.kinds}
                  labelKey="title"
                  valueKey="id"
                />
              </FormField>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Row>
                <Col sm="6" md="8">
                  <FormField
                    float
                    field={fields.requestDetails.price.from}
                    label="Цена, от"
                    static={isStatic}
                    price
                  >
                    <PriceInput className={sUtils.fontSizeMd} block type="text" />
                  </FormField>
                </Col>

                <Col sm="6" md="8">
                  <FormField
                    float
                    field={fields.requestDetails.price.to}
                    label="Цена, до"
                    static={isStatic}
                    price
                  >
                    <PriceInput className={sUtils.fontSizeMd} block type="text" />
                  </FormField>
                </Col>

                <Col sm="6" md="4">
                  <FormField
                    field={fields.requestDetails.currency}
                    label="Валюта"
                    float
                    options={dict.currencies}
                    static={isStatic}
                  >
                    <Select
                      className={sUtils.fontSizeMd}
                      options={options.currencies}
                      labelKey="title"
                      valueKey="id"
                    />
                  </FormField>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {PropertyAbout && <PropertyAbout fields={fields.requestDetails} isStatic={isStatic} />}
    </div>
  );
};
