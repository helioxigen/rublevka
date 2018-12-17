import React, { Component } from 'react';

import FilterHelper from 'core/decorators/filter';

import UI from 'cem/components/ui';
const {
  Button,
  Form: { Group, Label, Input },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

class Filter extends Component {
  render() {
    const { fields, count, resetFilter, filterCount: selectedFiltersCount } = this.props;
    const { id, name } = fields;
    const phoneNumber = fields['details.phoneNumber'];
    const email = fields['details.email'];

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Row>
          <Col lg="12" lgOffset="4">
            <Row>
              <Col sm="5">
                <Group>
                  <Label>ID</Label>
                  <Input block type="text" {...id} />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label>ФИО</Label>
                  <Input block type="text" {...name} />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label>Телефон</Label>
                  <Input block type="text" {...phoneNumber} />
                </Group>
              </Col>
              <Col sm="5">
                <Group>
                  <Label>Email</Label>
                  <Input block type="text" {...email} />
                </Group>
              </Col>
            </Row>
          </Col>
          <Col xs="20">
            <div className={s.btnGroup}>
              <Button
                className={sUtils.pushedTopXs2}
                size="xs"
                type="button"
                onClick={resetFilter}
                disabled={!selectedFiltersCount}
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

const fields = ['id', 'name', 'details.phoneNumber', 'details.email'];

export default FilterHelper(null, fields)(Filter);
