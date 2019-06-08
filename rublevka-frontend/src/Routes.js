import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Root from './Root';

import LandingSatellite from './Landing/Satellites';
import { FeedbackSattelite } from './feedback';

import NotFound from './NotFound';

import Favorites from './favorites';
import * as CountryPropertiesSat from './countryProperties/v2019';
import PropertiesListSat from './properties/list';
import * as SettlementsSatellite from './settlements/v2019';
import * as PlacesSatellite from './places/satellite';

export default (
  <Route>
    <Redirect from="/zagorodnaya" to="/zagorodnaya/prodaja" />
    <Redirect from="/gorodskaya" to="/gorodskaya/prodaja" />
    <Redirect from="/zagorodnaya/shosse" to="/" />
    <Redirect from="/zagorodnaya/rayon" to="/" />
    <Redirect from="/zagorodnaya/nas-punkt" to="/" />
    <Redirect
      from="/zagorodnaya/shosse/:place"
      to="/zagorodnaya/shosse/:place/prodaja"
    />
    <Redirect
      from="/zagorodnaya/rayon/:place"
      to="/zagorodnaya/rayon/:place/prodaja"
    />
    <Redirect
      from="/zagorodnaya/nas-punkt/:place"
      to="/zagorodnaya/nas-punkt/:place/prodaja"
    />
    <Redirect
      from="/zagorodnaya/kottedzhnye-poselki/:settlement/prodaja"
      to="/zagorodnaya/kottedzhnye-poselki/:settlement"
    />
    <Redirect
      from="/zagorodnaya/kottedzhnye-poselki/:settlement/arenda"
      to="/zagorodnaya/kottedzhnye-poselki/:settlement"
    />

    <Route component={Root}>
      <Route path="/" component={LandingSatellite} />{' '}
      <Route path="/contacts" component={FeedbackSattelite} />
      <Route path="/zagorodnaya/kottedzhnye-poselki">
        <IndexRoute component={SettlementsSatellite.List} />

        <Route
          path=":settlement(/:kind)"
          component={SettlementsSatellite.Show}
          ignoreScrollBehavior
        />
      </Route>
      <Route
        path="/:category/:dealType(/:kind)"
        component={PropertiesListSat}
        ignoreScrollBehavior
      />
      <Route
        path="/zagorodnaya/prodaja/:kind/:id"
        component={CountryPropertiesSat.Sale}
      />
      <Route
        path="/zagorodnaya/arenda/:kind/:id"
        component={CountryPropertiesSat.Rent}
      />
      <Route
        path="/zagorodnaya/:placeKind/:place/:dealType(/:kind)"
        component={PlacesSatellite.Show}
      />
      <Route path="/favorites" component={Favorites} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
