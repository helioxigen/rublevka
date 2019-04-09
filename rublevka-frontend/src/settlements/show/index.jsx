import global from 'window-or-global';
import React, { Component } from 'react';

import Scroll from 'react-scroll';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// helpers
// import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

import loadSettlement from '../../core/settlements/actions/id/load';
import loadProperties from '../../core/countryProperties/actions/list/load'; // for ssr

import * as FilterActions from '../../core/actions/filters';
import { track } from '../../core/analytics';

import UI from '../../ui';
// import MapComponent from 'ui/map';
import Subscribe from '../../request/subscribe';

import PrimaryProperties from './primaryProperties';
import ResaleProperties from './resaleProperties';

import About from './about';
import Information from './information';
import Description from './description';
import Helmet from './Helmet';

const {
  Grid: { Container },
} = UI;

class SettlementContainer extends Component {
  static loadServer(dispatch, params) {
    const parsedSettlement = params.settlement.split('_');
    const [, settlementId] = parsedSettlement;

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

  constructor(props) {
    super(props);

    this.state = {
      dealType: 'sale',
    };

    this.toggleDealType = this.toggleDealType.bind(this);
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
      state,
      params: { settlement },
    } = this.props;

    const parsedSettlement = settlement.split('_');
    const [, settlementId] = parsedSettlement;

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

  toggleDealType(dealType) {
    this.setState({ dealType });
  }

  load({ dispatch, params }) {
    const parsedSettlement = params.settlement.split('_');
    const [, settlementId] = parsedSettlement;

    dispatch(loadSettlement(settlementId));
  }

  render() {
    const { state, params = {} } = this.props;
    const { kind } = params;

    const parsedSettlement = params.settlement.split('_');

    const [settlementName, settlementId] = parsedSettlement;

    const { isFetching, data } = state.settlements[settlementId] || {};
    const { statistics = {} } = data || {};

    const { saleProperties = {}, rentProperties = {} } = statistics || {};

    const primaryTotal = saleProperties.primary;
    const resaleTotal = saleProperties.resale;
    const rentTotal = rentProperties.total;

    // const isPositionAvailable = location.latitude && location.longitude;
    // const marker = {
    //   lat: location.latitude,
    //   lng: location.longitude,
    //   icon: isJQ ? 'marker' : 'markerPurple',
    // };

    return (
      <section>
        <Container fluid>
          <Helmet
            data={data}
            category="country"
            placeKind="settlements"
            placeId={settlementId}
            placeName={settlementName}
            dealType={this.state.dealType}
            kind={kind}
          />

          <About
            isFetching={isFetching}
            data={data}
            dealType={this.state.dealType}
            kind={kind}
          />
        </Container>

        {primaryTotal > 0 && (
          <PrimaryProperties
            settlementId={settlementId}
            statistics={statistics}
          />
        )}
        {(resaleTotal > 0 || rentTotal > 0) && (
          <ResaleProperties
            settlementId={settlementId}
            dealType={this.state.dealType}
            statistics={statistics}
            toggleDealType={this.toggleDealType}
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
