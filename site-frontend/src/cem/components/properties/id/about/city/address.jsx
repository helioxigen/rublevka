import React, { Component } from 'react';

import { API } from 'core/config/sources';

import ComplexBuildingCard from 'cem/containers/common/complexBuilding';

import UI from 'cem/components/ui';
const {
  MapBox,
  Heading,
  AsyncSelect,
  Grid: { Row, Col },
  Form: { Group, Label, Static, Helper, Input },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import sUtils from 'cem/styles/utils';
import sMap from 'cem/styles/ui/map';

// NOTE "findAddress" and "fetchAddress"?!
import {
  findAddress,
  fetchResource,
  fetchAddress,
} from 'cem/helpers/autocomplete';

const fetchSubways = fetchResource(`/v1/places/subways`, `name`);

export default class extends Component {
  complete(option, value) {
    fetchAddress(1, [{ kladr_id: value.data.kladr_id }])(
      `${value.label}`,
      null,
      null,
    ).then(options => {
      const {
        actions,
        destroyForm,
        initializeForm,
        fields,
        values,
        data: propertyData,
      } = this.props;
      const { data } = options[0];
      const house = data.block
        ? `${data.house} ${data.block_type} ${data.block}`
        : data.house;

      const importData = {
        country: data.country,
        region: data.region,
        locality: data.city,
        subLocality: data.city_district,
        kladrId: data.kladr_id ? parseInt(data.kladr_id, 10) : undefined,
        latitude: data.geo_lat,
        longitude: data.geo_lon,
      };

      const locationWithoutIds = {
        postalCode: data.postal_code,
        countryName: data.country,
        regionName: data.region,
        localityName: data.city,
        subLocalityName: data.city_district,
        street: data.street_with_type,
        house: house,
        flatNumber: data.flat,
        latitude: data.geo_lat,
        longitude: data.geo_lon,
      };

      actions.changeResidentialComplex(propertyData.id, locationWithoutIds);
      destroyForm();
      initializeForm({
        ...values,
        residentialComplex: {},
        location: locationWithoutIds,
      });

      API.post(`/v1/places/import`, importData).then(({ body }) => {
        const location = {
          ...locationWithoutIds,
          ...body,
          cadastralNumber: undefined,
        };

        destroyForm();
        initializeForm({ ...values, complexBuildingId: null, location });
        fields.toggle.onChange(Math.random());
      });
    });
  }

  checkAddress(ignore, { value, isFromDadata, ...option }) {
    const { fields } = this.props;
    if (isFromDadata) {
      ::this.complete(null, option);
      fields.complexBuildingId.onChange(undefined);
    } else {
      fields.complexBuildingId.onChange(value);
      fields.location.postalCode.onChange(option.location.postalCode);
      fields.location.regionName.onChange(option.location.regionName);
      fields.location.localityName.onChange(option.location.localityName);
      fields.location.subLocalityName.onChange(option.location.subLocalityName);
      fields.location.street.onChange(option.location.street);
      fields.location.house.onChange(option.location.house);
      fields.location.flatNumber.onChange(option.location.flatNumber);
      fields.location.latitude.onChange(option.location.latitude);
      fields.location.longitude.onChange(option.location.longitude);
      fields.location.cadastralNumber.onChange(option.location.cadastralNumber);
      fields.location.subwayIds.onChange(option.location.subwayIds);
    }
  }

  render() {
    const {
      values,
      values: { location = {} },
      data,
      fields,
      isUpdateAllowed,
    } = this.props;
    const isAddressDisabled =
      values.saleOffer && values.saleOffer.isResale === `false`;

    const markerPosition =
      location.latitude && location.longitude
        ? { lat: location.latitude, lng: location.longitude }
        : {};

    return (
      <section className={this.props.className}>
        <Heading size="md">Адрес</Heading>
        <Row>
          <Col lg="20">
            {isUpdateAllowed && !isAddressDisabled && (
              <Group
                kind={
                  fields.location.countryId.touched &&
                  !!fields.location.countryId.error &&
                  `error`
                }
              >
                <Label>Поиск ЖК или адреса</Label>
                <AsyncSelect
                  block
                  asyncOptions={fetchResource(
                    `/v1/complex_buildings`,
                    `complexName`,
                    complexData =>
                      `${complexData.complexName ||
                        `ЖК без названия`}, корпус ${complexData.location
                        .building || `не задан`}`,
                    {},
                    {},
                    findAddress,
                  )}
                  onChange={::this.checkAddress}
                />
                {fields.location.countryId.touched &&
                  fields.location.countryId.error && (
                    <Helper>{fields.location.countryId.error}</Helper>
                  )}
              </Group>
            )}
          </Col>
        </Row>
        <Row className={cn(sUtils.pushedBottom1, sUtils.pushedTop1)}>
          <Col xs="10" lg="3">
            <Group>
              <Label block>Индекс, город</Label>
              <Static className={sUtils.fontSizeMd}>
                {location.postalCode || `—`}, {location.localityName || `—`}
              </Static>
            </Group>
          </Col>
          <Col xs="10" lg="5">
            <Group>
              <Label block>Район, улица, дом</Label>
              <Static className={sUtils.fontSizeMd}>
                {location.subLocalityName || `—`}, {location.street || `—`},{' '}
                {location.house || `—`}
              </Static>
            </Group>
          </Col>
          <Col xs="10" lg="2">
            <FormField
              field={fields.location.entrance}
              label="Подъезд"
              static={!isUpdateAllowed}
            >
              <Input className={sUtils.fontSizeMd} block type="text" />
            </FormField>
          </Col>
          <Col xs="10" lg="2">
            <FormField
              field={fields.location.flatNumber}
              label="Квартира"
              static={!isUpdateAllowed}
            >
              <Input className={sUtils.fontSizeMd} block type="text" />
            </FormField>
          </Col>
          <Col xs="10" lg="7" lgOffset="1">
            <FormField
              label="Метро"
              field={fields.location.subwayIds}
              asyncValue={fetchSubways}
              labelKey="name"
              static={values.complexBuildingId || !isUpdateAllowed}
            >
              <AsyncSelect
                className={sUtils.fontSizeMd}
                multi
                valueKey="id"
                asyncOptions={fetchSubways}
                {...fields.location.subwayIds}
              />
            </FormField>
          </Col>
        </Row>
        {values.complexBuildingId && (
          <Row>
            <Col xs="20">
              <ComplexBuildingCard
                id={values.complexBuildingId}
                alternativeName={data.complexBuildingName}
              />
            </Col>
          </Row>
        )}
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
