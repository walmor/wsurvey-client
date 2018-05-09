import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Alert, Spin } from 'antd';
import { AntForm, FormField } from '../forms';

const emailOpts = {
  rules: [
    { required: true, message: 'Enter your email.' },
    { type: 'email', message: 'Enter a valid email.' },
  ],
};

const passwordOpts = {
  rules: [{ required: true, message: 'Enter your password.' }],
};

const propTypes = {
  resetFocus: PropTypes.bool,
  error: PropTypes.bool,
};

const defaultProps = {
  resetFocus: false,
  error: false,
};

class SignInForm extends React.Component {
  componentDidUpdate() {
    if (this.props.resetFocus) {
      this.txt.focus();
    }
  }
  render() {
    return (
      <Spin spinning={false}>
        <AntForm className="SignInForm">
          <FormField id="signin-email" options={emailOpts}>
            <Input
              prefix={<Icon type="mail" />}
              size="large"
              autoFocus
              ref={(input) => {
                this.txt = input;
              }}
              placeholder="Email"
            />
          </FormField>
          <FormField id="signin-password" options={passwordOpts}>
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              type="password"
              placeholder="Password"
            />
          </FormField>
          {this.props.error && (
            <Alert
              className="signin-error-msg"
              type="error"
              message="Invalid email or password"
              showIcon
            />
          )}
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" className="btn-signin">
              Sign in
            </Button>
          </Form.Item>
        </AntForm>
      </Spin>
    );
  }
}

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;

export default SignInForm;
