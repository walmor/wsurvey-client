import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { GET_CURRENT_ROUTE } from '../../../graphql/queries';

const SiderMenu = ({ onMenuItemClick, selectedMenuKey }) => (
  <Menu
    theme="dark"
    mode="inline"
    selectedKeys={[selectedMenuKey]}
    onClick={onMenuItemClick || undefined}
    className="SiderMenu"
  >
    <Menu.Item key="dashboard">
      <Link to="/admin/dashboard">
        <Icon type="dashboard" />
        <span>Dashboard</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="forms">
      <Link to="/admin/forms">
        <Icon type="form" />
        <span>Forms</span>
      </Link>
    </Menu.Item>
  </Menu>
);

SiderMenu.propTypes = {
  onMenuItemClick: PropTypes.func,
  selectedMenuKey: PropTypes.string,
};

SiderMenu.defaultProps = {
  onMenuItemClick: null,
  selectedMenuKey: null,
};

const SiderMenuWithRoute = props => (
  <Query query={GET_CURRENT_ROUTE}>
    {({ data }) => <SiderMenu {...props} selectedMenuKey={data.currentRoute.menuKey} />}
  </Query>
);

export default SiderMenuWithRoute;
