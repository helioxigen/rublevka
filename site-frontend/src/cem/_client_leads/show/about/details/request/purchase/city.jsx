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

export default ({ fields, isStatic, className }) => {
  const propertyFields = fields.cityProperty;
  const residentialComplexDependency = {
    'location.subLocalityId': propertyFields.location.subLocalityId.value,
  };

  const fetchSubLocality = fetchResource('/v1/places/sub_localities', 'name');
  const fetchComplex = fetchResource('/v1/complexes', 'name', null, { name: '|null|' });

  return (
    <section className={className}>
      <div className={sUtils.pushedBottom3}>
        <Heading size="sm">Квартира</Heading>
        <Row>
          <Col sm="6">
            <FormField
              float
              label="Общая площадь от"
              field={propertyFields.area.from}
              isStatic={isStatic}
            >
              <Input block type="text" />
            </FormField>
          </Col>
          <Col sm="6">
            <FormField
              float
              label="Общая площадь до"
              field={propertyFields.area.to}
              isStatic={isStatic}
            >
              <Input block type="text" />
            </FormField>
          </Col>
          <Col sm="6">
            <FormField
              float
              label="Жилая площадь от"
              field={propertyFields.livingArea.from}
              isStatic={isStatic}
            >
              <Input block type="text" />
            </FormField>
          </Col>
          <Col sm="6">
            <FormField
              float
              label="Жилая площадь до"
              field={propertyFields.livingArea.to}
              isStatic={isStatic}
            >
              <Input block type="text" />
            </FormField>
          </Col>
          <Col sm="6">
            <FormField
              float
              label="Комнат от"
              field={propertyFields.rooms.from}
              isStatic={isStatic}
            >
              <Input block type="text" />
            </FormField>
          </Col>
          <Col sm="6">
            <FormField float label="Комнат до" field={propertyFields.rooms.to} isStatic={isStatic}>
              <Input block type="text" />
            </FormField>
          </Col>
        </Row>
      </div>

      <div className={sUtils.pushedBottom3}>
        <Heading size="sm">Расположение</Heading>

        <Row>
          <Col sm="6">
            <FormField
              label="Район"
              field={propertyFields.location.subLocalityId}
              asyncValue={fetchSubLocality}
              labelKey="name"
              float
              isStatic={isStatic}
            >
              <AsyncSelect asyncOptions={fetchSubLocality} />
            </FormField>
          </Col>
          <Col sm="14">
            <FormField
              label="Жилой комплекс"
              field={propertyFields.complexId}
              asyncValue={fetchComplex}
              labelKey="name"
              float
              isStatic={isStatic}
            >
              <AsyncSelect asyncOptions={fetchComplex} linkedTo={residentialComplexDependency} />
            </FormField>
          </Col>
          <Col sm="20">
            <FormField label="Улица" field={propertyFields.location.street} isStatic={isStatic}>
              <Input block type="text" />
            </FormField>
          </Col>
        </Row>
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

          <Col sm="8">
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

          <Col sm="6">
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
