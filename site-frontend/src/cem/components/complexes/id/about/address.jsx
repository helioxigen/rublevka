import React, { Component } from 'react';
import { API } from 'core/config/sources';

import Dadata from 'cem/components/dadata';

import UI from 'cem/components/ui';
const {
  Heading, MapBox,
  Form: { Group, Input, Label, Static },
  Grid: { Row, Col },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import sMap from 'cem/styles/ui/map';
import sUtils from 'cem/styles/utils';

import { fetchAddress } from 'cem/helpers/autocomplete';

import { coordinates } from 'core/constants/maps';

class Address extends Component {
  complete(option, value) {
    fetchAddress(1, [{ kladr_id: value.data.kladr_id }])(`${value.label}`, null, null).then(options => {
      const { data } = options[0];
      const { fields, destroyForm, initializeForm } = this.props;

      const locationNames = {
        postalCode: data.postal_code,
        countryName: data.country,
        regionName: data.region,
        localityName: data.city,
        subLocalityName: data.city_district,
        street: data.street_with_type,
        house: data.house,
        latitude: data.geo_lat,
        longitude: data.geo_lon,
      };

      const importData = {
        country: data.country,
        region: data.region,
        locality: data.city,
        subLocality: data.city_district,
      };

      fields.location.countryName.onChange(locationNames.countryName);
      fields.location.regionName.onChange(locationNames.regionName);
      fields.location.localityName.onChange(locationNames.localityName);
      fields.location.subLocalityName.onChange(locationNames.subLocalityName);
      fields.location.street.onChange(locationNames.street);
      fields.location.house.onChange(locationNames.house);
      fields.location.latitude.onChange(locationNames.latitude);
      fields.location.longitude.onChange(locationNames.longitude);
      fields.location.postalCode.onChange(locationNames.postalCode);

      API.post(`/v1/places/import`, importData).then(({ body }) => {
        fields.location.countryId.onChange(body.countryId);
        fields.location.regionId.onChange(body.regionId);
        fields.location.localityId.onChange(body.localityId);
        fields.location.subLocalityId.onChange(body.subLocalityId);
      });

      destroyForm();
      initializeForm({ ...this.props.data, location: locationNames });
    });
  }

  render() {
    const {
      fields, formKey, values: { location = {} },
      isUpdateAllowed,
    } = this.props;

    const markerPosition = location.latitude && location.longitude ? { lat: location.latitude, lng: location.longitude } : { lat: coordinates.moscow[1], lng: coordinates.moscow[0] };

    return (
      <section className={this.props.className}>
        <Heading size="md">Адрес</Heading>
        <Row>
          <Col lg="20">
            {(isUpdateAllowed || formKey === `create`) &&
              <Group>
                <Label>Поиск адреса</Label>
                <Dadata.Location className={sUtils.fontSizeMd} onChange={::this.complete} />
              </Group>
            }
          </Col>
        </Row>
        <Row className={cn(sUtils.pushedBottom1, sUtils.pushedTop1)}>
          <Col xs="10" lg="4">
            <Group>
              <Label block>Индекс, город</Label>
              <Static className={sUtils.fontSizeMd}>
                {location.postalCode || `—`}, {location.localityName || `—`}
              </Static>
            </Group>
          </Col>
          <Col md="10" lg="6">
            <Group>
              <Label block>Район, улица, дом</Label>
              <Static className={sUtils.fontSizeMd}>{location.subLocalityName || `—`}, {location.street || `—`}, {location.house || `—`}</Static>
            </Group>
          </Col>
          <Col xs="10" md="10" lg="5">
            <FormField field={fields.location.latitude} label="Широта" float static={!isUpdateAllowed && formKey !== `create`}>
              <Input className={sUtils.fontSizeMd} block type="text" />
            </FormField>
          </Col>
          <Col xs="10" md="10" lg="5">
            <FormField field={fields.location.longitude} label="Долгота" float static={!isUpdateAllowed && formKey !== `create`}>
              <Input className={sUtils.fontSizeMd} block type="text" />
            </FormField>
          </Col>
        </Row>
        <Row className={cn(sMap.mapContainer, sUtils.pushedBottom6)}>
          <MapBox center={[markerPosition.lng, markerPosition.lat]} markers={[markerPosition]} container={<div className={sMap.map} />} />
        </Row>
      </section>
    );
  }
}

export default Address;
