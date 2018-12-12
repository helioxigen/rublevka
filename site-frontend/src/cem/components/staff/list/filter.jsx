import React, { Component } from 'react';

import filterHelper from 'core/decorators/filter';

import { fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  Button,
  Select,
  AsyncSelect,
  Form: { Group, Input, Label },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

const states = [
  { value: 'active', label: 'Работает' },
  { value: 'inactive', label: 'Уволен' },
  // { value: `invited`, label: `Приглашён` },
];

class Filter extends Component {
  render() {
    const { fields, count, resetFilter, filterCount } = this.props;

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Row>
          <Col lg="18" lgOffset="1">
            <Row>
              <Col sm="3">
                <Group float>
                  <Input
                    block
                    valueClassName="floatLabel"
                    type="text"
                    placeholder="ID"
                    {...fields.id}
                  />
                  <Label>ID</Label>
                </Group>
              </Col>
              <Col sm="5">
                <Group float>
                  <Input
                    block
                    valueClassName="floatLabel"
                    type="text"
                    placeholder="Фамилия"
                    {...fields.lastName}
                  />
                  <Label>Фамилия</Label>
                </Group>
              </Col>
              <Col sm="4">
                <Group>
                  <Label>Департамент</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource('/v1/departments', 'name', [
                      'name',
                    ])}
                    {...fields.departmentId}
                  />
                </Group>
              </Col>
              <Col sm="4">
                <Group>
                  <Label>Должность</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource('/v1/roles', 'name', ['name'])}
                    {...fields.roleId}
                  />
                </Group>
              </Col>
              <Col sm="4">
                <Group>
                  <Label>Статус</Label>
                  <Select options={states} {...fields.state} />
                </Group>
              </Col>
            </Row>
          </Col>
          <Col xs="20">
            <div className={s.btnGroup}>
              <Button
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

const fields = ['id', 'lastName', 'departmentId', 'roleId', 'state'];

export default filterHelper(null, fields)(Filter);
