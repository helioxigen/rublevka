import global from 'window-or-global';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { track } from 'core/analytics';

// actions
import loadProperty from 'core/cityProperties/actions/id/load';
import { setSharedRetargetingKey } from 'retargeting/actions';
import * as analyticsEvents from 'core/analytics/constants';

// constants
import { helmet } from 'config/seo';

// components
import MapComponent from 'ui/map';
import Helmet from './helmet';
import Media from './media';
import Description from './description';
import ComplexBuilding from './complexBuilding';
import Info from './info';
import Similar from './similar';

// helpers
import isEqual from 'lodash/isEqual';
import { dealTypes } from 'constants/properties/dictionaries';

// UI
import UI from 'ui';
const {
  Grid: { Container, Row, Col },
} = UI;

const isJQ = global.config.domain === 'jq.estate';

import s from 'styles/list';
import sUtils from 'styles/utils';
import cn from 'classnames';

class Property extends Component {
  componentDidMount() {
    this.load(this.props);

    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.params, nextProps.params)) {
      this.load(nextProps);
    }
  }

  load({ actions, params }) {
    actions.loadProperty(params.id).then(data => {
      track(analyticsEvents.propertyOpened(data));
    });
  }

  static loadServer(dispatch, params) {
    const actions = bindActionCreators({ loadProperty }, dispatch);

    return Promise.all([actions.loadProperty(params.id)]);
  }

  render() {
    const { state, params, kind } = this.props;
    const { dealType } = params;

    const property = state.cityProperties[params.id] || {};
    const { data = {} } = property;

    if (data.id) {
      const lat = data.location.latitude;
      const lng = data.location.longitude;

      const isPositionAvailable = data.location && !!lat && !!lng;

      const markerPosition = {
        lat,
        lng,
        icon: isJQ ? 'marker' : 'markerPurple',
      };

      return (
        <div className="property">
          <Helmet data={data} kind={kind} dealType={dealType} />

          <Container fluid className={sUtils.bgWhite}>
            <Row>
              <Col xs="12">
                <Media images={data.images} />
              </Col>
            </Row>

            <Info data={data} dealType={dealType} />
            <Description data={data} />
            <ComplexBuilding
              complexBuildingDetails={data.complexBuildingDetails}
            />

            {isPositionAvailable && (
              <Row className={s.settlementMap}>
                <MapComponent
                  center={[markerPosition.lng, markerPosition.lat]}
                  markers={[markerPosition]}
                  container={<div className={sUtils.mapContainer} />}
                />
              </Row>
            )}

            <Similar id={data.id} dealType={dealType} />
          </Container>

          <section className={cn(s.container, sUtils.resetBorder)}>
            <Container>
              <h1 className={s.heading}>
                {helmet.properties.show.city.h1(
                  dealTypes[dealType],
                  data.kind,
                  data.location.street,
                )}
              </h1>
            </Container>
          </section>
        </div>
      );
    }

    return null;
  }
}

const pickState = ({ cityProperties }) => ({
  state: { cityProperties },
});

const pickActions = dispatch => {
  const actions = {
    loadProperty,
    setSharedRetargetingKey,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Property);
