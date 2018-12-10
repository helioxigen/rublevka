import React, { Component } from 'react';

import MapGL from 'core/components/mapgl/MapGL';
import genMarker from 'core/components/mapgl/genMarker';

import UI from 'site/ui';

import cn from 'classnames';
import s from 'site/styles/utils';

import startsWith from 'lodash/startsWith';

function cancelScrollEvent(event) {
  event.stopImmediatePropagation();
  event.preventDefault();
  return false;
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { fullscreen: false, zoom: props.zoom || 13, center: props.center };
  }

  handleViewportChange(bounds, center) {
    const { onChangeViewport } = this.props;

    this.setState({ center });

    if (onChangeViewport) onChangeViewport(bounds);
  }

  handleFeatureClick(coordinates, data) {
    const { onSettlementClick } = this.props;

    if (data.layer.id === `unclustered`) {
      onSettlementClick(coordinates, data);
    } else if (startsWith(data.layer.id, `cluster-`)) {
      this.setState({ center: [coordinates.lng, coordinates.lat], zoom: this.state.zoom + 1 });
    }
  }

  toggleFullscreen(fullscreen) {
    this.setState({ fullscreen });
    if (fullscreen) {
      this.refs.container.addEventListener(`wheel`, cancelScrollEvent, false);
      this.refs.mapgl.getMap().scrollZoom.enable();
    } else {
      this.refs.container.removeEventListener(`wheel`, cancelScrollEvent, false);
      this.refs.mapgl.getMap().scrollZoom.disable();
    }
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 1 });
  }

  zoomOut() {
    this.setState({ zoom: this.state.zoom - 1 });
  }

  handleDoubleClick({ lng, lat }) {
    this.setState({ center: [lng, lat], zoom: this.state.zoom + 1 });
  }

  handleMount(bounds) {
    const { onMount } = this.props;

    if (onMount) onMount(bounds);
  }

  render() {
    const { container, markers, layers, additionalSourceOptions } = this.props;
    const generatedMarkers = markers.map(genMarker);
    const className = cn(
      { [s.fullscreen]: this.state.fullscreen },
      container.props.className,
    );

    if (typeof window !== `undefined` && !window.mapboxgl) return null;

    return (
      <container ref="container" className={className}>
        <MapGL center={this.state.center} features={generatedMarkers} zoom={this.state.zoom} ref="mapgl" controls={false} layers={layers} additionalSourceOptions={additionalSourceOptions}
          onChangeViewport={::this.handleViewportChange} onFeatureClick={::this.handleFeatureClick} onMount={::this.handleMount} onDoubleClick={::this.handleDoubleClick} />
        <div className={s.btnControlContainer}>
          <UI.Button className={s.btnControl} type="button" onClick={::this.zoomIn} disabled={this.state.zoom >= 16}>+</UI.Button>
          <UI.Button className={s.btnControl} type="button" onClick={::this.zoomOut} disabled={this.state.zoom <= 0}>–</UI.Button>
        </div>
      </container>
    );
  }
}
