import { ApolloLink } from 'apollo-link';

function createOmitTypenameLink() {
  return new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }

    return forward(operation);
  });
}

function omitTypename(key, value) {
  return key === '__typename' ? undefined : value;
}

export default createOmitTypenameLink;
