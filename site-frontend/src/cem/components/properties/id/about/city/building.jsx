import React, { Component } from 'react';
import * as options from 'cem/constants/complexBuildings/options';
import FormField from 'cem/helpers/formField';

// import Infrastructure from './infrastructure';

import UI from 'cem/components/ui';
const {
  Select,
  Heading,
  Form: { Label, Group, Helper, Input },
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Description extends Component {
  render() {
    const { fields, isUpdateAllowed } = this.props;

    return (
      <section className={this.props.className}>
        <Heading size="md">Описание здания</Heading>
        <Row>
          <Col sm="10">
            <Heading size="sm">Сведения о постройке</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.houseKind}
                      label="Тип дома"
                      float
                      static={!isUpdateAllowed}
                    >
                      <Select
                        options={options.houseKinds}
                        {...fields.details.houseKind}
                      />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={fields.details.builtYear}
                      label="Год постройки"
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
                      field={fields.details.series}
                      label="Серия дома"
                      float
                      static={!isUpdateAllowed}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="10">
            <Heading size="sm">Особенности</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.floors}
                      label="Этажей в доме"
                      float
                      static={!isUpdateAllowed}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                  <Col md="10">
                    <FormField
                      field={fields.details.constructionKind}
                      label="Конструкция дома"
                      float
                      static={!isUpdateAllowed}
                    >
                      <Select
                        options={options.constructionKinds}
                        {...fields.details.constructionKind}
                      />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.elevators}
                      label="Количество лифтов"
                      float
                      static={!isUpdateAllowed}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={fields.details.freightElevators}
                      label="Количество грузовых лифтов"
                      float
                      static={!isUpdateAllowed}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col md="10">
                    <FormField
                      field={fields.details.security}
                      label="Безопасность"
                      float
                      static={!isUpdateAllowed}
                    >
                      <Select
                        options={options.securityKinds}
                        {...fields.details.security}
                      />
                    </FormField>
                  </Col>
                  <Col md="10">
                    <Group
                      kind={
                        fields.details.withRubbishChute.touched &&
                        !!fields.details.withRubbishChute.error &&
                        'error'
                      }
                    >
                      <Label className={sUtils.pushedBottom1} block>
                        Мусоропровод
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...fields.details.withRubbishChute}
                          value
                          checked={
                            fields.details.withRubbishChute.value === 'true'
                          }
                          disabled={!isUpdateAllowed}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...fields.details.withRubbishChute}
                          value={false}
                          checked={
                            fields.details.withRubbishChute.value !== 'true'
                          }
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                      {fields.details.withRubbishChute.touched &&
                        fields.details.withRubbishChute.error && (
                          <Helper>
                            {fields.details.withRubbishChute.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm="10">
            <Heading size="sm">Паркинг</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <Group
                      kind={
                        fields.details.withParkings.touched &&
                        !!fields.details.withParkings.error &&
                        'error'
                      }
                    >
                      <Label className={sUtils.pushedBottom1} block>
                        Паркинг
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...fields.details.withParkings}
                          value
                          checked={fields.details.withParkings.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...fields.details.withParkings}
                          value={false}
                          checked={fields.details.withParkings.value !== 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                      {fields.details.withParkings.touched &&
                        fields.details.withParkings.error && (
                          <Helper>{fields.details.withParkings.error}</Helper>
                        )}
                    </Group>
                  </Col>
                  <Col sm="10">
                    {fields.details.withParkings.value === 'true' && (
                      <FormField
                        field={fields.details.parkings}
                        label="Количество машиномест"
                        float
                        static={!isUpdateAllowed}
                      >
                        <Input block type="text" />
                      </FormField>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <Group
                      kind={
                        fields.details.withUndergroundGarages.touched &&
                        !!fields.details.withUndergroundGarages.error &&
                        'error'
                      }
                    >
                      <Label className={sUtils.pushedBottom1} block>
                        Подземный гараж
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...fields.details.withUndergroundGarages}
                          value
                          checked={
                            fields.details.withUndergroundGarages.value ===
                            'true'
                          }
                          disabled={!isUpdateAllowed}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...fields.details.withUndergroundGarages}
                          value={false}
                          checked={
                            fields.details.withUndergroundGarages.value !==
                            'true'
                          }
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                      {fields.details.withUndergroundGarages.touched &&
                        fields.details.withUndergroundGarages.error && (
                          <Helper>
                            {fields.details.withUndergroundGarages.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>
                  <Col sm="10">
                    {fields.details.withUndergroundGarages.value === 'true' && (
                      <FormField
                        field={fields.details.undergroundGarages}
                        label="Количество машиномест"
                        float
                        static={!isUpdateAllowed}
                      >
                        <Input block type="text" />
                      </FormField>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Description;
