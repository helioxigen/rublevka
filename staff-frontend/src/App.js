import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle, Main } from './UI';
import Auth from './auth/LoginPage/index';
import PropertyDetailsPage from './properties/DetailsPage';
import Navigation from './Navigation';

// TODO REMOVE; TEST DATA
const createPropertyRoute = id => ({
  name: `Лот ${id}`,
  path: `/properties/${id}`,
  count: '1',
});

const testObjectsInfoList = [
  {
    name: 'Загородные обьекты',
    path: '/country-objects',
    count: '1233',
  },
  {
    name: 'Посёлки',
    path: '/townships',
    count: '3123',
  },
  createPropertyRoute(30),
  createPropertyRoute(31),
  createPropertyRoute(32),
  createPropertyRoute(34),
  createPropertyRoute(35),
  createPropertyRoute(36),
];

const MainContainer = styled(Main)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
`;

class App extends React.PureComponent {
  state = {
    isAuthorized: true, // TODO TEMPORARY SOLUTION
  };

  render() {
    const { isAuthorized } = this.state;
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          {isAuthorized ? (
            <MainContainer>
              <Navigation menuItemsList={testObjectsInfoList} />
              <Switch>
                <Route
                  exact
                  path="/login"
                  component={() => <Redirect to="/country-objects" />}
                />
                <Route path="/properties/:id" component={PropertyDetailsPage} />
              </Switch>
            </MainContainer>
          ) : (
            <Auth />
          )}
        </BrowserRouter>
      </>
    );
  }
}

export default App;
