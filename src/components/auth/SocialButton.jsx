import React from 'react';
import PropTypes from 'prop-types';
import { Icon, message } from 'antd';
import CustomError from '../../core/custom-error';

function handleClick(provider, action) {
  try {
    provider.redirectToAuthPage({ action });
  } catch (error) {
    let errorMessage = 'An error has ocurred. Try again.';
    if (error instanceof CustomError) {
      errorMessage = error.message;
    }

    message.error(errorMessage);
  }
}

const SocialButton = ({
  name, icon, provider, action, className,
}) => (
  <button
    onClick={() => handleClick(provider, action)}
    className={`SocialButton ${className}` || ''}
  >
    <Icon type={icon || name.toLowerCase()} className="SocialButtonIcon" />
    <span>
      {action === 'signin' ? 'Sign in' : 'Sign up'} with {name}
    </span>
  </button>
);

SocialButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  provider: PropTypes.shape({ redirectToAuthPage: PropTypes.func.isRequired }).isRequired,
  action: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

SocialButton.defaultProps = {
  icon: null,
};

export default SocialButton;
