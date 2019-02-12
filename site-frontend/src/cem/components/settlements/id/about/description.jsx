import React, { Component } from 'react';

import { fetchDictionary } from 'cem/helpers/autocomplete';
import * as options from 'cem/constants/settlements/options';

import { reduxForm } from 'redux-form';
import formSettings from 'cem/constants/settlements/form';
import validate from 'cem/validators/settlements';

import UI from 'cem/components/ui';
const {
  Select,
  AsyncSelect,
  Heading,
  Form: { Group, Label, Input, Static, Helper },
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

class Description extends Component {
  // settlement_external_infrastructure/settlement_internal_infrastructure/settlement_type
  render() {
    const { fields, hasRight } = this.props;
    return (
      <section className={this.props.className}>
        <Heading size="md">Описание</Heading>
        <Row>
          <Col sm="10">
            <Row>
              <Col lg="14" className={sUtils.pushedBottom1}>
                <Row>
                  <Col sm="10">
                    <Group float>
                      <Input
                        {...fields.details.foundationYear}
                        valueClassName="floatLabel"
                        block
                        type="text"
                        placeholder="Год основания"
                      />
                      <Label>Год основания</Label>
                    </Group>
                  </Col>

                  <Col sm="10">
                    {hasRight('settlement_update') && (
                      <Group float>
                        <Input
                          {...fields.details.area}
                          valueClassName="floatLabel"
                          block
                          type="text"
                          placeholder="Размер, га"
                        />
                        <Label>Размер, га</Label>
                      </Group>
                    )}
                    {!hasRight('settlement_update') && (
                      <Group>
                        <Label block>Размер, га</Label>
                        <Static>{fields.details.area.value}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col xs="20">
                    <Group>
                      <Label>Тип</Label>
                      <AsyncSelect
                        {...fields.kindId}
                        asyncOptions={fetchDictionary('settlement_type')}
                        valueKey="id"
                        labelKey="title"
                        disabled={!hasRight('settlement_update')}
                      />
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs="20">
                    {hasRight('settlement_update') && (
                      <Group
                        kind={
                          fields.slug.touched && !!fields.slug.error && 'error'
                        }
                        float
                      >
                        <Input
                          {...fields.slug}
                          valueClassName="floatLabel"
                          block
                          type="text"
                          placeholder="Slug"
                        />
                        <Label>Slug</Label>
                        {fields.slug.touched && fields.slug.error && (
                          <Helper>{fields.slug.error}</Helper>
                        )}
                      </Group>
                    )}
                    {!hasRight('settlement_update') && (
                      <Group>
                        <Label block>Slug</Label>
                        <Static>{fields.slug.value}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col xs="20">
                    <Group>
                      <Label>Синонимы</Label>
                      <Select
                        multi
                        allowCreate
                        {...fields.aliases}
                        disabled={!hasRight('settlement_update')}
                      />
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs="20">
                    <Group>
                      <Label>Состояние земли</Label>
                      <Select
                        multi
                        {...fields.details.landState}
                        options={options.landState}
                        disabled={!hasRight('settlement_update')}
                      />
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col sm="10">
            <Row>
              <Col lg="14" className={sUtils.pushedBottom1}>
                <Row>
                  <Col xs="20">
                    <Group>
                      <Label>Газ</Label>
                      <Select
                        options={options.gasSupply}
                        {...fields.details.gasSupply}
                        disabled={!hasRight('settlement_update')}
                      />
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs="20">
                    {hasRight('settlement_update') && (
                      <Group float>
                        <Input
                          {...fields.details.powerSupply}
                          valueClassName="floatLabel"
                          block
                          type="text"
                          placeholder="Электричество"
                        />
                        <Label>Электричество</Label>
                      </Group>
                    )}
                    {!hasRight('settlement_update') && (
                      <Group>
                        <Label block>Электричество</Label>
                        <Static>{fields.details.powerSupply.value}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col xs="20">
                    <Group>
                      <Label>Канализация</Label>
                      <Select
                        options={options.sewerageSupply}
                        {...fields.details.sewerageSupply}
                        disabled={!hasRight('settlement_update')}
                      />
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs="20">
                    <Group>
                      <Label>Водоснабжение</Label>
                      <Select
                        options={options.waterSupply}
                        {...fields.details.waterSupply}
                        disabled={!hasRight('settlement_update')}
                      />
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    );
  }
}

export default reduxForm({ ...formSettings, validate })(Description);
