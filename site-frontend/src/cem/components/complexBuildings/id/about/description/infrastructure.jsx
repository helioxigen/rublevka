import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  MapBox, Heading,
  Grid: { Row },
} = UI;

import cn from 'classnames';
import sUtils from 'cem/styles/utils';
import sMap from 'cem/styles/ui/map';

import { coordinates } from 'core/constants/maps';

class Infrastructure extends Component {
  render() {
    const { field: { value = [] } } = this.props;

    const center = value.length ? [value[0].lng, value[0].lat] : coordinates.moscow;

    // const tmpMarkers = [
    //   {
    //     name: `One`,
    //     lat: 54.7986794,
    //     lng: 20.5207443,
    //     kind: `one`,
    //   },
    //   {
    //     name: `Two`,
    //     lat: 55.7986795,
    //     lng: 37.5207453,
    //     kind: `two`,
    //   },
    //   {
    //     name: `Three`,
    //     lat: 55.7986784,
    //     lng: 37.5207469,
    //     kind: `three`,
    //   },
    //   {
    //     name: `Four`,
    //     lat: 55.7986787,
    //     lng: 37.5207475,
    //     kind: `four`,
    //   },
    // ];

    return (
      <section>
        <Heading size="sm">Инфраструктура</Heading>
        <Row className={cn(sMap.mapContainer, sUtils.pushedBottom6)}>
          <MapBox center={center} markers={value.map(({ lon, ...restData }) => ({ ...restData, lng: lon }))} container={<div className={sMap.map} />} />
        </Row>
      </section>
    );
  }
}

export default Infrastructure;
