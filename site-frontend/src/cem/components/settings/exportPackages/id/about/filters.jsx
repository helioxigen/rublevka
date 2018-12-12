import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const { AsyncSelect, Select, Heading, Grid: { Row, Col } } = UI;

import sUtils from 'cem/styles/utils';

import { fetchResource } from 'cem/helpers/autocomplete';

import * as propertyDict from 'cem/constants/properties/dictionaries';
import * as propertyOptions from 'cem/constants/properties/options';
import * as dict from 'cem/constants/settings/exportPackages/dictionaries';
import * as options from 'cem/constants/settings/exportPackages/options';

const offerKinds = [{ value: 'sale', label: 'Продажа' }, { value: 'rent', label: 'Аренда' }];

const getOfferKindValue = (saleOfferPriceValue, rentOfferPriceValue) => {
  if (saleOfferPriceValue) {
    return 'sale';
  } else if (rentOfferPriceValue) {
    return 'rent';
  }
};

class Filters extends Component {
  handleCategoryChange(value) {
    const { fields } = this.props;

    fields.filter.category.onChange(value);
    fields.filter.id.onChange(undefined);
    fields.filterNot.id.onChange(undefined);
    fields.filter.location.settlementId.onChange(undefined);
    fields.filterNot.location.settlementId.onChange(undefined);
  }

  render() {
    const { fields, values, isUpdateAllowed } = this.props;

    const categoryField = {
      ...fields.filter.category,
      onChange: ::this.handleCategoryChange,
    };

    const offerKindField = {
      value: getOfferKindValue(
        fields.filter.saleOffer.price.value,
        fields.filter.rentOffer.price.value,
      ),
      onChange: (selectedOfferKind) => {
        if (selectedOfferKind === 'sale') {
          fields.filter.saleOffer.price.onChange('0..');
        } else {
          fields.filter.saleOffer.price.onChange(undefined);
        }

        if (selectedOfferKind === 'rent') {
          fields.filter.rentOffer.price.onChange('0..');
        } else {
          fields.filter.rentOffer.price.onChange(undefined);
        }
      },
    };

    return (
      <section>
        <Row className={sUtils.pushedBottom6}>
          <Col sm="10">
            <Heading size="md">Включить объекты</Heading>
            <Row>
              <Col sm="6">
                <FormField
                  label="Категория"
                  field={categoryField}
                  options={propertyDict.categories}
                  static={!isUpdateAllowed}
                >
                  <Select
                    className={sUtils.fontSizeMd}
                    valueKey="id"
                    labelKey="title"
                    {...categoryField}
                    options={propertyOptions.categories}
                  />
                </FormField>
              </Col>
              <Col sm="7">
                <FormField label="Тип предложения" field={offerKindField} static={!isUpdateAllowed}>
                  <Select className={sUtils.fontSizeMd} options={offerKinds} {...offerKindField} />
                </FormField>
              </Col>
              <Col sm="7">
                <FormField label="Статус" field={fields.filter.state} static={!isUpdateAllowed}>
                  <Select
                    className={sUtils.fontSizeMd}
                    valueKey="id"
                    labelKey="title"
                    multi
                    {...fields.filter.state}
                    options={propertyOptions.states}
                  />
                </FormField>
              </Col>
            </Row>
            <Row>
              <Col sm="20">
                <FormField
                  label="Тип"
                  field={fields.filter.kind}
                  options={propertyDict.kinds}
                  static={!isUpdateAllowed}
                >
                  <Select
                    className={sUtils.fontSizeMd}
                    valueKey="id"
                    labelKey="title"
                    multi
                    {...fields.filter.kind}
                    options={propertyOptions.kinds}
                  />
                </FormField>
              </Col>
            </Row>
            <Row>
              <Col sm="13">
                <FormField
                  label="Тип продажи"
                  field={fields.filter.isResale}
                  options={propertyDict.resaleKinds}
                  static={!isUpdateAllowed}
                >
                  <Select
                    className={sUtils.fontSizeMd}
                    {...fields.filter.isResale}
                    options={propertyOptions.resaleKinds}
                  />
                </FormField>
              </Col>
              <Col sm="7">
                <FormField
                  label="Водяной знак"
                  field={fields.watermark}
                  options={dict.watermarks}
                  static={!isUpdateAllowed}
                >
                  <Select
                    className={sUtils.fontSizeMd}
                    {...fields.watermark}
                    options={options.watermarks}
                  />
                </FormField>
              </Col>
            </Row>
            <Row>
              <Col sm="20">
                <FormField label="ID" field={fields.filter.id} static={!isUpdateAllowed}>
                  <Select
                    multi
                    allowCreate
                    {...fields.filter.id}
                    disabled={!values.filter.category}
                  />
                </FormField>
              </Col>
            </Row>
            {values.filter.category === 'country' && (
              <Row>
                <Col sm="20">
                  <FormField
                    label="Поселки"
                    field={fields.filter.location.settlementId}
                    static={!isUpdateAllowed}
                  >
                    <AsyncSelect
                      multi
                      valueKey="id"
                      asyncOptions={fetchResource('/v1/places/settlements', 'name', ['name'])}
                      {...fields.filter.location.settlementId}
                    />
                  </FormField>
                </Col>
              </Row>
            )}
          </Col>
          <Col sm="10">
            <Heading size="md">Исключить объекты</Heading>
            <Row>
              <Col sm="20">
                <FormField label="ID" field={fields.filterNot.id} static={!isUpdateAllowed}>
                  <Select
                    multi
                    allowCreate
                    {...fields.filterNot.id}
                    disabled={!values.filter.category}
                  />
                </FormField>
              </Col>
            </Row>
            {values.filter.category === 'country' && (
              <Row>
                <Col sm="20">
                  <FormField
                    label="Поселки"
                    field={fields.filterNot.location.settlementId}
                    static={!isUpdateAllowed}
                  >
                    <AsyncSelect
                      multi
                      valueKey="id"
                      asyncOptions={fetchResource('/v1/places/settlements', 'name', ['name'])}
                      {...fields.filterNot.location.settlementId}
                    />
                  </FormField>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </section>
    );
  }
}

export default Filters;
