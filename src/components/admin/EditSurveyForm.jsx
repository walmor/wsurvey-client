import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { Mutation, Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import { UPDATE_FORM } from '../../graphql/mutations';
import { FORM } from '../../graphql/queries';
import PageSpin from '../lib/PageSpin';
import getGraphQLErrorMessage from '../../graphql/get-graphql-error-msg';

const EditSurveyForm = ({ match }) => (
  <Query query={FORM} variables={{ formId: match.params.formId }}>
    {({ data, loading, error }) => {
      if (loading) {
        return (
          <div style={{ height: '300px' }}>
            <PageSpin />
          </div>
        );
      }

      if (error) {
        message.error(getGraphQLErrorMessage(error));
        return <Redirect to="/admin/forms" />;
      }

      const currentForm = data.form;

      return (
        <Mutation mutation={UPDATE_FORM}>
          {(updateForm, { loading: saving }) => {
            const handleSave = async (form) => {
              await updateForm({ variables: { form } });
            };

            return <SurveyForm currentForm={currentForm} onSave={handleSave} saving={saving} />;
          }}
        </Mutation>
      );
    }}
  </Query>
);

EditSurveyForm.propTypes = {
  match: PropTypes.object.isRequired,
};

export default EditSurveyForm;
