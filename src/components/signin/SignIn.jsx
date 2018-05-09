import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import SignInForm from './SignInForm';
import LinkButton from '../LinkButton';

const propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
  resetFocus: PropTypes.bool,
};

const defaultProps = {
  resetFocus: false,
};

const SignIn = ({ onSignUpClick, resetFocus }) => (
  <div className="auth-comp SignIn">
    <h1 className="auth-title">Sign In</h1>
    <div className="btn-social-network">
      <FacebookButton />
    </div>
    <div className="btn-social-network">
      <GoogleButton />
    </div>
    <Divider>
      <span className="auth-or-divider">OR</span>
    </Divider>
    <SignInForm resetFocus={resetFocus} />
    <div className="auth-footer">
      <p>
        Donʼt have an account? <LinkButton onClick={onSignUpClick}>Sign up</LinkButton>
      </p>
    </div>
  </div>
);

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
