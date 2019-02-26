import React from 'react';

import UI from 'cem/components/ui';
const {
  Select,
  Heading,
  Grid: { Row, Col },
  Form: { Group, Input, Label },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';

export default ({
  className,
  fields: { specification },
  values: { kind },
  isUpdateAllowed,
}) => (
  <section className={className}>
    {kind !== 'land' && (
      <Row>
        <Col xs="20">
          <Heading size="md">Описание</Heading>
        </Col>
      </Row>
    )}

    {kind !== 'land' && (
      <Row>
        <Col sm="10">
          <Heading size="sm">Описание дома</Heading>
          <Row>
            <Col lg="16" className={sUtils.pushedBottom3}>
              <Row>
                <Col sm="10">
                  <FormField
                    field={specification.builtYear}
                    label="Год постройки"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField
                    field={specification.floors}
                    label="Количество уровней"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
              </Row>

              <Row>
                <Col sm="10">
                  <FormField
                    field={specification.wallMaterial}
                    options={dict.wallMaterials}
                    label="Конструкция дома"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Select options={options.wallMaterial} />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField
                    field={specification.roofMaterial}
                    options={dict.roofMaterials}
                    label="Материал крыши"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Select options={options.roofMaterial} />
                  </FormField>
                </Col>
              </Row>

              <Row className={sUtils.pushedBottom1_5}>
                <Col sm="10">
                  <FormField
                    field={specification.area}
                    label="Общая площадь"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField
                    field={specification.bedrooms}
                    label="Количество спален"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
              </Row>

              <Row>
                <Col sm="10">
                  <FormField
                    field={specification.rooms}
                    label="Количество комнат"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField
                    field={specification.wcs}
                    label="Количество сан. узлов"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
              </Row>

              <Row>
                <Col sm="10">
                  <FormField
                    field={specification.balconies}
                    label="Количество балконов"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField
                    field={specification.loggias}
                    label="Количество лоджий"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
              </Row>

              <Row>
                <Col sm="10">
                  <FormField
                    field={specification.ceilingHeight}
                    label="Высота потолков"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField
                    field={specification.elevators}
                    label="Количество лифтов"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Input block type="text" />
                  </FormField>
                </Col>
              </Row>

              <Row className={sUtils.pushedBottom1_5}>
                <Col sm="10">
                  <Group className={sUtils.resetIndentation}>
                    <Label className={sUtils.pushedBottom1} block>
                      Кондиционирование
                    </Label>
                    <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                      <Input
                        type="radio"
                        {...specification.withConditioning}
                        value
                        checked={
                          specification.withConditioning.value === 'true'
                        }
                        disabled={!isUpdateAllowed}
                      />
                      Есть
                    </Label>
                    <Label className={s.radioLabel}>
                      <Input
                        type="radio"
                        {...specification.withConditioning}
                        value={false}
                        checked={
                          specification.withConditioning.value !== 'true'
                        }
                        disabled={!isUpdateAllowed}
                      />
                      Нет
                    </Label>
                  </Group>
                </Col>
                <Col sm="10">
                  <Group className={sUtils.resetIndentation}>
                    <Label className={sUtils.pushedBottom1} block>
                      Вентиляция
                    </Label>
                    <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                      <Input
                        type="radio"
                        {...specification.withVentilation}
                        value
                        checked={specification.withVentilation.value === 'true'}
                        disabled={!isUpdateAllowed}
                      />
                      Есть
                    </Label>
                    <Label className={s.radioLabel}>
                      <Input
                        type="radio"
                        {...specification.withVentilation}
                        value={false}
                        checked={specification.withVentilation.value !== 'true'}
                        disabled={!isUpdateAllowed}
                      />
                      Нет
                    </Label>
                  </Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col sm="10">
          <Heading size="sm">Информация об объекте</Heading>
          <Row>
            <Col lg="16" className={sUtils.pushedBottom3}>
              <Row>
                <Col sm="10">
                  <FormField
                    field={specification.condition}
                    options={dict.conditions}
                    label="Состояние"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Select
                      valueKey="id"
                      labelKey="title"
                      options={options.conditions}
                    />
                  </FormField>
                </Col>
              </Row>

              <Row>
                <Col sm="10">
                  <FormField
                    field={specification.renovate}
                    options={dict.renovateKinds}
                    label="Ремонт"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Select
                      valueKey="id"
                      labelKey="title"
                      options={options.renovate}
                    />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField
                    field={specification.furniture}
                    options={dict.furnitureKinds}
                    label="Мебель"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Select
                      valueKey="id"
                      labelKey="title"
                      options={options.furniture}
                    />
                  </FormField>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    )}
  </section>
);
