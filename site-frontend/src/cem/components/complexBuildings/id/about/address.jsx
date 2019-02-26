import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import { API } from 'core/config/sources';

import UI from 'cem/components/ui';
const {
  Heading,
  AsyncSelect,
  Form: { Group, Label, Static },
  Grid: { Row, Col },
} = UI;

import Dadata from 'cem/components/dadata';

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import sUtils from 'cem/styles/utils';

import { fetchResource, fetchAddress } from 'cem/helpers/autocomplete';

import { formSettings } from 'cem/constants/complexBuildings/form';

const fetchSubways = fetchResource(`/v1/places/subways`, `name`);

class Address extends Component {
  complete(option, value) {
    fetchAddress(1, [{ kladr_id: value.data.kladr_id }])(
      `${value.label}`,
      null,
      null,
    ).then(options => {
      const { fields, destroyForm, initializeForm } = this.props;
      const { data } = options[0];
      const house = data.block
        ? `${data.house} ${data.block_type} ${data.block}`
        : data.house;

      const locationNames = {
        postalCode: data.postal_code,
        countryName: data.country,
        regionName: data.region,
        localityName: data.city,
        subLocalityName: data.city_district,
        street: data.street_with_type,
        house: house,
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

      const { data: { location = {} } = {} } = this.props;

      destroyForm();
      initializeForm({
        ...this.props.data,
        location: { ...location, ...locationNames },
      });
    });
  }

  render() {
    const {
      fields,
      formKey,
      values: { location = {} },
      isUpdateAllowed,
    } = this.props;

    return (
      <section className={this.props.className}>
        <Heading size="md">Адрес</Heading>
        <Row>
          <Col lg="20">
            {(isUpdateAllowed || formKey === `create`) && (
              <Group>
                <Label>Поиск адреса</Label>
                <Dadata.Location
                  className={sUtils.fontSizeMd}
                  onChange={::this.complete}
                />
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
          <Col md="10" lg="5">
            <Group>
              <Label block>Район, улица, дом</Label>
              <Static className={sUtils.fontSizeMd}>
                {location.subLocalityName || `—`}, {location.street || `—`},{' '}
                {location.house || `—`}
              </Static>
            </Group>
          </Col>
          <Col xs="20" lg="12">
            <FormField
              label="Метро"
              field={fields.location.subwayIds}
              asyncValue={fetchSubways}
              labelKey="name"
              static={!isUpdateAllowed && formKey !== `create`}
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
      </section>
    );
  }
}

export default reduxForm(formSettings)(Address);
