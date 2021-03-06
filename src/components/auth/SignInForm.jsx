import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { FormField, withAntdForm } from '../forms';
import AuthError from './AuthError';
import { SIGN_IN } from '../../graphql/mutations';
import getGraphQLErrorMessage from '../../graphql/get-graphql-error-msg';
import authManager from '../../core/auth-manager';

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
  form: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

const defaultProps = {
  resetFocus: false,
  error: null,
  loading: false,
};

class SignInForm extends React.Component {
  componentWillUpdate(nextProps) {
    if (!this.props.resetFocus && nextProps.resetFocus) {
      this.firstInput.focus();
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.signIn(values.signinEmail, values.signinPassword);
      }
    });
  };

  signIn = async (email, password) => {
    try {
      const { data } = await this.props.signIn({
        variables: {
          email,
          password,
        },
      });

      const token = data.signin;
      authManager.signin(token);
    } catch (err) {
      // do nothing, because the UI will be updated
      // through the error property (this.props.error)
    }
  };

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <Form className="SignInForm" onSubmit={this.onFormSubmit}>
          <FormField id="signinEmail" options={emailOpts}>
            <Input
              prefix={<Icon type="mail" />}
              size="large"
              autoFocus
              ref={(input) => {
                this.firstInput = input;
              }}
              placeholder="Email"
            />
          </FormField>
          <FormField id="signinPassword" options={passwordOpts}>
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              type="password"
              placeholder="Password"
            />
          </FormField>
          <AuthError message={this.props.error} />
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="u-inlineBlock u-sizeFill"
            >
              {this.props.loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;

const SignInAntdForm = withAntdForm(SignInForm);

const SignInFormWithMutation = props => (
  <Mutation mutation={SIGN_IN}>
    {(signIn, { error, loading }) => {
      const allProps = {
        signIn,
        error: getGraphQLErrorMessage(error),
        loading,
        ...props,
      };

      return <SignInAntdForm {...allProps} />;
    }}
  </Mutation>
);

export default SignInFormWithMutation;
