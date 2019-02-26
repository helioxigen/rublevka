import React, { Component } from 'react';

import filterHelper from 'core/decorators/filter';

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

import { fetchResource } from 'cem/helpers/autocomplete';

const FilterExtended = ({ fields }) => (
  <section>
    <Row className={sUtils.pushedTop3}>
      <Col sm="5">
        <Group>
          <Label>ИНН</Label>
          <AsyncSelect
            multi
            valueKey="inn"
            asyncOptions={fetchResource(`/v1/companies`, `inn`)}
            {...fields.inn}
          />
        </Group>
      </Col>
      <Col sm="5">
        <Group>
          <Label>ОГРН(ИП)</Label>
          <AsyncSelect
            multi
            valueKey="ogrn"
            asyncOptions={fetchResource(`/v1/companies`, `ogrn`)}
            {...fields.ogrn}
          />
        </Group>
      </Col>
      <Col sm="5">
        <Group>
          <Label>Создатель</Label>
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
      <Col sm="5">
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
  </section>
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
          <Col md="14" mdOffset="3">
            <Row>
              <Col sm="3">
                <Group>
                  <Label>ID</Label>
                  <Input block type="text" {...fields.id} />
                </Group>
              </Col>
              <Col sm="10">
                <Group>
                  <Label>Наименование</Label>
                  <Input block type="text" {...fields.name} />
                </Group>
              </Col>
              <Col sm="7">
                <Group>
                  <Label>Статус</Label>
                  <Select
                    options={[
                      { value: `active`, label: `Активная` },
                      { value: `closed`, label: `Закрытая` },
                    ]}
                    {...fields.state}
                  />
                </Group>
              </Col>
            </Row>
            {this.state.extended && <FilterExtended {...this.props} />}
          </Col>
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
                size="xs"
                type="button"
                onClick={resetFilter}
                disabled={!filterCount}
              >
                Сбросить
              </Button>
              {count && (
                <p className={s.textFind}>Найдено: {this.props.count}</p>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

const fields = [`id`, `name`, `state`];

const extendedFields = [`inn`, `ogrn`, `createdByUserId`, `responsibleUserId`];

export default filterHelper(`companies`, fields, extendedFields)(Filter);
