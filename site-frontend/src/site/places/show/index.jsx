import React, { Component } from 'react';
import global from 'window-or-global';

import { connect } from 'react-redux';

// actions
import loadPlace from 'core/places/actions/id/load';
import loadProperties from 'core/countryProperties/actions/list/load';

// helpers
import isEqual from 'lodash/isEqual';
import capitalize from 'lodash/capitalize';
import { dealTypes, placeKinds } from 'site/constants/properties/dictionaries';

// components
import Helmet from './Helmet';
import Header from './header';
import PropertiesList from './propertiesList';

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
    const isPlaceKindUpdated = !isEqual(
      this.props.params.placeKind,
      nextProps.params.placeKind,
    );
    const isDealTypeUpdated = !isEqual(
      this.props.params.dealType,
      nextProps.params.dealType,
    );

    if (isPlaceKindUpdated || isDealTypeUpdated) {
      load(nextProps);
    }
  }

  render() {
    const { state, params, location } = this.props;

    const placeKind = placeKinds[params.placeKind];
    const parsedPlace = params.place.split('_');

    const [placeName, placeId] = parsedPlace;

    const place = state.places[placeId] || {};
    const { data, isFetching } = place;
    const dealType = dealTypes[params.dealType];

    return (
      <section>
        <Helmet
          data={data}
          placeName={placeName}
          placeId={placeId}
          placeKind={placeKind}
          dealType={dealType}
        />

        <Header
          placeKind={placeKind}
          translatedPlaceKind={params.placeKind}
          isFetching={isFetching}
          data={data}
          errors={place.errors}
          dealType={dealType}
        />

        <PropertiesList
          placeKind={placeKind}
          placeId={placeId}
          dealType={params.dealType}
          location={location}
        />
      </section>
    );
  }
}

const pickState = ({ places }) => ({
  state: { places },
});

export default connect(pickState)(Place);
