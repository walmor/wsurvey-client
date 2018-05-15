import React from 'react';
import PropTypes from 'prop-types';
import SocialButton from './SocialButton';

const GoogleButton = ({ action, className }) => (
  <SocialButton
    name="Google"
    onClick={() => console.log('TODO: sigin with Google')}
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
