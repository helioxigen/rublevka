import React, { Component } from 'react';

import { coordinates } from 'core/constants/maps';

import isEqual from 'lodash/isEqual';

class MapGl extends Component {
  static defaultProps = {
    zoom: 11,
    center: coordinates.moscow,
    features: [],
    controls: true,
    additionalSourceOptions: {},
    layers: [
      {
        id: `markers`,
        type: `symbol`,
        source: `markers`,
        layout: {
          'icon-image': `{marker-symbol}`,
        },
      },
    ],
  };

  componentDidMount() {
    const {
      center,
      zoom,
      features,
      controls,
      additionalSourceOptions,
      layers,
      onFeatureClick,
      onMount,
      onDoubleClick,
    } = this.props;

    const map = new mapboxgl.Map({
      container: this.refs.map,
      style: `mapbox://styles/justusebrain/cirxnq1qj003igynmiqwtan67`,
      zoom,
      center,
      maxBounds: [
        [33.522700820307335, 54.23896244234837],
        [40.55395082030742, 57.281468045639826],
      ],
    });

    this._dataSource = new mapboxgl.GeoJSONSource({
      type: `geojson`,
      data: {
        type: `FeatureCollection`,
        features,
      },
      ...additionalSourceOptions,
    });

    map.on(`style.load`, () => {
      map.addSource(`markers`, this._dataSource);
      layers.forEach(layer => map.addLayer(layer));
    });

    map.on(`dragend`, () => {
      ::this.handleViewportChange(map.getBounds(), map.getCenter());
    });

    map.on(`zoomend`, () => {
      ::this.handleViewportChange(map.getBounds(), map.getCenter());
    });

    map.on(`dblclick`, event => {
      if (onDoubleClick) onDoubleClick(event.lngLat);
    });

    map.on(`mousemove`, event => {
      const renderedFeatures = map.queryRenderedFeatures(event.point, {
        layers: [
          `unclustered`,
          `cluster-0`,
          `cluster-1`,
          `cluster-2`,
          `markers`,
        ],
      });
      map.getCanvas().style.cursor = renderedFeatures.length ? `pointer` : ``;
    });

    map.on(`click`, event => {
      const renderedFeatures = map.queryRenderedFeatures(event.point, {
        layers: [`unclustered`, `cluster-0`, `cluster-1`, `cluster-2`],
      });
      if (onFeatureClick && renderedFeatures.length) {
        onFeatureClick(event.lngLat, renderedFeatures[0]);
      }
    });

    if (controls) map.addControl(new mapboxgl.Navigation());
    map.scrollZoom.disable();

    this._map = map;

    if (onMount) onMount(map.getBounds());
  }

  shouldComponentUpdate(nextProps) {
    const { features, center, zoom } = this.props;

    return (
      !isEqual(nextProps.features, features) ||
      !isEqual(nextProps.center, center) ||
      !isEqual(nextProps.zoom, zoom)
    );
  }

  componentDidUpdate(prevProps) {
    const { features, center, zoom } = this.props;

    if (!isEqual(prevProps.features, features)) {
      this._dataSource.setData({
        type: `FeatureCollection`,
        features,
      });
    }

    if (!isEqual(prevProps.center, center) || !isEqual(prevProps.zoom, zoom)) {
      this._map.flyTo({
        center,
        zoom,
        speed: 1.5,
      });
    }
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  handleViewportChange(bounds, center) {
    const { onChangeViewport } = this.props;

    if (onChangeViewport) {
      onChangeViewport(bounds, center);
    }
  }

  getMap() {
    return this._map;
  }

  getBounds() {
    return this._map.getBounds();
  }

  render() {
    return <div ref="map" style={{ height: `100%` }} />;
  }
}

export default MapGl;
