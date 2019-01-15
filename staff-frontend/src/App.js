import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Auth from './auth/LoginPage/index';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Auth} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default App;
