import React, { Component } from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import isEqual from 'lodash/isEqual';

// actions
import loadProperty from '../../../core/countryProperties/actions/id/load';
import { setSharedRetargetingKey } from '../../../retargeting/actions';
import { toggleFavorite } from '../../../core/actions/favorites';

import { track } from '../../../core/analytics';
import * as analyticsEvents from '../../../core/analytics/constants';

import { dealTypes } from '../../../constants/properties/dictionaries';

// UI
import UI from '../../../ui/v2019';
import media from '../../../styles/media';

// components
import Helmet from './Helmet';
import Breadcrumbs from './Breadcrumbs';
import Header from './Header';
import Media from './Media';
import Summary from './Summary';
// import Description from './Description';
import Info from './Info';
import Layout from './Layout';
import Location from './Location';
import Similar from './Similar';
import CallBlock from './CallBlock';
import CallForm from './CallForm';

const {
  Grid: { Container, Col, Row },
  Visibility,
} = UI;

const Wrapper = styled.div`
  margin: 0 -5px;

  ${media.md`
    padding: 24px 20px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
  `}
`;

const FormVisibility = styled(Visibility)`
  width: 100%;
`;

const load = ({ actions, id }) => {
  actions.loadProperty(id).then(
    data => track(analyticsEvents.propertyOpened(data)),
    // eslint-disable-next-line no-console
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
    const { state, kind, id, actions } = this.props;
    const {
      favorites = [],
      displayOptions: { currency },
    } = state;
    const dealType = dealTypes[this.props.dealType];

    const property = state.countryProperties[id] || {};
    const { data = {}, errors } = property;
    const {
      location = {},
      images = [],
      landDetails = {},
      specification = {},
      communication = {},
    } = data;

    if (errors) {
      return <div>{errors}</div>;
    }

    const lat = location.latitude;
    const lng = location.longitude;

    const isPositionAvailable = !!lat && !!lng;

    const markerPosition = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    };

    const { [currency]: price } =
      (data[`${dealType}Offer`] || {}).multiCurrencyPrice || {};
    const priceForBlock = price / landDetails.area;

    const priceData = {
      currency,
      price,
      priceForBlock,
    };

    // eslint-disable-next-line max-len
    const displaySummary =
      landDetails.area || specification.area || specification.bedrooms;

    return (
      <div className="property">
        <Helmet data={data} kind={kind} dealType={this.props.dealType} />

        <Container>
          <Row>
            <Col xs="12" lg="10" lgOffset="1">
              <Breadcrumbs data={data} dealType={dealType} />
            </Col>
            <Col xs="12" md="8" lg="7" lgOffset="1">
              <Wrapper>
                <Header data={data} propertyId={id} dealType={dealType} />
                <Media
                  toggleFavorite={() =>
                    actions.toggleFavorite(
                      Number.parseInt(id, 10),
                      this.props.dealType,
                    )
                  }
                  isFavorite={favorites.some(
                    item =>
                      item.id === Number.parseInt(id, 10) &&
                      item.dealType === this.props.dealType,
                  )}
                  images={images}
                  propertyId={id}
                />
                {displaySummary && <Summary data={data} />}
                {/* <Description data={data} /> */}
                {(!!specification.area ||
                  Object.keys(communication).length !== 0) && (
                  <Info data={data} />
                )}
                {Object.keys(specification.layouts || {}).length !== 0 && (
                  <Layout kind={data.kind} layout={specification.layouts} />
                )}
                <Visibility sm="hidden" md="hidden" lg="hidden">
                  {!!price && (
                    <CallForm
                      toggleFavorite={() =>
                        actions.toggleFavorite(
                          Number.parseInt(id, 10),
                          this.props.dealType,
                        )
                      }
                      priceData={priceData}
                      kind={data.kind}
                    />
                  )}
                </Visibility>
                {isPositionAvailable && (
                  <Location markerPosition={markerPosition} />
                )}
              </Wrapper>
            </Col>
            <Col md="4" lg="3">
              <FormVisibility xs="hidden" sm="hidden" md="hidden">
                {!!price && (
                  <CallForm
                    dealType={dealType}
                    toggleFavorite={() =>
                      actions.toggleFavorite(
                        Number.parseInt(id, 10),
                        this.props.dealType,
                      )
                    }
                    priceData={priceData}
                    kind={data.kind}
                  />
                )}
              </FormVisibility>
            </Col>
          </Row>
          <Similar id={data.id} dealType={dealType} />
          {!!price && (
            <CallBlock
              dealType={dealType}
              priceData={priceData}
              kind={data.kind}
            />
          )}
        </Container>
      </div>
    );
  }
}

const pickState = (state) => {
  const { countryProperties, favorites, displayOptions } = state;

  return {
    state: {
      countryProperties,
      favorites,
      displayOptions,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadProperty,
    setSharedRetargetingKey,
    push,
    toggleFavorite,
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
