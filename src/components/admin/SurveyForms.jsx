import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button, List, Switch, Icon, message } from 'antd';
import MediaQuery from 'react-responsive';
import { Query, Mutation } from 'react-apollo';
import queryString from 'query-string';
import bp from '../../core/mq-breakpoints';
import { FORMS } from '../../graphql/queries';
import { DELETE_FORM } from '../../graphql/mutations';
import ListItemDescription from '../lib/ListItemDescription';
import EditListActionButton from '../lib/EditListActionButton';
import DeleteListActionButton from '../lib/DeleteListActionButton';

const { Search } = Input;
const PAGE_SIZE = 10;

const DeleteSurveyFormAction = ({ formId, refetchForms }) => (
  <Mutation mutation={DELETE_FORM}>
    {(deleteForm, { loading }) => {
      const onDelete = async () => {
        try {
          await deleteForm({ variables: { formId } });
          await refetchForms();
        } catch (err) {
          message.error('An error has occurred trying to delete the form.');
        }
      };

      if (loading) {
        return (
          <div className="ActionIcon">
            <Icon type="loading" />
          </div>
        );
      }

      return <DeleteListActionButton onConfirm={onDelete} />;
    }}
  </Mutation>
);

DeleteSurveyFormAction.propTypes = {
  formId: PropTypes.string.isRequired,
  refetchForms: PropTypes.func.isRequired,
};

const propTypes = {
  searchValue: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  forms: PropTypes.array,
  refetchForms: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};

const defaultProps = {
  searchValue: null,
  loading: false,
  forms: [],
};

const SurveyForms = props => (
  <div className="SurveyForms">
    <div className="SurveyFormSearchPanel">
      <div>
        <Link to="forms/new">
          <Button className="u-marginRight" type="primary">
            Create new
          </Button>
        </Link>
      </div>
      <div>
        <Search
          className="SurveyFormSearchInput"
          placeholder="Search..."
          defaultValue={props.searchValue}
          onSearch={props.onSearch}
        />
      </div>
    </div>
    <div>
      <MediaQuery maxWidth={358}>
        {(smallWidth) => {
          const { loading, forms } = props;
          const { pagination, onEdit, refetchForms } = props;

          pagination.size = smallWidth ? 'small' : '';

          return (
            <List
              size="large"
              rowKey="id"
              loading={loading}
              locale={{ emptyText: 'No forms found' }}
              pagination={pagination}
              dataSource={forms}
              renderItem={form => (
                <List.Item
                  actions={[
                    <EditListActionButton onClick={() => onEdit(form.id)} />,
                    <DeleteSurveyFormAction formId={form.id} refetchForms={refetchForms} />,
                  ]}
                >
                  <List.Item.Meta
                    title={<Link to={`/admin/forms/${form.id}`}>{form.title}</Link>}
                    description={<ListItemDescription>{form.description}</ListItemDescription>}
                  />
                  <MediaQuery minWidth={bp.sm.minWidth}>
                    <div className="SurveyFormsListContent">
                      <div>
                        <span>Created at</span>
                        <div>{new Date(form.createdAt).toLocaleString()}</div>
                      </div>
                      <div>
                        <span>Enabled</span>
                        <div>
                          <Switch checked={form.enabled} size="small" disabled />
                        </div>
                      </div>
                    </div>
                  </MediaQuery>
                </List.Item>
              )}
            />
          );
        }}
      </MediaQuery>
    </div>
  </div>
);

SurveyForms.propTypes = propTypes;
SurveyForms.defaultProps = defaultProps;

class SurveyFormsWithData extends React.Component {
  constructor() {
    super();

    this.vars = {
      page: 1,
      pageSize: PAGE_SIZE,
    };
  }

  onPageChange = (page) => {
    this.vars.page = page;
    this.pushLocation();
  };

  onSearch = (search) => {
    this.vars.page = 1;
    this.vars.search = search;
    this.pushLocation();
  };

  onEdit = (id) => {
    this.props.history.push(`/admin/forms/${id}`);
  };

  pushLocation = () => {
    const qsVars = {
      page: this.vars.page,
      search: this.vars.search,
    };

    if (qsVars.page === 1) {
      qsVars.page = undefined;
    }

    if (!qsVars.search) {
      qsVars.search = undefined;
    }

    const order = ['search', 'page'];

    const search = queryString.stringify(qsVars, {
      sort: (m, n) => order.indexOf(m) >= order.indexOf(n),
    });

    const location = {
      pathname: '/admin/forms',
      search,
    };

    this.props.history.push(location);
  };

  reloadVars = () => {
    const qs = queryString.parse(this.props.location.search) || {};

    const page = parseInt(qs.page, 10);
    this.vars.page = Number.isInteger(page) ? page : 1;
    this.vars.search = qs.search;

    return { ...this.vars };
  };

  render() {
    const vars = this.reloadVars();
    vars.page -= 1;

    return (
      <Query query={FORMS} fetchPolicy="network-only" variables={vars} notifyOnNetworkStatusChange>
        {({
          data,
          error,
          loading,
          refetch,
          networkStatus,
          }) => {
          const forms = (data && data.forms) || {};

          const props = {
            forms: forms.nodes || [],
            loading: loading || networkStatus === 4,            
            searchValue: vars.search,
            onSearch: this.onSearch,
            onEdit: this.onEdit,
            refetchForms: refetch,
            pagination: {
              pageSize: PAGE_SIZE,
              total: forms.totalCount || 0,
              current: vars.page + 1,
              onChange: this.onPageChange,
            },
          };
          
          if (error) {
            message.error('Error loading forms.');
          }

          return <SurveyForms {...props} />;
        }}
      </Query>
    );
  }
}

SurveyFormsWithData.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default SurveyFormsWithData;
