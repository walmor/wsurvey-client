import React from 'react';
import PropTypes from 'prop-types';
import AuthContainer from './AuthContainer';
import AuthTitle from './AuthTitle';
import AuthOrDivider from './AuthOrDivider';
import AuthFooter from './AuthFooter';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import SignUpForm from './SignUpForm';
import LinkButton from '../lib/LinkButton';

const propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  resetFocus: PropTypes.bool,
};

const defaultProps = {
  resetFocus: false,
};

const SignUp = ({ onSignInClick, resetFocus }) => (
  <AuthContainer className="SignUp">
    <AuthTitle>Sign Up</AuthTitle>
    <FacebookButton action="signup" className="u-marginBottom u-sizeFill" />
    <GoogleButton action="signup" className="u-sizeFill" />
    <AuthOrDivider />
    <SignUpForm resetFocus={resetFocus} />
    <AuthFooter>
      Already have an account? <LinkButton onClick={onSignInClick}>Sign in</LinkButton>
    </AuthFooter>
  </AuthContainer>
);

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
