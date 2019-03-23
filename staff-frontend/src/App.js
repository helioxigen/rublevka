import React from 'react';
import * as Sentry from '@sentry/browser';

import Helmet from 'react-helmet';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import styled from 'styled-components';

import ruIntlLocale from 'react-intl/locale-data/ru';

import store from './store';
import { Main, Title, Layout } from './UI';
import Auth from './auth/LoginPage';
import Property from './countryProperties/DetailsPage';
import Properties from './countryProperties/List';

addLocaleData(ruIntlLocale);

const MainContainer = styled(Main)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
`;

class App extends React.PureComponent {
  state = {
    isAuthorized: true, // FIXME
    error: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error }, () => {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });

        // eslint-disable-next-line react/destructuring-assignment
        Sentry.captureException(this.state.error);
      });
    });
  }

  render() {
    const { isAuthorized, error } = this.state;

    return (
      <>
        <Helmet titleTemplate="%s — staff.rublevka.ru" />

        <Provider store={store}>
          <IntlProvider locale="ru">
            <BrowserRouter>
              {isAuthorized ? (
                <MainContainer>
                  {error ? (
                    <>
                      <Layout>
                        <div className="container-fluid">
                          <Title>Произошла ошибка</Title>
                          <pre>{JSON.stringify(error, null, 2)}</pre>
                        </div>
                      </Layout>
                    </>
                  ) : (
                    <Switch>
                      <Route
                        exact
                        path="/login"
                        component={() => <Redirect to="/country-properties" />}
                      />

                      <Route
                        path="/country-properties/:id"
                        component={Property}
                      />
                      <Route
                        path="/country-properties"
                        component={Properties}
                      />

                      <Route
                        path="*"
                        component={() => <Redirect to="/country-properties" />}
                      />
                    </Switch>
                  )}
                </MainContainer>
              ) : (
                <Auth />
              )}
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      </>
    );
  }
}

export default App;
