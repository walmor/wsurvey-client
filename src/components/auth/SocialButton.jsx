import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const SocialButton = ({
  name, icon, url, type, className,
}) => (
  <a href={url} className={`SocialButton ${className}` || ''}>
    <Icon type={icon || name.toLowerCase()} className="SocialButtonIcon" />
    <span>
      {type === 'signin' ? 'Sign in' : 'Sign up'} with {name}
    </span>
  </a>
);

SocialButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

SocialButton.defaultProps = {
  icon: null,
};

export default SocialButton;
