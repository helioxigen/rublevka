import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

import MapGL from 'core/components/mapgl/MapGL'; // TODO: use 'site/ui/map'
import genMarker from 'core/components/mapgl/genMarker';

// actions
import loadSettlement from 'core/settlements/actions/id/load';

import UI from 'ui';
const {
  Button,
  Icon,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'styles/property/settlement';
import sUtils from 'styles/utils';

import { nameToSlug } from 'core/helpers/nameToSlug';

function cancelScrollEvent(event) {
  event.stopImmediatePropagation();
  event.preventDefault();
  return false;
}

function getImgUrl(publicImages) {
  if (!!publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${
      publicImages[0].id
    }-thumbnail-512)`;
  } else if (typeof window !== `undefined`) {
    return `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder.jpg)`;
  }
}

class SettlementMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false,
      zoom: props.zoom || 11,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentDidMount() {
    this.refs.mapgl.getMap().dragPan.disable();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settlementId !== nextProps.settlementId) {
      this.load(nextProps);
    }
  }

  componentDidUpdate() {
    this.refs.mapgl.getMap().resize();
  }

  load({ actions, settlementId }) {
    actions.loadSettlement(settlementId);
  }

  toggleFullscreen(fullscreen) {
    this.setState({ fullscreen });

    if (fullscreen) {
      this.refs.container.addEventListener(`wheel`, cancelScrollEvent, false);
      this.refs.mapgl.getMap().scrollZoom.enable();
      this.refs.mapgl.getMap().dragPan.enable();
    } else {
      this.refs.container.removeEventListener(
        `wheel`,
        cancelScrollEvent,
        false,
      );
      this.refs.mapgl.getMap().scrollZoom.disable();
      this.refs.mapgl.getMap().dragPan.disable();
    }
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 1 });
  }

  zoomOut() {
    this.setState({ zoom: this.state.zoom - 1 });
  }

  render() {
    const { container, center, markers, settlementId } = this.props;
    const generatedMarkers = markers.map(genMarker);
    const zoomLevel = this.state.zoom;
    const className = cn(
      { [sUtils.fullscreen]: this.state.fullscreen },
      container.props.className,
    );

    const { settlements } = this.props.state;
    const settlement = settlements[settlementId] || {};
    const { data = {} } = settlement;

    const { images = [] } = data;
    const { location = {}, statistics = {} } = data;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    const imgUrl = getImgUrl(publicImages);

    if (typeof window !== `undefined` && !window.mapboxgl) return null;

    return (
      <container ref="container" className={className}>
        <div className={cn(s.wrapper, this.state.fullscreen && s.fullscreen)}>
          <Container fluid>
            <Row>
              <Col
                xs="12"
                sm="5"
                md="4"
                lg="3"
                smOffset="0"
                mdOffset="8"
                lgOffset="9"
                className={sUtils.resetPadding}
              >
                <div className={s.card}>
                  <div className={s.image} style={{ backgroundImage: imgUrl }}>
                    <div className={s.content}>
                      <div className={s.title}>{data.name}</div>
                      <div className={s.location}>
                        <span>
                          <Icon className={s.locationIcon} icon="location" />
                        </span>
                        {location.mkadDistance && (
                          <span className={sUtils.pushedLeft1}>
                            {location.mkadDistance} км
                          </span>
                        )}
                        {location.routeName && (
                          <span className={sUtils.pushedLeft1}>
                            {location.routeName} ш.
                          </span>
                        )}
                      </div>
                      <Button
                        to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                          data.name,
                        )}_${this.props.settlementId}`}
                        className={s.btn}
                      >
                        Все предложения {statistics.totalProperties}
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <MapGL
          center={center}
          features={generatedMarkers}
          zoom={this.state.zoom}
          ref="mapgl"
          controls={false}
        />

        {!this.state.fullscreen && !this.props.noFullScreen && (
          <UI.Button
            className={cn(sUtils.btnFullScreenBottomLeft, sUtils.hideXsSm)}
            type="button"
            onClick={() => ::this.toggleFullscreen(!this.state.fullscreen)}
          >
            <UI.Icon className={sUtils.iconFrame} icon="frame" />
            На весь экран
          </UI.Button>
        )}

        {this.state.fullscreen && (
          <UI.Button
            className={cn(sUtils.btnFullScreenClose)}
            type="button"
            onClick={() => ::this.toggleFullscreen(!this.state.fullscreen)}
          >
            <UI.Icon className={sUtils.iconTimes} icon="times" />
          </UI.Button>
        )}

        <div className={sUtils.btnControlContainer}>
          <UI.Button
            className={cn(sUtils.btnControl, sUtils.hideXsSm)}
            type="button"
            onClick={::this.zoomIn}
            disabled={zoomLevel >= 16}
          >
            +
          </UI.Button>
          <UI.Button
            className={cn(sUtils.btnControl, sUtils.hideXsSm)}
            type="button"
            onClick={::this.zoomOut}
            disabled={zoomLevel <= 0}
          >
            –
          </UI.Button>
        </div>
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
