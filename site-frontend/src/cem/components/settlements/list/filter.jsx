import React, { Component } from 'react';
import cn from 'classnames';
import { fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  Form,
  Button,
  AsyncSelect,
  Form: { Input, Label, Group },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

import { countObjectKeys } from 'core/helpers';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  updateFilter(ref, value) {
    this.props.actions.updateFilter(`settlements`, { [ref]: value });
    this.props.onFilterUpdate({ ...this.props.filters, [ref]: value });
  }

  updateFromInput(ref, event) {
    this.updateFilter(ref, event.target.value);
  }

  resetFilter() {
    this.props.actions.resetFilter(`settlements`);
    this.props.onFilterUpdate({});
  }

  render() {
    const { filters } = this.props;
    const districtDependency = { routeId: filters[`location.routeId`] };
    const localityDependency = {
      routeId: filters[`location.routeId`],
      districtId: filters[`location.districtId`],
    };
    const filterCount = countObjectKeys(filters);

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Form.Container>
          <Row>
            <Col md="18" mdOffset="1">
              <div className={sUtils.flexContainerWrap}>
                <Group className={cn(sUtils.pushedRight1, sUtils.width12)}>
                  <Label>ID</Label>
                  <Input
                    block
                    type="text"
                    value={filters.id}
                    onChange={event => ::this.updateFromInput(`id`, event)}
                  />
                </Group>

                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Название посёлка</Label>
                  <Input
                    block
                    type="text"
                    value={filters.name}
                    onChange={event => ::this.updateFromInput(`name`, event)}
                  />
                </Group>

                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Направление</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(`/v1/places/routes`, `name`)}
                    value={filters[`location.routeId`]}
                    onChange={value =>
                      ::this.updateFilter(`location.routeId`, value)
                    }
                  />
                </Group>

                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Район</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(`/v1/places/districts`, `name`)}
                    value={filters[`location.districtId`]}
                    onChange={value =>
                      ::this.updateFilter(`location.districtId`, value)
                    }
                    linkedTo={districtDependency}
                  />
                </Group>

                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Нас. пункт</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(
                      `/v1/places/localities`,
                      `name`,
                    )}
                    value={filters[`location.localityId`]}
                    onChange={value =>
                      ::this.updateFilter(`location.localityId`, value)
                    }
                    linkedTo={localityDependency}
                  />
                </Group>

                <Group className={cn(sUtils.pushedRight1, sUtils.width12)}>
                  <Label>МКАД от</Label>
                  <Input
                    block
                    type="text"
                    value={filters.mkadFrom}
                    onChange={event =>
                      ::this.updateFromInput(`mkadFrom`, event)
                    }
                  />
                </Group>

                <Group className={sUtils.width12}>
                  <Label>МКАД до</Label>
                  <Input
                    block
                    type="text"
                    value={filters.mkadTo}
                    onChange={event => ::this.updateFromInput(`mkadTo`, event)}
                  />
                </Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="20">
              <div className={s.btnGroup}>
                <Button
                  size="xs"
                  type="button"
                  onClick={::this.resetFilter}
                  disabled={!filterCount}
                >
                  Сбросить
                </Button>
                {!!this.props.count && (
                  <p className={s.textFind}>Найдено: {this.props.count}</p>
                )}
              </div>
            </Col>
          </Row>
        </Form.Container>
      </Col>
    );
  }
}
