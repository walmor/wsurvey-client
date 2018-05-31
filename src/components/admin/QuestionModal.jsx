import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Checkbox } from 'antd';
import FormField from '../forms/FormField';
import { withAntdForm } from '../forms';

class QuestionModal extends React.Component {
  getFieldOptions() {
    const question = this.props.question || {};

    const title = {
      initialValue: question.title,
      rules: [{ required: true, message: 'The title is required.' }],
    };

    const description = {
      initialValue: question.description,
    };

    const required = {
      valuePropName: 'checked',
      initialValue: question.required,
    };

    return {
      title,
      description,
      required,
    };
  }

  handleOk = () => {
    const { form, onSave } = this.props;
    const question = this.props.question || {};

    form.validateFields((error, values) => {
      if (!error) {
        const editedQuestion = {
          key: question.key,
          id: question.id,
          title: values.questionTitle,
          description: values.questionDescription,
          required: values.questionRequired,
          kind: 'ShortAnswer',
        };

        onSave(editedQuestion);
      }
    });
  };

  render() {
    const { onCancel, visible, question } = this.props;
    const opts = this.getFieldOptions();
    const title = question ? 'Edit question' : 'Add question';

    return (
      <Modal
        title={title}
        destroyOnClose
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk}
      >
        <Form>
          <FormField id="questionTitle" options={opts.title}>
            <Input placeholder="Title" />
          </FormField>
          <FormField id="questionDescription" options={opts.description}>
            <Input.TextArea autosize placeholder="Description" />
          </FormField>
          <FormField id="questionRequired" options={opts.required}>
            <Checkbox>Required</Checkbox>
          </FormField>
        </Form>
      </Modal>
    );
  }
}

QuestionModal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  question: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

QuestionModal.defaultProps = {
  question: null,
};

export default withAntdForm(QuestionModal);
