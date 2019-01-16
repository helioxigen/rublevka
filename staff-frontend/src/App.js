import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './auth/LoginPage/index';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/object" component={Auth} />
      <Redirect to="/object" />
    </Switch>
  </BrowserRouter>
);

export default App;
