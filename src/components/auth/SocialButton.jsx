import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const SocialButton = ({
  name, icon, onClick, action, className,
}) => (
  <button onClick={onClick} className={`SocialButton ${className}` || ''}>
    <Icon type={icon || name.toLowerCase()} className="SocialButtonIcon" />
    <span>
      {action === 'signin' ? 'Sign in' : 'Sign up'} with {name}
    </span>
  </button>
);

SocialButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

SocialButton.defaultProps = {
  icon: null,
};

export default SocialButton;
