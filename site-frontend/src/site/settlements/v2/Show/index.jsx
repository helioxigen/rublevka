import global from 'window-or-global';
import React, { Component } from 'react';

import Scroll from 'react-scroll';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// helpers
// import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

import loadSettlement from 'core/settlements/actions/id/load';
import loadProperties from 'core/countryProperties/actions/list/load'; // for ssr

import * as FilterActions from 'core/actions/filters';
import { track } from 'core/analytics';

import UI from 'site/ui';
// import MapComponent from 'site/ui/map';
import Subscribe from 'site/request/SubscribeTisa';

import sUtils from 'site/styles/utils.css';

import PrimaryProperties from './PrimaryProperties';
import ResaleProperties from './ResaleProperties';

import Header from './Header';
import Information from './Information';
import Description from './Description';
import Helmet from './Helmet';

import { translitKinds } from 'site/constants/properties/dictionaries';

const isJQ = global.config.domain === 'jq.estate';
const {
  Grid: { Container, Row },
} = UI;

class SettlementContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealType: 'sale',
      propertyType: 'resale',
    };

    this.toggleDealType = this.toggleDealType.bind(this);
    this.togglePropertyType = this.togglePropertyType.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);

    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.params, nextProps.params)) {
      this.load(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      actions,
      state,
      params: { settlement },
    } = this.props;

    const parsedSettlement = settlement.split('_');
    const [settlementName, settlementId] = parsedSettlement;

    const { data: place } = state.settlements[settlementId] || {};
    const { data: prevPlace } = prevProps.state.settlements[settlementId] || {};

    if (!prevPlace && !!place) {
      track({
        event: 'Settlement',
        id: place.id,
        settlement: place.name,
        town: place.location.localityName,
        mkad: place.location.mkadDistance,
        settlementarea: place.details.area,
      });
    }

    if (
      prevProps.params.settlementId !== settlementId &&
      !state.settlements[settlementId]
    ) {
      this.load(this.props);
    }
  }

  togglePropertyType() {
    if (this.state.propertyType === 'resale') {
      this.setState({
        propertyType: 'primary',
      });
    } else {
      this.setState({
        propertyType: 'resale',
      });
    }
  }

  toggleDealType(dealType) {
    this.setState({ dealType });
  }

  static loadServer(dispatch, params) {
    const parsedSettlement = params.settlement.split('_');
    const [settlementName, settlementId] = parsedSettlement;

    return Promise.all([
      dispatch(loadSettlement(settlementId)),
      dispatch(
        loadProperties({}, 'forSettlementOnlyPrimary', { settlementId }),
      ),
      dispatch(
        loadProperties({}, 'forSettlementSale', {
          settlementId,
        }),
      ),
    ]);
  }

  load({ dispatch, params }) {
    const parsedSettlement = params.settlement.split('_');
    const [settlementName, settlementId] = parsedSettlement;

    dispatch(loadSettlement(settlementId));
  }

  render() {
    const { propertyType } = this.state;
    const { state, params = {} } = this.props;
    const kind = translitKinds[params.kind];

    const parsedSettlement = params.settlement.split('_');

    const [settlementName, settlementId] = parsedSettlement;

    const { isFetching, data } = state.settlements[settlementId] || {};
    const { statistics = {}, location = {} } = data || {};

    const { saleProperties = {}, rentProperties = {} } = statistics || {};

    const primaryTotal = saleProperties.primary;
    const resaleTotal = saleProperties.resale;
    const rentTotal = rentProperties.total;

    const noResaleProperty =
      saleProperties.resale === 0 && rentProperties.total === 0;

    // const isPositionAvailable = location.latitude && location.longitude;
    // const marker = {
    //   lat: location.latitude,
    //   lng: location.longitude,
    //   icon: isJQ ? 'marker' : 'markerPurple',
    // };

    return (
      <section>
        <Helmet
          data={data}
          category="country"
          placeKind="settlements"
          placeId={settlementId}
          placeName={settlementName}
          dealType={this.state.dealType}
          kind={kind}
        />

        <Header
          isFetching={isFetching}
          data={data}
          dealType={this.state.dealType}
          kind={kind}
        />

        {propertyType === 'primary' && primaryTotal > 0 && (
          <PrimaryProperties
            toggleProperty={this.togglePropertyType}
            settlementId={settlementId}
            statistics={statistics}
            primaryTotal={primaryTotal}
            propertyType={propertyType}
            location={this.props.location}
            kind={kind}
          />
        )}

        {propertyType === 'resale' && (resaleTotal > 0 || rentTotal > 0) && (
          <ResaleProperties
            settlementId={settlementId}
            dealType={this.state.dealType}
            statistics={statistics}
            toggleDealType={this.toggleDealType}
            toggleProperty={this.togglePropertyType}
            primaryTotal={primaryTotal}
            propertyType={propertyType}
            location={this.props.location}
            kind={kind}
          />
        )}

        {noResaleProperty && (
          <PrimaryProperties
            toggleProperty={this.togglePropertyType}
            settlementId={settlementId}
            statistics={statistics}
            primaryTotal={primaryTotal}
            propertyType={propertyType}
            location={this.props.location}
            noResaleProperty={noResaleProperty}
            kind={kind}
          />
        )}

        <Scroll.Element name="scrollTo">
          <Information isFetching={isFetching} data={data} kind={kind} />
        </Scroll.Element>

        <Container fluid>
          <Description
            isFetching={isFetching}
            data={data}
            dealType={this.state.dealType}
            kind={kind}
          />

          {/* {isPositionAvailable && (
            <Row className={sUtils.positionRelative}>
              <MapComponent
                center={[marker.lng, marker.lat]}
                markers={[marker]}
                container={<div className={sUtils.mapContainer} />}
              />
            </Row>
          )} */}
        </Container>

        <Subscribe />
      </section>
    );
  }
}

const pickState = ({ settlements, filter }) => ({
  state: { settlements, filter },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ loadSettlement, ...FilterActions }, dispatch),
  dispatch,
});

export default connect(
  pickState,
  pickActions,
)(SettlementContainer);
