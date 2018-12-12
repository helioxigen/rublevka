import React, { Component } from 'react';

import filterHelper from 'core/decorators/filter';

import UI from 'cem/components/ui';
const {
  Button, Daypicker, Select, AsyncSelect,
  Grid: { Row, Col },
  Form: { Input, Label, Group },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

import { kinds } from 'cem/constants/requests/remove/dictionaries';

import { fetchResource } from 'cem/helpers/autocomplete';

class Filter extends Component {
  render() {
    const { fields, count, resetFilter, filterCount } = this.props;

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Row>
          <Col xs="20">
            <Row>
              <Col sm="5" md="5" lg="4">
                <Group>
                  <Label>ID</Label>
                  <Input block type="text" {...fields.id} />
                </Group>
              </Col>
              <Col sm="5" md="5" lg="4">
                <Group>
                  <Label>Тип заявки</Label>
                  <Select options={Object.keys(kinds).map(key => ({ value: key, label: kinds[key] }))} {...fields.kind} />
                </Group>
              </Col>
              <Col sm="5" md="5" lg="4">
                <Group>
                  <Label block>Дата от</Label>
                  <Daypicker
                    className={cn(sDaypicker.daypicker, sUtils.fullWidth)} kind="from"
                    control={<Input block type="text" {...fields.dateFrom} required />}
                    button={<Button className={sDaypicker.btn}><UI.Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                    onDayClick={day => fields.dateFrom.onChange(day)}
                  />
                </Group>
              </Col>
              <Col sm="5" md="5" lg="4">
                <Group>
                  <Label block>Дата до</Label>
                  <Daypicker
                    className={cn(sDaypicker.daypicker, sUtils.fullWidth)} kind="to"
                    control={<Input block type="text" {...fields.dateTo} required />}
                    button={<Button className={sDaypicker.btn}><UI.Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                    onDayClick={day => fields.dateTo.onChange(day)}
                  />
                </Group>
              </Col>
              <Col sm="10" md="5" lg="4">
                <Group>
                  <Label>Заказчик</Label>
                  <AsyncSelect asyncOptions={fetchResource('/v1/users/staff', 'lastName,firstName', ['firstName', 'lastName'])} {...fields.createdByUserId} />
                </Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs="20">
            <div className={s.btnGroup}>
              <Button size="xs" type="button" onClick={resetFilter} disabled={!filterCount}>Сбросить</Button>
              {!!count && <p className={s.textFind}>Найдено: {count}</p>}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

const fields = [
  'id',
  'kind',
  'dateFrom',
  'dateTo',
  'createdByUserId',
];

export default filterHelper('removalRequests', fields)(Filter);
