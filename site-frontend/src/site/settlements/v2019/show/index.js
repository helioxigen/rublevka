import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// helpers
// import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

import loadSettlement from '../../../../core/settlements/actions/id/load';
import loadProperties from '../../../../core/countryProperties/actions/list/load'; // for ssr

import * as FilterActions from '../../../../core/actions/filters';
import { track } from '../../../../core/analytics';

import UI from '../../../ui/v2019';

import Properties from './Properties';

import About from './About';
import Helmet from './Helmet';
import MapSection from './Map';

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
      prevProps.params.settlementId !== settlementId
      && !state.settlements[settlementId]
    ) {
      this.load(this.props);
    }
  }

  toggleDealType(dealType) {
    this.setState({ dealType });
  }

  // eslint-disable-next-line class-methods-use-this
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
    const { statistics = {}, location = {} } = data || {};

    const { saleProperties = {}, rentProperties = {} } = statistics || {};

    const resaleTotal = saleProperties.resale;
    const rentTotal = rentProperties.total;

    const isPositionAvailable = location.latitude && location.longitude;

    return (
      <section>
        <About
          isFetching={isFetching}
          data={data}
          dealType={this.state.dealType}
          kind={kind}
        />

        <Container>
          <Helmet
            data={data}
            category="country"
            placeKind="settlements"
            placeId={settlementId}
            placeName={settlementName}
            dealType={this.state.dealType}
            kind={kind}
          />
        </Container>

        {(resaleTotal > 0 || rentTotal > 0) && (
          <Properties
            data={data}
            settlementId={settlementId}
            dealType={this.state.dealType}
            statistics={statistics}
            toggleDealType={this.toggleDealType}
            onTypeChange={dealType => this.setState({ dealType })}
          />
        )}

        {isPositionAvailable && (
          <MapSection
            location={location}
            longitude={location.longitude}
            latitude={location.latitude}
          />
        )}
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
