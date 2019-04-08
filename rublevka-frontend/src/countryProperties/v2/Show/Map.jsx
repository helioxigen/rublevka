import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapGL from 'core/components/mapgl/MapGL'; // TODO: use 'site/ui/map'
import genMarker from 'core/components/mapgl/genMarker';

// actions
import loadSettlement from 'core/settlements/actions/id/load';

import UI from 'ui';

import cn from 'classnames';
import sUtils from 'styles/utils';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Button,
  Icon,
  Grid: { Container, Row, Col },
} = UI;

const Wrapper = styled.div`
  position: absolute;
  height: 13.7rem;
  width: 22rem;
  right: -1.5rem;
  top: -5.6rem;
  border-radius: 0.4rem;
  overflow: hidden;
`;

const MapContainer = styled.div`
  position: absolute;
  top: -5rem;
  bottom: 0rem;
  right: 0rem;
  left: 0;
`;

const MapBtn = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 1.3rem 0 1.2rem;
  z-index: 2;
  background: #fff;
  color: #4d4d4d;
  font-size: 1.4rem;
  border-radius: 0 0 0.4rem 0.4rem;
  border: none;

  &:hover,
  &:focus {
    background: #fff;
    color: ${p => p.theme.brandPrimary};
  }
`;

const Scale = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;

  ${media.sm`
    right: 3rem;
  `};
`;

function cancelScrollEvent(event) {
  event.stopImmediatePropagation();
  event.preventDefault();
  return false;
}

class SettlementMap extends Component {
  constructor(props) {
    super(props);

    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.openFullscreen = this.openFullscreen.bind(this);

    this.state = {
      fullscreen: false,
      zoom: props.zoom || 11,
    };
  }

  componentDidMount() {
    this.refs.mapgl.getMap().dragPan.disable();
  }

  componentDidUpdate() {
    this.refs.mapgl.getMap().resize();
  }

  toggleFullscreen(fullscreen) {
    this.setState({ fullscreen });

    if (fullscreen) {
      this.refs.container.addEventListener('wheel', cancelScrollEvent, false);
      this.refs.mapgl.getMap().scrollZoom.enable();
      this.refs.mapgl.getMap().dragPan.enable();
    } else {
      this.refs.container.removeEventListener(
        'wheel',
        cancelScrollEvent,
        false,
      );
      this.refs.mapgl.getMap().scrollZoom.disable();
      this.refs.mapgl.getMap().dragPan.disable();
    }
  }

  openFullscreen() {
    this.setState({
      fullscreen: true,
    });
    this.refs.container.addEventListener('wheel', cancelScrollEvent, false);
    this.refs.mapgl.getMap().scrollZoom.enable();
    this.refs.mapgl.getMap().dragPan.enable();
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 1 });
  }

  zoomOut() {
    this.setState({ zoom: this.state.zoom - 1 });
  }

  render() {
    const { container, center, markers } = this.props;
    const { fullscreen } = this.state;
    const generatedMarkers = markers.map(genMarker);
    const zoomLevel = this.state.zoom;
    const className = cn(
      { [sUtils.fullscreen]: fullscreen },
      container.props.className,
    );

    if (typeof window !== 'undefined' && !window.mapboxgl) return null;

    return (
      <container ref="container" className={className}>
        <MapContainer onClick={this.openFullscreen}>
          <MapGL
            center={center}
            features={generatedMarkers}
            zoom={this.state.zoom}
            ref="mapgl"
            controls={false}
          />
        </MapContainer>

        {!fullscreen && !this.props.noFullScreen && (
          <MapBtn
            type="button"
            onClick={() => this.toggleFullscreen(!fullscreen)}
          >
            Показать на карте
          </MapBtn>
        )}

        {fullscreen && (
          <UI.Button
            className={cn(sUtils.btnFullScreenClose)}
            type="button"
            onClick={() => this.toggleFullscreen(!fullscreen)}
          >
            <UI.Icon className={sUtils.iconTimes} icon="times" />
          </UI.Button>
        )}

        {fullscreen && (
          <Scale>
            <UI.Button
              className={cn(sUtils.btnControl, sUtils.hideXsSm)}
              type="button"
              onClick={this.zoomIn}
              disabled={zoomLevel >= 16}
            >
              +
            </UI.Button>
            <UI.Button
              className={cn(sUtils.btnControl, sUtils.hideXsSm)}
              type="button"
              onClick={this.zoomOut}
              disabled={zoomLevel <= 0}
            >
              –
            </UI.Button>
          </Scale>
        )}
      </container>
    );
  }
}

const pickState = state => {
  const { settlements } = state;

  return {
    state: {
      settlements,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadSettlement,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(SettlementMap);
