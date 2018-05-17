import React from 'react';
import PropTypes from 'prop-types';
import SocialButton from './SocialButton';
import provider from '../../core/google-auth-provider';

const GoogleButton = ({ action, className }) => (
  <SocialButton
    name="Google"
    provider={provider}
    action={action}
    className={`GoogleButton ${className || ''}`}
  />
);

GoogleButton.propTypes = {
  action: PropTypes.string.isRequired,
  className: PropTypes.string,
};

GoogleButton.defaultProps = {
  className: null,
};

export default GoogleButton;
