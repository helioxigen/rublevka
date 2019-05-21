import React from 'react';
import * as Sentry from '@sentry/browser';
import { persistStore } from 'redux-persist';
import Helmet from 'react-helmet';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import styled from 'styled-components';
import ruIntlLocale from 'react-intl/locale-data/ru';
import { ToastProvider } from 'react-toast-notifications';
import { store } from './store';
import { Main, Title, Layout } from './UI';
import Auth from './auth/LoginPage';
import Property from './countryProperties/DetailsPage';
import Properties from './countryProperties/List';
import { loadCurrentUser } from './users/actions';
import { setToken } from './jq-redux-api/api';
import SplashScreen from './SplashScreen';

addLocaleData(ruIntlLocale);

const isLoggedin = () => !!store.getState().auth.token;

const MainContainer = styled(Main)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
`;

class App extends React.PureComponent {
  state = {
    error: null,
    isRehydrated: false,
  };

  componentWillMount() {
    this.loadPersistStore();
  }

  loadPersistStore = () => {
    persistStore(store, { whitelist: ['auth'] }, async () => {
      const { auth } = store.getState();
      const { token } = auth;

      if (token) {
        setToken(token);
        await store.dispatch(loadCurrentUser());
      }
      this.setState({ isRehydrated: true });
    });
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
    const { error, isRehydrated } = this.state;

    if (!isRehydrated) {
      return (
        <BrowserRouter>
          <Route path="*">
            <SplashScreen />
          </Route>
        </BrowserRouter>
      );
    }

    return (
      <>
        <Helmet titleTemplate="%s — staff.rublevka.ru" />
        <ToastProvider>
          <Provider store={store}>
            <IntlProvider locale="ru">
              <ReactReduxContext.Consumer>
                {() => (
                  <BrowserRouter>
                    {!isLoggedin() ? (
                      <>
                        <Route path="/login">
                          <Auth />
                        </Route>
                        <Route
                          path="*"
                          component={() => <Redirect to="/login" />}
                        />
                      </>
                    ) : (
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
                              path="/country-properties/:id/:action"
                              component={Property}
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
                              component={() => (
                                <Redirect to="/country-properties" />
                              )}
                            />
                          </Switch>
                        )}
                      </MainContainer>
                    )}
                  </BrowserRouter>
                )}
              </ReactReduxContext.Consumer>
            </IntlProvider>
          </Provider>
        </ToastProvider>
      </>
    );
  }
}

export default App;
