import gql from 'graphql-tag';

const IS_EMAIL_AVAILABLE = gql`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email)
  }
`;

export { IS_EMAIL_AVAILABLE };
