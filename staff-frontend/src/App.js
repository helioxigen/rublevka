import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle, Main } from './UI';
import Auth from './auth/LoginPage/index';
import PropertyDetailsPage from './properties/DetailsPage';
import Navigation from './Navigation';

// TODO REMOVE; TEST DATA
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
  {
    name: 'Объект',
    path: '/object',
    count: '1',
  },
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
                  component={() => <Redirect to="/object" />}
                />
                <Route path="/object" component={PropertyDetailsPage} />
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
