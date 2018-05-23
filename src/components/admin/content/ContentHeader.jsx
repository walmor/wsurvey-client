import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { GET_CURRENT_ROUTE } from '../../../graphql/queries';

const ContentHeader = ({ currentRoute }) => (
  <div className="ContentHeader">
    <Breadcrumb>
      {currentRoute.breadcrumbs.map(bc => (
        <Breadcrumb.Item key={bc.path}>
          <Link to={bc.path}>{bc.title}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
    <h1 className="ContentTitle">{currentRoute.title}</h1>
  </div>
);

ContentHeader.propTypes = {
  currentRoute: PropTypes.object.isRequired,
};

const ContentHeaderWithRoute = () => (
  <Query query={GET_CURRENT_ROUTE}>
    {({ data }) => <ContentHeader currentRoute={data.currentRoute} />}
  </Query>
);

export default ContentHeaderWithRoute;
