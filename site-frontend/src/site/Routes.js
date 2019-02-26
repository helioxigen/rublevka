import global from 'window-or-global';

import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Root from './Root';

import LandingJQ from './Landing/Jqestate/v2';
import LandingSatellite from './Landing/Satellites';
import { FeedbackJQ, FeedbackSattelite } from './feedback';
import About from './about';
import Agents from './agents';

import NotFound from './NotFound';

import * as Selections from './selections';

import * as CountryProperties from './countryProperties/v2';
import * as CountryPropertiesSat from './countryProperties/v2019';
import PropertiesList from './properties/v2/List';
import PropertiesListSat from './properties/list';

import * as Settlements from './settlements/v2';
import * as SettlementsSatellite from './settlements/v2019';
import * as Places from './places';
import * as PlacesSatellite from './places/satellite';

const isJQ = global.config.domain === 'jq.estate';

export default (
  <Route>
    <Redirect from="/zagorodnaya" to="/zagorodnaya/prodaja" />
    <Redirect from="/gorodskaya" to="/gorodskaya/prodaja" />
    <Redirect from="/zagorodnaya/shosse" to="/" />
    <Redirect from="/zagorodnaya/rayon" to="/" />
    <Redirect from="/zagorodnaya/nas-punkt" to="/" />
    <Redirect from="/zagorodnaya/shosse/:place" to="/zagorodnaya/shosse/:place/prodaja" />
    <Redirect from="/zagorodnaya/rayon/:place" to="/zagorodnaya/rayon/:place/prodaja" />
    <Redirect from="/zagorodnaya/nas-punkt/:place" to="/zagorodnaya/nas-punkt/:place/prodaja" />
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

      {isJQ && <Route path="/contacts" component={FeedbackJQ} />}
      {!isJQ && <Route path="/contacts" component={FeedbackSattelite} />}
      {isJQ && <Route path="/about" component={About} />}
      {isJQ && <Route path="/agents" component={Agents} />}
      {isJQ && <Route path="/podborky/:selection" component={Selections.List} />}

      {isJQ && (
        <Route path="/zagorodnaya/kottedzhnye-poselki">
          <IndexRoute component={Settlements.List} />

          <Route path=":settlement(/:kind)" component={Settlements.Show} ignoreScrollBehavior />
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

      {isJQ && <Route path="/:category/:dealType(/:kind)" component={PropertiesList} />}
      {!isJQ && <Route path="/:category/:dealType(/:kind)" component={PropertiesListSat} />}

      {isJQ && <Route path="/zagorodnaya/prodaja/:kind/:id" component={CountryProperties.Sale} />}
      {!isJQ && (
        <Route path="/zagorodnaya/prodaja/:kind/:id" component={CountryPropertiesSat.Sale} />
      )}
      {isJQ && <Route path="/zagorodnaya/arenda/:kind/:id" component={CountryProperties.Rent} />}
      {!isJQ && (
        <Route path="/zagorodnaya/arenda/:kind/:id" component={CountryPropertiesSat.Rent} />
      )}

      {isJQ && (
        <Route path="/zagorodnaya/:placeKind/:place/:dealType(/:kind)" component={Places.Show} />
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
