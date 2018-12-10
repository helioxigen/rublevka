import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapComponent from 'site/ui/map';

import { push } from 'react-router-redux';

import UI from 'site/ui';
const {
  Visibility,
  Button,
} = UI;

import s from 'landing/styles/landing/map';

class Map extends Component {
  render() {
    const { data = {} } = this.props;
    const { location = {} } = data;

    const marker = {
      lat: location.latitude || 37.565783,
      lng: location.longitude || 55.756971,
      icon: 'marker',
    };

    return (
      <div>
        <div className={s.mapContainer}>
          <MapComponent
            center={[marker.lng, marker.lat]}
            markers={[marker]}
            container={<div className={s.mapContainer} />}
            zoom={11}
            controls={false}
            isFullScreenDisabled
          />

          <h1 className={s.title}>{location.routeName} шоссе, {location.mkadDistance} км</h1>

          <Visibility xs="hidden" sm="hidden">
            <a href="https://s3.eu-central-1.amazonaws.com/dt-marketing/renessans-park-1.pdf" target="_blank" className={s.link}>Показать план поселка</a>
          </Visibility>
        </div>

        <Visibility md="hidden" lg="hidden">
          <div className={s.linkContainer}>
            <a href="https://s3.eu-central-1.amazonaws.com/dt-marketing/renessans-park-1.pdf" target="_blank" className={s.link}>Показать план поселка</a>
          </div>
        </Visibility>
      </div>
    );
  }
}

const pickActions = (dispatch) => {
  const actions = {
    push,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(null, pickActions)(Map);
