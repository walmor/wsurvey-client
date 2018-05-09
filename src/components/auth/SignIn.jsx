import React from 'react';
import PropTypes from 'prop-types';
import AuthContainer from './AuthContainer';
import AuthTitle from './AuthTitle';
import AuthOrDivider from './AuthOrDivider';
import AuthFooter from './AuthFooter';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import SignInForm from './SignInForm';
import LinkButton from '../lib/LinkButton';

const propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
  resetFocus: PropTypes.bool,
};

const defaultProps = {
  resetFocus: false,
};

const SignIn = ({ onSignUpClick, resetFocus }) => (
  <AuthContainer className="SignIn">
    <AuthTitle>Sign In</AuthTitle>
    <FacebookButton type="signin" className="u-marginBottom" />
    <GoogleButton type="signin" />
    <AuthOrDivider />
    <SignInForm resetFocus={resetFocus} />
    <AuthFooter>
      Donʼt have an account? <LinkButton onClick={onSignUpClick}>Sign up</LinkButton>
    </AuthFooter>
  </AuthContainer>
);

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
