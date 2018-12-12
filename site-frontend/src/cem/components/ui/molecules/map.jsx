import React, { Component } from 'react';

import MapGL from 'core/components/mapgl/MapGL';
import genMarker from 'core/components/mapgl/genMarker';

import UI from 'cem/components/ui';

import cn from 'classnames';

function cancelScrollEvent(event) {
  event.stopImmediatePropagation();
  event.preventDefault();
  return false;
}

export default (s = {}) => class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false,
      zoom: props.zoom || 13,
    };
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

  render() {
    const { container, center, markers } = this.props;
    const generatedMarkers = markers.map(genMarker);
    const zoomLevel = this.state.zoom;

    return (
      <container ref="container" className={cn(this.state.fullscreen && s.fullscreen, container.props.className)}>
        <MapGL center={center} features={generatedMarkers} zoom={this.state.zoom} ref="mapgl" controls={false} />
        {!this.state.fullscreen &&
          <UI.Button className={s.btnFullScreen} type="button" onClick={() => ::this.toggleFullscreen(!this.state.fullscreen)}>
            <UI.Icon className={s.iconFrame} icon="frame" />
            На весь экран
          </UI.Button>
        }
        {this.state.fullscreen &&
          <UI.Button className={s.btnFullScreenClose} type="button" onClick={() => ::this.toggleFullscreen(!this.state.fullscreen)}>
            <UI.Icon className={s.iconTimes} icon="times" />
          </UI.Button>
        }
        <div className={s.btnControlContainer}>
          <UI.Button className={s.btnControl} type="button" onClick={::this.zoomIn} disabled={zoomLevel >= 16}>+</UI.Button>
          <UI.Button className={s.btnControl} type="button" onClick={::this.zoomOut} disabled={zoomLevel <= 0}>−</UI.Button>
        </div>
      </container>
    );
  }
};
