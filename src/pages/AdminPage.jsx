import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminHeader from '../components/admin/header/AdminHeader';
import AdminFooter from '../components/admin/footer/AdminFooter';
import AdminSider from '../components/admin/sider/AdminSider';
import SurveyForms from '../components/admin/SurveyForms';
import CreateSurveyForm from '../components/admin/CreateSurveyForm';
import EditSurveyForm from '../components/admin/EditSurveyForm';
import ContentHeader from '../components/admin/content/ContentHeader';
import ContentPanel from '../components/admin/content/ContentPanel';
import Dashboard from '../components/admin/Dashboard';

const { Content } = Layout;

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

class AdminPage extends React.Component {
  constructor() {
    super();
    this.state = {
      menuCollapsed: false,
    };
  }

  onSiderCollapse = (collapsed) => {
    this.setState({
      menuCollapsed: collapsed,
    });
  };

  toggleSider = () => {
    this.setState(state => ({
      menuCollapsed: !state.menuCollapsed,
    }));
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <Layout>
          <AdminSider collapsed={this.state.menuCollapsed} onCollapse={this.onSiderCollapse} />
          <Layout>
            <AdminHeader
              onSiderTriggerClick={this.toggleSider}
              collapsed={this.state.menuCollapsed}
            />
            <Content className="Content">
              <ContentHeader title="Forms" />
              <ContentPanel>
                <Switch>
                  <Route path={`${match.url}/forms/new`} component={CreateSurveyForm} />
                  <Route path={`${match.url}/forms/:formId`} component={EditSurveyForm} />
                  <Route path={`${match.url}/forms`} component={SurveyForms} />
                  <Route path={`${match.url}/dashboard`} component={Dashboard} />
                  <Redirect to="/admin/forms" />
                </Switch>
              </ContentPanel>
            </Content>
            <AdminFooter />
          </Layout>
        </Layout>
      </div>
    );
  }
}

AdminPage.propTypes = propTypes;

export default AdminPage;
