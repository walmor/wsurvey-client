import React from 'react';
import { Mutation } from 'react-apollo';
import SurveyForm from './SurveyForm';
import { CREATE_FORM } from '../../graphql/mutations';

const CreateSurveyForm = () => (
  <Mutation mutation={CREATE_FORM}>
    {(createForm, { loading: saving }) => {
      const handleSave = async (form) => {
        await createForm({ variables: { form } });
      };

      return <SurveyForm onSave={handleSave} saving={saving} />;
    }}
  </Mutation>
);

export default CreateSurveyForm;
