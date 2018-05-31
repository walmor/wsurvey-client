import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Switch, Button, message, Card } from 'antd';
import { v4 as uuid } from 'uuid';
import { FormField, withAntdForm } from '../forms';
import FixedActionBar from '../lib/FixedActionBar';
import history from '../../core/history';
import getGraphQLErrorMessage from '../../graphql/get-graphql-error-msg';
import QuestionModal from './QuestionModal';
import QuestionList from './QuestionList';

const { TextArea } = Input;

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

class SurveyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionModal: {
        visible: false,
        question: null,
      },
    };
  }

  componentWillMount() {
    this.currentForm = this.props.currentForm || { enabled: true };
    const questions = (this.currentForm.questions || []).map(q => ({ key: uuid(), ...q }));

    this.setState({
      questions,
    });
  }

  getFieldOptions = () => {
    const frm = this.currentForm;

    const title = {
      initialValue: frm.title,
      rules: [
        {
          required: true,
          message: 'The title is required.',
        },
      ],
    };

    const description = {
      initialValue: frm.description,
    };

    const enabled = {
      valuePropName: 'checked',
      initialValue: frm.enabled,
    };

    return {
      title,
      description,
      enabled,
    };
  };

  openQuestionModal = (question) => {
    this.setState({
      questionModal: {
        visible: true,
        question,
      },
    });
  };

  closeQuestionModal = () => {
    this.setState({
      questionModal: {
        visible: false,
        question: null,
      },
    });
  };

  handleSaveQuestion = (question) => {
    this.setState((prevState) => {
      const questions = [...prevState.questions];

      if (question.key) {
        const idx = questions.findIndex(q => q.key === question.key);
        questions.splice(idx, 1, question);
      } else {
        question.key = uuid();
        questions.push(question);
      }

      return {
        questions,
        questionModal: {
          visible: false,
          question: null,
        },
      };
    });
  };

  handleEditQuestion = (key) => {
    const question = this.state.questions.find(q => q.key === key);
    this.openQuestionModal(question);
  };

  handleDeleteQuestion = (key) => {
    this.setState((prevState) => {
      const questions = [...prevState.questions];
      const idx = questions.findIndex(q => q.key === key);
      questions.splice(idx, 1);
      return { questions };
    });
  };

  submit = () => {
    const { form, onSave } = this.props;

    form.validateFieldsAndScroll(async (error, values) => {
      if (!error) {
        const surveyForm = {
          id: this.currentForm.id,
          ...values,
          questions: this.state.questions.map((question) => {
            const { key, ...quest } = question;
            return quest;
          }),
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

  render() {
    const opts = this.getFieldOptions();
    const { saving } = this.props;

    const btnAddQuestion = (
      <Button type="dashed" size="small" onClick={this.openQuestionModal}>
        Add question
      </Button>
    );

    return (
      <div>
        <Card title="Form details" bordered={false} className="SurveyFormCard">
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
        </Card>
        <Card title="Questions" bordered={false} extra={btnAddQuestion} className="SurveyFormCard">
          <QuestionList
            questions={this.state.questions}
            onEdit={this.handleEditQuestion}
            onDelete={this.handleDeleteQuestion}
          />
          <QuestionModal
            visible={this.state.questionModal.visible}
            question={this.state.questionModal.question}
            onSave={this.handleSaveQuestion}
            onCancel={this.closeQuestionModal}
          />
        </Card>
        <FixedActionBar>
          <Button type="primary" loading={saving} onClick={this.submit}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </FixedActionBar>
      </div>
    );
  }
}

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
