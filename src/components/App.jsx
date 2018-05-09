import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from '../core/history';
import PrivateRoute from '../components/PrivateRoute';
import AdminPage from '../pages/AdminPage';
import AuthPage from '../pages/AuthPage';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <PrivateRoute path="/admin" component={AdminPage} />
    </Switch>
  </Router>
);

export default App;
