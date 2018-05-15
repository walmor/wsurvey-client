import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageSpin from '../../components/lib/PageSpin';
import authManager from '../../core/auth-manager';

class AuthProviderCallback extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { providerName, action } = this.props.match.params;
    authManager
      .handleProviderCallback({
        providerName,
        action,
        qs: this.props.location.search,
        hash: this.props.location.hash,
      })
      .then(this.onCallbackHandled);
  }

  onCallbackHandled = ({ redirectTo, redirectState }) => {
    this.setState({
      loading: false,
      redirectTo,
      redirectState,
    });
  };

  render() {
    const to = {
      pathname: this.state.redirectTo,
      state: this.state.redirectState,
    };

    if (this.state.loading) {
      return <PageSpin />;
    }

    return <Redirect to={to} />;
  }
}

AuthProviderCallback.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AuthProviderCallback;
