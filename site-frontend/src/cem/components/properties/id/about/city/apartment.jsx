import React, { Component } from 'react';

import * as options from 'cem/constants/properties/options';

import UI from 'cem/components/ui';
const {
  Select,
  Heading,
  Form: { Group, Label, Helper, Input, Static },
  Grid: { Row, Col },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default class extends Component {
  render() {
    const {
      fields: { specification, information },
      isUpdateAllowed,
    } = this.props;

    return (
      <section className={this.props.className}>
        <Row>
          <Col xs="20">
            <Heading size="md">Описание квартиры</Heading>
          </Col>
        </Row>

        <Row>
          <Col sm="10">
            <Heading size="sm">Описание помещения</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <Group
                      kind={
                        specification.layout.touched &&
                        !!specification.layout.error &&
                        'error'
                      }
                    >
                      <Label>Планировка</Label>
                      <Select
                        block
                        options={options.layoutKinds}
                        {...specification.layout}
                        disabled={!isUpdateAllowed}
                      />
                      {specification.layout.touched &&
                        specification.layout.error && (
                          <Helper>{specification.layout.error}</Helper>
                        )}
                    </Group>
                  </Col>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.ceilHeight.touched &&
                          !!specification.ceilHeight.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Высота потолков, м"
                          block
                          type="text"
                          {...specification.ceilHeight}
                        />
                        <Label>Высота потолков, м</Label>
                        {specification.ceilHeight.touched &&
                          specification.ceilHeight.error && (
                            <Helper>{specification.ceilHeight.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Высота потолков, м</Label>
                        <Static>{specification.ceilHeight.value}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.totalArea.touched &&
                          !!specification.totalArea.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Общая площадь, м²"
                          block
                          type="text"
                          {...specification.totalArea}
                        />
                        <Label>Общая площадь, м²</Label>
                        {specification.totalArea.touched &&
                          specification.totalArea.error && (
                            <Helper>{specification.totalArea.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Общая площадь, м²</Label>
                        <Static>{specification.totalArea.value}</Static>
                      </Group>
                    )}
                  </Col>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.livingArea.touched &&
                          !!specification.livingArea.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Жилая площадь, м²"
                          block
                          type="text"
                          {...specification.livingArea}
                        />
                        <Label>Жилая площадь, м²</Label>
                        {specification.livingArea.touched &&
                          specification.livingArea.error && (
                            <Helper>{specification.livingArea.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Жилая площадь, м²</Label>
                        <Static>{specification.livingArea.value}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.kitchenArea.touched &&
                          !!specification.kitchenArea.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Площадь кухни, м²"
                          block
                          type="text"
                          {...specification.kitchenArea}
                        />
                        <Label>Площадь кухни, м²</Label>
                        {specification.kitchenArea.touched &&
                          specification.kitchenArea.error && (
                            <Helper>{specification.kitchenArea.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Площадь кухни, м²</Label>
                        <Static>{specification.kitchenArea.value}</Static>
                      </Group>
                    )}
                  </Col>
                  <Col sm="10">
                    <Group
                      kind={
                        specification.windows.touched &&
                        !!specification.windows.error &&
                        'error'
                      }
                    >
                      <Label>Окна</Label>
                      <Select
                        {...specification.windows}
                        options={options.windowOverlook}
                        valueKey="id"
                        labelKey="title"
                        disabled={!isUpdateAllowed}
                      />
                      {specification.windows.touched &&
                        specification.windows.error && (
                          <Helper>{specification.windows.error}</Helper>
                        )}
                    </Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.rooms.touched &&
                          !!specification.rooms.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Количество комнат"
                          block
                          type="text"
                          {...specification.rooms}
                        />
                        <Label>Количество комнат</Label>
                        {specification.rooms.touched &&
                          specification.rooms.error && (
                            <Helper>{specification.rooms.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Количество комнат</Label>
                        <Static>{specification.rooms.value}</Static>
                      </Group>
                    )}
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={specification.bedrooms}
                      label="Количество спален"
                      static={!isUpdateAllowed}
                      float
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.balconies.touched &&
                          !!specification.balconies.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          block
                          type="text"
                          placeholder="Количество балконов"
                          {...specification.balconies}
                        />
                        <Label>Количество балконов</Label>
                        {specification.balconies.touched &&
                          specification.balconies.error && (
                            <Helper>{specification.balconies.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Количество балконов</Label>
                        <Static>{specification.balconies.value}</Static>
                      </Group>
                    )}
                  </Col>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.loggias.touched &&
                          !!specification.loggias.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Количество лоджий"
                          block
                          type="text"
                          {...specification.loggias}
                        />
                        <Label>Количество лоджий</Label>
                        {specification.loggias.touched &&
                          specification.loggias.error && (
                            <Helper>{specification.loggias.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Количество лоджий</Label>
                        <Static>{specification.loggias.value}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.wcs.touched &&
                          !!specification.wcs.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Количество санузлов"
                          block
                          type="text"
                          {...specification.wcs}
                        />
                        <Label>Количество санузлов</Label>
                        {specification.wcs.touched &&
                          specification.wcs.error && (
                            <Helper>{specification.wcs.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Количество санузлов</Label>
                        <Static>{specification.wcs.value}</Static>
                      </Group>
                    )}
                  </Col>
                  <Col sm="10">
                    <Group
                      kind={
                        information.bathroom.touched &&
                        !!information.bathroom.error &&
                        'error'
                      }
                    >
                      <Label>Тип санузла</Label>
                      <Select
                        {...information.bathroom}
                        options={options.bathrooms}
                        valueKey="id"
                        labelKey="title"
                        disabled={!isUpdateAllowed}
                      />
                      {information.bathroom.touched &&
                        information.bathroom.error && (
                          <Helper>{information.bathroom.error}</Helper>
                        )}
                    </Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          specification.floor.touched &&
                          !!specification.floor.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Этаж"
                          block
                          type="text"
                          {...specification.floor}
                        />
                        <Label>Этаж</Label>
                        {specification.floor.touched &&
                          specification.floor.error && (
                            <Helper>{specification.floor.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Этаж</Label>
                        <Static>{specification.floor.value}</Static>
                      </Group>
                    )}
                  </Col>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        Панорамное остекленение
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...specification.panoramicGlazing}
                          value
                          checked={
                            specification.panoramicGlazing.value === 'true'
                          }
                          disabled={!isUpdateAllowed}
                        />
                        Да
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...specification.panoramicGlazing}
                          value={false}
                          checked={
                            specification.panoramicGlazing.value !== 'true'
                          }
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
                  <Col md="10">
                    <Group
                      kind={
                        information.condition.touched &&
                        !!information.condition.error &&
                        'error'
                      }
                    >
                      <Label>Состояние</Label>
                      <Select
                        {...information.condition}
                        options={options.conditions}
                        valueKey="id"
                        labelKey="title"
                        disabled={!isUpdateAllowed}
                      />
                      {information.condition.touched &&
                        information.condition.error && (
                          <Helper>{information.condition.error}</Helper>
                        )}
                    </Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="10">
                    <Group
                      kind={
                        information.renovate.touched &&
                        !!information.renovate.error &&
                        'error'
                      }
                    >
                      <Label>Ремонт</Label>
                      <Select
                        {...information.renovate}
                        options={options.renovate}
                        valueKey="id"
                        labelKey="title"
                        disabled={!isUpdateAllowed}
                      />
                      {information.renovate.touched &&
                        information.renovate.error && (
                          <Helper>{information.renovate.error}</Helper>
                        )}
                    </Group>
                  </Col>
                  <Col md="10">
                    <Group
                      kind={
                        information.furniture.touched &&
                        !!information.furniture.error &&
                        'error'
                      }
                    >
                      <Label>Мебель</Label>
                      <Select
                        {...information.furniture}
                        options={options.furniture}
                        valueKey="id"
                        labelKey="title"
                        disabled={!isUpdateAllowed}
                      />
                      {information.furniture.touched &&
                        information.furniture.error && (
                          <Helper>{information.furniture.error}</Helper>
                        )}
                    </Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="10">
                    <Group
                      kind={
                        information.conditioning.touched &&
                        !!information.conditioning.error &&
                        'error'
                      }
                    >
                      <Label>Кондиционирование</Label>
                      <Select
                        {...information.conditioning}
                        options={options.conditioning}
                        valueKey="id"
                        labelKey="title"
                        disabled={!isUpdateAllowed}
                      />
                      {information.conditioning.touched &&
                        information.conditioning.error && (
                          <Helper>{information.conditioning.error}</Helper>
                        )}
                    </Group>
                  </Col>
                  <Col md="10">
                    <Group
                      kind={
                        information.ventilation.touched &&
                        !!information.ventilation.error &&
                        'error'
                      }
                    >
                      <Label>Вентиляция</Label>
                      <Select
                        {...information.ventilation}
                        options={options.ventilation}
                        valueKey="id"
                        labelKey="title"
                        disabled={!isUpdateAllowed}
                      />
                      {information.ventilation.touched &&
                        information.ventilation.error && (
                          <Helper>{information.ventilation.error}</Helper>
                        )}
                    </Group>
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
