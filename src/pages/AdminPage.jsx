import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import SurveyForms from '../components/admin/SurveyForms';
import CreateSurveyForm from '../components/admin/CreateSurveyForm';
import EditSurveyForm from '../components/admin/EditSurveyForm';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

const AdminPage = ({ match }) => (
  <div>
    <h1>Admin</h1>
    <Switch>
      <Route path={`${match.url}/forms/new`} component={CreateSurveyForm} />
      <Route path={`${match.url}/forms/:formId`} component={EditSurveyForm} />
      <Route path={`${match.url}`} component={SurveyForms} />
    </Switch>
  </div>
);

AdminPage.propTypes = propTypes;

export default AdminPage;
