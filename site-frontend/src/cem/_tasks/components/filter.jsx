import React, { Component } from 'react';
import cn from 'classnames';

import { FormattedNumber } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Button,
  Daypicker,
  Icon,
  Select,
  AsyncSelect,
  Heading,
  Grid: { Row, Col },
  Form: { Group, Label, Input },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

// helpers
import filterHelper from 'core/decorators/filter';
import { fetchResource } from 'cem/helpers/autocomplete';

import * as options from 'cem/constants/tasks/options';

const FilterExtended = ({ fields }) => (
  <section>
    <Row>
      <Col lg="18" lgOffset="1">
        <Row className={sUtils.pushedTop3}>
          <Col xs="20">
            <Heading size="md">Ответственный</Heading>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="6">
            <Group>
              <Label>Департамент</Label>
              <AsyncSelect
                asyncOptions={fetchResource(`/v1/departments`, `name`, [
                  `name`,
                ])}
                {...fields.ruDepartmentId}
              />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Отдел</Label>
              <AsyncSelect
                asyncOptions={fetchResource(`/v1/divisions`, `name`, [`name`])}
                {...fields.ruDivisionId}
              />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Ответственный</Label>
              <AsyncSelect
                asyncOptions={fetchResource(
                  `/v1/users/staff`,
                  `lastName,firstName`,
                  [`firstName`, `lastName`],
                )}
                {...fields.ruId}
              />
            </Group>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col lg="18" lgOffset="1">
        <Row className={sUtils.pushedTop3}>
          <Col xs="20">
            <Heading size="md">Дополнительно</Heading>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="6">
            <Label className={s.checkboxLabel}>
              <Input type="checkbox" {...fields.toApprove} /> ожидает
              подтверждения
            </Label>
          </Col>
        </Row>
      </Col>
    </Row>
  </section>
);

class Filter extends Component {
  state = {
    extended: false,
  };

  toggleExtended() {
    this.setState({ extended: !this.state.extended });
  }

  render() {
    const {
      fields,
      count,
      resetFilter,
      filterCount,
      extendedFilterCount,
    } = this.props;

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Row>
          <Col lg="18" lgOffset="1">
            <div className={sUtils.flexContainerWrap}>
              <Group className={cn(sUtils.pushedRight2, sUtils.flexItem)}>
                <Label>ID</Label>
                <Input block type="text" {...fields.id} />
              </Group>
              <Group className={cn(sUtils.pushedRight2, sUtils.flexItem)}>
                <Label>Задача</Label>
                <Select options={options.kinds.all} {...fields.kind} />
              </Group>
              <Group className={cn(sUtils.pushedRight2, sUtils.flexItem)}>
                <Label>Тип</Label>
                <Select options={options.linkKinds} {...fields.linkKind} />
              </Group>
              <Group className={cn(sUtils.pushedRight2, sUtils.flexItem)}>
                <Label block>Дата от</Label>
                <Daypicker
                  className={cn(sDaypicker.daypicker, sUtils.fullWidth)}
                  kind="from"
                  onDayClick={day => fields.deadlineFrom.onChange(day)}
                  control={<Input block type="text" {...fields.deadlineFrom} />}
                  button={
                    <Button className={sDaypicker.btn}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                />
              </Group>
              <Group className={cn(sUtils.pushedRight2, sUtils.flexItem)}>
                <Label block>Дата до</Label>
                <Daypicker
                  className={cn(sDaypicker.daypicker, sUtils.fullWidth)}
                  kind="to"
                  onDayClick={day => fields.deadlineTo.onChange(day)}
                  control={<Input block type="text" {...fields.deadlineTo} />}
                  button={
                    <Button className={sDaypicker.btn}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                />
              </Group>
              <Group className={sUtils.flexItem}>
                <Label>Статус</Label>
                <Select options={options.states} {...fields.state} />
              </Group>
            </div>
          </Col>
        </Row>

        {this.state.extended && <FilterExtended {...this.props} />}

        <Row>
          <Col xs="20">
            <div className={s.btnGroup}>
              {/* <p className={s.stats}>
                Объём: <span className={s.primary}><FormattedNumber value={weight.toDo || 0} /></span> / <span className={s.success}><FormattedNumber value={weight.done || 0} /></span>
              </p> */}
              <Button
                size="xs"
                kind="primary"
                className={sUtils.pushedRight1}
                type="button"
                onClick={::this.toggleExtended}
              >
                {this.state.extended ? `Скрыть` : `Показать`} расширенный фильтр{' '}
                {!!extendedFilterCount && `(${extendedFilterCount})`}
              </Button>
              <Button
                className={sUtils.pushedTopXs2}
                size="xs"
                type="button"
                onClick={resetFilter}
                disabled={!filterCount}
              >
                Сбросить
              </Button>
              {!!count && (
                <p className={s.textFind}>
                  Найдено: <FormattedNumber value={count} />
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

const fields = [
  `id`,
  `kind`,
  `deadlineFrom`,
  `deadlineTo`,
  `state`,
  `linkKind`,
];

const extendedFields = [`ruDepartmentId`, `ruDivisionId`, `ruId`, `toApprove`];

export default filterHelper(null, fields, extendedFields)(Filter);
