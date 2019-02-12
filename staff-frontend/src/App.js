import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import styled from 'styled-components';

import ruIntlLocale from 'react-intl/locale-data/ru';

import store from './store';
import { Main } from './UI';
import Auth from './auth/LoginPage/index';
import PropertyDetailsPage from './countryProperties/DetailsPage';
import Navigation from './Navigation';

addLocaleData(ruIntlLocale);

// TODO REMOVE; TEST DATA
const createPropertyRoute = id => ({
  name: `ID ${id}`,
  path: `/country-properties/${id}`,
});

const testObjectsInfoList = [
  {
    name: 'Загородные обьекты',
    path: '/country-objects',
    count: 1233,
  },
  {
    name: 'Посёлки',
    path: '/places/settlements',
    count: 3213,
  },
  createPropertyRoute(16836),
  createPropertyRoute(16861),
  createPropertyRoute(16855),
  createPropertyRoute(16854),
  createPropertyRoute(16593),
];

const MainContainer = styled(Main)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
`;

class App extends React.PureComponent {
  state = {
    isAuthorized: true, // FIXME
  };

  render() {
    const { isAuthorized } = this.state;

    return (
      <Provider store={store}>
        <IntlProvider locale="ru">
          <BrowserRouter>
            {isAuthorized ? (
              <MainContainer>
                <Navigation menuItemsList={testObjectsInfoList} />
                <Switch>
                  <Route
                    exact
                    path="/login"
                    component={() => <Redirect to="/country-properties" />}
                  />
                  <Route
                    path="/country-properties/:id"
                    component={PropertyDetailsPage}
                  />
                </Switch>
              </MainContainer>
            ) : (
              <Auth />
            )}
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
