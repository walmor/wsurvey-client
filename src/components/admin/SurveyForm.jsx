import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Switch, Button, Icon, message } from 'antd';
import { FormField, withAntdForm } from '../forms';
import FixedActionBar from '../lib/FixedActionBar';
import history from '../../core/history';
import getGraphQLErrorMessage from '../../graphql/get-graphql-error-msg';

const { TextArea } = Input;

const SurveyForm = (props) => {
  const currentForm = props.currentForm || { enabled: true };
  const { form, saving, onSave } = props;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const title = {
    initialValue: currentForm.title,
    rules: [
      {
        required: true,
        message: 'The title is required.',
      },
    ],
  };

  const description = {
    initialValue: currentForm.description,
  };

  const enabled = {
    valuePropName: 'checked',
    initialValue: currentForm.enabled,
  };

  const opts = {
    title,
    description,
    enabled,
  };

  const submit = () => {
    form.validateFieldsAndScroll(async (error, values) => {
      if (!error) {
        const surveyForm = {
          id: currentForm.id,
          ...values,
        };

        try {
          await onSave(surveyForm);
          history.push('/admin/forms');
        } catch (err) {
          message.error(getGraphQLErrorMessage(err));
        }
      }
    });
  };

  return (
    <div>
      <Form>
        <FormField id="title" {...formItemLayout} options={opts.title} label="Title">
          <Input />
        </FormField>
        <FormField
          id="description"
          {...formItemLayout}
          options={opts.description}
          label="Description"
        >
          <TextArea autosize />
        </FormField>
        <FormField id="enabled" {...formItemLayout} options={opts.enabled} label="Enabled">
          <Switch />
        </FormField>
      </Form>
      <FixedActionBar>
        <Button type="primary" disabled={saving} onClick={submit}>
          {saving && <Icon type="loading" />}
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </FixedActionBar>
    </div>
  );
};

SurveyForm.propTypes = {
  currentForm: PropTypes.object,
  form: PropTypes.object.isRequired,
  saving: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};

SurveyForm.defaultProps = {
  currentForm: null,
  saving: false,
};

export default withAntdForm(SurveyForm);
