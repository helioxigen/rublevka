import React from 'react';

import cn from 'classnames';

import ConditionalInput from './conditionalInput';
import UI from 'cem/components/ui';
const {
  Checklist, Heading,
  Form: { Group, Input, Label, Static, Helper },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default ({ className, options, fields: { landDetails, additionalDetails }, isUpdateAllowed }) => (
  <section className={className}>
    <Row>
      <Col sm="10">
        <Row>
          <Col xs="20">
            <Heading size="md">Участок</Heading>
          </Col>
        </Row>
        <Row>
          <Col lg="16">
            <Row>
              <Col md="10">
                {isUpdateAllowed &&
                  <Group float kind={landDetails.area.touched && !!landDetails.area.error && 'error'}>
                    <Input valueClassName="floatLabel" placeholder="Площадь" block type="text" {...landDetails.area} />
                    <Label>Площадь</Label>
                    {landDetails.area.touched && landDetails.area.error && <Helper>{landDetails.area.error}</Helper>}
                  </Group>
                }
                {!isUpdateAllowed &&
                  <Group>
                    <Label block>Площадь</Label>
                    <Static>{landDetails.area.value}</Static>
                  </Group>
                }
              </Col>
              <Col md="10">
                <Group>
                  <Label className={sUtils.pushedBottom1} block>Ландшафтные работы</Label>
                  <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                    <Input type="radio" {...landDetails.landscaping} value checked={landDetails.landscaping.value === 'true'} disabled={!isUpdateAllowed} />
                    Есть
                  </Label>
                  <Label className={s.radioLabel}>
                    <Input type="radio" {...landDetails.landscaping} value={false} checked={landDetails.landscaping.value !== 'true'} disabled={!isUpdateAllowed} />
                    Нет
                  </Label>
                </Group>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col lg="16">
            <Row>
              <Col sm="20">
                <Group className={sUtils.resetIndentation}>
                  <Label className={sUtils.pushedBottom1} block>Тип участка</Label>
                </Group>
              </Col>
              {options.landscapeKinds.map((item, index) => (
                <Col sm="10" key={index}>
                  <Label className={cn(s.checkboxLabel, sUtils.pushedBottom2_5)}>
                    <Checklist {...landDetails.landscapeKind} option={item.id} checkbox={<Input type="checkbox" disabled={!isUpdateAllowed} />} /> {item.title}
                  </Label>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

      </Col>

      <Col sm="10">
        <Row>
          <Col xs="20">
            <Heading size="md">Доп. строения</Heading>
          </Col>
        </Row>

        <Row>
          <Col lg="16" className={sUtils.pushedBottom3}>
            <ConditionalInput checkboxLabel="Гостевой дом" inputLabel="Площадь" value={additionalDetails.guestHouseArea} disabled={!isUpdateAllowed} />
            <ConditionalInput checkboxLabel="Дом охраны" inputLabel="Площадь" value={additionalDetails.securityHouseArea} disabled={!isUpdateAllowed} />
            <ConditionalInput checkboxLabel="Дом персонала" inputLabel="Площадь" value={additionalDetails.staffHouseArea} disabled={!isUpdateAllowed} />
            <ConditionalInput checkboxLabel="SPA-комплекс" inputLabel="Площадь" value={additionalDetails.spaArea} disabled={!isUpdateAllowed} />
            <ConditionalInput checkboxLabel="Баня" inputLabel="Площадь" value={additionalDetails.bathhouseArea} disabled={!isUpdateAllowed} />
          </Col>
        </Row>
      </Col>
    </Row>
  </section>
);
