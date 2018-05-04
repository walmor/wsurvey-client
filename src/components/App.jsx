import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from '../core/history';
import PrivateRoute from '../components/PrivateRoute';
import AdminPage from '../pages/AdminPage';
import SignInPage from '../pages/SignInPage';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={SignInPage} />
      <PrivateRoute path="/admin" component={AdminPage} />
    </Switch>
  </Router>
);

export default App;
