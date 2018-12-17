import React from 'react';
import cn from 'classnames';

import FormField from 'cem/helpers/formField';
import { fetchResource } from 'cem/helpers/autocomplete';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';

import UI from 'cem/components/ui';
const {
  Select,
  AsyncSelect,
  Heading,
  Grid: { Row, Col },
  Form: { Input },
} = UI;

import sUtils from 'cem/styles/utils';

export default ({ fields, isStatic }) => {
  const propertyFields = fields.countryProperty;
  const localityDependencies = { 'route.id': propertyFields.location.routeId.value };
  const settlementDependencies = {
    'location.routeId': propertyFields.location.routeId.value,
    'location.localityId': propertyFields.location.localityId.value,
  };

  const fetchRoute = fetchResource('/v1/places/routes', 'name');
  const fetchLocality = fetchResource('/v1/places/localities', 'name');
  const fetchSettlement = fetchResource('/v1/places/settlements', 'name');

  return (
    <section>
      <div className={sUtils.pushedBottom3}>
        <Heading size="sm">Дом и участок</Heading>
        <div className={sUtils.flexContainer}>
          <FormField
            float
            label="Площадь от"
            className={sUtils.pushedRight1}
            field={propertyFields.area.from}
            isStatic={isStatic}
          >
            <Input block type="text" />
          </FormField>
          <FormField
            float
            label="Площадь до"
            className={sUtils.pushedRight1}
            field={propertyFields.area.to}
            isStatic={isStatic}
          >
            <Input block type="text" />
          </FormField>
          <FormField
            float
            label="Спален от"
            className={sUtils.pushedRight1}
            field={propertyFields.bedrooms.from}
            isStatic={isStatic}
          >
            <Input block type="text" />
          </FormField>
          <FormField
            float
            label="Спален до"
            className={sUtils.pushedRight1}
            field={propertyFields.bedrooms.to}
            isStatic={isStatic}
          >
            <Input block type="text" />
          </FormField>
          <FormField
            float
            label="Участок от"
            className={sUtils.pushedRight1}
            field={propertyFields.landArea.from}
            isStatic={isStatic}
          >
            <Input block type="text" />
          </FormField>
          <FormField
            float
            label="Участок до"
            className={sUtils.pushedRight1}
            field={propertyFields.landArea.to}
            isStatic={isStatic}
          >
            <Input block type="text" />
          </FormField>
        </div>
      </div>

      <div className={sUtils.pushedBottom3}>
        <Heading size="sm">Расположение</Heading>
        <div className={sUtils.flexContainer}>
          <FormField
            label="Направление"
            className={cn(sUtils.pushedRight1, sUtils.width16_5)}
            field={propertyFields.location.routeId}
            asyncValue={fetchRoute}
            float
            isStatic={isStatic}
            labelKey="name"
          >
            <AsyncSelect asyncOptions={fetchRoute} />
          </FormField>
          <FormField
            label="Нас. пункт"
            className={cn(sUtils.pushedRight1, sUtils.width16_5)}
            field={propertyFields.location.localityId}
            asyncValue={fetchLocality}
            float
            isStatic={isStatic}
            labelKey="name"
          >
            <AsyncSelect asyncOptions={fetchLocality} linkedTo={localityDependencies} />
          </FormField>
          <FormField
            label="Поселок"
            className={cn(sUtils.pushedRight1, sUtils.width16_5)}
            field={propertyFields.location.settlementId}
            asyncValue={fetchSettlement}
            float
            isStatic={isStatic}
            labelKey="name"
          >
            <AsyncSelect asyncOptions={fetchSettlement} linkedTo={settlementDependencies} />
          </FormField>
          <FormField
            float
            label="МКАД от"
            className={sUtils.pushedRight1}
            field={propertyFields.location.mkadDistance.from}
            isStatic={isStatic}
          >
            <Input valueClassName="floatLabel" block type="text" />
          </FormField>
          <FormField
            float
            label="МКАД до"
            field={propertyFields.location.mkadDistance.to}
            isStatic={isStatic}
          >
            <Input valueClassName="floatLabel" block type="text" />
          </FormField>
        </div>
      </div>

      <div className={sUtils.pushedBottom3}>
        <Heading size="sm">Состояние</Heading>

        <Row>
          <Col sm="6">
            <FormField
              label="Состояние"
              className={sUtils.pushedRight1}
              field={fields.condition}
              options={dict.conditions}
              float
              isStatic={isStatic}
            >
              <Select options={options.conditions} labelKey="title" valueKey="id" />
            </FormField>
          </Col>

          <Col sm="6" smOffset="1">
            <FormField
              label="Ремонт"
              className={sUtils.pushedRight1}
              field={fields.renovate}
              options={dict.renovateKinds}
              float
              isStatic={isStatic}
            >
              <Select options={options.renovate} labelKey="title" valueKey="id" />
            </FormField>
          </Col>

          <Col sm="6" smOffset="1">
            <FormField
              label="Мебель"
              className={sUtils.pushedRight1}
              field={fields.furniture}
              options={dict.furnitureKinds}
              float
              isStatic={isStatic}
            >
              <Select options={options.furniture} labelKey="title" valueKey="id" />
            </FormField>
          </Col>
        </Row>
      </div>
    </section>
  );
};
