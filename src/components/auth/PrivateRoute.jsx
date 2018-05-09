import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import authManager from '../../core/auth-manager';

const propTypes = {
  component: PropTypes.func.isRequired,
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authManager.isSignedIn()) {
        return <Component {...props} />;
      }

      return <Redirect to="/" />;
    }}
  />
);

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
