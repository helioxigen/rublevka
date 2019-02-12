import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  AsyncSelect,
  Daypicker,
  Button,
  Icon,
  Heading,
  Grid: { Row, Col },
  Form: { Input, Label, Group },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

import filterHelper from 'core/decorators/filter';
import { fetchResource } from 'cem/helpers/autocomplete';

const FilterExtended = ({ fields }) => (
  <Row>
    <Col sm="14" smOffset="3">
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
              asyncOptions={fetchResource(`/v1/departments`, `name`, [`name`])}
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
      <Row className={sUtils.pushedTop3}>
        <Col sm="6">
          <Group>
            <Label block>Ожидаемая дата завершения от</Label>
            <Daypicker
              className={sUtils.fullWidth}
              control={
                <Input
                  block
                  type="text"
                  {...fields.expectedFinishDateFrom}
                  required
                />
              }
              button={
                <Button className={sDaypicker.btn}>
                  <Icon className={sDaypicker.icon} icon="calendar" />
                </Button>
              }
              onDayClick={day => fields.expectedFinishDateFrom.onChange(day)}
            />
          </Group>
        </Col>
        <Col sm="6" smOffset="1">
          <Group>
            <Label block>Ожидаемая дата завершения до</Label>
            <Daypicker
              className={sUtils.fullWidth}
              control={
                <Input
                  block
                  type="text"
                  {...fields.expectedFinishDateTo}
                  required
                />
              }
              button={
                <Button className={sDaypicker.btn}>
                  <Icon className={sDaypicker.icon} icon="calendar" />
                </Button>
              }
              onDayClick={day => fields.expectedFinishDateTo.onChange(day)}
            />
          </Group>
        </Col>
      </Row>
    </Col>
  </Row>
);

class Filter extends Component {
  state = {};

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
                  <Label>Контакт</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(
                      `/v1/contacts`,
                      `details.lastName,details.firstName`,
                      [`details.firstName`, `details.lastName`],
                    )}
                    {...fields.contactId}
                  />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label>Телефон</Label>
                  <Input block type="text" {...fields.contactPhoneNumber} />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label>Email</Label>
                  <Input block type="text" {...fields.contactEmail} />
                </Group>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.state.extended && <FilterExtended {...this.props} />}
        <Row>
          <Col xs="20">
            <div className={s.btnGroup}>
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
              {!!count && <p className={s.textFind}>Найдено: {count}</p>}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

const fields = [`id`, `contactId`, `contactPhoneNumber`, `contactEmail`];

const extendedFields = [
  `ruDepartmentId`,
  `ruDivisionId`,
  `ruId`,
  `expectedFinishDateFrom`,
  `expectedFinishDateTo`,
];

export default filterHelper(null, fields, extendedFields)(Filter);
