import gql from 'graphql-tag';

const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`;

const SIGN_UP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`;

const SIGN_IN_WITH_FACEBOOK = gql`
  mutation signinWithFacebook($accessToken: String!) {
    signinWithFacebook(accessToken: $accessToken)
  }
`;

const SIGN_IN_WITH_GOOGLE = gql`
  mutation signinWithGoogle($idToken: String!) {
    signinWithGoogle(idToken: $idToken)
  }
`;

const DELETE_FORM = gql`
  mutation deleteForm($formId: ID!) {
    deleteForm(formId: $formId) {
      success
    }
  }
`;

const CREATE_FORM = gql`
  mutation createForm($form: FormInput!) {
    createForm(form: $form) {
      id
    }
  }
`;

const UPDATE_FORM = gql`
  mutation updateForm($form: FormInput!) {
    updateForm(form: $form) {
      id
    }
  }
`;

export {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_WITH_FACEBOOK,
  SIGN_IN_WITH_GOOGLE,
  DELETE_FORM,
  CREATE_FORM,
  UPDATE_FORM,
};
