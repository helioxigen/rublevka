import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink as OrigNavLink,
} from 'react-router-dom';
import styled from 'styled-components';

const Properties = lazy(() => import('./Properties/List'));
const PropertyDetails = lazy(() => import('./Properties/Details'));

const NavLink = styled(OrigNavLink)``;

const SidebarSt = styled.div`
  flex: 0 0 240px;
  max-width: 240px;
  height: 100vh;
  background-color: rgb(247, 247, 247);
  padding: 2rem 0;

  ${NavLink} {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #424242;
    text-decoration: none;

    &.active {
      color: #03a9f4;
    }
  }
`;

const Main = styled.main``;

function Sidebar({ children }) {
  return <SidebarSt>{children}</SidebarSt>;
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Sidebar>
          <NavLink to="/properties">Объекты</NavLink>
        </Sidebar>
        <Main>
          <Switch>
            <Route exact path="/properties" component={Properties} />
            <Route path="/properties/:id" component={PropertyDetails} />
            <Redirect from="/" to="/properties/country" />
          </Switch>
        </Main>
      </Suspense>
    </Router>
  );
}

export default App;
