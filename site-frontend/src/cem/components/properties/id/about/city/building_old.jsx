import React from 'react';

import * as options from 'cem/constants/properties/options';

import ConditionalInput from '../country/conditionalInput';
import UI from 'cem/components/ui';
const {
  Loading,
  Select,
  Heading,
  Form: { Label, Static, Group, Helper, Input },
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

export default props => {
  const {
    fields: { residentialComplex },
    isUpdateAllowed,
  } = props;
  const { isResidentialChanging } = props.data || {};

  return (
    <section className={props.className}>
      <Row>
        <Col xs="20">
          <Heading size="md">Описание здания</Heading>
        </Col>
      </Row>

      {isResidentialChanging && <Loading />}

      {!isResidentialChanging && (
        <Row>
          <Col sm="10">
            <Heading size="sm">Здание</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col md="10">
                    <Group
                      kind={
                        residentialComplex.details.houseKind.touched &&
                        !!residentialComplex.details.houseKind.error &&
                        'error'
                      }
                    >
                      <Label>Тип дома</Label>
                      <Select
                        options={options.houseKinds}
                        disabled={!isUpdateAllowed}
                        {...residentialComplex.details.houseKind}
                      />
                      {residentialComplex.details.houseKind.touched &&
                        residentialComplex.details.houseKind.error && (
                          <Helper>
                            {residentialComplex.details.houseKind.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>

                  <Col md="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          residentialComplex.name.touched &&
                          !!residentialComplex.name.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Название ЖК"
                          type="text"
                          block
                          {...residentialComplex.name}
                        />
                        <Label>Название ЖК</Label>
                        {residentialComplex.name.touched &&
                          residentialComplex.name.error && (
                            <Helper>{residentialComplex.name.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Название ЖК</Label>
                        <Static>{residentialComplex.name.value}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          residentialComplex.details.builtYear.touched &&
                          !!residentialComplex.details.builtYear.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Год постройки"
                          type="text"
                          block
                          {...residentialComplex.details.builtYear}
                        />
                        <Label>Год постройки</Label>
                        {residentialComplex.details.builtYear.touched &&
                          residentialComplex.details.builtYear.error && (
                            <Helper>
                              {residentialComplex.details.builtYear.error}
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Год постройки</Label>
                        <Static>{residentialComplex.details.value}</Static>
                      </Group>
                    )}
                  </Col>

                  <Col sm="10">
                    <Group
                      kind={
                        residentialComplex.details.deliveryQuarter.touched &&
                        !!residentialComplex.details.deliveryQuarter.error &&
                        'error'
                      }
                    >
                      <Label>Квартал сдачи</Label>
                      <Select
                        options={options.deliveryQuarters}
                        disabled={!isUpdateAllowed}
                        {...residentialComplex.details.deliveryQuarter}
                      />
                      {residentialComplex.details.deliveryQuarter.touched &&
                        residentialComplex.details.deliveryQuarter.error && (
                          <Helper>
                            {residentialComplex.details.deliveryQuarter.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="10">
                    <Group
                      kind={
                        residentialComplex.details.constructionStage.touched &&
                        !!residentialComplex.details.constructionStage.error &&
                        'error'
                      }
                    >
                      <Label>Стадия строительства</Label>
                      <Select
                        options={options.constructionStages}
                        disabled={!isUpdateAllowed}
                        {...residentialComplex.details.constructionStage}
                      />
                      {residentialComplex.details.constructionStage.touched &&
                        residentialComplex.details.constructionStage.error && (
                          <Helper>
                            {residentialComplex.details.constructionStage.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>

                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          residentialComplex.details.stage.touched &&
                          !!residentialComplex.details.stage.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Очередь строительства"
                          block
                          type="text"
                          {...residentialComplex.details.stage}
                        />
                        <Label>Очередь строительства</Label>
                        {residentialComplex.details.stage.touched &&
                          residentialComplex.details.stage.error && (
                            <Helper>
                              {residentialComplex.details.stage.error}
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Очередь строительства</Label>
                        <Static>
                          {residentialComplex.details.stage.value}
                        </Static>
                      </Group>
                    )}
                  </Col>

                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          residentialComplex.details.series.touched &&
                          !!residentialComplex.details.series.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Серия дома"
                          block
                          type="text"
                          {...residentialComplex.details.series}
                        />
                        <Label>Серия дома</Label>
                        {residentialComplex.details.series.touched &&
                          residentialComplex.details.series.error && (
                            <Helper>
                              {residentialComplex.details.series.error}
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Серия дома</Label>
                        <Static>
                          {residentialComplex.details.series.value}
                        </Static>
                      </Group>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="10">
            <Heading size="sm">Особенности</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          residentialComplex.details.floors.touched &&
                          !!residentialComplex.details.floors.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Этажей в доме"
                          block
                          type="text"
                          {...residentialComplex.details.floors}
                        />
                        <Label>Этажей в доме</Label>
                        {residentialComplex.details.floors.touched &&
                          residentialComplex.details.floors.error && (
                            <Helper>
                              {residentialComplex.details.floors.error}
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Этажей в доме</Label>
                        <Static>
                          {residentialComplex.details.floors.value}
                        </Static>
                      </Group>
                    )}
                  </Col>

                  <Col md="10">
                    {isUpdateAllowed && (
                      <Group
                        kind={
                          residentialComplex.details.constructionKind.touched &&
                          !!residentialComplex.details.constructionKind.error &&
                          'error'
                        }
                      >
                        <Label>Конструкция дома</Label>
                        <Select
                          options={options.constructionKinds}
                          disabled={!isUpdateAllowed}
                          {...residentialComplex.details.constructionKind}
                        />
                        {residentialComplex.details.constructionKind.touched &&
                          residentialComplex.details.constructionKind.error && (
                            <Helper>
                              {
                                residentialComplex.details.constructionKind
                                  .error
                              }
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Конструкция дома</Label>
                        <Static>
                          {residentialComplex.details.constructionKind.value}
                        </Static>
                      </Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          residentialComplex.details.elevators.touched &&
                          !!residentialComplex.details.elevators.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Количество лифтов"
                          block
                          type="text"
                          {...residentialComplex.details.elevators}
                        />
                        <Label>Количество лифтов</Label>
                        {residentialComplex.details.elevators.touched &&
                          residentialComplex.details.elevators.error && (
                            <Helper>
                              {residentialComplex.details.elevators.error}
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Количество лифтов</Label>
                        <Static>
                          {residentialComplex.details.elevators.value}
                        </Static>
                      </Group>
                    )}
                  </Col>

                  <Col sm="10">
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          residentialComplex.details.freightElevators.touched &&
                          !!residentialComplex.details.freightElevators.error &&
                          'error'
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Количество грузовых лифтов"
                          block
                          type="text"
                          {...residentialComplex.details.freightElevators}
                        />
                        <Label>Количество грузовых лифтов</Label>
                        {residentialComplex.details.freightElevators.touched &&
                          residentialComplex.details.freightElevators.error && (
                            <Helper>
                              {
                                residentialComplex.details.freightElevators
                                  .error
                              }
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Количество грузовых лифтов</Label>
                        <Static>
                          {residentialComplex.details.freightElevators.value}
                        </Static>
                      </Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col md="10">
                    {isUpdateAllowed && (
                      <Group
                        kind={
                          residentialComplex.details.security.touched &&
                          !!residentialComplex.details.security.error &&
                          'error'
                        }
                      >
                        <Label>Безопасность</Label>
                        <Select
                          options={options.securityKinds}
                          disabled={!isUpdateAllowed}
                          {...residentialComplex.details.security}
                        />
                        {residentialComplex.details.security.touched &&
                          residentialComplex.details.security.error && (
                            <Helper>
                              {residentialComplex.details.security.error}
                            </Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Безопасность</Label>
                        <Static>
                          {residentialComplex.details.security.value}
                        </Static>
                      </Group>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      {!isResidentialChanging && (
        <Row>
          <Col sm="10">
            <Heading size="sm">Паркинг</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <ConditionalInput
                  checkboxLabel="Подземный гараж"
                  inputLabel="Количество машиномест"
                  value={residentialComplex.details.undergroundGarages}
                  disabled={!isUpdateAllowed}
                />
                <ConditionalInput
                  checkboxLabel="Паркинг"
                  inputLabel="Количество машиномест"
                  value={residentialComplex.details.parkings}
                  disabled={!isUpdateAllowed}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </section>
  );
};
