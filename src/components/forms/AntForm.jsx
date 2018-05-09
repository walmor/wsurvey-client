import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import FormContext from './form-context';

const propTypes = {
  form: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const AntForm = (props) => {
  const { form, children, ...rest } = props;
  return (
    <Form {...rest}>
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </Form>
  );
};

AntForm.propTypes = propTypes;

export default Form.create()(AntForm);
