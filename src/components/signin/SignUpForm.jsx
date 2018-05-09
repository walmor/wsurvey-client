import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Alert, Spin } from 'antd';
import { AntForm, FormField } from '../forms';

const nameOpts = {
  rules: [{ required: true, message: 'Enter your name.' }],
};

const emailOpts = {
  rules: [
    { required: true, message: 'Enter your email.' },
    { type: 'email', message: 'Enter a valid email.' },
  ],
};

const passwordOpts = {
  rules: [{ required: true, message: 'Enter your password.' }],
};

const confirmPasswordOpts = {
  rules: [{ required: true, message: 'Confirm your password.' }],
};

const propTypes = {
  resetFocus: PropTypes.bool,
  error: PropTypes.bool,
};

const defaultProps = {
  resetFocus: false,
  error: false,
};

class SignUpForm extends React.Component {
  componentDidUpdate() {
    if (this.props.resetFocus) {
      this.firstInput.focus();
    }
  }

  render() {
    return (
      <Spin spinning={false}>
        <AntForm className="SignUpForm">
          <FormField id="signup-name" options={nameOpts}>
            <Input
              prefix={<Icon type="user" />}
              size="large"
              ref={(input) => {
                this.firstInput = input;
              }}
              placeholder="Name"
            />
          </FormField>
          <FormField id="signup-email" options={emailOpts}>
            <Input prefix={<Icon type="mail" />} size="large" placeholder="Email" />
          </FormField>
          <FormField id="signup-password" options={passwordOpts}>
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              type="password"
              placeholder="Password"
            />
          </FormField>
          <FormField id="signup-confirmPassword" options={confirmPasswordOpts}>
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              type="password"
              placeholder="Confirm your password"
            />
          </FormField>
          {this.props.error && (
            <Alert
              className="signup-error-msg"
              type="error"
              message="Invalid email or password"
              showIcon
            />
          )}
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" className="btn-signup">
              Sign up
            </Button>
          </Form.Item>
        </AntForm>
      </Spin>
    );
  }
}

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

export default SignUpForm;
