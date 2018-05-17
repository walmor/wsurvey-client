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

  async componentWillMount() {
    await authManager.init();

    const { providerName, action } = this.props.match.params;
    const { search: qs, hash } = this.props.location;

    const destination = await authManager.handleProviderCallback({
      providerName,
      action,
      qs,
      hash,
    });

    this.setState({
      loading: false,
      destination,
    });
  }

  render() {
    if (this.state.loading) {
      return <PageSpin />;
    }

    return <Redirect to={this.state.destination} />;
  }
}

AuthProviderCallback.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AuthProviderCallback;
