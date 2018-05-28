import gql from 'graphql-tag';

const IS_EMAIL_AVAILABLE = gql`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email)
  }
`;

const VIEWER = gql`
  {
    viewer {
      name
    }
  }
`;

const GET_CURRENT_ROUTE = gql`
  {
    currentRoute @client {
      title
      menuKey
      breadcrumbs {
        title
        path
      }
    }
  }
`;

const FORMS = gql`
  query forms($page: Int!, $pageSize: Int!, $search: String) {
    forms(input: { page: $page, pageSize: $pageSize, search: $search }) {
      totalCount
      nodes {
        id
        title
        description
        createdAt
        enabled
      }
    }
  }
`;

const FORM = gql`
  query form($formId: ID!) {
    form(formId: $formId) {
      id
      title
      description
      enabled
      createdAt
      questions {
        id
        kind
        title
        description
        required
        options
      }
    }
  }
`;

export { IS_EMAIL_AVAILABLE, VIEWER, GET_CURRENT_ROUTE, FORMS, FORM };
