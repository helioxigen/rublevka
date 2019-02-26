import React, { Component } from 'react';

import { fetchResource } from 'cem/helpers/autocomplete';
import { extractSettlementAddress } from 'cem/helpers/properties';

import UI from 'cem/components/ui';
const {
  AsyncSelect,
  Heading,
  Grid: { Row, Col },
  Form: { Group, Label, Static, Input, Helper },
  MapBox,
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import sUtils from 'cem/styles/utils';
import sMap from 'cem/styles/ui/map';

export default class extends Component {
  componentWillMount() {
    const { data, actions } = this.props;

    if (data && data.location && data.location.settlementId)
      actions.loadSettlement(data.location.settlementId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      actions,
      data: { location },
    } = this.props;
    const {
      data: { location: nextLocation },
    } = nextProps;

    if (location.settlementId !== nextLocation.settlementId) {
      actions.loadSettlement(nextLocation.settlementId);
    }
  }

  handleSettlementChange(option, value) {
    const {
      state,
      fields: { location },
      actions,
    } = this.props;

    if (!!option && !state.settlements[option]) {
      actions.loadSettlement(option);
      location.settlementId.onChange(option);
      location.settlementName.onChange(value.name);
      location.localityName.onChange(value.location.localityName);
      location.routeName.onChange(value.location.routeName);
      location.districtName.onChange(value.location.districtName);
      location.mkadDistance.onChange(value.location.mkadDistance);
      location.cadastralNumber.onChange(undefined);
    }
  }

  render() {
    const {
      state,
      fields: { location = {} },
      values,
      isUpdateAllowed,
    } = this.props;
    const isAddressDisabled =
      values.saleOffer && values.saleOffer.isResale === `false`;

    const settlementData =
      (values.location.settlementId &&
        state.settlements[values.location.settlementId] &&
        state.settlements[values.location.settlementId].data) ||
      {};
    const markerPosition =
      (settlementData &&
        settlementData.location && {
          lat: settlementData.location.latitude,
          lng: settlementData.location.longitude,
        }) ||
      {};

    return (
      <section className={this.props.className}>
        <Row>
          <Col xs="20">
            <Heading size="md">Адрес</Heading>
          </Col>
        </Row>

        <Row>
          <Col xs="20">
            {isUpdateAllowed && !isAddressDisabled && (
              <Group
                kind={
                  !!location.settlementId &&
                  location.settlementId.touched &&
                  !!location.settlementId.error &&
                  `error`
                }
              >
                <Label>Поиск посёлка</Label>
                <AsyncSelect
                  asyncOptions={fetchResource(
                    `/v1/places/settlements`,
                    `name,location.subLocalityName,location.localityName`,
                    extractSettlementAddress,
                  )}
                  onChange={::this.handleSettlementChange}
                  autoload={false}
                  filterOptions={(options = []) => options}
                />
                {!!location.settlementId &&
                  location.settlementId.touched &&
                  location.settlementId.error && (
                    <Helper>{location.settlementId.error}</Helper>
                  )}
              </Group>
            )}
          </Col>

          <Col sm="10">
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col xs="20">
                    <Group>
                      <Label block>Шоссе</Label>
                      <Static>{values.location.routeName || `—`}</Static>
                    </Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="20">
                    <Group>
                      <Label block>Район</Label>
                      <Static>{values.location.districtName || `—`}</Static>
                    </Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="20">
                    <Group>
                      <Label block>Населенный пункт, посёлок</Label>
                      <Static>
                        {values.location.localityName || `—`},{' '}
                        {values.location.settlementName || `—`}
                      </Static>
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="10">
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col xs="20">
                    <Group>
                      <Label block>От МКАД</Label>
                      <Static>{values.location.mkadDistance || `—`}</Static>
                    </Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={14}>
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          !!location.street &&
                          location.street.touched &&
                          !!location.street.error &&
                          `error`
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="Улица"
                          block
                          type="text"
                          {...location.street}
                        />
                        <Label>Улица</Label>
                        {!!location.street &&
                          location.street.touched &&
                          location.street.error && (
                            <Helper>{location.street.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>Улица</Label>
                        <Static>{values.location.street || `—`}</Static>
                      </Group>
                    )}
                  </Col>
                  <Col sm={8} lg={6}>
                    {isUpdateAllowed && (
                      <Group
                        float
                        kind={
                          !!location.house &&
                          location.house.touched &&
                          !!location.house.error &&
                          `error`
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          placeholder="№ дома/участка"
                          block
                          type="text"
                          {...location.house}
                        />
                        <Label>№ дома/участка</Label>
                        {!!location.house &&
                          location.house.touched &&
                          location.house.error && (
                            <Helper>{location.house.error}</Helper>
                          )}
                      </Group>
                    )}
                    {!isUpdateAllowed && (
                      <Group>
                        <Label block>№ дома/участка</Label>
                        <Static>{values.location.house || `—`}</Static>
                      </Group>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="20">
                    <FormField
                      field={location.cadastralNumber}
                      label="Кадастровый номер"
                      static={!isUpdateAllowed}
                      float
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={cn(sMap.mapContainer, sUtils.pushedBottom6)}>
          {!!markerPosition.lat && !!markerPosition.lng && (
            <MapBox
              center={[markerPosition.lng, markerPosition.lat]}
              markers={[markerPosition]}
              container={<div className={sMap.map} />}
            />
          )}
        </Row>
      </section>
    );
  }
}
