import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import history from '../core/history';
import apolloClient from '../core/apollo-client';
import PrivateRoute from '../components/auth/PrivateRoute';
import AuthProviderCallback from '../components/auth/AuthProviderCallback';
import AdminPage from '../pages/AdminPage';
import AuthPage from '../pages/AuthPage';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/signin" />
        <Route exact path="/:action(signin|signup)" component={AuthPage} />
        <Route path="/auth-callback/:action/:providerName" component={AuthProviderCallback} />
        <PrivateRoute path="/admin" component={AdminPage} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
