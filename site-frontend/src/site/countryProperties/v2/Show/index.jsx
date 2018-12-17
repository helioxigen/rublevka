import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import global from 'window-or-global';

// actions
import loadProperty from 'core/countryProperties/actions/id/load';
import sendAnalytics from 'core/analytics/actions';
import * as analyticsEvents from 'core/analytics/constants';

// components
import Breadcrumbs from './Breadcrumbs';

import Helmet from './Helmet';
import Media from './Media';
import Info from './Info';
import Map from './Map';
import Description from './Description';
import Reservation from './Reservation';
import Settlement from './Settlement';
import Similar from './Similar';

import propertiesSeo from 'site/config/seo/properties';

import { ShowXsSm, HideXsSmMd } from 'site/styles/mediaUtils';

// helpers
import isEqual from 'lodash/isEqual';
import { dealTypes } from 'site/constants/properties/dictionaries';
import { kindsTranslit, kinds } from 'site/constants/properties/dictionaries';

// UI
import UI from 'site/ui';

import sUtils from 'site/styles/utils';

import {
  HeaderBg,
  Title,
  HeaderWrapper,
  TabletWrapper,
  NavWrapper,
  NavBtn,
  NavBtnNext,
  PrevIcon,
  NextIcon,
  PhotoIcon,
  PropertyCounter,
  Relative,
  FlexWrapper,
  Id,
  IdDesktop,
  PhotoCounter,
  InfoMap,
  MapWrapper,
} from './styled';

const isJQ = global.config.domain === 'jq.estate';

const { Grid: { Container, Row, Col } } = UI;

class Property extends Component {
  componentDidMount() {
    this.load(this.props);

    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.id, nextProps.id)) {
      this.load(nextProps);
    }
  }

  load({ actions, id }) {
    actions.loadProperty(id).then((data) => {
      this.props.dispatch(sendAnalytics(analyticsEvents.propertyOpened(data)));
    });
  }

  handleSwitchProperty(e, nextIndex) {
    e.preventDefault();

    const { state, dealType } = this.props;
    const { ids = [] } = state.countryProperties[dealTypes[dealType]] || {};

    const newId = ids[nextIndex];
    const kind = state.countryProperties[newId].data.kind || 'dom';

    if (nextIndex !== -1 && nextIndex !== 32) {
      this.props.dispatch(push(`/zagorodnaya/${dealType}/${kindsTranslit[kind]}/${newId}`));
    }
  }

  render() {
    const { state, id } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const kind = kinds[this.props.kind];

    const property = state.countryProperties[id] || {};
    const { data = {}, errors } = property;
    const { headline, location = {}, specification = {}, landDetails = {} } = data;

    const area = Math.floor(specification.area);
    const landArea = Math.floor(landDetails.area);
    const settlement = location.settlementName;

    const settlementId = location.settlementId;

    if (errors) {
      return <div>{errors}</div>;
    }

    if (data.id) {
      const lat = data.location.latitude;
      const lng = data.location.longitude;

      const isPositionAvailable = data.location && !!lat && !!lng;

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

      const imgArray = data.images;
      const isImageView = imgArray.filter(counter => counter.isPublic);
      const imageCounter = isImageView.length;

      const title = headline ? Array(headline) : Array(propertiesSeo.show.country.h1(kind, area, landArea, settlement), ' ', location.mkadDistance, ' км');
      const titleH1 = `${propertiesSeo.show.country.h1(kind, area, landArea, settlement)} ${location.mkadDistance} км`;

      const offerKind = data[`${dealType}Offer`] || {
        multiCurrencyPrice: { usd: 0, eur: 0, rub: 0 },
      };
      const usdPrice = offerKind.multiCurrencyPrice.usd;

      return (
        <div className="property">
          <Helmet
            data={data}
            kind={kind}
            dealType={this.props.dealType}
            titleH1={titleH1}
            usdPrice={usdPrice}
          />
          <HeaderBg>
            <Container>
              <Row>
                <TabletWrapper xs="12">
                  <IdDesktop>ID {data && data.id}</IdDesktop>
                  <NavWrapper>
                    <NavBtn
                      disabled={disabledPrev}
                      onClick={e => this.handleSwitchProperty(e, prevIndex)}
                    >
                      <PrevIcon icon="arrow-right" />
                    </NavBtn>

                    <PropertyCounter>{currentIndex + 1}</PropertyCounter>

                    <NavBtnNext
                      disabled={disabledNext}
                      onClick={e => this.handleSwitchProperty(e, nextIndex)}
                    >
                      <NextIcon icon="arrow-right" />
                    </NavBtnNext>
                  </NavWrapper>
                </TabletWrapper>
              </Row>
              <Row>
                <HeaderWrapper>
                  <Col xs="12" md="8">
                    <Breadcrumbs data={data} dealType={this.props.dealType} />
                    {settlement && (<Title>{title}</Title>)}
                    {!settlement && <Title>—</Title>}
                  </Col>
                  <HideXsSmMd>
                    <NavWrapper>
                      <IdDesktop>ID {data && data.id}</IdDesktop>
                      <NavBtn
                        disabled={disabledPrev}
                        onClick={e => this.handleSwitchProperty(e, prevIndex)}
                      >
                        <PrevIcon icon="arrow-right" />
                      </NavBtn>

                      <PropertyCounter>{currentIndex + 1}</PropertyCounter>

                      <NavBtnNext
                        disabled={disabledNext}
                        onClick={e => this.handleSwitchProperty(e, nextIndex)}
                      >
                        <NextIcon icon="arrow-right" />
                      </NavBtnNext>
                    </NavWrapper>
                  </HideXsSmMd>
                </HeaderWrapper>
              </Row>
            </Container>
          </HeaderBg>

          <Container fluid>
            <Row>
              <Col xs="12">
                <Relative>
                  <Media images={data.images} />
                  <Container>
                    <FlexWrapper>
                      <Id>ID {data && data.id}</Id>

                      {imageCounter > 2 && (
                        <PhotoCounter>
                          <PhotoIcon icon="photo" />
                          {imageCounter}
                        </PhotoCounter>
                      )}
                    </FlexWrapper>
                  </Container>
                </Relative>
              </Col>
            </Row>

            <Row>
              <InfoMap>
                <Container>
                  <Relative>
                    <Row>
                      <Col xs="12">
                        <Info data={data} dealType={this.props.dealType} />
                        {isPositionAvailable && (
                          <MapWrapper>
                            <Map
                              center={[markerPosition.lng, markerPosition.lat]}
                              markers={[markerPosition]}
                              container={<div className={sUtils.mapContainerForProperty} />}
                            />
                          </MapWrapper>
                        )}
                      </Col>
                    </Row>
                  </Relative>
                </Container>
              </InfoMap>
            </Row>

            <Description data={data} />

            <Reservation data={data} dealType={this.props.dealType} />

            <ShowXsSm>
              <Row>
                <NavWrapper>
                  <IdDesktop>ID {data && data.id}</IdDesktop>
                  <NavBtn
                    disabled={disabledPrev}
                    onClick={e => this.handleSwitchProperty(e, prevIndex)}
                  >
                    <PrevIcon icon="arrow-right" />
                    Предыдущий
                  </NavBtn>

                  <PropertyCounter>{currentIndex + 1}</PropertyCounter>

                  <NavBtnNext
                    disabled={disabledNext}
                    onClick={e => this.handleSwitchProperty(e, nextIndex)}
                  >
                    Следующий
                    <NextIcon icon="arrow-right" />
                  </NavBtnNext>
                </NavWrapper>
              </Row>
            </ShowXsSm>

            {isPositionAvailable && (
              <Settlement
                center={[markerPosition.lng, markerPosition.lat]}
                markers={[markerPosition]}
                container={<div className={sUtils.mapContainerForProperty} />}
                settlementId={settlementId}
              />
            )}

            <Similar id={data.id} dealType={this.props.dealType} />
          </Container>
        </div>
      );
    }

    return null;
  }
}

const pickState = (state) => {
  const { countryProperties } = state;

  return {
    state: {
      countryProperties,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadProperty,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
};

export default connect(pickState, pickActions)(Property);
