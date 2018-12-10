import React, { Component } from 'react';

import filterHelper from 'core/decorators/filter';

import UI from 'cem/components/ui';
const {
  Button, Heading,
  Select, AsyncSelect, PriceInput,
  Grid: { Row, Col },
  Form: { Input, Group, Label },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

import { currencies as currencyOptions } from 'cem/constants/properties/options';
import { states } from 'cem/constants/complexes/options';

import { fetchResource } from 'cem/helpers/autocomplete';

const FilterExtended = ({ fields }) => (
  <section>
    <Row className={sUtils.pushedTop3}>
      <Col sm="14" smOffset="3">
        <Row>
          <Col xs="20">
            <Heading size="md">Ответственный</Heading>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="6">
            <Group>
              <Label>Департамент</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/departments`, `name`, [`name`])} {...fields[`responsibleUser.departmentId`]} />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Отдел</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/divisions`, `name`, [`name`])} {...fields[`responsibleUser.divisionId`]} />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Сотрудник</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/users/staff`, `lastName,firstName`, [`firstName`, `lastName`])} {...fields[`responsibleUser.id`]} />
            </Group>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row className={sUtils.pushedTop3}>
      <Col sm="14" smOffset="3">
        <Row className={sUtils.pushedBottom3}>
          <Col xs="20">
            <Heading size="md">Предложения</Heading>
          </Col>
        </Row>
        <Row>
          <Col sm="2">
            <Group>
              <Label block>Валюта</Label>
              <Select options={currencyOptions} labelKey="title" valueKey="id" {...fields[`stats.price.currency`]} />
            </Group>
          </Col>
          <Col sm="4">
            <Group float>
              <PriceInput block valueClassName="floatLabel" placeholder="Цена от" type="text" disabled={!fields[`stats.price.currency`].value} {...fields[`stats.price.from`]} />
              <Label>Цена от</Label>
            </Group>
          </Col>
          <Col sm="4">
            <Group float>
              <PriceInput block valueClassName="floatLabel" placeholder="Цена до" type="text" disabled={!fields[`stats.price.currency`].value} {...fields[`stats.price.to`]} />
              <Label>Цена до</Label>
            </Group>
          </Col>
        </Row>
        {/* <Row>
          <Col xs="20">
            <Heading size="md">Цена</Heading>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="2">
            <Group>
              <Label block>Валюта</Label>
              <Select options={currencyOptions} labelKey="title" valueKey="id" {...fields[`stats.price.currency`]} />
            </Group>
          </Col>
          <Col sm="4">
            <Group float>
              <PriceInput block valueClassName="floatLabel" placeholder="Цена от" type="text" disabled={!fields[`stats.price.currency`].value} {...fields[`stats.price.from`]} />
              <Label>Цена от</Label>
            </Group>
          </Col>
          <Col sm="4">
            <Group float>
              <PriceInput block valueClassName="floatLabel" placeholder="Цена до" type="text" disabled={!fields[`stats.price.currency`].value} {...fields[`stats.price.to`]} />
              <Label>Цена до</Label>
            </Group>
          </Col>
        </Row> */}
      </Col>
    </Row>
  </section>
);

class Filter extends Component {
  state = {};

  toggleExtended() {
    this.setState({ extended: !this.state.extended });
  }

  render() {
    const { fields, count, resetFilter, filterCount, extendedFilterCount } = this.props;

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Row>
          <Col xs="20">
            <Row xs="center">
              <Col sm="3">
                <Group>
                  <Label block>ID</Label>
                  <Input className={sUtils.fullWidth} type="text" {...fields.id} />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label block>Название</Label>
                  <Input className={sUtils.fullWidth} type="text" {...fields.name} />
                </Group>
              </Col>
              <Col sm="6">
                <Group>
                  <Label block>Улица</Label>
                  <Input className={sUtils.fullWidth} type="text" {...fields[`location.street`]} />
                </Group>
              </Col>
              <Col sm="3">
                <Group>
                  <Label block>Статус</Label>
                  <Select options={states} {...fields.state} />
                </Group>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.state.extended && <FilterExtended {...this.props} />}
        <Row>
          <Col xs="20">
            <div className={s.btnGroup}>
              <Button size="xs" kind="primary" className={sUtils.pushedRight1} type="button" onClick={::this.toggleExtended}>
                {this.state.extended ? `Скрыть` : `Показать` } расширенный фильтр {!!extendedFilterCount && `(${extendedFilterCount})`}
              </Button>
              <Button className={sUtils.pushedTopXs2} size="xs" type="button" onClick={resetFilter} disabled={!filterCount}>Сбросить</Button>
              {!!count && <p className={s.textFind}>Найдено: {count}</p>}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

const fields = [
  `id`,
  `name`,
  `location.street`,
  `state`,
];

const extendedFields = [
  `responsibleUser.id`,
  `responsibleUser.departmentId`,
  `responsibleUser.divisionId`,

  `stats.price.currency`,
  `stats.price.from`,
  `stats.price.to`,

  `buildings.location.building`,
  `buildings.state`,
  `buildings.details.houseKind`,
  `buildings.details.builtYear`,
  `buildings.details.constructionStage`,
  `buildings.details.contractType`,
  `buildings.details.floors`,
  `buildings.details.constructionKind`,
  `buildings.details.security`,
  `buildings.details.withRubbishChute`,
  `buildings.details.parkings`,

  `properties.specification.totalArea`,
  `properties.specification.rooms`,
  `properties.kind`,
];

export default filterHelper(`complexes`, fields, extendedFields)(Filter);
