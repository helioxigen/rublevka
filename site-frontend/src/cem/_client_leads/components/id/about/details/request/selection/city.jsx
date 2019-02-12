import React from 'react';

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

import FormField from 'cem/helpers/formField';
import { fetchResource } from 'cem/helpers/autocomplete';

export default ({ fields, isStatic }) => {
  const propertyFields = fields.cityProperty;
  const residentialComplexDependency = {
    'location.subLocalityId': propertyFields.location.subLocalityId.value,
  };

  const fetchSubLocality = fetchResource('/v1/places/sub_localities', 'name');
  const fetchResidentialComplex = fetchResource('/v1/complexes', 'name', null, {
    name: '|null|',
  });

  return (
    <section>
      <Row className={sUtils.pushedBottom3}>
        <Col md="18">
          <Heading size="md">Квартира</Heading>
          <div className={sUtils.flexContainer}>
            <FormField
              float
              label="Площадь общая от"
              className={sUtils.pushedRight1}
              field={propertyFields.area.from}
              static={isStatic}
            >
              <Input block type="text" />
            </FormField>
            <FormField
              float
              label="Площадь общая до"
              className={sUtils.pushedRight1}
              field={propertyFields.area.to}
              static={isStatic}
            >
              <Input block type="text" />
            </FormField>
            <FormField
              float
              label="Площадь жилая от"
              className={sUtils.pushedRight1}
              field={propertyFields.livingArea.from}
              static={isStatic}
            >
              <Input block type="text" />
            </FormField>
            <FormField
              float
              label="Площадь жилая до"
              className={sUtils.pushedRight1}
              field={propertyFields.livingArea.to}
              static={isStatic}
            >
              <Input block type="text" />
            </FormField>
            <FormField
              float
              label="Комнат от"
              className={sUtils.pushedRight1}
              field={propertyFields.rooms.from}
              static={isStatic}
            >
              <Input block type="text" />
            </FormField>
            <FormField
              float
              label="Комнат до"
              className={sUtils.pushedRight1}
              field={propertyFields.rooms.to}
              static={isStatic}
            >
              <Input block type="text" />
            </FormField>
          </div>
        </Col>
      </Row>

      <Row className={sUtils.pushedBottom3}>
        <Col md="18">
          <Heading size="md">Расположение</Heading>
          <div className={sUtils.flexContainer}>
            <FormField
              label="Район"
              className={sUtils.pushedRight1}
              field={propertyFields.location.subLocalityId}
              asyncValue={fetchSubLocality}
              labelKey="name"
              float
              static={isStatic}
            >
              <AsyncSelect asyncOptions={fetchSubLocality} />
            </FormField>
            <FormField
              label="Жилой комплекс"
              className={sUtils.pushedRight1}
              field={propertyFields.location.residentialComplexId}
              asyncValue={fetchResidentialComplex}
              labelKey="name"
              float
              static={isStatic}
            >
              <AsyncSelect
                asyncOptions={fetchResidentialComplex}
                linkedTo={residentialComplexDependency}
              />
            </FormField>
            {/* <FormField label="Метро" className={sUtils.pushedRight1} >
              <Input valueClassName="floatLabel" block type="text" />
            </FormField> */}
            <FormField
              label="Улица"
              className={sUtils.pushedRight1}
              field={propertyFields.location.street}
              static={isStatic}
            >
              <Input block type="text" />
            </FormField>
          </div>
        </Col>
      </Row>

      <Row className={sUtils.pushedBottom3}>
        <Col md="14">
          <Heading size="md">Состояние</Heading>
          <Row>
            <Col sm="6">
              <FormField
                label="Состояние"
                className={sUtils.pushedRight1}
                field={fields.condition}
                options={dict.conditions}
                float
                static={isStatic}
              >
                <Select
                  options={options.conditions}
                  labelKey="title"
                  valueKey="id"
                />
              </FormField>
            </Col>

            <Col sm="6" smOffset="1">
              <FormField
                label="Ремонт"
                className={sUtils.pushedRight1}
                field={fields.renovate}
                options={dict.renovateKinds}
                float
                static={isStatic}
              >
                <Select
                  options={options.renovate}
                  labelKey="title"
                  valueKey="id"
                />
              </FormField>
            </Col>

            <Col sm="6" smOffset="1">
              <FormField
                label="Мебель"
                className={sUtils.pushedRight1}
                field={fields.furniture}
                options={dict.furnitureKinds}
                float
                static={isStatic}
              >
                <Select
                  options={options.furniture}
                  labelKey="title"
                  valueKey="id"
                />
              </FormField>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};
