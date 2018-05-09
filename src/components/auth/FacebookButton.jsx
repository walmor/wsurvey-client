import React from 'react';
import PropTypes from 'prop-types';
import SocialButton from './SocialButton';

const FacebookButton = ({ type, className }) => (
  <SocialButton
    name="Facebook"
    url="https://www.facebook.com"
    type={type}
    className={`FacebookButton ${className || ''}`}
  />
);

FacebookButton.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FacebookButton.defaultProps = {
  className: null,
};

export default FacebookButton;
