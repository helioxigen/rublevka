import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import global from 'window-or-global';

// actions
import loadProperty from 'core/countryProperties/actions/id/load';
import { setSharedRetargetingKey } from 'site/retargeting/actions';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';

// constants
import { helmet } from 'site/config/seo';
// helpers
import isEqual from 'lodash/isEqual';
import { dealTypes } from 'site/constants/properties/dictionaries';

import cn from 'classnames';
import s from 'site/styles/list.css';
import sUtils from 'site/styles/utils.css';

// UI
import UI from 'site/ui';

// components
import Header from './Header';
import SettlementMap from './settlement';
import Helmet from './Helmet';
import Media from './media';
import Description from './description';
import Info from './info';
import Similar from './similar';

const {
  Button,
  Grid: { Container, Row },
} = UI;

const isJQ = global.config.domain === 'jq.estate';

const load = ({ actions, id }) => {
  actions
    .loadProperty(id)
    .then(
      data => track(analyticsEvents.propertyOpened(data)),
      err => console.error(err),
    );
};

class Property extends Component {
  componentDidMount() {
    load(this.props);

    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.id, nextProps.id)) {
      load(nextProps);
    }
  }

  handleSwitchProperty(e, nextIndex) {
    e.preventDefault();

    const { state, actions, dealType } = this.props;
    const { ids = [] } = state.countryProperties[dealTypes[dealType]] || {};

    const newId = ids[nextIndex];

    if (nextIndex !== -1 && nextIndex !== 32) {
      actions.push(`/zagorodnaya/${dealType}/dom/${newId}`);
    }
  }

  render() {
    const { state, kind, id } = this.props;
    const dealType = dealTypes[this.props.dealType];

    const property = state.countryProperties[id] || {};
    const { data = {}, errors } = property;
    const { location = {}, images = [], layoutImages = [] } = data;

    const settlementId = location.settlementId;

    if (errors) {
      return <div>{errors}</div>;
    }

    const lat = location.latitude;
    const lng = location.longitude;

    const isPositionAvailable = !!lat && !!lng;

    const markerPosition = {
      lat,
      lng,
      icon: isJQ ? 'marker' : 'markerPurple',
    };

    const { ids = [] } = state.countryProperties[dealType] || {};
    const currentId = Number(id);
    const currentIndex = ids.indexOf(currentId);

    const disabledPrev = currentIndex === 0;
    const disabledNext = currentIndex === 31;

    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    return (
      <div className="property">
        <Helmet data={data} kind={kind} dealType={this.props.dealType} />
        <Header data={data} dealType={dealType} />

        <Container fluid className={sUtils.bgWhite}>
          <Media images={images} />

          <Row className={sUtils.hideFromSm}>
            <Button
              className={s.button}
              disabled={disabledPrev}
              onClick={e => this.handleSwitchProperty(e, prevIndex)}
            >
              <UI.Icon
                className={cn(
                  sUtils.iconArrow,
                  sUtils.pushedRight1_2,
                  sUtils.rotate180,
                )}
                icon="arrow-right"
              />
              Предыдущий
            </Button>

            <Button
              className={s.button}
              disabled={disabledNext}
              onClick={e => this.handleSwitchProperty(e, nextIndex)}
            >
              Следующий
              <UI.Icon
                className={cn(sUtils.iconArrow, sUtils.pushedLeft1)}
                icon="arrow-right"
              />
            </Button>
          </Row>

          <Row>
            <Info data={data} dealType={this.props.dealType} />
          </Row>

          <Description data={data} layoutImages={layoutImages} />

          {isPositionAvailable && (
            <Row className={s.settlementMap}>
              <SettlementMap
                center={[markerPosition.lng, markerPosition.lat]}
                markers={[markerPosition]}
                container={<div className={sUtils.mapContainerForProperty} />}
                settlementId={settlementId}
              />
            </Row>
          )}

          <Similar id={data.id} dealType={this.props.dealType} />
        </Container>

        {/* <section className={cn(s.container, sUtils.resetBorder)}> // TODO research to we need it?
          <Container>
            <h1 className={s.heading}>
              {helmet.properties.show.country.h1(
                dealType,
                data.kind,
                location.settlementName,
                location.routeName,
              )}
            </h1>
          </Container>
        </section> */}
      </div>
    );
  }
}

const pickState = state => {
  const { countryProperties } = state;

  return {
    state: {
      countryProperties,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadProperty,
    setSharedRetargetingKey,
    push,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
};

export default connect(
  pickState,
  pickActions,
)(Property);
