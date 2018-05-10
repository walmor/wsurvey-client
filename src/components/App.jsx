import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Switch, Router, Route } from 'react-router-dom';
import history from '../core/history';
import apolloClient from '../core/apollo-client';
import PrivateRoute from '../components/auth/PrivateRoute';
import AdminPage from '../pages/AdminPage';
import AuthPage from '../pages/AuthPage';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <PrivateRoute path="/admin" component={AdminPage} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
