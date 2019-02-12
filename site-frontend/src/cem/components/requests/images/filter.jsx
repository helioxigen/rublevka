import React, { Component } from 'react';

import filterHelper from 'core/decorators/filter';

import UI from 'cem/components/ui';
const {
  Button,
  Daypicker,
  Select,
  AsyncSelect,
  Heading,
  Grid: { Row, Col },
  Form: { Input, Label, Group },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

import { kinds } from 'cem/constants/requests/images/dictionaries';

import { fetchResource } from 'cem/helpers/autocomplete';

const FilterExtended = ({ fields }) => (
  <Row>
    <Col lg="12" lgOffset="4">
      <Row className={sUtils.pushedTop3}>
        <Col xs="20">
          <Heading size="md">Ответственные лица</Heading>
        </Col>
      </Row>
      <Row className={sUtils.pushedTop3}>
        <Col sm="10">
          <Group>
            <Label>Заказчик</Label>
            <AsyncSelect
              asyncOptions={fetchResource(
                `/v1/users/staff`,
                `lastName,firstName`,
                [`firstName`, `lastName`],
              )}
              {...fields.createdByUserId}
            />
          </Group>
        </Col>
        <Col sm="10">
          <Group>
            <Label>Ответственный</Label>
            <AsyncSelect
              asyncOptions={fetchResource(
                `/v1/users/staff`,
                `lastName,firstName`,
                [`firstName`, `lastName`],
              )}
              {...fields.responsibleUserId}
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
          <Col lg="14" lgOffset="3">
            <Row>
              <Col sm="5">
                <Group>
                  <Label>ID</Label>
                  <Input block type="text" {...fields.id} />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label>Тип заявки</Label>
                  <Select
                    options={Object.keys(kinds).map(key => ({
                      value: key,
                      label: kinds[key],
                    }))}
                    {...fields.kind}
                  />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label block>Дата от</Label>
                  <Daypicker
                    className={cn(sDaypicker.daypicker, sUtils.fullWidth)}
                    kind="from"
                    control={
                      <Input block type="text" {...fields.dateFrom} required />
                    }
                    button={
                      <Button className={sDaypicker.btn}>
                        <UI.Icon className={sDaypicker.icon} icon="calendar" />
                      </Button>
                    }
                    onDayClick={day => fields.dateFrom.onChange(day)}
                  />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label block>Дата до</Label>
                  <Daypicker
                    className={cn(sDaypicker.daypicker, sUtils.fullWidth)}
                    kind="to"
                    control={
                      <Input block type="text" {...fields.dateTo} required />
                    }
                    button={
                      <Button className={sDaypicker.btn}>
                        <UI.Icon className={sDaypicker.icon} icon="calendar" />
                      </Button>
                    }
                    onDayClick={day => fields.dateTo.onChange(day)}
                  />
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

const fields = [`id`, `kind`, `dateFrom`, `dateTo`];

const extendedFields = [`responsibleUserId`, `createdByUserId`];

export default filterHelper(`imagesRequests`, fields, extendedFields)(Filter);
