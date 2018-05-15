import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';
import PageSpin from '../components/lib/PageSpin';
import AuthFlipper from '../components/auth/AuthFlipper';
import authManager from '../core/auth-manager';

class AuthPage extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      isSignedIn: false,
    };
  }

  componentDidMount() {
    authManager.isSignedIn().then((isSignedIn) => {
      this.setState({
        loading: false,
        isSignedIn,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <PageSpin />;
    }

    if (this.state.isSignedIn) {
      return <Redirect to="/admin" />;
    }

    const { match, location } = this.props;
    const error = location.state && location.state.error;

    if (error) {
      message.error(error);
    }

    return (
      <div className="AuthPage">
        <AuthFlipper startWith={match.params.action} />
      </div>
    );
  }
}

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AuthPage;
