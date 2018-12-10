import React, { Component } from 'react';

import filterHelper from 'core/decorators/filter';

import UI from 'cem/components/ui';
const {
  Button, Heading,
  Daypicker, Select, AsyncSelect,
  Grid: { Row, Col },
  Form: { Input, Label, Group },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

import * as options from 'cem/constants/requests/search/options';

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
        <Row>
          <Col xs="20">
            <Heading size="md">Заказчик</Heading>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="6">
            <Group>
              <Label>Департамент</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/departments`, `name`, [`name`])} {...fields[`createdByUser.departmentId`]} />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Отдел</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/divisions`, `name`, [`name`])} {...fields[`createdByUser.divisionId`]} />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Сотрудник</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/users/staff`, `lastName,firstName`, [`firstName`, `lastName`])} {...fields[`createdByUser.id`]} />
            </Group>
          </Col>
        </Row>
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
          <Col xs="20" sm="14" smOffset="3">
            <Row>
            <Col sm="5">
              <Group>
                <Label>ID</Label>
                <Input block type="text" {...fields.id} />
              </Group>
            </Col>
             <Col sm="5">
              <Group>
                <Label>Категория объекта</Label>
                <Select options={options.categories} {...fields.propertyCategory} />
              </Group>
            </Col>
            <Col sm="5">
              <Group>
                <Label block>Дата от</Label>
                <Daypicker className={sUtils.fullWidth} kind="from"
                  control={<Input block type="text" {...fields.dateFrom} required />}
                  button={<Button className={sDaypicker.btn}><UI.Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                  onDayClick={day => fields.dateFrom.onChange(day)} />
              </Group>
            </Col>
            <Col sm="5">
              <Group>
                <Label block>Дата до</Label>
                <Daypicker className={sUtils.fullWidth} kind="to"
                  control={<Input block type="text" {...fields.dateTo} required />}
                  button={<Button className={sDaypicker.btn}><UI.Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                  onDayClick={day => fields.dateTo.onChange(day)} />
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
  `propertyCategory`,
  `dateFrom`,
  `dateTo`,
];

const extendedFields = [
  `responsibleUser.id`,
  `responsibleUser.divisionId`,
  `responsibleUser.departmentId`,
  `createdByUser.id`,
  `createdByUser.divisionId`,
  `createdByUser.departmentId`,
];

export default filterHelper(`searchRequests`, fields, extendedFields)(Filter);
