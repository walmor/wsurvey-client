import React from 'react';
import PropTypes from 'prop-types';
import SocialButton from './SocialButton';

const GoogleButton = ({ type, className }) => (
  <SocialButton
    name="Google"
    url="https://www.google.com"
    type={type}
    className={`GoogleButton ${className || ''}`}
  />
);

GoogleButton.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

GoogleButton.defaultProps = {
  className: null,
};

export default GoogleButton;
