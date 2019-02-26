import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  useRouterHistory,
} from 'react-router';
import { createHistory } from 'history';

import Containers from 'cem/containers';
import store from 'cem/store';
import { logout } from 'cem/actions/auth';

import * as Contacts from 'cem/_contacts/containers';
// import * as ClientLeads from './client_leads';
import * as ClientLeads from 'cem/_client_leads';
import * as Tasks from 'cem/_tasks/containers';
import * as Deals from 'cem/_deals/containers';
import * as Newsletters from 'cem/_newsletters';
import * as Reports from 'cem/_reports';

const history = useRouterHistory(createHistory)();

const isLoggedin = () => !!store.getState().auth.token;

const onLogout = (state, replace) => {
  localStorage.removeItem('reduxPersist:auth');
  store.dispatch(logout());
  window.analytics.reset();
  window.Intercom('shutdown');
  replace(null, '/');
};

export default () => (
  <Router history={history}>
    <Route
      path="/login"
      component={Containers.Auth.Login}
      onEnter={(state, replace) => isLoggedin() && replace(null, '/')}
    />
    <Route path="/logout" onEnter={onLogout} />

    <Route
      component={Containers.Root}
      onEnter={(state, replace) => !isLoggedin() && replace(null, '/login')}
    >
      <Route path="/" component={Containers.Dashboard} />

      <Redirect from="/reports" to="/reports/funnel" />
      <Route
        path="/reports/funnel(/:departmentId)(/:divisionId)(/:staffUserId)"
        component={Reports.Funnel}
      />

      <Route path="/staff">
        <IndexRoute component={Containers.Staff.List} />
        <Route path="daily_duty" component={Containers.Duty.List} />

        <Redirect from=":id" to=":id/about" />
        <Route path=":id" component={Containers.Staff.Id.Container}>
          <Route path="about" component={Containers.Staff.Id.About} />
          <Route
            path="subordinates"
            component={Containers.Staff.Id.Subordinates}
          />
          <Route
            path="notifications"
            component={Containers.Staff.Id.Notifications}
          />
        </Route>
      </Route>

      <Redirect from="/contacts" to="/contacts/lists/active" />
      <Route path="/contacts">
        <Route path="/contacts/lists/:group" component={Contacts.List} />

        <Redirect from=":id" to=":id/about" />
        <Route path=":id" component={Contacts.Show}>
          <Route path="about" component={Contacts.About} />
          <Route path="deals" component={Contacts.Deals} />
          <Route path="properties" component={Contacts.Properties} />
          <Route path="client_leads" component={Contacts.ClientLeads} />
          <Route path="tasks" component={Contacts.Tasks} />
        </Route>
      </Route>

      <Route path="/companies">
        <IndexRoute component={Containers.Companies.List} />

        <Route path=":id" component={Containers.Companies.Id} />
      </Route>

      <Redirect
        from="/properties/:category"
        to="/properties/:category/initial"
      />
      <Route path="/properties/:category">
        <Route path="initial" component={Containers.Properties.List} />
        <Route path="resale" component={Containers.Properties.List} />
        <Route path="removed" component={Containers.Properties.List} />
        <Route path="all" component={Containers.Properties.List} />
        <Redirect from=":id" to=":id/about" />
        <Route path=":id" component={Containers.Properties.Id.Container}>
          <Route path="about" component={Containers.Properties.Id.About} />
          <Route path="photos" component={Containers.Properties.Id.Photos} />
          <Route
            path="documents"
            component={Containers.Properties.Id.Documents}
          />
          <Route
            path="client_leads"
            component={Containers.Properties.Id.Requests}
          />
          <Route path="tasks" component={Containers.Properties.Id.Tasks} />
          <Route path="history" component={Containers.Properties.Id.History} />
          <Route
            path="marketing"
            component={Containers.Properties.Id.Marketing}
          />
        </Route>
      </Route>

      <Route path="/deals">
        <IndexRoute component={Containers.Offers.List} />
        <Route path="group/:group" component={Deals.List} />

        <Redirect from=":id" to=":id/about" />
        <Route path=":id/:tab" component={Containers.Offers.Id} />
      </Route>

      <Route path="/settings">
        <Route
          path="departments"
          component={Containers.Settings.Departments.List}
        />
        <Route
          path="divisions"
          component={Containers.Settings.Divisions.List}
        />
        <Route path="positions">
          <IndexRoute component={Containers.Settings.Positions.List} />

          <Route path=":id" component={Containers.Settings.Positions.Id} />
        </Route>
        <Route
          path="applications"
          component={Containers.Settings.Applications.List}
        />
        <Route path="dictionaries">
          <IndexRoute component={Containers.Settings.Dictionaries.List} />

          <Route path=":kind" component={Containers.Settings.Dictionaries.Id} />
        </Route>
        <Route
          path="lead_sources"
          component={Containers.Settings.LeadSources.List}
        />
        <Route path="export_packages">
          <IndexRoute component={Containers.Settings.ExportPackages.List} />

          <Redirect from=":id" to=":id/about" />
          <Route
            path=":id/:tab"
            component={Containers.Settings.ExportPackages.Id}
          />
        </Route>
        <Route path="csi" component={Containers.Settings.CSIQuestions.List} />
      </Route>

      <Route path="/tasks">
        <IndexRoute component={Containers.Tasks.List} />

        <Route path=":id" component={Containers.Tasks.Id} />
      </Route>

      <Redirect from="/leads" to="/client_leads" />
      <Redirect from="/client_leads" to="/client_leads/active" />
      <Redirect
        from="/leads/:leadKind/:id/:tab"
        to="/client_leads/:leadKind/:id/:tab"
      />
      <Route path="/client_leads">
        <Route path=":group" component={ClientLeads.List} />

        <Redirect from=":leadKind/:id" to=":leadKind/:id/about" />
        <Route path=":leadKind/:id/:tab" component={ClientLeads.Show} />
      </Route>

      <Redirect from="/places" to="/places/countries" />
      <Route path="/places">
        <Route path="complexes">
          <IndexRoute component={Containers.Complexes.List} />

          <Route path="buildings">
            <Redirect from=":buildingId" to=":buildingId/about" />
            <Route
              path=":buildingId"
              component={Containers.ComplexBuildings.Id.Container}
            >
              <Route
                path="about"
                component={Containers.ComplexBuildings.Id.About}
              />
              <Route
                path="photos"
                component={Containers.ComplexBuildings.Id.Photos}
              />
              <Route
                path="documents"
                component={Containers.ComplexBuildings.Id.Documents}
              />
              <Route
                path="properties"
                component={Containers.ComplexBuildings.Id.Properties}
              />
            </Route>
          </Route>

          <Redirect from=":id" to=":id/about" />
          <Route path=":id" component={Containers.Complexes.Id.Container}>
            <Route path="about" component={Containers.Complexes.Id.About} />
            <Route path="photos" component={Containers.Complexes.Id.Photos} />
          </Route>
        </Route>

        <Route path="settlements">
          <IndexRoute component={Containers.Settlements.List} />

          <Redirect from=":id" to=":id/about" />
          <Route path=":id" component={Containers.Settlements.Id.Container}>
            <Route path="about" component={Containers.Settlements.Id.About} />
            <Route path="photos" component={Containers.Settlements.Id.Photos} />
            <Route
              path="documents"
              component={Containers.Settlements.Id.Documents}
            />
            <Route
              path="properties"
              component={Containers.Settlements.Id.Properties}
            />
            <Route path="seo" component={Containers.Settlements.Id.Seo} />
          </Route>
        </Route>

        <Route path=":kind">
          <IndexRoute component={Containers.Places.List} />
          <Route path=":id" component={Containers.Places.Id} />
        </Route>
      </Route>

      <Route path="/requests/properties">
        <Route path="images">
          <IndexRoute component={Containers.Requests.Images.List} />

          <Route
            path="archive"
            component={Containers.Requests.Images.Archive}
          />
          <Route path=":id" component={Containers.Requests.Images.Id} />
        </Route>
        <Route path="to_remove">
          <IndexRoute component={Containers.Requests.Remove.List} />

          <Route
            path="archive"
            component={Containers.Requests.Remove.Archive}
          />
          <Route path=":id" component={Containers.Requests.Remove.Id} />
        </Route>
        <Route path="search">
          <IndexRoute component={Containers.Requests.Search.List} />

          <Route
            path="archive"
            component={Containers.Requests.Search.Archive}
          />
          <Route path=":id" component={Containers.Requests.Search.Id} />
        </Route>
      </Route>
      <Route path="/selections">
        <IndexRoute component={Containers.Selections.List} />

        <Redirect from=":id" to=":id/about" />
        <Route path=":id" component={Containers.Selections.Id.Container}>
          <Route path="about" component={Containers.Selections.Id.About} />
        </Route>
      </Route>
      <Route path="/newsletters">
        <IndexRoute component={Newsletters.List} />

        <Route path=":id" component={Newsletters.Show} />
      </Route>
    </Route>
  </Router>
);

export { history };
