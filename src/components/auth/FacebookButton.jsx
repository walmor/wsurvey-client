import React from 'react';
import PropTypes from 'prop-types';
import SocialButton from './SocialButton';
import provider from '../../core/facebook-auth-provider';

const FacebookButton = ({ action, className }) => (
  <SocialButton
    name="Facebook"
    onClick={() => {
      provider.redirectToAuthPage({ action });
    }}
    action={action}
    className={`FacebookButton ${className || ''}`}
  />
);

FacebookButton.propTypes = {
  action: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FacebookButton.defaultProps = {
  className: null,
};

export default FacebookButton;
