import global from 'window-or-global';

import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Root from 'site/root';

import LandingJQ from 'site/Landing/Jqestate/v2';
import LandingSatellite from 'site/Landing/Satellites';
import Feedback from 'site/feedback';
import About from 'site/about';
import Agents from 'site/agents';

import NotFound from 'site/NotFound';

import * as Selections from 'site/selections';

import * as CountryProperties from 'site/countryProperties/v2';
import * as CountryPropertiesSat from 'site/countryProperties';
import * as CityProperties from 'site/cityProperties';
import PropertiesList from 'site/properties/v2/List';
import PropertiesListSat from 'site/properties/list';

import * as Settlements from 'site/settlements/v2';
import * as SettlementsSatellite from 'site/settlements';
import * as Places from 'site/places';
import * as PlacesSatellite from 'site/places/satellite';
import * as Complexes from 'site/complexes';

const isJQ = global.config.domain === 'jq.estate';

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
      {isJQ && <Route path="/" component={LandingJQ} />}
      {!isJQ && <Route path="/" component={LandingSatellite} />}

      <Route path="/contacts" component={Feedback} />
      {isJQ && <Route path="/about" component={About} />}
      {isJQ && <Route path="/agents" component={Agents} />}
      {isJQ && (
        <Route path="/podborky/:selection" component={Selections.List} />
      )}

      {isJQ && (
        <Route path="/zagorodnaya/kottedzhnye-poselki">
          <IndexRoute component={Settlements.List} />

          <Route
            path=":settlement(/:kind)"
            component={Settlements.Show}
            ignoreScrollBehavior
          />
        </Route>
      )}

      {!isJQ && (
        <Route path="/zagorodnaya/kottedzhnye-poselki">
          <IndexRoute component={SettlementsSatellite.List} />

          <Route
            path=":settlement(/:kind)"
            component={SettlementsSatellite.Show}
            ignoreScrollBehavior
          />
        </Route>
      )}

      {isJQ && (
        <Route path="/gorodskaya/zhilye-kompleksy">
          <IndexRoute component={Complexes.List} />

          <Route path=":complex" component={Complexes.Show} />
        </Route>
      )}

      {isJQ && (
        <Route path="/:category/:dealType(/:kind)" component={PropertiesList} />
      )}
      {!isJQ && (
        <Route
          path="/:category/:dealType(/:kind)"
          component={PropertiesListSat}
        />
      )}

      {isJQ && (
        <Route
          path="/zagorodnaya/prodaja/:kind/:id"
          component={CountryProperties.Sale}
        />
      )}
      {!isJQ && (
        <Route
          path="/zagorodnaya/prodaja/:kind/:id"
          component={CountryPropertiesSat.Sale}
        />
      )}
      {isJQ && (
        <Route
          path="/zagorodnaya/arenda/:kind/:id"
          component={CountryProperties.Rent}
        />
      )}
      {!isJQ && (
        <Route
          path="/zagorodnaya/arenda/:kind/:id"
          component={CountryPropertiesSat.Rent}
        />
      )}

      {isJQ && (
        <Route
          path="/gorodskaya/:dealType/:kind/:id"
          component={CityProperties.Show}
        />
      )}

      {isJQ && (
        <Route
          path="/zagorodnaya/:placeKind/:place/:dealType(/:kind)"
          component={Places.Show}
        />
      )}
      {!isJQ && (
        <Route
          path="/zagorodnaya/:placeKind/:place/:dealType(/:kind)"
          component={PlacesSatellite.Show}
        />
      )}
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
