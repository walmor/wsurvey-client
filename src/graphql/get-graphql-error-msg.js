export default function getGraphQLErrorMessage(error) {
  let errorMessage = null;

  if (error) {
    errorMessage = 'An error has occurred. Try again.';

    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const gqlError = error.graphQLErrors[0];

      // if the error doesn't have a code
      // is probably an unhandled error on the server
      // without a user-friendly message.
      if (gqlError.code) {
        errorMessage = gqlError.message;
      }
    }
  }

  return errorMessage;
}
