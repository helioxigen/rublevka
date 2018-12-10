import React from 'react';


import ConditionalInput from './conditionalInput';
import UI from 'cem/components/ui';
const {
  Select, Heading,
  Form: { Group, Static, Input, Label, Helper },
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

export default ({ className, options, fields: { communication, additionalDetails }, isUpdateAllowed }) => (
  <section className={className}>
    <Row>
      <Col sm="10">
        <Row>
          <Col xs="20">
            <Heading size="md">Коммуникации</Heading>
          </Col>
        </Row>
        <Row>
          <Col lg="18">
            <Row>
              <Col md="15" lg="10">
                <Group kind={communication.gasSupply.touched && !!communication.gasSupply.error && 'error'}>
                  <Label>Газ</Label>
                  <Select labelKey="title" valueKey="id" options={options.gasSupply} disabled={!isUpdateAllowed} {...communication.gasSupply} />
                  {communication.gasSupply.touched && communication.gasSupply.error && <Helper>{communication.gasSupply.error}</Helper>}
                </Group>
              </Col>
            </Row>
            <Row>
              <Col md="15" lg="10">
                {isUpdateAllowed &&
                  <Group float kind={communication.powerSupply.touched && !!communication.powerSupply.error && 'error'}>
                    <Input valueClassName="floatLabel" placeholder="Электричество" block type="text" {...communication.powerSupply} />
                    <Label>Электричество</Label>
                    {communication.powerSupply.touched && communication.powerSupply.error && <Helper>{communication.powerSupply.error}</Helper>}
                  </Group>
                }
                {!isUpdateAllowed &&
                  <Group>
                    <Label block>Электричество</Label>
                    <Static>{communication.powerSupply.value}</Static>
                  </Group>
                }
              </Col>
            </Row>
            <Row>
              <Col md="15" lg="10">
                <Group kind={communication.sewerageSupply.touched && !!communication.sewerageSupply.error && 'error'}>
                  <Label>Канализация</Label>
                  <Select labelKey="title" valueKey="id" options={options.sewerageSupply} disabled={!isUpdateAllowed} {...communication.sewerageSupply} onBlur={() => {}} />
                  {communication.sewerageSupply.touched && communication.sewerageSupply.error && <Helper>{communication.sewerageSupply.error}</Helper>}
                </Group>
              </Col>
            </Row>
            <Row>
              <Col md="15" lg="10">
                <Group kind={communication.waterSupply.touched && !!communication.waterSupply.error && 'error'}>
                  <Label>Водоснабжение</Label>
                  <Select labelKey="title" valueKey="id" options={options.waterSupply} disabled={!isUpdateAllowed} {...communication.waterSupply} onBlur={() => {}} />
                  {communication.waterSupply.touched && communication.waterSupply.error && <Helper>{communication.waterSupply.error}</Helper>}
                </Group>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col sm="10">
        <Row>
          <Col xs="20">
            <Heading size="md">Паркинг</Heading>
          </Col>
        </Row>

        <Row>
          <Col lg="16" className={sUtils.pushedBottom3}>
            <ConditionalInput checkboxLabel="Гараж" inputLabel="Количество машиномест" value={additionalDetails.garageArea} disabled={!isUpdateAllowed} />
            <ConditionalInput checkboxLabel="Паркинг" inputLabel="Количество машиномест" value={additionalDetails.parkingArea} disabled={!isUpdateAllowed} />
          </Col>
        </Row>
      </Col>
    </Row>
  </section>
);
