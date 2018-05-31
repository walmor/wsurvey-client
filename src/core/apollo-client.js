import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import authManager from '../core/auth-manager';
import config from './config';
import createOmitTypenameLink from '../graphql/create-omit-typename-link';

const omitTypenameLink = createOmitTypenameLink();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // TODO: handle authorization errors
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      authManager.signout();
    }
  }
});

const httpLink = new HttpLink({
  uri: config.graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const token = authManager.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: {
    currentRoute: {
      title: 'Test',
      __typename: 'Route',
    },
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([omitTypenameLink, stateLink, errorLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
