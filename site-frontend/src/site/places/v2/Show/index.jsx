import React, { Component } from 'react';
import global from 'window-or-global';

import { connect } from 'react-redux';

// actions
import loadPlace from 'core/places/actions/id/load';
import loadProperties from 'core/countryProperties/actions/list/load';

import { resourceName } from 'core/countryProperties/constants/defaults';

// helpers
import isEqual from 'lodash/isEqual';
import capitalize from 'lodash/capitalize';
import { dealTypes, placeKinds, kinds } from 'site/constants/properties/dictionaries';

// components
import Helmet from './Helmet';
import Header from './Header';
import PropertiesList from './PropertiesList';

const load = ({ dispatch, params }) => {
  const placeKind = placeKinds[params.placeKind];
  const parsedPlace = params.place.split('_');
  const [placeName, placeId] = parsedPlace;

  const dealType = dealTypes[params.dealType];
  const propertiesGroup = `forPlace${capitalize(dealType)}`;

  return Promise.all([
    dispatch(loadPlace(placeId, placeKind)),
    dispatch(
      loadProperties(
        {
          routes: global.config.routes,
        },
        propertiesGroup,
        { placeId, placeKind, dealType },
      ),
    ),
  ]);
};

class Place extends Component {
  static loadServer(dispatch, params) {
    return load({ dispatch, params });
  }

  componentDidMount() {
    load(this.props);

    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const isPlaceKindUpdated = !isEqual(this.props.params.placeKind, nextProps.params.placeKind);
    const isDealTypeUpdated = !isEqual(this.props.params.dealType, nextProps.params.dealType);

    if (isPlaceKindUpdated || isDealTypeUpdated) {
      load(nextProps);
    }
  }

  render() {
    const { state, params, location } = this.props;

    const placeKind = placeKinds[params.placeKind];
    const parsedPlace = params.place.split('_');

    const { query } = location;

    const [placeName, placeId] = parsedPlace;

    const place = state.places[placeId] || {};
    const { data, isFetching } = place;
    const dealType = dealTypes[params.dealType];

    const propertiesGroup = `forPlace${capitalize(dealType)}`;
    const resource = `${resourceName}.${propertiesGroup}`;

    const pagination = state.pagination[resource] || {};

    return (
      <section>
        <Helmet
          data={data}
          placeName={placeName}
          placeId={placeId}
          placeKind={placeKind}
          dealType={dealType}
          kind={kinds[params.kind]}
          query={query}
          pagination={pagination}
        />

        <Header
          placeKind={placeKind}
          translatedPlaceKind={params.placeKind}
          isFetching={isFetching}
          data={data}
          errors={place.errors}
          dealType={dealType}
          kind={kinds[params.kind]}
          totalProperties={pagination.total}
        />

        <PropertiesList
          data={data}
          placeKind={placeKind}
          translatedPlaceKind={params.placeKind}
          placeId={placeId}
          dealType={params.dealType}
          location={location}
          params={params}
        />
      </section>
    );
  }
}

const pickState = ({ places, pagination }) => ({
  state: { places, pagination },
});

export default connect(pickState)(Place);
