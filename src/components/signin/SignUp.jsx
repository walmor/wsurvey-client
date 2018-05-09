import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import SignUpForm from './SignUpForm';
import LinkButton from '../LinkButton';

const propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  resetFocus: PropTypes.bool,
};

const defaultProps = {
  resetFocus: false,
};

const SignUp = ({ onSignInClick, resetFocus }) => (
  <div className="auth-comp SignUp">
    <h1 className="auth-title">Sign Up</h1>
    <div className="btn-social-network">
      <FacebookButton />
    </div>
    <div className="btn-social-network">
      <GoogleButton />
    </div>
    <Divider>
      <span className="auth-or-divider">OR</span>
    </Divider>
    <SignUpForm resetFocus={resetFocus} />
    <div className="auth-footer">
      <p>
        Already have an account? <LinkButton onClick={onSignInClick}>Sign in</LinkButton>
      </p>
    </div>
  </div>
);

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
