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

export { IS_EMAIL_AVAILABLE, VIEWER, GET_CURRENT_ROUTE };
