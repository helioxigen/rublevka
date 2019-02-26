import React, { Component } from 'react';

import { fetchResource } from 'cem/helpers/autocomplete';

import { reduxForm } from 'redux-form';
import formSettings from 'cem/constants/settlements/form';
import validate from 'cem/validators/settlements';

import UI from 'cem/components/ui';
const {
  AsyncSelect,
  Heading,
  MapBox,
  Form: { Group, Label, Input, Helper, Static },
  Grid: { Row, Col },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import sUtils from 'cem/styles/utils';
import sMap from 'cem/styles/ui/map';

import { coordinates } from 'core/constants/maps';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = { location: {} };
  }

  changeSubLocality(value, locality = { location: {} }) {
    const { fields } = this.props;

    fields.location.localityId.onChange(value);
    fields.location.countryName.onChange(locality.location.countryName);
    fields.location.regionName.onChange(locality.location.regionName);
    fields.location.districtName.onChange(locality.location.districtName);
    fields.location.routeName.onChange(locality.location.routeName);
  }

  render() {
    const {
      fields,
      values: { location = {} },
      hasRight,
    } = this.props;
    const markerPosition =
      location.latitude && location.longitude
        ? { lat: location.latitude, lng: location.longitude }
        : { lat: coordinates.moscow[1], lng: coordinates.moscow[0] };

    return (
      (
        <section className={this.props.className}>
          <Heading size="md">Адрес</Heading>
          <Row>
            <Col sm="10">
              <Row>
                <Col lg="16" className={sUtils.pushedBottom3}>
                  <Row>
                    <Col xs="20">
                      <Group
                        kind={
                          fields.location.localityId.touched &&
                          !!fields.location.localityId.error &&
                          `error`
                        }
                      >
                        <Label>Населенный пункт</Label>
                        <AsyncSelect
                          asyncOptions={fetchResource(
                            `/v1/places/localities`,
                            `name`,
                          )}
                          {...fields.location.localityId}
                          onChange={(...params) =>
                            ::this.changeSubLocality(...params)
                          }
                          disabled={!hasRight(`settlement_update`)}
                        />
                        {fields.location.localityId.touched &&
                          fields.location.localityId.error && (
                            <Helper>{fields.location.localityId.error}</Helper>
                          )}
                      </Group>
                    </Col>
                    <Col xs="20">
                      <Group
                        kind={
                          fields.location.linkedLocalityIds.touched &&
                          !!fields.location.linkedLocalityIds.error &&
                          `error`
                        }
                      >
                        <Label>Доп. населенные пункты</Label>
                        <AsyncSelect
                          asyncOptions={fetchResource(
                            `/v1/places/localities`,
                            `name`,
                          )}
                          multi
                          {...fields.location.linkedLocalityIds}
                          disabled={!hasRight(`settlement_update`)}
                        />
                        {fields.location.linkedLocalityIds.touched &&
                          fields.location.linkedLocalityIds.error && (
                            <Helper>
                              {fields.location.linkedLocalityIds.error}
                            </Helper>
                          )}
                      </Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="10">
                      <FormField
                        float
                        label="Широта"
                        field={fields.location.latitude}
                        static={!hasRight(`settlement_update`)}
                      >
                        <Input block type="text" />
                      </FormField>
                    </Col>
                    <Col sm="10">
                      <FormField
                        float
                        label="Долгота"
                        field={fields.location.longitude}
                        static={!hasRight(`settlement_update`)}
                      >
                        <Input block type="text" />
                      </FormField>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="10">
                      <FormField
                        float
                        label="От МКАД, км"
                        field={fields.location.mkadDistance}
                        static={!hasRight(`settlement_update`)}
                      >
                        <Input block type="text" />
                      </FormField>
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
                        <Label block>Страна</Label>
                        <Static>{location.countryName}</Static>
                      </Group>
                    </Col>
                    <Col xs="20">
                      <Group>
                        <Label block>Область</Label>
                        <Static>{location.regionName}</Static>
                      </Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="20">
                      <Group>
                        <Label block>Район</Label>
                        <Static>{location.districtName}</Static>
                      </Group>
                    </Col>
                  </Row>
                  {location.routeName && (
                    <Row>
                      <Col xs="20">
                        <Group>
                          <Label block>Шоссе</Label>
                          <Static>{location.routeName}</Static>
                        </Group>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={cn(sMap.mapContainer, sUtils.pushedBottom6)}>
            <MapBox
              center={[markerPosition.lng, markerPosition.lat]}
              markers={[markerPosition]}
              container={<div className={sMap.map} />}
            />
          </Row>
        </section>
      ) || null
    );
  }
}

export default reduxForm({ ...formSettings, validate })(Address);
