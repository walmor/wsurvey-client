import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import FormContext from './form-context';

const propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.object,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  options: null,
};

const FormField = ({ id, options, children }) => (
  <FormContext.Consumer>
    {(form) => {
      const { getFieldDecorator } = form;
      return <Form.Item>{getFieldDecorator(id, options)(children)}</Form.Item>;
    }}
  </FormContext.Consumer>
);

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
