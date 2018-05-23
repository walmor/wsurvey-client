import React from 'react';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;

const AdminFooter = () => (
  <Footer className="AdminFooter">
    <span>wSurvey</span>
    <a href="http://www.github.com/walmor/wsurvey-client" target="_blank" rel="noopener noreferrer">
      <Icon type="github" />
    </a>
    <span>by Walmor</span>
  </Footer>
);

export default AdminFooter;
